"use client";

import AdminShell from "@/components/AdminShell";
import { useOrders, OrderStatus } from "@/lib/store";
import { vnd, STATUS_VI } from "@/lib/products";

const STATUSES: OrderStatus[] = [
  "PENDING",
  "PAID",
  "SHIPPING",
  "DELIVERED",
  "CANCELLED",
  "EXPIRED",
];

export default function AdminOrders() {
  const orders = useOrders((s) => s.orders);
  const updateStatus = useOrders((s) => s.updateStatus);

  return (
    <AdminShell>
      {orders.length === 0 ? (
        <p className="text-gray-600">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#ECEFF1] text-left">
                <th className="p-2">Mã đơn</th>
                <th className="p-2">Khách hàng</th>
                <th className="p-2">Sản phẩm</th>
                <th className="p-2">Tổng tiền</th>
                <th className="p-2">Thanh toán</th>
                <th className="p-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b align-top">
                  <td className="p-2 font-medium">#{o.id}</td>
                  <td className="p-2">{o.userName}</td>
                  <td className="p-2 text-gray-600">
                    {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                  </td>
                  <td className="p-2 text-[#E53935]">{vnd(o.total)}</td>
                  <td className="p-2">{o.method === "cod" ? "COD" : "VNPay"}</td>
                  <td className="p-2">
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o.id, e.target.value as OrderStatus)
                      }
                      className="rounded border px-2 py-1"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_VI[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
