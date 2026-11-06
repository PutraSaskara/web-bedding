import Link from 'next/link';
import Image from 'next/image';

// --- Fetch Articles ---
async function getArticles() {
  const rawApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
  const API_URL = rawApiUrl.replace(/\/+$/, '');
  const API_KEY = process.env.WEB_API_KEY || process.env.NEXT_PUBLIC_WEB_API_KEY || '';

  const reqHeaders = {};
  if (API_KEY) reqHeaders['X-Api-Key'] = API_KEY;

  try {
    const res = await fetch(`${API_URL}/articles/public`, { 
      headers: reqHeaders,
      next: { revalidate: 3600 } 
    });

    if (!res.ok) return [];
    const json = await res.json();
    return json.data || (Array.isArray(json) ? json : []);
  } catch (error) {
    console.error("Gagal fetch artikel:", error);
    return [];
  }
}

import { getSeoMetadata } from '../../lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata(
    'journal',
    'Tips Tidur Nyenyak & Perawatan Sprei | Ameskara Journal',
    'Kumpulan panduan merawat kain sprei agar awet lembut, tips tidur nyenyak, dan inspirasi dekorasi kamar tidur estetik dari Ameskara Sprei Bali. Baca sekarang!',
    '/journal'
  );
}

export default async function JournalPage() {
  const articles = await getArticles();

  // Helper date formatter
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-display text-text-main bg-background-light">
      <main className="flex-grow">
        
        {/* Header Section */}
        <section className="bg-white py-10 sm:py-16 px-4 text-center border-b border-gray-100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main mb-2 sm:mb-4">The Journal</h1>
            <p className="text-text-soft text-sm sm:text-lg max-w-2xl mx-auto">
                Eksplorasi ide dekorasi, tips perawatan linen, dan panduan untuk tidur yang lebih berkualitas.
            </p>
        </section>

        {/* Article Grid */}
        <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                    {articles.map((article) => (
                        <Link href={`/journal/${article.slug}`} key={article.id} className="group flex flex-col h-full">
                            {/* Image */}
                            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-oatmeal rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-5 shadow-sm group-hover:shadow-float transition-all duration-300">
                                {article.thumbnail ? (
                                    <Image 
                                        src={article.thumbnail} 
                                        alt={article.title} 
                                        fill 
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-text-soft/30">
                                        <span className="material-symbols-outlined text-4xl sm:text-5xl">article</span>
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-text-main">
                                    {article.category_name || 'Blog'}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                <div className="text-[10px] sm:text-xs text-text-soft font-medium mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                                    <span className="material-symbols-outlined text-xs sm:text-sm">calendar_today</span>
                                    {formatDate(article.created_at)}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-text-main mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-text-soft text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 flex-1">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-bold group-hover:gap-2 transition-all">
                                    Read Article <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 sm:py-20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl sm:text-4xl text-gray-400">ink_pen</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-main">Belum ada artikel</h3>
                    <p className="text-text-soft mt-2 text-sm sm:text-base">Cek kembali nanti untuk update terbaru.</p>
                </div>
            )}
        </section>

      </main>
    </div>
  );
}