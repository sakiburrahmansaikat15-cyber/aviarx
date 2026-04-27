// components/Navbar.tsx
"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/shop" },
    { name: "New Arrivals", href: "/shop?filter=new" },
    { name: "Sale", href: "/shop?filter=sale" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const textColor = isScrolled ? "#0a0a0a" : "#fafaf8";

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "72px", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", transition: "all 0.4s ease", background: isScrolled ? "rgba(250,250,248,0.95)" : "transparent", backdropFilter: isScrolled ? "blur(12px)" : "none", borderBottom: isScrolled ? "0.5px solid rgba(0,0,0,0.08)" : "none" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: "120px", height: "32px" }}>
            <Image 
              src="/lg.png" 
              alt="AVIAR Logo" 
              fill 
              style={{ 
                objectFit: "contain", 
                transition: "filter 0.4s ease",
                // If it's scrolled, we want it dark. Brightness(0) makes it black.
                // If not scrolled, we want it light. Brightness(0) invert(1) makes it white.
                filter: isScrolled ? "brightness(0)" : "brightness(0) invert(1)"
              }} 
            />
          </div>
          <div style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: isScrolled ? "#c9a96e" : "rgba(201,169,110,0.9)", transition: "color 0.4s", marginTop: "2px" }}>Premium Collection</div>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} style={{ textDecoration: "none", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: textColor, transition: "color 0.3s", fontFamily: "DM Sans, sans-serif" }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {/* Search */}
          <button aria-label="Search" onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: textColor, transition: "color 0.4s", padding: "4px", display: "flex", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Wishlist with badge */}
          <Link href="/wishlist" aria-label="Wishlist" style={{ color: textColor, transition: "color 0.4s", padding: "4px", display: "flex", alignItems: "center", position: "relative" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {mounted && wishlistCount > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-6px", background: "#c0392b", color: "white", fontSize: "9px", fontWeight: 600, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart with badge */}
          <button aria-label="Cart" onClick={() => router.push("/cart")} style={{ background: "none", border: "none", cursor: "pointer", color: textColor, transition: "color 0.4s", padding: "4px", position: "relative", display: "flex", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {mounted && cartCount > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-6px", background: "#c9a96e", color: "#0a0a0a", fontSize: "9px", fontWeight: 600, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
