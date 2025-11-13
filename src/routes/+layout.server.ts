// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { SessionUser } from '$lib/types/auth';

export const load = async ({ url, locals }: ServerLoadEvent) => {
  const pathname = url.pathname;
  const publicRoutes = ['/login', '/signup', '/register'];

  if (!locals.user && !publicRoutes.includes(pathname)) throw redirect(302, '/login');

  if (locals.user && publicRoutes.includes(pathname)) {
    const roleRedirectMap: Record<SessionUser['role'], string | null> = {
      admin: '/admin',
      user: '/homepage',
      cashier: null,
      manager: null,
      owner: null
    };

    // ✅ Type assertion ensures TypeScript knows the key exists
    const redirectPath = roleRedirectMap[locals.user.role as keyof typeof roleRedirectMap];
    if (redirectPath) throw redirect(302, redirectPath);
  }

  return {};
};
