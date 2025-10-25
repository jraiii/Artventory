// src/routes/api/auth/logout/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
  event.cookies.delete('session', { path: '/' });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
