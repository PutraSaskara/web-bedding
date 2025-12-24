import Link from 'next/link';
import Image from 'next/image';

// --- Fetch Articles ---
async function getArticles() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.WEB_API_KEY;

  try {
    // Asumsi endpoint public artikel adalah /articles/public
    // Jika endpoint kamu berbeda (misal /articles saja), sesuaikan url ini
    const res = await fetch(`${API_URL}/articles/public`, { 
      headers: { 'X-Api-Key': API_KEY || '' },
      cache: 'no-store' 
    });

    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Gagal fetch artikel:", error);
    return [];
  }
}

export const metadata = {
  title: "Journal | Nyamann Bedding",
  description: "Tips tidur nyenyak, inspirasi dekorasi kamar, dan cerita tentang linen.",
};

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
        <section className="bg-white py-16 px-4 text-center border-b border-gray-100">
            <h1 className="text-4xl md:text-5xl font-black text-text-main mb-4">The Journal</h1>
            <p className="text-text-soft text-lg max-w-2xl mx-auto">
                Eksplorasi ide dekorasi, tips perawatan linen, dan panduan untuk tidur yang lebih berkualitas.
            </p>
        </section>

        {/* Article Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article) => (
                        <Link href={`/journal/${article.slug}`} key={article.id} className="group flex flex-col h-full">
                            {/* Image */}
                            <div className="relative aspect-[4/3] w-full bg-oatmeal rounded-2xl overflow-hidden mb-5 shadow-sm group-hover:shadow-float transition-all duration-300">
                                {article.thumbnail ? (
                                    <Image 
                                        src={article.thumbnail} 
                                        alt={article.title} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-text-soft/30">
                                        <span className="material-symbols-outlined text-5xl">article</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-text-main">
                                    {article.category_name || 'Blog'}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                <div className="text-xs text-text-soft font-medium mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    {formatDate(article.created_at)}
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-text-soft text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-1 text-primary text-sm font-bold group-hover:gap-2 transition-all">
                                    Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-4xl text-gray-400">ink_pen</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-main">Belum ada artikel</h3>
                    <p className="text-text-soft mt-2">Cek kembali nanti untuk update terbaru.</p>
                </div>
            )}
        </section>

      </main>
    </div>
  );
}