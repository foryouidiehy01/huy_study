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
  ['official4:6','720:700:650:1030'],
  ['official4:9','700:430:620:20'],
  ['official4:10','700:430:620:430'],
  ['official4:11','650:450:20:820'],
  ['official4:12','650:500:20:1260'],
  ['official4:13','720:470:650:790'],
  ['official4:14','720:520:650:1240'],
  ['official4:15','650:480:0:0'],
  ['official4:16','650:500:0:430'],
  ['official4:17','720:480:650:0'],
  ['official4:18','720:500:650:430'],
  ['official4:21','iw/2:ih*0.25:iw/2:ih*0.53'],
  ['official4:22','iw/2:ih*0.20:iw/2:ih*0.80'],
  ['official4:33','iw:ih*0.32:0:ih*0.38'],
  ['official4:34','iw:ih*0.30:0:ih*0.70']
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
    jobs.push({bookId:book.id,index,page,kind:guide.kind,pdfPath:path.join(docs,...pdf.path.split('/'))});
  }
}

const questionGroups=new Map();
for(const job of jobs.filter(item=>item.kind==='question'||item.kind==='missing')){
  const key=`${job.pdfPath}|${job.page}`;
  if(!questionGroups.has(key))questionGroups.set(key,[]);
  questionGroups.get(key).push(job);
}
for(const group of questionGroups.values()){
  group.sort((a,b)=>a.index-b.index);
  group.forEach((job,index)=>Object.assign(job,{groupIndex:index,groupSize:group.length}));
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
  else if(job.groupSize>1){
    let filter;
    if(job.bookId==='moshi'){
      // Every shared spread starts with one practice panel before the questions.
      const rows=Math.ceil((job.groupSize+1)/2);
      const slot=job.groupIndex+1;
      filter=`crop=iw/2:ih/${rows}:floor(${slot}/${rows})*iw/2:mod(${slot}\\,${rows})*ih/${rows}`;
    }
    else if(job.bookId==='chokai'&&job.groupSize===6){
      // Six numbered photos are laid out row-major in a 2 x 3 grid.
      filter=`crop=iw/2:ih/3:mod(${job.groupIndex}\\,2)*iw/2:floor(${job.groupIndex}/2)*ih/3`;
    }
    else if(job.bookId==='official4'){
      if(job.groupSize===8){
        const row=job.groupIndex%4;
        const y=['0','ih*0.25','ih*0.52','ih*0.76'][row];
        const height=['ih*0.25','ih*0.27','ih*0.24','ih*0.24'][row];
        filter=`crop=iw/2:${height}:floor(${job.groupIndex}/4)*iw/2:${y}`;
      }
      else filter=`crop=iw:ih/${job.groupSize}:0:${job.groupIndex}*ih/${job.groupSize}`;
    }
    else filter=`crop=iw:ih/${job.groupSize}:0:${job.groupIndex}*ih/${job.groupSize}`;
    await run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',source,'-vf',filter,'-q:v','2',target]);
  }
  else await copyFile(source,target);
}

await rm(cache,{recursive:true,force:true});
process.stdout.write(`Created ${jobs.length} track images from ${entries.length} source pages in ${output}\n`);
