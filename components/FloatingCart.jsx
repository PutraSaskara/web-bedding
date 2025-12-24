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
      className="fixed bottom-6 right-6 z-40 bg-text-main text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group animate-bounce-subtle"
    >
      <div className="relative">
        <span className="material-symbols-outlined text-2xl">shopping_cart</span>
        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-text-main">
          {totalItems}
        </span>
      </div>
      <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
        View Cart
      </span>
    </button>
  );
}