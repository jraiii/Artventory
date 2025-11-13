// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const username = (form.get('username') as string)?.trim();
    const password = (form.get('password') as string)?.trim();

    if (!username || !password) {
      return fail(400, { message: 'Username and password required' });
    }

    if (username === 'cashier01' && password === 'cashier01') {
      event.cookies.set('demo_role', 'cashier', { path: '/' });
      event.cookies.set('demo_username', username, { path: '/' });
      throw redirect(302, '/homepage');
    }

    if (username === 'admin01' && password === 'admin123') {
      event.cookies.set('demo_role', 'admin', { path: '/' });
      event.cookies.set('demo_username', username, { path: '/' });
      throw redirect(302, '/admin');
    }

    return fail(400, { message: 'Invalid username or password' });
  }
};
