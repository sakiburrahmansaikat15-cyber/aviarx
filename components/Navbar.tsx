// components/Navbar.tsx
"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "@/components/SearchModal";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/shop" },
  { name: "New Arrivals", href: "/shop?filter=new" },
  { name: "Sale", href: "/shop?filter=sale" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const textColor = isScrolled ? "#0a0a0a" : "#fafaf8";
  const bgStyle = isScrolled
    ? { background: "rgba(250,250,248,0.95)", backdropFilter: "blur(12px)", borderBottom: "0.5px solid rgba(0,0,0,0.08)" }
    : { background: "transparent" };

  return (
    <>
      <nav
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "64px", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.4s ease", padding: "0 24px", ...bgStyle }}
        className="md:px-12"
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: "96px", height: "28px" }} className="md:w-[120px] md:h-[32px]">
            <Image
              src="/lg.png"
              alt="AVIAR Logo"
              fill
              style={{ objectFit: "contain", transition: "filter 0.4s ease", filter: isScrolled ? "brightness(0)" : "brightness(0) invert(1)" }}
            />
          </div>
          <div style={{ fontSize: "7px", letterSpacing: "0.3em", textTransform: "uppercase", color: isScrolled ? "#c9a96e" : "rgba(201,169,110,0.9)", transition: "color 0.4s", marginTop: "2px" }}>
            Premium Collection
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex" style={{ gap: "28px", alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{ textDecoration: "none", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: textColor, transition: "color 0.3s", fontFamily: "DM Sans, sans-serif" }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {/* Search */}
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ background: "none", border: "none", cursor: "pointer", color: textColor, transition: "color 0.4s" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Wishlist — hidden on mobile */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden md:flex min-w-[44px] min-h-[44px] items-center justify-center relative"
            style={{ color: textColor, transition: "color 0.4s" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {mounted && wishlistCount > 0 && (
              <span style={{ position: "absolute", top: "2px", right: "2px", background: "#c0392b", color: "white", fontSize: "9px", fontWeight: 600, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            aria-label="Cart"
            onClick={() => router.push("/cart")}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center relative"
            style={{ background: "none", border: "none", cursor: "pointer", color: textColor, transition: "color 0.4s" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {mounted && cartCount > 0 && (
              <span style={{ position: "absolute", top: "2px", right: "2px", background: "#c9a96e", color: "#0a0a0a", fontSize: "9px", fontWeight: 600, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
            className="flex md:hidden min-w-[44px] min-h-[44px] items-center justify-center"
            style={{ background: "none", border: "none", cursor: "pointer", color: textColor }}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(4px)",
                zIndex: 200,
              }}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 280 }}
              style={{
                position: "fixed",
                top: 0, right: 0,
                height: "100%",
                width: "280px",
                background: "#0d0d0d",
                zIndex: 210,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
              }}
            >
              {/* Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "28px 28px 24px",
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
              }}>
                <div>
                  <div style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "26px",
                    letterSpacing: "0.18em",
                    color: "#fafaf8",
                    lineHeight: 1,
                  }}>
                    AVIAR
                  </div>
                  <div style={{
                    fontSize: "8px",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                    marginTop: "5px",
                  }}>
                    Premium Collection
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    flexShrink: 0,
                  }}
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Nav Links */}
              <nav style={{ flex: 1, padding: "20px 0", overflowY: "auto" }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "16px 28px",
                        fontSize: "12px",
                        fontFamily: "DM Sans, sans-serif",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.65)",
                        textDecoration: "none",
                        borderBottom: "0.5px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <div style={{
                padding: "24px 28px",
                borderTop: "0.5px solid rgba(255,255,255,0.06)",
              }}>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "11px",
                    fontFamily: "DM Sans, sans-serif",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    marginBottom: "20px",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  Wishlist {mounted && wishlistCount > 0 && `(${wishlistCount})`}
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "11px",
                    fontFamily: "DM Sans, sans-serif",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    marginBottom: "28px",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Cart {mounted && cartCount > 0 && `(${cartCount})`}
                </Link>

                <div style={{
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.15)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}>
                  © 2026 AVIAR PREMIUM
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
