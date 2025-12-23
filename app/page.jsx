import Link from "next/link";
import Image from "next/image";

// --- FETCH DATA FUNCTION ---
async function getFeaturedProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.WEB_API_KEY;

  try {
    // Kita ambil 4 produk terbaru
    const res = await fetch(`${API_URL}/products/public?limit=4`, {
      headers: { 'X-Api-Key': API_KEY || '' },
      cache: 'no-store' // Agar data selalu fresh saat ada produk baru
    });

    if (!res.ok) return [];
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Gagal mengambil featured products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen font-display text-text-main">
      {/* --- Top Navigation --- */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f4f2f0] dark:border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-text-main dark:text-white group cursor-pointer">
              <div className="size-8 text-primary">
                <span className="material-symbols-outlined text-3xl">bed</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Nyamann</h2>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/shop" className="text-text-main dark:text-white/90 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors">Shop Bedding</Link>
              <Link href="#" className="text-text-main dark:text-white/90 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors">Our Story</Link>
              <Link href="#" className="text-text-main dark:text-white/90 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors">Journal</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Link href="/shop" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </Link>
              <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </button>
              {/* Mobile Menu Button */}
              <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white">
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-[1440px] mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center justify-center group">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp4eCH8FxGGfQeYjogXl2NOQe55ycYfvwPfEcaA7XCPsl_nActcknwJY-2AxZrIgHGorP71HiaBoT3IMPe6G39gtkrwlGNarJ9APm9mD5NcM3MSji868FJCnFXuk9IitBIGpqYqQTlbTd8gPXu-l2UsBlJ7RhCyNU7pFGflYzk_tTZHGcoN1f79vztC5p-9B6Bqm9mSb4gnGoAHlhevu1R5n9CC-hE9_-wkpPISWO5HbgAZD1bCfxKj2zmlKhVEXPxMEE4CA8zyak")' }}
            ></div>
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl px-4 flex flex-col items-center gap-6">
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-md">
                Make Your Bed <br/> Your Happy Place
              </h1>
              <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium max-w-lg drop-shadow-sm">
                Linen ramah lingkungan yang dicuci lembut, semakin nyaman setiap kali tidur. Temukan seni hidup yang nyaman dan hangat.
              </p>
              <Link href="/shop" className="mt-4 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg shadow-float transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2">
                Lihat Koleksi
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* --- Shop By Color / Mood --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-text-main dark:text-white text-3xl font-bold tracking-tight mb-3">Shop by Mood</h2>
            <p className="text-text-soft dark:text-gray-400">Temukan nada yang sempurna untuk tempat perlindungan Anda.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {/* Mood Item: Terracotta */}
            <Link href="/shop?category=terracotta" className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-terracotta relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-terracotta/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-lg">Terracotta</h3>
                <span className="text-sm text-text-soft dark:text-gray-400">Warmth & Energy</span>
              </div>
            </Link>
            {/* Mood Item: Sage */}
            <Link href="/shop?category=sage" className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-sage relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-sage/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-lg">Sage Green</h3>
                <span className="text-sm text-text-soft dark:text-gray-400">Calm & Nature</span>
              </div>
            </Link>
            {/* Mood Item: Oatmeal */}
            <Link href="/shop?category=oatmeal" className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-oatmeal relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-oatmeal/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-lg">Oatmeal</h3>
                <span className="text-sm text-text-soft dark:text-gray-400">Neutral & Soft</span>
              </div>
            </Link>
            {/* Mood Item: Mustard */}
            <Link href="/shop?category=mustard" className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-mustard relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-mustard/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-lg">Soft Mustard</h3>
                <span className="text-sm text-text-soft dark:text-gray-400">Sunny & Bright</span>
              </div>
            </Link>
          </div>
        </section>

        {/* --- Bestsellers (Dynamic from API) --- */}
        <section className="py-16 bg-[#f4f2f0] dark:bg-white/5 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10 px-2">
              <div>
                <h2 className="text-text-main dark:text-white text-3xl font-bold tracking-tight mb-2">Community Favorites</h2>
                <p className="text-text-soft dark:text-gray-400">Produk terbaru pilihan kami untuk Anda.</p>
              </div>
              <Link href="/shop" className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline">
                View all
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Scroll Container */}
            <div className="flex overflow-x-auto scrollbar-hide pb-12 pt-4 px-4 -mx-4 sm:mx-0 gap-8 snap-x snap-mandatory">
              
              {/* === DYNAMIC PRODUCT CARDS === */}
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="min-w-[280px] sm:min-w-[320px] bg-white p-4 pb-6 shadow-float rounded-sm polaroid-tilt transition-all duration-300 snap-center group">
                    <Link href={`/shop/${product.slug}`} className="block">
                      <div className="aspect-[4/5] w-full bg-gray-100 overflow-hidden mb-4 relative">
                        
                        {/* Dynamic Badge */}
                        {product.stock < 5 && product.stock > 0 && (
                           <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm z-10 uppercase">Low Stock</div>
                        )}
                        {product.stock === 0 && (
                           <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-sm z-10 uppercase">Sold Out</div>
                        )}

                        {/* Product Image */}
                        {product.banner_image ? (
                          <Image 
                            src={product.banner_image}
                            alt={product.name}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                             <span className="material-symbols-outlined text-4xl">image</span>
                          </div>
                        )}

                        {/* Hover Button */}
                        <button className="absolute bottom-4 right-4 bg-white text-text-main p-3 rounded-full shadow-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-20">
                          <span className="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                      </div>

                      <div className="px-2 text-center">
                        <h3 className="text-xl font-bold text-text-main mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-primary font-bold">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="w-full py-10 text-center text-gray-500">
                   Belum ada produk untuk ditampilkan.
                </div>
              )}
              {/* === END DYNAMIC CARDS === */}

            </div>
          </div>
        </section>

        {/* --- Value Props / Features --- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-soft">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">grade</span>
              </div>
              <h3 className="text-xl font-bold text-text-main dark:text-white">Produk Berkualitas</h3>
              <p className="text-text-soft dark:text-gray-400">Sprei dengan material premium, jahitan rapi, dan ketahanan warna yang terjaga untuk kenyamanan tidur maksimal.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-soft">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">cleaning_services</span>
              </div>
              <h3 className="text-xl font-bold text-text-main dark:text-white">Mudah Dibersihkan</h3>
              <p className="text-text-soft dark:text-gray-400">Tahan luntur dan cepat kering, cukup dicuci dengan deterjen lembut dan dikeringkan dengan suhu rendah.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-soft">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">local_shipping</span>
              </div>
              <h3 className="text-xl font-bold text-text-main dark:text-white">Bisa Diantar Kurir</h3>
              <p className="text-text-soft dark:text-gray-400">Pesanan dikirim langsung ke rumah Anda oleh kurir terpercaya dengan pengemasan aman dan rapi.</p>
            </div>
          </div>
        </section>

        {/* --- Social Proof / Instagram Grid --- */}
        <section className="py-16 bg-white dark:bg-background-dark">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-text-main dark:text-white text-3xl font-bold tracking-tight mb-3">As Seen In Your Homes</h2>
              <p className="text-text-soft dark:text-gray-400">Join the cozy club and tag us @NyamannBedding</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
              {/* IG Item 1 (Tall) */}
              <div className="relative group overflow-hidden rounded-xl row-span-2 col-span-2 md:col-span-2 md:row-span-2">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM" alt="IG 1" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href="/shop"  className="bg-white text-text-main px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">favorite</span> Shop the Look
                    
                  </Link>
                </div>
              </div>
              {/* IG Item 2 */}
              <div className="relative group overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4kLXTKkn9KnsiwK6jQ2SX9qLo15sgidBjoA1vcRHxhTcdbT8v6_lCPDIWtFs7CqSlFzT3o3CXrAtbmiBWeblb4t2-sXRjQTlFeV7ZLCiGADw9yhLLS9_DUhOv3VywNMpBq3AgcyIp1PzYrJbyMZcmP5U79Btg8NrBZi5UFNG_GZuJEhOZwP8aAuwVvBhcf7iYk3o56xqQTyOUC9dvuDTdw1Nn2Sf_XlxNdcjbYZriFkizceiFN6xXcrA-PppvQK-u468LdOukD_Q" alt="IG 2" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">@sarah_sleeps</span>
                </div>
              </div>
              {/* IG Item 3 */}
              <div className="relative group overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlnNivZ3MpYCCGKtoKEhH6DTzYqRD3CCR8FowveK84qNRInnjmpi80Xl5Y53CW076KdswiKVG6GDfn_eIC69zEKvnsklDaITRbtzRZFbC4E0o-WoEK7oEKD2uRBZsi--uhCdekmEVZRuhqo2VKK9KJv4SBYDutXkRzaYN9FG2xUSG8ae_lcD-06f5irrA493WYzWpDwgy6o38bF_Bl9tJTMKpap0sih6SNLDBk4X-I6-E7LLtbvbci5znWPwmYnrmh8zNS73t1PHI" alt="IG 3" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">@cozy_corner</span>
                </div>
              </div>
              {/* IG Item 4 */}
              <div className="relative group overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSlnySBcmbNrWXBa-yEWkncEUakrmoeGVvN9LETgMDDed0n7zhP8LheIlgkPSpCNflWE5ORJQqJ85555ZDcbWeV9ktNSW5kpFfJu180QaX_9UXPbUdN4pgJGpyUgxbSZSmBPP1fyRcdBlqj9VVapNbQjEr8P0kXautaL1UMm0V2tMGzJ7flT3cafxj4uk4p4H6lWzXUfbR5w5-d31qzeuv-Mklmo2_LmAaOH6XT0Fys7sCY8SEgL1QP1BUNhd_jdXC-QMLVOMAdsM" alt="IG 4" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">@urban_jungle</span>
                </div>
              </div>
              {/* IG Item 5 */}
              <div className="relative group overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkmvTe_B8DIrtW7UBWOgj3x41rqm3zRQgGScN5s5arwcJMvkdKmKjBxbwRHOXgGZCUhMAaObu9kx38ZfNUWrTNssvKwx4rMsYxYY68YEIh02JGjBwMw2naHbtFwqqY_i0sMUxsfqMqPUDdFXWU6MKgt6iKcxk0WyWRFn3Cj2gthk-4N2kQFUTWnJOgiJIrU5hiJemNLz5xg4xJKiYBUfb-6KghFON_bXsUOH3mNqAPRmmVfFGpUunmIch8ydBare3OfIyMocNpwAw" alt="IG 5" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">@morning_light</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      {/* --- Footer --- */}
      <footer className="bg-text-main text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-12">
          
          {/* --- LEFT: BRAND & SOCIAL MEDIA --- */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">bed</span>
              <span className="text-2xl font-bold">Nyamann</span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Menghadirkan kenyamanan tidur terbaik dengan bahan linen organik berkualitas tinggi. Ciptakan tempat istirahat impian Anda bersama kami.
            </p>
            
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17.82-1.51 1.46-.38.7-.51 1.5-.42 2.29.09.84.45 1.63 1.05 2.21.96.94 2.47 1.21 3.73.86 1.25-.34 2.3-1.3 2.81-2.51.32-.78.48-1.61.45-2.45.02-5.16.02-10.32 0-15.48h-1.84c.01-1.34.02-2.68.01-4.02z"/></svg>
              </a>
              {/* Youtube / Pinterest / Lainnya */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* --- RIGHT: LINKS --- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg">Shop</h4>
              <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Duvet Covers</Link>
              <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Sheet Sets</Link>
              <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Pillowcases</Link>
              <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Bundles</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg">About</h4>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Our Story</Link>
              <Link href="/articles" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg">Support</h4>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</Link>
            </div>
          </div>
        </div>

        {/* --- BOTTOM --- */}
        <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Nyamann Bedding. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}