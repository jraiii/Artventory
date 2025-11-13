// src/lib/server/auth.ts
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import bcrypt from 'bcrypt';
import type { Cookies } from '@sveltejs/kit';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const sessionCookieName = 'auth-session';

// Generate token
export function generateSessionToken(): string {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(18));
  return encodeBase64url(bytes);
}

// Create session
export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
  };
  await db.insert(table.session).values(session);
  return session;
}

// Validate session token
export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const [result] = await db
    .select({
      user: {
        id: table.user.id,
        fullname: table.user.fullname,
        email: table.user.email,
        role: table.user.role
      },
      session: table.session
    })
    .from(table.session)
    .innerJoin(table.user, eq(table.session.userId, table.user.id))
    .where(eq(table.session.id, sessionId));

  if (!result) return { session: null, user: null };

  const { session, user } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(table.session).where(eq(table.session.id, session.id));
    return { session: null, user: null };
  }

  // Renew session if near expiry
  if (Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15) {
    session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
    await db.update(table.session).set({ expiresAt: session.expiresAt }).where(eq(table.session.id, session.id));
  }

  return { session, user };
}

// ✅ New helper for hooks
export async function getSession(token: string) {
  const result = await validateSessionToken(token);
  if (!result || !result.user) return null;

  return { userId: result.user.id, expiresAt: result.session?.expiresAt };
}

// Cookie helpers
export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date) {
  cookies.set(sessionCookieName, token, {
    expires: expiresAt,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });
}

export function deleteSessionTokenCookie(cookies: Cookies) {
  cookies.delete(sessionCookieName, { path: '/' });
}

// User management
export async function createUser({ fullname, email, password, role = 'cashier' }: {
  fullname: string;
  email: string;
  password: string;
  role?: 'admin' | 'cashier' | 'manager' | 'owner';
}) {
  const [existingUser] = await db.select().from(table.user).where(eq(table.user.email, email));
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const username = email.split('@')[0];

  const newUser = {
    id: crypto.randomUUID(),
    username,
    fullname,
    email,
    hashedPassword,
    role,
    active: true
  };

  await db.insert(table.user).values(newUser);
  return newUser;
}

export async function authenticateUser(email: string, password: string) {
  const [user] = await db.select().from(table.user).where(eq(table.user.email, email));
  if (!user) return null;

  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword) return null;

  return user;
}
