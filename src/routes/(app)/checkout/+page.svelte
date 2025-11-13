<!-- src/routes/(app)/checkout/+page.svelte -->
<script lang="ts">
  import { cart, removeFromCart, clearCart, updateQuantity, cartTotal } from '$lib/stores/cart';
  import { goto } from '$app/navigation';

  let paymentMethod: 'credit' | 'paypal' | 'cash' = 'credit';

  // Confirm checkout
  function confirmCheckout() {
    if ($cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Optional: Save order to database here

    clearCart();
    goto('/confirmation');
  }
</script>

<div class="flex min-h-screen w-full">
  <!-- Sidebar -->
  <aside class="w-64 bg-gradient-to-b from-purple-700 via-pink-600 to-indigo-600 text-white flex flex-col shadow-lg fixed h-screen">
    <div class="text-2xl font-bold p-6 text-center tracking-wide">ARTVENTORY</div>
    <nav class="flex-1 px-4 space-y-2">
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition" on:click={() => goto('/homepage')}>
        Home
      </button>
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition">
        Cart
      </button>
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition">
        Checkout
      </button>
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition" on:click={() => goto('/logout')}>
        Logout
      </button>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 ml-64 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-8 min-h-screen overflow-y-auto">
    <div class="flex flex-col lg:flex-row gap-10">
      <!-- Checkout Form -->
      <section class="flex-2 bg-white/20 backdrop-blur-md rounded-3xl shadow-xl p-6 flex flex-col gap-4">
        <h2 class="text-2xl font-extrabold text-white mb-4">🖌️ Checkout</h2>

        <!-- Payment Methods -->
        <div class="flex gap-3 mb-4">
          <button
            class="flex-1 py-2 rounded-lg font-semibold transition
            {paymentMethod === 'credit' ? 'bg-pink-500 text-white' : 'bg-white/20 text-white'}"
            on:click={() => paymentMethod = 'credit'}
          >
            💳 Credit
          </button>
          <button
            class="flex-1 py-2 rounded-lg font-semibold transition
            {paymentMethod === 'paypal' ? 'bg-pink-500 text-white' : 'bg-white/20 text-white'}"
            on:click={() => paymentMethod = 'paypal'}
          >
            🅿️ PayPal
          </button>
          <button
            class="flex-1 py-2 rounded-lg font-semibold transition
            {paymentMethod === 'cash' ? 'bg-pink-500 text-white' : 'bg-white/20 text-white'}"
            on:click={() => paymentMethod = 'cash'}
          >
            💵 Cash
          </button>
        </div>

        <!-- Checkout Form Fields -->
        <form class="flex flex-col gap-3">
          {#if paymentMethod === 'credit'}
            <input type="text" placeholder="Card Number" class="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <input type="text" placeholder="Cardholder Name" class="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
            <div class="flex gap-2">
              <input type="text" placeholder="MM/YY" class="p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-pink-400" />
              <input type="text" placeholder="CVV" class="p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
          {/if}

          <input type="text" placeholder="Delivery Address" class="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />

          <button
            type="button"
            on:click={confirmCheckout}
            class="mt-3 bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-2 rounded-full font-semibold hover:opacity-90 active:scale-95 transition"
          >
            Confirm Order
          </button>
        </form>
      </section>

      <!-- Order Summary -->
      <aside class="flex-1 bg-white/20 backdrop-blur-md rounded-3xl shadow-xl p-6 flex flex-col gap-4">
        <h2 class="text-2xl font-extrabold text-white mb-4">🛒 Order Summary</h2>

        {#if $cart.length === 0}
          <p class="text-white/70 italic text-center">Your cart is empty.</p>
        {:else}
          <div class="flex flex-col gap-3">
            {#each $cart as item (item.id)}
              <div class="flex items-center justify-between gap-3 bg-white/10 rounded-lg p-2">
                <img src={item.image} alt={item.name} class="w-12 h-12 object-cover rounded-lg" />
                <div class="flex-1 flex flex-col">
                  <span class="font-semibold text-white">{item.name}</span>
                  <span class="text-white/70 text-sm">Qty: {item.qty}</span>
                </div>
                <span class="font-bold text-pink-300">₱{item.price * item.qty}</span>
              </div>
            {/each}

            <hr class="border-white/30 my-2" />

            <div class="flex justify-between font-bold text-white">
              <span>Total:</span>
              <span>₱{$cartTotal}</span>
            </div>
          </div>
        {/if}
      </aside>
    </div>
  </main>
</div>
