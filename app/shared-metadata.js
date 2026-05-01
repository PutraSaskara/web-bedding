/**
 * @type {import('next').Metadata}
 */

// Ganti dengan URL production Anda nanti
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';

// Gambar default yang akan muncul saat link di-share.
const ogImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM';

export const sharedMetadata = {
  metadataBase: new URL(siteUrl),
  
  // Title template — semua halaman akan ikut format ini
  title: {
    template: '%s | Ameskara Sprei',
    default: 'Ameskara Sprei - Sprei & Bedcover Premium Berkualitas Tinggi',
  },

  // Deskripsi utama (target 150-160 karakter)
  description: 'Ameskara menyediakan sprei, bedcover, dan perlengkapan tidur premium dengan bahan lembut, warna tidak mudah luntur, dan desain estetik untuk kenyamanan tidur Anda.',

  // Kata Kunci Utama untuk SEO
  keywords: [
    'sprei premium', 'bedcover', 'sprei aesthetic', 'sprei katun', 
    'sprei microtex', 'ameskara sprei', 'dekorasi kamar tidur', 'perlengkapan tidur',
    'sprei bali', 'sprei tidak luntur', 'sprei adem', 'bed linen indonesia',
    'sprei murah berkualitas', 'sprei set lengkap', 'bedcover set',
    'sprei fitted', 'bantal guling', 'sprei online', 'toko sprei online',
  ],

  // Robots directives
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verifikasi Google Search Console
  verification: {
    google: 'H43YzVymgos-IhyX8fgTIv8Avbpk4VHZUM5jpwx4Uiw',
  },

  // Alternates & Canonical (Akan diatur secara dinamis di layout.jsx)
  alternates: {
    canonical: './',
  },

  // Metadata untuk social media sharing (Open Graph)
  openGraph: {
    title: {
      template: '%s | Ameskara Sprei',
      default: 'Ameskara Sprei - Sprei & Bedcover Premium Berkualitas Tinggi',
    },
    description: 'Ameskara menyediakan sprei, bedcover, dan perlengkapan tidur premium dengan bahan lembut, warna tidak mudah luntur, dan desain estetik untuk kenyamanan tidur Anda.',
    siteName: 'Ameskara Sprei',
    url: siteUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Koleksi sprei premium Ameskara - bahan lembut dan warna tahan lama',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  // Metadata untuk Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | Ameskara Sprei',
      default: 'Ameskara Sprei - Sprei & Bedcover Premium',
    },
    description: 'Sprei, bedcover, dan perlengkapan tidur premium dengan bahan lembut dan desain estetik.',
    images: [ogImageUrl],
  },

  // Favicon & Icons
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/icons/favicon.ico'],
  },

  // Kategori website
  category: 'ecommerce',
};