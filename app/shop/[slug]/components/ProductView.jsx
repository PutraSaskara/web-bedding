'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import useCartStore from '../../../../store/useCartStore'; // <--- Import Store

export default function ProductView({ product }) {
  const addToCart = useCartStore((state) => state.addToCart); // <--- Ambil Action

  // 1. Parsing Variants
  const variants = Array.isArray(product.variants) 
    ? product.variants 
    : typeof product.variants === 'string' 
      ? JSON.parse(product.variants) 
      : [];
  
  const price = Number(product.price);

  // 2. State Utama
  const [activeImage, setActiveImage] = useState(product.banner_image);
  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0] : null);
  const [selectedSize, setSelectedSize] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // --- LOGIC LIGHTBOX GALLERY ---
  const allImages = useMemo(() => {
    const imgs = [product.banner_image];
    variants.forEach(v => {
      if (v.image && !imgs.includes(v.image)) {
        imgs.push(v.image);
      }
    });
    return imgs;
  }, [product, variants]);

  const currentImageIndex = allImages.indexOf(activeImage);

  const handleNextImage = (e) => {
    e?.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setActiveImage(allImages[nextIndex]);
  };

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setActiveImage(allImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, currentImageIndex]);

  // --- LOGIC PRODUK UTAMA ---
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedSize(null);
    if (variant.image) {
      setActiveImage(variant.image);
    }
  };

  const handleSizeChange = (sizeObj) => {
      if (sizeObj.stock > 0) setSelectedSize(sizeObj);
  };

  const currentStock = selectedVariant && selectedVariant.sizes && selectedVariant.sizes.length > 0
      ? (selectedSize ? selectedSize.stock : 0)
      : product.stock;

  const isOutOfStock = currentStock === 0;
  const canAddToCart = selectedVariant && selectedVariant.sizes.length > 0 ? !!selectedSize : !isOutOfStock;

  // --- 2. FUNGSI HANDLE SHARE (BARU) ---
 const handleShare = async () => {
    const url = window.location.href;

    // 1. Coba Native Share (HP Android/iOS)
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Lihat ${product.name} yang nyaman ini!`,
          url: url,
        });
        return; // Jika sukses share native, stop.
      } catch (err) {
        // Jika user batal/cancel, tidak perlu error, lanjut aja.
        if (err.name !== 'AbortError') console.error('Share error:', err);
      }
    }

    // 2. Fallback: Copy to Clipboard (PC/Laptop)
    try {
      await navigator.clipboard.writeText(url);
      
      // Trigger Toast Notification
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hilang dalam 3 detik
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  // -------------------------------------

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* --- LEFT: IMAGE GALLERY --- */}
        <div className="flex flex-col gap-4">
          <div 
            className="relative aspect-[4/5] w-full bg-oatmeal rounded-2xl overflow-hidden shadow-soft group cursor-zoom-in"
            onClick={() => setIsModalOpen(true)}
          >
            {activeImage ? (
              <Image src={activeImage} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
            ) : (
               <div className="flex items-center justify-center h-full text-text-soft">No Image</div>
            )}
            <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               <span className="material-symbols-outlined text-text-main">zoom_in</span>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
             {allImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
             ))}
          </div>
        </div>

        {/* --- RIGHT: PRODUCT INFO --- */}
        <div className="flex flex-col justify-center relative"> {/* Tambahkan relative disini */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
            {product.category_name || 'Collection'}
          </span>
          {/* --- 3. TOMBOL SHARE (BARU) --- */}
             {/* TOMBOL SHARE YANG CLEAN */}
             <button 
                onClick={handleShare}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all text-text-soft hover:text-text-main"
                title="Bagikan Produk"
             >
                <span className="text-xs font-bold hidden group-hover:block transition-all">Share</span>
                <span className="material-symbols-outlined text-[20px]">ios_share</span>
             </button>
             </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-main mb-4 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-6 mb-6">
            <p className="text-2xl font-medium text-text-main">
              Rp {price.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="h-px w-full bg-gray-200 mb-8"></div>
          <div className="prose prose-sm text-text-soft mb-8">
            <p>{product.description}</p>
          </div>

            {/* ========================================= */}
      {/* 🚀 TOAST NOTIFICATION COMPONENT (POPUP) */}
      {/* ========================================= */}
      {/* Muncul di tengah bawah layar, fixed position */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] transition-all duration-300 transform ${
            showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[200px] justify-center backdrop-blur-sm bg-opacity-90">
           <div className="bg-green-500 rounded-full p-0.5">
             <span className="material-symbols-outlined text-base text-white font-bold">check</span>
           </div>
           <span className="font-medium text-sm">Link berhasil disalin!</span>
        </div>
      </div>

          <div className="space-y-6">
            {/* Color Selector */}
            {variants.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-text-main mb-3">
                  Select Color: <span className="font-normal text-text-soft">{selectedVariant?.color}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => handleVariantChange(v)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedVariant === v
                          ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                          : 'border-gray-200 text-text-main hover:border-gray-400'
                      }`}
                    >
                      {v.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {selectedVariant && selectedVariant.sizes && selectedVariant.sizes.length > 0 && (
               <div>
                  <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-text-main">Select Size</label>
                      <span className="text-xs text-text-soft font-medium cursor-pointer underline hover:text-primary">Size Guide</span>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {selectedVariant.sizes.map((s, idx) => {
                          const isAvailable = s.stock > 0;
                          const isSelected = selectedSize && selectedSize.size === s.size;
                          return (
                              <button
                                  key={idx}
                                  onClick={() => handleSizeChange(s)}
                                  disabled={!isAvailable}
                                  className={`
                                      py-3 rounded-lg border text-sm font-bold transition-all relative
                                      ${!isAvailable 
                                          ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed decoration-slice line-through' 
                                          : isSelected
                                              ? 'border-primary bg-primary text-white shadow-md transform scale-105'
                                              : 'border-gray-200 text-text-main hover:border-primary hover:text-primary bg-white'
                                      }
                                  `}
                              >
                                  {s.size}
                                  {isAvailable && isSelected && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm z-10 animate-in fade-in zoom-in duration-200">
                                        {s.stock}
                                    </span>
                                  )}
                              </button>
                          );
                      })}
                  </div>
                  {!selectedSize && <p className="text-xs text-red-500 mt-2 italic">* Please select a size</p>}
               </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border border-gray-300 rounded-xl h-14 w-full sm:w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-text-main hover:bg-gray-100 rounded-l-xl"
                  disabled={!canAddToCart}
                >
                  -
                </button>
                <input type="text" value={quantity} readOnly className="flex-1 w-full text-center border-none focus:ring-0 text-text-main font-bold bg-transparent" />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-text-main hover:bg-gray-100 rounded-r-xl"
                  disabled={!canAddToCart || quantity >= currentStock}
                >
                  +
                </button>
              </div>
              <button 
                disabled={!canAddToCart}
                onClick={() => addToCart(product, quantity, selectedVariant, selectedSize)} // <--- TRIGGER ZUSTAND
                className={`flex-1 h-14 rounded-xl font-bold text-lg shadow-float transition-all flex items-center justify-center gap-2 ${
                  !canAddToCart ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-1'
                }`}
              >
                Add to Cart {canAddToCart && <span className="material-symbols-outlined">shopping_bag</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      

      {/* --- MODAL / LIGHTBOX --- */}
      {isModalOpen && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
        >
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-[110]"
                onClick={() => setIsModalOpen(false)}
            >
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {allImages.length > 1 && (
                <button 
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-all z-[110]"
                    onClick={handlePrevImage}
                >
                    <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_left</span>
                </button>
            )}

            <div 
                className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center select-none"
                onClick={(e) => e.stopPropagation()}
            >
                 <Image src={activeImage} alt="Zoom" fill className="object-contain" quality={100} />
            </div>

            {allImages.length > 1 && (
                <button 
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-all z-[110]"
                    onClick={handleNextImage}
                >
                    <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_right</span>
                </button>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-4 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
            </div>
        </div>
      )}

    
    </>
  );
}

