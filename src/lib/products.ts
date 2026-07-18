export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string;
};

export const products: Product[] = [
  { id: 1, name: "Áo thun nam", price: 199000, category: "Thời trang", desc: "Áo thun cotton 100%, form regular, thoáng mát, nhiều màu lựa chọn." },
  { id: 2, name: "Tai nghe Bluetooth", price: 590000, category: "Điện tử", desc: "Tai nghe không dây, pin 30 giờ, chống ồn chủ động, Bluetooth 5.3. Bảo hành 12 tháng." },
  { id: 3, name: "Nồi chiên không dầu", price: 1290000, category: "Gia dụng", desc: "Dung tích 5L, công suất 1500W, 8 chế độ nấu, hẹn giờ tự động." },
  { id: 4, name: "Giày sneaker", price: 850000, category: "Thời trang", desc: "Giày thể thao đế cao su, êm chân, phù hợp đi học và đi chơi." },
  { id: 5, name: "Bàn phím cơ", price: 990000, category: "Điện tử", desc: "Bàn phím cơ switch red, led RGB, khung nhôm, kết nối USB-C." },
  { id: 6, name: "Balo laptop", price: 450000, category: "Thời trang", desc: "Balo chống nước, ngăn laptop 15.6 inch, cổng sạc USB tiện lợi." },
  { id: 7, name: "Đồng hồ thông minh", price: 2190000, category: "Điện tử", desc: "Đo nhịp tim, SpO2, GPS, chống nước IP68, pin 7 ngày." },
  { id: 8, name: "Bình giữ nhiệt", price: 320000, category: "Gia dụng", desc: "Giữ nhiệt 12 giờ, dung tích 500ml, inox 304 an toàn sức khỏe." },
];

export const getProduct = (id: number) => products.find((p) => p.id === id);

export const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";
