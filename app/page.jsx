import Link from "next/link";
import Image from "next/image";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';

// SEO Metadata for Home Page
export const metadata = {
  title: 'Ameskara Sprei - Sprei & Bedcover Premium Berkualitas Tinggi',
  description: 'Belanja sprei, bedcover, dan perlengkapan tidur premium dari Ameskara. Bahan lembut, warna tidak luntur, desain estetik. Gratis ongkir seluruh Indonesia.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Ameskara Sprei - Sprei & Bedcover Premium Berkualitas Tinggi',
    description: 'Belanja sprei, bedcover, dan perlengkapan tidur premium dari Ameskara. Bahan lembut, warna tidak luntur, desain estetik.',
    url: siteUrl,
    type: 'website',
  },
};

// JSON-LD Structured Data
function HomeJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Ameskara Sprei',
        description: 'Sprei & Bedcover Premium Berkualitas Tinggi',
        inLanguage: 'id-ID',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/shop?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Ameskara Sprei',
        url: siteUrl,
        description: 'Toko sprei dan bedcover premium online. Bahan lembut, warna tahan lama, desain estetik.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Denpasar',
          addressRegion: 'Bali',
          addressCountry: 'ID',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

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
      <HomeJsonLd />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 max-w-[1440px] mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp4eCH8FxGGfQeYjogXl2NOQe55ycYfvwPfEcaA7XCPsl_nActcknwJY-2AxZrIgHGorP71HiaBoT3IMPe6G39gtkrwlGNarJ9APm9mD5NcM3MSji868FJCnFXuk9IitBIGpqYqQTlbTd8gPXu-l2UsBlJ7RhCyNU7pFGflYzk_tTZHGcoN1f79vztC5p-9B6Bqm9mSb4gnGoAHlhevu1R5n9CC-hE9_-wkpPISWO5HbgAZD1bCfxKj2zmlKhVEXPxMEE4CA8zyak")' }}
            ></div>
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            <div className="relative z-10 text-center max-w-2xl px-4 sm:px-6 flex flex-col items-center gap-4 sm:gap-6">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-md">
                  Desain yang Menawan, Kualitas yang Bertahan
              </h1>
              <p className="text-white/90 text-sm sm:text-base lg:text-xl font-medium max-w-lg drop-shadow-sm">
                  Nikmati kenyamanan sepenuhnya dengan sprei bahan premium yang nyaman di kulit, motif tidak mudah luntur, dan perawatan mudah untuk tidur yang lebih berkualitas setiap hari.
              </p>
              <Link href="/shop" className="mt-2 sm:mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-base sm:text-lg shadow-float transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2">
                  Wujudkan Kamar Impian
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
          </div>
          </div>
        </section>

        {/* --- Shop By Color / Mood --- */}
        <section className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-text-main dark:text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3">Shop by Mood</h2>
            <p className="text-text-soft dark:text-gray-400 text-sm sm:text-base">Temukan nada yang sempurna untuk tempat perlindungan Anda.</p>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
            <Link href="/shop?category=terracotta" className="group flex flex-col items-center gap-3 sm:gap-4 cursor-pointer">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-terracotta relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-terracotta/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-base sm:text-lg">Terracotta</h3>
                <span className="text-xs sm:text-sm text-text-soft dark:text-gray-400">Warmth & Energy</span>
              </div>
            </Link>
            <Link href="/shop?category=sage" className="group flex flex-col items-center gap-3 sm:gap-4 cursor-pointer">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-sage relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-sage/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-base sm:text-lg">Sage Green</h3>
                <span className="text-xs sm:text-sm text-text-soft dark:text-gray-400">Calm & Nature</span>
              </div>
            </Link>
            <Link href="/shop?category=oatmeal" className="group flex flex-col items-center gap-3 sm:gap-4 cursor-pointer">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-oatmeal relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-oatmeal/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-base sm:text-lg">Oatmeal</h3>
                <span className="text-xs sm:text-sm text-text-soft dark:text-gray-400">Neutral & Soft</span>
              </div>
            </Link>
            <Link href="/shop?category=mustard" className="group flex flex-col items-center gap-3 sm:gap-4 cursor-pointer">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-mustard relative overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ring-4 ring-transparent group-hover:ring-mustard/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-text-main dark:text-white text-base sm:text-lg">Soft Mustard</h3>
                <span className="text-xs sm:text-sm text-text-soft dark:text-gray-400">Sunny & Bright</span>
              </div>
            </Link>
          </div>
        </section>

        {/* --- Bestsellers (Dynamic from API) --- */}
        <section className="py-10 sm:py-16 bg-[#f4f2f0] dark:bg-white/5 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8 sm:mb-10 px-1 sm:px-2">
              <div>
                <h2 className="text-text-main dark:text-white text-2xl sm:text-3xl font-bold tracking-tight mb-1 sm:mb-2">Community Favorites</h2>
                <p className="text-text-soft dark:text-gray-400 text-sm sm:text-base">Produk terbaru pilihan kami untuk Anda.</p>
              </div>
              <Link href="/shop" className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline">
                View all
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="flex overflow-x-auto scrollbar-hide pb-4 sm:pb-8 pt-2 px-1 -mx-1 sm:mx-0 gap-2 sm:gap-4 snap-x snap-mandatory">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] snap-center">
                    <Link href={`/shop/${product.slug}`} className="block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 group">
                      <div className="aspect-square w-full bg-gray-50 overflow-hidden relative">
                        {product.stock < 5 && product.stock > 0 && (
                           <div className="absolute top-1.5 left-1.5 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded z-10">Sisa {product.stock}</div>
                        )}
                        {product.stock === 0 && (
                           <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded z-10 uppercase">Habis</div>
                        )}
                        {product.banner_image ? (
                          <Image 
                            src={product.banner_image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${product.stock === 0 ? 'grayscale opacity-70' : ''}`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-200">
                             <span className="material-symbols-outlined text-3xl">image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-2 sm:p-3">
                        <h3 className="text-xs sm:text-sm text-text-main line-clamp-1 leading-snug mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-primary font-bold text-sm sm:text-base">Rp {Math.floor(Number(product.price)).toLocaleString('id-ID')}</p>
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

            {/* Mobile "View All" Link */}
            <div className="sm:hidden text-center mt-2">
              <Link href="/shop" className="inline-flex items-center gap-1 text-primary font-bold hover:underline text-sm">
                Lihat Semua Produk
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* --- Value Props / Features --- */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
    <div className="flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-4 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-soft">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 sm:mb-2">
        <span className="material-symbols-outlined text-2xl sm:text-3xl">thermometer</span>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-text-main dark:text-white">Bahan Lembut & Adem</h3>
        <p className="text-text-soft dark:text-gray-400 text-sm sm:text-base mt-1 sm:mt-0">
          Terbuat dari kain microtex atau katun berkualitas yang halus dan nyaman di kulit, memberikan kenyamanan optimal sepanjang malam.
        </p>
      </div>
    </div>
    
    <div className="flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-4 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-soft">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 sm:mb-2">
        <span className="material-symbols-outlined text-2xl sm:text-3xl">palette</span>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-text-main dark:text-white">Warna Awet & Tidak Luntur</h3>
        <p className="text-text-soft dark:text-gray-400 text-sm sm:text-base mt-1 sm:mt-0">
          Menggunakan teknologi disperse printing yang membuat motif tetap cerah dan tidak mudah pudar meski setelah dicuci berkali-kali.
        </p>
      </div>
    </div>
    
    <div className="flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-4 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-soft">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 sm:mb-2">
        <span className="material-symbols-outlined text-2xl sm:text-3xl">fit_screen</span>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-text-main dark:text-white">Model Berkaret yang Pas</h3>
        <p className="text-text-soft dark:text-gray-400 text-sm sm:text-base mt-1 sm:mt-0">
          Desain fitted dengan karet di setiap sudut membuatnya selalu rapi dan pas menutupi kasur, tidak mudah melorot atau bergeser.
        </p>
      </div>
    </div>
  </div>
</section>

        {/* --- Social Proof / Instagram Grid --- */}
        <section className="py-10 sm:py-16 bg-white dark:bg-background-dark">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-text-main dark:text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3">As Seen In Your Homes</h2>
              <p className="text-text-soft dark:text-gray-400 text-sm sm:text-base">Join the cozy club and tag us @ameskarasprei.id</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3 auto-rows-[120px] sm:auto-rows-[180px] md:auto-rows-[250px]">
              <div className="relative group overflow-hidden rounded-lg sm:rounded-xl row-span-2 col-span-2 md:col-span-2 md:row-span-2">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM" alt="IG 1" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href="/shop"  className="bg-white text-text-main px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                    <span className="material-symbols-outlined text-xs sm:text-sm">favorite</span> Shop the Look
                  </Link>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg sm:rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4kLXTKkn9KnsiwK6jQ2SX9qLo15sgidBjoA1vcRHxhTcdbT8v6_lCPDIWtFs7CqSlFzT3o3CXrAtbmiBWeblb4t2-sXRjQTlFeV7ZLCiGADw9yhLLS9_DUhOv3VywNMpBq3AgcyIp1PzYrJbyMZcmP5U79Btg8NrBZi5UFNG_GZuJEhOZwP8aAuwVvBhcf7iYk3o56xqQTyOUC9dvuDTdw1Nn2Sf_XlxNdcjbYZriFkizceiFN6xXcrA-PppvQK-u468LdOukD_Q" alt="IG 2" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-xs sm:text-base">@sarah_sleeps</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg sm:rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlnNivZ3MpYCCGKtoKEhH6DTzYqRD3CCR8FowveK84qNRInnjmpi80Xl5Y53CW076KdswiKVG6GDfn_eIC69zEKvnsklDaITRbtzRZFbC4E0o-WoEK7oEKD2uRBZsi--uhCdekmEVZRuhqo2VKK9KJv4SBYDutXkRzaYN9FG2xUSG8ae_lcD-06f5irrA493WYzWpDwgy6o38bF_Bl9tJTMKpap0sih6SNLDBk4X-I6-E7LLtbvbci5znWPwmYnrmh8zNS73t1PHI" alt="IG 3" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-xs sm:text-base">@cozy_corner</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg sm:rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSlnySBcmbNrWXBa-yEWkncEUakrmoeGVvN9LETgMDDed0n7zhP8LheIlgkPSpCNflWE5ORJQqJ85555ZDcbWeV9ktNSW5kpFfJu180QaX_9UXPbUdN4pgJGpyUgxbSZSmBPP1fyRcdBlqj9VVapNbQjEr8P0kXautaL1UMm0V2tMGzJ7flT3cafxj4uk4p4H6lWzXUfbR5w5-d31qzeuv-Mklmo2_LmAaOH6XT0Fys7sCY8SEgL1QP1BUNhd_jdXC-QMLVOMAdsM" alt="IG 4" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-xs sm:text-base">@urban_jungle</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg sm:rounded-xl">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkmvTe_B8DIrtW7UBWOgj3x41rqm3zRQgGScN5s5arwcJMvkdKmKjBxbwRHOXgGZCUhMAaObu9kx38ZfNUWrTNssvKwx4rMsYxYY68YEIh02JGjBwMw2naHbtFwqqY_i0sMUxsfqMqPUDdFXWU6MKgt6iKcxk0WyWRFn3Cj2gthk-4N2kQFUTWnJOgiJIrU5hiJemNLz5xg4xJKiYBUfb-6KghFON_bXsUOH3mNqAPRmmVfFGpUunmIch8ydBare3OfIyMocNpwAw" alt="IG 5" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-xs sm:text-base">@morning_light</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}