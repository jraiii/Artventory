// src/lib/stores/auth.ts
import { writable } from 'svelte/store';

export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

export const user = writable<User | null>(null);
export const isAuthenticated = writable(false);

// helper to populate from server session (call on app load)
export async function loadSession() {
  try {
    const res = await fetch('/api/auth/session');
    if (res.ok) {
      const data = await res.json();
      user.set(data.user ?? null);
      isAuthenticated.set(Boolean(data.user));
    } else {
      user.set(null);
      isAuthenticated.set(false);
    }
  } catch {
    user.set(null);
    isAuthenticated.set(false);
  }
}
