<script lang="ts">
  import { cart, addToCart, cartTotal } from '$lib/stores/cart';
  import type { CartItem } from '$lib/stores/cart';
  import { onMount } from 'svelte';

  export let data;
  let products = data?.products ?? [];
</script>

<!-- 🧭 NAVIGATION BAR -->
<nav
  class="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-md shadow-lg py-4 px-10 flex items-center justify-between z-50 border-b border-white/30"
>
  <h1
    class="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 select-none"
  >
    ARTVENTORY
  </h1>
  <div class="hidden md:flex gap-8 text-slate-100 font-medium">
    <a href="/" class="hover:text-white transition">Home</a>
    <a href="/products" class="hover:text-white transition">Shop</a>
    <a href="/cart" class="hover:text-white transition underline">Cart</a>
  </div>
</nav>

<!-- 🌈 FULL BACKGROUND PAGE -->
<div
  class="min-h-screen w-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 pt-28 px-10 pb-16 flex flex-col lg:flex-row items-start justify-center gap-10 text-slate-100"
>
  <!-- 🛍️ PRODUCT SECTION -->
  <section
    class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 flex-1 max-w-6xl"
  >
    {#each products as product}
      <div
        class="bg-white/10 border border-white/20 rounded-3xl shadow-xl p-6 hover:shadow-2xl hover:scale-[1.02] transition transform backdrop-blur-sm"
      >
        <img
          src={product.image}
          alt={product.name}
          class="w-full h-48 object-cover rounded-2xl border border-white/20"
        />
        <h2 class="text-lg font-bold mt-4 text-white">{product.name}</h2>
        <p class="text-sm text-slate-200 mt-2 line-clamp-2">
          {product.description}
        </p>
        <div class="flex justify-between items-center mt-4">
          <span class="font-bold text-lg text-pink-300">₱{product.price}</span>
          <button
            class="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition"
            on:click={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
              })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    {/each}
  </section>

  <!-- 🛒 CART SECTION -->
  <aside
    class="bg-white/10 border border-white/20 text-white rounded-3xl shadow-xl p-6 w-full lg:w-1/3 backdrop-blur-md"
  >
    <h2
      class="text-2xl font-extrabold mb-4 border-b border-white/30 pb-2 flex items-center gap-2"
    >
      🛒 My Cart
    </h2>

    {#if $cart.length === 0}
      <p class="text-slate-200 italic mt-6 text-center">
        Your cart is empty.
      </p>
    {:else}
      <table class="w-full text-sm text-left mt-4">
        <thead>
          <tr class="border-b border-white/30 text-slate-200">
            <th class="py-2">Product</th>
            <th class="py-2">Price</th>
            <th class="py-2">Qty</th>
            <th class="py-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {#each $cart as item (item.id)}
            <tr class="border-b border-white/20 hover:bg-white/10">
              <td class="py-2 font-medium">{item.name}</td>
              <td class="py-2">₱{item.price}</td>
              <td class="py-2 text-center">{item.qty}</td>
              <td class="py-2 text-right font-semibold">
                ₱{item.qty * item.price}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div class="flex justify-between mt-6 text-lg font-bold">
        <span>Total:</span>
        <span>₱{$cartTotal}</span>
      </div>

      <a
        href="/checkout"
        class="mt-6 block bg-gradient-to-r from-pink-600 to-indigo-600 text-white text-center font-semibold py-3 rounded-full shadow-md hover:opacity-90 transition"
      >
        Proceed to Checkout
      </a>
    {/if}
  </aside>
</div>
