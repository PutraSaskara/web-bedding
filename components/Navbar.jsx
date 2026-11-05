'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import Router
import NavbarCartButton from './NavbarCartButton';

export default function Navbar() {
  const router = useRouter(); // Hook untuk navigasi
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- STATE SEARCH ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // --- CONFIG WA ---
  const phoneNumber = "6285739287239";
  const message = "Halo ameskarasprei, saya ingin bertanya mengenai produk...";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // --- FUNGSI SEARCH ---
  const handleSearch = (e) => {
    e.preventDefault(); // Mencegah reload
    if (searchQuery.trim()) {
      // 1. Redirect ke halaman shop dengan parameter search
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      // 2. Tutup search bar & reset input
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* --- Top Announcement Bar --- */}
      <div className="bg-[#2D2A26] text-white text-[11px] sm:text-xs py-2 px-3 font-medium transition-colors border-b border-black/10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center text-center gap-1.5 sm:gap-2">
          <span className="text-primary">✨</span>
          <span className="tracking-wide">Pengiriman dari Bali ke Seluruh Indonesia</span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline text-white/90">Konsultasi Ukuran & Bahan Gratis</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-bold inline-flex items-center gap-0.5 ml-1 shrink-0"
          >
            Chat WA
            <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
          </a>
        </div>
      </div>

      <nav className="sticky top-0 z-50 w-full glass border-b border-[#f4f2f0]/50 dark:border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center text-text-main dark:text-white group cursor-pointer">
              <Image
                src="/logo1.png"
                alt="Ameskara Logo"
                width={70}
                height={70}
                priority
                className="md:w-16 md:h-16 w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/shop" className="text-text-main/80 dark:text-white/80 text-[13px] font-semibold tracking-wider uppercase hover:text-primary transition-colors">Shop Bedding</Link>
              <Link href="/our-story" className="text-text-main/80 dark:text-white/80 text-[13px] font-semibold tracking-wider uppercase hover:text-primary transition-colors">Our Story</Link>
              <Link href="/journal" className="text-text-main/80 dark:text-white/80 text-[13px] font-semibold tracking-wider uppercase hover:text-primary transition-colors">Journal</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* --- SEARCH BUTTON (Toggle) --- */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all text-text-main dark:text-white"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isSearchOpen ? 'close' : 'search'}
                </span>
              </button>

              <NavbarCartButton />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all text-text-main dark:text-white z-50"
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR OVERLAY --- */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 p-4 sm:p-6 shadow-xl animate-in slide-in-from-top-2 duration-300">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-gray-400">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Cari koleksi kami..."
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full py-3 sm:py-4 pl-12 pr-24 outline-none focus:ring-2 focus:ring-primary/20 text-text-main dark:text-white text-base transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-primary-dark transition-all shadow-md active:scale-95"
              >
                Search
              </button>
            </form>
          </div>
        )}

      </nav>

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] sm:top-[80px] bg-white dark:bg-background-dark z-[60] flex flex-col animate-in fade-in slide-in-from-right duration-300">
          <div className="flex flex-col p-8 space-y-6">
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center justify-between py-2">
              <span className="text-2xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Shop Bedding</span>
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_forward</span>
            </Link>
            <Link href="/our-story" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center justify-between py-2">
              <span className="text-2xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Our Story</span>
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_forward</span>
            </Link>
            <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center justify-between py-2">
              <span className="text-2xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Journal</span>
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_forward</span>
            </Link>
            <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center justify-between py-2">
              <span className="text-2xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Contact Us</span>
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_forward</span>
            </Link>

            <div className="pt-10 flex flex-col gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-primary text-white py-4 rounded-full text-base font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all">
                <span className="material-symbols-outlined">chat</span>
                Consult via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Gelap saat search aktif */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 top-[64px] sm:top-[80px]" onClick={() => setIsSearchOpen(false)}></div>
      )}
    </>
  );
}