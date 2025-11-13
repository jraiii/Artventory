// src/routes/(app)/homepage/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SessionUser } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals }) => {
  // 1️⃣ Redirect unauthenticated users to login
  if (!locals.user) throw redirect(302, '/login');

  // 2️⃣ Redirect admins to admin dashboard
  if (locals.user.role === 'admin') throw redirect(302, '/admin');

  // 3️⃣ Fetch products & categories (replace with your real DB calls)
  const products = await (globalThis as any).fetchProducts?.() ?? [];
  const categories = await (globalThis as any).fetchCategories?.() ?? [];

  // 4️⃣ Fetch art shops in Balanga, Bataan (replace with your real DB calls)
  const shops = await (globalThis as any).fetchShops?.({ city: 'Balanga', province: 'Bataan' }) ?? [];

  // 5️⃣ Return data to page
  return {
    user: locals.user as SessionUser,
    products,
    categories,
    shops
  };
};
