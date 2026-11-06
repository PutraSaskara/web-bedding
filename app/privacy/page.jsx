import React from 'react';
import { getSeoMetadata } from '../../lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata(
    'privacy',
    'Kebijakan Privasi | Ameskara Sprei Bali',
    'Kebijakan privasi Ameskara Sprei Bali terkait pengumpulan data pemesanan WhatsApp, keamanan data pembeli, serta penggunaan data untuk konfirmasi dan pengiriman pesanan.',
    '/privacy'
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white pt-10 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Kebijakan Privasi
        </h1>

        <div className="space-y-8 text-gray-600 leading-relaxed text-sm sm:text-base">

          {/* Pendahuluan */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Pendahuluan</h2>
            <p>
              Di Ameskara Sprei, kami sangat menghargai dan berkomitmen untuk melindungi privasi pelanggan kami. Kebijakan Privasi ini menjelaskan bagaimana informasi pribadi Anda dikumpulkan, digunakan, dan dilindungi saat mengakses situs web kami serta saat melakukan pemesanan produk sprei dan bedding kami.
            </p>
          </section>

          {/* Pengumpulan Data */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Pengumpulan Data Pemesanan</h2>
            <p className="mb-2">
              Untuk memproses pesanan dan pengiriman secara akurat melalui WhatsApp, kami mengumpulkan data yang Anda berikan secara langsung, meliputi:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nama lengkap penerima paket.</li>
              <li>Nomor telepon / WhatsApp aktif untuk konfirmasi pemesanan dan pengiriman.</li>
              <li>Alamat lengkap pengiriman (termasuk jalan, nomor rumah, kecamatan, kota/kabupaten, dan kode pos).</li>
              <li>Detail pesanan produk (merek, ukuran kasur, pilihan motif, dan catatan khusus).</li>
            </ul>
          </section>

          {/* Penggunaan Data */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Penggunaan Informasi</h2>
            <p className="mb-2">
              Data yang dikumpulkan hanya digunakan untuk keperluan pelayanan dan transaksi Anda di Ameskara Sprei, antara lain:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Mengonfirmasi ketersediaan stok produk dan menghitung total harga beserta ongkos kirim.</li>
              <li>Memproses pengemasan dan menyerahkan pesanan kepada kurir ekspedisi rekanan (seperti JNE, J&amp;T, SiCepat).</li>
              <li>Mengirimkan informasi nomor resi dan status pelacakan kiriman langsung ke WhatsApp Anda.</li>
              <li>Menjawab pertanyaan atau memberikan bantuan terkait konsultasi produk dan layanan pelanggan.</li>
            </ul>
          </section>

          {/* Keamanan Data */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Keamanan Data</h2>
            <p>
              Kami menjaga kerahasiaan dan keamanan informasi pribadi Anda dengan standar yang baik. Ameskara Sprei tidak akan pernah membagikan, menyewakan, atau menjual data pribadi Anda kepada pihak ketiga mana pun untuk tujuan pemasaran tanpa izin Anda, selain kepada pihak ekspedisi yang bertugas mengantar pesanan Anda.
            </p>
          </section>

          {/* Hak Pelanggan */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Hak Anda</h2>
            <p>
              Anda memiliki hak untuk meninjau, memperbarui, atau meminta penghapusan informasi kontak Anda dari database layanan kami kapan saja dengan menghubungi tim kami melalui WhatsApp atau email resmi kami.
            </p>
          </section>

          {/* Perubahan Kebijakan */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Pembaruan Kebijakan Privasi</h2>
            <p>
              Ameskara berhak memperbarui kebijakan ini sewaktu-waktu untuk menyesuaikan dengan ketentuan hukum atau perkembangan operasional toko kami. Setiap perubahan akan segera dipublikasikan di halaman ini.
            </p>
          </section>

          {/* Kontak */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami via WhatsApp di{' '}
              <a
                href="https://wa.me/6285739287239"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                +62 857-3928-7239
              </a>{' '}
              atau email ke{' '}
              <span className="font-medium text-gray-900">dewatashop182@gmail.com</span>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
