import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-text-main text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* --- LEFT: BRAND & SOCIAL MEDIA --- */}
        <div className="max-w-md">
          <div className="mb-6">
            <Image 
              src="/logo1.png" 
              alt="Nyamann Logo" 
              width={128} 
              height={128} 
              className="w-32 h-32 object-contain"
            />
          </div>
          <p className="text-gray-400 mb-8 leading-relaxed">
              Kombinasi sempurna antara kenyamanan bahan premium, desain aesthetic yang tidak luntur, dan kepraktisan model fitted untuk pengalaman tidur yang lebih baik.
          </p>
          
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a href="https://www.instagram.com/ameskarasprei.id?igsh=MXA1b2ZqZmw4eWpsaw==" target='_blank' className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* Facebook */}
            {/* <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a> */}
            {/* TikTok */}
            {/* <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17.82-1.51 1.46-.38.7-.51 1.5-.42 2.29.09.84.45 1.63 1.05 2.21.96.94 2.47 1.21 3.73.86 1.25-.34 2.3-1.3 2.81-2.51.32-.78.48-1.61.45-2.45.02-5.16.02-10.32 0-15.48h-1.84c.01-1.34.02-2.68.01-4.02z"/></svg>
            </a> */}
            {/* Youtube */}
            {/* <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a> */}
          </div>
        </div>

        {/* --- RIGHT: LINKS --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
          {/* <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Shop</h4>
            <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Duvet Covers</Link>
            <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Sheet Sets</Link>
            <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Pillowcases</Link>
            <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Bundles</Link>
          </div> */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">About</h4>
            <Link href="/our-story" className="text-gray-400 hover:text-white transition-colors">Our Story</Link>
            <Link href="/journal" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Support</h4>
            <Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
            <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping</Link>
          </div>
        </div>
      </div>

      {/* --- BOTTOM --- */}
      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© 2024 Ameskara sprei bed and linen. All rights reserved.</p>
        {/* <div className="flex gap-6">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
        </div> */}
      </div>
    </footer>
  );
}