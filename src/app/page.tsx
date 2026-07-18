"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/store";

const CATS = ["Tất cả", "Thời trang", "Điện tử", "Gia dụng"];

function HomeContent() {
  const items = useProducts((s) => s.items);
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();
  const [cat, setCat] = useState("Tất cả");

  const list = items.filter(
    (p) =>
      (cat === "Tất cả" || p.category === cat) &&
      (!q || p.name.toLowerCase().includes(q))
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h1 className="mr-2 text-lg font-bold">
          {q ? `Kết quả cho “${q}”` : "Sản phẩm nổi bật"}
        </h1>
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-sm ${
              cat === c ? "bg-[#0D47A1] text-white" : "bg-white border"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-gray-600">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
