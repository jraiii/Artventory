<script lang="ts">
  export let data;
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8">
  <div class="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-white p-6 rounded-2xl shadow-lg mb-10">
    <h1 class="text-3xl font-extrabold tracking-wide">🛒 Artventory — Product List</h1>
    <p class="italic text-sm opacity-80 mt-2">Select products to add to your cart</p>
  </div>

  <div class="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border border-gray-200">
    <table class="w-full text-left border-collapse">
      <thead class="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 text-white uppercase text-sm tracking-wider">
        <tr>
          <th class="py-3 px-5">Product</th>
          <th class="py-3 px-5">Description</th>
          <th class="py-3 px-5">Price</th>
          <th class="py-3 px-5 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {#each data.products as product (product.id)}
          <tr class="hover:bg-pink-50 transition-all border-b border-gray-200">
            <td class="py-4 px-5 font-semibold text-gray-900">{product.name}</td>
            <td class="py-4 px-5 text-gray-600">{product.description}</td>
            <td class="py-4 px-5 font-bold text-purple-600">${product.price.toFixed(2)}</td>
            <td class="py-4 px-5 text-center">
              <form method="POST" action="?/addToCart">
                <input type="hidden" name="productId" value={product.id} />
                <button
                  type="submit"
                  class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow hover:scale-105 transition-all"
                >
                  Add to Cart
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
