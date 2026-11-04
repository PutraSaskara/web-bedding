import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ArticleRenderer from '../components/ArticleRenderer';
import ArticleShare from '../components/ArticleShare';

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const rawApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
  const API_URL = rawApiUrl.replace(/\/+$/, '');
  const API_KEY = process.env.WEB_API_KEY || process.env.NEXT_PUBLIC_WEB_API_KEY || '';

  const reqHeaders = {};
  if (API_KEY) reqHeaders['X-Api-Key'] = API_KEY;

  try {
    const res = await fetch(`${API_URL}/articles/public`, {
      headers: reqHeaders,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const articles = json.data || (Array.isArray(json) ? json : []);
    return articles
      .filter((a) => a && a.slug && typeof a.slug === 'string' && a.slug.trim() !== '')
      .map((a) => ({ slug: a.slug.trim() }));
  } catch (e) {
    return [];
  }
}

// --- Fetch Detail Article ---
async function getArticleDetail(slug) {
  if (!slug) return null;
  const rawApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
  const API_URL = rawApiUrl.replace(/\/+$/, '');
  const API_KEY = process.env.WEB_API_KEY || process.env.NEXT_PUBLIC_WEB_API_KEY || '';

  const reqHeaders = {};
  if (API_KEY) reqHeaders['X-Api-Key'] = API_KEY;

  try {
    const res = await fetch(`${API_URL}/articles/public/${encodeURIComponent(slug)}`, {
      headers: reqHeaders,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const article = json.data;

    // Parsing Content JSON string -> Object
    if (typeof article?.content === 'string') {
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
  
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';
  const siteUrl = rawSiteUrl.replace(/\/+$/, '');
  const articleUrl = `${siteUrl}/journal/${encodeURIComponent(article.slug)}`;
  return {
    title: `${article.title} | Ameskara Journal`,
    description: article.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: `${article.title} | Ameskara Journal`,
      description: article.excerpt,
      url: articleUrl,
      type: 'article',
      images: article.thumbnail ? [article.thumbnail] : [],
    },
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
          <header className="max-w-4xl mx-auto px-4 pt-8 sm:pt-16 pb-4 sm:pb-8 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                  <span className="bg-primary/10 text-primary px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                      {article.category_name || 'Blog'}
                  </span>
                  <span className="text-text-soft text-xs sm:text-sm font-medium">
                      {formatDate(article.created_at)}
                  </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-text-main leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
                  {article.title}
              </h1>

              {/* Cover Image */}
              <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-oatmeal shadow-soft">
                  {article.thumbnail ? (
                      <Image 
                        src={article.thumbnail} 
                        alt={article.title} 
                        fill 
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="object-cover"
                        priority
                      />
                  ) : (
                      <div className="flex items-center justify-center h-full text-text-soft/30">No Cover Image</div>
                  )}
              </div>
          </header>

          {/* Article Content */}
          <article className="max-w-3xl mx-auto px-4 pb-12 sm:pb-20">
              {/* Render Blocks from Editor.js */}
              <ArticleRenderer content={article.content} />
          </article>

         {/* Share / Footer Section */}
          <div className="max-w-3xl mx-auto px-4 pb-16 sm:pb-24 border-t border-gray-100 pt-6 sm:pt-8 text-center">
              <p className="text-text-soft italic mb-4 sm:mb-6 text-sm sm:text-base">Suka dengan artikel ini? Bagikan yuk!</p>
              
              {/* --- 2. GANTI DUMMY BUTTONS DENGAN KOMPONEN INI --- */}
              <ArticleShare title={article.title} />
              
          </div>

      </main>
    </div>
  );
}