// lib/seo.js
// Utility untuk mengambil metadata SEO & GEO dinamis dari backend dengan fallback aman

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';
export const SITE_URL = rawSiteUrl.replace(/\/+$/, '');

const rawApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
export const API_URL = rawApiUrl.replace(/\/+$/, '');

const DEFAULT_OG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM';

export async function getSeoMetadata(pageKey, fallbackTitle, fallbackDescription, path = '') {
  const defaultCanonical = `${SITE_URL}${path}`;
  let data = null;

  try {
    const res = await fetch(`${API_URL}/seo/public/${pageKey}`, {
      next: { revalidate: 3600 }, // Caching 1 jam di level server/edge
    });
    if (res.ok) {
      const json = await res.json();
      data = json.data;
    }
  } catch (e) {
    // Fallback otomatis jika backend sedang offline
  }

  const title = data?.title || fallbackTitle;
  const description = data?.description || fallbackDescription;
  const keywords = data?.keywords
    ? data.keywords.split(',').map((k) => k.trim())
    : ['sprei premium', 'bedcover bali', 'sprei katun', 'ameskara sprei'];
  const canonicalUrl = data?.canonical_url || defaultCanonical;
  const ogImage = data?.og_image || DEFAULT_OG_IMAGE;

  const geoRegion = data?.geo_region || 'ID-BA';
  const geoPlacename = data?.geo_placename || 'Denpasar, Bali';
  const geoPosition = data?.geo_position || '-8.6705;115.2126';
  const icbm = data?.icbm || '-8.6705, 115.2126';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Ameskara Sprei Bali',
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    // Meta GEO Tag (Local SEO Bali)
    other: {
      'geo.region': geoRegion,
      'geo.placename': geoPlacename,
      'geo.position': geoPosition,
      ICBM: icbm,
    },
    structured_data: data?.structured_data || null,
  };
}

// Skema LocalBusiness JSON-LD untuk Bali Storefront dengan Entity Verification (sameAs)
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: 'Ameskara Sprei Bed and Linen',
    alternateName: 'Ameskara Bali',
    url: SITE_URL,
    logo: `${SITE_URL}/logo1.png`,
    image: DEFAULT_OG_IMAGE,
    sameAs: [
      'https://www.instagram.com/ameskarasprei.id',
    ],
    description:
      'Toko sprei, bedcover, dan perlengkapan tidur premium berkonsep Slow Living di Bali. Melayani pengiriman ke seluruh Indonesia.',
    telephone: '+6285739287239',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Denpasar Selatan',
      addressLocality: 'Denpasar',
      addressRegion: 'Bali',
      postalCode: '80224',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.6705,
      longitude: 115.2126,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };
}

// Skema Semantik FAQPage JSON-LD untuk Generative Engine Optimization (GEO)
// Dikutip langsung oleh ChatGPT Search, Perplexity AI, dan Google AI Overviews
export function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Apakah sprei Ameskara luntur saat dicuci?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tidak luntur. Sprei Ameskara menggunakan teknologi disperse printing berkualitas tinggi yang mengikat zat warna ke serat kain secara mendalam sehingga warna tidak pudar dan motif tetap cerah setelah dicuci berkali-kali.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bahan apa yang digunakan pada sprei Ameskara?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ameskara menggunakan bahan katun dan microtex premium yang bertekstur halus, adem di kulit, tidak panas, dan memiliki sifat sirkulasi udara baik yang cocok untuk iklim tropis Indonesia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Berapa tinggi karet kasur sprei Ameskara?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Model sprei Ameskara adalah fitted sheet dengan karet elastis di 4 sudut, dirancang pas untuk ketebalan kasur standar 20 cm hingga 30 cm agar tidak mudah melorot saat tidur.',
        },
      },
      {
        '@type': 'Question',
        name: 'Dari mana sprei Ameskara dikirimkan dan bagaimana cara pesannya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Seluruh pesanan dikirimkan langsung dari Denpasar, Bali ke seluruh kota di Indonesia. Pemesanan dilakukan dengan memilih produk di website dan melanjutkan konfirmasi langsung via WhatsApp resmi.',
        },
      },
    ],
  };
}
