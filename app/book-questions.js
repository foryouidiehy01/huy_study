import {verifiedReadingQuestions} from './verified-reading-questions.js';
import {newBookQuestions} from './new-book-questions.js';

// Câu hỏi được chép từ chính các trang đáp án/giải thích trong docs.
// sourcePage là số trang PDF (không phải số trang in trên sách).
const sets={
  official4:[
    {number:6,type:'聴解・表現力',sourcePdfIndex:1,sourcePage:74,audioTrack:14,scenario:'取引先から電話がありました。担当者が不在だったので、伝言を頼みたいと言われました。',prompt:'何と言いますか。',options:['はい、伝言してもらいましょうか。','はい、伝言してくれませんか。','はい、伝言を承ります。','はい、伝言を話してください。'],answer:2,why:'Đáp án gốc: ③. Khi nhận lời nhắn từ khách cho người phụ trách vắng mặt, 承る là khiêm nhường ngữ của 引き受ける và thể hiện đúng việc “xin nhận lời nhắn”.',optionWhy:['Sai: nhờ phía khách nhận lời nhắn, đảo vai hành động.','Sai: yêu cầu khách truyền lời cho mình.','Đúng: 伝言を承ります là cách nhận lời nhắn trang trọng.','Sai: 話してください chỉ yêu cầu “hãy nói”, không thể hiện việc tiếp nhận lời nhắn.'],explanationKind:'source'},
    {number:7,type:'聴解・表現力',sourcePdfIndex:1,sourcePage:75,audioTrack:15,scenario:'取引先で、自分の会社の製品を買ってもらうために説明をしています。',prompt:'説明の最後に、何と言いますか。',options:['必ずご購入なさってください。','きっと購入をお約束させていただきます。','ぜひともご検討をお願いいたします。','絶対に検討させていただきます。'],answer:2,why:'Đáp án gốc: ③. Sau phần giới thiệu sản phẩm, nên nhờ đối tác cân nhắc bằng ご検討をお願いいたします; cách nói này lịch sự và không ép mua.',optionWhy:['Sai: bắt buộc khách mua, tạo sức ép quá mạnh.','Sai: người bán không thể tự hứa thay quyết định mua của khách.','Đúng: lời đề nghị cân nhắc phù hợp trong bán hàng.','Sai: chủ thể bị đảo; người cần cân nhắc là khách hàng.'],explanationKind:'source'},
    {number:8,type:'聴解・表現力',sourcePdfIndex:1,sourcePage:75,audioTrack:16,scenario:'取引先でのプレゼンテーションが終わりました。質問を受け付けます。',prompt:'何と言いますか。',options:['質問をどうぞ。','質問がありましたら、させていただきます。','ご質問はございませんでしょうか。','ご質問をされてください。'],answer:2,why:'Đáp án gốc: ③. ご質問はございませんでしょうか vừa trang trọng vừa mời người nghe đặt câu hỏi.',optionWhy:['Chưa phù hợp: ý đúng nhưng quá ngắn và trực tiếp trong bối cảnh trang trọng.','Sai: người thuyết trình lại trở thành người đặt câu hỏi.','Đúng: mời câu hỏi bằng biểu đạt lịch sự.','Sai: されてください không phải cách mời đặt câu hỏi tự nhiên.'],explanationKind:'source'},
    {number:9,type:'聴解・表現力',sourcePdfIndex:1,sourcePage:76,audioTrack:17,scenario:'作成した資料を上司に確認してもらいます。',prompt:'何と言いますか。',options:['資料の確認をしてください。','資料の確認をお願いいたします。','資料を確認してあげてください。','資料を確認されてはどうでしょう。'],answer:1,why:'Đáp án gốc: ②. 資料の確認をお願いいたします là lời nhờ cấp trên kiểm tra tài liệu với mức kính trọng phù hợp.',optionWhy:['Chưa phù hợp: ～してください trực tiếp hơn mức cần thiết với cấp trên.','Đúng: お願いいたします là lời nhờ trang trọng.','Sai: ～てあげる mang sắc thái làm ơn cho người dưới.','Sai: ～てはどうでしょう là gợi ý, không phải lời nhờ xác nhận.'],explanationKind:'source'},
    {number:10,type:'聴解・表現力',sourcePdfIndex:1,sourcePage:76,audioTrack:18,scenario:'取引先の人に、電話で、会社の記念パーティーに相手が贈ってくれたお花のお礼を伝えます。',prompt:'何と言いますか。',options:['先日は、お祝いのお花をお贈りくださいまして、ありがとうございました。','先日は、お祝いのお花を贈ってくれて、ありがとうございました。','先日は、お祝いのお花を贈って差し上げて、ありがとうございました。','先日は、お祝いのお花をお贈りしていただき、ありがとうございました。'],answer:0,why:'Đáp án gốc: ①. お贈りくださいまして nâng hành động tặng hoa của đối tác và phù hợp với lời cảm ơn trang trọng.',optionWhy:['Đúng: dùng tôn kính ngữ cho hành động của đối tác.','Sai: ～てくれて thân mật, không hợp với đối tác.','Sai: 差し上げる khiến phía nói trở thành người tặng.','Sai: お贈りしていただき bị chồng cấu trúc không tự nhiên trong ngữ cảnh này.'],explanationKind:'source'}
  ],
  kato:[
    {number:'練習',type:'聴解・表現力',sourcePdfIndex:0,sourcePage:103,audioTrack:14,scenario:'海外駐在から帰国して、上司の部長にあいさつをします。',prompt:'どのようにあいさつしますか。',options:['今日付けで配属となった佐藤だよ。','今日付けでご配属となる佐藤です。','今日付けでご配属となりました佐藤です。','今日付けで配属となりました佐藤です。'],answer:3,why:'Đáp án gốc: ④. Đối phương là cấp trên nên cần cách nói trang trọng; 配属 là hành động của bản thân nên không thêm ご để tự tôn kính.',optionWhy:['Sai: だよ chỉ hợp với người ngang hoặc dưới.','Sai: ご配属 tự nâng hành động của mình và thì hiện tại không đúng.','Sai: dù lịch sự nhưng ご配属 vẫn tự tôn kính.','Đúng: trang trọng và không nâng hành động của bản thân.'],explanationKind:'source'},
    {number:1,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:104,audioTrack:15,scenario:'同僚の奥さんから電話がかかってきました。同僚は、病気で休むと言っています。',prompt:'何と答えますか。',options:['わかりました。お困りでしょうね。','わかりました。しょうがありませんね。','わかりました。お大事になさってください。','わかりました。お気をつけてください。'],answer:2,why:'Đáp án gốc: ③. お大事になさってください là mẫu cố định thể hiện sự quan tâm đến người bị bệnh.',optionWhy:['Sai: お困り mang sắc thái thương hại, nhìn đối phương ở vị trí thấp.','Sai: しょうがありません nghe như đánh giá tình trạng là “đành chịu”.','Đúng: lời chúc sức khỏe phù hợp.','Sai: お気をつけて dùng khi dặn cẩn thận, không phải hỏi thăm bệnh.'],explanationKind:'source'},
    {number:2,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:104,audioTrack:16,scenario:'営業部の社員が取引先の人に電話をしています。この社員は新しい製品のサンプルを届けたいと思っています。',prompt:'何と言いますか。',options:['これから、サンプルを届けたいんだけど。','これから、サンプルを届けてあげたいんだけど。','これから、サンプルをお持ちしたいんですが。','これから、サンプルをお持ちになりたいんですが。'],answer:2,why:'Đáp án gốc: ③. お持ちする hạ hành động mang mẫu của người nói trước đối tác.',optionWhy:['Sai: cách nói thân mật với đối tác.','Sai: ～てあげる nhìn đối tác như người dưới.','Đúng: khiêm nhường ngữ và cách mở lời mềm.','Sai: お持ちになる là tôn kính ngữ, không dùng cho hành động của mình.'],explanationKind:'source'},
    {number:3,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:105,audioTrack:17,scenario:'ホテルのお客が自分の荷物を受け取りにきました。お客は自分で荷物を受け取ります。',prompt:'どのように案内しますか。',options:['あちらで荷物をお受け取りください。','あちらで荷物をお受け取りしてください。','あちらで荷物をお受け取りしてあげます。','あちらで荷物をお受け取りしてさしあげます。'],answer:0,why:'Đáp án gốc: ①. お＋名詞＋ください là mẫu yêu cầu tôn kính đúng; người nhận hành lý là khách.',optionWhy:['Đúng: tôn trọng hành động nhận của khách.','Sai: phá vỡ mẫu お受け取りください bằng cách thêm して.','Sai: đổi chủ thể thành nhân viên và có sắc thái ban ơn.','Sai: vừa đổi chủ thể vừa áp đặt “làm giúp” khách.'],explanationKind:'source'},
    {number:4,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:105,audioTrack:18,scenario:'男の人が訪問先で新商品の説明をしています。',prompt:'どのように話を始めますか。',options:['では、ご説明してあげます。','では、ご説明してさしあげます。','では、ご説明させてもらいます。','では、ご説明させていただきます。'],answer:3,why:'Đáp án gốc: ④. ご説明させていただきます xin phép được giải thích, phù hợp với khách hàng bên ngoài.',optionWhy:['Sai: ～てあげる hạ người nghe.','Sai: ～てさしあげる có thể mang sắc thái áp đặt lòng tốt.','Sai: もらう nhấn lợi ích người nói, không phù hợp khi mở đầu với khách.','Đúng: mẫu xin phép khiêm nhường và trang trọng.'],explanationKind:'source'}
  ],
  official6:[
    {number:5,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:74,audioTrack:16,scenario:'お客様が携帯電話を買ったあと、手続きをする場面です。',prompt:'店員はどのように説明しますか。',options:['こちらの書類に名前、住所をお願いいたします。','こちらの書類にお名前、ご住所をお願いいたします。','こちらの書類にお名前様とご住所をどうぞ。','こちらの書類にお名前、ご住所様をお願いいたします。'],answer:1,why:'Đáp án gốc: ②. Đối tượng là khách nên dùng お名前・ご住所; không gắn 様 vào tên gọi của trường thông tin.',optionWhy:['Sai: thiếu tiền tố kính trọng cho thông tin của khách.','Đúng: trang trọng và tự nhiên.','Sai: お名前様 không phải cách nói đúng.','Sai: ご住所様 không phải cách nói đúng.'],explanationKind:'source'},
    {number:6,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:74,audioTrack:17,scenario:'部長に緊急の電話がかかってきました。部長は取引先の人と打ち合わせ中です。',prompt:'何と言って取り次ぎますか。',options:['部長、山川物産から電話が入っておりますが……。','部長、急ぎの電話が入っておりますが……。','部長、問い合わせの電話が入っておりますが……。','部長、重要な電話をお取り次ぎしたいのですが……。'],answer:1,why:'Đáp án gốc: ②. Khi có người ngoài hiện diện, không dùng tôn kính ngữ cho sếp phía mình và không nói lộ nội dung/đối tác cụ thể; chỉ báo “có cuộc gọi gấp”.',optionWhy:['Sai: nói cụ thể tên đối tác trước người ngoài.','Đúng: thông tin tối thiểu cần thiết và trung lập.','Sai: 問い合わせ có thể xử lý sau, không truyền đúng tính khẩn cấp.','Sai: お取り次ぎ tự nâng hành động với sếp phía mình trong bối cảnh này.'],explanationKind:'source'},
    {number:7,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:75,audioTrack:18,scenario:'受付の女の人が、男の人に名前を聞いています。',prompt:'何と聞きますか。',options:['失礼ですが、お名前をうかがわせていただいてもよろしいですか。','失礼ですが、お名前をちょうだいできますでしょうか。','申し訳ありませんが、お名前おっしゃってください。','大変申し訳ありませんが、お名前は何ですか。'],answer:1,why:'Đáp án gốc: ②. 失礼ですが、お名前をちょうだいできますでしょうか là cách hỏi tên cố định, lịch sự trong lần gặp đầu.',optionWhy:['Sai: quá vòng vo cho việc chỉ hỏi tên.','Đúng: biểu đạt cố định và lịch sự.','Sai: mang sắc thái mệnh lệnh.','Sai: お名前は何ですか quá trực tiếp trong tiếp khách.'],explanationKind:'source'},
    {number:8,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:75,audioTrack:19,scenario:'部長の留守中に課長から伝言がありました。',prompt:'女の人は、何と言って伝えますか。',options:['部長、課長から伝言をもらいました。','部長、課長からご伝言をいただきました。','部長、課長からの伝言を聞いてください。','部長、課長から伝言を預かりました。'],answer:3,why:'Đáp án gốc: ④. Trong bối cảnh trang trọng, động từ đi với 伝言 là 預かる; không cần nâng “truyền lời” của cấp dưới trước cấp trên.',optionWhy:['Sai: もらう không phải kết hợp phù hợp nhất trong báo cáo trang trọng.','Sai: tự nâng hành động của trưởng phòng trước cấp trên không cần thiết.','Sai: biến thành yêu cầu cấp trên “hãy nghe”.','Đúng: 伝言を預かりました là cách báo đã nhận lời nhắn.'],explanationKind:'source'},
    {number:9,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:76,audioTrack:20,scenario:'社長にスケジュールを伝えます。',prompt:'何と言って伝えますか。',options:['９時にヤマダ商事の田中社長がおいでになります。','９時にヤマダ商事の田中社長さんが来るようです。','９時にヤマダ商事の社長さんがみえるようです。','９時にヤマダ商事の田中社長が訪問いたします。'],answer:0,why:'Đáp án gốc: ①. Người bên ngoài được nói bằng tôn kính ngữ; cách gọi công ty + họ + chức vụ rõ ràng và おいでになります phù hợp.',optionWhy:['Đúng: gọi đúng vai trò và nâng hành động đến của khách.','Sai: さん sau 社長 không tự nhiên, ようです chỉ phỏng đoán.','Sai: thiếu họ và vẫn dùng ようです.','Sai: 訪問いたします là khiêm nhường ngữ, không dùng cho hành động của khách.'],explanationKind:'source'}
  ],
  moshi:[
    {number:1,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:35,scenario:'顧客にアポイントの日程変更を頼もうとしています。',prompt:'男の人はどのように言うのが望ましいですか。',options:['先日のお約束を変更させていただきたいんですが。','先日のお約束を変更させてあげたいんですが。','先日のお約束を変更してよくあげたいんですが。','先日のお約束を変更なさっていただきたいんですが。'],answer:0,why:'Đáp án gốc: ①. 変更させていただきたいんですが xin phép được thay đổi lịch hẹn và làm mềm lời đề nghị.',optionWhy:['Đúng: mẫu xin phép khiêm nhường phù hợp với khách.','Sai: ～てあげる mang sắc thái làm ơn cho khách.','Sai: cấu trúc không tự nhiên.','Sai: biến việc thay đổi thành hành động tôn kính của khách.'],explanationKind:'supplemental'},
    {number:2,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:36,scenario:'部下が上司に新しい企画の概要を説明しようとしています。',prompt:'部下はどのように話しますか。',options:['概要がまとまりましたので話しましょうか。','概要がまとまりましたのでお話してください。','概要がまとまりましたのでご説明します。','概要がまとまりましたので説明してあげます。'],answer:2,why:'Đáp án gốc: ③. ご説明します là cách nói khiêm nhường/lịch sự khi cấp dưới trình bày với cấp trên.',optionWhy:['Sai: 話しましょうか nghe như rủ cùng nói.','Sai: yêu cầu cấp trên nói thay mình.','Đúng: người nói chủ động giải thích với mức lịch sự phù hợp.','Sai: ～てあげる nhìn cấp trên như người dưới.'],explanationKind:'supplemental'},
    {number:3,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:36,scenario:'上司が部下に、留守中家族から電話があったことを伝えています。',prompt:'部下はそのあと、どのように返事をしますか。',options:['父はなにか言っておりましたか。','父はなにかおっしゃっていましたか。','父はなにか言っていらっしゃいましたか。','父はなにか申しておられましたか。'],answer:0,why:'Đáp án gốc: ①. Khi nói với cấp trên về người thuộc phía gia đình mình, dùng cách khiêm nhường/trung lập 言っておりました, không nâng cha mình.',optionWhy:['Đúng: không nâng người cùng phía trước cấp trên.','Sai: おっしゃる nâng hành động của cha mình.','Sai: いらっしゃる tiếp tục nâng người cùng phía.','Sai: 申す và おられる bị pha trộn không phù hợp.'],explanationKind:'supplemental'},
    {number:4,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:36,scenario:'顧客からまだ品物が届かないというクレームの電話を受けています。',prompt:'男の人はどのように答えるのが望ましいですか。',options:['申し訳ありません。昨日送りましたよ。','申し訳ありません。そちらでもう一度調べてください。','申し訳ありません。後でもう一度お電話をください。','申し訳ありません。早速調べまして折り返しご連絡いたします。'],answer:3,why:'Đáp án gốc: ④. Cần xin lỗi, chủ động kiểm tra ngay và hứa gọi lại; đây là cách xử lý khiếu nại đầy đủ.',optionWhy:['Sai: chỉ khẳng định đã gửi, không giải quyết việc khách chưa nhận được.','Sai: đẩy việc kiểm tra cho khách.','Sai: bắt khách gọi lại.','Đúng: nhận trách nhiệm điều tra và phản hồi.'],explanationKind:'supplemental'},
    {number:5,type:'聴解・表現力',sourcePdfIndex:0,sourcePage:37,scenario:'顧客から課長に電話がかかってきました。課長は外出していて１時間後に戻る予定です。',prompt:'女の人は顧客に何と言いますか。',options:['戻り次第、お電話しましょうか。','戻り次第、お電話があったと言います。','戻り次第、お電話するように伝えます。','戻り次第、お電話をなさいます。'],answer:2,why:'Đáp án gốc: ③. Người nhận điện thoại hứa sẽ truyền đạt để trưởng phòng gọi lại; ～ように伝えます thể hiện đúng quan hệ hành động.',optionWhy:['Sai: ～ましょうか khiến người nhận điện thoại thành người gọi lại.','Sai: chỉ báo có cuộc gọi, không truyền yêu cầu gọi lại.','Đúng: truyền đạt yêu cầu gọi lại khi trưởng phòng về.','Sai: chỉ dự đoán/tôn kính hành động, không cam kết truyền lời.'],explanationKind:'supplemental'}
  ]
};

// Các câu 聴解 ở trên đã có đầy đủ trong phần track audio. Không trộn chúng vào
// bài luyện PDF; mục này chỉ chứa câu đọc độc lập của 第3部.
Object.keys(sets).forEach(bookId=>{sets[bookId]=[]});

// 第3部 読解テスト: phần đọc độc lập, không dùng audio. Đáp án lấy từ bảng
// 正答 của từng sách; trang câu hỏi/lời giải được giữ lại để người học đối chiếu.
const reading=(bookId,section,answers,pages,explanationPages,extra={})=>answers.map((answer,index)=>({
  number:`S${section}-${index+1}`,type:'第3部 読解テスト',sourcePdfIndex:extra.sourcePdfIndex||0,
  sourcePage:explanationPages[index],questionPdfIndex:extra.questionPdfIndex||0,questionPage:pages[index],
  scenario:'Đọc câu hỏi và bốn phương án ngay trên trang sách bên dưới.',
  prompt:'Chọn đáp án đúng theo nội dung câu hỏi trong sách.',options:['1','2','3','4'],answer:answer-1,
  questionImage:`./quiz-images/${bookId}-s${section}-q${index+1}.jpg`,
  why:`Đáp án gốc của sách là ${answer}. Phần lời giải gốc nằm ở trang PDF ${explanationPages[index]} và sẽ hiện sau khi kiểm tra.`,
  optionWhy:[1,2,3,4].map(n=>n===answer?`Đúng: sách đánh dấu phương án ${n}.`:`Sai: phương án ${n} không phải đáp án trong bảng chính thức; xem phần lời giải gốc bên dưới để đối chiếu chi tiết.`),
  explanationKind:'source',pdfQuestion:true,...extra
}));
const repeat=(page,count)=>Array(count).fill(page);

sets.official4.push(
  ...reading('official4',1,[4,2,4,1,1,3,3,1,4,1],[...repeat(22,3),...repeat(23,7)],repeat(66,10),{sourcePdfIndex:1}),
  ...reading('official4',2,[3,2,2,1,3,3,4,3,2,3],[...repeat(24,5),...repeat(25,5)],repeat(66,10),{sourcePdfIndex:1}),
  ...reading('official4',3,[3,2,1,4,3,2,2,3,3,4],Array.from({length:10},(_,i)=>26+i),repeat(66,10),{sourcePdfIndex:1})
);
sets.official6.push(
  ...reading('official6',1,[2,4,2,2,2,1,3,2,3,2],[...repeat(47,5),...repeat(48,5)],[123,123,123,124,124,124,124,125,125,125]),
  ...reading('official6',2,[2,3,2,2,1,4,2,4,2,2],[...repeat(49,5),...repeat(50,5)],[126,126,126,127,127,127,127,128,128,128]),
  ...reading('official6',3,[2,4,3,2,4,4,2,3,2,4,2,3,3,2,3],Array.from({length:15},(_,i)=>51+i),Array.from({length:15},(_,i)=>129+i))
);
sets.moshi.push(
  ...reading('moshi',1,[2,4,1,4,2,1,1,2,3,4],[...repeat(22,5),...repeat(23,5)],repeat(34,10)),
  ...reading('moshi',2,[1,4,2,4,2,3,2,3,2,1],[...repeat(23,8),...repeat(24,2)],repeat(34,10)),
  ...reading('moshi',3,[4,3,2,4,3,2,4,3,4,2,3,3,3,4,3],[24,...Array.from({length:14},(_,i)=>25+Math.floor(i/2))],Array.from({length:15},(_,i)=>35+Math.floor(i/2)))
);

const katoAnswers=[[3,3,2,4,4,2,4,3,1,2],[2,4,2,1,2,3,1,3,1,4],[1,3,3,3,3,4,2,3,4,4,2,2,1,4,1]];
const katoPages=[[157,157,157,158,158,158,158,159,159,159],[160,160,160,161,161,161,162,162,162,163],Array.from({length:15},(_,i)=>164+i)];
katoAnswers.forEach((answers,index)=>sets.kato.push(...reading('kato',index+1,answers,katoPages[index],katoPages[index],{katoCrop:true})));

// Chỉ xuất câu đã được đối chiếu nguyên văn. Không đưa OCR thô hoặc câu dùng ảnh
// làm nội dung vào bài luyện.
const sourceSets={...verifiedReadingQuestions,...newBookQuestions};
Object.keys(sourceSets).forEach(bookId=>{sets[bookId]=sourceSets[bookId]||[]});

export const bookQuestions=Object.fromEntries(Object.entries(sets).map(([bookId,items])=>[
  bookId,
  items.map((item,index)=>({...item,id:`${bookId}-q${index+1}`,bookId}))
]));
export const allBookQuestions=Object.values(bookQuestions).flat();
export const interactiveBookIds=Object.keys(bookQuestions);
