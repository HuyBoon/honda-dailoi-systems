# Honda Đại Lợi System - Hệ thống Quản lý Phụ tùng & Thương mại Điện tử

Hệ thống quản trị kho và giải pháp thương mại điện tử cao cấp dành cho cửa hàng Phụ tùng Xe máy Honda Đại Lợi. Dự án được xây dựng với kiến trúc Monorepo hiện đại, tập trung vào hiệu năng, trải nghiệm người dùng và SEO.

---

## 📖 Tài liệu kỹ thuật
Để xem chi tiết về kiến trúc, luồng xử lý dữ liệu và hướng dẫn cài đặt chuyên sâu, vui lòng tham khảo:
👉 **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)**

---

## 🏗️ Cấu trúc Monorepo
Dự án bao gồm 3 thành phần chính:

| Thư mục | Thành phần | Mô tả |
| :--- | :--- | :--- |
| `apps/api` | **NestJS Backend** | RESTful API, quản lý PostgreSQL qua Prisma, Auth JWT. |
| `apps/storefront` | **Next.js Storefront** | Giao diện bán hàng cao cấp "Pathway", tối ưu SEO và Speed. |
| `apps/admin` | **Staff Dashboard** | Quản lý kho, đơn hàng và thống kê cho nhân viên. |

---

## ✨ Tính năng nổi bật

### 💎 Storefront "Pathway" Edition
- **Giao diện Cinematic**: Sử dụng Framer Motion và thiết kế Glassmorphism hiện đại.
- **Giỏ hàng thông minh**: Tự động đồng bộ Guest Cart và Cloud Cart sau khi đăng nhập.
- **Tối ưu SEO**: Tích hợp Sitemap.ts, Robots.ts và cấu trúc dữ liệu chuẩn Google.
- **Thanh toán MoMo**: Tích hợp cổng thanh toán điện tử MoMo.

### 📦 Quản trị Kho & POS
- **Quản lý đa chiều**: Theo dõi phụ tùng theo mã (SKU), danh mục và dòng xe tương thích.
- **Hệ thống POS**: Tạo đơn hàng nhanh, tự động trừ tồn kho và ghi nhật ký giao dịch.
- **Báo cáo thông minh**: Thống kê doanh thu, tồn kho và cảnh báo sản phẩm sắp hết hàng.

---

## 🛠 Cài đặt nhanh

### Yêu cầu
- Node.js (v18+) & PostgreSQL.

### Khởi chạy
1. **Cài đặt dependencies**: `npm install`
2. **Cấu hình API**: Tạo `.env` trong `apps/api` với `DATABASE_URL` và `JWT_SECRET`.
3. **Init DB**: `cd apps/api && npx prisma migrate dev && npx prisma db seed`
4. **Chạy đồng thời**:
   - Backend: `cd apps/api && npm run start:dev`
   - Storefront: `cd apps/storefront && npm run dev`
   - Admin: `cd apps/admin && npm run dev`

---

## 📄 Giấy phép & Tác giả
Dự án được thiết kế và phát triển bởi **Antigravity AI** phối hợp cùng **HuyBoon.Tech**.
