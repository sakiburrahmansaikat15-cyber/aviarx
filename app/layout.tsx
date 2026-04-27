// app/layout.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CartProvider } from "@/context/CartContext";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";
import "./globals.css";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export const metadata: Metadata = {
  title: "AVIAR — Premium Collection",
  description: "Luxury clothing and lifestyle brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        <CartProvider>
          {children}
          <CartSidebarWrapper />
        </CartProvider>
      </body>
    </html>
  );
}