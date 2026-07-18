"use client";

import Link from "next/link";
import { Product, vnd } from "@/lib/products";
import { useCart } from "@/lib/store";

export default function ProductCard({ p }: { p: Product }) {
  const add = useCart((s) => s.add);
  return (
    <div className="flex flex-col rounded border border-gray-200 bg-white p-3">
      <Link href={`/product/${p.id}`}>
        <div className="flex h-32 items-center justify-center rounded bg-gray-100 text-sm text-gray-400">
          Ảnh sản phẩm
        </div>
        <div className="mt-2 font-semibold">{p.name}</div>
      </Link>
      <div className="mt-1 text-[#E53935]">{vnd(p.price)}</div>
      <button
        onClick={() => add(p)}
        className="mt-3 rounded bg-[#1565C0] py-2 text-sm font-semibold text-white hover:bg-[#0D47A1]"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}
