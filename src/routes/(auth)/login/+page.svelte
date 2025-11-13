<script lang="ts">
  import { enhance } from '$app/forms';
  let username = '';
  let password = '';
  let errorMessage = '';
  let loading = false;

  // ✅ Function for use:enhance
  function handleEnhance({ formElement }: { formElement: HTMLFormElement }) {
    loading = true;
    errorMessage = '';

    fetch(formElement.action, {
      method: formElement.method,
      body: new FormData(formElement)
    })
      .then(async (res) => {
        loading = false;

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          errorMessage = data.message || 'Login failed';
          return;
        }

        // Redirect based on server Location header
        const location = res.headers.get('location') || '/';
        window.location.href = location;
      })
      .catch(() => {
        loading = false;
        errorMessage = 'An unexpected error occurred.';
      });
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-6">
  <section class="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 mb-6 tracking-wide">
      ARTVENTORY
    </h1>
    <h2 class="text-xl text-white font-semibold mb-6">Welcome Back</h2>

    <form method="POST" use:enhance={handleEnhance} class="space-y-4 text-left">
      {#if errorMessage}
        <p class="text-red-400 text-sm">{errorMessage}</p>
      {/if}

      <input
        name="username"
        type="text"
        placeholder="Username"
        bind:value={username}
        required
        autocomplete="username"
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        bind:value={password}
        required
        autocomplete="current-password"
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold tracking-wide shadow-md hover:opacity-90 active:scale-95 transition"
      >
        {loading ? 'Logging In...' : 'Log In'}
      </button>
    </form>

    <p class="text-white/70 mt-6 text-center">
      Don’t have an account?
      <a href="/signup" class="text-pink-200 hover:underline">Sign up</a>
    </p>
  </section>
</div>
