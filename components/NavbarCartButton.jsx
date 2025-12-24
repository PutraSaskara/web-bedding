'use client';

import useCartStore from '../store/useCartStore';
import { useState, useEffect } from 'react';

export default function NavbarCartButton() {
  const openCart = useCartStore((state) => state.openCart);
  const cart = useCartStore((state) => state.cart);
  const [hasHydrated, setHasHydrated] = useState(false);
  
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <button 
      onClick={openCart} 
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white"
    >
        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
        {hasHydrated && totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                {totalItems}
            </span>
        )}
    </button>
  );
}