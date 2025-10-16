import { writable } from 'svelte/store';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const cart = writable<CartItem[]>([]);

export function addToCart(product: { id: number; name: string; price: number; image?: string }) {
  cart.update((items) => {
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      // If product already in cart, increase quantity
      return items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new product with default quantity = 1
      return [...items, { ...product, quantity: 1 }];
    }
  });
}
