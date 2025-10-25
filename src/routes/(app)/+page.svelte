<script lang="ts">
  import { cart, removeFromCart, clearCart, updateQuantity } from '$lib/stores/cart';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  // 🧾 Compute total from cart store
  $: total = $cart.reduce((sum, item) => sum + item.price * (item.qty ?? item.quantity ?? 0), 0);

  // 🛒 Confirm checkout
  function confirmCheckout() {
    if ($cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // (Optional) You can add logic here to store order info in DB

    clearCart();
    goto('/confirmation');
  }
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
    <a href="/checkout" class="hover:text-black transition text-black font-bold">Checkout</a>
  </div>
</nav>

<!-- 💳 CHECKOUT PAGE -->
<main class="pt-28 min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex flex-col items-center p-8">
  <div class="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Checkout Summary</h2>

    {#if $cart.length > 0}
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-300 text-left text-gray-600 uppercase text-sm">
            <th class="py-2">Item</th>
            <th class="py-2 text-center">Quantity</th>
            <th class="py-2 text-center">Price</th>
            <th class="py-2 text-right">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each $cart as item (item.id)}
            <tr class="border-b border-gray-200 hover:bg-white/60 transition">
              <td class="py-3 flex items-center gap-4">
                <img src={item.image} alt={item.name} class="w-12 h-12 object-cover rounded-lg" />
                <span class="font-semibold">{item.name}</span>
              </td>
              <td class="py-3 text-center">
                <input
                  type="number"
                  min="1"
                  bind:value={item.qty}
                  class="w-16 border border-gray-300 rounded text-center"
                  on:change={() => updateQuantity(item.id, item.qty)}
                />
              </td>
              <td class="py-3 text-center">₱{item.price}</td>
              <td class="py-3 text-right font-medium">₱{item.price * (item.qty ?? item.quantity ?? 0)}</td>
              <td class="py-3 text-right">
                <button
                  class="text-red-600 hover:text-red-800 font-bold"
                  on:click={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div class="flex justify-between items-center mt-6">
        <button
          class="text-sm text-gray-700 hover:text-gray-900 underline"
          on:click={clearCart}
        >
          Clear Cart
        </button>

        <div class="text-right">
          <p class="text-lg font-semibold">Subtotal: ₱{total}</p>
          <button
            class="mt-3 bg-gradient-to-r from-pink-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition active:scale-95"
            on:click={confirmCheckout}
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    {:else}
      <p class="text-center text-gray-700 mt-8">Your cart is empty.</p>
    {/if}
  </div>
</main>
