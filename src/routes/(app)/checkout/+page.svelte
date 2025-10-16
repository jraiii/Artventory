<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { enhance } from "$app/forms";

  export let form: { error?: string } | null = null;
  let paymentMethod = "card";

  const orderSummary = {
    items: [
      { name: "Acrylic Paint Set", price: 599, quantity: 1, image: "/images/acrylic.jpg" },
      { name: "Canvas Board", price: 299, quantity: 1, image: "/images/canvas.jpg" },
      { name: "Paint Brushes", price: 249, quantity: 1, image: "/images/brushes.jpg" }
    ],
    subtotal: 1147,
    vat: 172.05,
    shipping: "FREE",
    total: 1319.05
  };

  const address = {
    street: "123 Art Street, Balanga City, Bataan",
    email: "customer@artventory.com"
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center p-6 text-white">
  <div class="w-full max-w-6xl grid md:grid-cols-3 gap-8">
    
    <!-- Payment Form -->
    <div class="md:col-span-2 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20">
      <h2 class="text-3xl font-bold mb-8 tracking-tight">🖌️ Checkout — Artventory</h2>

      <!-- Payment Options -->
      <div class="flex gap-4 mb-8">
        {#each [
          { id: 'card', icon: '💳', label: 'Credit Card' },
          { id: 'paypal', icon: '🅿️', label: 'PayPal' },
          { id: 'cash', icon: '💵', label: 'Cash' }
        ] as option}
          <button
            type="button"
            on:click={() => (paymentMethod = option.id)}
            class="flex-1 border-2 rounded-xl py-3 flex flex-col items-center justify-center transition-all"
            class:bg-pink-600={paymentMethod === option.id}
            class:border-yellow-400={paymentMethod === option.id}
          >
            {option.icon}
            <span class="mt-1 font-semibold">{option.label}</span>
          </button>
        {/each}
      </div>

      <!-- Payment Form -->
      <form method="POST" use:enhance class="space-y-5">
        <input type="hidden" name="paymentMethod" value={paymentMethod} />

        {#if paymentMethod === 'card'}
          <div>
            <Label for="cardNumber">Card Number</Label>
            <Input id="cardNumber" name="cardNumber" type="text" placeholder="4035 3005 3980 4083" class="bg-white/10 text-white placeholder-gray-400" />
          </div>

          <div>
            <Label for="cardName">Cardholder Name</Label>
            <Input id="cardName" name="cardName" type="text" placeholder="Sam Daniel M. Roxas" class="bg-white/10 text-white placeholder-gray-400" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="expiry">Valid Through</Label>
              <Input id="expiry" name="expiry" type="text" placeholder="12/25" class="bg-white/10 text-white placeholder-gray-400" />
            </div>
            <div>
              <Label for="cvv">CVV</Label>
              <Input id="cvv" name="cvv" type="password" placeholder="313" class="bg-white/10 text-white placeholder-gray-400" />
            </div>
          </div>
        {/if}

        <div>
          <Label for="address">Delivery Address</Label>
          <Input id="address" name="address" type="text" placeholder={address.street} class="bg-white/10 text-white placeholder-gray-400" />
        </div>

        <div>
          <Label for="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder={address.email} class="bg-white/10 text-white placeholder-gray-400" />
        </div>

        {#if form?.error}
          <p class="text-red-400 text-sm">{form.error}</p>
        {/if}

        <Button type="submit" class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 text-lg rounded-xl font-bold transition">
          Confirm Order
        </Button>
      </form>
    </div>

    <!-- Order Summary -->
    <div class="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 space-y-6 border border-white/20">
      <h3 class="text-xl font-semibold mb-4">🛒 Order Summary</h3>

      <div class="space-y-4">
        {#each orderSummary.items as item}
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <img src={item.image} alt={item.name} class="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p class="font-medium">{item.name}</p>
                <p class="text-xs text-gray-300">Qty: {item.quantity}</p>
              </div>
            </div>
            <p>₱{item.price.toFixed(2)}</p>
          </div>
        {/each}
      </div>

      <div class="border-t border-gray-500 mt-4 pt-4 text-sm text-gray-300">
        <div class="flex justify-between"><span>Subtotal</span><span>₱{orderSummary.subtotal.toFixed(2)}</span></div>
        <div class="flex justify-between"><span>VAT (15%)</span><span>₱{orderSummary.vat.toFixed(2)}</span></div>
        <div class="flex justify-between"><span>Shipping</span><span>{orderSummary.shipping}</span></div>
      </div>

      <div class="flex justify-between items-center text-xl font-bold mt-3">
        <span>Total</span>
        <span>₱{orderSummary.total.toFixed(2)}</span>
      </div>
    </div>
  </div>
</div>
