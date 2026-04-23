import Link from 'next/link';
import Image from 'next/image';
import ShopControls from './components/ShopControls';

// --- FETCH FUNCTIONS ---

// 1. Fetch Kategori
async function getCategories() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    return res.ok ? await res.json() : [];
  } catch (e) {
    console.error("Gagal fetch kategori:", e);
    return [];
  }
}

// 2. Fetch Produk (Dengan Search, Filter, & Password API Key)
async function getPublicProducts(search, category, page) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.WEB_API_KEY; // Ambil Password API

  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  params.set('page', page);
  params.set('limit', 12); // Tampilkan 12 produk per grid

  try {
    const res = await fetch(`${API_URL}/products/public?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY || '' // <--- INI PASSWORDNYA
      },
      cache: 'no-store'
    });

    if (!res.ok) return { data: [], pagination: {} };

    const responseJson = await res.json();
    let productsList = responseJson.data || [];
    
    // Parsing Variants (Sama seperti di admin)
    productsList = productsList.map(product => {
        if (typeof product.variants === 'string') {
            try { product.variants = JSON.parse(product.variants); } catch (e) { product.variants = []; }
        }
        return product;
    });

    return { data: productsList, pagination: responseJson.pagination || {}, suggestion: responseJson.suggestion || null };

  } catch (e) {
    console.error("Gagal fetch produk:", e);
    return { data: [], pagination: {} };
  }
}

// --- HALAMAN UTAMA ---

export default async function ShopPage({ searchParams }) {
  const search = searchParams?.search || '';
  const category = searchParams?.category || '';
  const page = Number(searchParams?.page) || 1;

  // Fetch Paralel (Lebih cepat)
  const [categories, productResult] = await Promise.all([
    getCategories(),
    getPublicProducts(search, category, page)
  ]);

const { data: products, pagination, suggestion } = productResult;

  return (
    <div className="bg-background-light min-h-screen font-display text-text-main">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-16 sm:pb-24">
        
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main mb-2 sm:mb-4 tracking-tight drop-shadow-sm">
            Shop the Collection
          </h1>
          <p className="text-text-soft max-w-xl mx-auto text-sm sm:text-lg leading-relaxed">
            Temukan kenyamanan tidur terbaik dengan koleksi sprei berbahan organik dan ramah lingkungan.
          </p>
        </div>

        {/* Controls (Search & Filter) */}
        {/* Controls (Search & Filter) */}
        <ShopControls 
          categories={categories} 
          initialSearch={search}     // <--- Tambahkan ini
          initialCategory={category} // <--- Tambahkan ini
        />

        {/* Product Grid */}
        {products.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center bg-white rounded-2xl shadow-soft border border-white px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
             <span className="material-symbols-outlined text-3xl sm:text-4xl text-gray-300">search_off</span>
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-text-main">Produk tidak ditemukan</h3>
          
          {/* --- FITUR SUGGESTION --- */}
          {suggestion ? (
             <div className="mt-2 text-base sm:text-lg">
                <p className="text-text-soft">Apakah maksud Anda:</p>
                <Link 
                   href={`/shop?search=${encodeURIComponent(suggestion)}`}
                   className="text-primary font-bold text-lg sm:text-xl hover:underline mt-1 block"
                >
                   &ldquo;{suggestion}&rdquo;
                </Link>
             </div>
          ) : (
             <p className="text-text-soft mt-1 text-sm sm:text-base">Coba ganti kata kunci atau filter kategori Anda.</p>
          )}
          {/* ------------------------ */}

          <Link href="/shop" className="mt-4 sm:mt-6 text-gray-500 font-bold hover:text-text-main hover:underline flex items-center gap-1 text-sm sm:text-base">
             Reset Filter <span className="material-symbols-outlined text-sm">refresh</span>
          </Link>
       </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
            {products.map((product) => (
              <Link href={`/shop/${product.slug}`} key={product.id} className="group cursor-pointer bg-white rounded-lg sm:rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
                {/* Image Container — Square like Shopee */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                  
                  {/* Badge Stok */}
                  {product.stock === 0 && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-black/70 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded z-20 uppercase">
                      Habis
                    </div>
                  )}
                  {product.stock > 0 && product.stock < 5 && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-primary text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded z-20">
                      Sisa {product.stock}
                    </div>
                  )}

                  {product.banner_image ? (
                     <Image
                        src={product.banner_image}
                        alt={product.name}
                        fill
                        className={`object-cover object-center transition-transform duration-500 group-hover:scale-105 ${product.stock === 0 ? 'grayscale opacity-70' : ''}`}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                     />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                      <span className="material-symbols-outlined text-3xl sm:text-4xl">image</span>
                    </div>
                  )}
                </div>

                {/* Product Info — Compact like Shopee */}
                <div className="p-2 sm:p-3">
                   <h3 className="text-xs sm:text-sm text-text-main line-clamp-1 leading-snug mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                   </h3>
                   
                   <p className="text-primary font-bold text-sm sm:text-base">
                     Rp {Math.floor(product.price).toLocaleString('id-ID')}
                   </p>

                   {/* Variants count */}
                   {product.variants && product.variants.length > 0 && (
                     <p className="text-[10px] sm:text-xs text-text-soft mt-1">
                       {product.variants.length} warna
                     </p>
                   )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-10 sm:mt-16 flex justify-center items-center gap-2 sm:gap-4">
             {pagination.hasPrevPage ? (
                <Link href={`/shop?page=${pagination.currentPage - 1}&search=${search}&category=${category}`}
                  className="flex items-center gap-1 px-3 sm:px-5 py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm font-bold text-text-main hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-xs sm:text-sm">arrow_back</span> <span className="hidden sm:inline">Prev</span>
                </Link>
             ) : (
                <span className="flex items-center gap-1 px-3 sm:px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs sm:text-sm font-bold text-gray-300 cursor-not-allowed">
                    <span className="material-symbols-outlined text-xs sm:text-sm">arrow_back</span> <span className="hidden sm:inline">Prev</span>
                </span>
             )}
             
             <span className="text-xs sm:text-sm font-bold text-text-soft">
                Page <span className="text-text-main">{pagination.currentPage}</span> of {pagination.totalPages}
             </span>

             {pagination.hasNextPage ? (
                <Link href={`/shop?page=${pagination.currentPage + 1}&search=${search}&category=${category}`}
                  className="flex items-center gap-1 px-3 sm:px-5 py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm font-bold text-text-main hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  <span className="hidden sm:inline">Next</span> <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </Link>
             ) : (
                <span className="flex items-center gap-1 px-3 sm:px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs sm:text-sm font-bold text-gray-300 cursor-not-allowed">
                    <span className="hidden sm:inline">Next</span> <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </span>
             )}
          </div>
        )}

      </main>
    </div>
  );
}