# IMAGES – Ảnh minh họa & prompt Higgsfield

- **Công cụ:** Higgsfield (MCP) · **Model:** `gpt_image_2_6` (GPT Image 2.6) · `quality: high` · xuất JPEG
- **Ngày tạo:** 11/11/2026 · **Số ảnh tạo bằng AI:** 11
- **Xử lý sau:** tải về máy, cắt đúng tỉ lệ, chuyển WebP bằng ffmpeg (`libwebp`, quality 76–80), mỗi ảnh có 2 kích thước cho `srcset`.
- `og-image.jpg` **không** do AI vẽ chữ: ghép từ `hero-main` + nền gradient navy, chữ đặt bằng ffmpeg `drawtext` với font Montserrat.

**Phong cách chung (có trong mọi prompt):** ảnh chụp chân thực, người Việt Nam, ánh sáng tự nhiên ấm, nhà Việt hiện đại gọn gàng, tông navy + cam; không chữ, không logo, không watermark, không nhãn hiệu; bàn tay tự nhiên.

| File (lớn / nhỏ) | Tỉ lệ | Kích thước | Dung lượng | Dùng ở |
|---|---|---|---|---|
| `hero-main.webp` / `hero-main-640.webp` | 4:5 | 960×1200 / 640×800 | 92 KB / 47 KB | Hero – ảnh chính |
| `hero-sub-1.webp` / `hero-sub-1-320.webp` | 1:1 | 640 / 320 | 28 KB / 11 KB | Hero – ảnh phụ 1 |
| `hero-sub-2.webp` / `hero-sub-2-320.webp` | 1:1 | 640 / 320 | 28 KB / 10 KB | Hero – ảnh phụ 2 |
| `prog-ilead.webp` / `prog-ilead-640.webp` | 16:9 | 1280×720 / 640×360 | 83 KB / 33 KB | Thẻ iLEAD |
| `prog-ipass.webp` / `prog-ipass-640.webp` | 16:9 | 1280×720 / 640×360 | 54 KB / 23 KB | Thẻ iPass |
| `prog-iglobal.webp` / `prog-iglobal-640.webp` | 16:9 | 1280×720 / 640×360 | 61 KB / 27 KB | Thẻ iGlobal |
| `prog-chinese.webp` / `prog-chinese-640.webp` | 16:9 | 1280×720 / 640×360 | 72 KB / 29 KB | Thẻ Tiếng Trung |
| `about-1.webp` / `about-1-640.webp` | 4:3 | 1200×900 / 640×480 | 95 KB / 39 KB | Về iSMART – ảnh lớn |
| `about-2.webp` / `about-2-320.webp` | 1:1 | 640 / 320 | 19 KB / 7 KB | Về iSMART – ảnh nhỏ |
| `about-3.webp` / `about-3-320.webp` | 1:1 | 640 / 320 | 38 KB / 14 KB | Về iSMART – ảnh nhỏ |
| `cta-family.webp` / `cta-family-640.webp` | 4:3 | 1200×900 / 640×480 | 78 KB / 32 KB | CTA cuối |
| `og-image.jpg` | 1200×630 | 1200×630 | 87 KB | `og:image` / `twitter:image` |

## Prompt đã dùng

### hero-main (4:5, 2k)
> Authentic photorealistic lifestyle photograph, vertical. A cheerful 8-year-old Vietnamese primary school girl wearing over-ear headphones sits at a tidy wooden study desk at home, attending an online class on a laptop, raising one hand high to answer, smiling brightly. Background softly out of focus: warm modern Vietnamese home study room with bookshelf and plants, her mother standing far in the background watching proudly. Warm natural window light, shallow depth of field, 50mm lens, candid editorial photo. Color palette harmonizes with deep navy blue and warm orange accents (navy cardigan, orange pencil cup). Laptop screen not visible or blurred. No text, no letters, no logos, no watermark, no brand marks on clothing or devices. Natural, anatomically correct hands.

### hero-sub-1 (1:1, 1k)
> Authentic photorealistic lifestyle photograph, square. A 13-year-old Vietnamese middle school boy in a plain white polo shirt sits at a desk at home, happily talking in a video call with a teacher on a tablet propped on a stand; he gestures naturally while speaking. The tablet screen is seen at an angle and softly blurred, showing only an indistinct friendly adult face. Warm natural daylight, tidy modern Vietnamese home, navy and warm orange accents in decor, shallow depth of field. No text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

### hero-sub-2 (1:1, 1k)
> Authentic photorealistic close-up photograph, square. A student's hands writing notes with a pencil in a notebook on a wooden desk, next to an open laptop whose screen is heavily blurred with soft colorful abstract shapes (nothing readable). An orange highlighter and a navy blue notebook nearby. Warm natural window light, shallow depth of field, cozy tidy home study atmosphere. The notebook page shows only indistinct illegible pencil scribble lines. No readable text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands with five fingers.

### prog-ilead (16:9, 2k)
> Authentic photorealistic lifestyle photograph, wide. A small group of four Vietnamese primary school children aged 7 to 10, in casual plain clothes, learning English through a playful role-play game in a bright living room: they hold blank colorful picture cards and simple hand puppets, laughing and interacting joyfully, sitting on a rug around a low table. Warm natural light, modern tidy Vietnamese home, warm amber and navy accents, candid documentary feel, shallow depth of field. Cards are blank colored shapes with no writing. No text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

### prog-ipass (16:9, 2k)
> Authentic photorealistic documentary photograph, wide. A Vietnamese middle school student, a 12-year-old boy in a white school uniform shirt, sits at a wooden study desk at home reviewing lessons: an open textbook and an exercise notebook in front of him, a laptop to the side, he is writing with a pen and looks focused and confident with a slight smile. Warm natural window light, tidy modern Vietnamese home study corner, teal-green desk lamp and navy pencil case as color accents, shallow depth of field. Book pages show only blurred illegible content. No readable text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

(Lần tạo đầu với nhân vật nữ sinh bị bộ lọc tự động của Higgsfield chặn nhầm; prompt trên là bản tạo lại thành công.)

### prog-iglobal (16:9, 2k)
> Authentic photorealistic lifestyle photograph, wide. A confident 14-year-old Vietnamese middle school boy in a smart plain light-blue shirt stands in his room giving an English presentation to a laptop webcam on the desk, gesturing openly with one hand, friendly confident expression, international modern feel. Behind him a clean wall with a plain world map without any labels and a small globe on a shelf. Warm natural light, modern tidy Vietnamese home, royal blue and navy accents, shallow depth of field. Laptop seen from behind, plain lid with no logo. No text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

### prog-chinese (16:9, 2k)
> Authentic photorealistic lifestyle photograph, wide. A focused, gently smiling 13-year-old Vietnamese middle school girl practices calligraphy with an ink brush on grid practice paper at her desk at home, while an online lesson plays on a laptop beside her (screen softly blurred, showing an indistinct teacher). Ink stone and brush rest on the desk, a small red paper decoration without writing in the background. The brush strokes on paper are abstract, soft-focus ink marks that are not legible characters. Warm natural light, modern tidy Vietnamese home, crimson red and navy accents, shallow depth of field. No readable text, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

### about-1 (4:3, 2k)
> Authentic photorealistic documentary photograph. Inside a bright Vietnamese public primary school classroom, a young Vietnamese female teacher guides a small group of pupils in white shirts with red scarves through a simple science experiment at a table: clear beakers with colored water, a small plant, a magnifying glass. The children look curious and excited, one points at the beaker. Other pupils and wooden desks softly blurred in the background, a clean empty green chalkboard. Warm natural daylight through windows, navy and warm orange accents. No text, no letters on board or walls, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

### about-2 (1:1, 1k)
> Authentic photorealistic portrait photograph, square. A friendly young Vietnamese female teacher in her late twenties wearing a headset with microphone, teaching an online class from a neat home office, smiling warmly toward a laptop in front of her and gesturing with one hand as she explains. Plain navy blazer over a cream top. Background softly blurred: bookshelf, plant, warm lamp with orange glow. Warm natural light, shallow depth of field. Laptop seen from behind, plain lid with no logo. No text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

### about-3 (1:1, 1k)
> Authentic photorealistic lifestyle photograph, square. A Vietnamese mother in her late thirties sits beside her 9-year-old son at a study desk at home, both looking at a lesson on a laptop together; the mother points gently toward the screen and the boy smiles, engaged. Laptop seen from behind at an angle, plain lid with no logo. Warm natural window light, modern tidy Vietnamese home, navy and warm orange accents, shallow depth of field, candid and affectionate. No text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

### cta-family (4:3, 2k)
> Authentic photorealistic lifestyle photograph. A happy Vietnamese family on a sofa in a modern tidy living room: father and mother in their late thirties with their 10-year-old daughter between them, all looking at a laptop on the coffee table with pleased, relieved smiles as if they have just chosen the right course; the mother rests a hand on her daughter's shoulder. Laptop seen from behind at an angle, plain lid with no logo. Warm golden natural light, navy cushions and warm orange accents, shallow depth of field, candid editorial feel. No text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.

## Tạo lại / thay ảnh

Giữ nguyên tên file và tỉ lệ. Lệnh chuyển WebP mẫu:

```bash
ffmpeg -i nguon.jpg -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -c:v libwebp -quality 76 prog-ilead.webp
```

## Bổ sung – ảnh dọc cho panel chương trình (desktop ≥ 1180px)

Panel chương trình trên desktop là cột dọc hẹp nên ảnh ngang 16:9 bị cắt mất mặt. Bốn ảnh dọc 9:16 dưới đây được tạo bằng Higgsfield `gpt_image_2_6` (quality high, 2k), **dùng ảnh ngang cũ làm ảnh tham chiếu** để giữ cùng nhân vật và bối cảnh. Mặt nhân vật đặt ở khoảng 30–38% từ trên xuống, chính giữa; 40% phía dưới là nền yên để đặt chữ. Màn hình nhỏ hơn 1180px vẫn dùng ảnh ngang cũ (`<picture>`).

| File (lớn / nhỏ) | Kích thước | Tham chiếu |
|---|---|---|
| `prog-ilead-tall.webp` / `-tall-400.webp` | 720×1280 / 400×712 | prog-ilead |
| `prog-ipass-tall.webp` / `-tall-400.webp` | 720×1280 / 400×712 | prog-ipass |
| `prog-iglobal-tall.webp` / `-tall-400.webp` | 720×1280 / 400×712 | prog-iglobal |
| `prog-chinese-tall.webp` / `-tall-400.webp` | 720×1280 / 400×712 | prog-chinese |

Mẫu prompt (iPass; 3 ảnh còn lại cùng cấu trúc, đổi nhân vật/bối cảnh theo ảnh tham chiếu):
> Tall vertical portrait version of the reference scene, same boy, same white school uniform shirt, same room and teal desk lamp. Authentic photorealistic lifestyle photograph. A 12-year-old Vietnamese middle school boy sits at his study desk, centered horizontally in the frame, looking up from his notebook with a calm confident smile, holding a pen. His face is in the upper half of the frame, about 30 to 38 percent from the top, fully visible and centered. The lower 40 percent of the frame is calm and simple: the wooden desk with an open textbook and notebook slightly out of focus, pages illegible. Warm natural window light, teal and navy accents, shallow depth of field. No readable text, no letters, no logos, no watermark, no brand marks. Natural, anatomically correct hands.
