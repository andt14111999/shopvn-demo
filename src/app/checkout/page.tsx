"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { vnd } from "@/lib/products";

const SHIP = 30000;

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<"vnpay" | "cod">("vnpay");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (items.length === 0)
    return <div className="text-gray-600">Giỏ hàng trống, không thể thanh toán.</div>;

  const grand = total() + SHIP;

  const submit = () => {
    if (method === "vnpay") router.push("/payment/vnpay");
    else router.push("/order/success?method=cod");
  };

  return (
    <div>
      <h1 className="mb-4 text-lg font-bold">Thanh toán đơn hàng</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Địa chỉ + phương thức */}
        <div className="rounded border bg-white p-5 md:col-span-2">
          <h2 className="font-semibold">Địa chỉ giao hàng</h2>
          <div className="mt-3 space-y-3">
            <Field label="Họ và tên" value="Đinh Tiến An" />
            <Field label="Số điện thoại" value="09xx xxx xxx" />
            <Field label="Địa chỉ" value="Số 96A Trần Phú, Hà Đông, Hà Nội" />
          </div>

          <h2 className="mt-6 font-semibold">Phương thức thanh toán</h2>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={method === "vnpay"}
                onChange={() => setMethod("vnpay")}
              />
              VNPay (sandbox)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} />
              Thanh toán khi nhận hàng (COD)
            </label>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="rounded border bg-white p-5">
          <h2 className="font-semibold">Đơn hàng</h2>
          <div className="mt-3 space-y-1 text-sm">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between">
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>{vnd(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-2">
              <span>Phí vận chuyển</span>
              <span>{vnd(SHIP)}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-lg font-bold text-[#E53935]">
            <span>Tổng cộng</span>
            <span>{vnd(grand)}</span>
          </div>
          <button
            onClick={submit}
            className="mt-5 w-full rounded bg-[#1565C0] py-3 font-semibold text-white hover:bg-[#0D47A1]"
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-32 text-sm">{label}</label>
      <input
        defaultValue={value}
        className="flex-1 rounded border bg-gray-50 px-3 py-1.5 text-sm"
      />
    </div>
  );
}
