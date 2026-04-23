'use client';

import useCartStore from '../store/useCartStore';
import { useEffect, useState } from 'react';

export default function FloatingCart() {
  const openCart = useCartStore((state) => state.openCart);
  const cart = useCartStore((state) => state.cart);
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated || totalItems === 0) return null;

  return (
    <button
      onClick={openCart}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-text-main text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center gap-2 group animate-bounce-subtle safe-bottom"
    >
      <div className="relative">
        <span className="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
        <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-primary text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-text-main">
          {totalItems}
        </span>
      </div>
      <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm sm:text-base">
        View Cart
      </span>
    </button>
  );
}