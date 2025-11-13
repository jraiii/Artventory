import { redirect } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { SessionUser } from '$lib/types/auth';

export const load = async ({ url, locals }: ServerLoadEvent) => {
  const pathname = url.pathname.split('?')[0].replace(/\/$/, '');

  // ✅ Public routes (expandable)
  const publicRoutes = ['/login', '/demo'];
  const isPublic = publicRoutes.includes(pathname);

  // 🚫 Block access to private routes if not logged in
  if (!locals.user && !isPublic) {
    console.warn(`Blocked unauthenticated access to ${pathname}`);
    throw redirect(302, '/login');
  }

  // 🔁 Redirect logged-in users away from public routes
  if (locals.user && isPublic) {
    const roleRedirectMap: Record<SessionUser['role'], string> = {
      admin: '/admin',
      cashier: '/homepage',
      user: '/homepage',
      manager: '/homepage',
      owner: '/homepage'
    };

    const role = locals.user.role as keyof typeof roleRedirectMap;
    const redirectPath = roleRedirectMap[role] ?? '/homepage';

    console.info(`Redirecting ${locals.user.username} (${role}) from public route to ${redirectPath}`);
    throw redirect(302, redirectPath);
  }

  return {};
};
