"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { useProducts } from "@/lib/store";
import { vnd } from "@/lib/products";

const CATS = ["Thời trang", "Điện tử", "Gia dụng"];
const empty = { id: 0, name: "", price: 0, category: "Thời trang", desc: "", img: "/products/p1.svg" };

export default function AdminProducts() {
  const { items, add, update, remove } = useProducts();
  const [form, setForm] = useState({ ...empty });
  const editing = form.id !== 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.price <= 0) return;
    if (editing) update(form);
    else add({ name: form.name, price: form.price, category: form.category, desc: form.desc, img: form.img });
    setForm({ ...empty });
  };

  return (
    <AdminShell>
      <form onSubmit={submit} className="mb-5 rounded border bg-white p-4">
        <div className="mb-3 font-semibold">
          {editing ? `Sửa sản phẩm #${form.id}` : "Thêm sản phẩm mới"}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="rounded border px-3 py-2 text-sm"
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            className="rounded border px-3 py-2 text-sm"
            placeholder="Giá (đ)"
            value={form.price || ""}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
          <select
            className="rounded border px-3 py-2 text-sm"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            className="rounded border px-3 py-2 text-sm"
            placeholder="Mô tả ngắn"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </div>
        <div className="mt-3 flex gap-2">
          <button className="rounded bg-[#1565C0] px-4 py-2 text-sm font-semibold text-white">
            {editing ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => setForm({ ...empty })}
              className="rounded border px-4 py-2 text-sm"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#ECEFF1] text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Danh mục</th>
            <th className="p-2">Giá</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">{vnd(p.price)}</td>
              <td className="p-2">
                <button
                  onClick={() => setForm({ ...p })}
                  className="mr-2 text-[#1565C0] underline"
                >
                  Sửa
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="text-red-600 underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminShell>
  );
}
