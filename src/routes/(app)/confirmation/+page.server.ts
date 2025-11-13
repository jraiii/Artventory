// src/routes/(app)/confirmation/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SessionUser } from '$lib/types/auth';

export const load: PageServerLoad = async ({ locals }) => {
  // Redirect unauthenticated users to login
  if (!locals.user) throw redirect(302, '/homepage');

  // Optional: you could pass user info if needed
  return {
    user: locals.user as SessionUser
  };
};
