# 🎈 Dunia Ceria - Game Edukasi Interaktif Anak Usia 4 Tahun

Game edukasi web interaktif yang didesain khusus untuk anak usia prasekolah/PAUD (usia 4 tahun) untuk belajar **mengeja huruf/kata**, **berhitung angka dasar (1-10)**, dan **menebak huruf & angka dengan memecahkan balon**. Didesain dengan prinsip ramah anak: **bebas scroll**, visual cerah proporsional yang mengisi layar dengan nyaman, suara ceria, kontrol mandiri untuk melanjutkan permainan, dan motivasi tanpa rasa takut salah.

---

## ✨ Fitur & Pembaruan Utama

### 1. 🚫 Desain Layar Penuh Bebas Scroll & Berisi (Zero-Scroll & Well-Filled UI)
- Seluruh antarmuka dikunci secara presisi dalam **100vh / 100dvh** (`overflow: hidden`).
- Tata letak diatur dengan proporsi yang pas dan merata (`space-evenly`), tanpa menyisakan celah kosong yang menganga di bagian atas maupun bawah layar.
- Anak tidak perlu repot melakukan *scrolling*. Semua tombol, ilustrasi, kartu kata, dan maskot berada dalam satu bidang pandang yang nyaman di layar komputer, tablet/iPad, maupun smartphone.

### 2. ⚙️ Halaman Terpisah Pengaturan & Kustomisasi Belajar (Tombol ⚙️ di Navigasi)
- Semua kontrol kustomisasi diletakkan pada **halaman/layar terpisah (`#screen-settings`)** yang rapi dan terorganisir dengan tombol **⚙️** di menu bar atas.
- Tidak ada lagi tombol kustom yang berserakan di layar bermain anak, sehingga anak dapat fokus bermain dan belajar tanpa terganggu.
- Halaman pengaturan terbagi dalam 4 tab interaktif:
  - **🎪 Tab Hadiah Badut & Bintang**: Pengaturan reward badut berjoget, target bintang, dan durasi tarian.
  - **🔤 Tab Kustom Kata**: Input kata baru (misal: *MAMA*, *PAPA*, *AYAH*, nama anak) + preset cepat.
  - **🔢 Tab Kustom Angka**: Pemilihan angka 1 sampai 10 untuk langsung dilatih.
  - **🎈 Tab Kustom Balon**: Pemilihan huruf A-Z dan angka 1-9 untuk target balon.

### 3. 🎪 Reward Spesial: Badut Berjoget Ceria (Variasi Model & Durasi Kustom)
- **Target Bintang Kustom**: Ayah/Bunda dapat menentukan target pencapaian bintang (pilihan 5, 10, 15, 20 ⭐ atau input angka target sendiri).
- **Panggung Badut Berjoget (Clown Dancing Stage)**:
  - Begitu bintang mencapai target (misal: 10 bintang), layar panggung sirkus perayaan langsung terbuka otomatis!
  - Badut lucu berjoget dengan animasi kocak (goyang pinggul, lompat, tangan melambai, kaki mengetuk lantai disko, dan spotlight pesta panggung).
  - Dilengkapi musik karnaval sirkus (*Web Audio API*), terompet badut (*honk-honk!*), dan hujan konfeti.
- **Durasi Joget Kustom**: Durasi joget dapat diatur sesuai keinginan: **10 detik**, **20 detik**, atau **30 detik** dengan hitung mundur langsung (*live countdown*).
- **Variasi Model Badut**:
  1. 🤡 **Badut Boni si Pelangi**: Rambut afro pelangi, hidung merah bulat, baju polkadot toska, dan atraksi bola putar.
  2. 🎪 **Badut Bobo si Sirkus**: Topi kerucut kuning-merah, baju garis sirkus, kerah badut rimpel, dan atraksi piring putar.
  3. 🎩 **Badut Kiko si Pesulap**: Topi pesulap ungu dengan kelinci mengintip, dasi kupu-kupu emas, dan tongkat bintang berkilau.
  4. 🤹 **Badut Jojo si Pesta Disko**: Kacamata bintang kuning, afro biru neon, rompi disko, dan tiupan terompet emas bernada riang.
  5. 🎲 **Mode Acak Bergantian**: Karakter badut otomatis berganti setiap kali perayaan tercapai.
- **Fitur Pratinjau**: Tersedia tombol **"🎉 Coba Tonton Badut Joget Sekarang"** di halaman pengaturan untuk langsung menguji dan menikmati tontonan badut kapan saja.

### 3. 🔍 Ukuran Card Lebih Besar & Nyaman (Enlarged Cards)
- Kartu permainan **Belajar Mengeja**, **Belajar Berhitung**, dan **Pecahkan Balon** diperbesar secara substansial (`max-width: 920px`, tinggi dinamis hingga `560px`).
- Komponen di dalam kartu dibuat lebih leluasa:
  - Ilustrasi lebih besar (155x155px).
  - Kotak slot huruf dan gelembung huruf lebih besar (72x82px & 66x66px) dengan ukuran huruf 40px yang sangat jelas bagi balita.
  - Objek sentuh berhitung (86x86px) dan tombol angka (108x86px) sangat mudah disentuh jari kecil.
  - Balon terbang lebih besar (95x120px) dengan simbol 44px tebal.

### 4. 🎮 Kontrol Penuh Pengguna Saat Selesai Soal (Bebas Auto-Skip)
- Ketika anak berhasil menyelesaikan kata, hitungan, atau balon:
  - **Efek Konfeti & Suara Kemenangan Langsung Menyala Seketika**.
  - **Jendela Perayaan Tetap Tampil**: Tidak akan otomatis melompat sendiri ke soal berikutnya sebelum ditekan.
  - **Dua Pilihan Jelas**: Pengguna atau anak dapat menentukan sendiri langkah berikutnya melalui tombol:
    - **🚀 Lanjut Main!**: Melanjutkan ke tantangan berikutnya.
    - **🏠 Menu Utama**: Berhenti dan kembali memilih mode permainan lain.

### 3. 🔤 Belajar Mengeja Kata Bergambar
- Kosakata sederhana anak balita: *BOLA*, *APEL*, *IKAN*, *SUSU*, *BUKU*, *ROTI*, *MATA*, *TOPI*, *BEBEK*, *MOBIL*.
- Ilustrasi SVG vektor cerah, besar, dan tajam.
- Gelembung huruf berukuran besar yang ramah sentuhan, kotak slot huruf dengan animasi pop, dan tombol **🔊 Dengarkan** & **🔄 Ulangi**.

### 4. 🔢 Belajar Berhitung Interaktif (1 - 10)
- **Sentuh untuk Menghitung**: Objek melompat gembira saat disentuh balita, memunculkan nomor urut dan denting xilofon.
- Pilihan angka dilengkapi **titik panduan visual (`● ● ●`)** untuk membantu anak yang baru belajar mengenali lambang angka.

### 5. 🎈 Mode Mini Game: Pecahkan Balon Ceria
- Balon warna-warni melayang lembut di langit.
- Anak diajak mencari huruf atau angka target dan mengetuknya: **POP!** Balon meletus dengan efek partikel konfeti dan penambahan bintang.

### 6. 🎁 Album Stiker & Koleksi Hadiah
- Mengumpulkan bintang (⭐) dari setiap permainan akan membuka berbagai stiker menarik (*Bintang Emas, Es Krim Pelangi, Balon Udara, Roket, Mahkota, Piala, Pelangi, Medali Super*).

### 7. 💖 Sistem Motivasi Positif (Tanpa Rasa Takut)
- Tanpa tanda silang merah (❌) dan tanpa suara 'tetot'.
- Jika salah, kotak hanya bergetar lembut dan Maskot Ciko memberi dorongan penuh kasih sayang:
  > *"Ayo coba lagi, kamu pasti bisa! 🌈"*  
  > *"Hampir tepat! Yuk kita coba sekali lagi! ✨"*

### 8. 🐾 Maskot Interaktif Ciko si Kucing Cerdas
- Memiliki 3 ekspresi dinamis (Senang, Bersorak Topi Pesta, dan Menyemangati).
- *Easter Egg:* Jika avatar Ciko disentuh balita, Ciko akan melompat gembira, mengeluarkan suara mengeong lucu (*"Meoww!"*), dan memberikan kalimat kasih sayang.

### 9. 🎵 Musik Latar, Suara Sintetis & Layar Penuh
- Dilengkapi tombol **🎵 Musik Ceria** (melodi kotak musik xilofon yang menenangkan).
- Tombol **⛶ Layar Penuh** agar anak tidak sengaja menutup tab browser saat bermain di layar sentuh.
- Seluruh efek audio dibuat dengan **Web Audio API** (100% mandiri dan dapat dimainkan secara offline).

---

## 🚀 Cara Menjalankan Game

1. Buka folder:
   ```
   d:\My Project\Mengkoding\WEB\04_EXPERIMENTS\game_edukasi
   ```
2. Klik ganda file **`index.html`** untuk langsung membukanya di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
3. Untuk pengalaman terbaik bagi balita, tekan tombol **⛶** di pojok kanan atas untuk mengaktifkan mode layar penuh.

---

## 📁 Struktur Berkas

```
game_edukasi/
├── index.html            # Halaman utama game edukasi (Fitur Zero-Scroll & Footer)
├── manifest.json         # Manifest PWA (bisa diinstal di layar beranda tablet/HP)
├── README.md             # Panduan lengkap
├── assets/
│   └── icon.svg          # Ikon aplikasi ceria Ciko
├── css/
│   └── styles.css        # Desain visual ceria, presisi 100vh tanpa scroll & tata letak penuh
└── js/
    ├── confetti.js       # Efek ledakan konfeti partikel canvas 60 FPS
    ├── audio.js          # Generator efek suara Web Audio API & pelafalan Speech API
    ├── words-data.js     # Bank kata mengeja + ilustrasi kartun SVG
    ├── numbers-data.js   # Bank hitungan 1-10 + objek interaktif
    ├── stickers-data.js  # Bank stiker hadiah koleksi bintang
    └── app.js            # Logika game, kendali lanjut manual, alur bintang, & maskot
```

---

<p align="center">
  <b>Williyanto Adi 2026</b>
</p>
