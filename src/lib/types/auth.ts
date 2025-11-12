// src/types/session.d.ts
export type SessionUser = {
  id: string;
  fullname: string; // ✅ required now
  email: string;
  role: 'admin' | 'cashier' | 'manager' | 'owner';
};

declare module '@sveltejs/kit' {
  interface Locals {
    user?: SessionUser | null;
    session?: unknown;
  }
}
