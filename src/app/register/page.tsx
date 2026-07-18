"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth, useUsers } from "@/lib/store";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const addUser = useUsers((s) => s.addUser);
  const [form, setForm] = useState({ name: "", email: "", phone: "", pass: "" });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.pass) return;
    // đăng ký thành công -> lưu user + tự đăng nhập (demo, không có backend thật)
    const u = login(form.email, form.name);
    addUser({ name: u.name, email: u.email, role: u.role, locked: false });
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-sm rounded border bg-white p-6">
      <h1 className="mb-4 text-center text-xl font-bold text-[#0D47A1]">
        Đăng ký tài khoản
      </h1>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Họ và tên" value={form.name} onChange={set("name")}
          className="w-full rounded border px-3 py-2 text-sm" />
        <input type="email" required placeholder="Email" value={form.email} onChange={set("email")}
          className="w-full rounded border px-3 py-2 text-sm" />
        <input placeholder="Số điện thoại" value={form.phone} onChange={set("phone")}
          className="w-full rounded border px-3 py-2 text-sm" />
        <input type="password" required placeholder="Mật khẩu" value={form.pass} onChange={set("pass")}
          className="w-full rounded border px-3 py-2 text-sm" />
        <button type="submit"
          className="w-full rounded bg-[#1565C0] py-2.5 font-semibold text-white hover:bg-[#0D47A1]">
          Đăng ký
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-[#1565C0] underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
