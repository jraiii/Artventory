<script lang="ts">
  import { enhance } from '$app/forms';
  let username = '';
  let password = '';
  let errorMessage = '';
  let loading = false;
  let showPassword = false; // ✅ toggle state

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
  <!-- ✨ Solid white container with hover lift -->
  <section
    class="bg-white rounded-3xl p-8 w-full max-w-md text-center shadow-lg transform transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
    style="box-shadow: 0 6px 18px rgba(0,0,0,0.15);"
  >
    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 mb-6 tracking-wide">
      ARTVENTORY
    </h1>
    <h2 class="text-xl text-gray-700 font-semibold mb-6">Welcome Back</h2>

    <form method="POST" use:enhance={handleEnhance} class="space-y-4 text-left">
      {#if errorMessage}
        <p class="text-red-500 text-sm">{errorMessage}</p>
      {/if}

      <input
        name="username"
        type="text"
        placeholder="Username"
        bind:value={username}
        required
        autocomplete="username"
        class="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <!-- ✅ Password input with show/hide toggle -->
      <div class="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          bind:value={password}
          required
          autocomplete="current-password"
          class="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="button"
          on:click={() => (showPassword = !showPassword)}
          class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-purple-500 focus:outline-none"
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold tracking-wide shadow-md hover:opacity-90 active:scale-95 transition flex items-center justify-center"
      >
        {loading ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  </section>
</div>
