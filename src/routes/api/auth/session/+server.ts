// src/routes/api/auth/session/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
  const sessionCookie = event.cookies.get('session'); // session is a JSON string
  if (!sessionCookie) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
  try {
    const user = JSON.parse(sessionCookie);
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
};
