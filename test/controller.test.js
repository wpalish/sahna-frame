import test from 'node:test';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
import {SceneSession} from '../public/controller.js';import {png,pngSignature,ihdr,idat,chunk} from './image-fixtures.js';
const original=png(),changed=png(chunk('tEXt',Buffer.from('own\0changed'))),file=b=>new File([b],'SYN.png',{type:'image/png'}),hash=async b=>createHash('sha256').update(b).digest('hex');
const gate=()=>{let resolve;return{promise:new Promise(r=>resolve=r),resolve};};
async function until(condition){const end=performance.now()+1000;while(performance.now()<end){if(condition())return;await new Promise(r=>setTimeout(r,5));}assert.fail('Expected decoder start did not occur within1000ms');}
const rgba=()=>{const a=new Uint8ClampedArray(24);a.set([110,80,40,255],4);a.set([70,40,20,255],16);return a;};
class Canvas{
 constructor(){this.width=0;this.height=0;this.ops=[];}
 getContext(){const canvas=this;return{fillStyle:'',imageSmoothingEnabled:true,fillRect(...a){canvas.ops.push(['fillRect',...a,this.fillStyle]);},beginPath(){canvas.ops.push(['beginPath']);},moveTo(...a){canvas.ops.push(['moveTo',...a]);},lineTo(...a){canvas.ops.push(['lineTo',...a]);},arc(...a){canvas.ops.push(['arc',...a]);},ellipse(...a){canvas.ops.push(['ellipse',...a]);},closePath(){canvas.ops.push(['closePath']);},fill(){canvas.ops.push(['fill',this.fillStyle]);},drawImage(...a){canvas.ops.push(['drawImage',...a]);},getImageData(){return {data:Canvas.alpha()};}};}
}
function setup(extra={}){Canvas.alpha=rgba;const created=[],revoked=[];let counter=0;const bitmaps=[];
 const decode=async()=>{const b={width:3,height:2,closed:false,close(){this.closed=true;}};bitmaps.push(b);return b;};
 const output=Buffer.concat([pngSignature,ihdr(1000,1000),idat,chunk('IEND')]);
 const session=new SceneSession({decode,createCanvas:()=>{const c=new Canvas();created.push(c);return c;},encode:async()=>new Blob([output],{type:'image/png'}),hash,createURL:()=>`blob:own-${++counter}`,revokeURL:u=>revoked.push(u),now:()=>Date.parse('2026-10-26T13:00:00.000Z'),...extra});session.identity('alpha');return{session,created,revoked,bitmaps,output};
}
// Break: rendering three different subject placements or allowing a layer above it.
test('decoded subject alpha and identical placement drive three actual subject-last scene canvases',async()=>{
 const{session,created}=setup();await session.load(file(original));assert.equal(session.state.status,'ready');assert.deepEqual(session.state.source.bounds,{x:1,y:0,width:1,height:2});assert.equal(session.state.source.transparentPixels,4);assert.equal(session.state.source.visiblePixels,2);
 assert.deepEqual(session.state.geometry.destination,{x:350,y:200,width:300,height:600});assert.deepEqual(session.state.scenes.map(s=>s.id),['linen','arch','steps']);
 const scratch=created.find(c=>c.ops.some(o=>o[0]==='drawImage'&&o.length===10));assert.ok(scratch);assert.deepEqual(scratch.ops.find(o=>o[0]==='drawImage').slice(2),[1,0,1,2,0,0,1,2]);
 for(const {canvas}of session.state.scenes){assert.equal(canvas.width,1000);assert.equal(canvas.height,1000);const op=canvas.ops.at(-1);assert.equal(op[0],'drawImage');assert.equal(op[1],scratch);assert.deepEqual(op.slice(2),[350,200,300,600]);}
});
// Break: fully opaque/all-transparent data bypasses the real decoded alpha check.
test('opaque or invisible first source refuses without inventing a retained preview',async()=>{
 for(const alpha of [255,0,15]){const{session}=setup();Canvas.alpha=()=>{const a=new Uint8ClampedArray(24);for(let n=3;n<24;n+=4)a[n]=alpha;return a;};await session.load(file(original));assert.equal(session.state.status,'error');assert.equal(session.state.retained,false);assert.equal(session.state.source,null);assert.equal(session.state.canPrepare,false);}
});
// Break: exact fingerprint reopen accidentally accepts a same-pixel different-byte file.
test('reopen requires exact source metadata and keeps an honestly labelled old preview on failure',async()=>{
 const{session}=setup();await session.load(file(original));assert.equal(session.state.status,'ready');const set={title:'SYN_SET',source:structuredClone(session.state.source),settings:{sizePercent:40,centerX:500,baselineY:700},sceneVersion:1};
 await session.load(file(changed),{set});assert.equal(session.state.status,'error');assert.equal(session.state.error.code,'source_mismatch');assert.equal(session.state.retained,true);assert.equal(session.state.canPrepare,false);
 await session.load(file(original),{set});assert.equal(session.state.status,'ready');assert.deepEqual(session.state.geometry.destination,{x:400,y:300,width:200,height:400});assert.equal(session.state.loadedSetTitle,'SYN_SET');
});
// Break: geometry error leaves a previously prepared image marked current.
test('invalid placement immediately removes downloads and valid repair rerenders all three',async()=>{
 const{session,revoked}=setup();await session.load(file(original));session.select('arch');await session.prepare();assert.equal(session.state.status,'prepared');const old=session.state.export.pngURL;
 session.configure({sizePercent:60,centerX:0,baselineY:800});assert.equal(session.state.status,'error');assert.equal(session.state.error.field,'centerX');assert.equal(session.state.export,null);assert.ok(revoked.includes(old));assert.equal(session.state.canPrepare,false);
 session.configure({sizePercent:20,centerX:100,baselineY:200});assert.equal(session.state.status,'ready');assert.equal(session.state.scenes.length,3);assert.deepEqual(session.state.geometry.destination,{x:50,y:0,width:100,height:200});
});
// Break: an implicit/unknown scene can produce a mislabeled export.
test('explicit scene selection is required and selected actual buffer binds the manifest',async()=>{
 const{session,output}=setup();await session.load(file(original));await assert.rejects(()=>session.prepare());assert.equal(session.state.export,null);assert.throws(()=>session.select('not-a-scene'));
 session.select('steps');await session.prepare();assert.equal(session.state.status,'prepared');const m=session.state.export.manifest;assert.equal(m.schema,'sahna-frame-export-v1');assert.equal(m.selectedScene,'steps');assert.equal(m.sceneVersion,1);assert.equal(m.output.sha256,await hash(output));assert.deepEqual(m.output,{format:'png',width:1000,height:1000,byteLength:output.length,sha256:await hash(output)});assert.equal(m.clientGeneratedAt,'2026-10-26T13:00:00.000Z');
});
// Break: malformed/mismatched generated bytes are presented as successfully prepared.
test('encoder failure and wrong output dimensions expose no current links',async()=>{
 for(const encode of [async()=>null,async()=>new Blob([png()]),async()=>new Blob([Buffer.alloc(8388609)])]){const{session}=setup({encode});await session.load(file(original));assert.equal(session.state.status,'ready');session.select('linen');await session.prepare();assert.equal(session.state.status,'error');assert.equal(session.state.export,null);assert.equal(session.state.canPrepare,false);}
});
// Break: an older decoded file replaces a newer generation or leaks its bitmap.
test('late decoder cannot replace a newer file and discarded bitmap closes',async()=>{
 const held=gate();let count=0;const stale={width:3,height:2,closed:false,close(){this.closed=true;}};const{session}=setup({decode:()=>++count===1?held.promise:Promise.resolve({width:3,height:2,close(){}})});
 const first=session.load(file(original));await until(()=>count>0);await session.load(file(changed));assert.equal(session.state.status,'ready');const sha=session.state.source.sha256;held.resolve(stale);await first;assert.equal(session.state.source.sha256,sha);assert.equal(session.state.source.sha256,await hash(changed));assert.equal(stale.closed,true);
});
// Break: settings/actor changes accept a pending encoder's now-obsolete result.
test('held export becomes stale after settings change or logout and creates no links',async()=>{
 for(const action of ['settings','logout']){const held=gate();const{session,output}=setup({encode:()=>held.promise});await session.load(file(original));assert.equal(session.state.status,'ready');session.select('linen');const pending=session.prepare();
 if(action==='settings')session.configure({sizePercent:40,centerX:500,baselineY:700});else session.identity(null);held.resolve(new Blob([output]));await pending;assert.equal(session.state.export,null);assert.equal(session.state.status,action==='settings'?'ready':'empty');}
});
// Break: a new identity keeps previous source/geometry/resources or delayed decode.
test('identity clears source selection geometry output and cancels pending decoding',async()=>{
 const held=gate();let started=false;const late={width:3,height:2,closed:false,close(){this.closed=true;}};const{session}=setup({decode:()=>{started=true;return held.promise;}});const pending=session.load(file(original));await until(()=>started);session.identity('beta');held.resolve(late);await pending;assert.equal(session.state.status,'empty');assert.equal(session.state.source,null);assert.equal(session.state.selectedScene,null);assert.deepEqual(session.state.settings,{sizePercent:60,centerX:500,baselineY:800});assert.equal(late.closed,true);
});
// Break: header/decoded dimensions disagree and alpha scan proceeds on a different image.
test('decoded dimensions must match bounded PNG header before accepting source',async()=>{
 const{session}=setup({decode:async()=>({width:99,height:2,close(){}})});await session.load(file(original));assert.equal(session.state.status,'error');assert.equal(session.state.error.code,'decode_dimensions');assert.equal(session.state.source,null);
});
