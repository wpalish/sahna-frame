import {alphaBounds,sourceMetadata,placement,normalizeSet,sceneSpec} from './scene.js';
import {inspectSubjectPNG,inspectScenePNG} from './image-header.js';
const defaults=()=>({sizePercent:60,centerX:500,baselineY:800});
const failure=(code,field)=>Object.assign(new Error(code),{code,field});
const digest=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(b=>b.toString(16).padStart(2,'0')).join('');
const dispose=canvas=>{if(canvas){canvas.width=0;canvas.height=0;}};
const sameSource=(a,b)=>['format','sha256','byteLength','width','height','transparentPixels','visiblePixels'].every(k=>a[k]===b[k])&&['x','y','width','height'].every(k=>a.bounds[k]===b.bounds[k]);
function paint(ctx,spec,geometry){
 ctx.fillStyle=spec.background;ctx.fillRect(0,0,1000,1000);
 for(const shape of spec.shapes){ctx.fillStyle=shape.fill;if(shape.kind==='rect')ctx.fillRect(shape.x,shape.y,shape.width,shape.height);else{const{x,y,width:w,height:h}=shape;ctx.beginPath();ctx.moveTo(x,y+h);ctx.lineTo(x,y+w/2);ctx.arc(x+w/2,y+w/2,w/2,Math.PI,0);ctx.lineTo(x+w,y+h);ctx.closePath();ctx.fill();}}
 const d=geometry.destination;ctx.fillStyle=spec.shadow;ctx.beginPath();ctx.ellipse(d.x+d.width/2,d.y+d.height+12,Math.max(1,d.width*.42),Math.max(5,d.height*.035),0,0,Math.PI*2);ctx.fill();
}
// Actual canvases are the preview/export buffers; only browser primitives are injectable.
export class SceneSession{
 constructor({createCanvas=()=>document.createElement('canvas'),decode=blob=>createImageBitmap(blob),encode=canvas=>new Promise(resolve=>canvas.toBlob(resolve,'image/png')),hash=digest,createURL=blob=>URL.createObjectURL(blob),revokeURL=url=>URL.revokeObjectURL(url),now=()=>Date.now()}={}){
  Object.assign(this,{createCanvas,decode,encode,hash,createURL,revokeURL,now});this.actor=null;this.generation=0;this.sourceCanvas=null;this.sourceRejected=false;this.onChange=()=>{};this.state=this.empty();
 }
 empty(){return{status:'empty',source:null,settings:defaults(),geometry:null,scenes:[],selectedScene:null,export:null,error:null,retained:false,canPrepare:false,loadedSetTitle:null};}
 emit(){this.state.canPrepare=!!this.actor&&['ready','prepared'].includes(this.state.status)&&this.state.scenes.length===3&&!!this.state.selectedScene;this.onChange(this.state);}
 clearExport(){if(this.state.export){this.revokeURL(this.state.export.pngURL);this.revokeURL(this.state.export.manifestURL);}this.state.export=null;}
 clearScenes(){for(const s of this.state.scenes)dispose(s.canvas);this.state.scenes=[];}
 identity(actor){if(actor===this.actor)return;this.generation++;this.clearExport();this.clearScenes();dispose(this.sourceCanvas);this.sourceCanvas=null;this.sourceRejected=false;this.actor=actor;this.state=this.empty();this.emit();}
 invalidate(){this.generation++;this.clearExport();this.state.status='loading';this.state.error=null;this.emit();return this.generation;}
 rejectSource(error){this.sourceRejected=true;this.error(error);}
 error(error){this.clearExport();this.state.status='error';this.state.error={code:error.code||'image_failure',field:error.field||null};this.state.retained=!!this.state.source;this.emit();}
 render(sourceCanvas,source,settings){
  const geometry=placement(source,settings),b=geometry.sourceRect,d=geometry.destination,scratch=this.createCanvas(),scenes=[];scratch.width=b.width;scratch.height=b.height;
  try{scratch.getContext('2d').drawImage(sourceCanvas,b.x,b.y,b.width,b.height,0,0,b.width,b.height);
   for(const id of ['linen','arch','steps']){const canvas=this.createCanvas();canvas.width=1000;canvas.height=1000;scenes.push({id,canvas});const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=true;paint(ctx,sceneSpec(id),geometry);ctx.drawImage(scratch,d.x,d.y,d.width,d.height);}
   return{geometry,scenes};
  }catch(e){for(const s of scenes)dispose(s.canvas);throw e;}finally{dispose(scratch);}
 }
 async load(file,{set=null}={}){
  const ticket=this.invalidate(),actor=this.actor;let bitmap,canvas;
  try{
   if(!actor)throw failure('no_actor');if(!file||typeof file.arrayBuffer!=='function'||!Number.isSafeInteger(file.size)||file.size<1||file.size>4194304)throw failure('file_size');
   const bytes=new Uint8Array(await file.arrayBuffer());const header=inspectSubjectPNG(bytes),sha256=await this.hash(bytes);
   if(ticket!==this.generation||actor!==this.actor)return{status:'stale'};
   bitmap=await this.decode(new Blob([bytes],{type:'image/png'}));if(ticket!==this.generation||actor!==this.actor)return{status:'stale'};
   if(bitmap.width!==header.width||bitmap.height!==header.height)throw failure('decode_dimensions');
   canvas=this.createCanvas();canvas.width=header.width;canvas.height=header.height;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(bitmap,0,0);
   const alpha=alphaBounds(ctx.getImageData(0,0,header.width,header.height).data,header.width,header.height),source=sourceMetadata({...header,sha256,...alpha});
   let settings=defaults(),title=null;if(set){const frozen=normalizeSet({title:set.title,source:set.source,settings:set.settings,sceneVersion:set.sceneVersion});if(!sameSource(source,frozen.source))throw failure('source_mismatch');settings=frozen.settings;title=frozen.title;}
   const rendered=this.render(canvas,source,settings);this.clearScenes();dispose(this.sourceCanvas);this.sourceCanvas=canvas;canvas=null;this.sourceRejected=false;
   Object.assign(this.state,{status:'ready',source,settings,geometry:rendered.geometry,scenes:rendered.scenes,selectedScene:null,error:null,retained:false,loadedSetTitle:title});this.emit();return{status:'ready'};
  }catch(e){if(ticket===this.generation&&actor===this.actor){this.rejectSource(e);}return{status:ticket===this.generation?'error':'stale'};}
  finally{bitmap?.close?.();dispose(canvas);}
 }
 configure(settings){
  this.generation++;this.clearExport();try{if(this.sourceRejected||!this.sourceCanvas||!this.state.source)throw failure('select_source');const next=this.render(this.sourceCanvas,this.state.source,settings);this.clearScenes();Object.assign(this.state,{status:'ready',settings:structuredClone(settings),geometry:next.geometry,scenes:next.scenes,error:null,retained:false,loadedSetTitle:null});this.emit();}catch(e){this.error(e);}
 }
 select(id){sceneSpec(id);if(this.sourceRejected)throw failure('select_source');this.generation++;this.clearExport();this.state.selectedScene=id;if(this.state.source&&this.state.scenes.length===3){this.state.status='ready';this.state.error=null;this.state.retained=false;}this.emit();}
 async prepare(){
  if(!this.state.canPrepare)throw failure('select_scene');const ticket=++this.generation,actor=this.actor,selectedScene=this.state.selectedScene,canvas=this.state.scenes.find(s=>s.id===selectedScene).canvas,source=structuredClone(this.state.source),settings=structuredClone(this.state.settings),geometry=structuredClone(this.state.geometry);this.clearExport();this.state.status='encoding';this.emit();let pngURL,manifestURL;
  const current=()=>ticket===this.generation&&actor===this.actor;
  try{const blob=await this.encode(canvas);if(!current())return{status:'stale'};if(!(blob instanceof Blob))throw failure('encode_failure');const bytes=new Uint8Array(await blob.arrayBuffer()),header=inspectScenePNG(bytes),sha256=await this.hash(bytes);if(!current())return{status:'stale'};
   const manifest={schema:'sahna-frame-export-v1',sceneVersion:1,selectedScene,source,settings,geometry,output:{...header,sha256},clientGeneratedAt:new Date(this.now()).toISOString()};pngURL=this.createURL(blob);manifestURL=this.createURL(new Blob([JSON.stringify(manifest,null,2)+'\n'],{type:'application/json'}));
   this.state.export={pngURL,manifestURL,manifest};this.state.status='prepared';this.state.error=null;this.emit();return{status:'prepared'};
  }catch(e){if(pngURL)this.revokeURL(pngURL);if(manifestURL)this.revokeURL(manifestURL);if(current())this.error(e);return{status:current()?'error':'stale'};}
 }
}
