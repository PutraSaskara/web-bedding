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
    const res = await fetch(`${API_URL}/products/public?limit=10`, {
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
    <div className="flex flex-col min-h-screen font-display text-text-main overflow-x-hidden">
      <HomeJsonLd />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative h-[85vh] sm:h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105 hover:scale-100" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp4eCH8FxGGfQeYjogXl2NOQe55ycYfvwPfEcaA7XCPsl_nActcknwJY-2AxZrIgHGorP71HiaBoT3IMPe6G39gtkrwlGNarJ9APm9mD5NcM3MSji868FJCnFXuk9IitBIGpqYqQTlbTd8gPXu-l2UsBlJ7RhCyNU7pFGflYzk_tTZHGcoN1f79vztC5p-9B6Bqm9mSb4gnGoAHlhevu1R5n9CC-hE9_-wkpPISWO5HbgAZD1bCfxKj2zmlKhVEXPxMEE4CA8zyak")' }}
            ></div>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6">
            <span className="inline-block animate-fade-in-up text-white/80 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4 sm:mb-6">
              Ameskara Premium Collection
            </span>
            <h1 className="animate-fade-in-up delay-100 text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-6 sm:mb-8 text-balance">
              Tidur Nyenyak, <br />
              <span className="text-primary italic font-serif">Kamar Estetik.</span>
            </h1>
            <p className="animate-fade-in-up delay-200 text-white/90 text-sm sm:text-lg lg:text-xl font-medium max-w-xl mx-auto mb-8 sm:mb-10 text-balance leading-relaxed">
              Hadirkan kemewahan hotel di kamar Anda dengan sprei bahan premium yang lembut, adem, dan desain menawan yang tahan lama.
            </p>
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-lg shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  Shop Collection
                  <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/our-story" className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-full font-bold text-lg transition-all hover:bg-white/30">
                  Our Story
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </section>

        {/* --- Shop By Mood (Thematic Grid) --- */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <h2 className="text-text-main dark:text-white text-3xl sm:text-5xl font-black tracking-tighter mb-4">Shop by Mood</h2>
              <p className="text-text-soft dark:text-gray-400 text-base sm:text-xl leading-relaxed">
                Setiap warna membawa energi yang berbeda. Temukan suasana yang paling sesuai dengan gaya hidup dan ketenangan Anda.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
            {[
              { name: 'Terracotta', mood: 'Warmth & Energy', color: 'bg-terracotta', img: '/mood/terracotta.png', cat: 'terracotta' },
              { name: 'Sage Green', mood: 'Calm & Nature', color: 'bg-sage', img: '/mood/sage.png', cat: 'sage' },
              { name: 'Oatmeal', mood: 'Neutral & Soft', color: 'bg-oatmeal', img: '/mood/oatmeal.png', cat: 'oatmeal' },
              { name: 'Soft Mustard', mood: 'Sunny & Bright', color: 'bg-mustard', img: '/mood/mustard.png', cat: 'mustard' },
            ].map((item, idx) => (
              <Link key={idx} href={`/shop?category=${item.cat}`} className="group relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-3xl bg-gray-100 shadow-soft transition-all duration-500 hover:shadow-2xl">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-3 sm:p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-white text-sm sm:text-2xl font-bold mb-0.5 sm:mb-1">{item.name}</h3>
                  <p className="text-white/80 text-[10px] sm:text-sm font-medium tracking-wide uppercase">{item.mood}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- Bestsellers (Grid View) --- */}
        <section className="py-20 sm:py-32 bg-[#FAF9F6] dark:bg-white/5">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12 sm:mb-16">
              <div>
                <h2 className="text-text-main dark:text-white text-3xl sm:text-5xl font-black tracking-tighter mb-4">Community Favorites</h2>
                <p className="text-text-soft dark:text-gray-400 text-base sm:text-lg">Koleksi paling dicintai oleh keluarga Ameskara.</p>
              </div>
              <Link href="/shop" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                Explore All
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Product Grid - Same as Shop Page */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <Link href={`/shop/${product.slug}`} key={product.id} className="group cursor-pointer bg-white rounded-lg sm:rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                      {product.stock === 0 && (
                        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-black/70 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded z-20 uppercase">
                          Habis
                        </div>
                      )}
                      {product.stock > 0 && product.stock < 5 && (
                        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-primary text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded z-20">
                          Sisa {product.stock}
                        </div>
                      )}

                      {product.banner_image ? (
                        <Image
                            src={product.banner_image}
                            alt={product.name}
                            fill
                            className={`object-cover object-center transition-transform duration-500 group-hover:scale-105 ${product.stock === 0 ? 'grayscale opacity-70' : ''}`}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                          <span className="material-symbols-outlined text-3xl sm:text-4xl">image</span>
                        </div>
                      )}
                    </div>

                    <div className="p-2 sm:p-3">
                      <h3 className="text-xs sm:text-sm text-text-main line-clamp-1 leading-snug mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                      </h3>
                      <p className="text-primary font-bold text-sm sm:text-base">
                        Rp {Math.floor(product.price).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-500 glass rounded-3xl">
                   Belum ada produk unggulan saat ini.
                </div>
              )}
            </div>

            <div className="sm:hidden text-center mt-10">
              <Link href="/shop" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-8 py-3 rounded-full font-bold text-sm">
                Lihat Semua Produk
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>


        {/* --- Why Choose Us (Editorial Section) --- */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
             <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM" 
                  alt="Quality details"
                  fill
                  className="object-cover"
                />
             </div>
             <div>
                <span className="text-primary font-black uppercase tracking-widest text-xs sm:text-sm mb-4 block">The Ameskara Way</span>
                <h2 className="text-text-main dark:text-white text-3xl sm:text-5xl font-black tracking-tighter mb-8 leading-tight">
                  Kualitas Tanpa Kompromi untuk Tidur Anda.
                </h2>
                
                <div className="space-y-8 sm:space-y-10">
                  {[
                    { icon: 'thermometer', title: 'Premium Cotton & Microtex', desc: 'Bahan pilihan yang dirancang untuk sirkulasi udara maksimal, menjaga suhu tidur tetap sejuk dan nyaman sepanjang malam.' },
                    { icon: 'palette', title: 'Disperse Printing Technology', desc: 'Warna yang menyatu sempurna dengan serat kain. Dijamin tidak luntur dan tetap cerah meski dicuci berulang kali.' },
                    { icon: 'fit_screen', title: 'Perfectly Fitted Design', desc: 'Karet di setiap sudut yang kuat dan pas. Sprei Anda akan selalu rapi, tidak peduli seberapa banyak Anda bergerak.' }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-6 sm:gap-8 group">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0 shadow-soft">
                        <span className="material-symbols-outlined text-2xl sm:text-3xl">{feature.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-text-main dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-text-soft dark:text-gray-400 text-base sm:text-lg leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </section>

        {/* --- Social Proof / Instagram Grid --- */}
        <section className="py-20 sm:py-32 bg-white dark:bg-background-dark overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-text-main dark:text-white text-3xl sm:text-5xl font-black tracking-tighter mb-4">Di Kamar Anda</h2>
              <p className="text-text-soft dark:text-gray-400 text-base sm:text-xl">Bagikan momen nyaman Anda bersama kami. Tag @ameskarasprei.id</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[300px]">
              {[
                { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM", span: "row-span-2 col-span-2" },
                { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4kLXTKkn9KnsiwK6jQ2SX9qLo15sgidBjoA1vcRHxhTcdbT8v6_lCPDIWtFs7CqSlFzT3o3CXrAtbmiBWeblb4t2-sXRjQTlFeV7ZLCiGADw9yhLLS9_DUhOv3VywNMpBq3AgcyIp1PzYrJbyMZcmP5U79Btg8NrBZi5UFNG_GZuJEhOZwP8aAuwVvBhcf7iYk3o56xqQTyOUC9dvuDTdw1Nn2Sf_XlxNdcjbYZriFkizceiFN6xXcrA-PppvQK-u468LdOukD_Q", span: "" },
                { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlnNivZ3MpYCCGKtoKEhH6DTzYqRD3CCR8FowveK84qNRInnjmpi80Xl5Y53CW076KdswiKVG6GDfn_eIC69zEKvnsklDaITRbtzRZFbC4E0o-WoEK7oEKD2uRBZsi--uhCdekmEVZRuhqo2VKK9KJv4SBYDutXkRzaYN9FG2xUSG8ae_lcD-06f5irrA493WYzWpDwgy6o38bF_Bl9tJTMKpap0sih6SNLDBk4X-I6-E7LLtbvbci5znWPwmYnrmh8zNS73t1PHI", span: "" },
                { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSlnySBcmbNrWXBa-yEWkncEUakrmoeGVvN9LETgMDDed0n7zhP8LheIlgkPSpCNflWE5ORJQqJ85555ZDcbWeV9ktNSW5kpFfJu180QaX_9UXPbUdN4pgJGpyUgxbSZSmBPP1fyRcdBlqj9VVapNbQjEr8P0kXautaL1UMm0V2tMGzJ7flT3cafxj4uk4p4H6lWzXUfbR5w5-d31qzeuv-Mklmo2_LmAaOH6XT0Fys7sCY8SEgL1QP1BUNhd_jdXC-QMLVOMAdsM", span: "md:col-start-3" },
                { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkmvTe_B8DIrtW7UBWOgj3x41rqm3zRQgGScN5s5arwcJMvkdKmKjBxbwRHOXgGZCUhMAaObu9kx38ZfNUWrTNssvKwx4rMsYxYY68YEIh02JGjBwMw2naHbtFwqqY_i0sMUxsfqMqPUDdFXWU6MKgt6iKcxk0WyWRFn3Cj2gthk-4N2kQFUTWnJOgiJIrU5hiJemNLz5xg4xJKiYBUfb-6KghFON_bXsUOH3mNqAPRmmVfFGpUunmIch8ydBare3OfIyMocNpwAw", span: "md:col-start-4" },
              ].map((img, i) => (
                <div key={i} className={`relative group overflow-hidden rounded-3xl shadow-soft ${img.span}`}>
                  <Image 
                    src={img.src} 
                    alt={`Gallery ${i}`} 
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="text-white font-bold text-center text-xs sm:text-base">Shop the Look</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}