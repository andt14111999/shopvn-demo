"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart, useOrders, useAuth } from "@/lib/store";

const SHIP = 30000;

function SuccessContent() {
  const params = useSearchParams();
  const method = params.get("method") === "cod" ? "cod" : "vnpay";
  const cart = useCart();
  const addOrder = useOrders((s) => s.addOrder);
  const user = useAuth((s) => s.user);
  const [orderId] = useState(() => "OD" + Date.now().toString().slice(-8));
  const created = useRef(false);

  const label = method === "cod" ? "COD" : "VNPay";
  const status = method === "cod" ? "Chờ xác nhận (PENDING)" : "Đã thanh toán (PAID)";

  useEffect(() => {
    if (created.current) return;
    created.current = true;
    if (cart.items.length > 0) {
      addOrder({
        id: orderId,
        userEmail: user?.email || "khach@shopvn.vn",
        userName: user?.name || "Khách",
        items: cart.items,
        total: cart.total() + SHIP,
        method,
        status: method === "cod" ? "PENDING" : "PAID",
        createdAt: Date.now(),
      });
      cart.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="text-7xl text-[#2E7D32]">✓</div>
      <h1 className="mt-2 text-2xl font-bold text-[#2E7D32]">Đặt hàng thành công!</h1>
      <p className="mt-3 text-lg">
        Mã đơn hàng: <span className="font-semibold">#{orderId}</span>
      </p>
      <p className="mt-1 text-sm text-gray-600">
        Phương thức: {label} &nbsp;·&nbsp; Trạng thái: {status}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Cảm ơn bạn đã mua hàng. Email xác nhận đã được gửi tới địa chỉ của bạn.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/orders"
          className="rounded border border-[#1565C0] px-5 py-2.5 font-semibold text-[#1565C0]"
        >
          Xem đơn hàng của tôi
        </Link>
        <Link
          href="/"
          className="rounded bg-[#1565C0] px-5 py-2.5 font-semibold text-white hover:bg-[#0D47A1]"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center">Đang xử lý...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
