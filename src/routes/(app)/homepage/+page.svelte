<script lang="ts">
  import { addToCart } from '$lib/stores/cart';
  export let data: {
    products: {
      id: string;
      name: string;
      price: number;
      image?: string;
      category?: string;
      description?: string;
    }[];
    shops: {
      id: string;
      name: string;
      address: string;
      image?: string;
    }[];
  };

  // Use optional chaining in case data is undefined
  let products = data?.products ?? [];
  let shops = data?.shops ?? [];

  // Sort by newest first and take 3 latest products
  $: latestProducts = products.slice(-3).reverse();
</script>

<div class="flex min-h-screen w-full">
  <!-- Sidebar -->
  <aside class="w-64 bg-gradient-to-b from-purple-700 via-pink-600 to-indigo-600 text-white flex flex-col shadow-lg fixed h-screen">
    <div class="text-2xl font-bold p-6 text-center tracking-wide">ARTVENTORY</div>
    <nav class="flex-1 px-4 space-y-2">
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition" on:click={() => window.location.href='/homepage'}>
        Home
      </button>
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition" on:click={() => window.location.href='/cart'}>
        Cart
      </button>
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition" on:click={() => window.location.href='/checkout'}>
        Checkout
      </button>
      <button class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition" on:click={() => window.location.href='/logout'}>
        Logout
      </button>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 ml-64 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-8 min-h-screen overflow-y-auto">
    <!-- Welcome Section -->
    <section class="mb-10">
      <h1 class="text-4xl font-extrabold text-white mb-2">Welcome to Artventory! 🎨</h1>
      <p class="text-white/80 text-lg">Discover the latest art supplies and local art shops in Balanga, Bataan.</p>
    </section>

    <!-- Latest Products -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-white mb-6">✨ Latest Products</h2>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {#each latestProducts as product (product.id)}
          <div class="bg-white/10 border border-white/20 rounded-3xl shadow-xl p-6 hover:shadow-2xl hover:scale-[1.02] transition transform backdrop-blur-sm flex flex-col">
            {#if product.image}
              <img src={product.image} alt={product.name} class="w-full h-48 object-cover rounded-2xl border border-white/20" />
            {/if}
            <h3 class="text-lg font-bold mt-4 text-white">{product.name}</h3>
            <p class="text-sm text-slate-200 mt-2 line-clamp-2">{product.description}</p>
            <div class="flex justify-between items-center mt-4">
              <span class="font-bold text-lg text-pink-300">₱{product.price}</span>
              <button
                class="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition"
                on:click={() => addToCart({
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

        {#if latestProducts.length === 0}
          <p class="mt-6 text-white text-center col-span-full">No products available.</p>
        {/if}
      </div>
    </section>

    <!-- Art Shops Section -->
    <section>
      <h2 class="text-2xl font-bold text-white mb-6">🏬 Art Shops in Balanga, Bataan</h2>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {#each shops as shop (shop.id)}
          <div class="bg-white/10 border border-white/20 rounded-3xl shadow-xl p-6 hover:shadow-2xl hover:scale-[1.02] transition transform backdrop-blur-sm flex flex-col">
            {#if shop.image}
              <img src={shop.image} alt={shop.name} class="w-full h-48 object-cover rounded-2xl border border-white/20" />
            {/if}
            <h3 class="text-lg font-bold mt-4 text-white">{shop.name}</h3>
            <p class="text-sm text-slate-200 mt-2">{shop.address}</p>
            <a
              class="mt-4 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition text-center"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Map
            </a>
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>
