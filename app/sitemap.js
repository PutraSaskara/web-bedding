export default async function sitemap() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';
  const siteUrl = rawSiteUrl.replace(/\/+$/, '');
  const rawApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
  const API_URL = rawApiUrl.replace(/\/+$/, '');
  const API_KEY = process.env.WEB_API_KEY || process.env.NEXT_PUBLIC_WEB_API_KEY || '';

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/our-story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const reqHeaders = {};
  if (API_KEY) reqHeaders['X-Api-Key'] = API_KEY;

  // Dynamic: Product pages (Filter hanya produk dengan slug valid)
  let productPages = [];
  try {
    const res = await fetch(`${API_URL}/products/public?limit=1000`, {
      headers: reqHeaders,
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const products = json.data || (Array.isArray(json) ? json : []);
      productPages = products
        .filter((product) => product && product.slug && typeof product.slug === 'string' && product.slug.trim() !== '')
        .map((product) => {
          const rawDate = product.updated_at || product.created_at;
          const parsedDate = rawDate ? new Date(rawDate) : new Date();
          const lastModified = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
          return {
            url: `${siteUrl}/shop/${encodeURIComponent(product.slug.trim())}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
          };
        });
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch products', e);
  }

  // Dynamic: Journal/Article pages (Filter hanya artikel dengan slug valid)
  let articlePages = [];
  try {
    const res = await fetch(`${API_URL}/articles/public`, {
      headers: reqHeaders,
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const articles = json.data || (Array.isArray(json) ? json : []);
      articlePages = articles
        .filter((article) => article && article.slug && typeof article.slug === 'string' && article.slug.trim() !== '')
        .map((article) => {
          const rawDate = article.updated_at || article.created_at;
          const parsedDate = rawDate ? new Date(rawDate) : new Date();
          const lastModified = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
          return {
            url: `${siteUrl}/journal/${encodeURIComponent(article.slug.trim())}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
          };
        });
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch articles', e);
  }

  return [...staticPages, ...productPages, ...articlePages];
}
