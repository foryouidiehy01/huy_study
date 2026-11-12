# Huy Growth — BrSE → PM & BJT → J1

Web app học cá nhân bằng tiếng Việt và tiếng Nhật. Frontend HTML/CSS/JavaScript thuần, không cần npm install hay build. Deploy frontend trên GitHub Pages; backend Node.js riêng phục vụ gia sư AI. Không có khóa bí mật trong mã nguồn.

## Có gì trong phiên bản 1

- Dashboard, tiến độ hai lộ trình, số ngày học và tỷ lệ đúng thực tế.
- 6 bài nền tảng BrSE: SDLC, yêu cầu, Q&A, tiêu chí nghiệm thu, test case, báo cáo/rủi ro.
- 4 bài BJT: email, kính ngữ, lịch hẹn, đọc số liệu.
- 12 câu BJT tự biên soạn: chấm đáp án, giải thích, luyện 10 phút, lưu câu sai và luyện lại.
- Luyện nghe bằng giọng Nhật của thiết bị; hiện thông báo nếu thiếu giọng. Transcript có thể mở để đọc.
- Bài làm tự luận tự lưu, gia sư AI hội thoại/chấm bài khi backend đã cấu hình.
- Ghi chú, lịch sử hội thoại, xuất/nhập dữ liệu JSON.
- Responsive cho màn hình nhỏ; thanh điều hướng cuộn ngang trên điện thoại.

Đây là bộ nội dung khởi đầu, chưa phải toàn bộ giáo trình BrSE/PM hoặc luyện thi BJT. Không nhập toàn bộ lịch sử ChatGPT cũ. Tiến độ ban đầu trống, có thể đánh dấu những bài đã hiểu. Bài hoàn thành do người học tự xác nhận; không phải chứng nhận hay điểm chấm AI. Ngân hàng câu hỏi không phải đề chính thức, kết quả không quy đổi ra điểm BJT. Gia sư có thể tiếp tục dạy các chủ đề mới khi kết nối.

## 1. Deploy frontend lên GitHub Pages

1. Giải nén và đưa **nội dung bên trong thư mục huy-growth** vào repository GitHub. File `package.json` và thư mục `app` phải ở gốc repo. Giữ cả thư mục ẩn `.github` chứa workflow.
2. Dùng nhánh `main` (hoặc sửa `branches` trong `.github/workflows/pages.yml` cho khớp).
3. Vào repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Push lên `main`, hoặc mở **Actions → Deploy GitHub Pages → Run workflow**.
5. Chờ workflow xanh; URL được hiển thị trong môi trường `github-pages`/Settings → Pages.

Workflow kiểm tra bằng Node 22, chỉ đưa thư mục `app/` lên Pages. Đường dẫn asset tương đối nên dùng được cả dạng `/ten-repo/`. Không cần sửa base URL. File `.openai/hosting.json` chỉ phục vụ preview trong môi trường tạo app, không được deploy lên Pages.

Nếu dùng Git từ máy tính (thay URL bằng repo thật):

```bash
git init
git add .
git commit -m "Add Huy Growth learning app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

GitHub Pages chỉ phục vụ frontend tĩnh. Không đặt OpenAI API key vào repository, GitHub Pages, JavaScript hoặc trường mã truy cập của frontend. Chỉ deploy Pages sẽ chạy được bài học và quiz, chưa chạy được AI.

## 2. Chạy thử trên máy

Cần Python 3 cho frontend và Node.js 22+ cho backend.

```bash
python3 -m http.server 8080 --directory app
```

Mở `http://localhost:8080`. Trên Windows có thể dùng `py -m http.server 8080 --directory app`. Không mở `index.html` bằng file:// vì JavaScript modules cần HTTP.

## 3. Backend AI

Backend dùng OpenAI Responses API. Cần API key, model khả dụng trong API project và hạn mức sử dụng. Không gửi API key qua chat; tự nhập vào biến môi trường của dịch vụ hosting.

### Chạy local

```bash
cp server/.env.example server/.env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Dùng chuỗi vừa tạo làm `APP_TOKEN`, rồi chỉnh `server/.env`:

| Biến | Nội dung |
|---|---|
| `OPENAI_API_KEY` | API key của riêng bạn, chỉ lưu ở backend |
| `OPENAI_MODEL` | ID model hỗ trợ Responses API mà project của bạn được dùng |
| `APP_TOKEN` | Mã ngẫu nhiên riêng, tối thiểu 24 ký tự; không dùng API key làm mã này |
| `ALLOWED_ORIGINS` | `http://localhost:8080` khi chạy local; `https://YOUR_USERNAME.github.io` khi deploy Pages |
| `PORT` | Mặc định 3000; hosting có thể tự cấp |
| `MAX_DAILY_REQUESTS` | Mặc định 100 lượt/ngày UTC trên mỗi tiến trình |

```bash
npm start
```

Vào app → **Cài đặt**, nhập backend `http://localhost:3000` và APP_TOKEN. Mã truy cập chỉ lưu trong sessionStorage của tab, không nằm trong file sao lưu. Nó vẫn là một bí mật: không chia sẻ hoặc commit. Cấu hình local không dùng được từ frontend GitHub Pages chạy HTTPS.

### Deploy backend HTTPS từ cùng repo

Dùng một host chạy Node.js 22+ với HTTPS:

- Thư mục gốc: gốc repository.
- Không có dependencies cần cài; có thể dùng `npm install --omit=dev` nếu host yêu cầu.
- Start command: `node server/index.js`.
- Health check: `/health`.
- Nhập các biến trên trong phần Environment/Secrets của host, không upload `.env`.
- `ALLOWED_ORIGINS` chỉ chứa origin, **không chứa `/ten-repo`**, không có dấu `/` cuối. Nhiều origin phân cách dấu phẩy.
- Mở app → Cài đặt → nhập URL backend HTTPS và APP_TOKEN → Lưu.

Có Dockerfile nếu host hỗ trợ container; chạy từ gốc repo:

```bash
docker build -f server/Dockerfile -t huy-growth-api .
docker run --env-file server/.env -p 3000:3000 huy-growth-api
```

Chỉ cần deploy một backend cho app cá nhân. Rate limit hiện giữ trong RAM: reset khi restart, không chia sẻ giữa nhiều instances. Đặt thêm giới hạn chi phí ở API project; khi mở rộng nhiều người dùng cần tài khoản, rate limit bền vững và database. CORS không thay thế xác thực; backend bắt buộc APP_TOKEN. Frontend chưa có đăng nhập hoặc đồng bộ cloud.

### Kiểm tra kết nối thật

1. Backend `/health` trả `{"ok":true}` chỉ chứng minh tiến trình hoạt động, không chứng minh API key đúng.
2. Vào Gia sư AI, gửi “Giải thích 機能要件 bằng một ví dụ”.
3. Chờ câu trả lời thực từ API. Nếu lỗi, app hiển thị thông báo; không giả lập câu trả lời.
4. Mở một bài học, viết bài làm rồi chọn “Nhờ AI chấm & giải thích”.

Lỗi thường gặp: 401 = APP_TOKEN sai; 403 = origin chưa cho phép; 429 = giới hạn gửi/hạn mức; 502 = model/API key/billing hoặc timeout; 503 = thiếu cấu hình backend.

## Dữ liệu

Tiến độ nằm trong localStorage của đúng origin và trình duyệt. Xóa dữ liệu trình duyệt sẽ mất tiến độ. Đổi hostname cũng tạo kho mới. Không đồng bộ nhiều máy. Dùng Cài đặt → Xuất JSON và Nhập JSON để chuyển dữ liệu; nhập sẽ hỏi trước khi thay thế.

Bản sao lưu chứa bài làm, nhận xét AI, ghi chú và hội thoại: giữ riêng tư. Khi hỏi AI, 12 tin nhắn gần nhất hoặc bài làm đang chấm được gửi đến backend rồi đến API. Backend đặt `store:false`, không ghi nội dung hội thoại vào log; điều đó không phải cam kết không lưu dữ liệu của nhà cung cấp. Dùng dữ liệu mẫu thay vì thông tin mật của khách hàng.

## Kiểm thử đã thực hiện

`npm test`: kiểm tra tính nhất quán nội dung/đáp án, từ chối message giả role hệ thống, xác thực token/origin và đường gọi AI bằng phản hồi mock. Đã kiểm tra trên trình duyệt desktop: dashboard, chọn đáp án sai, giải thích, sổ lỗi sai và giữ dữ liệu sau reload. Chưa chạy AI với API key thật, chưa publish GitHub hoặc hosting backend và chưa kiểm chứng audio trên thiết bị người dùng. CSS có responsive nhưng chưa kiểm thử trên điện thoại thật.

## Cấu trúc

```text
app/                    Frontend và giáo trình
server/index.js         API gia sư Node.js, không phụ thuộc thư viện
server/.env.example     Mẫu cấu hình không chứa secret
server/Dockerfile       Build backend tùy chọn
tests/                  Node test runner
.github/workflows/      Tự deploy GitHub Pages
```

Bổ sung bài học và câu hỏi trong `app/content.js`. Chỉnh phong cách dạy trong `instructions` của `server/index.js`. Không thêm dữ liệu cá nhân của người học vào source nếu repo công khai.

Tài liệu tham chiếu: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages và https://developers.openai.com/api/reference/resources/responses/methods/create
