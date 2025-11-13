// src/routes/logout/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    // ❌ Clear demo cookies
    event.cookies.delete('demo_role', { path: '/' });
    event.cookies.delete('demo_username', { path: '/' });

    // Reset locals.user just in case
    event.locals.user = undefined;

    // 🔁 Redirect back to login
    throw redirect(302, '/login');
  }
};
