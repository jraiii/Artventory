import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  // only allow authenticated non-admin users here
  if (!locals.user) throw redirect(302, '/auth/login');
  if (locals.user.role === 'admin') throw redirect(302, '/internal/admin');

  // fetch products & categories server-side as needed (example placeholders)
  const products = await (globalThis as any).fetchProducts?.() ?? [];
  const categories = await (globalThis as any).fetchCategories?.() ?? [];

  return { products, categories, user: locals.user };
};
