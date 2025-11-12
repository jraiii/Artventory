import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const fullname = data.get('fullname') as string;
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    if (!fullname || !username || !password) {
      return fail(400, { message: 'All fields are required.' });
    }

    // Check if username already exists
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
      email: `${username}@placeholder.local`, // fallback to keep schema compatible
      hashedPassword,
      role: 'cashier',
      active: true
    });

    // Auto-login newly created user
    const token = auth.generateSessionToken();
    const session = await auth.createSession(token, newUserId);
    auth.setSessionTokenCookie({ cookies } as any, token, session.expiresAt);

    throw redirect(302, '/app/homepage');
  }
};
