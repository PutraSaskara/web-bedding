'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ShopControls({ categories, initialSearch, initialCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State lokal untuk input
  const [search, setSearch] = useState(initialSearch || '');
  const [category, setCategory] = useState(initialCategory || '');
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Efek: Sinkronisasi State jika URL berubah (misal dari Navbar Search)
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || '';
    setSearch(currentSearch);
    setCategory(currentCategory);
  }, [searchParams]);

  // Handle Search Input (Debounce / Delay agar tidak refresh tiap ketik)
  useEffect(() => {
    // Jangan jalankan saat pertama load (menghindari double fetch)
    if (search === (searchParams.get('search') || '')) return;

    setIsDebouncing(true);
    const timeout = setTimeout(() => {
      applyFilters(search, category);
      setIsDebouncing(false);
    }, 500); // Tunggu 500ms setelah user berhenti mengetik

    return () => clearTimeout(timeout);
  }, [search]);

  // Handle Category Change (Langsung apply)
  const handleCategoryChange = (newCategory) => {
    const selected = category === newCategory ? '' : newCategory; // Toggle: klik lagi = deselect
    setCategory(selected);
    applyFilters(search, selected);
  };

  // Fungsi utama update URL
  const applyFilters = (s, c) => {
    const params = new URLSearchParams();
    if (s) params.set('search', s);
    if (c) params.set('category', c);
    
    // Reset ke halaman 1 setiap kali filter berubah
    params.set('page', '1');

    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
          search
        </span>
        <input 
          type="text" 
          placeholder="Cari nama produk..." 
          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isDebouncing && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
        )}
      </div>

      {/* Category Pills (Horizontally Scrollable) */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {/* "Semua" pill */}
        <button
          onClick={() => { setCategory(''); applyFilters(search, ''); }}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            category === ''
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-text-soft border border-gray-200 hover:border-gray-300 hover:text-text-main'
          }`}
        >
          Semua
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              category === cat.slug
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-text-soft border border-gray-200 hover:border-gray-300 hover:text-text-main'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}