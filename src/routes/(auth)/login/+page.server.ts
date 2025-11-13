// src/routes/(auth)/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const username = (form.get('username') as string)?.trim();
    const password = (form.get('password') as string)?.trim();

    if (!username || !password) return fail(400, { message: 'Username and password required' });

    const [user] = await db.select().from(table.user).where(eq(table.user.username, username));
    if (!user) return fail(400, { message: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) return fail(400, { message: 'Invalid username or password' });

    const token = auth.generateSessionToken();
    const session = await auth.createSession(token, user.id);
    auth.setSessionTokenCookie(event.cookies, token, session.expiresAt);

    const role = (user.role || 'user').toLowerCase();
    const redirectTo = role === 'admin' ? '/admin' : '/homepage';
    throw redirect(302, redirectTo);
  }
};
