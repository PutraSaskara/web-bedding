import { Spline_Sans } from "next/font/google";
import "./globals.css";

// Import Komponen Global
import Navbar from "../components/Navbar";       // <--- 1. Import Navbar
import CartDrawer from "../components/CartDrawer";
import FloatingCart from "../components/FloatingCart";
import Footer from "../components/Footer";
const spline = Spline_Sans({ 
  subsets: ["latin"],
  variable: '--font-spline',
  display: 'swap',
});

export const metadata = {
  title: "Nyamann Bedding",
  description: "Sustainable, soft-washed linen bedding.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spline.variable} light`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-text-main antialiased selection:bg-primary selection:text-white">
        
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