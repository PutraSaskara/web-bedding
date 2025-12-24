import Link from "next/link";
import Image from "next/image";

// --- FETCH DATA FUNCTION ---
async function getFeaturedProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.WEB_API_KEY;

  try {
    const res = await fetch(`${API_URL}/products/public?limit=4`, {
      headers: { 'X-Api-Key': API_KEY || '' },
      cache: 'no-store' 
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
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-[1440px] mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center justify-center group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp4eCH8FxGGfQeYjogXl2NOQe55ycYfvwPfEcaA7XCPsl_nActcknwJY-2AxZrIgHGorP71HiaBoT3IMPe6G39gtkrwlGNarJ9APm9mD5NcM3MSji868FJCnFXuk9IitBIGpqYqQTlbTd8gPXu-l2UsBlJ7RhCyNU7pFGflYzk_tTZHGcoN1f79vztC5p-9B6Bqm9mSb4gnGoAHlhevu1R5n9CC-hE9_-wkpPISWO5HbgAZD1bCfxKj2zmlKhVEXPxMEE4CA8zyak")' }}
            ></div>
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
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
            <Link href="/shop?category=terracotta" className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-terracotta relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-terracotta/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-lg">Terracotta</h3>
                <span className="text-sm text-text-soft dark:text-gray-400">Warmth & Energy</span>
              </div>
            </Link>
            <Link href="/shop?category=sage" className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-sage relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-sage/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-lg">Sage Green</h3>
                <span className="text-sm text-text-soft dark:text-gray-400">Calm & Nature</span>
              </div>
            </Link>
            <Link href="/shop?category=oatmeal" className="group flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-oatmeal relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-oatmeal/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-lg">Oatmeal</h3>
                <span className="text-sm text-text-soft dark:text-gray-400">Neutral & Soft</span>
              </div>
            </Link>
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

            <div className="flex overflow-x-auto scrollbar-hide pb-12 pt-4 px-4 -mx-4 sm:mx-0 gap-8 snap-x snap-mandatory">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="min-w-[280px] sm:min-w-[320px] bg-white p-4 pb-6 shadow-float rounded-sm polaroid-tilt transition-all duration-300 snap-center group">
                    <Link href={`/shop/${product.slug}`} className="block">
                      <div className="aspect-[4/5] w-full bg-gray-100 overflow-hidden mb-4 relative">
                        {product.stock < 5 && product.stock > 0 && (
                           <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm z-10 uppercase">Low Stock</div>
                        )}
                        {product.stock === 0 && (
                           <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-sm z-10 uppercase">Sold Out</div>
                        )}
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
              <div className="relative group overflow-hidden rounded-xl row-span-2 col-span-2 md:col-span-2 md:row-span-2">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM" alt="IG 1" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href="/shop"  className="bg-white text-text-main px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">favorite</span> Shop the Look
                  </Link>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4kLXTKkn9KnsiwK6jQ2SX9qLo15sgidBjoA1vcRHxhTcdbT8v6_lCPDIWtFs7CqSlFzT3o3CXrAtbmiBWeblb4t2-sXRjQTlFeV7ZLCiGADw9yhLLS9_DUhOv3VywNMpBq3AgcyIp1PzYrJbyMZcmP5U79Btg8NrBZi5UFNG_GZuJEhOZwP8aAuwVvBhcf7iYk3o56xqQTyOUC9dvuDTdw1Nn2Sf_XlxNdcjbYZriFkizceiFN6xXcrA-PppvQK-u468LdOukD_Q" alt="IG 2" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">@sarah_sleeps</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlnNivZ3MpYCCGKtoKEhH6DTzYqRD3CCR8FowveK84qNRInnjmpi80Xl5Y53CW076KdswiKVG6GDfn_eIC69zEKvnsklDaITRbtzRZFbC4E0o-WoEK7oEKD2uRBZsi--uhCdekmEVZRuhqo2VKK9KJv4SBYDutXkRzaYN9FG2xUSG8ae_lcD-06f5irrA493WYzWpDwgy6o38bF_Bl9tJTMKpap0sih6SNLDBk4X-I6-E7LLtbvbci5znWPwmYnrmh8zNS73t1PHI" alt="IG 3" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">@cozy_corner</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSlnySBcmbNrWXBa-yEWkncEUakrmoeGVvN9LETgMDDed0n7zhP8LheIlgkPSpCNflWE5ORJQqJ85555ZDcbWeV9ktNSW5kpFfJu180QaX_9UXPbUdN4pgJGpyUgxbSZSmBPP1fyRcdBlqj9VVapNbQjEr8P0kXautaL1UMm0V2tMGzJ7flT3cafxj4uk4p4H6lWzXUfbR5w5-d31qzeuv-Mklmo2_LmAaOH6XT0Fys7sCY8SEgL1QP1BUNhd_jdXC-QMLVOMAdsM" alt="IG 4" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">@urban_jungle</span>
                </div>
              </div>
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
    </div>
  );
}