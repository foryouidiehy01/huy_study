// Metadata below only maps material that is present in docs. Answers are copied
// from the books' own answer keys; tracks without a verifiable key are never scored.
const sample=(section,sourcePage=1,note='Track hướng dẫn, ví dụ hoặc hội thoại; không có đáp án để chấm.')=>({kind:'sample',section,sourcePage,note});
const question=(section,number,answer,sourcePage,extra={})=>({kind:'question',section,number,answer,sourcePage,...extra});
const missing=(section,sourcePage,note)=>({kind:'missing',section,sourcePage,note});
const fill=(count,make)=>Array.from({length:count},(_,index)=>make(index+1));

function putQuestions(guides,{start,answers,section,pages,sourcePdfIndex=0,answerPage}){
  answers.forEach((answer,index)=>{
    const page=Array.isArray(pages)?pages[index]:pages;
    guides[start-1+index]=question(section,index+1,answer,page,{sourcePdfIndex,answerPage});
  });
}

const wakaruAnswers=[
  1,3,2,3,2, 2,2,2,1,2, 1,2,4,2,2,
  2,4,3,3,3, 1,3,2,1,3, 3,3,2,3,3,
  1,4,2,2,2, 3,3,3,3,2, 2,1,2,2,2
];
const wakaru=fill(51,n=>sample(n===1?'Mở đầu':n>=47?'Useful expressions':`Scene ${n-1}`,Math.min(151,14+Math.max(0,n-1)*3)));
wakaruAnswers.forEach((answer,index)=>{
  wakaru[index+1]=question(`Scene ${index+1}`,index+1,answer,Math.min(147,19+Math.floor(index*2.85)),{answerPage:152});
});

// The 30-hour course uses audio for model discourse/conversation and shadowing.
// Its quizzes are printed exercises, not one-answer-per-track test items.
const nihongo30=fill(57,n=>sample(`Bài học · Track ${n}`,Math.min(128,14+Math.floor((n-1)*2)),'Hội thoại hoặc bài mẫu có script trong sách; nghe, đối chiếu rồi shadowing. Track này không phải câu trắc nghiệm có một đáp án.'));

const official4=fill(64,n=>({...sample('Hướng dẫn / ví dụ của đề',66),sourcePdfIndex:1}));
putQuestions(official4,{start:3,section:'第1部 聴解 · セクション1',answers:[1,2,1,4,3],pages:66,sourcePdfIndex:1,answerPage:66});
putQuestions(official4,{start:10,section:'第1部 聴解 · セクション2',answers:[2,2,4,1,1,3,3,3,2,1],pages:66,sourcePdfIndex:1,answerPage:66});
putQuestions(official4,{start:22,section:'第1部 聴解 · セクション3',answers:[2,4,4,2,1,4,2,3,4,4],pages:66,sourcePdfIndex:1,answerPage:66});
putQuestions(official4,{start:34,section:'第2部 聴読解 · セクション1',answers:[4,2,1,1,2],pages:66,sourcePdfIndex:1,answerPage:66});
putQuestions(official4,{start:41,section:'第2部 聴読解 · セクション2',answers:[1,2,2,2,1,3,4,4,2,1],pages:66,sourcePdfIndex:1,answerPage:66});
putQuestions(official4,{start:53,section:'第2部 聴読解 · セクション3',answers:[4,4,3,1,2,1,2,2,4,3],pages:66,sourcePdfIndex:1,answerPage:66});

const kato=fill(79,n=>sample(n<=42?'CD1 · Hướng dẫn / ví dụ':'CD2 · Hướng dẫn / ví dụ',n<=42?97:124));
putQuestions(kato,{start:4,section:'第1部 聴解 · セクション1',answers:[1,2,3,3,4,4,4,3,2,1],pages:[99,99,99,100,100,100,101,101,101,102]});
putQuestions(kato,{start:16,section:'第1部 聴解 · セクション2',answers:[3,3,1,4,2,2,1,1,3,4],pages:[104,104,105,105,106,106,107,107,108,108]});
putQuestions(kato,{start:28,section:'第1部 聴解 · セクション3',answers:[2,2,2,3,1,1,4,1,3,1],pages:fill(10,n=>109+n)});
putQuestions(kato,{start:44,section:'第2部 聴読解 · セクション1',answers:[1,1,4,4,3,4,2,2,2,1,3,4,2,1,3],pages:fill(15,n=>125+n)});
putQuestions(kato,{start:61,section:'第2部 聴読解 · セクション2',answers:[1,4,2,4,4,3,3,2,1,4,3,2,3,2,1],pages:fill(15,n=>141+n)});

const official6=fill(71,n=>sample('Hướng dẫn / ví dụ của đề',n<39?66:93));
putQuestions(official6,{start:2,section:'第1部 聴解 · セクション1',answers:[3,1,1,2,3,3,3,3,1,1],pages:[67,67,67,68,68,68,69,69,69,70]});
putQuestions(official6,{start:13,section:'第1部 聴解 · セクション2',answers:[3,4,3,4,2,2,2,4,1,1],pages:[72,72,73,73,74,74,75,75,76,76]});
putQuestions(official6,{start:24,section:'第1部 聴解 · セクション3',answers:[2,3,3,4,1,2,1,2,2,3,2,1,2,2,4],pages:fill(15,n=>77+n)});
putQuestions(official6,{start:40,section:'第2部 聴読解 · セクション1',answers:[2,4,3,4,1,1,3,2,4,2,1,3,3,4,1],pages:[94,94,95,95,96,97,98,99,100,101,102,103,104,105,106]});
putQuestions(official6,{start:56,section:'第2部 聴読解 · セクション2',answers:[4,3,1,1,3,4,3,2,3,2,4,1,4,2,4],pages:fill(15,n=>107+n)});

const moshi=fill(76,n=>sample('Hướng dẫn / ví dụ của đề',33));
putQuestions(moshi,{start:4,section:'第1部 聴解 · セクション1',answers:[3,3,1,2,3,2,1,4,2,4],pages:33,answerPage:33});
putQuestions(moshi,{start:16,section:'第1部 聴解 · セクション2',answers:[1,3,1,4,3,2,4,2,2,4],pages:33,answerPage:33});
putQuestions(moshi,{start:28,section:'第1部 聴解 · セクション3',answers:[4,4,1,4,4,4,4,2,3,2,4,3,1,4,4],pages:33,answerPage:33});
putQuestions(moshi,{start:45,section:'第2部 聴読解 · セクション1',answers:[3,4,4,2,3,4,3,1,1,1,3,4,1,3,4],pages:33,answerPage:33});
putQuestions(moshi,{start:62,section:'第2部 聴読解 · セクション2',answers:[4,2,2,3,4,3,3,3,4,2,2,1,2,4,2],pages:33,answerPage:33});

// The supplied gold-book scan ends at PDF page 84. It references answer pages
// beyond the supplied scan, so every track stays explicitly unscored.
const chokai=[
  ...fill(51,n=>missing(`CD1 · Track ${n}`,Math.min(35,1+Math.floor((n-1)*34/50)),'PDF có bài nghe/câu hỏi nhưng phần đáp án được sách dẫn tới không nằm trong file đã cung cấp.')),
  ...fill(76,n=>missing(`CD2 · Track ${n}`,Math.min(84,36+Math.floor((n-1)*48/75)),'PDF có bài nghe/câu hỏi nhưng phần đáp án được sách dẫn tới không nằm trong file đã cung cấp.'))
];

export const trackGuides={wakaru,nihongo30,official4,kato,official6,moshi,chokai};
export const trackGuideStats=Object.values(trackGuides).flat().reduce((stats,item)=>{
  stats.total++;
  stats[item.kind]=(stats[item.kind]||0)+1;
  return stats;
},{total:0,question:0,sample:0,missing:0});
