import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    if (!username || !password) {
      return fail(400, { message: 'Username and password are required.' });
    }

    // 🔑 Hardcoded admin login
    if (username === 'admin' && password === 'adminpogi') {
      const token = auth.generateSessionToken();
      const adminUser = {
        id: 'admin-id',
        fullname: 'Administrator',
        username: 'admin',
        email: 'admin@system.local',
        role: 'admin'
      };
      const session = await auth.createSession(token, adminUser.id);
      auth.setSessionTokenCookie({ cookies } as any, token, session.expiresAt);
      throw redirect(302, '/admin');
    }

    // 🧠 Regular user login
    const [user] = await db.select().from(table.user).where(eq(table.user.username, username));

    if (!user) {
      return fail(400, { message: 'Invalid username or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) {
      return fail(400, { message: 'Invalid username or password.' });
    }

    const token = auth.generateSessionToken();
    const session = await auth.createSession(token, user.id);
    auth.setSessionTokenCookie({ cookies } as any, token, session.expiresAt);

    throw redirect(302, '/app/homepage');
  }
};
