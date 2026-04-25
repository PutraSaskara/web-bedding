'use client';

import { useState } from 'react';

export default function ProductTabs({ description }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mt-12 sm:mt-24 max-w-4xl mx-auto">
      {/* --- TAB HEADERS --- */}
      <div className="flex justify-start sm:justify-center border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-4 sm:px-6 pb-3 sm:pb-4 border-b-2 text-xs sm:text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap ${activeTab === 'description'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-soft hover:text-text-main font-medium'
            }`}
        >
          Deskripsi
        </button>
        <button
          onClick={() => setActiveTab('care')}
          className={`px-4 sm:px-6 pb-3 sm:pb-4 border-b-2 text-xs sm:text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap ${activeTab === 'care'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-soft hover:text-text-main font-medium'
            }`}
        >
          Panduan Perawatan
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 sm:px-6 pb-3 sm:pb-4 border-b-2 text-xs sm:text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap ${activeTab === 'shipping'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-soft hover:text-text-main font-medium'
            }`}
        >
          Pengiriman
        </button>
      </div>

      {/* --- TAB CONTENT --- */}
      <div className="prose prose-sm sm:prose-stone mx-auto text-text-soft leading-relaxed min-h-[150px] sm:min-h-[200px] px-1 sm:px-0">

        {/* CONTENT: DESKRIPSI PRODUK */}
        {activeTab === 'description' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {description ? (
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {description}
              </p>
            ) : (
              <p className="text-sm sm:text-base text-gray-400 italic">
                Belum ada deskripsi untuk produk ini.
              </p>
            )}
          </div>
        )}

        {/* CONTENT: PANDUAN PERAWATAN */}
        {activeTab === 'care' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm sm:text-base">
              Perawatan yang tepat akan memastikan linen Anda tetap lembut dan tahan lama.
            </p>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2 mt-3 sm:mt-4 marker:text-primary text-sm sm:text-base">
              <li>Cuci dengan mesin menggunakan air dingin atau hangat (maks 40°C).</li>
              <li>Gunakan deterjen cair yang lembut. Hindari pemutih (bleach).</li>
              <li>Keringkan dengan mesin pada suhu rendah atau jemur di tempat teduh.</li>
              <li>Setrika dengan suhu sedang jika diperlukan, namun tekstur alami linen yang sedikit kusut justru memberikan kesan estetik.</li>
            </ul>
          </div>
        )}

        {/* CONTENT: PENGIRIMAN */}
        {activeTab === 'shipping' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm sm:text-base">
              Kami berkomitmen untuk mengirimkan pesanan Anda dengan aman dan cepat dari
              <span className="font-semibold"> Bali (Denpasar)</span> ke seluruh Indonesia.
            </p>

            <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2 mt-3 sm:mt-4 marker:text-primary text-sm sm:text-base">
              <li>
                Pesanan diproses dalam <span className="font-semibold">1–2 hari kerja</span> (Senin–Jumat).
              </li>
              <li>
                Pengiriman tersedia ke <span className="font-semibold">seluruh Indonesia</span> dengan estimasi waktu sesuai lokasi tujuan.
              </li>
              <li>
                <span className="font-semibold">Ongkos kirim dihitung saat checkout</span> dan tidak termasuk dalam harga produk.
              </li>
              <li>
                Garansi pengembalian <span className="font-semibold">7 hari</span> jika produk cacat atau tidak sesuai pesanan.
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
