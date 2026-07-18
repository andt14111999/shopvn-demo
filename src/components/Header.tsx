"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, useAuth } from "@/lib/store";

export default function Header() {
  const count = useCart((s) => s.count());
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header>
      <div className="bg-[#0D47A1] text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link href="/" className="text-xl font-bold">
            ShopVN
          </Link>
          <input
            className="flex-1 rounded px-3 py-1.5 text-sm text-gray-700"
            placeholder="Tìm kiếm sản phẩm..."
            readOnly
          />
          <Link href="/cart" className="whitespace-nowrap text-sm">
            🛒 Giỏ hàng ({mounted ? count : 0})
          </Link>
          {mounted && user ? (
            <span className="flex items-center gap-2 whitespace-nowrap text-sm">
              👤 {user.name}
              <button onClick={logout} className="underline opacity-80 hover:opacity-100">
                Đăng xuất
              </button>
            </span>
          ) : (
            <Link href="/login" className="whitespace-nowrap text-sm">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
      <nav className="bg-[#E3F2FD]">
        <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-[#0D47A1]">
          Trang chủ &nbsp;|&nbsp; Thời trang &nbsp;|&nbsp; Điện tử &nbsp;|&nbsp;
          Gia dụng &nbsp;|&nbsp; Sách
        </div>
      </nav>
    </header>
  );
}
