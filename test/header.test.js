import test from 'node:test';import assert from 'node:assert/strict';
import {inspectSubjectPNG,inspectScenePNG} from '../public/image-header.js';
import {png,pngSignature,ihdr,idat,chunk,jpeg} from './image-fixtures.js';
const sized=(w,h,...extra)=>Buffer.concat([pngSignature,ihdr(w,h),...extra,idat,chunk('IEND')]);
// Break: labels or bytes bypass a complete PNG framing/CRC check.
test('subject PNG reads exact dimensions and bytes while refusing CRC/truncation/trailing data',()=>{
 assert.deepEqual(inspectSubjectPNG(png()),{format:'png',width:3,height:2,byteLength:png().length});const corrupt=png();corrupt[29]^=1;
 for(const b of [corrupt,png().subarray(0,25),png().subarray(0,-1),Buffer.concat([png(),Buffer.from([0])])])assert.throws(()=>inspectSubjectPNG(b));
});
// Break: accepted orientation/animation/critical metadata changes intended subject.
test('single PNG rejects animation EXIF unknown critical chunks but accepts own text metadata',()=>{
 for(const type of ['acTL','fcTL','fdAT','eXIf','ABCD'])assert.throws(()=>inspectSubjectPNG(png(chunk(type,Buffer.alloc(8)))));
 assert.equal(inspectSubjectPNG(png(chunk('tEXt',Buffer.from('own\0synthetic')))).width,3);
 for(const b of [jpeg(),Buffer.from('<svg/>'),Buffer.from('GIF89a'),Buffer.from('RIFFxxxxWEBP')])assert.throws(()=>inspectSubjectPNG(b));
});
// Break: caps inherited from a larger product permit an unbounded source allocation here.
test('source dimension and byte caps enforce4MiB4MP4096 before any browser decode',()=>{
 for(const [w,h]of [[0,2],[4097,1],[2001,2000],[0xffffffff,1]])assert.throws(()=>inspectSubjectPNG(sized(w,h)));
 assert.equal(inspectSubjectPNG(sized(2000,2000)).height,2000);assert.equal(inspectSubjectPNG(sized(4096,1)).width,4096);
 const pad=4194304-png().length-12,exact=png(chunk('tEXt',Buffer.alloc(pad)));assert.equal(exact.length,4194304);assert.equal(inspectSubjectPNG(exact).byteLength,4194304);assert.throws(()=>inspectSubjectPNG(png(chunk('tEXt',Buffer.alloc(pad+1)))));
});
// Break: duplicate/out-of-order chunks or invalid PNG methods sneak through to decode.
test('invalid PNG order duplicate header palette and methods refuse',()=>{
 for(const parts of [[ihdr(),ihdr(),idat,chunk('IEND')],[chunk('tEXt'),ihdr(),idat,chunk('IEND')],[ihdr(),chunk('IEND')],[ihdr(),idat],...[ihdr(3,2,3,6),ihdr(3,2,8,5),ihdr(3,2,8,6,1),ihdr(3,2,8,6,0,1),ihdr(3,2,8,6,0,0,2)].map(h=>[h,idat,chunk('IEND')])])assert.throws(()=>inspectSubjectPNG(Buffer.concat([pngSignature,...parts])));
});
// Break: source byte budget is applied to generated output or dimensions mismatch is ignored.
test('generated scene PNG uses separate8MiB budget and exact1000square dimensions',()=>{
 const base=sized(1000,1000),b=sized(1000,1000,chunk('tEXt',Buffer.alloc(5000000)));assert.equal(inspectScenePNG(base).width,1000);assert.equal(inspectScenePNG(b).byteLength,b.length);assert.throws(()=>inspectSubjectPNG(b));
 for(const bytes of [sized(999,1000),sized(1000,999),jpeg(),Buffer.alloc(8388609)])assert.throws(()=>inspectScenePNG(bytes));
});
// Break: callers can coerce nonbytes or an empty source into accepted metadata.
test('PNG interfaces reject nonbyte and empty input',()=>{
 for(const input of [null,{},'png',[],new Uint8Array(0)]){assert.throws(()=>inspectSubjectPNG(input));assert.throws(()=>inspectScenePNG(input));}
});
