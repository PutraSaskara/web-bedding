'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce'; // Pastikan install: npm install use-debounce

export default function ShopControls({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil state awal dari URL
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [text, setText] = useState(initialSearch);
  const [query] = useDebounce(text, 500); // Delay search 500ms
  const [category, setCategory] = useState(initialCategory);

  // Effect: Update URL saat search text berubah (setelah debounce)
  useEffect(() => {
    // Hanya update jika query berbeda dari initial untuk mencegah loop/refresh yang tidak perlu
    if (query !== initialSearch) {
      updateParams(query, category);
    }
  }, [query]);

  // Handler: Klik Kategori
  const handleCategoryChange = (newCatSlug) => {
    // Jika klik kategori yang sama, unselect (hapus filter). Jika beda, set baru.
    const nextCategory = newCatSlug === category ? '' : newCatSlug;
    setCategory(nextCategory);
    updateParams(text, nextCategory);
  };

  // Fungsi Update URL
  const updateParams = (searchText, catSlug) => {
    const params = new URLSearchParams();
    if (searchText) params.set('search', searchText);
    if (catSlug) params.set('category', catSlug);
    params.set('page', '1'); // Selalu reset ke halaman 1 saat filter berubah
    
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-8 mb-12">
      {/* 1. Search Bar */}
      <div className="relative max-w-lg mx-auto w-full group">
        <input
          type="text"
          placeholder="Cari sprei, bedcover..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-white border-transparent rounded-full py-3.5 pl-12 pr-4 shadow-soft text-text-main placeholder:text-text-soft focus:ring-2 focus:ring-primary focus:border-transparent transition-all group-hover:shadow-float"
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-soft group-focus-within:text-primary transition-colors">
          search
        </span>
      </div>

      {/* 2. Category Pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {/* Tombol 'All' */}
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
            category === ''
              ? 'bg-text-main text-white border-text-main shadow-md transform scale-105'
              : 'bg-white text-text-soft border-transparent hover:border-gray-200 hover:shadow-sm'
          }`}
        >
          All
        </button>

        {/* List Kategori dari API */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
              category === cat.slug
                ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                : 'bg-white text-text-soft border-transparent hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}