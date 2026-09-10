<div align="center">

# ⚡ Cable Metrics & Multi-Utility Web Suite
### *Kumpulan Aplikasi Web Tools, Kalkulator Teknik Kabel, Kelistrikan, Keuangan & Utility Interaktif*

[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github&logoColor=white)](https://williyanto.github.io/production/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

[🌐 Open Live Web App Hub](https://williyanto.github.io/production/) • [📖 Daftar Fitur](#-katalog-proyek--fitur-unggulan) • [💻 Cara Penggunaan](#-cara-penggunaan) • [👤 Author](#-tentang-penulis)

</div>

---

## 📌 Tentang Proyek

**Production Repository** (`williyanto/production`) adalah pusat aplikasi web terpadu yang dirancang dan dikembangkan oleh **Williyanto Adi**. Repositori ini berisi **50+ modul dan kalkulator interaktif** yang berfokus pada **Teknik Kelistrikan, Manufaktur Kabel, Pengujian Material Lab, Manajemen Keuangan, Edukasi Interaktif, serta Utilities Harian**.

Seluruh aplikasi dibangun dengan antarmuka yang responsif, mendukung **Light Mode & Dark Mode**, serta dapat dijalankan secara instan melalui browser tanpa memerlukan instalasi server tambahan.

> 🚀 **Cobalah langsung secara online di:** [https://williyanto.github.io/production/](https://williyanto.github.io/production/)

---

## ✨ Fitur Utama Hub (`index.html`)

- 🎯 **Pencarian Real-Time (Instant Live Search)**: Cari alat atau kalkulator berdasarkan nama, kata kunci, atau jenis perhitungan.
- 🎨 **Filter Kategori Dynamic**: Saring modul berdasarkan bidang (Kelistrikan, Produksi Kabel, Uji Material, Keuangan, Edukasi, Utility, dll).
- 🌓 **Tema Mode Gelap / Terang (Dark/Light Theme)**: Beralih mode tampilan dengan mudah untuk kenyamanan mata.
- 🔲 **Tampilan Fleksibel (Grid & List View)**: Ubah tata letak tampilan daftar proyek sesuai preferensi visual Anda.
- ⏰ **Live Clock & Widget**: Dilengkapi jam digital real-time dan indikator status keaktifan proyek.

---

## 🗂️ Katalog Proyek & Fitur Unggulan

<details open>
<summary><b>🔌 1. Kelistrikan & Teknik Kabel</b></summary>

| Proyek | Deskripsi & Standar | File Utama | Status |
| :--- | :--- | :--- | :---: |
| **Kalkulator Hambatan Konduktor** | Perhitungan hambatan listrik konduktor kabel berdasarkan standar internasional **IEC 60228**, **ICEA**, **AS/NZS**, dan **SPLN**. | [`kalkulator_hambatan_kabel/iec_final_v20260801.html`](./kalkulator_hambatan_kabel/iec_final_v20260801.html) | `Aktif` |
| **Faktor Koreksi Suhu** | Penghitung faktor koreksi suhu untuk penyesuaian nilai hambatan konduktor pada berbagai temperatur acuan. | [`faktor_koreksi_suhu_v20260801.html`](./faktor_koreksi_suhu_v20260801.html) | `Aktif` |
| **Kalkulator Uji Tegangan** | Alat bantu perhitungan parameter pengujian tegangan listrik (*Voltage Test*). | `20.uji_tegangan/uji_tegangan.html` | `Aktif` |
| **Kalkulator Resistor** | Alat hitung nilai resistansi resistor 4/5/6 gelang warna dan kalkulasi nilai SMD. | `10.kalkulator_resistor/kalkulator_resistor.html` | `Aktif` |
| **Kalkulator Daya Listrik** | Perhitungan konsumsi daya (Watt, VA, kWh) dan daya listrik rumah/industri. | `21.kalkulator_daya_listrik/kalkulator_dayalistrik.html` | `Aktif` |

</details>

<details open>
<summary><b>🏭 2. Produksi Kabel & Manufaktur Industri</b></summary>

| Proyek | Deskripsi | File Utama | Status |
| :--- | :--- | :--- | :---: |
| **Hitung Panjang Kabel di Drum** | Estimasi total panjang kabel yang tergulung dalam drum kayu/besi (*CableMetrics*). | [`hitung_panjang_kabel_didrum_v20260801.html`](./hitung_panjang_kabel_didrum_v20260801.html) | `Aktif` |
| **Estimasi Waktu Rewind Kabel** | Kalkulasi durasi waktu proses penggulungan (*rewinding*) dan *coiling* kabel produksi. | [`hitung_waktu_rewind_v20260801.html`](./hitung_waktu_rewind_v20260801.html) | `Aktif` |
| **Hitung Volume Drum** | Perhitungan volume geometris dan kapasitas ruang muat drum kabel. | `27.volume_drum/volume_drum.html` | `Aktif` |

</details>

<details open>
<summary><b>🧪 3. Pengujian Material & Laboratorium</b></summary>

| Proyek | Deskripsi | File Utama | Status |
| :--- | :--- | :--- | :---: |
| **Kapasitas Rak Kabel (Flame Retardant)** | Analisis pembebanan & kapasitas penataan kabel tahan api (*Flame Retardant*) pada rak kabel. | [`flame_retardant_v20260801.html`](./flame_retardant_v20260801.html) | `Aktif` |
| **Uji Bending Mandrel** | Perhitungan ukuran mandrel & keliling lap pengujian tekuk kabel (*Mandrel Bending Test*). | [`uji_bending_v20260801.html`](./uji_bending_v20260801.html) | `Aktif` |
| **Cold Bending & Heat Shock** | Evaluasi dan kalkulator batas uji ketahanan suhu dingin (*Cold Bending*) & kejutan panas (*Heat Shock*). | [`coldbending_heatshock/coldbending_v20260801.html`](./coldbending_heatshock/coldbending_v20260801.html) | `Aktif` |

</details>

<details open>
<summary><b>🛠️ 4. Utility & Tools Harian</b></summary>

| Proyek | Deskripsi | File Utama | Status |
| :--- | :--- | :--- | :---: |
| **Kalkulator Waktu Pro** | Penghitung selisih jam/menit, selisih tanggal, dan konversi durasi interval waktu. | [`kalkulator_waktu_v20260910.html`](./kalkulator_waktu_v20260910.html) | `Aktif` |
| **Generator Angka Acak** | Penghasil angka acak (*Random Number Generator*) dengan kustomisasi rentang & statistik. | [`generator_angka_v20260910.html`](./generator_angka_v20260910.html) | `Aktif` |
| **Konverter Panjang** | Konversi presisi antar satuan panjang (Meter, Feet, Inch, Yard, mm, cm, KM, Mile). | [`konverter_panjang_v20260801.html`](./konverter_panjang_v20260801.html) | `Aktif` |
| **Kalkulator Persentase Pro** | Alat hitung persentase cepat untuk diskon, kenaikan/penurunan harga, dan rasio. | [`hitung_persen_v20260801.html`](./hitung_persen_v20260801.html) | `Aktif` |
| **Kalkulator Dimensi** | Aplikasi perhitungan dimensi objek geometris dan pengukuran area. | `4.kalkulator_dimensi/kalkulator_dimensi.html` | `Aktif` |
| **Android KW UI** | Web app simulasi antarmuka gaya Android untuk kegunaan harian. | `11.android_kw/android_kw.html` | `Aktif` |

</details>

<details open>
<summary><b>💰 5. Keuangan & Manajemen</b></summary>

| Proyek | Deskripsi | File Utama | Status |
| :--- | :--- | :--- | :---: |
| **Kalkulator Alokasi Gaji** | Pengatur dan perencana alokasi keuangan gaji (Metode 50/30/20 & Kustom). | `17.alokasi_gaji/kalkulator_alokasigaji.html` | `Aktif` |
| **Pengatur Keuangan** | Modul pencatatan pemasukan, pengeluaran, dan manajemen anggaran bulanan. | `23.Pengatur_Uang/pengatur_uang.html` | `Aktif` |
| **Kalkulator Jam Lembur** | Penghitung jam kerja lembur dan kalkulasi estimasi upah lembur. | `30.hitung_jamlembur/hitungjamlembur.html` | `Aktif` |
| **Analisis Kripto** | Dashboard pemantau tren & kalkulator investasi aset kripto. | `26.analisis kripto/analisis_kripto_v1.html` | `Aktif` |
| **Manajemen Aset** | Sistem pencatatan inventaris dan pengelolaan aset entitas/perusahaan. | `24.manajemen_aset/manajemen_aset.html` | `Aktif` |

</details>

<details open>
<summary><b>🎮 6. Edukasi & Media</b></summary>

| Proyek | Deskripsi | File Utama | Status |
| :--- | :--- | :--- | :---: |
| **Mainan Edukasi Anak** | Web game interaktif untuk pembelajaran dan melatih kreativitas anak. | `Mainan Edukasi/mainan_edukasianak.html` | `Aktif` |
| **Pengenalan Warna** | Modul interaktif pengenalan warna untuk anak-anak. | `Mainan Edukasi/mainan edukasi warna/mainan_edukasi_warna.html` | `Aktif` |
| **Web Video Streaming** | Web player pemutar video dan streaming interaktif. | `14. web streaming video/web_streaming.html` | `Aktif` |
| **Metadata Musik** | Pencari dan pengelola tag metadata lagu/musik. | `25.cari_metadata_musik/cari_metadata_musik.html` | `Aktif` |

</details>

---

## 🛠️ Teknologi & Stack Digunakan

- **Frontend Core**: HTML5, CSS3 Vanilla, JavaScript (Modern ES6+ Vanilla JS).
- **UI Framework & Styling**: Bootstrap 5.3, Bootstrap Icons, Glassmorphism CSS, Flexbox & CSS Grid.
- **Features**: Responsive Design (Mobile & Desktop Ready), Light/Dark Mode Toggle, LocalStorage Persistence.

---

## 💻 Cara Penggunaan

### Option 1: Akses Langsung (Tanpa Download)
Buka link GitHub Pages repositori ini langsung melalui browser Anda:
👉 **[https://williyanto.github.io/production/](https://williyanto.github.io/production/)**

### Option 2: Jalankan Secara Lokal
1. **Clone Repositori:**
   ```bash
   git clone https://github.com/williyanto/production.git
   ```
2. **Masuk ke Direktori Project:**
   ```bash
   cd production
   ```
3. **Buka Aplikasi:**
   - Cukup klik ganda pada file `index.html` untuk membuka dashboard Hub Proyek.
   - Atau gunakan ekstensi **Live Server** di VS Code / Antigravity IDE untuk pengalaman pengembangan lokal yang lancar.

---

## 👨‍💻 Tentang Penulis

Dibuat dengan 💻 dan ⚡ oleh **Williyanto Adi**

- 🐙 **GitHub**: [@williyanto](https://github.com/williyanto)
- 🌐 **Web Repositori**: [williyanto/production](https://github.com/williyanto/production)

---

<div align="center">
  <small>© 2026 Williyanto Adi. All rights reserved.</small>
</div>
