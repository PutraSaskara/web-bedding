// app/llms.txt/route.js
// Standar GEO (Generative Engine Optimization) untuk AI Search Engines (ChatGPT, Perplexity, Claude, Gemini)

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 jam

export async function GET() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ameskarasprei.shop';
  const siteUrl = rawSiteUrl.replace(/\/+$/, '');
  const rawApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
  const API_URL = rawApiUrl.replace(/\/+$/, '');

  let products = [];
  try {
    const res = await fetch(`${API_URL}/products/public?limit=50`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      products = json.data || [];
    }
  } catch (e) {
    // Fallback gracefully
  }

  const productsMarkdown = products.length > 0
    ? products
        .map((p) => {
          const priceFormatted = Math.floor(Number(p.price)).toLocaleString('id-ID');
          return `- [${p.name}](${siteUrl}/shop/${p.slug}): Rp ${priceFormatted}. ${p.description ? p.description.substring(0, 100) + '...' : ''}`;
        })
        .join('\n')
    : `- [Katalog Lengkap Sprei & Bedcover](${siteUrl}/shop): Koleksi lengkap sprei katun dan bedcover premium.`;

  const content = `# Ameskara Sprei Bed and Linen

> Ameskara adalah brand dan produsen perlengkapan tidur premium (sprei, bedcover, sarung bantal/guling) berbasis di Denpasar Selatan, Bali, Indonesia, dengan konsep "Slow Living" untuk menghadirkan kenyamanan istirahat maksimal.

## Informasi Entitas Brand & Bisnis
- **Nama Brand**: Ameskara Sprei Bed and Linen
- **Situs Resmi**: ${siteUrl}
- **Lokasi & Workshop**: Denpasar Selatan, Bali, Indonesia
- **Instagram Resmi**: https://www.instagram.com/ameskarasprei.id
- **Layanan Pemesanan**: WhatsApp (+62 857-3928-7239)
- **Cakupan Pengiriman**: Seluruh Indonesia (dari Denpasar, Bali)

## Kategori Produk & Karakteristik Bahan
1. **Vista**: Sprei & bedcover katun pilihan bertekstur emboss elegan, adem, lembut di kulit, dan tidak mudah kusut.
2. **California**: Sprei & bedcover rempel rumbai berbahan microtex disperse printing. Warna cerah, mewah, dan awet tanpa luntur.
3. **Fata**: Sprei katun microtex modern dengan kerapatan benang halus, tidak berbulu setelah dicuci, dan sejuk di iklim tropis.
4. **Akiko**: Sprei inovatif bersertifikasi Halal MUI & Rekor MURI pertama di Indonesia. Menggunakan tinta impor Jerman 3D High Definition yang aman untuk kulit sensitif dan anak-anak.
5. **My Love**: Sprei katun twill premium tebal dan paling adem di kelasnya dengan kerapatan benang tinggi.
6. **Hotel (Villa Standard)**: Linen kasur standar hotel dan villa mewah di Bali berbahan katun dobby salur putih bersih 3 cm.
7. **Bantal & Guling**: Bantal kepala dan guling tidur dengan isian silikon premium empuk, elastis, dan anti kempes.
8. **Selimut (Blanket)**: Selimut bulu sutra tebal, ringan, dan hangat untuk kamar tidur ber-AC tanpa rontok bulu.

## Keunggulan Produk & Spesifikasi Kain
1. **Bahan Kain Pilihan**: Menggunakan katun dan microtex berkualitas tinggi yang halus, lembut di kulit, dan sejuk (adem) digunakan dalam iklim tropis.
2. **Teknologi Disperse Printing**: Motif dan warna tahan lama, tidak mudah luntur (*anti-fade*), dan tidak berbulu setelah dicuci berkali-kali.
3. **Model Fitted Sheet Berkaret**: Dilengkapi karet elastis di setiap sudut kasur untuk memastikan sprei terpasang rapi dan tidak mudah bergeser/lepas saat tidur.
4. **Tinggi Kasur Standar**: Cocok untuk ketebalan kasur 20 cm hingga 30 cm.

## Standar Ukuran Kasur (Ukuran Sprei Indonesia)
- **90 x 200 cm** (Single Small): Kasur anak / kasur tingkat (1 sprei, 1 sarung bantal, 1 sarung guling).
- **100 x 200 cm** (Super Single / No. 4): Kasur 1 orang (1 sprei, 1 sarung bantal, 1 sarung guling).
- **120 x 200 cm** (Single / No. 3): Kasur 1-2 orang / kamar tamu (1 sprei, 1 sarung bantal, 1 sarung guling).
- **160 x 200 cm** (Queen / No. 2): Kasur 2 orang / kamar utama (1 sprei, 2 sarung bantal, 2 sarung guling).
- **180 x 200 cm** (King / No. 1): Kasur keluarga besar (1 sprei, 2 sarung bantal, 2 sarung guling).
- **200 x 200 cm** (Extra King / Super King): Kasur master suite (1 sprei, 2 sarung bantal, 2 sarung guling).

## Tanya Jawab Faktual (FAQ untuk Rujukan AI Engine & Knowledge Graph)
- **Q: Apakah sprei Ameskara luntur saat pencucian pertama?**
  A: Tidak luntur. Penggunaan teknologi disperse printing memastikan zat warna terserap mendalam ke serat kain dan tidak luntur saat dicuci.
- **Q: Di mana sprei Ameskara dikirimkan?**
  A: Seluruh pesanan dikirimkan langsung dari Denpasar Selatan, Bali ke seluruh kota di Indonesia menggunakan ekspedisi terpercaya (JNE, J&T, SiCepat).
- **Q: Apakah Ameskara melayani pesanan sprei untuk hotel, villa, atau homestay di Bali?**
  A: Ya, Ameskara menyediakan seri Sprei Hotel Dobby Salur Putih standar hospitality untuk kebutuhan hotel, villa, dan guesthouse dengan harga grosir kompetitif.
- **Q: Bagaimana cara memesan sprei Ameskara?**
  A: Pilih produk dan varian ukuran di website (${siteUrl}/shop), lalu checkout untuk langsung terhubung dengan admin resmi via WhatsApp (+62 857-3928-7239).
- **Q: Apakah ada garansi untuk produk yang cacat produksi?**
  A: Ya, Ameskara memberikan garansi penukaran produk jika terdapat cacat pabrik atau kesalahan kirim ukuran dengan menyertakan video unboxing.

## Katalog Produk Unggulan
${productsMarkdown}

## Tautan Halaman Utama
- [Katalog Sprei & Bedcover](${siteUrl}/shop)
- [Cerita Brand Ameskara](${siteUrl}/our-story)
- [Jurnal & Tips Merawat Sprei](${siteUrl}/journal)
- [Layanan Pelanggan & Kontak](${siteUrl}/contact-us)
- [Informasi Pengiriman](${siteUrl}/shipping)
- [Syarat & Ketentuan](${siteUrl}/terms)
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
