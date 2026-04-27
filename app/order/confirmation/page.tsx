"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

function generateOrderNumber() {
  if (typeof window === "undefined") return "";
  return "AV" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(generateOrderNumber);

  return (
    <PageTransition>
      <main>
        <Navbar />
        <div style={{ paddingTop: "72px", minHeight: "100vh", background: "#fafaf8", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ textAlign: "center", padding: "80px 48px", maxWidth: "600px" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
              style={{ width: "72px", height: "72px", border: "1px solid #c9a96e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: "28px", color: "#c9a96e" }}
            >
              ✓
            </motion.div>

            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "16px" }}>
              Order Confirmed
            </div>

            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, lineHeight: 1.1, marginBottom: "24px", color: "#0a0a0a" }}>
              Thank you for<br /><em>your order</em>
            </h1>

            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#8a8680", marginBottom: "12px" }}>
              Your order has been placed and is being prepared with care.
            </p>

            <div style={{ marginBottom: "48px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "8px" }}>Order Number</div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", letterSpacing: "0.1em", color: "#0a0a0a" }}>{orderNumber}</div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/shop" style={{ textDecoration: "none" }}>
                <button style={{ background: "#0a0a0a", color: "#fafaf8", border: "none", padding: "14px 40px", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                  Continue Shopping
                </button>
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <button style={{ background: "none", color: "#0a0a0a", border: "0.5px solid rgba(0,0,0,0.3)", padding: "14px 40px", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                  Back to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  );
}
