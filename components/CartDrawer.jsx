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
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <h2 className="text-xl font-black text-text-main flex items-center gap-2">
            Your Cart <span className="text-primary text-sm font-normal">({cart.length} items)</span>
          </h2>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-text-soft">
              <span className="material-symbols-outlined text-6xl opacity-30">shopping_basket</span>
              <p className="text-lg">Keranjang kamu masih kosong.</p>
              <button onClick={closeCart} className="text-primary font-bold hover:underline">Mulai Belanja</button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative w-20 h-24 flex-shrink-0 bg-oatmeal rounded-lg overflow-hidden border border-gray-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs">No Img</div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-text-main text-sm line-clamp-2">{item.name}</h3>
                        <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500">
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                    <div className="text-xs text-text-soft mt-1 flex gap-2">
                        {item.selectedVariant && <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{item.selectedVariant.color}</span>}
                        {item.selectedSize && <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">Size {item.selectedSize.size}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-primary text-sm">Rp {Number(item.price).toLocaleString('id-ID')}</p>
                    <div className="flex items-center border border-gray-200 rounded-lg h-7">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="px-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50" disabled={item.quantity <= 1}>-</button>
                        <span className="text-xs font-bold px-1 w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="px-2 hover:bg-gray-50 text-gray-600">+</button>
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
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-soft font-medium">Subtotal</span>
              <span className="text-xl font-black text-text-main">Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            
            {/* UBAH BAGIAN INI MENJADI LINK */}
            <Link 
              href="/checkout"
              onClick={closeCart} // Tutup drawer saat pindah halaman
              className="block w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg shadow-float transition-all hover:-translate-y-1 text-center"
            >
              Checkout Sekarang
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
}