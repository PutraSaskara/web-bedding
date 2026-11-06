export default function robots() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';
  const siteUrl = rawSiteUrl.replace(/\/+$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/checkout'],
      },
      // Generative Engine Optimization (GEO): Izinkan Bot AI untuk Mengindeks & Mengutip
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/api/', '/checkout'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
