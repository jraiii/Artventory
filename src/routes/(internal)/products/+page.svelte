<script lang="ts">
  import { addToCart } from '$lib/stores/cart';

  // Later, these will come from your +page.server.ts
  const products = [
    { id: 1, name: "Acrylic Paint Set", price: 499, image: "/images/acrylic.jpg" },
    { id: 2, name: "Brush Set", price: 299, image: "/images/brushes.jpg" },
    { id: 3, name: "Sketchbook A4", price: 199, image: "/images/sketchbook.jpg" },
  ];
</script>

<!-- 🧭 NAVIGATION BAR -->
<nav class="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-lg py-4 px-10 flex items-center justify-between z-50 border-b border-white/20">
  <h1 class="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 select-none">
    ARTVENTORY
  </h1>
  <div class="hidden md:flex gap-8 text-gray-800 font-medium">
    <a href="/" class="hover:text-black transition">Home</a>
    <a href="/products" class="hover:text-black transition">Shop</a>
    <a href="/cart" class="hover:text-black transition">Cart</a>
  </div>
</nav>

<!-- 🛍️ PRODUCT GRID -->
<main class="pt-28 min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex flex-col items-center justify-center p-10">
  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
    {#each products as product}
      <div class="bg-white/80 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1 backdrop-blur-sm">
        <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded-2xl" />
        <h2 class="text-lg font-bold mt-4">{product.name}</h2>
        <p class="text-sm text-gray-600 mt-1">₱{product.price}</p>
        <button
          class="mt-4 w-full bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-semibold py-2 rounded-full shadow hover:opacity-90 transition active:scale-95"
          on:click={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    {/each}
  </section>
</main>
