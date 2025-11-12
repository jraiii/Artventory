import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const sessionCookieName = 'auth-session';

// ---------------------- TOKEN GENERATION ----------------------

export function generateSessionToken(): string {
	const bytes = globalThis.crypto.getRandomValues(new Uint8Array(18));
	return encodeBase64url(bytes);
}

// ---------------------- SESSION MANAGEMENT ----------------------

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

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	// Renew session 15 days before expiration
	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, { path: '/' });
}

// ---------------------- USER MANAGEMENT ----------------------

export async function createUser({
	fullname,
	email,
	password,
	role = 'cashier'
}: {
	fullname: string;
	email: string;
	password: string;
	role?: 'admin' | 'cashier' | 'manager' | 'owner';
}) {
	const [existingUser] = await db.select().from(table.user).where(eq(table.user.email, email));
	if (existingUser) throw new Error('Email already registered');

	// Hash password (for production, use bcrypt)
	const hashedPassword = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));

	const newUser = {
		id: crypto.randomUUID(),
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

	const hashedPassword = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
	if (user.hashedPassword !== hashedPassword) return null;

	return user;
}
