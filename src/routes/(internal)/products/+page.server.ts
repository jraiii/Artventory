// src/routes/+page.server.ts
import type { Actions } from './$types';

export async function load() {
  // Mock database data
  const products = [
    { id: 1, name: 'Paint Brush', description: 'Fine bristle brush for acrylic and oil paints', price: 3.99 },
    { id: 2, name: 'Canvas', description: '12x16 inch primed canvas', price: 7.49 },
    { id: 3, name: 'Watercolor', description: '24-color watercolor set', price: 12.99 },
    { id: 4, name: 'Pencil', description: 'Graphite sketching pencil set', price: 5.25 },
    { id: 5, name: 'Palette', description: 'Plastic mixing palette with 10 wells', price: 4.99 },
    { id: 6, name: 'Easel', description: 'Adjustable wooden easel for studio and outdoor use', price: 19.99 },
    { id: 7, name: 'Sketchbook', description: 'A4 premium sketch pad with 100 sheets', price: 8.75 },
    { id: 8, name: 'Acrylic Paint Set', description: '12 vibrant acrylic colors for professional artists', price: 14.95 }
  ];

  return { products };
}

// Handle Add to Cart button action
export const actions: Actions = {
  addToCart: async ({ request }) => {
    const formData = await request.formData();
    const productId = formData.get('productId');
    console.log(`✅ Added product ${productId} to cart`);

    // Normally, you’d update session/cart here.
    return { success: true, addedId: productId };
  }
};
