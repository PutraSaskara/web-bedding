'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import useCartStore from '../../store/useCartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // State untuk Form Data Diri
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  // Rehydrate Zustand
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  // Hitung Total
  const cartTotal = cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

  // Jika cart kosong (setelah loading selesai), redirect ke shop
  useEffect(() => {
    if (hasHydrated && cart.length === 0) {
      router.push('/shop');
    }
  }, [hasHydrated, cart, router]);

  if (!hasHydrated) return null;

  // --- LOGIC WHATSAPP ---
  const handleCheckoutWA = (e) => {
    e.preventDefault();

    // 1. Validasi Input
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Mohon lengkapi Nama, No. HP, dan Alamat pengiriman.");
      return;
    }

    // 2. Nomor WA Pemilik Website (GANTI DENGAN NOMOR KAMU)
    // Format: Kode negara (62) tanpa tanda plus. Contoh: 628123456789
    const ownerPhoneNumber = "6285739287239"; 

    // Ambil domain website saat ini (misal: https://nyamann.com atau http://localhost:3000)
    const origin = window.location.origin;

    // 3. Susun List Produk
    let itemsList = "";
cart.forEach((item, index) => {
        const variantInfo = item.selectedVariant ? ` (${item.selectedVariant.color})` : "";
        const sizeInfo = item.selectedSize ? ` [Size: ${item.selectedSize.size}]` : "";
        
        // 1. Nama Produk
        itemsList += `${index + 1}. ${item.name}${variantInfo}${sizeInfo}\n`;
        
        // 2. Link Produk di Website (BARU)
        itemsList += `   Link: ${origin}/shop/${item.slug}\n`;

        // 3. Perhitungan Harga
        itemsList += `   ${item.quantity} x Rp ${Number(item.price).toLocaleString('id-ID')} = Rp ${(item.quantity * item.price).toLocaleString('id-ID')}\n`;
        
        // 4. Link Gambar Varian
        if (item.image) {
            itemsList += `   Foto: ${item.image}\n`; 
        }
        
        itemsList += `\n`; // Jarak antar item
    });

    // 4. Susun Pesan Lengkap
    const message = `Halo Nyamann Bedding, saya ingin memesan:

*DETAIL PESANAN:*
${itemsList}
*Total Harga Produk: Rp ${cartTotal.toLocaleString('id-ID')}*
--------------------------------
*DATA PENGIRIMAN:*
Nama: ${formData.name}
No. HP: ${formData.phone}
Alamat: ${formData.address}
Catatan: ${formData.note || "-"}

Mohon info total bayar beserta ongkirnya. Terima kasih!`;

    // 5. Encode URL dan Buka WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${ownerPhoneNumber}?text=${encodedMessage}`;

    // 6. Buka Tab Baru
    window.open(waUrl, '_blank');

    // 7. Opsional: Kosongkan keranjang setelah order (Tanya user atau langsung hapus)
    // clearCart(); 
    // router.push('/'); // Kembali ke home
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-display text-text-main">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-2 mb-8">
            <Link href="/shop" className="text-sm font-bold text-gray-500 hover:text-primary">&larr; Lanjut Belanja</Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-2xl font-black text-text-main">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- KOLOM KIRI: FORM DATA DIRI --- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Informasi Pengiriman
            </h2>
            <form onSubmit={handleCheckoutWA} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                    <input 
                        type="text" name="name" required placeholder="Budi Santoso"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
                    <input 
                        type="tel" name="phone" required placeholder="0812..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Lengkap</label>
                    <textarea 
                        name="address" required rows="3" placeholder="Jl. Raya Kuta No. 10, Bali..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Catatan (Opsional)</label>
                    <input 
                        type="text" name="note" placeholder="Contoh: Tolong dikirim sore hari"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                        onChange={handleChange}
                    />
                </div>
            </form>
          </div>

          {/* --- KOLOM KANAN: RINGKASAN PESANAN --- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                Ringkasan Pesanan
            </h2>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 scrollbar-hide">
                {cart.map((item, index) => (
                    <div key={index} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                        <div className="relative w-16 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-sm text-text-main line-clamp-1">{item.name}</h3>
                            <div className="text-xs text-gray-500 mt-1">
                                {item.selectedVariant && <span>{item.selectedVariant.color}</span>}
                                {item.selectedSize && <span>, Size {item.selectedSize.size}</span>}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">{item.quantity} x Rp {Number(item.price).toLocaleString('id-ID')}</span>
                                <span className="text-sm font-bold text-text-main">Rp {(item.quantity * item.price).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                    <span>Total Barang</span>
                    <span>{cart.reduce((a, c) => a + c.quantity, 0)} pcs</span>
                </div>
                <div className="flex justify-between text-xl font-black text-text-main pt-2">
                    <span>Total Bayar</span>
                    <span className="text-primary">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <p className="text-xs text-gray-400 text-right mt-1">*Belum termasuk ongkos kirim</p>
            </div>

            <button 
                onClick={handleCheckoutWA}
                className="w-full mt-6 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Pesan via WhatsApp
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}