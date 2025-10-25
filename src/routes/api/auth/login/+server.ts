// src/routes/api/auth/login/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

// In production, validate password against DB and hash check.
export const POST: RequestHandler = async (event) => {
  const { email } = await event.request.json();

  // TODO: Replace with DB lookup
  // For now: pretend any login is valid and create a user
  const user = {
    id: 'user-' + Date.now(),
    name: email.split('@')[0],
    email,
    isAdmin: email.endsWith('@admin.local') // example quick rule
  };

  event.cookies.set('session', JSON.stringify(user), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax'
  });

  return new Response(JSON.stringify({ user }), { status: 200 });
};
