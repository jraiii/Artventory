<script lang="ts">
  import { goto } from '$app/navigation';
  import { user as userStore } from '$lib/stores/auth';
  let name = '';
  let email = '';
  let password = '';
  let adminCode = '';

  async function submit(e: Event) {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, email, password, adminCode })
    });
    if (res.ok) {
      const { user } = await res.json();
      userStore.set(user);
      if (user?.isAdmin) goto('/app/admin');
      else goto('/app/products');
    } else {
      alert('Signup failed — please check your inputs.');
    }
  }
</script>

<!-- Background Gradient -->
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-6">

  <!-- Glass Card -->
  <section class="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 mb-6 tracking-wide">
      ARTVENTORY
    </h1>
    <h2 class="text-xl text-white font-semibold mb-6">Create an Account</h2>

    <form on:submit|preventDefault={submit} class="space-y-4 text-left">
      <input
        placeholder="Full Name"
        bind:value={name}
        required
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        placeholder="Email"
        type="email"
        bind:value={email}
        required
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        placeholder="Password"
        type="password"
        bind:value={password}
        required
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        placeholder="Admin Code (optional)"
        bind:value={adminCode}
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        class="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold tracking-wide shadow-md hover:opacity-90 active:scale-95 transition"
      >
        Sign Up
      </button>
    </form>

    <p class="text-white/70 mt-6">
      Already have an account?
      <a href="/" class="text-pink-200 hover:underline">Log in</a>
    </p>
  </section>
</div>
