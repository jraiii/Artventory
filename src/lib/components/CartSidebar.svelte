<script lang="ts">
  import { cart, cartTotal, showCart } from '$lib/stores/cart';
  // local helper to close
  const close = () => showCart.set(false);
</script>

<aside class="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-semibold">Your cart</h2>
    <button aria-label="Close cart" on:click={close} class="px-2 py-1">✕</button>
  </div>

  {#if $cart.length === 0}
    <div class="text-sm text-slate-500">Your cart is empty.</div>
  {:else}
    <ul class="space-y-3 overflow-auto max-h-[60vh] mb-4">
      {#each $cart as item}
        <li class="flex items-center justify-between">
          <div>
            <div class="font-medium">{item.name}</div>
            <div class="text-sm text-slate-500">Qty: {item.qty}</div>
          </div>
          <div class="text-sm">₱{item.price * item.qty}</div>
        </li>
      {/each}
    </ul>

    <div class="border-t pt-3 flex items-center justify-between">
      <div class="font-semibold">Total</div>
      <div class="font-semibold">₱{$cartTotal}</div>
    </div>

    <div class="mt-4">
      <a href="/checkout" class="block w-full text-center px-4 py-2 bg-slate-800 text-white rounded">Checkout</a>
    </div>
  {/if}
</aside>