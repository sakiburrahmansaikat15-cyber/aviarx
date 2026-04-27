// components/Footer.tsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  const colTitleStyle: React.CSSProperties = {
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9a96e",
    marginBottom: "24px",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    display: "block",
    marginBottom: "12px",
  };

  return (
    <footer style={{ background: "#0a0a0a", padding: "80px 48px 40px", width: "100%", borderTop: "0.5px solid rgba(201,169,110,0.15)" }}>
      <style>{`
        .footer-link:hover { color: white !important; }
      `}</style>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "48px" }}>

          {/* Column 1 */}
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", letterSpacing: "0.15em", color: "#fafaf8", marginBottom: "16px" }}>AVIAR</div>
            </Link>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "200px" }}>
              Timeless design, exceptional craft. Luxury that respects the planet.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <div style={colTitleStyle}>Shop</div>
            <Link href="/shop?filter=new" className="footer-link" style={linkStyle}>New Arrivals</Link>
            <Link href="/shop?filter=clothing" className="footer-link" style={linkStyle}>Clothing</Link>
            <Link href="/shop?filter=accessories" className="footer-link" style={linkStyle}>Accessories</Link>
            <Link href="/shop?filter=home" className="footer-link" style={linkStyle}>Home Goods</Link>
            <Link href="/shop?filter=sale" className="footer-link" style={linkStyle}>Sale</Link>
          </div>

          {/* Column 3 */}
          <div>
            <div style={colTitleStyle}>Company</div>
            <Link href="/about" className="footer-link" style={linkStyle}>About</Link>
            <Link href="#" className="footer-link" style={linkStyle}>Sustainability</Link>
            <Link href="#" className="footer-link" style={linkStyle}>Careers</Link>
            <Link href="#" className="footer-link" style={linkStyle}>Press</Link>
          </div>

          {/* Column 4 */}
          <div>
            <div style={colTitleStyle}>Help</div>
            <Link href="#" className="footer-link" style={linkStyle}>Shipping & Returns</Link>
            <Link href="#" className="footer-link" style={linkStyle}>Size Guide</Link>
            <Link href="#" className="footer-link" style={linkStyle}>FAQ</Link>
            <Link href="#" className="footer-link" style={linkStyle}>Contact</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "0.5px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>© 2025 AVIAR. All rights reserved.</span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Crafted with precision by Samrise Digital</span>
        </div>
      </div>
    </footer>
  );
}