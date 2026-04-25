export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.WEB_API_KEY;

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
  ];

  // Dynamic: Product pages
  let productPages = [];
  try {
    const res = await fetch(`${API_URL}/products/public?limit=100`, {
      headers: { 'X-Api-Key': API_KEY || '' },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const products = json.data || [];
      productPages = products.map((product) => ({
        url: `${siteUrl}/shop/${product.slug}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch products', e);
  }

  // Dynamic: Journal/Article pages
  let articlePages = [];
  try {
    const res = await fetch(`${API_URL}/articles/public`, {
      headers: { 'X-Api-Key': API_KEY || '' },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const articles = json.data || [];
      articlePages = articles.map((article) => ({
        url: `${siteUrl}/journal/${article.slug}`,
        lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch articles', e);
  }

  return [...staticPages, ...productPages, ...articlePages];
}
