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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
            {products.map((product) => (
              <Link href={`/shop/${product.slug}`} key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-oatmeal shadow-soft group-hover:shadow-float transition-all duration-500 ease-out">
                  
                  {/* Badge Stok */}
                  {product.stock === 0 && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-text-main text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm z-20 uppercase tracking-wide">
                      Sold Out
                    </div>
                  )}
                  {product.stock > 0 && product.stock < 5 && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm z-20 uppercase tracking-wide">
                      Low Stock
                    </div>
                  )}

                  {product.banner_image ? (
                     <Image
                        src={product.banner_image}
                        alt={product.name}
                        fill
                        className={`object-cover object-center transition-transform duration-700 group-hover:scale-110 ${product.stock === 0 ? 'grayscale' : ''}`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                     />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-soft/30">
                      <span className="material-symbols-outlined text-4xl sm:text-5xl">image</span>
                    </div>
                  )}

                  {/* Add to Cart Overlay Button */}
                  {product.stock > 0 && (
                    <button className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white text-text-main w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-20">
                        <span className="material-symbols-outlined text-[16px] sm:text-[20px]">add_shopping_cart</span>
                    </button>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-2.5 sm:mt-4 space-y-1 sm:space-y-1.5">
                   {/* Kategori Kecil */}
                   <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-text-soft/70 block">
                      {product.category_name || 'General'}
                   </span>
                   
                   <h3 className="text-sm sm:text-lg font-bold text-text-main group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                   </h3>
                   
                   <p className="text-primary font-bold text-sm sm:text-base">
                     Rp {Math.floor(product.price).toLocaleString('id-ID')}
                   </p>

                   {/* Varian Colors Indicator */}
                   {product.variants && product.variants.length > 0 && (
                     <div className="flex items-center gap-1 pt-0.5">
                        {product.variants.slice(0, 3).map((v, i) => (
                          <div 
                             key={i} 
                             className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-white shadow-sm bg-gray-300 ring-1 ring-black/5" 
                             title={v.color}
                          ></div>
                        ))}
                        {product.variants.length > 3 && (
                          <span className="text-[10px] sm:text-xs text-text-soft font-medium ml-0.5">
                            +{product.variants.length - 3}
                          </span>
                        )}
                     </div>
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