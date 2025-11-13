<!-- src/routes/(app)/cart/+page.svelte -->
<script lang="ts">
  import { cart, addToCart, cartTotal } from '$lib/stores/cart';
  export let data;
  let products = data?.products ?? [];
</script>

<div class="flex min-h-screen w-full">
  <!-- Sidebar -->
  <aside class="w-64 bg-gradient-to-b from-purple-700 via-pink-600 to-indigo-600 text-white flex flex-col shadow-lg fixed h-screen">
    <div class="text-2xl font-bold p-6 text-center tracking-wide">ARTVENTORY</div>
    <nav class="flex-1 px-4 space-y-2">
      <button
        class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition"
        on:click={() => window.location.href='/homepage'}
      >
        Home
      </button>
      <button
        class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition"
      >
        Cart
      </button>
      <button
        class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition"
        on:click={() => window.location.href='/checkout'}
      >
        Checkout
      </button>
      <button
        class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition"
        on:click={() => window.location.href='/logout'}
      >
        Logout
      </button>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 ml-64 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-8 min-h-screen overflow-y-auto">
    <div class="flex flex-col lg:flex-row gap-10">
      <!-- Products List -->
      <section class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 flex-1">
        {#each products as product}
          <div class="bg-white/10 border border-white/20 rounded-3xl shadow-xl p-6 hover:shadow-2xl hover:scale-[1.02] transition transform backdrop-blur-sm">
            <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded-2xl border border-white/20" />
            <h2 class="text-lg font-bold mt-4 text-white">{product.name}</h2>
            <p class="text-sm text-slate-200 mt-2 line-clamp-2">{product.description}</p>
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
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        {/each}
      </section>

      <!-- Cart Summary -->
      <aside class="bg-white/10 border border-white/20 text-white rounded-3xl shadow-xl p-6 w-full lg:w-1/3 backdrop-blur-md flex-shrink-0">
        <h2 class="text-2xl font-extrabold mb-4 border-b border-white/30 pb-2 flex items-center gap-2">🛒 My Cart</h2>

        {#if $cart.length === 0}
          <p class="text-slate-200 italic mt-6 text-center">Your cart is empty.</p>
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
                  <td class="py-2 text-right font-semibold">₱{item.qty * item.price}</td>
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
  </main>
</div>
