<script lang="ts">
  export let data;
  import { goto } from '$app/navigation';

  function viewProduct(id: number) {
    goto(`/product/${id}`);
  }
</script>

<h1 class="text-3xl font-bold mb-6">🎨 Artventory Inventory List</h1>

<table class="min-w-full border-collapse border border-gray-300">
  <thead class="bg-gray-100">
    <tr>
      <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
      <th class="border border-gray-300 px-4 py-2 text-left">Product Name</th>
      <th class="border border-gray-300 px-4 py-2 text-left">Description</th>
      <th class="border border-gray-300 px-4 py-2 text-left">Price</th>
    </tr>
  </thead>
  <tbody>
    {#each data.products as product}
      <tr
        class="hover:bg-gray-50 cursor-pointer transition"
        on:click={() => viewProduct(product.id)}
      >
        <td class="border border-gray-300 px-4 py-2">{product.id}</td>
        <td class="border border-gray-300 px-4 py-2 font-semibold">{product.name}</td>
        <td class="border border-gray-300 px-4 py-2 text-sm text-gray-600">{product.description}</td>
        <td class="border border-gray-300 px-4 py-2 font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </td>
      </tr>
    {/each}
  </tbody>
</table>


