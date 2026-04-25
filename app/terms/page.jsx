import React from 'react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-10 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Syarat & Ketentuan
        </h1>

        <div className="space-y-8 text-gray-600 leading-relaxed text-sm sm:text-base">

          {/* Umum */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Ketentuan Umum</h2>
            <p>
              Dengan melakukan pemesanan produk Ameskara, Anda dianggap telah membaca, memahami,
              dan menyetujui seluruh syarat dan ketentuan yang berlaku.
            </p>
          </section>

          {/* Pemesanan */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Pemesanan</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pemesanan dilakukan melalui WhatsApp resmi Ameskara.</li>
              <li>Pastikan data yang diberikan (nama, alamat, nomor kontak) sudah benar dan lengkap.</li>
              <li>Kesalahan pengisian data oleh pembeli bukan menjadi tanggung jawab pihak Ameskara.</li>
            </ul>
          </section>

          {/* Harga & Pembayaran */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Harga & Pembayaran</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Harga produk yang tertera belum termasuk ongkos kirim.</li>
              <li>Ongkos kirim akan diinformasikan setelah pemesanan dikirim melalui WhatsApp.</li>
              <li>Pembayaran dilakukan setelah total harga (produk + ongkir) dikonfirmasi.</li>
              <li>Pesanan akan diproses setelah pembayaran diterima.</li>
            </ul>
          </section>

          {/* Pengiriman */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Pengiriman</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Semua pesanan dikirim dari Bali (Denpasar).</li>
              <li>Pesanan diproses dalam 1–2 hari kerja setelah pembayaran dikonfirmasi.</li>
              <li>Estimasi waktu pengiriman tergantung lokasi tujuan dan pihak ekspedisi.</li>
              <li>Keterlambatan akibat pihak ekspedisi berada di luar kendali Ameskara.</li>
            </ul>
          </section>

          {/* Pembatalan */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Pembatalan</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pembatalan hanya dapat dilakukan sebelum pembayaran dilakukan.</li>
              <li>Pesanan yang sudah dibayar tidak dapat dibatalkan.</li>
            </ul>
          </section>

          {/* Penutup */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Penutup</h2>
            <p>
              Ameskara berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
