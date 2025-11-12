import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type { SessionUser } from '$lib/types/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(auth.sessionCookieName);

  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  try {
    const { session, user } = await auth.validateSessionToken(sessionToken);

    if (!session || !user || (session.expiresAt && new Date(session.expiresAt) < new Date())) {
      auth.deleteSessionTokenCookie(event);
      event.locals.user = null;
      event.locals.session = null;
      return resolve(event);
    }

    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    event.locals.user = user as SessionUser;
    event.locals.session = session;
  } catch (err) {
    console.error('Session validation error:', err);
    event.locals.user = null;
    event.locals.session = null;
    try {
      auth.deleteSessionTokenCookie(event);
    } catch {
      // ignore
    }
  }

  return resolve(event);
};
