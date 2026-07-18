"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getProduct, vnd } from "@/lib/products";
import { useCart } from "@/lib/store";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const p = getProduct(Number(params.id));
  const add = useCart((s) => s.add);
  const router = useRouter();
  const [qty, setQty] = useState(1);

  if (!p) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex h-80 items-center justify-center rounded bg-gray-100 text-gray-400">
        Ảnh sản phẩm
      </div>
      <div>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="mt-2 text-xl font-bold text-[#E53935]">{vnd(p.price)}</div>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">{p.desc}</p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm">Số lượng:</span>
          <div className="flex items-center rounded border">
            <button className="px-3 py-1" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="w-10 text-center">{qty}</span>
            <button className="px-3 py-1" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              add(p, qty);
              router.push("/cart");
            }}
            className="rounded bg-[#1565C0] px-5 py-3 font-semibold text-white hover:bg-[#0D47A1]"
          >
            🛒 Thêm vào giỏ hàng
          </button>
          <button
            onClick={() => {
              add(p, qty);
              router.push("/checkout");
            }}
            className="rounded bg-[#E53935] px-5 py-3 font-semibold text-white hover:bg-[#c62828]"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
