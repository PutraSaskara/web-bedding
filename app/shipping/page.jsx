import React from 'react';

export const metadata = {
  title: 'Shipping Information - Ameskara Sprei',
  description: 'Informasi pengiriman, kurir, dan estimasi waktu sampai produk Ameskara.',
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white pt-10 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Informasi Pengiriman</h1>
        
        <div className="space-y-8 sm:space-y-10 text-gray-600 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Jadwal Pemrosesan</h2>
            <p>
              Pesanan yang masuk dan terkonfirmasi pembayarannya sebelum pukul <strong>14:00 WIB</strong> akan kami proses dan kirim pada hari yang sama. 
              Pesanan yang masuk setelah jam tersebut, atau pada hari Minggu dan hari libur nasional, akan diproses pada hari kerja berikutnya.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Mitra Logistik</h2>
            <p className="mb-2 sm:mb-3">Kami bekerja sama dengan berbagai layanan ekspedisi terpercaya untuk menjangkau seluruh wilayah Indonesia:</p>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1 bg-gray-50 p-3 sm:p-4 rounded-md">
              <li>JNE (Reguler & YES)</li>
              <li>J&T Express</li>
              <li>SiCepat</li>
              <li>GoSend / GrabExpress (Instant & Sameday untuk area Jabodetabek)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Estimasi Waktu Pengiriman</h2>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2">
              <li><strong>Jabodetabek:</strong> 1 - 3 hari kerja.</li>
              <li><strong>Pulau Jawa (Luar Jabodetabek):</strong> 2 - 4 hari kerja.</li>
              <li><strong>Luar Pulau Jawa:</strong> 3 - 7 hari kerja, tergantung lokasi dan aksesibilitas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Lacak Pesanan</h2>
            <p>
              Nomor resi akan dikirimkan otomatis ke email atau WhatsApp Anda setelah paket diserahkan ke kurir. Anda dapat melacak status pengiriman melalui website resmi ekspedisi terkait atau melalui halaman akun Anda.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}