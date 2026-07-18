"use client";

import AdminShell from "@/components/AdminShell";
import { useUsers } from "@/lib/store";

export default function AdminUsers() {
  const users = useUsers((s) => s.users);
  const toggleLock = useUsers((s) => s.toggleLock);

  return (
    <AdminShell>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#ECEFF1] text-left">
            <th className="p-2">Họ tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">Vai trò</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    u.role === "admin"
                      ? "bg-[#0D47A1] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {u.role === "admin" ? "Quản trị" : "Khách hàng"}
                </span>
              </td>
              <td className="p-2">
                {u.locked ? (
                  <span className="text-red-600">Đã khóa</span>
                ) : (
                  <span className="text-green-700">Hoạt động</span>
                )}
              </td>
              <td className="p-2">
                {u.role !== "admin" && (
                  <button
                    onClick={() => toggleLock(u.email)}
                    className="underline text-[#1565C0]"
                  >
                    {u.locked ? "Mở khóa" : "Khóa"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminShell>
  );
}
