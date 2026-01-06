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
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-text-main mb-4 tracking-tight drop-shadow-sm">
            Shop the Collection
          </h1>
          <p className="text-text-soft max-w-xl mx-auto text-lg leading-relaxed">
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
           <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-soft border border-white">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
             <span className="material-symbols-outlined text-4xl text-gray-300">search_off</span>
          </div>
          
          <h3 className="text-xl font-bold text-text-main">Produk tidak ditemukan</h3>
          
          {/* --- FITUR SUGGESTION --- */}
          {suggestion ? (
             <div className="mt-2 text-lg">
                <p className="text-text-soft">Apakah maksud Anda:</p>
                <Link 
                   href={`/shop?search=${encodeURIComponent(suggestion)}`}
                   className="text-primary font-bold text-xl hover:underline mt-1 block"
                >
                   &ldquo;{suggestion}&rdquo;
                </Link>
             </div>
          ) : (
             <p className="text-text-soft mt-1">Coba ganti kata kunci atau filter kategori Anda.</p>
          )}
          {/* ------------------------ */}

          <Link href="/shop" className="mt-6 text-gray-500 font-bold hover:text-text-main hover:underline flex items-center gap-1">
             Reset Filter <span className="material-symbols-outlined text-sm">refresh</span>
          </Link>
       </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <Link href={`/shop/${product.slug}`} key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-oatmeal shadow-soft group-hover:shadow-float transition-all duration-500 ease-out">
                  
                  {/* Badge Stok */}
                  {product.stock === 0 && (
                    <div className="absolute top-3 left-3 bg-text-main text-white text-[10px] font-bold px-2 py-1 rounded-sm z-20 uppercase tracking-wide">
                      Sold Out
                    </div>
                  )}
                  {product.stock > 0 && product.stock < 5 && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm z-20 uppercase tracking-wide">
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
                      <span className="material-symbols-outlined text-5xl">image</span>
                    </div>
                  )}

                  {/* Add to Cart Overlay Button */}
                  {product.stock > 0 && (
                    <button className="absolute bottom-4 right-4 bg-white text-text-main w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-20">
                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    </button>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-4 space-y-1">
                   {/* Kategori Kecil */}
                   <span className="text-[10px] uppercase tracking-wider font-bold text-text-soft/70 block">
                      {product.category_name || 'General'}
                   </span>
                   
                   <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                   </h3>
                   
                   <div className="flex items-center justify-between pt-1">
                      <p className="text-text-main font-semibold">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                      
                      {/* Varian Colors Indicator */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="flex -space-x-1.5 pl-2">
                           {product.variants.slice(0, 3).map((v, i) => (
                             <div 
                                key={i} 
                                className="w-3.5 h-3.5 rounded-full border border-white shadow-sm bg-gray-300 ring-1 ring-black/5" 
                                title={v.color}
                                // Note: Karena warna di DB adalah string nama (Merah, Biru), 
                                // di real app kita butuh helper function untuk convert name -> hex code
                             ></div>
                           ))}
                           {product.variants.length > 3 && (
                             <div className="w-3.5 h-3.5 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[6px] text-gray-500 font-bold">
                               +
                             </div>
                           )}
                        </div>
                      )}
                   </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
             {pagination.hasPrevPage ? (
                <Link href={`/shop?page=${pagination.currentPage - 1}&search=${search}&category=${category}`}
                  className="flex items-center gap-1 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-text-main hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span> Prev
                </Link>
             ) : (
                <span className="flex items-center gap-1 px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-gray-300 cursor-not-allowed">
                    <span className="material-symbols-outlined text-sm">arrow_back</span> Prev
                </span>
             )}
             
             <span className="text-sm font-bold text-text-soft">
                Page <span className="text-text-main">{pagination.currentPage}</span> of {pagination.totalPages}
             </span>

             {pagination.hasNextPage ? (
                <Link href={`/shop?page=${pagination.currentPage + 1}&search=${search}&category=${category}`}
                  className="flex items-center gap-1 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-text-main hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
             ) : (
                <span className="flex items-center gap-1 px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-gray-300 cursor-not-allowed">
                    Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
             )}
          </div>
        )}

      </main>
    </div>
  );
}