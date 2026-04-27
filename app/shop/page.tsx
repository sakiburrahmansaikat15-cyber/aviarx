// app/shop/page.tsx
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function ShopPage() {
  return (
    <PageTransition>
      <main>
        <Navbar />
        <div style={{ height: "72px", background: "#0a0a0a" }} />
        <Products />
        <Footer />
      </main>
    </PageTransition>
  );
}