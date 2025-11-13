// src/routes/(app)/homepage/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SessionUser } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals }) => {
  // 1️⃣ Redirect unauthenticated users to login
  if (!locals.user) throw redirect(302, '/login');

  // 2️⃣ Only allow cashier/user roles here
  if (locals.user.role === 'admin') {
    // Admins should not see homepage, send them to /admin
    throw redirect(302, '/admin');
  }

  // 3️⃣ Demo data
  const products = await (globalThis as any).fetchProducts?.() ?? [];
  const categories = await (globalThis as any).fetchCategories?.() ?? [];
  const shops = await (globalThis as any).fetchShops?.() ?? [];

  // 4️⃣ Return data to page
  return {
    user: locals.user as SessionUser,
    products,
    categories,
    shops
  };
};
