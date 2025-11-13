// src/lib/server/auth.ts
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import type { SessionUser } from '$lib/types/auth';

export function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function createSession(token: string, userId: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day
  await db.insert(table.session).values({ token, userId, expiresAt });
  return { token, userId, expiresAt };
}

export function setSessionTokenCookie(cookies: any, token: string, expiresAt: Date) {
  cookies.set('session_token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt
  });
}

export async function getSession(token: string) {
  const [session] = await db
    .select()
    .from(table.session)
    .where(eq(table.session.token, token));

  if (!session) return null;
  return { userId: session.userId, expiresAt: session.expiresAt };
}
