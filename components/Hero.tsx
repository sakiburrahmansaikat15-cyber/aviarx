// components/Hero.tsx
"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

type BgProduct = { icon: string; name: string; price: number };

const BG_PRODUCTS: BgProduct[] = [
  { icon: "👚", name: "Silk Wrap Blouse", price: 295 },
  { icon: "🧥", name: "Cashmere Turtleneck", price: 450 },
  { icon: "👜", name: "Leather Crossbody", price: 320 },
  { icon: "👖", name: "Tailored Trousers", price: 250 },
  { icon: "👒", name: "Woven Sun Hat", price: 95 },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentProduct, setCurrentProduct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % BG_PRODUCTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} style={{ height: "150vh", position: "relative", width: "100%" }}>
      <div style={{ height: "100vh", position: "sticky", top: 0, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #0a0a0a 0%, #1c1a17 50%, #2a2520 100%)" }}>

        {/* Background Product Slideshow */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.06, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ fontSize: "clamp(200px, 35vw, 420px)", lineHeight: 1, userSelect: "none", position: "absolute" }}
            >
              {BG_PRODUCTS[currentProduct].icon}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product indicator dots */}
        <div style={{ position: "absolute", bottom: "80px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
          {BG_PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentProduct(i)}
              style={{ width: i === currentProduct ? "24px" : "6px", height: "6px", borderRadius: "3px", background: i === currentProduct ? "#c9a96e" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }}
            />
          ))}
        </div>

        {/* Decorative Circles */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          <div style={{ width: "560px", height: "560px", borderRadius: "50%", border: "0.5px solid rgba(201,169,110,0.15)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "rotateCW 30s linear infinite" }} />
          <div style={{ width: "380px", height: "380px", borderRadius: "50%", border: "0.5px solid rgba(201,169,110,0.1)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "rotateCCW 20s linear infinite" }} />
        </div>

        {/* Main Content */}
        <motion.div style={{ opacity, y, position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px", width: "100%" }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ color: "#c9a96e", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px" }}
          >
            New Collection 2025
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300, color: "#fafaf8", lineHeight: 1, marginBottom: "20px", fontSize: "clamp(52px,8vw,100px)" }}
          >
            Wear the
            <br />
            <em style={{ color: "#e8d5b0" }}>Difference</em>
          </motion.h1>

          {/* Current product name */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}
            >
              {BG_PRODUCTS[currentProduct].name} — ${BG_PRODUCTS[currentProduct].price}
            </motion.div>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.5)", marginBottom: "40px", maxWidth: "400px" }}
          >
            Premium clothing crafted for those who demand excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{ display: "flex", gap: "16px", alignItems: "center" }}
          >
            <Link href="/shop" style={{ background: "#c9a96e", color: "#0a0a0a", padding: "14px 40px", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
              Shop Collection
            </Link>
            <Link href="/about" style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)", padding: "14px 40px", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 10 }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #c9a96e, transparent)" }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes rotateCW { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes rotateCCW { to { transform: translate(-50%, -50%) rotate(-360deg); } }
      `}</style>
    </section>
  );
}