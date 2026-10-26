import test from 'node:test';import assert from 'node:assert/strict';
import {alphaBounds,sourceMetadata,placement,normalizeSet,sceneSpec} from '../public/scene.js';
const source=(overrides={})=>({format:'png',sha256:'a'.repeat(64),byteLength:100,width:3,height:2,bounds:{x:0,y:0,width:3,height:2},transparentPixels:1,visiblePixels:5,...overrides});
const settings=(overrides={})=>({sizePercent:60,centerX:500,baselineY:800,...overrides});
// Break: dropping faint edges from bounds or accepting an opaque/empty subject.
test('actual alpha bounds keep faint edges while requiring transparent and visible pixels',()=>{
 const rgba=new Uint8ClampedArray([0,0,0,0,100,20,30,255,0,0,0,0,20,40,60,1,70,80,90,16,0,0,0,0]);
 assert.deepEqual(alphaBounds(rgba,3,2),{bounds:{x:0,y:0,width:2,height:2},transparentPixels:3,visiblePixels:2});
 for(const alphas of [[255,255],[0,0],[0,15]]){const data=new Uint8ClampedArray(8);data[3]=alphas[0];data[7]=alphas[1];assert.throws(()=>alphaBounds(data,2,1));}
});
// Break: malformed buffer/dimensions allocate or scan the wrong pixel range.
test('alpha scan rejects malformed dimensions and mismatched byte buffers',()=>{
 for(const args of [[new Uint8ClampedArray(4),2,1],[new Uint8ClampedArray(4),0,1],[new Uint8ClampedArray(4),1.5,1],[new Uint8ClampedArray(4),4097,1]])assert.throws(()=>alphaBounds(...args));
});
// Break: trusting declared alpha counts/bounds that cannot describe this source.
test('source metadata enforces bounds counts bytes pixels strict keys and actual numeric types',()=>{
 assert.deepEqual(sourceMetadata(source()),source());
 for(const input of [source({format:'jpeg'}),source({byteLength:4194305}),source({width:4097}),source({width:3000,height:2000}),source({transparentPixels:0}),source({visiblePixels:0}),source({visiblePixels:6}),source({bounds:{x:1,y:0,width:3,height:2}}),source({width:'3'}),source({sha256:'A'.repeat(64)}),source({file:'private.png'}),source({bounds:{x:0,y:0,width:1,height:1},transparentPixels:1,visiblePixels:1})])assert.throws(()=>sourceMetadata(input));
});
// Break: integer rounding shifts subject, stretches its aspect, or ignores bounds.
test('placement preserves subject aspect and uses literal centered baseline coordinates',()=>{
 assert.deepEqual(placement(source(),settings()),{sourceRect:{x:0,y:0,width:3,height:2},destination:{x:200,y:400,width:600,height:400},output:{width:1000,height:1000}});
 assert.deepEqual(placement(source({width:2,height:3,bounds:{x:0,y:0,width:2,height:3}}),settings()).destination,{x:300,y:200,width:400,height:600});
 assert.deepEqual(placement(source(),settings({sizePercent:21})).destination,{x:395,y:660,width:210,height:140});
 assert.deepEqual(placement(source({width:10,height:10,bounds:{x:3,y:4,width:2,height:3},transparentPixels:94,visiblePixels:6}),settings()).sourceRect,{x:3,y:4,width:2,height:3});
});
// Break: min/max bounds or off-canvas placement clips visible subject pixels.
test('placement limits accept exact edges and identify overflow fields',()=>{
 assert.deepEqual(placement(source(),settings({sizePercent:20,centerX:100,baselineY:133})).destination,{x:0,y:0,width:200,height:133});
 assert.deepEqual(placement(source(),settings({sizePercent:80,centerX:600,baselineY:1000})).destination,{x:200,y:467,width:800,height:533});
 for(const [s,field]of [[settings({centerX:0}),'centerX'],[settings({baselineY:0}),'baselineY'],[settings({sizePercent:19}),'sizePercent'],[settings({sizePercent:81}),'sizePercent'],[settings({centerX:500.5}),'centerX']])assert.throws(()=>placement(source(),s),e=>e.field===field);
 assert.throws(()=>placement(source(),{...settings(),rotate:0}));
});
// Break: accepting a different scene/version silently changes the frozen set.
test('authored scene specifications are distinct v1 backgrounds with subject-last layer contract',()=>{
 const all=['linen','arch','steps'].map(id=>sceneSpec(id,1));
 assert.deepEqual(all.map(x=>x.id),['linen','arch','steps']);assert.equal(new Set(all.map(x=>x.background)).size,3);
 for(const s of all){assert.equal(s.version,1);assert.deepEqual(s.layerOrder,['background','shadow','subject']);assert.ok(s.shapes.length>0);}
 assert.throws(()=>sceneSpec('unknown',1));assert.throws(()=>sceneSpec('linen',2));assert.throws(()=>sceneSpec('linen','1'));
 all[0].background='changed';assert.notEqual(sceneSpec('linen',1).background,'changed');
});
// Break: normalization retains caller mutations or accepts unknown source/settings data.
test('frozen set normalizes title and independently copies source geometry and fixed scene IDs',()=>{
 const input={title:'  SYN_ЖИЫН  ',source:source(),settings:settings(),sceneVersion:1};const row=normalizeSet(input);
 assert.equal(row.title,'SYN_ЖИЫН');assert.deepEqual(row.scenes,['linen','arch','steps']);assert.deepEqual(row.geometry.destination,{x:200,y:400,width:600,height:400});
 input.source.bounds.width=1;input.settings.sizePercent=20;assert.equal(row.source.bounds.width,3);assert.equal(row.settings.sizePercent,60);
 const valid={title:'SYN',source:source(),settings:settings(),sceneVersion:1};
 for(const invalid of [{...valid,title:' '},{...valid,title:'x'.repeat(121)},{...valid,sceneVersion:2},{...valid,owner:'forged'},{...valid,selectedScene:'arch'}])assert.throws(()=>normalizeSet(invalid));
});
