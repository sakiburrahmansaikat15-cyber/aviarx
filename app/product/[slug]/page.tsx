// app/product/[slug]/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main>
      <Navbar />
      <div style={{ height: "72px", background: "#0a0a0a" }} />
      <ProductDetail slug={slug} />
      <Footer />
    </main>
  );
}