import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Our Story | Nyamann Bedding",
  description: "The journey behind Nyamann Bedding. Sustainable comfort, rooted in nature.",
};

export default function OurStoryPage() {
  return (
    <div className="flex flex-col min-h-screen font-display text-text-main bg-background-light">
      
      {/* --- Top Navigation (Copy dari Home agar konsisten) --- */}
      {/* <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#f4f2f0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 text-text-main group cursor-pointer hover:opacity-80">
              <span className="material-symbols-outlined text-3xl text-primary">bed</span>
              <h2 className="text-xl font-bold tracking-tight">Nyamann</h2>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/shop" className="text-text-main text-sm font-medium hover:text-primary transition-colors">Shop Bedding</Link>
              <Link href="/our-story" className="text-primary text-sm font-bold transition-colors">Our Story</Link>
              <Link href="#" className="text-text-main text-sm font-medium hover:text-primary transition-colors">Journal</Link>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/shop" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-text-main">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </Link>
              <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-text-main">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-text-main">
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      <main className="flex-grow">
        
        {/* --- Hero Section (Simple & Elegant) --- */}
        <section className="relative py-20 lg:py-32 px-4 text-center bg-white">
            <div className="max-w-3xl mx-auto space-y-6">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">The Journey</span>
                <h1 className="text-4xl md:text-6xl font-black text-text-main leading-tight">
                    Rooted in Comfort, <br/> Inspired by Nature.
                </h1>
                <p className="text-lg md:text-xl text-text-soft leading-relaxed">
                    Kami percaya bahwa istirahat bukanlah kemewahan, melainkan kebutuhan. Nyamann hadir untuk mengembalikan kualitas tidur Anda melalui sentuhan alam.
                </p>
            </div>
        </section>

        {/* --- Image Banner --- */}
        <div className="w-full h-[400px] md:h-[600px] relative">
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM" 
                alt="Cozy Bedroom" 
                fill 
                className="object-cover"
                priority
            />
        </div>

        {/* --- Content Block 1: The Origin --- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-2 md:order-1 relative aspect-square bg-oatmeal rounded-2xl overflow-hidden shadow-soft">
                     <Image 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBV3l7I99e2VzFX6ZAqfVbbDOXsuz9UnrVtX38DyveEkqO5IThmVs0Xqm4whD0riQS0myJ2HDCb8FnvMxQZuk2_nO9f4czC_sNH6eH1hzdf_4BbqqP4hH1ONr3JMuAYx0CYj_z9aXvdjFVKYc9XAfA5kyP8eJ1yysL9KFbh4EYxlx_kKTMDOV9iioGrrps0kd6G0X9ERXpvAZfWxiTqRj0p6f4fWslg7yVvt1NdYleKw2-5RyVLncr5epVY8yEQJjItq7ct462-pI" 
                        alt="Fabric Details" 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                    <h2 className="text-3xl font-bold text-text-main">Berawal dari Keresahan</h2>
                    <p className="text-text-soft leading-relaxed">
                        Di tengah hiruk pikuk kehidupan modern, kami menyadari bahwa kamar tidur seringkali menjadi tempat terakhir yang diperhatikan. Sprei yang panas, bahan sintetis yang kasar, dan desain yang membosankan membuat tidur menjadi sekadar rutinitas.
                    </p>
                    <p className="text-text-soft leading-relaxed">
                        <strong className="text-text-main">Nyamann</strong> lahir di Bali, terinspirasi oleh konsep <em>"Slow Living"</em>. Kami ingin membawa ketenangan suasana liburan ke dalam kamar tidur Anda setiap hari. Nama "Nyamann" sendiri diambil dari kata "Nyaman", janji sederhana kami untuk Anda.
                    </p>
                </div>
            </div>
        </section>

        {/* --- Content Block 2: The Craft (Reversed) --- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-text-main">100% Linen Organik</h2>
                    <p className="text-text-soft leading-relaxed">
                        Kami tidak berkompromi soal bahan. Sprei kami terbuat dari 100% serat Flax Eropa pilihan yang diproses secara berkelanjutan. 
                    </p>
                    <ul className="space-y-4 mt-4">
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <span className="text-text-soft"><strong>Stone-Washed:</strong> Teknik pencucian khusus menggunakan batu apung untuk menghasilkan tekstur super lembut sejak pemakaian pertama.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <span className="text-text-soft"><strong>Hypoallergenic:</strong> Aman untuk kulit sensitif dan bayi, anti bakteri alami, dan memiliki sirkulasi udara yang sangat baik.</span>
                        </li>
                    </ul>
                </div>
                <div className="relative aspect-square bg-oatmeal rounded-2xl overflow-hidden shadow-soft">
                     <Image 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlnNivZ3MpYCCGKtoKEhH6DTzYqRD3CCR8FowveK84qNRInnjmpi80Xl5Y53CW076KdswiKVG6GDfn_eIC69zEKvnsklDaITRbtzRZFbC4E0o-WoEK7oEKD2uRBZsi--uhCdekmEVZRuhqo2VKK9KJv4SBYDutXkRzaYN9FG2xUSG8ae_lcD-06f5irrA493WYzWpDwgy6o38bF_Bl9tJTMKpap0sih6SNLDBk4X-I6-E7LLtbvbci5znWPwmYnrmh8zNS73t1PHI" 
                        alt="Linen Texture" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
        </section>

        {/* --- Values Grid --- */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto text-center">
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-text-main">Our Core Values</h2>
                <p className="text-text-soft mt-2">Prinsip yang kami pegang dalam setiap helai benang.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-[#f4f2f0] rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                        <span className="material-symbols-outlined text-3xl">eco</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Sustainability First</h3>
                    <p className="text-text-soft text-sm leading-relaxed">
                        Kami menggunakan kemasan bebas plastik (cassava bag) dan memastikan proses produksi yang minim limbah.
                    </p>
                </div>
                <div className="p-8 bg-[#f4f2f0] rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                        <span className="material-symbols-outlined text-3xl">handshake</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Fair Trade</h3>
                    <p className="text-text-soft text-sm leading-relaxed">
                        Bekerja sama langsung dengan pengrajin lokal dengan upah yang adil dan lingkungan kerja yang aman.
                    </p>
                </div>
                <div className="p-8 bg-[#f4f2f0] rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                        <span className="material-symbols-outlined text-3xl">all_inclusive</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Made to Last</h3>
                    <p className="text-text-soft text-sm leading-relaxed">
                        Produk kami didesain untuk bertahan bertahun-tahun, bukan sekadar tren musiman yang cepat rusak.
                    </p>
                </div>
            </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-20 bg-primary text-white text-center px-4">
             <div className="max-w-2xl mx-auto space-y-8">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight">Siap untuk tidur lebih nyenyak?</h2>
                 <p className="text-white/90 text-lg">Rasakan perbedaan tidur dengan linen organik hari ini.</p>
                 <Link href="/shop" className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                    Shop Collection
                 </Link>
             </div>
        </section>

      </main>
    </div>
  );
}