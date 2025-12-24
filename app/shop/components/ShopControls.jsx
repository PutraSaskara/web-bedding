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
    setCategory(newCategory);
    applyFilters(search, newCategory);
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
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="flex-1 relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>
        <input 
          type="text" 
          placeholder="Cari nama produk..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isDebouncing && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="w-full md:w-64 relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          filter_list
        </span>
        <select 
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-white cursor-pointer"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          expand_more
        </span>
      </div>
    </div>
  );
}