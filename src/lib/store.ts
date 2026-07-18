import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { id: number; name: string; price: number; qty: number };

type CartState = {
  items: CartItem[];
  add: (p: { id: number; name: string; price: number }, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p, qty = 1) =>
        set((s) => {
          const ex = s.items.find((i) => i.id === p.id);
          if (ex) {
            return {
              items: s.items.map((i) =>
                i.id === p.id ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...s.items, { ...p, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, qty) } : i
          ),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((a, i) => a + i.price * i.qty, 0),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
    }),
    { name: "shopvn-cart" }
  )
);
