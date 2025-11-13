import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login');
  if (locals.user.role !== 'admin') throw redirect(302, '/homepage');

  // fetch admin data (products, reports) - replace with your actual calls
  const products = await (globalThis as any).fetchAdminProducts?.() ?? [];
  const reports = await (globalThis as any).fetchSalesReports?.() ?? [];

  return { user: locals.user, products, reports };
};
