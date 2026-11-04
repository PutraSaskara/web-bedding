// app/shop/[slug]/page.jsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductView from './components/ProductView';
import ProductTabs from './components/ProductTabs';
import { sharedMetadata } from '../../shared-metadata';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');
const rawApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
const API_URL = rawApiUrl.replace(/\/+$/, '');
const API_KEY = process.env.WEB_API_KEY || process.env.NEXT_PUBLIC_WEB_API_KEY || '';

export const dynamicParams = true;
export const revalidate = 3600; // ISR cache 1 jam

// Pre-render slug produk saat build agar bot bisa merayapi instan (<100ms)
export async function generateStaticParams() {
  const reqHeaders = {};
  if (API_KEY) reqHeaders['X-Api-Key'] = API_KEY;

  try {
    const res = await fetch(`${API_URL}/products/public?limit=100`, {
      headers: reqHeaders,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const products = json.data || (Array.isArray(json) ? json : []);
    return products
      .filter(p => p && p.slug && typeof p.slug === 'string' && p.slug.trim() !== '')
      .map(p => ({ slug: p.slug.trim() }));
  } catch (e) {
    console.error('generateStaticParams error:', e);
    return [];
  }
}

// --- Fetch Detail Produk ---
async function getProductDetail(slug) {
  if (!slug) return null;
  const reqHeaders = { 'Content-Type': 'application/json' };
  if (API_KEY) reqHeaders['X-Api-Key'] = API_KEY;

  try {
    const res = await fetch(`${API_URL}/products/public/${encodeURIComponent(slug)}`, {
      headers: reqHeaders,
      next: { revalidate: 3600 }, // Gunakan ISR daripada no-store untuk TTFB kencang
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

// --- Fetch Rekomendasi (Related Products) ---
async function getRelatedProducts() {
  const reqHeaders = {};
  if (API_KEY) reqHeaders['X-Api-Key'] = API_KEY;

  try {
    const res = await fetch(`${API_URL}/products/public?limit=4`, {
      headers: reqHeaders,
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) { return []; }
}

// --- Metadata SEO ---
export async function generateMetadata({ params }) {
  const product = await getProductDetail(params.slug);

  // Jika produk tidak ditemukan, berikan metadata default "Not Found"
  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan',
      description: 'Maaf, produk yang Anda cari tidak ada atau telah dihapus.',
    };
  }

  // Jika produk ditemukan, buat metadata yang kaya & dinamis
  const productUrl = `${siteUrl}/shop/${encodeURIComponent(product.slug)}`;
  const productDescription = product.meta_description || product.description?.substring(0, 160) || sharedMetadata.description;
  const rawImages = product.banner_image ? [product.banner_image] : sharedMetadata.openGraph.images.map(img => img.url);
  const productImages = rawImages.filter(img => typeof img === 'string' && img.startsWith('http'));

  return {
    // Title akan otomatis menjadi "Nama Produk | Ameskara Sprei"
    title: product.name,
    description: productDescription,

    // URL kanonis untuk menghindari duplikat konten di mata Google
    alternates: {
      canonical: productUrl,
    },

    // Metadata untuk social sharing (WhatsApp, Facebook, dll)
    openGraph: {
      ...sharedMetadata.openGraph,
      title: `${product.name} | Ameskara Sprei`,
      description: productDescription,
      url: productUrl,
      images: productImages.map(imgUrl => ({
        url: imgUrl,
        alt: `Gambar produk ${product.name}`,
      })),
    },

    // Metadata untuk Twitter Card
    twitter: {
      ...sharedMetadata.twitter,
      title: `${product.name} | Ameskara Sprei`,
      description: productDescription,
      images: productImages,
    },
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function ProductDetailPage({ params }) {
  // Fetch Paralel untuk performa lebih baik
  const [product, relatedProducts] = await Promise.all([
    getProductDetail(params.slug),
    getRelatedProducts()
  ]);

  if (!product) {
    notFound(); // Redirect ke halaman 404 Next.js
  }

  const productUrl = `${siteUrl}/shop/${encodeURIComponent(product.slug)}`;
  const rawImages = product.banner_image ? [product.banner_image] : [];
  const validImages = rawImages.filter(img => typeof img === 'string' && img.startsWith('http'));

  // JSON-LD Product Structured Data (Google Merchant & Search Rich Results)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.meta_description || '',
    image: validImages,
    url: productUrl,
    sku: `AMESKARA-${product.id}`,
    productID: String(product.id),
    brand: {
      '@type': 'Brand',
      name: 'Ameskara',
    },
    category: product.category_name || 'Sprei',
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'IDR',
      price: Number(product.price),
      priceValidUntil: '2028-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Ameskara Sprei',
      },
    },
  };

  // JSON-LD BreadcrumbList Structured Data
  const breadcrumbElements = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Shop',
      item: `${siteUrl}/shop`,
    },
  ];

  if (product.category_name) {
    breadcrumbElements.push({
      '@type': 'ListItem',
      position: 3,
      name: product.category_name,
      item: `${siteUrl}/shop?category=${encodeURIComponent(product.category_slug || '')}`,
    });
    breadcrumbElements.push({
      '@type': 'ListItem',
      position: 4,
      name: product.name,
      item: productUrl,
    });
  } else {
    breadcrumbElements.push({
      '@type': 'ListItem',
      position: 3,
      name: product.name,
      item: productUrl,
    });
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbElements,
  };

  return (
    <div className="bg-background-light min-h-screen font-display text-text-main pb-12 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* Breadcrumbs Navigation */}
        {/* Mobile: Simple back link */}
        <div className="sm:hidden mb-3">
          <Link href="/shop" className="inline-flex items-center gap-1 text-xs text-text-soft hover:text-primary transition-colors font-medium">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Kembali ke Shop
          </Link>
        </div>
        {/* Desktop: Full breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-text-soft mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-sm text-gray-300">chevron_right</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="material-symbols-outlined text-sm text-gray-300">chevron_right</span>
          <span className="text-text-main font-semibold">{product.name}</span>
        </div>

        {/* --- PRODUCT MAIN SECTION --- */}
        {/* Komponen Client untuk Interaktivitas (Gambar, Varian, Cart) */}
        <ProductView product={product} />

        {/* --- DETAILS TABS / INFO --- */}
        <ProductTabs description={product.description} />

        {/* --- RELATED PRODUCTS --- */}
        <div className="mt-16 sm:mt-32 border-t border-gray-200 pt-8 sm:pt-16">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-main tracking-tight">You May Also Like</h2>
            <Link href="/shop" className="text-primary font-bold hover:underline hidden sm:block text-sm">View All</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {relatedProducts
              .filter(p => p.id !== product.id) // Jangan tampilkan produk yang sedang dilihat
              .slice(0, 4)
              .map((relProduct) => (
                <Link href={`/shop/${relProduct.slug}`} key={relProduct.id} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] bg-oatmeal rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-4 shadow-sm group-hover:shadow-md transition-all">
                    {relProduct.banner_image ? (
                      <Image
                        src={relProduct.banner_image}
                        alt={relProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-soft/30">
                        <span className="material-symbols-outlined text-3xl sm:text-4xl">image</span>
                      </div>
                    )}

                    {/* Quick Add Button (Mobile hidden) */}
                    <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                      <button className="bg-white text-text-main hover:bg-primary hover:text-white p-2.5 rounded-full shadow-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px] block">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-bold text-text-main group-hover:text-primary transition-colors truncate text-sm sm:text-base">
                      {relProduct.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-soft font-medium">
                      Rp {Math.floor(relProduct.price).toLocaleString('id-ID')}
                    </p>
                  </div>
                </Link>
              ))}
          </div>

          {/* Mobile "View All" */}
          <div className="sm:hidden text-center mt-6">
            <Link href="/shop" className="inline-flex items-center gap-1 text-primary font-bold hover:underline text-sm">
              Lihat Semua Produk
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}