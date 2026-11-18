import {spawn} from 'node:child_process';
import {copyFile,mkdir,rm} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {books} from '../app/resources.js';
import {trackGuides} from '../app/track-guides.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=path.join(root,'docs');
const output=path.join(docs,'track-images');
const cache=path.join(root,'tmp','track-image-cache');
const jobs=[];
const crops=new Map([
  ['official4:2','650:500:620:40'],
  ['official4:3','650:500:620:500'],
  ['official4:4','620:420:20:930'],
  ['official4:5','650:500:20:1300'],
  ['official4:6','720:700:650:1030']
]);

for(const book of books.filter(item=>item.audio.length)){
  const guides=trackGuides[book.id]||[];
  for(let index=0;index<book.audio.length;index++){
    const guide=guides[index];
    if(!guide)continue;
    const page=guide.visualPage||guide.sourcePage;
    const pdfIndex=Number.isInteger(guide.visualPdfIndex)?guide.visualPdfIndex:(guide.sourcePdfIndex||0);
    const pdf=book.pdfs[pdfIndex];
    if(!pdf||!Number.isInteger(page))continue;
    jobs.push({bookId:book.id,index,page,pdfPath:path.join(docs,...pdf.path.split('/'))});
  }
}

await mkdir(cache,{recursive:true});
await mkdir(output,{recursive:true});
const unique=new Map();
for(const job of jobs){
  const key=`${job.pdfPath}|${job.page}`;
  if(!unique.has(key))unique.set(key,{...job,key});
}

function run(command,args){
  return new Promise((resolve,reject)=>{
    const child=spawn(command,args,{stdio:['ignore','ignore','pipe']});
    let error='';
    child.stderr.on('data',chunk=>error+=chunk);
    child.on('error',reject);
    child.on('close',code=>code===0?resolve():reject(new Error(`${command} exited ${code}: ${error}`)));
  });
}

const entries=[...unique.values()];
let cursor=0,rendered=0;
async function worker(){
  while(cursor<entries.length){
    const current=entries[cursor++];
    if(!existsSync(current.pdfPath))throw new Error(`Missing PDF: ${current.pdfPath}`);
    const base=path.join(cache,`page-${String(cursor).padStart(4,'0')}`);
    await run('pdftoppm',['-f',String(current.page),'-l',String(current.page),'-singlefile','-jpeg','-jpegopt','quality=88','-scale-to','1800',current.pdfPath,base]);
    current.cached=`${base}.jpg`;
    rendered++;
    if(rendered%25===0)process.stdout.write(`Rendered ${rendered}/${entries.length}\n`);
  }
}
await Promise.all(Array.from({length:Math.min(4,entries.length)},worker));

const cacheByKey=new Map(entries.map(item=>[item.key,item.cached]));
for(const job of jobs){
  const dir=path.join(output,job.bookId);
  await mkdir(dir,{recursive:true});
  const source=cacheByKey.get(`${job.pdfPath}|${job.page}`);
  const target=path.join(dir,`track-${String(job.index+1).padStart(3,'0')}.jpg`);
  const crop=crops.get(`${job.bookId}:${job.index}`);
  if(crop)await run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',source,'-vf',`crop=${crop}`,'-q:v','2',target]);
  else await copyFile(source,target);
}

await rm(cache,{recursive:true,force:true});
process.stdout.write(`Created ${jobs.length} track images from ${entries.length} source pages in ${output}\n`);
