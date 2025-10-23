<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }

  interface CartItem extends Product {
    quantity: number;
  }

  let products: Product[] = data.products;
  let cart: CartItem[] = [];

  // Add to cart function
  function addToCart(product: Product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
      cart = [...cart];
    } else {
      cart = [...cart, { ...product, quantity: 1 }];
    }
  }

  // Subtotal & total
  const getSubtotal = (item: CartItem) => item.price * item.quantity;
  const getTotal = () => cart.reduce((sum, item) => sum + getSubtotal(item), 0);
</script>

<!-- 🧭 NAVIGATION BAR -->
<nav class="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-lg py-4 px-10 flex items-center justify-between z-50 border-b border-white/20">
  <h1 class="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 select-none">
    ARTVENTORY
  </h1>
  <div class="hidden md:flex gap-8 text-gray-800 font-medium">
    <a href="#" class="hover:text-black transition">Home</a>
    <a href="#" class="hover:text-black transition">Shop</a>
    <a href="#" class="hover:text-black transition">Cart</a>
  </div>
</nav>

<!-- 🏬 MAIN PAGE LAYOUT -->
<div class="pt-28 min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex flex-col lg:flex-row items-start justify-center gap-10 p-10">
  
  <!-- 🛍️ PRODUCT SECTION -->
  <section class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl flex-1 text-black">
    {#each products as product}
      <div class="bg-white/80 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1 backdrop-blur-sm">
        <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded-2xl" />
        <h2 class="text-lg font-bold mt-4">{product.name}</h2>
        <p class="text-sm text-gray-600 mt-2">{product.description}</p>
        <div class="flex justify-between items-center mt-4">
          <span class="font-bold text-lg">₱{product.price}</span>
          <button
            class="bg-black text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-800 active:scale-95 transition"
            on:click={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    {/each}
  </section>

  <!-- 🛒 CART SECTION -->
  <aside class="bg-white/80 text-black rounded-3xl shadow-xl p-6 w-full lg:w-1/3 backdrop-blur-sm">
    <h2 class="text-2xl font-extrabold mb-4 border-b pb-2 border-gray-200">🛒 My Cart</h2>
    {#if cart.length === 0}
      <p class="text-gray-600 italic mt-6">Your cart is empty.</p>
    {:else}
      <table class="w-full text-sm text-left mt-4">
        <thead>
          <tr class="border-b border-gray-300 text-gray-600">
            <th class="py-2">Product</th>
            <th class="py-2">Price</th>
            <th class="py-2">Qty</th>
            <th class="py-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {#each cart as item}
            <tr class="border-b border-gray-200 hover:bg-gray-50">
              <td class="py-2 font-medium">{item.name}</td>
              <td class="py-2">₱{item.price}</td>
              <td class="py-2 text-center">{item.quantity}</td>
              <td class="py-2 text-right font-semibold">₱{getSubtotal(item)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div class="flex justify-between mt-6 text-lg font-bold">
        <span>Total:</span>
        <span>₱{getTotal()}</span>
      </div>
    {/if}
  </aside>
</div>
