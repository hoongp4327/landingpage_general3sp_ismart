# iSMART Online Hub – Tổng hợp chương trình học trực tuyến iSMART

Landing page một link duy nhất để sales gửi qua Zalo / Messenger / SMS / email. Phụ huynh (con học lớp 1–9) tự chọn 1 trong 4 chương trình online: **iLEAD**, **iPass**, **iGlobal**, **Tiếng Trung THCS**.

- Mobile-first, HTML + CSS + JavaScript thuần, **không framework, không bước build**.
- Domain dự kiến: `https://online.ismart.edu.vn/` (đã dùng cho `canonical`, `og:url`, `og:image`).

## Cấu trúc thư mục

```
/index.html            Toàn bộ nội dung trang
/css/style.css         Giao diện (mobile-first, breakpoint 480 / 768 / 900 / 1024 / 1100)
/js/main.js            Menu, gợi ý theo lớp (#lop-N), UTM, tracking, sao chép số, fade-up
/assets/img/           Ảnh WebP tạo bằng Higgsfield (2 kích thước cho srcset) + og-image.jpg
/assets/logos/         Khung giữ chỗ logo (SVG) – thay bằng logo thật
/assets/favicon.svg    Favicon chữ "i" cam trên nền navy
/netlify.toml          publish = ".", header cache cho /assets/*
/IMAGES.md             Danh sách ảnh + prompt Higgsfield đã dùng
/README.md
```

## Chạy local

Không cần cài đặt gì ngoài Node.js (hoặc Python):

```bash
npx serve . -l 5500
```

hoặc

```bash
python -m http.server 5500
```

Mở http://localhost:5500

## Deploy Netlify (sau này)

1. Đưa toàn bộ nội dung thư mục này lên repo `https://github.com/hoongp4327/landingpage_general3sp_ismart`.
2. Netlify → Add new site → Import from Git → chọn repo.
3. **Build command:** để trống · **Publish directory:** `.`
4. Gắn domain `online.ismart.edu.vn` trong Domain settings.

`netlify.toml` đã khai báo sẵn `publish = "."` và header cache cho `/assets/*`.

## Logo cần thay

Mọi logo hiện là **khung giữ chỗ** (viền nét đứt, chữ "LOGO …"). Chỉ cần **ghi đè file cùng tên** trong `/assets/logos/` – không phải sửa HTML. Logo được hiển thị `object-fit: contain` nên không bị méo. Nếu logo thật là PNG, đổi đuôi file trong thuộc tính `src` tương ứng ở `index.html`.

| File | Kích thước gợi ý | ID trên trang | Vị trí |
|---|---|---|---|
| `logo-ismart-white.svg` | SVG, tỉ lệ ~3.3:1 (132×40), **bản trắng** | `#logo-ismart-header` | Header (trên nền navy) |
| `logo-cognia.svg` | SVG/PNG ~240×96 | `#logo-cognia` | Thành tựu – thẻ "Kiểm định Cognia, Hoa Kỳ" |
| `logo-sao-khue.svg` | SVG/PNG ~240×96 | `#logo-sao-khue` | Thành tựu – thẻ "Danh hiệu Sao Khuê" |
| `logo-equest.svg` | SVG/PNG ~400×160 | `#logo-equest` | Đối tác – Tổ chức thành viên |
| `logo-oxford-university-press.svg` | SVG/PNG ~400×160 | `#logo-oxford-university-press` | Đối tác – Đối tác học thuật |
| `logo-cambridge.svg` | SVG/PNG ~400×160 | `#logo-cambridge` | Đối tác – Đối tác học thuật |
| `logo-ivy-global-school.svg` | SVG/PNG ~400×160 | `#logo-ivy-global-school` | Đối tác – Trường và tổ chức giáo dục |
| `logo-phu-xuan-university.svg` | SVG/PNG ~400×160 | `#logo-phu-xuan-university` | Đối tác – Trường và tổ chức giáo dục |
| `logo-elsa.svg` | SVG/PNG ~400×160 | `#logo-elsa` | Đối tác – Trường và tổ chức giáo dục |
| `logo-blue-ocean.svg` | SVG/PNG ~400×160 | `#logo-blue-ocean` | Đối tác – Trường và tổ chức giáo dục |

## Gắn Google Tag Manager

Trong `index.html` có sẵn 2 khối comment:

1. `GTM (HEAD)` – ngay đầu `<head>`: dán đoạn `<script>` của GTM.
2. `GTM (BODY)` – ngay sau `<body>`: dán đoạn `<noscript>` của GTM.

Thay `GTM-XXXXXXX` bằng mã container thật. Trang đã khởi tạo `window.dataLayer` nên GTM chỉ cần tạo Trigger kiểu *Custom Event* theo tên sự kiện bên dưới.

## Sự kiện tracking (dataLayer)

| Sự kiện | Dữ liệu | Khi nào |
|---|---|---|
| `program_click` | `program`: `ilead` \| `ipass` \| `iglobal` \| `chinese` · `grade`: `lop-N` \| `null` | Bấm nút "Xem chương trình …" |
| `zalo_click` | `position`: `header` \| `cta` \| `sticky` | Bấm "Nhắn Zalo" |
| `hotline_click` | `position`: `header` \| `cta` \| `sticky` | Bấm hotline / "Gọi ngay" / "Gọi tư vấn" |
| `copy_phone` | – | Bấm "Sao chép số" |

Cơ chế: phần tử có `data-track="<tên sự kiện>"` (kèm `data-program` hoặc `data-position`), `main.js` có 1 hàm lắng nghe click chung. `position: header` gồm hotline trên header và 2 nút trong menu mobile.

## UTM tự động

Mọi link sang 4 website chương trình được gắn:

```
?utm_source=online-hub&utm_medium=landing&utm_campaign=4-chuong-trinh&utm_content=<ilead|ipass|iglobal|chinese>
```

- Trang đang mở có `#lop-N` → thêm `&utm_term=lop-N`.
- Link trang chung đã có `utm_*` từ sales (ví dụ `?utm_source=zalo&utm_medium=sales`) → **giữ `utm_source` / `utm_medium` gốc** và chuyển tiếp sang link đích; `utm_campaign`, `utm_id`, `utm_term` của sales (nếu có) cũng được chuyển tiếp. `utm_content` luôn là mã chương trình.
- Khi JS tắt, link vẫn hoạt động (không có UTM).

## Link theo lớp `#lop-N`

Gửi link kèm hash để gợi ý sẵn chương trình hợp lớp của con:

```
https://online.ismart.edu.vn/#lop-1   …   https://online.ismart.edu.vn/#lop-9
```

- Trang tự cuộn tới phần chương trình, hiện dải "Gợi ý chương trình cho con lớp N" + nút "Xem tất cả".
- Thẻ hợp lớp được viền màu + nhãn "Phù hợp lớp N"; thẻ còn lại mờ đi (vẫn bấm được).
- Khoảng lớp lấy từ `data-grade-from` / `data-grade-to` trên mỗi thẻ `.prog-card` (không hard-code trong JS):
  lớp 1–2 → iLEAD · lớp 3–5 → iLEAD, iPass · lớp 6–9 → iPass, iGlobal, Tiếng Trung.
- Kết hợp được với UTM: `https://online.ismart.edu.vn/?utm_source=zalo&utm_medium=sales#lop-4`

## Ghi chú kỹ thuật

- Font Montserrat (Google Fonts, 400/500/600/700/800, `display=swap`). Chưa có dark mode.
- Hiệu ứng fade-up chỉ bật khi JS + IntersectionObserver hoạt động; nếu JS lỗi nội dung vẫn hiển thị đầy đủ. Tôn trọng `prefers-reduced-motion`.
- Màu chữ theo chương trình trên nền trắng dùng bản đậm hơn cho iLEAD (`#8A5A00`) và iPass (`#0B7F6E`) để đạt tương phản WCAG AA; màu nhận diện gốc vẫn dùng cho viền, thanh lớp, biểu đồ.
