// components/ProductCard.tsx
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  icon?: string;
  category: string;
  badge?: "new" | "sale";
  slug?: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard = React.memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
  const [isWishlist, setIsWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    setTilt(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTilt("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setIsHovered(false);
  };

  const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{ transform: tilt, transformStyle: "preserve-3d", transition: "transform 0.15s ease, box-shadow 0.3s ease", boxShadow: isHovered ? "0 16px 48px rgba(0,0,0,0.1)" : "none", background: "white" }}
      >
        {/* Image Area */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", background: "#f5f2ec", overflow: "hidden" }}>
          {product.image ? (
            <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)", transform: isHovered ? "scale(1.05)" : "scale(1)" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px", transition: "transform 0.6s ease", transform: isHovered ? "scale(1.05)" : "scale(1)" }}>
              {product.icon}
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 10, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", color: "white", background: product.badge === "sale" ? "#c0392b" : "#0a0a0a" }}>
              {product.badge}
            </div>
          )}

          {/* Hover Overlay with buttons */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease", zIndex: 20 }}>
            <Link href={`/product/${slug}`} style={{ textDecoration: "none", background: "white", color: "#0a0a0a", padding: "12px 32px", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8d5b0")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              See Details
            </Link>
            <button onClick={() => onAddToCart(product)}
              style={{ background: "#c9a96e", color: "#0a0a0a", border: "none", padding: "12px 32px", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8d5b0")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#c9a96e")}
            >
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "17px", fontWeight: 400, color: "#0a0a0a", marginBottom: "4px" }}>
              {product.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {product.originalPrice && (
                <span style={{ fontSize: "12px", color: "#8a8680", textDecoration: "line-through" }}>${product.originalPrice}</span>
              )}
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#0a0a0a" }}>${product.price}</span>
            </div>
          </div>
          <button onClick={() => setIsWishlist(!isWishlist)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: isWishlist ? "#c0392b" : "#8a8680", transition: "color 0.2s" }}>
            {isWishlist ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;