// src/lib/stores/cart.ts
import { writable, derived } from 'svelte/store';

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  // some components/pages use `quantity` instead of `qty` — accept both
  quantity?: number;
  image?: string;
};

const initial: CartItem[] = [];

function createCart() {
  const { subscribe, update, set } = writable<CartItem[]>(initial);

  return {
    subscribe,
    add: (item: Omit<CartItem, 'qty'>, qty = 1) =>
      update((items) => {
        const existing = items.find((i) => i.id === item.id);
        if (existing) {
          return items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i));
        }
        return [...items, { ...item, qty }];
      }),
    remove: (id: string) =>
      update((items) => items.filter((i) => i.id !== id)),
    changeQty: (id: string, qty: number) =>
      update((items) => items.map((i) => (i.id === id ? { ...i, qty } : i))),
    clear: () => set([])
  };
}

export const cart = createCart();
export const cartCount = derived(cart, ($cart) =>
  $cart.reduce((s, i) => s + ((i.qty ?? i.quantity) as number ?? 0), 0)
);
export const cartTotal = derived(cart, ($cart) =>
  $cart.reduce((s, i) => s + ((i.qty ?? i.quantity) as number ?? 0) * i.price, 0)
);
// Controls whether the cart sidebar is visible
export const showCart = writable(false);

// Convenience named export used by some pages/components
export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1) {
  return cart.add(item, qty);
}

// compatibility wrappers for existing code
export function removeFromCart(id: string | number) {
  return cart.remove(String(id));
}

export function clearCart() {
  return cart.clear();
}

export function updateQuantity(id: string | number, qty: number) {
  return cart.changeQty(String(id), qty);
}
