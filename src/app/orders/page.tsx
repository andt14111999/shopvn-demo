"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useOrders, useAuth } from "@/lib/store";
import { vnd, STATUS_VI } from "@/lib/products";

export default function MyOrdersPage() {
  const orders = useOrders((s) => s.orders);
  const cancel = useOrders((s) => s.cancel);
  const user = useAuth((s) => s.user);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!user)
    return (
      <p className="text-gray-600">
        Vui lòng{" "}
        <Link href="/login?redirect=/orders" className="text-[#1565C0] underline">
          đăng nhập
        </Link>{" "}
        để xem đơn hàng.
      </p>
    );

  const mine = orders.filter((o) => o.userEmail === user.email);

  return (
    <div>
      <h1 className="mb-4 text-lg font-bold">Đơn hàng của tôi</h1>
      {mine.length === 0 ? (
        <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-3">
          {mine.map((o) => (
            <div key={o.id} className="rounded border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold">#{o.id}</span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-sm">
                  {STATUS_VI[o.status]} · {o.method === "cod" ? "COD" : "VNPay"}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-[#E53935]">{vnd(o.total)}</span>
                {o.status === "PENDING" && (
                  <button
                    onClick={() => cancel(o.id)}
                    className="rounded border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                  >
                    Hủy đơn
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
