'use client';

import useCartStore from '../store/useCartStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity } = useCartStore();
  
  // State untuk menangani Hydration (agar tidak error saat load)
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  // Hitung Total
  const cartTotal = cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

  // Disable scroll body saat cart terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!hasHydrated || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      ></div>

      {/* Panel */}
      <div className="relative w-full max-w-[calc(100vw-40px)] sm:max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <h2 className="text-lg sm:text-xl font-black text-text-main flex items-center gap-2">
            Your Cart <span className="text-primary text-xs sm:text-sm font-normal">({cart.length} items)</span>
          </h2>
          <button onClick={closeCart} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">close</span>
          </button>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-text-soft">
              <span className="material-symbols-outlined text-5xl sm:text-6xl opacity-30">shopping_basket</span>
              <p className="text-base sm:text-lg">Keranjang kamu masih kosong.</p>
              <button onClick={closeCart} className="text-primary font-bold hover:underline text-sm sm:text-base">Mulai Belanja</button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex gap-3 sm:gap-4">
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 bg-oatmeal rounded-lg overflow-hidden border border-gray-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs">No Img</div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-text-main text-xs sm:text-sm line-clamp-2">{item.name}</h3>
                        <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500 flex-shrink-0">
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                    <div className="text-[10px] sm:text-xs text-text-soft mt-1 flex gap-1.5 sm:gap-2 flex-wrap">
                        {item.selectedVariant && <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{item.selectedVariant.color}</span>}
                        {item.selectedSize && <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">Size {item.selectedSize.size}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-primary text-xs sm:text-sm">Rp {Math.floor(Number(item.price)).toLocaleString('id-ID')}</p>
                    <div className="flex items-center border border-gray-200 rounded-lg h-7">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="px-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-sm" disabled={item.quantity <= 1}>-</button>
                        <span className="text-[10px] sm:text-xs font-bold px-1 w-5 sm:w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="px-2 hover:bg-gray-50 text-gray-600 text-sm">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
{/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 safe-bottom">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-text-soft font-medium text-sm sm:text-base">Subtotal</span>
              <span className="text-lg sm:text-xl font-black text-text-main">Rp {Math.floor(cartTotal).toLocaleString('id-ID')}</span>
            </div>
            
            {/* UBAH BAGIAN INI MENJADI LINK */}
            <Link 
              href="/checkout"
              onClick={closeCart} // Tutup drawer saat pindah halaman
              className="block w-full bg-primary hover:bg-primary-dark text-white py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-float transition-all hover:-translate-y-1 text-center active:scale-95"
            >
              Checkout Sekarang
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
}