// src/routes/+page.server.ts

export async function load() {
  const products = [
    { id: 1, name: 'Paint Brush', description: 'Fine bristle brush for acrylic and oil paints', price: 3.99 },
    { id: 2, name: 'Canvas', description: '12x16 inch primed canvas', price: 7.49 },
    { id: 3, name: 'Watercolor', description: '24-color watercolor set', price: 12.99 },
    { id: 4, name: 'Pencil', description: 'Graphite sketching pencil set', price: 5.25 }
  ];

  return { products };
}
