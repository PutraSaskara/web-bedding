import { Spline_Sans } from "next/font/google";
import "./globals.css";

// Menggunakan next/font untuk optimasi
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
        {/* Material Symbols Outlined */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-text-main antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}