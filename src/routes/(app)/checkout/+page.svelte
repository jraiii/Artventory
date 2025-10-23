<script>
  let paymentMethod = 'credit';
</script>

<!-- 🧭 NAVIGATION BAR -->
<nav class="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-lg py-4 px-10 flex items-center justify-between z-50 border-b border-white/20">
  <h1 class="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 select-none">
    ARTVENTORY
  </h1>
  <div class="hidden md:flex gap-8 text-gray-800 font-medium">
    <a href="#" class="hover:text-black transition">Home</a>
    <a href="#" class="hover:text-black transition">Shop</a>
    <a href="#" class="hover:text-black transition">Cart</a>
  </div>
</nav>

<div class="checkout-page">
  <div class="container">
    <!-- Checkout Form -->
    <div class="checkout-section">
      <h2>🖌️ Checkout</h2>

      <div class="payment-methods">
        <button class:active={paymentMethod === 'credit'} on:click={() => paymentMethod = 'credit'}>💳 Credit</button>
        <button class:active={paymentMethod === 'paypal'} on:click={() => paymentMethod = 'paypal'}>🅿️ PayPal</button>
        <button class:active={paymentMethod === 'cash'} on:click={() => paymentMethod = 'cash'}>💵 Cash</button>
      </div>

      <form class="checkout-form">
        <div class="input-group">
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" />
        </div>

        <div class="input-group">
          <label>Cardholder Name</label>
          <input type="text" placeholder="Your Full Name" />
        </div>

        <div class="row">
          <div class="input-group">
            <label>Valid Through</label>
            <input type="text" placeholder="MM/YY" />
          </div>
          <div class="input-group">
            <label>CVV</label>
            <input type="text" placeholder="123" />
          </div>
        </div>

        <div class="input-group">
          <label>Delivery Address</label>
          <input type="text" placeholder="123 Street, City" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>

        <button class="confirm-btn">Confirm Order</button>
      </form>
    </div>

    <!-- Order Summary -->
    <div class="order-summary">
      <h2>🛒 Order Summary</h2>

      <div class="items">
        <div class="item">
          <img src="/images/acrylic.jpg" alt="Acrylic Paint Set" />
          <div>
            <p class="item-name">Acrylic Paint Set</p>
            <p class="item-qty">Qty: 1</p>
          </div>
          <span>₱599</span>
        </div>

        <div class="item">
          <img src="/images/canvas.jpg" alt="Canvas Board" />
          <div>
            <p class="item-name">Canvas Board</p>
            <p class="item-qty">Qty: 1</p>
          </div>
          <span>₱299</span>
        </div>

        <div class="item">
          <img src="/images/brushes.jpg" alt="Paint Brushes" />
          <div>
            <p class="item-name">Paint Brushes</p>
            <p class="item-qty">Qty: 1</p>
          </div>
          <span>₱249</span>
        </div>
      </div>

      <hr />

      <div class="totals">
        <p>Subtotal <span>₱1147</span></p>
        <p>VAT (15%) <span>₱172</span></p>
        <p>Shipping <span>FREE</span></p>
      </div>

      <h3>Total <span>₱1319</span></h3>
    </div>
  </div>
</div>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .checkout-page {
    background: linear-gradient(to bottom right, #ff6ec4, #7873f5);
    min-height: calc(100vh - 72px);
    display: flex;
    align-items: flex-start;  /* top align to give space from navbar */
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    padding: 120px 1rem 2rem 1rem; /* extra top padding to create space from navbar */
  }

  .container {
    display: flex;
    gap: 2rem;
    width: 750px;           /* slightly smaller */
    max-width: 95%;
    height: auto;           /* fits content */
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-radius: 2rem;
    padding: 1.8rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    flex-wrap: nowrap;
    align-items: stretch;
  }

  .checkout-section, .order-summary {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .checkout-section {
    flex: 2;
  }

  .order-summary {
    flex: 1;
    padding: 1.5rem;
    border-radius: 2rem;
    background: rgba(255,255,255,0.95);
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
  }

  h2 {
    font-size: 1.5rem;
    color: #ff2da8;
    text-shadow: 1px 1px 4px rgba(255,45,168,0.5);
    margin-bottom: 1rem;
  }

  .payment-methods {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .payment-methods button {
    flex: 1;
    padding: 0.6rem;
    border-radius: 15px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    background: rgba(0,0,0,0.05);
    transition: 0.2s;
  }

  .payment-methods button.active {
    background: #ff2da8;
    color: white;
    box-shadow: 0 0 10px rgba(255,45,168,0.5);
  }

  .checkout-form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }

  input {
    padding: 0.7rem;
    border-radius: 12px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }

  input:focus {
    outline: none;
    border-color: #ff2da8;
    box-shadow: 0 0 5px rgba(255,45,168,0.3);
  }

  .row {
    display: flex;
    gap: 0.5rem;
  }

  .confirm-btn {
    padding: 0.8rem;
    border-radius: 15px;
    border: none;
    font-weight: 700;
    background: #ffcc00;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }

  .confirm-btn:hover {
    background: #ffaa00;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .item img {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    object-fit: cover;
    border: 1px solid #ddd;
  }

  .item-name {
    font-weight: 600;
  }

  .item-qty {
    font-size: 0.85rem;
    color: #555;
  }

  .totals p {
    display: flex;
    justify-content: space-between;
    margin: 0.3rem 0;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 1.1rem;
    color: #ff2da8;
    margin-top: 0.5rem;
  }

  hr {
    border-top: 1px solid #ddd;
    margin: 0.5rem 0;
  }

  @media (max-width: 900px) {
    .container {
      flex-direction: column;
      align-items: center;
      width: 95%;
    }
  }
</style>
