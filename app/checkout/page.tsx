"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      fontFamily: "DM Sans, sans-serif",
      color: "#0a0a0a",
      "::placeholder": { color: "#8a8680" },
      iconColor: "#c9a96e",
    },
    invalid: { color: "#c0392b", iconColor: "#c0392b" },
  },
};

type PaymentMethod = "card" | "cod";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    address: "", city: "", country: "", zip: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const shipping = cartTotal >= 150 ? 0 : 12;
  const total = cartTotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (paymentMethod === "cod") {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: { name: `${form.firstName} ${form.lastName}`, email: form.email, address: form.address, city: form.city, country: form.country, zip: form.zip },
            items: cart,
            total,
            paymentMethod: "Cash on Delivery",
            status: "pending",
          }),
        });
        clearCart();
        router.push("/order/confirmation");
        return;
      }

      // Stripe card payment
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const { clientSecret, error: serverError } = await res.json();
      if (serverError) { setError(serverError); setLoading(false); return; }

      if (!stripe || !elements) { setError("Stripe not loaded"); setLoading(false); return; }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) { setError("Card element not found"); setLoading(false); return; }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: `${form.firstName} ${form.lastName}`, email: form.email },
        },
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: { name: `${form.firstName} ${form.lastName}`, email: form.email, address: form.address, city: form.city, country: form.country, zip: form.zip },
            items: cart,
            total,
            paymentMethod: "Card",
            paymentIntentId: paymentIntent.id,
            status: "paid",
          }),
        });
        clearCart();
        router.push("/order/confirmation");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "80px", alignItems: "start" }}>

      {/* Left: Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "12px" }}>Secure Checkout</div>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 300, marginBottom: "48px" }}>
          Complete Your <em>Order</em>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Contact */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Contact Information</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required
                style={{ padding: "14px 16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "none", fontSize: "14px", outline: "none", fontFamily: "DM Sans, sans-serif" }} />
              <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required
                style={{ padding: "14px 16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "none", fontSize: "14px", outline: "none", fontFamily: "DM Sans, sans-serif" }} />
            </div>
            <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required
              style={{ width: "100%", padding: "14px 16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "none", fontSize: "14px", outline: "none", fontFamily: "DM Sans, sans-serif" }} />
          </div>

          {/* Shipping */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Shipping Address</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} required
                style={{ padding: "14px 16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "none", fontSize: "14px", outline: "none", fontFamily: "DM Sans, sans-serif" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} required
                  style={{ padding: "14px 16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "none", fontSize: "14px", outline: "none", fontFamily: "DM Sans, sans-serif" }} />
                <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required
                  style={{ padding: "14px 16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "none", fontSize: "14px", outline: "none", fontFamily: "DM Sans, sans-serif" }} />
                <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} required
                  style={{ padding: "14px 16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "none", fontSize: "14px", outline: "none", fontFamily: "DM Sans, sans-serif" }} />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Payment Method</div>

            {/* Method Tabs */}
            <div style={{ display: "flex", gap: "0", marginBottom: "24px", border: "0.5px solid rgba(0,0,0,0.15)" }}>
              {([["card", "💳 Credit / Debit Card"], ["cod", "🚚 Cash on Delivery"]] as [PaymentMethod, string][]).map(([key, label]) => (
                <button key={key} type="button" onClick={() => setPaymentMethod(key)}
                  style={{ flex: 1, padding: "14px", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", background: paymentMethod === key ? "#0a0a0a" : "none", color: paymentMethod === key ? "#fafaf8" : "#8a8680", border: "none", cursor: "pointer", transition: "all 0.2s", fontFamily: "DM Sans, sans-serif" }}>
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === "card" ? (
                <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: "16px", border: "0.5px solid rgba(0,0,0,0.15)", background: "#fafaf8" }}>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                  <p style={{ fontSize: "11px", color: "#8a8680", marginTop: "8px" }}>
                    🔒 Your card details are encrypted and processed securely by Stripe
                  </p>
                </motion.div>
              ) : (
                <motion.div key="cod" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                  style={{ padding: "20px", background: "#f5f2ec", border: "0.5px solid rgba(201,169,110,0.3)" }}>
                  <div style={{ fontSize: "13px", color: "#3a3835", lineHeight: 1.8 }}>
                    🚚 Pay in cash when your order is delivered.<br />
                    Our delivery agent will collect payment at your doorstep.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: "12px 16px", background: "#fff0f0", border: "0.5px solid #c0392b", color: "#c0392b", fontSize: "13px", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading || cart.length === 0}
            style={{ width: "100%", background: "#0a0a0a", color: "#fafaf8", border: "none", padding: "18px", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
            {loading ? "Processing..." : `Place Order — $${total.toFixed(2)}`}
          </button>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#8a8680", marginTop: "16px" }}>🔒 Secure 256-bit SSL encryption</p>
        </form>
      </motion.div>

      {/* Right: Order Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        style={{ background: "#f5f2ec", padding: "40px", position: "sticky", top: "96px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "24px" }}>Order Summary</div>
        {cart.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#8a8680" }}>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", paddingBottom: "16px", borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontFamily: "Cormorant Garamond, serif" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#8a8680", marginTop: "2px" }}>{item.size} · {item.color} · Qty {item.qty}</div>
                </div>
                <div style={{ fontSize: "14px", marginLeft: "16px", flexShrink: 0 }}>${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#8a8680", marginTop: "8px", marginBottom: "8px" }}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? "#c9a96e" : "#0a0a0a" }}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "20px", borderTop: "0.5px solid rgba(0,0,0,0.1)" }}>
              <span style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a8680" }}>Total</span>
              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px" }}>${total.toFixed(2)}</span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "72px", minHeight: "100vh", background: "#fafaf8" }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <Footer />
    </main>
  );
}
