import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const paymentMethod = data.get("paymentMethod")?.toString() || "";
    const cardNumber = data.get("cardNumber")?.toString() || "";
    const cardName = data.get("cardName")?.toString() || "";
    const expiry = data.get("expiry")?.toString() || "";
    const cvv = data.get("cvv")?.toString() || "";
    const address = data.get("address")?.toString() || "123 Art Street, Balanga City";
    const email = data.get("email")?.toString() || "customer@artventory.com";

    // --- Validation ---
    if (!paymentMethod) {
      return fail(400, { error: "Please select a payment method." });
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiry || !cvv) {
        return fail(400, { error: "Please fill out all card details." });
      }
    }

    console.log("🎨 Order placed successfully:", {
      paymentMethod,
      cardName,
      cardNumber: cardNumber.replace(/\d(?=\d{4})/g, "*"),
      expiry,
      address,
      email
    });

    throw redirect(303, "/thank-you");
  }
};
