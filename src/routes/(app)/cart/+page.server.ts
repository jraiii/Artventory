// src/routes/(app)/artventory/+page.server.ts
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const products = [
    {
      id: 1,
      name: "Acrylic Paint Set",
      price: 499,
      description: "12 vibrant colors perfect for canvas and wood surfaces.",
      image: "/images/acrylic.jpg",
    },
    {
      id: 2,
      name: "Sketchbook A4",
      price: 199,
      description: "Premium 100gsm sketch paper for dry media.",
      image: "/images/sketchbook.jpg",
    },
    {
      id: 3,
      name: "Brush Set",
      price: 299,
      description: "6 high-quality brushes for watercolor and acrylic.",
      image: "/images/brushes.jpg",
    },
    {
      id: 4,
      name: "Canvas Board 12x16",
      price: 249,
      description: "Pre-stretched canvas board ideal for acrylic painting.",
      image: "/images/canvas.jpg",
    },
    {
      id: 5,
      name: "Oil Pastel Set",
      price: 350,
      description: "24 rich and creamy oil pastels for blending and texture.",
      image: "/images/oilpastel.jpg",
    },
    {
      id: 6,
      name: "Watercolor Palette",
      price: 420,
      description: "36 colors of high-quality watercolor paint for blending.",
      image: "/images/watercolor.jpg",
    },
    {
      id: 7,
      name: "Colored Pencils Set",
      price: 320,
      description: "Vivid and blendable colored pencils for sketching and design.",
      image: "/images/coloredpencils.jpg",
    },
    {
      id: 8,
      name: "Art Easel Stand",
      price: 950,
      description: "Adjustable wooden easel perfect for tabletop painting.",
      image: "/images/easel.jpg",
    },
  ];

  return { products };
};
