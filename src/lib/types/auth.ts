// src/lib/types/auth.ts

/**
 * Roles available in the system.
 * Extend or restrict as needed.
 */
export type UserRole = 'admin' | 'cashier' | 'user' | 'manager' | 'owner';

/**
 * Represents a user stored in the database.
 */
export interface User {
  id: string;              // UUID or numeric ID
  username: string;        // unique username
  hashedPassword: string;  // bcrypt hashed password
  role: UserRole;          // role assigned to the user
  createdAt?: Date;        // optional timestamp
  updatedAt?: Date;        // optional timestamp
}

/**
 * Minimal user object stored in session (locals.user).
 * This is what you check in +layout.server.ts.
 */
export interface SessionUser {
  id: string;
  username: string;
  role: UserRole;
}

/**
 * Represents a session record in the database.
 */
export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}
