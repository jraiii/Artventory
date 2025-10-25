<script lang="ts" context="module">
  export type AdminStats = {
    totalSales: number;
    totalOrders: number;
    totalUsers?: number;
    lastUpdated?: string;
  };
</script>

<script lang="ts">
  export let data: { stats: AdminStats; user: any };
</script>

<!-- 🌈 Gradient Background + Glassmorphism Layout -->
<div class="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-10 text-slate-800">
  <!-- 🧭 Navigation Bar -->
  <nav class="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md border-b border-white/20 shadow-lg py-4 px-10 flex items-center justify-between rounded-b-2xl z-50">
    <h1 class="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 select-none">
      ARTVENTORY ADMIN
    </h1>
    <div class="flex gap-4">
      <button
        on:click={() => (window.location.href = '/products')}
        class="bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl font-semibold hover:bg-white/60 transition text-slate-700"
      >
        🛍 View Shop
      </button>
      <button
        on:click={() => (window.location.href = '/login')}
        class="bg-black text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-800 active:scale-95 transition"
      >
        Logout
      </button>
    </div>
  </nav>

  <!-- 🧩 Content Wrapper -->
  <main class="pt-28 space-y-10">
    <!-- 👋 Welcome Section -->
    <header class="text-center text-white">
      <h2 class="text-4xl font-extrabold mb-2 drop-shadow-lg">Welcome, {data.user?.name || 'Admin'}!</h2>
      <p class="text-sm opacity-90">Here’s an overview of your store performance and tools to manage products.</p>
    </header>

    <!-- 📊 Stats Overview -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="bg-white/30 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
        <h3 class="text-sm font-medium text-slate-100">Total Sales</h3>
        <div class="text-3xl font-bold text-white mt-2 drop-shadow">₱{data.stats.totalSales.toLocaleString()}</div>
      </div>
      <div class="bg-white/30 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
        <h3 class="text-sm font-medium text-slate-100">Total Orders</h3>
        <div class="text-3xl font-bold text-white mt-2 drop-shadow">{data.stats.totalOrders}</div>
      </div>
      <div class="bg-white/30 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
        <h3 class="text-sm font-medium text-slate-100">Total Users</h3>
        <div class="text-3xl font-bold text-white mt-2 drop-shadow">{data.stats.totalUsers ?? '—'}</div>
      </div>
      <div class="bg-white/30 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
        <h3 class="text-sm font-medium text-slate-100">Last Updated</h3>
        <div class="text-sm text-white mt-2 opacity-90">
          {data.stats.lastUpdated ? new Date(data.stats.lastUpdated).toLocaleString() : '—'}
        </div>
      </div>
    </section>

    <!-- 🛠 Manage Products Section -->
    <section class="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-lg text-white">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold">Manage Products</h3>
        <button
          on:click={() => (window.location.href = '/admin/products/new')}
          class="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition font-semibold active:scale-95"
        >
          + Add Product
        </button>
      </div>

      <p class="text-sm opacity-90 mb-6">
        Manage your inventory, update listings, and track performance — all in one place.
      </p>

      <!-- 📦 Placeholder Area -->
      <div class="bg-white/30 rounded-2xl p-8 text-center text-slate-700 backdrop-blur-md">
        No products yet. Start by creating one.
      </div>
    </section>
  </main>
</div>
