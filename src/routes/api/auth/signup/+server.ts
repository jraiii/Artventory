// src/routes/api/auth/signup/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export const POST: RequestHandler = async (event) => {
  const payload = await event.request.json();
  const { name, email, adminCode } = payload;

  // IMPORTANT: Replace this with DB logic + hashing in production.
  // Small admin detection: if adminCode === 'SECRET_ADMIN_CODE' mark admin.
  const isAdmin = adminCode === 'SECRET_ADMIN_CODE';

  const user = {
    id: randomUUID(),
    name,
    email,
    isAdmin
  };

  // Save to DB here. For demo we set the session cookie:
  event.cookies.set('session', JSON.stringify(user), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    // secure: true in prod over HTTPS
  });

  return new Response(JSON.stringify({ user }), { status: 201 });
};
