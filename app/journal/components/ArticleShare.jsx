'use client';

import { useState } from 'react';

export default function ArticleShare({ title }) {
  const [showToast, setShowToast] = useState(false);

  // --- 1. LOGIC SMART SHARE (General) ---
  const handleSmartShare = async () => {
    const url = window.location.href;

    // Cek Native Share (HP)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Baca artikel menarik ini: "${title}"`,
          url: url,
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Share error:', err);
      }
    }

    // Fallback: Copy Link (PC)
    copyToClipboard(url);
  };

  // --- 2. LOGIC COPY CLIPBOARD ---
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // --- 3. LOGIC SOSMED SPESIFIK ---
  const shareToSocial = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`Baca artikel ini: "${title}"`);
    let shareUrl = '';

    switch (platform) {
      case 'wa':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'fb':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'tw':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        {/* WhatsApp */}
        <button 
          onClick={() => shareToSocial('wa')}
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
          title="Share ke WhatsApp"
        >
           <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </button>

        {/* SMART SHARE BUTTON (Copy Link / Native) */}
        <button 
          onClick={handleSmartShare}
          className="w-12 h-12 rounded-full bg-gray-100 text-text-main flex items-center justify-center hover:bg-gray-200 hover:scale-110 transition-all shadow-sm group relative"
          title="Salin Link / Share Lainnya"
        >
           <span className="material-symbols-outlined text-[24px]">ios_share</span>
        </button>
      </div>

      {/* TOAST NOTIFICATION */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] transition-all duration-300 transform ${
            showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[200px] justify-center backdrop-blur-sm bg-opacity-90">
           <div className="bg-green-500 rounded-full p-0.5">
             <span className="material-symbols-outlined text-base text-white font-bold">check</span>
           </div>
           <span className="font-medium text-sm">Link artikel disalin!</span>
        </div>
      </div>
    </>
  );
}