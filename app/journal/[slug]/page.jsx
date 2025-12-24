import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ArticleRenderer from '../components/ArticleRenderer';
import ArticleShare from '../components/ArticleShare';

// --- Fetch Detail Article ---
async function getArticleDetail(slug) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.WEB_API_KEY;

  try {
    const res = await fetch(`${API_URL}/articles/public/${slug}`, {
      headers: { 'X-Api-Key': API_KEY || '' },
      cache: 'no-store'
    });

    if (!res.ok) return null;
    const json = await res.json();
    const article = json.data;

    // Parsing Content JSON string -> Object
    if (typeof article.content === 'string') {
        try {
            article.content = JSON.parse(article.content);
        } catch (e) {
            article.content = {};
        }
    }
    return article;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const article = await getArticleDetail(params.slug);
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | Nyamann Journal`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }) {
  const article = await getArticleDetail(params.slug);

  if (!article) notFound();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="bg-white min-h-screen font-display text-text-main">
      <main>
          {/* Article Header */}
          <header className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {article.category_name || 'Blog'}
                  </span>
                  <span className="text-text-soft text-sm font-medium">
                      {formatDate(article.created_at)}
                  </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-text-main leading-tight mb-8">
                  {article.title}
              </h1>

              {/* Cover Image */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-oatmeal shadow-soft">
                  {article.thumbnail ? (
                      <Image 
                        src={article.thumbnail} 
                        alt={article.title} 
                        fill 
                        className="object-cover"
                        priority
                      />
                  ) : (
                      <div className="flex items-center justify-center h-full text-text-soft/30">No Cover Image</div>
                  )}
              </div>
          </header>

          {/* Article Content */}
          <article className="max-w-3xl mx-auto px-4 pb-20">
              {/* Render Blocks from Editor.js */}
              <ArticleRenderer content={article.content} />
          </article>

         {/* Share / Footer Section */}
          <div className="max-w-3xl mx-auto px-4 pb-24 border-t border-gray-100 pt-8 text-center">
              <p className="text-text-soft italic mb-6">Suka dengan artikel ini? Bagikan yuk!</p>
              
              {/* --- 2. GANTI DUMMY BUTTONS DENGAN KOMPONEN INI --- */}
              <ArticleShare title={article.title} />
              
          </div>

      </main>
    </div>
  );
}