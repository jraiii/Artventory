import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const load = async ({ cookies }) => {
  // Clear the session cookie
  cookies.delete(auth.sessionCookieName, { path: '/' });

  // Optional: clear server-side session if you store it
  // await auth.deleteSession(token);

  // Redirect to login page
  throw redirect(302, '/login'); // Must match your login route
};
