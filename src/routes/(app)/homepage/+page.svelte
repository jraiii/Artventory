<!-- src/routes/home/+page.svelte -->
<script>
  export let products;
  export let categories;
</script>

<h1>Product List</h1>

<div>
  <select>
    <option value="">All Categories</option>
    {#each categories as category}
      <option>{category.name}</option>
    {/each}
  </select>
</div>

<div class="products">
  {#each products as product}
    <div class="product">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button>Add to Cart</button>
    </div>
  {/each}
</div>
