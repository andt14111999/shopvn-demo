import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts, Product } from "./products";

/* ----------------------------- Giỏ hàng ----------------------------- */
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
          if (ex)
            return {
              items: s.items.map((i) =>
                i.id === p.id ? { ...i, qty: i.qty + qty } : i
              ),
            };
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

/* ----------------------------- Tài khoản ---------------------------- */
export type Role = "customer" | "admin";
export type User = { name: string; email: string; role: Role };
const ADMIN_EMAIL = "admin@shopvn.vn";

type AuthState = {
  user: User | null;
  login: (email: string, name?: string) => User;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, name) => {
        const role: Role =
          email.trim().toLowerCase() === ADMIN_EMAIL ? "admin" : "customer";
        const u: User = { email, name: name || email.split("@")[0], role };
        set({ user: u });
        return u;
      },
      logout: () => set({ user: null }),
    }),
    { name: "shopvn-auth" }
  )
);

/* --------------------- Sản phẩm (admin CRUD) ------------------------ */
type ProductsState = {
  items: Product[];
  add: (p: Omit<Product, "id">) => void;
  update: (p: Product) => void;
  remove: (id: number) => void;
  reset: () => void;
};

export const useProducts = create<ProductsState>()(
  persist(
    (set) => ({
      items: seedProducts,
      add: (p) =>
        set((s) => ({
          items: [
            ...s.items,
            { ...p, id: Math.max(0, ...s.items.map((i) => i.id)) + 1 },
          ],
        })),
      update: (p) =>
        set((s) => ({ items: s.items.map((i) => (i.id === p.id ? p : i)) })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      reset: () => set({ items: seedProducts }),
    }),
    { name: "shopvn-products" }
  )
);

/* ----------------------------- Đơn hàng ----------------------------- */
export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPING"
  | "DELIVERED"
  | "CANCELLED"
  | "EXPIRED";

export type Order = {
  id: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  total: number;
  method: "vnpay" | "cod";
  status: OrderStatus;
  createdAt: number;
};

type OrdersState = {
  orders: Order[];
  addOrder: (o: Order) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
  cancel: (id: string) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      updateStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      cancel: (id) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, status: "CANCELLED" as OrderStatus } : o
          ),
        })),
    }),
    { name: "shopvn-orders" }
  )
);

/* ------------------- Người dùng (admin quản lý) --------------------- */
export type ManagedUser = {
  name: string;
  email: string;
  role: Role;
  locked: boolean;
};

type UsersState = {
  users: ManagedUser[];
  addUser: (u: ManagedUser) => void;
  toggleLock: (email: string) => void;
};

export const useUsers = create<UsersState>()(
  persist(
    (set) => ({
      users: [
        { name: "Quản trị viên", email: ADMIN_EMAIL, role: "admin", locked: false },
        { name: "Nguyễn Văn A", email: "vana@gmail.com", role: "customer", locked: false },
        { name: "Trần Thị B", email: "thib@gmail.com", role: "customer", locked: false },
      ],
      addUser: (u) =>
        set((s) =>
          s.users.find((x) => x.email === u.email) ? s : { users: [...s.users, u] }
        ),
      toggleLock: (email) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.email === email ? { ...u, locked: !u.locked } : u
          ),
        })),
    }),
    { name: "shopvn-users" }
  )
);
