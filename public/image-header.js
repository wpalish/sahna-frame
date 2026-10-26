// Owned QiyiqFrame bounded PNG framing adapted for SahnaFrame stricter input policy.
// Framing/CRC only; browser decode/dimension/actual-alpha checks remain mandatory.
const bad=(message,code='file_format')=>{const e=new Error(message);e.code=code;throw e;};
const u16=(b,p)=>(b[p]<<8)|b[p+1];
const u32=(b,p)=>(b[p]*0x1000000)+(b[p+1]<<16)+(b[p+2]<<8)+b[p+3];
const ascii=(b,p,n)=>String.fromCharCode(...b.subarray(p,p+n));
function dimensions(width,height) {
 if(!width||!height||width>4096||height>4096||width*height>4000000)bad('Source exceeds dimension/pixel limit','file_limits');
 return {width,height};
}
function crc32(bytes,start,end) {
 let c=0xffffffff;
 for(let p=start;p<end;p++){c^=bytes[p];for(let i=0;i<8;i++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;}
 return (c^0xffffffff)>>>0;
}
function pngHeader(b) {
 if(b.length<45||ascii(b,1,3)!=='PNG'||b[4]!==13||b[5]!==10||b[6]!==26||b[7]!==10)bad('Invalid PNG signature');
 let p=8,count=0,size,color,depth,palette=false,data=false,dataEnded=false,ended=false,transparency=false;
 while(p<b.length) {
  if(++count>10000||p+12>b.length)bad('PNG chunk limit or truncation');
  const len=u32(b,p),type=ascii(b,p+4,4),start=p+8,end=start+len;
  if(!/^[A-Za-z]{2}[A-Z][A-Za-z]$/.test(type)||end+4>b.length)bad('Invalid PNG chunk framing');
  if(crc32(b,p+4,end)!==u32(b,end))bad('PNG CRC mismatch');
  if(count===1&&type!=='IHDR')bad('PNG header must be first');
  if(['acTL','fcTL','fdAT','eXIf'].includes(type))bad('Animated/EXIF PNG is unsupported; flatten first');
  if(type==='IHDR') {
   if(size||len!==13)bad('Invalid or duplicate PNG header');
   size=dimensions(u32(b,start),u32(b,start+4));depth=b[start+8];color=b[start+9];
   const allowed={0:[1,2,4,8,16],2:[8,16],3:[1,2,4,8],4:[8,16],6:[8,16]};
   if(!allowed[color]?.includes(depth)||b[start+10]!==0||b[start+11]!==0||b[start+12]>1)bad('Unsupported PNG method');
  } else if(type==='PLTE') {
   if(palette||data||[0,4].includes(color)||len<3||len>768||len%3||color===3&&len/3>2**depth)bad('Invalid PNG palette');
   palette=true;
  } else if(type==='tRNS') {
   if(transparency||data||!([0,2,3].includes(color))||color===0&&len!==2||color===2&&len!==6||color===3&&(!palette||len<1||len>256))bad('Invalid PNG transparency');
   transparency=true;
  } else if(type==='IDAT') {
   if(dataEnded||color===3&&!palette)bad('Invalid PNG data order');
   data=true;
  } else if(type==='IEND') {
   if(!data||len!==0||end+4!==b.length)bad('Missing PNG data or nonfinal end');
   ended=true;
  } else if(type[0]===type[0].toUpperCase())bad('Unknown critical PNG chunk');
  if(data&&type!=='IDAT')dataEnded=true;
  p=end+4;
  if(ended)break;
 }
 if(!size||!ended)bad('Incomplete PNG');
 return {format:'png',...size,byteLength:b.length};
}
export function inspectSubjectPNG(bytes){
 if(!(bytes instanceof Uint8Array)||!bytes.length||bytes.length>4194304)bad('Input must be1–4194304bytes','file_size');
 if(bytes[0]!==137)bad('Only single-frame PNG is supported');return pngHeader(bytes);
}
export function inspectScenePNG(bytes){
 if(!(bytes instanceof Uint8Array)||!bytes.length||bytes.length>8388608)bad('Output exceeds8MiB','output_size');
 if(bytes[0]!==137)bad('Encoded output must bePNG');const header=pngHeader(bytes);
 if(header.width!==1000||header.height!==1000)bad('Output must be1000square','output_dimensions');return header;
}
