# Honda Đại Lợi - Hệ thống Quản lý Phụ tùng & Bán hàng

Hệ thống quản lý kho và bán hàng hiện đại dành cho cửa hàng Phụ tùng Xe máy Honda Đại Lợi. Được xây dựng với kiến trúc Monorepo, hiệu năng cao và giao diện người dùng cao cấp.

## 🚀 Công nghệ sử dụng

### Backend (apps/api)
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL với Prisma ORM
- **Authentication**: JWT với Role-based Access Control (RBAC)
- **Validation**: Class-validator & Class-transformer
- **Storage**: Multer & Sharp (Tối ưu hóa hình ảnh)

### Frontend (apps/admin)
- **Framework**: React 19 + Vite
- **State Management**: Redux Toolkit & RTK Query
- **Styling**: Tailwind CSS & Lucide Icons
- **UI Components**: Shadcn UI (Base UI) & Framer Motion
- **Editor**: CKEditor 5

## 📦 Cấu trúc dự án
- `apps/api`: RESTful API server.
- `apps/admin`: Dashboard quản trị viên.
- `packages`: (Placeholder) Các thư viện và kiểu dữ liệu dùng chung.

## ✨ Tính năng nổi bật
1. **Quản lý kho (Inventory)**: Theo dõi phụ tùng theo mã (Part Number), danh mục và dòng xe tương thích.
2. **Thư viện phương tiện (Media Library)**: Quản lý hình ảnh tập trung, tự động xóa ảnh rác khi cập nhật/xóa phụ tùng.
3. **Quản lý bán hàng (Orders)**: Hệ thống POS tạo đơn hàng nhanh, tự động trừ tồn kho và ghi nhật ký giao dịch.
4. **Báo cáo & Thống kê**: Biểu đồ trực quan về giá trị kho và các mặt hàng sắp hết hàng.
5. **Thiết kế Responsive**: Tối ưu hóa cho cả máy tính và thiết bị di động.

## 🛠 Cài đặt & Khởi chạy

### Yêu cầu hệ thống
- Node.js (v18+)
- PostgreSQL

### Các bước cài đặt
1. Clone dự án:
   ```bash
   git clone [repository-url]
   ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Cấu hình biến môi trường:
   - Tạo file `.env` trong `apps/api` (Tham khảo `.env.example`).
4. Khởi tạo Database:
   ```bash
   cd apps/api
   npx prisma migrate dev
   ```
5. Chạy ứng dụng:
   - Backend: `npm run start` (tại `apps/api`)
   - Frontend: `npm run dev` (tại `apps/admin`)

## 📄 Giấy phép
Dự án được phát triển bởi **HuyBoon.Tech**.
