"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store";

const TABS: [string, string][] = [
  ["/admin", "Tổng quan"],
  ["/admin/products", "Sản phẩm"],
  ["/admin/orders", "Đơn hàng"],
  ["/admin/users", "Người dùng"],
  ["/admin/reports", "Báo cáo"],
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const user = useAuth((s) => s.user);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!user || user.role !== "admin") {
    router.push("/login?redirect=/admin");
    return null;
  }

  return (
    <div>
      <h1 className="mb-3 text-xl font-bold text-[#0D47A1]">Trang quản trị</h1>
      <div className="mb-5 flex flex-wrap gap-1 border-b pb-2">
        {TABS.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="rounded px-3 py-1.5 text-sm hover:bg-blue-50"
          >
            {label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
