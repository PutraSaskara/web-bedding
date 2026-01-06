'use client';

import { useState } from 'react';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="mt-24 max-w-4xl mx-auto">
      {/* --- TAB HEADERS --- */}
      <div className="flex justify-center border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('details')}
          className={`px-6 pb-4 border-b-2 text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap ${
            activeTab === 'details'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-soft hover:text-text-main font-medium'
          }`}
        >
          Detail
        </button>
        <button
          onClick={() => setActiveTab('care')}
          className={`px-6 pb-4 border-b-2 text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap ${
            activeTab === 'care'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-soft hover:text-text-main font-medium'
          }`}
        >
          Panduan Perawatan
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-6 pb-4 border-b-2 text-sm font-bold tracking-wide transition-all uppercase whitespace-nowrap ${
            activeTab === 'shipping'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-soft hover:text-text-main font-medium'
          }`}
        >
          Pengiriman
        </button>
      </div>

      {/* --- TAB CONTENT --- */}
      <div className="prose prose-stone mx-auto text-text-soft leading-relaxed min-h-[200px]">
        
        {/* CONTENT: DETAIL */}
        {activeTab === 'details' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p>
              Rasakan kemewahan linen signature kami. Bersumber dari flax Eropa terbaik dan melalui proses 
              <em> stone-washed</em> untuk kelembutan instan, koleksi ini dirancang untuk menghadirkan kenyamanan 
              tanpa usaha di kamar tidur Anda. Bahannya dapat bernapas (<em>breathable</em>), tahan lama, dan hipoalergenik secara alami.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
              <li>100% Linen Flax Eropa</li>
              <li><em>Stone-washed</em> untuk kelembutan maksimal</li>
              <li>Bersertifikat OEKO-TEX® (Bebas dari bahan kimia berbahaya)</li>
              <li>Termasuk: 1 Sarung Duvet, 2 Sarung Bantal</li>
            </ul>
          </div>
        )}

        {/* CONTENT: PANDUAN PERAWATAN */}
        {activeTab === 'care' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p>
              Perawatan yang tepat akan memastikan linen Anda tetap lembut dan tahan lama.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
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
            <p>
              Kami berkomitmen untuk mengirimkan pesanan Anda dengan aman dan cepat.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
              <li>Pesanan diproses dalam 1-2 hari kerja (Senin - Jumat).</li>
              <li>Pengiriman Reguler: 2-4 hari kerja (Jabodetabek), 3-7 hari kerja (Luar Jabodetabek).</li>
              <li>Gratis ongkos kirim untuk pembelian di atas Rp 1.000.000.</li>
              <li>Garansi pengembalian 7 hari jika produk cacat atau tidak sesuai pesanan.</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
