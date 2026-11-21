Buatkan antarmuka web aplikasi mobile-first modern dengan gaya visual "Soft Minimalist, High-Density Dashboard" yang terinspirasi dari aplikasi manajemen kendaraan/utilitas harian. 

Terapkan panduan desain dan spesifikasi UI/UX berikut secara presisi:

### 1. Layout & Shell Container
- **Mobile-First Container**: Tampilan utama berada di dalam frame mobile shell dengan lebar maksimal `max-width: 440px`, tinggi `100dvh` (pada layar desktop/lebar, tampil di tengah layar dengan rounded corner `border-radius: 26px`, margin 10px vertikal, dan bayangan luar halus `box-shadow: 0 20px 50px rgba(15, 23, 42, 0.14)`).
- **Background Luar**: Pada desktop, background di luar frame menggunakan warna netral sejuk (#E5E9F2 pada mode terang / #090B10 pada mode gelap).
- **Struktur Halaman**:
  1. Top App Header (fixed/sticky compact header)
  2. Scrollable App Content (scroll tersembunyi/halus 4px)
  3. Bottom Navigation Bar (fixed di bagian bawah dengan 4-5 tab ikon)

### 2. Palet Warna & Design Tokens
Gunakan sistem warna dengan dual theme (Light Mode default & Dark Mode ready) serta aksen "Soft Tint" untuk badge dan status:
- **Light Theme**:
  - Background Shell: `#F3F5F9`
  - Background Card/Surface: `#FFFFFF`
  - Background Alt / Track / Inset: `#EBF0F7`
  - Teks Utama: `#111827`
  - Teks Sekunder: `#374151`
  - Teks Muted / Caption: `#5B667A`
  - Garis Tepi (Border): `#E2E8F0` (halus 1px)
  - Aksen Primer (Biru Modern): `#4F6EF7` (Soft Tint: `#E8EEFF`)
  - Status Sukses (Hijau Emerald): `#168A5B` (Soft Tint: `#E3F6ED`)
  - Status Peringatan (Kuning Amber): `#C87A0A` (Soft Tint: `#FEF3DF`)
  - Status Bahaya (Merah Koral): `#D63D32` (Soft Tint: `#FDECEB`)
- **Dark Theme**:
  - Background Shell: `#11141B`
  - Background Card/Surface: `#191E28`
  - Background Alt / Inset: `#232A36`
  - Teks: Utama `#F1F5F9`, Sekunder `#CBD5E1`, Muted `#94A3B8`
  - Border: `#28303F`
  - Aksen Primer: `#839DFF` (Soft Tint: `rgba(131, 157, 255, 0.15)`)
  - Sukses: `#4DD499` | Warning: `#F5B851` | Danger: `#F4837B`

### 3. Tipografi & Ikonografi
- **Font**: Gunakan font 'Inter', sans-serif modern yang bersih. Ukuran base 13.5px, line-height 1.42.
- **Hierarki Teks**:
  - Judul Halaman: 18px-20px Bold, letter-spacing -0.01em
  - Judul Kartu: 14px-15px Semi-bold
  - Body / Label: 12.5px-13.5px Medium
  - Caption / Metadata: 10.5px-11.5px Regular/Medium
- **Ikonografi**: Gunakan ikon outline bergaya Tabler/Lucide/Feather dengan garis presisi (`stroke-width: 1.85px`, ujung bulat/round).

### 4. Komponen Khas (Signature Components)
1. **Header Profil / Switcher**:
   - Di kiri atas: Avatar kotak membulat (`border-radius: 10px`, background warna primer soft dengan ikon primer di tengah).
   - Di samping avatar: Teks 2 baris (Nama entitas bold 14px + subtitle/plat nomor muted 11px) dengan ikon panah dropdown kecil.
   - Di kanan: Chip/badge status ringkas (misal: "Aktif", "Tersimpan", atau tombol lonceng/tema).

2. **Ringkasan Tinggi (High-Density Cards)**:
   - Kartu-kartu ringkas dengan sudut membulat `border-radius: 14px - 18px`, border tipis 1px, tanpa bayangan tebal.
   - Indikator progres / meter bar: Garis progres tipis (4px - 6px) dengan warna dinamis sesuai status (hijau = aman, oranye = mendekati, merah = lewat tempo).
   - Chip Kategori Pastel: Tag kecil membulat penuh (`border-radius: 99px`, padding 3px 8px, font 11px semi-bold) dengan warna soft background dan teks kontras.

3. **Segmented Control / Mini Tab (Pill Style)**:
   - Kontainer kapsul warna `--bg-alt` dengan padding 3px.
   - Tombol tab di dalamnya berbentuk kapsul (`border-radius: 8px`). Tab yang aktif mendapatkan background putih/surface tegas, teks pekat, dan bayangan sangat halus.

4. **Formulir & Kontrol Input**:
   - Input field bersih dengan border halus, padding rapi (8px-10px), teks placeholder abu-abu netral.
   - Suffix / Prefix terintegrasi (misal: badge satuan "km", "Rp", "hari" di dalam field sebelah kanan).

5. **Modal / Bottom Sheet**:
   - Muncul meluncur dari bawah (slide-up bottom sheet) pada mobile dengan sudut atas membulat `border-radius: 20px 20px 0 0`.
   - Latar belakang scrim semi-transparan (`rgba(15, 23, 42, 0.45)`).
   - Tombol aksi utama (Full width, rounded 12px, warna primer, font 13.5px medium) dan tombol sekunder bergaya ghost/outline.

6. **Bottom Navigation Bar**:
   - Fixed di bagian bawah frame mobile shell.
   - Terdiri dari 4 sampai 5 menu (Home/Ringkasan, Jadwal/Pengingat, Riwayat/Catatan, Statistik, Profil).
   - Ikon aktif memiliki highlight warna primer dan teks semi-bold.

Buat kode yang terstruktur rapi, semantik, responsif, dan interaktif dengan micro-interactions yang mulus.