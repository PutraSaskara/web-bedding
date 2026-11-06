import React from 'react';
import ContactForm from '../../components/ContactForm';

import { getSeoMetadata } from '../../lib/seo';

export async function generateMetadata() {
  return await getSeoMetadata(
    'contact-us',
    'Kontak & Pemesanan Sprei Ameskara | Denpasar Selatan Bali',
    'Hubungi layanan pelanggan Ameskara Sprei Denpasar Bali. Konsultasi ukuran kasur, pemesanan sprei & bedcover custom, serta konfirmasi order cepat via WhatsApp.',
    '/contact-us'
  );
}

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white pt-10 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 text-center">Hubungi Kami</h1>
        <p className="text-gray-500 text-center mb-8 sm:mb-12 text-sm sm:text-base px-4">Kami senang mendengar dari Anda. Kirimkan pesan atau hubungi kami melalui kontak di bawah.</p>
        
        <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
          {/* Informasi Kontak */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900">Layanan Pelanggan</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                Tim kami siap membantu menjawab pertanyaan Anda mengenai produk, pesanan, atau kemitraan.
              </p>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span> dewatashop182@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">WhatsApp:</span>{' '}
                  <a 
                    href="https://wa.me/6285739287239" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-medium"
                  >
                    +62 857-3928-7239
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Jam Kerja:</span> Senin - Jumat, 09:00 - 17:00 WITA
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900">Lokasi Kami</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Ameskara Sprei HQ<br />
                Denpasar Selatan, Bali<br />
                Indonesia
              </p>
            </div>
          </div>

          {/* Form Kontak */}
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
