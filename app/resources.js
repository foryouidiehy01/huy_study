const pad=(value,size=2)=>String(value).padStart(size,'0');
const range=(count,make)=>Array.from({length:count},(_,index)=>make(index+1));

export const books=[
  {
    id:'keigo',order:0,phase:1,kind:'Tài liệu bổ trợ',accent:'blue',
    title:'Tôn kính ngữ & Khiêm nhường ngữ',jp:'尊敬語・謙譲語',
    description:'Bảng tra nhanh cách biến đổi động từ, phân biệt hành động của đối phương và bản thân, kèm các lỗi dùng kính ngữ thường gặp.',
    focus:['Kính ngữ','Khiêm nhường ngữ','Lỗi thường gặp'],
    pdfs:[{label:'Bảng tổng hợp 3 trang',pages:3,path:'Tôn kính ngữ & Khiêm nhường ngữ (Thầy Tiệp pro yêu du).pdf'}],
    audio:[],note:'Nên đọc trước bài Kính ngữ trong công việc và dùng như bảng tra nhanh.'
  },
  {
    id:'wakaru',order:1,phase:1,kind:'Giáo trình nền tảng',accent:'blue',
    title:'わかるビジネス日本語',jp:'Contemporary Business Japanese',
    description:'Giáo trình nhập môn BJT theo chức năng giao tiếp: giới thiệu, trình bày ý định, hỏi, bắt chuyện, nhờ vả, từ chối, xin phép, xác nhận, khuyên và chào hỏi.',
    focus:['Hội thoại công sở','Chức năng giao tiếp','Nền tảng BJT'],
    pdfs:[{label:'Giáo trình',pages:155,path:'QUYỂN 1. わかるビジネス日本語quyển xanh/わかるビジネス日本語.pdf'}],
    audio:range(51,n=>({label:`Track ${n}`,path:`QUYỂN 1. わかるビジネス日本語quyển xanh/${pad(n)} Track ${n}.wma`,format:'WMA'})),
    note:'Audio gốc là WMA. Chrome/Safari có thể không phát; Edge trên Windows thường tương thích tốt hơn.'
  },
  {
    id:'nihongo30',order:3,phase:1,kind:'Giáo trình thực hành',accent:'orange',
    title:'にほんごで働く！ビジネス日本語30時間',jp:'Tiếng Nhật thương mại trong 30 giờ',
    description:'Khóa thực hành theo tình huống đi làm, kết hợp hội thoại, mẫu câu, từ vựng và bài luyện để dùng tiếng Nhật đúng vai vế trong công sở.',
    focus:['Tình huống nơi làm việc','Mẫu câu thực dụng','Phản xạ giao tiếp'],
    pdfs:[{label:'Giáo trình',pages:181,path:'QUYỂN 3. ビジネス日本語30時間/にほんごで働く!ビジネス日本語30時間.pdf'}],
    audio:range(57,n=>({label:`Track ${n}`,path:`QUYỂN 3. ビジネス日本語30時間/${pad(n)}_Track ${n}.mp3`,format:'MP3'})),
    note:'Học theo bài trong sách; nghe lần đầu không nhìn chữ, lần hai đối chiếu và shadowing.'
  },
  {
    id:'official4',order:4,phase:3,kind:'Đề thi thử chính thức',accent:'gray',
    title:'BJT公式模擬テスト＆ガイド',jp:'Official Practice Test & Guide',
    description:'Bộ mô phỏng cấu trúc BJT gồm 聴解, 聴読解 và 読解; có bản đề, bản đáp án/hướng dẫn và audio tương ứng.',
    focus:['Đề thi đủ 3 phần','Canh thời gian','Phân tích đáp án'],
    pdfs:[
      {label:'Bản đề',pages:35,path:'QUYỂN 4. BJT公式模擬テスト＆ガイド Siêu Tốc/BJT公式模擬テスト＆ガイド Siêu Tốc.pdf'},
      {label:'Bản có đáp án',pages:123,path:'QUYỂN 4. BJT公式模擬テスト＆ガイド Siêu Tốc/Có đáp án BJTビジネス日本語能力テスト公式模擬テスト＆ガイド.pdf'}
    ],
    audio:range(64,n=>({label:`Track ${n}`,path:`QUYỂN 4. BJT公式模擬テスト＆ガイド Siêu Tốc/${pad(n)} トラック ${n}.mp3`,format:'MP3'})),
    note:'Làm bản đề trước, sau đó mới mở bản đáp án để ghi nguyên nhân sai.'
  },
  {
    id:'kato',order:5,phase:2,kind:'Đề thử & giải thích song ngữ',accent:'navy',
    title:'Đề thi thử và đáp án BJT',jp:'体験テストと解説・改訂版',
    description:'Sách của Kiyokata Kato có hướng dẫn tiếng Việt, đề trải nghiệm, script, đáp án và giải thích cho nghe, nghe-đọc và đọc hiểu.',
    focus:['Hiểu cấu trúc BJT','Giải thích tiếng Việt','Script nghe'],
    pdfs:[{label:'Sách song ngữ',pages:222,path:'QUYỂN 5. Sách Luyện Thi BJT Đáp án và Đĩa Nghe/Sách Luyện Thi BJT – Đề Thi Thử Và Đáp Án Kỳ Thi Năng Lực Tiếng Nhật Thương Mại BJT CD.pdf'}],
    audio:range(79,n=>({label:`Track ${pad(n,3)}`,path:`QUYỂN 5. Sách Luyện Thi BJT Đáp án và Đĩa Nghe/${pad(n,3)}.mp3`,format:'MP3'})),
    note:'Đây là bộ phù hợp để làm cầu nối từ giáo trình nền tảng sang đề thi hoàn chỉnh.'
  },
  {
    id:'official6',order:6,phase:3,kind:'Đề thi thử chính thức',accent:'slate',
    title:'BJTビジネス日本語能力テスト 公式模擬テスト&ガイド',jp:'Official Practice Test & Guide',
    description:'Một bộ đề chính thức khác để luyện đủ ba phần, kiểm tra sức bền và so sánh lỗi sau khi đã nắm định dạng bài thi.',
    focus:['Đề mô phỏng','Nghe theo tranh','Nghe-đọc tổng hợp'],
    pdfs:[{label:'Đề & hướng dẫn',pages:143,path:'QUYỂN 6. BJTビジネス日本語能力テスト 公式 模擬テスト&ガイド/QUYỂN 6 .BJTビジネス日本語能力テスト 公式 模擬テスト&ガイド (1).pdf'}],
    audio:range(71,n=>({label:`Track ${pad(n)}`,path:`QUYỂN 6. BJTビジネス日本語能力テスト 公式 模擬テスト&ガイド/${pad(n)}.mp3`,format:'MP3'})),
    note:'Làm trong một phiên có bấm giờ, rồi phân loại lỗi theo nghe, đọc số liệu, từ vựng và ngữ cảnh.'
  },
  {
    id:'moshi',order:7,phase:3,kind:'Mô phỏng & chiến lược',accent:'red',
    title:'BJT 模試と対策',jp:'模擬テスト・攻略対策',
    description:'Bộ sách đỏ tập trung đề mô phỏng và cách xử lý từng section, thích hợp để củng cố chiến thuật sau các bộ đề chính thức.',
    focus:['Chiến thuật từng section','Mô phỏng bài thi','Tăng tốc độ'],
    pdfs:[{label:'Sách đỏ',pages:90,path:'QUYỂN 7. BJT 模試と対策/BJT 模試と対策 quyển đỏ.pdf'}],
    audio:range(76,n=>({label:`Track ${pad(n)}`,path:`QUYỂN 7. BJT 模試と対策/Track${pad(n)}.mp3`,format:'MP3'})),
    note:'Dùng sau ít nhất một đề hoàn chỉnh để chiến thuật gắn với lỗi thật của mày.'
  },
  {
    id:'chokai',order:9,phase:4,kind:'Chuyên đề nghe',accent:'gold',
    title:'聴解・聴読解実力養成問題集',jp:'Luyện chuyên sâu nghe và nghe-đọc',
    description:'Quyển vàng luyện dày hai kỹ năng chiếm phần lớn áp lực thời gian của BJT: nghe hiểu và xử lý đồng thời audio với biểu đồ, email, bảng biểu.',
    focus:['聴解','聴読解','Shadowing & bắt ý'],
    pdfs:[{label:'Quyển vàng',pages:84,path:'QUYỂN 9 . 聴解、聴読解 Quyển vàng/Quyển vàng Siêu Tốc 聴解・聴読解実力養成問題集.pdf'}],
    audio:[
      ...range(51,n=>({label:`CD1 · Track ${pad(n)}`,path:`QUYỂN 9 . 聴解、聴読解 Quyển vàng/BJTchokai_CD1-${pad(n)}.mp3`,format:'MP3'})),
      ...range(76,n=>({label:`CD2 · Track ${pad(n)}`,path:`QUYỂN 9 . 聴解、聴読解 Quyển vàng/BJTchokai_CD2-${pad(n)}.mp3`,format:'MP3'}))
    ],
    note:'Mỗi track: nghe bắt ý, làm câu hỏi, nghe lại với trang sách, rồi shadowing câu khó.'
  }
];

export const studyPlan=[
  {phase:1,title:'Xây nền giao tiếp',description:'Học kính ngữ, chức năng giao tiếp và phản xạ trong công sở.',bookIds:['keigo','wakaru','nihongo30']},
  {phase:2,title:'Hiểu đề bằng tiếng Việt',description:'Làm bộ song ngữ để nắm cấu trúc, script và cách giải thích đáp án.',bookIds:['kato']},
  {phase:3,title:'Thi thử có bấm giờ',description:'Luân phiên ba bộ mô phỏng; sau mỗi đề phải phân loại và ôn lại lỗi.',bookIds:['official4','official6','moshi']},
  {phase:4,title:'Tăng lực nghe',description:'Dùng quyển vàng để luyện sâu 聴解・聴読解 và shadowing hằng ngày.',bookIds:['chokai']}
];

export const resourceStats={
  books:books.filter(book=>book.audio.length).length,
  pdfs:books.reduce((sum,book)=>sum+book.pdfs.length,0),
  pages:books.reduce((sum,book)=>sum+book.pdfs.reduce((total,pdf)=>total+pdf.pages,0),0),
  audio:books.reduce((sum,book)=>sum+book.audio.length,0)
};
