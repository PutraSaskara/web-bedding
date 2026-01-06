// app/shop/[slug]/page.jsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductView from './components/ProductView';
import ProductTabs from './components/ProductTabs';

// --- Fetch Detail Produk ---
async function getProductDetail(slug) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.WEB_API_KEY;

  try {
    const res = await fetch(`${API_URL}/products/public/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY || '' 
      },
      cache: 'no-store'
    });

    if (!res.ok) return null;
    
    const json = await res.json();
    
    // PERBAIKAN: Langsung return json karena backend mengirim object produk langsung
    return json; 
    
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

// --- Fetch Rekomendasi (Related Products) ---
async function getRelatedProducts() {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const API_KEY = process.env.WEB_API_KEY;
    try {
        const res = await fetch(`${API_URL}/products/public?limit=4`, {
            headers: { 'X-Api-Key': API_KEY || '' },
            next: { revalidate: 3600 } // Cache 1 jam agar ringan
        });
        const json = await res.json();
        return json.data || [];
    } catch (e) { return []; }
}

console.log("data getProductDetail", getProductDetail);

// --- Metadata SEO ---
export async function generateMetadata({ params }) {
  const product = await getProductDetail(params.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Nyamann Bedding`,
    description: product.meta_description || product.description?.substring(0, 160),
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

  console.log("data product", product);

  return (
    <div className="bg-background-light min-h-screen font-display text-text-main pb-20">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-sm text-text-soft mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-sm text-gray-300">chevron_right</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span className="material-symbols-outlined text-sm text-gray-300">chevron_right</span>
            <span className="text-text-main font-semibold truncate">{product.name}</span>
        </div>

        {/* --- PRODUCT MAIN SECTION --- */}
        {/* Komponen Client untuk Interaktivitas (Gambar, Varian, Cart) */}
        <ProductView product={product} />

        {/* --- DETAILS TABS / INFO (Static Content for Aesthetic) --- */}
        <ProductTabs />

        {/* --- RELATED PRODUCTS --- */}
        <div className="mt-32 border-t border-gray-200 pt-16">
            <div className="flex items-end justify-between mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">You May Also Like</h2>
                <Link href="/shop" className="text-primary font-bold hover:underline hidden sm:block">View All</Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts
                    .filter(p => p.id !== product.id) // Jangan tampilkan produk yang sedang dilihat
                    .slice(0, 4)
                    .map((relProduct) => (
                    <Link href={`/shop/${relProduct.slug}`} key={relProduct.id} className="group cursor-pointer">
                        <div className="relative aspect-[4/5] bg-oatmeal rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
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
                                    <span className="material-symbols-outlined text-4xl">image</span>
                                </div>
                            )}
                            
                            {/* Quick Add Button (Mobile hidden) */}
                            <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                                <button className="bg-white text-text-main hover:bg-primary hover:text-white p-2.5 rounded-full shadow-lg transition-colors">
                                    <span className="material-symbols-outlined text-[20px] block">add_shopping_cart</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <h3 className="font-bold text-text-main group-hover:text-primary transition-colors truncate text-base">
                                {relProduct.name}
                            </h3>
                            <p className="text-sm text-text-soft font-medium">
                                Rp {relProduct.price.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}