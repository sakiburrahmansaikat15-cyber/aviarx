// components/Products.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import ProductCard, { Product } from "./ProductCard";
import { useCart } from "@/context/CartContext";

const SAMPLE_PRODUCTS: Product[] = [
  { id: "1", name: "Silk Wrap Blouse", price: 295, icon: "👚", category: "Clothing", badge: "new", slug: "silk-wrap-blouse" },
  { id: "2", name: "Cashmere Turtleneck", price: 450, icon: "🧥", category: "Clothing", slug: "cashmere-turtleneck" },
  { id: "3", name: "Leather Crossbody", price: 320, originalPrice: 400, icon: "👜", category: "Accessories", badge: "sale", slug: "leather-crossbody" },
  { id: "4", name: "Tailored Trousers", price: 250, icon: "👖", category: "Clothing", slug: "tailored-trousers" },
  { id: "5", name: "Gold Plated Cuff", price: 180, icon: "✨", category: "Accessories", slug: "gold-plated-cuff" },
  { id: "6", name: "Ceramic Vase", price: 120, icon: "🏺", category: "Home", badge: "new", slug: "ceramic-vase" },
  { id: "7", name: "Linen Lounge Set", price: 210, icon: "👘", category: "Clothing", slug: "linen-lounge-set" },
  { id: "8", name: "Woven Sun Hat", price: 95, originalPrice: 150, icon: "👒", category: "Accessories", badge: "sale", slug: "woven-sun-hat" },
];

const TABS = ["All", "Clothing", "Accessories", "Home"];

export default function Products() {
  const [activeTab, setActiveTab] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "" });
  const { addToCart, openCart } = useCart();

  const filteredProducts = activeTab === "All" ? SAMPLE_PRODUCTS : SAMPLE_PRODUCTS.filter((p) => p.category === activeTab);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.icon || "", category: product.category, size: "OS", color: "Default", qty: 1 });
    openCart();
    setToast({ show: true, message: `${product.name} added to cart` });
  }, [addToCart, openCart]);

  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(() => setToast({ show: false, message: "" }), 3000);
      return () => clearTimeout(t);
    }
  }, [toast.show]);

  return (
    <section style={{ background: "#f5f2ec", padding: "80px 48px", position: "relative", width: "100%" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ color: "#c9a96e", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "12px" }}>
            The Collection
          </div>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, fontSize: "clamp(32px,4vw,56px)", color: "#0a0a0a", lineHeight: 1.1 }}>
            Seasonal <em>Picks</em>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0", marginBottom: "48px", borderBottom: "0.5px solid rgba(0,0,0,0.1)" }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 24px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: activeTab === tab ? "#0a0a0a" : "#8a8680", borderBottom: activeTab === tab ? "1.5px solid #0a0a0a" : "1.5px solid transparent", marginBottom: "-1px", transition: "color 0.2s", fontFamily: "DM Sans, sans-serif" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      {/* Toast */}
      <div style={{ position: "fixed", bottom: "32px", left: "50%", transform: `translateX(-50%) translateY(${toast.show ? "0" : "20px"})`, background: "#0a0a0a", color: "#fafaf8", padding: "12px 24px", fontSize: "12px", letterSpacing: "0.05em", zIndex: 100, opacity: toast.show ? 1 : 0, transition: "all 0.3s ease", pointerEvents: "none", whiteSpace: "nowrap" }}>
        ✓ {toast.message}
      </div>
    </section>
  );
}