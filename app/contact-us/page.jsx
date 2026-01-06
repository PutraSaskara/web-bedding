import React from 'react';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact Us - Ameskara Sprei',
  description: 'Hubungi kami untuk pertanyaan seputar produk sprei dan bedcover Ameskara.',
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Hubungi Kami</h1>
        <p className="text-gray-500 text-center mb-12">Kami senang mendengar dari Anda. Kirimkan pesan atau hubungi kami melalui kontak di bawah.</p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Informasi Kontak */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Layanan Pelanggan</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Tim kami siap membantu menjawab pertanyaan Anda mengenai produk, pesanan, atau kemitraan.
              </p>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span> dewatashop182@gmail.com
                </p>
                {/* <p className="flex items-center gap-2">
                  <span className="font-medium">WhatsApp:</span> +62 812-3456-7890
                </p> */}
                <p className="flex items-center gap-2">
                  <span className="font-medium">Jam Kerja:</span> Senin - Jumat, 09:00 - 17:00 WIB
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Lokasi Kami</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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
