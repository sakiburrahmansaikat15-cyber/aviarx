"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PageTransition from "@/components/PageTransition";

const SAMPLE_WISHLIST = [
  { id: "1", name: "Silk Wrap Blouse", price: 295, category: "Clothing", slug: "silk-wrap-blouse", icon: "👚" },
  { id: "2", name: "Cashmere Turtleneck", price: 450, category: "Clothing", slug: "cashmere-turtleneck", icon: "🧥" },
  { id: "3", name: "Leather Crossbody", price: 320, category: "Accessories", slug: "leather-crossbody", icon: "👜" },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(SAMPLE_WISHLIST);
  const { addToCart } = useCart();

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: typeof SAMPLE_WISHLIST[0]) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.icon, category: item.category, size: "OS", color: "Default", qty: 1 });
    removeFromWishlist(item.id);
  };

  return (
    <PageTransition>
      <main>
        <Navbar />
        <div style={{ height: "72px", background: "#0a0a0a" }} />

        <section style={{ background: "#fafaf8", minHeight: "80vh", padding: "80px 48px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "48px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "12px" }}>Your</div>
              <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px,4vw,64px)", fontWeight: 300, color: "#0a0a0a" }}>
                Wishlist <em>({wishlist.length})</em>
              </h1>
            </div>

            {wishlist.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "24px" }}>♡</div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", fontWeight: 300, marginBottom: "16px" }}>Your wishlist is empty</div>
                <p style={{ fontSize: "14px", color: "#8a8680", marginBottom: "32px" }}>Save items you love and come back to them later.</p>
                <Link href="/shop" style={{ textDecoration: "none", background: "#0a0a0a", color: "#fafaf8", padding: "14px 40px", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block" }}>
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {wishlist.map((item) => (
                  <div key={item.id} style={{ background: "white", position: "relative" }}>
                    <button onClick={() => removeFromWishlist(item.id)}
                      style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#8a8680", zIndex: 10 }}>
                      ✕
                    </button>
                    <Link href={`/product/${item.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ aspectRatio: "3/4", background: "#f5f2ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>
                        {item.icon}
                      </div>
                    </Link>
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "17px", color: "#0a0a0a", marginBottom: "4px" }}>{item.name}</div>
                      <div style={{ fontSize: "13px", color: "#0a0a0a", marginBottom: "16px" }}>${item.price}</div>
                      <button onClick={() => handleAddToCart(item)}
                        style={{ width: "100%", background: "#0a0a0a", color: "#fafaf8", border: "none", padding: "12px", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
