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
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  }

  // Calculate subtotal for each item
  function getSubtotal(item: CartItem) {
    return item.price * item.quantity;
  }

  // Calculate total cart value
  function getTotal() {
    return cart.reduce((sum, item) => sum + getSubtotal(item), 0);
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white flex flex-col lg:flex-row items-start justify-center gap-10 p-10">
  <!-- Product Section -->
  <section class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl flex-1">
    {#each products as product}
      <div class="bg-white/10 rounded-2xl shadow-lg p-4 hover:bg-white/20 transition backdrop-blur-md">
        <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded-xl" />
        <h2 class="text-xl font-semibold mt-4">{product.name}</h2>
        <p class="text-sm text-pink-100 mt-2">{product.description}</p>
        <div class="flex justify-between items-center mt-4">
          <span class="font-bold text-lg">₱{product.price}</span>
          <button
            class="bg-white text-purple-700 font-semibold px-4 py-2 rounded-full hover:bg-pink-100 transition"
            on:click={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    {/each}
  </section>

  <!-- Cart Section -->
  <aside class="bg-white/10 rounded-2xl shadow-lg p-6 backdrop-blur-md w-full lg:w-1/3">
    <h2 class="text-2xl font-bold mb-4">🛒 My Cart</h2>

    {#if cart.length === 0}
      <p class="text-pink-100">Your cart is empty.</p>
    {:else}
      <table class="w-full text-sm text-left">
        <thead>
          <tr class="border-b border-white/20">
            <th class="py-2">Product</th>
            <th class="py-2">Price</th>
            <th class="py-2">Qty</th>
            <th class="py-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {#each cart as item}
            <tr class="border-b border-white/10">
              <td class="py-2">{item.name}</td>
              <td class="py-2">₱{item.price}</td>
              <td class="py-2 text-center">{item.quantity}</td>
              <td class="py-2 text-right">₱{getSubtotal(item)}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div class="flex justify-between mt-4 text-lg font-semibold">
        <span>Total:</span>
        <span>₱{getTotal()}</span>
      </div>
    {/if}
  </aside>
</div>
