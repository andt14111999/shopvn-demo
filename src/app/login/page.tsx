"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth, useUsers } from "@/lib/store";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const login = useAuth((s) => s.login);
  const addUser = useUsers((s) => s.addUser);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pass) return;
    const u = login(email);
    addUser({ name: u.name, email: u.email, role: u.role, locked: false });
    router.push(params.get("redirect") || "/");
  };

  return (
    <div className="mx-auto max-w-sm rounded border bg-white p-6">
      <h1 className="mb-4 text-center text-xl font-bold text-[#0D47A1]">
        Đăng nhập
      </h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          placeholder="Mật khẩu"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="w-full rounded bg-[#1565C0] py-2.5 font-semibold text-white hover:bg-[#0D47A1]"
        >
          Đăng nhập
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-[#1565C0] underline">
          Đăng ký
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-gray-400">
        Demo quản trị: admin@shopvn.vn (mật khẩu bất kỳ)
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
