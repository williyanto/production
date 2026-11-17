# 🚘 Servis.In — Aplikasi Web Perawatan Kendaraan Pintar

**Servis.In** adalah aplikasi web manajemen perawatan kendaraan dengan tampilan vertikal bergaya mobile (*clean & modern UI/UX*) untuk memantau jadwal ganti oli, servis berkala, penggantian sparepart, daftar periksa komponen, hingga riwayat dan proyeksi biaya bulanan.

---

## ✨ Fitur Utama

1. **Pengingat Ganti Oli, Servis, dan Ganti Sparepart (Mana yang Tercapai Dulu)**
   - Menghitung progres perawatan berdasarkan **Odometer (KM)** dan **Lama Perawatan Terakhir (Waktu/Bulan)**.
   - Menampilkan indikator prioritas otomatis berdasarkan **mana yang tercapai lebih dulu** (*whichever comes first*) lengkap dengan dual progress bar (Odometer vs Waktu).
   - Mendukung aksi cepat **Selesai Servis** yang langsung memperbarui odometer/tanggal perawatan terakhir dan mencatat pengeluaran ke Riwayat Biaya.

2. **Daftar Periksa / Cek Part (`Cek Part`)**
   - Menyajikan daftar komponen yang sudah lewat jadwal (*Overdue*) atau segera waktunya servis (*Due Soon*).
   - Menghitung estimasi total biaya dari part yang dicentang untuk diservis di bengkel.
   - Dilengkapi daftar pemeriksaan fisik & keamanan kendaraan (*Tekanan Ban, Lampu, Minyak Rem, Aki, CVT/Rantai*).

3. **Riwayat & Proyeksi Biaya Bulanan (`Biaya`)**
   - Navigasi lintas bulan: melihat **Bulan Sebelumnya** (histori pengeluaran aktual), **Bulan Ini**, hingga **Bulan yang Akan Datang** (proyeksi estimasi biaya servis berdasarkan prediksi odometer & jadwal jatuh tempo).
   - Grafik perbandingan 6 bulan interaktif dan rincian biaya per kategori (*Oli, Servis, Sparepart, Lainnya*).

4. **Profil Kendaraan & Pengingat Update Odometer (`Profil`)**
   - Menyimpan **Jenis Kendaraan**, **Nama Kendaraan** (otomatis tampil pada `<title>` halaman dan header utama), serta **Plat Nomor + Tahun** dengan visualisasi plat nomor kendaraan Indonesia.
   - **Pengingat Update Odometer** yang dapat diatur frekuensinya (**berapa hari sekali** atau **berapa minggu sekali**).

5. **Mode Gelap & Terang (`Dark / Light Mode`)**
   - Tema tampilan *clean modern* yang nyaman digunakan siang maupun malam hari.

6. **Tentang Aplikasi (`About`)**
   - Dilengkapi informasi aplikasi dan kredit footer **Williyanto Adi 2026**.

---

## 📂 Struktur File

```text
Servis.In/
├── assets/
│   └── icon.svg          # Ikon vektor aplikasi Servis.In
├── css/
│   └── styles.css        # Stylesheet Mobile Vertical UI (Light & Dark Mode)
├── js/
│   └── app.js            # Logika utama, kalkulasi Odo vs Waktu, Proyeksi Biaya & LocalStorage
├── index.html            # Halaman utama aplikasi (5 Tab Navigasi Bawah)
├── manifest.json         # Konfigurasi Web App Manifest (PWA)
└── README.md             # Dokumentasi proyek
```

---

**© 2026 Williyanto Adi**
