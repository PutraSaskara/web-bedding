import React from 'react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';

export const metadata = {
  title: 'Informasi Pengiriman',
  description: 'Pengiriman produk Ameskara dari Bali (Denpasar) ke seluruh Indonesia. Ongkos kirim akan diinformasikan setelah pemesanan melalui WhatsApp.',
  alternates: {
    canonical: `${siteUrl}/shipping`,
  },
  openGraph: {
    title: 'Informasi Pengiriman | Ameskara Sprei',
    description: 'Pengiriman dari Bali (Denpasar). Ongkir dikonfirmasi setelah pemesanan via WhatsApp.',
    url: `${siteUrl}/shipping`,
  },
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white pt-10 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Informasi Pengiriman
        </h1>

        <div className="space-y-8 sm:space-y-10 text-gray-600 leading-relaxed text-sm sm:text-base">

          {/* Asal Pengiriman */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Asal Pengiriman
            </h2>
            <p>
              Semua pesanan dikirim dari <strong>Bali (Denpasar)</strong> ke seluruh wilayah Indonesia.
            </p>
          </section>

          {/* Cara Pemesanan */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Cara Pemesanan
            </h2>
            <p>
              Pemesanan dilakukan melalui <strong>WhatsApp</strong>. Setelah Anda mengirim detail pesanan, tim kami akan membantu konfirmasi ketersediaan produk serta menghitung total pembayaran.
            </p>
          </section>

          {/* Ongkir */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Ongkos Kirim
            </h2>
            <p>
              Ongkos kirim akan <strong>dihitung setelah pemesanan dikirim melalui WhatsApp</strong>, menyesuaikan dengan lokasi tujuan dan berat paket.
              Total pembayaran (produk + ongkir) akan diinformasikan sebelum Anda melakukan pembayaran.
            </p>
          </section>

          {/* Jadwal */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Jadwal Pemrosesan
            </h2>
            <p>
              Pesanan akan diproses dalam waktu <strong>1–2 hari kerja</strong> (Senin–Jumat) setelah pembayaran dikonfirmasi.
            </p>
          </section>

          {/* Estimasi */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Estimasi Waktu Pengiriman
            </h2>
            <p className="mb-2">
              Estimasi waktu pengiriman tergantung pada lokasi tujuan:
            </p>
            <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2">
              <li><strong>Bali & Jawa:</strong> ±2 – 5 hari kerja</li>
              <li><strong>Luar Bali & Jawa:</strong> ±3 – 8 hari kerja</li>
            </ul>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Lacak Pesanan
            </h2>
            <p>
              Nomor resi akan dikirimkan melalui WhatsApp setelah paket diserahkan ke kurir, sehingga Anda dapat melacak status pengiriman dengan mudah.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}