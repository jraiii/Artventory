// src/routes/+layout.server.ts  (or wherever you put it)
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }: { url: URL }) => {
  const pathname = url.pathname;

  // Publicly accessible pages (no login required)
  const publicRoutes = [
    '/',           // landing page or redirect
    '/login',
    '/signup',
    '/register',
    '/products',
    '/cart',
    '/checkout',
    '/about',
    '/contact'
  ];

  // Admin routes (require admin login)
  const adminRoutes = ['/admin'];

  // Example: get cookie/session (optional, if you have auth logic)
  // const session = event.cookies.get('session');
  // const user = session ? JSON.parse(session) : null;

  // For now, just skip redirect if route is public or admin
  if (!publicRoutes.includes(pathname) && !adminRoutes.includes(pathname)) {
    throw redirect(302, '/login');
  }

  return {};
};
