/**
 * @type {import('next').Metadata}
 */

// Ganti dengan URL production Anda nanti
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskara.com';

// Gambar default yang akan muncul saat link di-share.
const ogImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQegTQD2FsuX7mGKrFx81pMj11kTf264Dvi4sb9Nu3PJx-ytkS7JHziIKdcFv89vORJvJXUMvJLHI9gR-kPIFjv1twO6H-X7-Qa5csBVKLYCstMIAWovXKKyzw93pUehBnMyMP9yz9ws5SdJ-pR2WvozwTRJE004xziZbKuuiQJRsHN3OZom70phJ902bPD0i2ZcF2tvBCrO7rosCRtaHuNySAjpFqYhUF2yAvq4HXdI3dokAp1SWBvhZ63xeL1pAplJv8QhIW9IM';

export const sharedMetadata = {
  metadataBase: new URL(siteUrl),
  
  // Menggunakan title dan template dari layout Anda
  title: {
    template: '%s | Ameskara Sprei',
    default: 'Ameskara sprei bed and linen',
  },

  // Menggunakan deskripsi dari layout Anda
  description: 'Sustainable, soft-washed linen bedding.',

  // Kata Kunci Utama untuk SEO
  keywords: [
    'sprei', 'bedcover', 'sprei premium', 'sprei aesthetic', 'sprei katun', 
    'sprei microtex', 'ameskara sprei', 'dekorasi kamar tidur', 'perlengkapan tidur',
    'sprei bali', 'sprei tidak luntur', 'sprei adem', 'bed linen indonesia'
  ],

  // Untuk Google dan search engine lainnya
  robots: {
    index: true,
    follow: true,
  },

  // Metadata untuk social media sharing (Open Graph)
  openGraph: {
    title: {
      template: '%s | Ameskara Sprei',
      default: 'Ameskara sprei bed and linen',
    },
    description: 'Sustainable, soft-washed linen bedding.',
    siteName: 'Ameskara Sprei',
    url: siteUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Kamar tidur nyaman dengan sprei premium dari Ameskara',
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
      default: 'Ameskara sprei bed and linen',
    },
    description: 'Sustainable, soft-washed linen bedding.',
    images: [ogImageUrl],
  },

  // Menggunakan konfigurasi ikon detail dari layout Anda
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
};