function fail(field,code='invalid'){const e=new Error('Invalid '+field);e.field=field;e.code=code;throw e;}
export function checkKeys(value,keys,label='object'){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==keys.length||!keys.every(k=>Object.hasOwn(value,k)))fail(label);
}
export function integer(value,min,max,field){if(!Number.isSafeInteger(value)||value<min||value>max)fail(field);return value;}
function size(width,height){integer(width,1,4096,'width');integer(height,1,4096,'height');if(width*height>4000000)fail('pixels','file_limits');}
export function alphaBounds(rgba,width,height){
 size(width,height);if(!(rgba instanceof Uint8Array||rgba instanceof Uint8ClampedArray)||rgba.length!==width*height*4)fail('rgba');
 let minX=width,minY=height,maxX=-1,maxY=-1,transparentPixels=0,visiblePixels=0;
 for(let pixel=0;pixel<width*height;pixel++){const alpha=rgba[pixel*4+3];if(alpha===0)transparentPixels++;else{const x=pixel%width,y=Math.floor(pixel/width);minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}if(alpha>=16)visiblePixels++;}
 if(!transparentPixels)fail('alpha','alpha_opaque');if(!visiblePixels)fail('alpha','alpha_empty');
 return {bounds:{x:minX,y:minY,width:maxX-minX+1,height:maxY-minY+1},transparentPixels,visiblePixels};
}
export function sourceMetadata(input){
 checkKeys(input,['format','sha256','byteLength','width','height','bounds','transparentPixels','visiblePixels'],'source');
 if(input.format!=='png'||typeof input.sha256!=='string'||!/^([a-f0-9]{64})$/.test(input.sha256))fail('source');
 integer(input.byteLength,1,4194304,'byteLength');size(input.width,input.height);checkKeys(input.bounds,['x','y','width','height'],'bounds');
 const b=input.bounds;integer(b.x,0,input.width-1,'bounds.x');integer(b.y,0,input.height-1,'bounds.y');integer(b.width,1,input.width,'bounds.width');integer(b.height,1,input.height,'bounds.height');
 if(b.x+b.width>input.width||b.y+b.height>input.height)fail('bounds');
 const pixels=input.width*input.height,area=b.width*b.height;integer(input.transparentPixels,1,pixels-1,'transparentPixels');integer(input.visiblePixels,1,pixels-input.transparentPixels,'visiblePixels');
 if(area<input.visiblePixels||input.transparentPixels<pixels-area)fail('alphaCounts');return structuredClone(input);
}
export function placement(source,settings){
 const s=sourceMetadata(source);checkKeys(settings,['sizePercent','centerX','baselineY'],'settings');
 const side=integer(settings.sizePercent,20,80,'sizePercent')*10;integer(settings.centerX,0,1000,'centerX');integer(settings.baselineY,0,1000,'baselineY');
 const b=s.bounds,long=Math.max(b.width,b.height),width=Math.max(1,Math.round(b.width*side/long)),height=Math.max(1,Math.round(b.height*side/long));
 const x=Math.floor(settings.centerX-width/2),y=settings.baselineY-height;
 if(x<0||x+width>1000)fail('centerX','placement_outside');if(y<0||y+height>1000)fail('baselineY','placement_outside');
 return {sourceRect:b,destination:{x,y,width,height},output:{width:1000,height:1000}};
}
const scenes={
 linen:{id:'linen',version:1,background:'#f0e9dc',shapes:[{kind:'rect',x:0,y:680,width:1000,height:320,fill:'#d3c3ae'},{kind:'rect',x:80,y:0,width:160,height:680,fill:'#e3d9cc'}],shadow:'#9b8c7b',layerOrder:['background','shadow','subject']},
 arch:{id:'arch',version:1,background:'#ddb7a3',shapes:[{kind:'arch',x:70,y:100,width:400,height:600,fill:'#3a415f'},{kind:'rect',x:0,y:700,width:1000,height:300,fill:'#a7b3c5'}],shadow:'#686a7a',layerOrder:['background','shadow','subject']},
 steps:{id:'steps',version:1,background:'#d7e3da',shapes:[{kind:'rect',x:0,y:760,width:1000,height:240,fill:'#8baba0'},{kind:'rect',x:0,y:870,width:350,height:130,fill:'#527d72'},{kind:'rect',x:700,y:820,width:300,height:180,fill:'#b4c9b7'}],shadow:'#5c7a70',layerOrder:['background','shadow','subject']}
};
export function sceneSpec(id,version=1){if(typeof id!=='string'||!Object.hasOwn(scenes,id)||version!==1)fail('sceneVersion');return structuredClone(scenes[id]);}
export function normalizeSet(input){
 checkKeys(input,['title','source','settings','sceneVersion'],'set');if(typeof input.title!=='string'||!input.title.trim()||input.title.trim().length>120)fail('title');if(input.sceneVersion!==1)fail('sceneVersion');
 const source=sourceMetadata(input.source),geometry=placement(source,input.settings);
 return {title:input.title.trim(),source,settings:structuredClone(input.settings),sceneVersion:1,scenes:['linen','arch','steps'],geometry};
}
