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
  const phoneNumber = "6281234567890"; 
  const message = "Halo Nyamann Bedding, saya ingin bertanya mengenai produk...";
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
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f4f2f0] dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center text-text-main dark:text-white group cursor-pointer">
              <Image 
                src="/logo1.png" 
                alt="Nyamann Logo" 
                width={80} 
                height={80} 
                className="md:w-20 md:h-20 w-12 h-12 object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/shop" className="text-text-main dark:text-white/90 text-sm font-medium hover:text-primary transition-colors">Shop Bedding</Link>
              <Link href="/our-story" className="text-text-main dark:text-white/90 text-sm font-medium hover:text-primary transition-colors">Our Story</Link>
              <Link href="/journal" className="text-text-main dark:text-white/90 text-sm font-medium hover:text-primary transition-colors">Journal</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              
              {/* --- SEARCH BUTTON (Toggle) --- */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSearchOpen ? 'close' : 'search'}
                </span>
              </button>
              
              <NavbarCartButton />
              
              {/* WhatsApp Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50 text-text-main hover:text-green-600 transition-colors group"
                title="Chat WhatsApp"
              >
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white z-50"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR OVERLAY (Muncul di bawah Navbar) --- */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 p-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="max-w-[1440px] mx-auto relative flex items-center">
               <span className="material-symbols-outlined absolute left-4 text-gray-400">search</span>
               <input 
                 type="text" 
                 autoFocus
                 placeholder="Cari produk (misal: sprei linen)..." 
                 className="w-full bg-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 text-text-main"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <button 
                 type="submit"
                 className="absolute right-2 bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
               >
                 Search
               </button>
            </form>
          </div>
        )}

        {/* --- MOBILE MENU --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-gray-100 shadow-lg animate-in slide-in-from-top-5 duration-200 h-[calc(100vh-64px)] flex flex-col">
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-main dark:text-white hover:text-primary py-2 border-b border-gray-50">Shop Bedding</Link>
              <Link href="/our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-main dark:text-white hover:text-primary py-2 border-b border-gray-50">Our Story</Link>
              <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-text-main dark:text-white hover:text-primary py-2 border-b border-gray-50">Journal</Link>
              
              <div className="flex gap-4 pt-4 mt-auto mb-4">
                 <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                   Hubungi Kami via WhatsApp
                 </a>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Overlay Gelap saat search aktif (Opsional, agar fokus ke search bar) */}
      {isSearchOpen && (
         <div className="fixed inset-0 bg-black/20 z-40 top-[65px] md:top-[80px]" onClick={() => setIsSearchOpen(false)}></div>
      )}
    </>
  );
}