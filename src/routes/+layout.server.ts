import { redirect } from '@sveltejs/kit';

import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ url, locals }: ServerLoadEvent) => {
  const pathname = url.pathname;

  const publicRoutes = ['/login', '/signup', '/register'];

  // Not logged in → redirect to login
  if (!locals.user && !publicRoutes.includes(pathname)) {
    if (pathname !== '/login') throw redirect(302, '/login');
    return {};
  }

  // Logged in → block access to auth pages
  if (locals.user && publicRoutes.includes(pathname)) {
    if (locals.user.role === 'admin') {
      throw redirect(302, '/internal/admin');
    } else {
      throw redirect(302, '/app/homepage');
    }
  }

  return {};
};
