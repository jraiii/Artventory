<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let countdown = 10; // 10-second countdown

  // Countdown logic
  onMount(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        countdown -= 1;
      } else {
        clearInterval(timer);
        goto('/homepage');
      }
    }, 1000);
  });

  function goHome() {
    goto('/homepage');
  }
</script>

<div class="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-8">
  <!-- Confirmation Container -->
  <div class="bg-white rounded-xl shadow-md p-10 max-w-lg w-full text-center transition transform hover:-translate-y-1 hover:shadow-lg">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-4">🎉 Thank You for Your Order!</h1>
    <p class="text-gray-700 mb-6 text-lg">
      Your order has been successfully placed.
    </p>
    <p class="text-gray-600 mb-6">
      Returning to homepage in <span class="font-bold">{countdown}</span> second{countdown > 1 ? 's' : ''}...
    </p>
    <button
      class="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:-translate-y-1 hover:shadow-lg transition transform"
      on:click={goHome}
    >
      Go to Homepage Now
    </button>
  </div>
</div>
