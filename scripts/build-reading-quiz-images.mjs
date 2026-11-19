import {execFileSync} from 'node:child_process';
import {mkdirSync,rmSync} from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const temp=path.join(root,'tmp','reading-quiz-pages');
const out=path.join(root,'app','quiz-images');
rmSync(temp,{recursive:true,force:true});
mkdirSync(temp,{recursive:true});
mkdirSync(out,{recursive:true});

const books={
  official4:{pdf:'docs/QUYỂN 4. BJT公式模擬テスト＆ガイド Siêu Tốc/BJT公式模擬テスト＆ガイド Siêu Tốc.pdf',sections:[
    {pages:[[22,3,null,.28,.96],[23,7]]},{pages:[[24,5,null,.12,.96],[25,5]]},{pages:Array.from({length:10},(_,i)=>[26+i,1])}
  ]},
  official6:{pdf:'docs/QUYỂN 6. BJTビジネス日本語能力テスト 公式 模擬テスト&ガイド/QUYỂN 6 .BJTビジネス日本語能力テスト 公式 模擬テスト&ガイド (1).pdf',sections:[
    {pages:[[47,5,null,.18,.96],[48,5]]},{pages:[[49,5,null,.18,.96],[50,5]]},{pages:Array.from({length:15},(_,i)=>[51+i,1])}
  ]},
  kato:{pdf:'docs/QUYỂN 5. Sách Luyện Thi BJT Đáp án và Đĩa Nghe/Sách Luyện Thi BJT – Đề Thi Thử Và Đáp Án Kỳ Thi Năng Lực Tiếng Nhật Thương Mại BJT CD.pdf',left:true,sections:[
    {pages:[[157,3,null,.18,.94],[158,4],[159,3]]},{pages:[[160,3,null,.18,.94],[161,3],[162,3],[163,1]]},{pages:Array.from({length:15},(_,i)=>[164+i,1]),singleLeft:true}
  ]},
  moshi:{pdf:'docs/QUYỂN 7. BJT 模試と対策/BJT 模試と対策 quyển đỏ.pdf',spread:true,sections:[
    {pages:[[22,5,'right'],[22,5,'left']]},{pages:[[23,4,'right'],[23,4,'left'],[24,2,'right']]},
    {pages:[[24,1,'left'],...Array.from({length:7},(_,i)=>[[25+i,1,'right'],[25+i,1,'left']]).flat()].slice(0,15)}
  ]}
};

function render(book,page){
  const dir=path.join(temp,book);mkdirSync(dir,{recursive:true});
  const prefix=path.join(dir,`page-${page}`);
  const file=path.join(dir,`page-${page}.jpg`);
  try{return file&&execFileSync('pdftoppm',['-f',String(page),'-l',String(page),'-singlefile','-jpeg','-r','180',path.join(root,books[book].pdf),prefix],{stdio:'ignore'}),file}catch(error){throw new Error(`Không render được ${book} trang ${page}: ${error.message}`)}
}
function crop(input,output,{x=0,y=.10,w=1,h=.84}={}){
  mkdirSync(path.dirname(output),{recursive:true});
  const filter=`crop=floor(iw*${w}/2)*2:floor(ih*${h}/2)*2:floor(iw*${x}/2)*2:floor(ih*${y}/2)*2`;
  execFileSync('ffmpeg',['-loglevel','error','-y','-i',input,'-vf',filter,'-q:v','3',output]);
}

for(const [book,config] of Object.entries(books)){
  config.sections.forEach((section,sectionIndex)=>{
    let number=0;
    for(const [page,count,side,customTop,customBottom] of section.pages){
      const input=render(book,page);
      for(let row=0;row<count;row++){
        number++;
        const isSpread=config.spread,baseX=side==='right'?.5:0,baseW=isSpread?.5:config.left?.54:1;
        const top=customTop??(config.left?.10:.08),bottom=customBottom??(config.left?.94:.96),band=(bottom-top)/count;
        const box=section.singleLeft?{x:0,y:.08,w:.49,h:.78}:{x:baseX,y:top+row*band,w:config.left?.49:baseW,h:band};
        crop(input,path.join(out,`${book}-s${sectionIndex+1}-q${number}.jpg`),box);
      }
    }
  });
}
console.log('Đã tạo ảnh riêng cho 135 câu đọc hiểu.');
