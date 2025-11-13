<script lang="ts">
  import { enhance } from '$app/forms';

  let fullname = '';
  let username = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';
  let loading = false;

  // The new `enhance` syntax works directly in the template.
  // No need for onMount or bind:this={form}.
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-6">
  <section class="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 mb-6 tracking-wide">
      ARTVENTORY
    </h1>
    <h2 class="text-xl text-white font-semibold mb-6">Create Your Account</h2>

    <form
      method="POST"
      use:enhance={({ formElement }) => {
        loading = true;
        errorMessage = '';

        // Prevent submission if passwords don't match
        const pwd = (formElement.querySelector('input[name="password"]') as HTMLInputElement).value;
        const confirm = (formElement.querySelector('input[name="confirmPassword"]') as HTMLInputElement).value;
        if (pwd !== confirm) {
          loading = false;
          errorMessage = 'Passwords do not match';
          return;
        }

        // Submit the form manually
        fetch(formElement.action, {
          method: formElement.method,
          body: new FormData(formElement)
        })
          .then(async (res) => {
            loading = false;
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              errorMessage = data.message || 'Signup failed';
              return;
            }

            // ✅ Success
            errorMessage = '';
            window.location.href = '/login'; // redirect to login page
          })
          .catch(() => {
            loading = false;
            errorMessage = 'An unexpected error occurred.';
          });
      }}
      class="space-y-4 text-left"
    >
      {#if errorMessage}
        <p class="text-red-400 text-sm">{errorMessage}</p>
      {/if}

      <input
        name="fullname"
        type="text"
        placeholder="Full Name"
        bind:value={fullname}
        required
        autocomplete="name"
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

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
        autocomplete="new-password"
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        bind:value={confirmPassword}
        required
        autocomplete="new-password"
        class="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {#if password !== confirmPassword && confirmPassword.length > 0}
        <p class="text-red-400 text-sm">Passwords do not match</p>
      {/if}

      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold tracking-wide shadow-md hover:opacity-90 active:scale-95 transition"
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>

    <p class="text-white/70 mt-6 text-center">
      Already have an account?
      <a href="/login" class="text-pink-200 hover:underline">Log in</a>
    </p>
  </section>
</div>
