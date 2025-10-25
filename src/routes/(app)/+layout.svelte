<script lang="ts">
  import { page } from '$app/stores';
  import { cart, type CartItem } from '$lib/stores/cart';
  import { derived } from 'svelte/store';
  import { goto } from '$app/navigation';

  // Explicitly type your cart store
  const totalItems = derived(cart, ($cart: CartItem[]) =>
     $cart.reduce((sum, item) => {
      const qty = (item as any).qty ?? (item as any).quantity ?? 0;
      return sum + qty;
     }, 0)
  );

  function goToCart() {
    goto('/cart');
  }

  function goToCheckout() {
    goto('/checkout');
  }
</script>


<!-- App Layout Wrapper -->
<div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
  <!-- Header -->
  <header class="sticky top-0 z-50 bg-white border-b shadow-sm">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <h1 class="text-2xl font-bold tracking-tight">
        <button
          type="button"
          class="cursor-pointer"
          on:click={() => goto('/')}
          aria-label="Go to home"
        >
          🎨 Artventory
        </button>
      </h1>

      <nav class="flex items-center gap-6">
        <a
          href="/"
          class="hover:text-indigo-600 transition-colors font-medium"
          class:font-semibold={$page.url.pathname === '/'}
        >
          Products
        </a>

        <a
          href="/cart"
          class="hover:text-indigo-600 transition-colors font-medium"
          class:font-semibold={$page.url.pathname === '/cart'}
        >
          Cart
        </a>

        <a
          href="/checkout"
          class="hover:text-indigo-600 transition-colors font-medium"
          class:font-semibold={$page.url.pathname === '/checkout'}
        >
          Checkout
        </a>

        <button
          on:click={goToCart}
          class="relative bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-500 transition-all"
        >
          🛒 Cart
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {#if $totalItems > 0}
              {$totalItems}
            {:else}
              0
            {/if}
          </span>
        </button>
      </nav>
    </div>
  </header>

  <!-- Main content area -->
  <main class="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="border-t bg-white text-center py-4 text-sm text-gray-600">
    © {new Date().getFullYear()} Artventory — Crafted with 🎨 using SvelteKit
  </footer>
</div>
