"use client";

import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { useProducts, useOrders, useUsers } from "@/lib/store";
import { vnd } from "@/lib/products";

export default function AdminHome() {
  const products = useProducts((s) => s.items);
  const orders = useOrders((s) => s.orders);
  const users = useUsers((s) => s.users);

  const revenue = orders
    .filter((o) => o.status !== "CANCELLED" && o.status !== "EXPIRED")
    .reduce((a, o) => a + o.total, 0);

  const cards = [
    { label: "Sản phẩm", value: products.length, href: "/admin/products" },
    { label: "Đơn hàng", value: orders.length, href: "/admin/orders" },
    { label: "Người dùng", value: users.length, href: "/admin/users" },
    { label: "Doanh thu", value: vnd(revenue), href: "/admin/reports" },
  ];

  return (
    <AdminShell>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded border bg-white p-4 hover:shadow"
          >
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="mt-1 text-2xl font-bold text-[#0D47A1]">{c.value}</div>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Chọn một mục ở trên hoặc dùng thanh menu để quản lý sản phẩm, đơn hàng,
        người dùng và xem báo cáo.
      </p>
    </AdminShell>
  );
}
