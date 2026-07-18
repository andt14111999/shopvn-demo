# ShopVN — Website bán hàng trực tuyến (Demo Thực tập cơ sở)

Ứng dụng demo cho đồ án **Thực tập cơ sở** — đề tài *"Xây dựng Website quản lý bán hàng trực tuyến"*.
Demo minh hoạ đầy đủ **12 use case**, trọng tâm là use case **"Đặt hàng và thanh toán"**.

- 👤 Sinh viên: **Đinh Tiến An** — B23DTCN114 — Lớp D23TXCN04-B

## 🔗 Liên kết

| | |
|---|---|
| 🌐 App live | **https://shopvn-demo.vercel.app** |
| 💻 Mã nguồn | **https://github.com/andt14111999/shopvn-demo** |

## 🔑 Tài khoản demo

> Đây là bản demo **client-side** (không có backend/CSDL thật), phân quyền theo email — **mật khẩu gõ gì cũng được**.

| Vai trò | Đăng nhập | Ghi chú |
|---|---|---|
| **Quản trị viên (Admin)** | Email: `admin@shopvn.vn` — mật khẩu bất kỳ | Hiện menu **⚙ Quản trị** |
| **Khách hàng** | Bất kỳ email khác (vd `an@gmail.com`) — mật khẩu bất kỳ | Hoặc bấm **Đăng ký** để tạo mới |

## 🧩 12 use case và vị trí trên app

| # | Use case | Đường dẫn / thao tác |
|---|---|---|
| 1 | Đăng ký | `/register` |
| 2 | Đăng nhập | `/login` |
| 3 | Xem sản phẩm | Trang chủ `/` + `/product/[id]` |
| 4 | Tìm kiếm sản phẩm | Ô tìm kiếm + nút lọc danh mục |
| 5 | Quản lý giỏ hàng | `/cart` (sửa số lượng / xóa) |
| 6 | Đặt hàng | `/checkout` |
| 7 | Thanh toán | VNPay *(mô phỏng)* / COD |
| 8 | Xem lịch sử đơn + hủy đơn | `/orders` |
| 9 | Quản lý sản phẩm | `/admin/products` (thêm/sửa/xóa) |
| 10 | Quản lý đơn hàng | `/admin/orders` (đổi trạng thái) |
| 11 | Quản lý người dùng | `/admin/users` (khóa/mở) |
| 12 | Xem báo cáo | `/admin/reports` (doanh thu, bán chạy) |

## 🛠 Công nghệ

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (giao diện)
- **Zustand** (quản lý trạng thái giỏ hàng / đăng nhập / dữ liệu, lưu ở `localStorage`)
- Triển khai trên **Vercel**

## 🚀 Chạy trên máy khác

Yêu cầu: **Node.js 20+** và Git.

```bash
# 1. Clone mã nguồn
git clone https://github.com/andt14111999/shopvn-demo.git
cd shopvn-demo

# 2. Cài thư viện
npm install

# 3. Chạy môi trường phát triển
npm run dev
# Mở http://localhost:3000
```

Build bản production để kiểm tra:

```bash
npm run build
npm start
```

## ☁️ Deploy lên Vercel

```bash
npm i -g vercel      # cài Vercel CLI (nếu máy mới)
vercel login         # đăng nhập tài khoản Vercel
vercel --prod        # deploy production
```

> Nếu đã nối GitHub ↔ Vercel: chỉ cần `git push` là Vercel **tự động build & deploy**.

## 📁 Cấu trúc thư mục

```
src/
  app/
    page.tsx                # Trang chủ (danh sách + tìm kiếm + lọc)
    login/ register/        # Đăng nhập / Đăng ký
    product/[id]/           # Chi tiết sản phẩm
    cart/ checkout/         # Giỏ hàng / Thanh toán
    payment/vnpay/          # Cổng VNPay (mô phỏng)
    order/success/          # Đặt hàng thành công
    orders/                 # Lịch sử đơn hàng của khách
    admin/                  # Khu quản trị (products/orders/users/reports)
  components/               # Header, ProductCard, AdminShell
  lib/
    products.ts             # Dữ liệu sản phẩm mẫu + tiện ích
    store.ts                # Các store: cart, auth, products, orders, users
public/products/            # Ảnh sản phẩm (SVG)
```

## 📝 Ghi chú

- Là **bản demo phục vụ trình bày đồ án**: dữ liệu (sản phẩm, đơn hàng, người dùng) lưu trong trình duyệt (`localStorage`), không có server/CSDL thật.
- **VNPay là trang mô phỏng** cổng sandbox — không gọi giao dịch thật. Thiết kế API/CSDL đầy đủ được trình bày trong báo cáo (Chương III).
- Muốn dữ liệu admin có nội dung: hãy **đặt thử một đơn hàng** trước khi vào mục Đơn hàng / Báo cáo.
