import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const fullname = (form.get('fullname') as string)?.trim();
    const username = (form.get('username') as string)?.trim();
    const password = (form.get('password') as string)?.trim();

    if (!fullname || !username || !password) {
      return fail(400, { message: 'All fields are required.' });
    }

    if (password.length < 6) {
      return fail(400, { message: 'Password must be at least 6 characters.' });
    }

    const existingUser = await db.select().from(table.user).where(eq(table.user.username, username));
    if (existingUser.length > 0) {
      return fail(400, { message: 'Username already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = crypto.randomUUID();

    await db.insert(table.user).values({
      id: newUserId,
      fullname,
      username,
      email: `${username}@placeholder.local`,
      hashedPassword,
      role: 'cashier',
      active: true
    });

    const token = auth.generateSessionToken();
    const session = await auth.createSession(token, newUserId);

    // ✅ Use cookies directly to fix TS error
    auth.setSessionTokenCookie(event.cookies, token, session.expiresAt);

    throw redirect(302, '/homepage');
  }
};
