// src/lib/server/auth.ts (demo version)
import type { Cookies } from '@sveltejs/kit';

export const sessionCookieName = 'demo-session';

// Generate token (just a random string)
export function generateSessionToken(): string {
  return Math.random().toString(36).slice(2);
}

// Create session (no DB, just return fake object)
export async function createSession(token: string, userId: string) {
  return {
    id: token,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
  };
}

// Validate session token (always trust cookie for demo)
export async function validateSessionToken(token: string) {
  return { session: { id: token, expiresAt: new Date() }, user: null };
}

// For hooks
export async function getSession(token: string) {
  if (!token) return null;
  return { userId: token, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
}

// Cookie helpers
export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date) {
  cookies.set(sessionCookieName, token, {
    expires: expiresAt,
    path: '/',
    httpOnly: false, // demo only
    secure: false,   // demo only
    sameSite: 'lax'
  });
}

export function deleteSessionTokenCookie(cookies: Cookies) {
  cookies.delete(sessionCookieName, { path: '/' });
}
