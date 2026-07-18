"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { vnd } from "@/lib/products";

export default function CartPage() {
  const { items, setQty, remove, total } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (items.length === 0)
    return (
      <div className="text-center">
        <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
        <Link href="/" className="mt-4 inline-block text-[#1565C0] underline">
          Tiếp tục mua sắm
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="mb-4 text-lg font-bold">Giỏ hàng của bạn</h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#ECEFF1] text-left">
            <th className="p-3">Sản phẩm</th>
            <th className="p-3">Đơn giá</th>
            <th className="p-3">Số lượng</th>
            <th className="p-3">Thành tiền</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-3">{i.name}</td>
              <td className="p-3">{vnd(i.price)}</td>
              <td className="p-3">
                <div className="inline-flex items-center rounded border">
                  <button className="px-2" onClick={() => setQty(i.id, i.qty - 1)}>
                    −
                  </button>
                  <span className="w-8 text-center">{i.qty}</span>
                  <button className="px-2" onClick={() => setQty(i.id, i.qty + 1)}>
                    +
                  </button>
                </div>
              </td>
              <td className="p-3 text-[#E53935]">{vnd(i.price * i.qty)}</td>
              <td className="p-3">
                <button onClick={() => remove(i.id)} className="text-gray-400 hover:text-red-600">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right">
        <div className="text-lg font-bold">
          Tổng cộng: <span className="text-[#E53935]">{vnd(total())}</span>
        </div>
        <button
          onClick={() => router.push("/checkout")}
          className="mt-3 rounded bg-[#1565C0] px-6 py-3 font-semibold text-white hover:bg-[#0D47A1]"
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
}
