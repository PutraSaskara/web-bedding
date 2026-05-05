import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-text-main text-white py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 sm:gap-24">
        
        {/* --- BRAND SECTION --- */}
        <div className="md:col-span-5">
          <div className="mb-8">
            <Image 
              src="/logo1.png" 
              alt="Ameskara Logo" 
              width={100} 
              height={100} 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain brightness-0 invert"
            />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6">
            Kenyamanan Premium <br />
            <span className="text-primary">Untuk Kamar Impian.</span>
          </h3>
          <p className="text-gray-400 mb-10 leading-relaxed text-base sm:text-lg max-w-sm">
            Hadir untuk mengubah cara Anda beristirahat dengan koleksi sprei dan bedding berkualitas tinggi yang menggabungkan estetika modern dan kenyamanan tiada tara.
          </p>
          
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/ameskarasprei.id?igsh=MXA1b2ZqZmw4eWpsaw==" target='_blank' className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        {/* --- LINKS SECTION --- */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg uppercase tracking-widest text-primary">Explore</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/shop" className="text-gray-400 hover:text-white transition-colors text-base">Shop All</Link>
              <Link href="/shop?category=terracotta" className="text-gray-400 hover:text-white transition-colors text-base">Terracotta</Link>
              <Link href="/shop?category=sage" className="text-gray-400 hover:text-white transition-colors text-base">Sage Green</Link>
              <Link href="/shop?category=oatmeal" className="text-gray-400 hover:text-white transition-colors text-base">Neutral Oatmeal</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg uppercase tracking-widest text-primary">Company</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/our-story" className="text-gray-400 hover:text-white transition-colors text-base">Our Story</Link>
              <Link href="/journal" className="text-gray-400 hover:text-white transition-colors text-base">Blog & Journal</Link>
              <Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors text-base">Contact Us</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-6 col-span-2 sm:col-span-1">
            <h4 className="font-bold text-lg uppercase tracking-widest text-primary">Support</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors text-base">Shipping Info</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-base">Terms of Service</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-base">Privacy Policy</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* --- BOTTOM --- */}
      <div className="max-w-[1440px] mx-auto mt-20 sm:mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
        <p className="text-center md:text-left">© {new Date().getFullYear()} Ameskara Sprei Bed and Linen. Crafted for your comfort.</p>
        <div className="flex items-center gap-8 font-medium">
           <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Live Status</span>
           <span className="hidden sm:inline">Based in Bali, Indonesia</span>
        </div>
      </div>
    </footer>
  );
}