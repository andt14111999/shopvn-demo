"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { vnd } from "@/lib/products";

const SHIP = 30000;

export default function VnpayPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const amount = items.length ? total() + SHIP : 0;

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-t bg-[#0066B3] px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">VNPAY</span>
          <span className="text-sm">Sandbox</span>
        </div>
      </div>
      <div className="rounded-b border bg-white p-5">
        <div className="mb-4 rounded bg-blue-50 p-3 text-center">
          Số tiền thanh toán:{" "}
          <span className="font-bold text-[#0066B3]">{vnd(amount)}</span>
        </div>
        <h2 className="font-semibold">Thanh toán qua thẻ ATM / QR</h2>
        <div className="mt-3 space-y-3 text-sm">
          <Row label="Ngân hàng" value="NCB" />
          <Row label="Số thẻ" value="9704 xxxx xxxx 1234" />
          <Row label="Tên chủ thẻ" value="NGUYEN VAN A" />
          <Row label="Ngày phát hành" value="03/07" />
        </div>
        <button
          onClick={() => router.push("/order/success?method=vnpay")}
          className="mt-5 w-full rounded bg-[#0066B3] py-3 font-semibold text-white hover:bg-[#004b85]"
        >
          Thanh toán
        </button>
        <p className="mt-3 text-center text-xs text-gray-400">
          (Trang mô phỏng cổng VNPay sandbox cho mục đích demo)
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-32">{label}</label>
      <input
        defaultValue={value}
        className="flex-1 rounded border bg-gray-50 px-3 py-1.5"
      />
    </div>
  );
}
