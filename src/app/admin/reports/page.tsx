"use client";

import AdminShell from "@/components/AdminShell";
import { useOrders } from "@/lib/store";
import { vnd } from "@/lib/products";

export default function AdminReports() {
  const orders = useOrders((s) => s.orders);
  const valid = orders.filter(
    (o) => o.status !== "CANCELLED" && o.status !== "EXPIRED"
  );

  const revenue = valid.reduce((a, o) => a + o.total, 0);

  // top sản phẩm bán chạy
  const sold: Record<string, number> = {};
  valid.forEach((o) =>
    o.items.forEach((i) => {
      sold[i.name] = (sold[i.name] || 0) + i.qty;
    })
  );
  const top = Object.entries(sold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxQty = top.length ? top[0][1] : 1;

  return (
    <AdminShell>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Tổng doanh thu" value={vnd(revenue)} />
        <Stat label="Số đơn hợp lệ" value={String(valid.length)} />
        <Stat label="Tổng số đơn" value={String(orders.length)} />
      </div>

      <h2 className="mb-3 mt-6 font-semibold">Top sản phẩm bán chạy</h2>
      {top.length === 0 ? (
        <p className="text-gray-600">Chưa có dữ liệu bán hàng.</p>
      ) : (
        <div className="space-y-2">
          {top.map(([name, qty]) => (
            <div key={name} className="flex items-center gap-3">
              <div className="w-40 truncate text-sm">{name}</div>
              <div className="h-5 flex-1 rounded bg-gray-100">
                <div
                  className="h-5 rounded bg-[#1565C0]"
                  style={{ width: `${(qty / maxQty) * 100}%` }}
                />
              </div>
              <div className="w-12 text-right text-sm font-medium">{qty}</div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border bg-white p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-[#0D47A1]">{value}</div>
    </div>
  );
}
