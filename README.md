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



- 🎯 **Pencarian Real-Time & Pintasan Keyboard**: Cari alat secara instan melalui kotak pencarian utama, *floating search bar*, atau tekan **`/`** / **`Ctrl + K`**.

- 🎨 **Filter Kategori & Status Dinamis**: Saring modul berdasarkan bidang (Kelistrikan, Produksi Kabel, Uji Material, Keuangan, Edukasi, Utility, dll.) maupun status **Aktif Saja (27)** lengkap dengan penghitung otomatis.

- ⭐ **Pin Proyek Favorit & Riwayat Terakhir Dibuka**: Tandai proyek favorit agar selalu berada di urutan teratas dan akses kembali 5 modul terakhir yang baru saja dibuka dengan cepat.

- 🔃 **Pengurutan Multi-Kriteria (Sort)**: Urutkan daftar proyek berdasarkan Nomor (1–50), Nama (A–Z / Z–A), atau Versi Terbaru.

- 🌓 **Tema Mode Gelap / Terang & Tampilan Grid / List**: Beralih mode tampilan dan tata letak dengan penyimpanan preferensi otomatis (`localStorage`).

- 📲 **Native Share & Mobile Floating Dock**: Bagikan tautan proyek langsung ke WhatsApp/Telegram melalui *Web Share API* di perangkat *mobile* dengan *floating dock* modern yang responsif.



---



## 🗂️ Katalog Proyek & Fitur Unggulan



<details open>

<summary><b>🔌 1. Kelistrikan & Teknik Kabel</b></summary>



| Proyek | Deskripsi & Standar | File Utama | Status |

| :--- | :--- | :--- | :---: |

| **Kalkulator Hambatan Konduktor** | Perhitungan hambatan listrik konduktor kabel berdasarkan standar internasional **IEC 60228**, **ICEA**, **AS/NZS**, **SPLN**, dan **BS EN**. | [`kalkulator_hambatan_kabel/iec_final_v20261104.html`](./kalkulator_hambatan_kabel/iec_final_v20261104.html) | `Aktif` |

| **Faktor Koreksi Suhu** | Penghitung faktor koreksi suhu untuk penyesuaian nilai hambatan konduktor pada berbagai temperatur acuan. | [`faktor_koreksi_suhu_v20261031.html`](./faktor_koreksi_suhu_v20261031.html) | `Aktif` |

| **Kalkulasi Dimensi Kabel** | Kalkulator untuk menghitung dimensi dan spesifikasi teknis kabel standar PLN & IEC (Open GAP, Overlap Armour, Equalizing Tape, Wire Screen Area, & Eccentricity). | [`kalkulasi_dimensi_v20261104.html`](./kalkulasi_dimensi_v20261104.html) | `Aktif` |

| **Konversi Kabel mm² ↔ AWG** | Alat konversi presisi untuk ukuran penampang kabel antara milimeter persegi (mm²) dan standar AWG/kcmil. | [`konversi_mm2_to_awg_v20261001.html`](./konversi_mm2_to_awg_v20261001.html) | `Aktif` |

| **Kalkulator Biaya Listrik Otomatis** | Perhitungan konsumsi daya alat elektronik & estimasi tagihan listrik PLN (harian, bulanan). | [`kalkulator_daya_listrik_v20261007.html`](./kalkulator_daya_listrik_v20261007.html) | `Aktif` |



</details>



<details open>

<summary><b>🏭 2. Produksi Kabel & Manufaktur Industri</b></summary>



| Proyek | Deskripsi | File Utama | Status |

| :--- | :--- | :--- | :---: |

| **Kalkulator Drum Kabel** | Estimasi total panjang kabel yang tergulung dalam drum kayu/besi (*CableMetrics*). | [`kalkulator_drum_kabel_v20261104.html`](./kalkulator_drum_kabel_v20261104.html) | `Aktif` |

| **Estimasi Waktu Rewind Kabel** | Kalkulasi durasi waktu proses penggulungan (*rewinding*) dan *coiling* kabel produksi. | [`hitung_waktu_rewind_v20261104.html`](./hitung_waktu_rewind_v20261104.html) | `Aktif` |

| **Kalkulator Presisi Potongan Kabel** | Aplikasi perhitungan presisi untuk potongan kabel dan toleransi scrap. | [`slice_calculation_v20261104.html`](./slice_calculation_v20261104.html) | `Aktif` |

| **Kalkulator Berat Kawat (Stranding)** | Aplikasi perhitungan berat kawat dan stranding untuk proses produksi kabel. | [`wire_weight_calculation_v20261104.html`](./wire_weight_calculation_v20261104.html) | `Aktif` |



</details>



<details open>

<summary><b>🧪 3. Pengujian Material & Laboratorium</b></summary>



| Proyek | Deskripsi | File Utama | Status |

| :--- | :--- | :--- | :---: |

| **Kalkulator Pengujian Kabel Terpadu** | Perhitungan parameter pengujian insulasi kabel: Insulation Resistance (IR), Capacitance, & SCR. | [`kalkulator_ircapscr_v20261109.html`](./kalkulator_ircapscr_v20261109.html) | `Aktif` |

| **Kalkulator Spek IR Kabel** | Perhitungan spesifikasi dan evaluasi batas kelulusan Insulation Resistance (IR) kabel (LSOH, PVC, XLPE) pada suhu operasi & suhu ruang. | [`spek_ir_v20261103.html`](./spek_ir_v20261103.html) | `Aktif` |

| **Kapasitas Rak Kabel (Flame Retardant)** | Analisis pembebanan & kapasitas penataan kabel tahan api (*Flame Retardant*) pada rak kabel. | [`flame_retardant_v20261104.html`](./flame_retardant_v20261104.html) | `Aktif` |

| **Uji Bending Mandrel** | Perhitungan ukuran mandrel & keliling lap pengujian tekuk kabel (*Mandrel Bending Test*). | [`uji_bending_v20261031.html`](./uji_bending_v20261031.html) | `Aktif` |

| **Cold Bending & Heat Shock** | Evaluasi dan kalkulator batas uji ketahanan suhu dingin (*Cold Bending*) & kejutan panas (*Heat Shock*). | [`coldbending_heatshock/coldbending_v20261031.html`](./coldbending_heatshock/coldbending_v20261031.html) | `Aktif` |



</details>



<details open>

<summary><b>🛠️ 4. Utility & Tools Harian</b></summary>



| Proyek | Deskripsi | File Utama | Status |

| :--- | :--- | :--- | :---: |

| **Kalkulator Waktu Pro** | Penghitung selisih jam/menit, selisih tanggal, dan konversi durasi interval waktu. | [`kalkulator_waktu_v20261031.html`](./kalkulator_waktu_v20261031.html) | `Aktif` |

| **Generator Angka Acak** | Penghasil angka acak (*Random Number Generator*) dengan kustomisasi rentang & statistik. | [`generator_angka_v20261104.html`](./generator_angka_v20261104.html) | `Aktif` |

| **Konverter Satuan Teknik** | Konversi presisi satuan Panjang (m, ft, in, mi), Tekanan (MPa, N/mm², Bar, PSI), Massa/Gaya (kgf, N, daN), & Suhu (°C, °F, K). | [`konverter_satuan_teknik_v20261109.html`](./konverter_satuan_teknik_v20261109.html) | `Aktif` |

| **Kalkulator Persentase Pro** | Alat hitung persentase cepat untuk diskon, kenaikan/penurunan harga, dan rasio. | [`hitung_persen_v20261031.html`](./hitung_persen_v20261031.html) | `Aktif` |

| **Monitoring Pengisian BBM** | Pencatatan & analisis konsumsi bahan bakar minyak (BBM), rasio km/liter, dan ekspor PDF/Excel. | [`monitoring_bbm_v20261001.html`](./monitoring_bbm_v20261001.html) | `Aktif` |

| **Pencari Rata-Rata** | Menghitung nilai rata-rata dari sekumpulan data numerik dengan cepat dan mudah. | [`pencari_rata_rata_v20261001.html`](./pencari_rata_rata_v20261001.html) | `Aktif` |

| **Rapihkan Teks** | Alat bantu untuk merapikan dan mengubah format teks (Uppercase, Lowercase, dll). | [`rapihkan_teks_v20261007.html`](./rapihkan_teks_v20261007.html) | `Aktif` |



</details>



<details open>

<summary><b>💰 5. Keuangan & Manajemen</b></summary>



| Proyek | Deskripsi | File Utama | Status |

| :--- | :--- | :--- | :---: |

| **AssetPro – Manajemen Aset** | Sistem pendataan aset terpadu dengan Barcode, QR Code, statistik tahunan, & ekspor PDF/Excel. | [`manajemen_aset_v20261001.html`](./manajemen_aset_v20261001.html) | `Aktif` |

| **RoadTrip Budgeting** | Perencanaan anggaran perjalanan road trip, estimasi rute/jarak, konsumsi BBM, & rincian biaya. | [`trip_planner_v20261007.html`](./trip_planner_v20261007.html) | `Aktif` |

| **Kalkulator Alokasi Gaji** | Pengatur dan perencana alokasi keuangan gaji (Metode 50/30/20 & Kustom). | [`kalkulator_alokasi_gaji_v20261007.html`](./kalkulator_alokasi_gaji_v20261007.html) | `Aktif` |

| **Kalkulator Lembur** | Penghitung jam kerja lembur dan kalkulasi estimasi upah lembur sesuai standar peraturan. | [`hitung_lembur_v20261031.html`](./hitung_lembur_v20261031.html) | `Aktif` |



</details>



<details open>

<summary><b>🎮 6. Edukasi & Media</b></summary>



| Proyek | Deskripsi | File Utama | Status |

| :--- | :--- | :--- | :---: |

| **Visualizer Konstruksi Penampang Kabel** | Simulasi visual 2D interaktif penampang & kupasan lapisan kabel (N2XSY, N2XSEBY, NYFGBY, NYRGBY, NYY, FRC, NFA2X) beserta arti kode nomenklatur. | [`visualizer_konstruksi_kabel_v20261109.html`](./visualizer_konstruksi_kabel_v20261109.html) | `Aktif` |
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

