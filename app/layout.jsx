import { Spline_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

// Import Komponen Global
import Navbar from "../components/Navbar";       // <--- 1. Import Navbar
import CartDrawer from "../components/CartDrawer";
import FloatingCart from "../components/FloatingCart";
import Footer from "../components/Footer";
import PageLoadingBar from "../components/PageLoadingBar";
import { sharedMetadata } from "./shared-metadata";
import { getLocalBusinessSchema } from "../lib/seo";
const spline = Spline_Sans({ 
  subsets: ["latin"],
  variable: '--font-spline',
  display: 'swap',
});

export const metadata = { ...sharedMetadata };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${spline.variable} light`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-text-main antialiased selection:bg-primary selection:text-white">
        {/* Loading Bar */}
        <Suspense fallback={null}>
          <PageLoadingBar />
        </Suspense>

        {/* 2. Pasang Navbar Paling Atas */}
        <Navbar />

        {/* Halaman yang sedang dibuka akan dirender di sini */}
        {children}
        
        {/* Komponen Cart Global */}
        <CartDrawer />
        <FloatingCart />

        <Footer />
        
      </body>
    </html>
  );
}