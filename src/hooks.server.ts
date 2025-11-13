// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import type { SessionUser } from '$lib/types/auth';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// 🔹 Mock data for products
(globalThis as any).fetchProducts = async () => [
  {
    id: 'p1',
    name: 'Acrylic Paint Set',
    price: 599,
    image: '/images/acrylic.jpg',
    category: 'Paints',
    description: 'A vibrant set of acrylic paints for all skill levels.'
  },
  {
    id: 'p2',
    name: 'Canvas Board',
    price: 299,
    image: '/images/canvas.jpg',
    category: 'Canvas',
    description: 'Premium canvas board, perfect for painting projects.'
  },
  {
    id: 'p3',
    name: 'Paint Brushes',
    price: 249,
    image: '/images/brushes.jpg',
    category: 'Tools',
    description: 'High-quality paint brushes for acrylic and oil painting.'
  },
  {
    id: 'p4',
    name: 'Watercolor Set',
    price: 499,
    image: '/images/watercolor.jpg',
    category: 'Paints',
    description: 'Portable watercolor set for beginners and pros.'
  }
];

// 🔹 Mock data for categories
(globalThis as any).fetchCategories = async () => [
  { name: 'Paints' },
  { name: 'Canvas' },
  { name: 'Tools' }
];

// 🔹 Mock data for art shops in Balanga, Bataan
(globalThis as any).fetchShops = async () => [
  {
    id: 's1',
    name: 'Vetafs Art Supplies',
    address: 'Bonifacio St, Poblacion, Balanga City, Bataan',
    image: '/images/shop1.jpg'
  },
  {
    id: 's2',
    name: 'Pandayan Bookshop & Art Supplies',
    address: 'Mabini St corner P. Gomez, Balanga City, Bataan',
    image: '/images/shop2.jpg'
  },
  {
    id: 's3',
    name: 'SM Bataan National Bookstore',
    address: 'SM City Bataan, Jose Abad Santos Ave, Balanga City, Bataan',
    image: '/images/shop3.jpg'
  }
];

// 🔹 Main handle function for authentication
export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get(auth.sessionCookieName);

  if (token) {
    const session = await auth.getSession(token);
    if (session && new Date(session.expiresAt) > new Date()) {
      const [user] = await db.select().from(table.user).where(eq(table.user.id, session.userId));
      if (user) {
        event.locals.user = {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role as SessionUser['role']
        };
      }
    }
  }

  return resolve(event);
};
