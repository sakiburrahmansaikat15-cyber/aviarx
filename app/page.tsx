// app/page.tsx
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import BrandStory from "@/components/BrandStory";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const ExitPopup = dynamic(() => import("@/components/ExitPopup"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <BrandStory />
      <Reviews />
      <Newsletter />
      <Footer />
      <ExitPopup />
    </main>
  );
}