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
  
  const [activeImage, setActiveImage] = useState(product.banner_image);
  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0] : null);
  const [selectedSize, setSelectedSize] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const basePrice = Number(product.price);
  const price = selectedSize && selectedSize.price ? Number(selectedSize.price) : basePrice;

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
      if (e.key === 'Escape') {
        if (isModalOpen) setIsModalOpen(false);
        if (isSizeGuideOpen) setIsSizeGuideOpen(false);
      }
      if (!isModalOpen) return;
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    if (isModalOpen || isSizeGuideOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isSizeGuideOpen, currentImageIndex]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        
        {/* --- LEFT: IMAGE GALLERY --- */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div 
            className="relative aspect-square w-full lg:max-h-[500px] bg-oatmeal rounded-xl sm:rounded-2xl overflow-hidden shadow-soft group cursor-zoom-in"
            onClick={() => setIsModalOpen(true)}
          >
            {activeImage ? (
              <Image src={activeImage} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 500px" className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
            ) : (
               <div className="flex items-center justify-center h-full text-text-soft">No Image</div>
            )}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/80 p-1.5 sm:p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               <span className="material-symbols-outlined text-text-main text-[18px] sm:text-[24px]">zoom_in</span>
            </div>

            {/* Mobile swipe indicator */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
                {allImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${activeImage === img ? 'bg-white w-4' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
             {allImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill sizes="80px" className="object-cover" />
                </button>
             ))}
          </div>
        </div>

        {/* --- RIGHT: PRODUCT INFO --- */}
        <div className="flex flex-col justify-center relative"> {/* Tambahkan relative disini */}
        <div className="flex flex-col justify-center">
          <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-1 sm:mb-2">
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
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">ios_share</span>
             </button>
             </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-main mb-2 sm:mb-4 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-6 mb-4 sm:mb-6">
            <p className="text-xl sm:text-2xl font-medium text-text-main">
              Rp {Math.floor(price).toLocaleString('id-ID')}
            </p>
          </div>
          <div className="h-px w-full bg-gray-200 mb-6 sm:mb-8"></div>

            {/* ========================================= */}
      {/* 🚀 TOAST NOTIFICATION COMPONENT (POPUP) */}
      {/* ========================================= */}
      {/* Muncul di tengah bawah layar, fixed position */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] transition-all duration-300 transform ${
            showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-gray-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 sm:gap-3 min-w-[180px] sm:min-w-[200px] justify-center backdrop-blur-sm bg-opacity-90">
           <div className="bg-green-500 rounded-full p-0.5">
             <span className="material-symbols-outlined text-sm sm:text-base text-white font-bold">check</span>
           </div>
           <span className="font-medium text-xs sm:text-sm">Link berhasil disalin!</span>
        </div>
      </div>

          <div className="space-y-5 sm:space-y-6">
            {/* Color Selector */}
            {variants.length > 0 && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-text-main mb-2 sm:mb-3">
                  Select Color: <span className="font-normal text-text-soft">{selectedVariant?.color}</span>
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => handleVariantChange(v)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
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
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <label className="text-xs sm:text-sm font-bold text-text-main">Select Size</label>
                      <button 
                        type="button" 
                        onClick={() => setIsSizeGuideOpen(true)} 
                        className="text-[10px] sm:text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">straighten</span>
                        Size Guide
                      </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                      {selectedVariant.sizes.map((s, idx) => {
                          const isAvailable = s.stock > 0;
                          const isSelected = selectedSize && selectedSize.size === s.size;
                          return (
                              <button
                                  key={idx}
                                  onClick={() => handleSizeChange(s)}
                                  disabled={!isAvailable}
                                  className={`
                                      py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-bold transition-all relative
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
                                    <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[8px] sm:text-[10px] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm z-10 animate-in fade-in zoom-in duration-200">
                                        {s.stock}
                                    </span>
                                  )}
                              </button>
                          );
                      })}
                  </div>
                  {!selectedSize && <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 sm:mt-2 italic">* Please select a size</p>}
               </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="flex items-center border border-gray-300 rounded-xl h-12 sm:h-14 w-full sm:w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-text-main hover:bg-gray-100 rounded-l-xl text-lg"
                  disabled={!canAddToCart}
                >
                  -
                </button>
                <input type="text" value={quantity} readOnly className="flex-1 w-full text-center border-none focus:ring-0 text-text-main font-bold bg-transparent text-sm sm:text-base" />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-text-main hover:bg-gray-100 rounded-r-xl text-lg"
                  disabled={!canAddToCart || quantity >= currentStock}
                >
                  +
                </button>
              </div>
              <button 
                disabled={!canAddToCart}
                onClick={() => addToCart(product, quantity, selectedVariant, selectedSize)} // <--- TRIGGER ZUSTAND
                className={`flex-1 h-12 sm:h-14 rounded-xl font-bold text-base sm:text-lg shadow-float transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  !canAddToCart ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-1'
                }`}
              >
                Add to Cart {canAddToCart && <span className="material-symbols-outlined text-[20px] sm:text-[24px]">shopping_bag</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      

      {/* --- MODAL / LIGHTBOX --- */}
      {isModalOpen && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
        >
            <button 
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-1.5 sm:p-2 transition-all z-[110]"
                onClick={() => setIsModalOpen(false)}
            >
                <span className="material-symbols-outlined text-2xl sm:text-3xl">close</span>
            </button>

            {allImages.length > 1 && (
                <button 
                    className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-2 sm:p-3 transition-all z-[110]"
                    onClick={handlePrevImage}
                >
                    <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl">chevron_left</span>
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
                    className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-2 sm:p-3 transition-all z-[110]"
                    onClick={handleNextImage}
                >
                    <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl">chevron_right</span>
                </button>
            )}

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm">
                {currentImageIndex + 1} / {allImages.length}
            </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 📏 MODAL SIZE GUIDE (PANDUAN UKURAN KASUR) */}
      {/* ========================================= */}
      {isSizeGuideOpen && (
        <div 
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div 
            className="bg-white dark:bg-background-dark text-text-main dark:text-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative my-8 border border-gray-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-text-main dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              title="Tutup Panduan"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Modal Header */}
            <div className="mb-5 sm:mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl">straighten</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">Panduan Ukuran Sprei</h3>
              <p className="text-xs sm:text-sm text-text-soft mt-1">
                Sesuaikan pilihan ukuran dengan dimensi kasur tempat tidur Anda.
              </p>
            </div>

            {/* Sizing Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl mb-5">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 font-bold text-text-main">
                  <tr>
                    <th className="p-3">Ukuran</th>
                    <th className="p-3">Nama Standar</th>
                    <th className="p-3">Isi Set</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 font-bold text-primary">90 x 200 cm</td>
                    <td className="p-3">Single Small</td>
                    <td className="p-3 text-text-soft">1 Bantal + 1 Guling</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 font-bold text-primary">100 x 200 cm</td>
                    <td className="p-3">Super Single (No. 4)</td>
                    <td className="p-3 text-text-soft">1 Bantal + 1 Guling</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 font-bold text-primary">120 x 200 cm</td>
                    <td className="p-3">Single (No. 3)</td>
                    <td className="p-3 text-text-soft">1 Bantal + 1 Guling</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 font-bold text-primary">160 x 200 cm</td>
                    <td className="p-3">Queen (No. 2)</td>
                    <td className="p-3 text-text-soft">2 Bantal + 2 Guling</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 font-bold text-primary">180 x 200 cm</td>
                    <td className="p-3">King (No. 1)</td>
                    <td className="p-3 text-text-soft">2 Bantal + 2 Guling</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="p-3 font-bold text-primary">200 x 200 cm</td>
                    <td className="p-3">Extra King</td>
                    <td className="p-3 text-text-soft">2 Bantal + 2 Guling</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Information Notes */}
            <div className="bg-primary/5 rounded-xl p-3.5 sm:p-4 mb-5 space-y-2 border border-primary/10">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-text-main">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                <span><strong>Tinggi Kasur:</strong> Model <em>fitted sheet</em> dengan karet elastis di 4 sudut, pas untuk tinggi kasur 20–30 cm.</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-text-main">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">help</span>
                <span><strong>Bingung Ukuran?</strong> Konsultasikan langsung foto tempat tidur Anda ke admin via WhatsApp saat pemesanan.</span>
              </div>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md"
            >
              Mengerti, Kembali Pilih Ukuran
            </button>
          </div>
        </div>
      )}
    </>
  );
}

