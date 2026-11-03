# 📐 Panduan Desain & Konfigurasi Arsitektur Kalkulator Hambatan Kabel
### *Spesifikasi UI/UX, Kamus Data, Formula Matematis, dan Panduan Migrasi ke Proyek/Aplikasi Lain*

Dokumen ini disusun sebagai **Blueprint Desain & Konfigurasi Teknis** dari modul **Kalkulator Hambatan Konduktor Kabel** (`kalkulator_hambatan_kabel`). Dokumentasi ini dirancang agar pengembang atau perancang sistem dapat mereplikasi antarmuka pengguna (UI/UX), logika perhitungan, serta struktur konfigurasi data ke berbagai platform dan *framework* lain (misalnya **React**, **Next.js**, **Vue**, **Svelte**, **Flutter**, **React Native**, atau **Backend REST API**).

---

## 📑 Daftar Isi
1. [Ringkasan Modul & Standar Acuan](#1-ringkasan-modul--standar-acuan)
2. [Sistem Desain UI/UX (Design System Specification)](#2-sistem-desain-uiux-design-system-specification)
   - [Prinsip Tata Letak & Responsivitas](#prinsip-tata-letak--responsivitas)
   - [Matriks Tema Warna Per Standar](#matriks-tema-warna-per-standar)
   - [Tipografi & Hirarki Visual](#tipografi--hirarki-visual)
   - [Mode Gelap & Terang (Dark/Light Mode)](#mode-gelap--terang-darklight-mode)
   - [Anatomi Komponen Antarmuka](#anatomi-komponen-antarmuka)
3. [Rumus Matematis & Logika Kalkulasi](#3-rumus-matematis--logika-kalkulasi)
   - [Formula Hambatan Terkoreksi 20°C (R₂₀)](#formula-hambatan-terkoreksi-20c-r)
   - [Formula Estimasi Panjang Kabel (L)](#formula-estimasi-panjang-kabel-l)
   - [Formula Faktor Koreksi Suhu (kt)](#formula-faktor-koreksi-suhu-kt)
   - [Pengujian Khusus Kabel Instrumen (BS EN 50288-7)](#pengujian-khusus-kabel-instrumen-bs-en-50288-7)
4. [Struktur Data & Kamus Konfigurasi (Data Dictionaries)](#4-struktur-data--kamus-konfigurasi-data-dictionaries)
   - [Struktur Tabel Koreksi Suhu](#struktur-tabel-koreksi-suhu)
   - [Struktur Batas Spesifikasi Konduktor](#struktur-batas-spesifikasi-konduktor)
5. [Logika Interaksi & Validasi Input](#5-logika-interaksi--validasi-input)
6. [Panduan Implementasi ke Framework Lain (Next Project)](#6-panduan-implementasi-ke-framework-lain-next-project)
   - [Integrasi ke React / Next.js (TypeScript)](#integrasi-ke-react--nextjs-typescript)
   - [Integrasi ke Vue 3 (Composition API)](#integrasi-ke-vue-3-composition-api)
   - [Integrasi ke Flutter / Mobile App](#integrasi-ke-flutter--mobile-app)
   - [Integrasi ke REST API (Node.js / Express atau Python)](#integrasi-ke-rest-api-nodejs--express-atau-python)
7. [Checklist Pengujian & QA (Quality Assurance)](#7-checklist-pengujian--qa-quality-assurance)

---

## 1. Ringkasan Modul & Standar Acuan

Modul ini menyediakan suite kalkulator teknik elektro dan manufaktur kabel untuk menguji dan mengevaluasi hambatan konduktor kabel berdasarkan 5 standar internasional:

| Standar Acuan | File Sumber | Tema Visual | Cakupan Pengujian |
| :--- | :--- | :--- | :--- |
| **IEC 60228** | `iec_final_v20261028.html` | Emerald / Teal | Konduktor Tembaga (CU), Tinned Copper (TCU), Aluminium (AL). Kelas 1, 2, 5, 6. |
| **ICEA S-95-658 / NEMA** | `icea_final_v20261028.html` | Blue / Indigo | Konduktor standar Amerika (AWG/kcmil dan mm²), Uncoated & Coated. |
| **AS/NZS 1125** | `as_final_v20261028.html` | Purple / Violet | Standar Australia/New Zealand, spesifikasi Single Core & Multi Core. |
| **SPLN 41 / SNI** | `spln_final_v20261028.html` | Orange / Amber | Standar PLN Indonesia, kabel distribusi LV/MV, konduktor tembaga & aluminium. |
| **BS EN 50288-7** | `bsen_final_v20261028.html` | Cyan / Sky | Kabel Instrumentasi Terpadu: Conductor Res. (CR), Insulation Res. (IR), Mutual Cap. (MC), L/R Ratio. |

---

## 2. Sistem Desain UI/UX (Design System Specification)

### Prinsip Tata Letak & Responsivitas
- **Single-Screen Fitting (`h-[100dvh]`)**: Aplikasi dirancang agar pas dalam satu layar perangkat seluler tanpa perlu *scroll* berlebih, namun tetap mendukung scroll internal yang halus (`scrollbar-none`) jika dimensi layar sangat kompak.
- **Card Container Glassmorphism**:
  - Lebar maksimum: `max-w-md mx-auto w-full` (optimal untuk mobile dan rapi saat dibuka di desktop).
  - Latar: `bg-white/95 dark:bg-slate-900/95 backdrop-blur-md`.
  - Border: `border border-slate-200/50 dark:border-slate-800/80`.
  - Sudut: `rounded-3xl` (radius 24px) dengan bayangan halus `shadow-xl`.
- **Latar Belakang Ambient (Desktop Only)**:
  - Dua lingkaran gradien lembut (`blur-[100px]`, `animate-pulse`) di pojok kiri atas dan kanan bawah dengan *opacity* rendah (`opacity-40` di light mode, `opacity-20` di dark mode).

### Matriks Tema Warna Per Standar
Setiap halaman standar memiliki aksen identitas visual yang seragam:

```css
/* 1. IEC 60228 (Emerald/Teal) */
--iec-primary: #10b981;      /* emerald-500 */
--iec-secondary: #0d9488;    /* teal-600 */
--iec-gradient: linear-gradient(135deg, #10b981, #0d9488);

/* 2. ICEA S-95-658 (Blue/Indigo) */
--icea-primary: #3b82f6;     /* blue-500 */
--icea-secondary: #4f46e5;   /* indigo-600 */
--icea-gradient: linear-gradient(135deg, #3b82f6, #4f46e5);

/* 3. AS/NZS 1125 (Purple/Violet) */
--as-primary: #a855f7;       /* purple-500 */
--as-secondary: #6366f1;     /* indigo-600 */
--as-gradient: linear-gradient(135deg, #a855f7, #6366f1);

/* 4. SPLN 41 (Orange/Amber) */
--spln-primary: #f97316;     /* orange-500 */
--spln-secondary: #d97706;   /* amber-600 */
--spln-gradient: linear-gradient(135deg, #f97316, #d97706);

/* 5. BS EN 50288-7 (Cyan/Sky) */
--bsen-primary: #06b6d4;     /* cyan-500 */
--bsen-secondary: #0284c7;   /* sky-600 */
--bsen-gradient: linear-gradient(135deg, #06b6d4, #0284c7);
```

### Tipografi & Hirarki Visual
- **Primary Font Family**: `'Plus Jakarta Sans', sans-serif`
- **Monospace Font** (untuk angka hasil & nilai acuan): `'JetBrains Mono', 'Fira Code', monospace`
- **Hirarki Teks**:
  - Judul Header: `text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight`
  - Subjudul Standar: `text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider`
  - Section Badge: `text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500`
  - Input Label: `text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400`
  - Angka Hasil Kalkulasi: `text-2xl font-extrabold text-center font-mono`

### Mode Gelap & Terang (Dark/Light Mode)
- **Engine**: Tailwind CSS `class` strategy (`<html class="dark">`).
- **Penyimpanan Status**: `localStorage.getItem('theme')` dengan nilai `'dark'` atau `'light'`.
- **Fallback**: Mendeteksi `window.matchMedia('(prefers-color-scheme: dark)')`.
- **Transisi Halus**: `transition-colors duration-300`.

### Anatomi Komponen Antarmuka

```
+-------------------------------------------------------------+
| [Icon] Kalkulator Hambatan                  [Theme Toggle]  |
|        IEC 60228 STANDARD                                   |
+-------------------------------------------------------------+
| [ IEC ]  [ ICEA ]  [ AS/NZS ]  [ SPLN ]  [ BS EN ]          | <- Segmented Standard Switcher
+-------------------------------------------------------------+
| [  ⚡ Hitung Hambatan (Active)  ] [  📏 Estimasi Panjang   ] | <- Mode Selector
+-------------------------------------------------------------+
| PARAMETER PENGUKURAN                                        |
| +-------------------------+     +-------------------------+ |
| | Pembacaan      [mΩ] [Ω] |     | Panjang Kabel           | |
| | [ 0.145     ]        mΩ |     | [ 100       ]     Meter | |
| +-------------------------+     +-------------------------+ |
| +-------------------------+     +-------------------------+ |
| | Suhu (°C)               |     | Faktor Koreksi (kt)     | |
| | [ 28.5      ]        °C |     | [ 0.9675    ]    Lookup | |
| +-------------------------+     +-------------------------+ |
+-------------------------------------------------------------+
| SPESIFIKASI KONDUKTOR                                       |
| +-------------------------+     +-------------------------+ |
| | Jenis Konduktor         |     | Ukuran Penampang (mm²)  | |
| | [ Cu - Bare Copper   v] |     | [ 120 mm²            v] | |
| +-------------------------+     +-------------------------+ |
| Info Acuan Standar: Single Core: 0.153 | Multi Core: 0.153  |
+-------------------------------------------------------------+
| HASIL KALKULASI                                             |
| +---------------------------------------------------------+ |
| |                       0.1402 Ω/km                       | |
| |     ✓ Hasil pengujian memenuhi spesifikasi standar.     | |
| +---------------------------------------------------------+ |
+-------------------------------------------------------------+
| [ < Kembali ]           [ ↺ Reset ]           [ ⌂ Beranda ] |
+-------------------------------------------------------------+
```

---

## 3. Rumus Matematis & Logika Kalkulasi

### Formula Hambatan Terkoreksi 20°C ($R_{20}$)
Hambatan konduktor yang diukur pada suhu $T$ dan panjang kabel $L$ dinormalisasi ke hambatan standar pada $20^\circ\text{C}$ per kilometer ($\Omega/\text{km}$):

$$R_{20} = \left(\frac{R_{\text{baca}}}{L}\right) \times k_t$$

**Ketentuan Satuan:**
1. Jika $R_{\text{baca}}$ dalam satuan **Ohm ($\Omega$)** dan panjang $L$ dalam **Meter (m)**:
   $$R_{20} = \left(\frac{R_{\Omega} \times 1000}{L_{\text{meter}}}\right) \times k_t$$
2. Jika $R_{\text{baca}}$ dalam satuan **mili-Ohm ($\text{m}\Omega$)** dan panjang $L$ dalam **Meter (m)**:
   $$R_{20} = \left(\frac{R_{\text{m}\Omega}}{L_{\text{meter}}}\right) \times k_t$$
   *(karena $1\,\Omega/\text{km} = 1\,\text{m}\Omega/\text{m}$)*.

### Formula Estimasi Panjang Kabel ($L$)
Digunakan untuk memperkirakan panjang kabel yang tergulung atau terpasang berdasarkan nilai hambatan acuan standar pada $20^\circ\text{C}$ ($R_{\text{acuan}}$):

$$L = \frac{R_{\text{baca}} \times k_t}{R_{\text{acuan}}}$$

- Jika $R_{\text{baca}}$ diinput dalam $\Omega$, kalikan dengan 1000 terlebih dahulu agar konsisten dengan satuan meter:
  $$L_{\text{meter}} = \frac{(R_{\Omega} \times 1000) \times k_t}{R_{\text{acuan}\,(\Omega/\text{km})}}$$

### Formula Faktor Koreksi Suhu ($k_t$)
Jika nilai suhu tidak tercantum dalam tabel acuan cepat, gunakan rumus analitis standar internasional:

$$k_t = \frac{c + 20}{c + T}$$

Di mana konstanta material ($c$) adalah:
- **Tembaga Polos & Tinned (CU & TCU)**: $c = 234.5$
  $$k_{t,\text{Cu}} = \frac{254.5}{234.5 + T}$$
- **Aluminium (AL)**: $c = 228.0$
  $$k_{t,\text{Al}} = \frac{248.0}{228.0 + T}$$

### Pengujian Khusus Kabel Instrumen (BS EN 50288-7)
Untuk kabel instrumentasi pada `bsen_final_v20261028.html`, tersedia 4 parameter evaluasi:

1. **Conductor Resistance (CR)**:
   $$CR_{20} = \left(\frac{CR_{\text{ukur}}}{L_{\text{meter}}}\right) \times k_t \quad [\Omega/\text{km}]$$
   *Evaluasi: Memenuhi jika $CR_{20} \le \text{Spek Max}$.*

2. **Insulation Resistance (IR)**:
   $$IR_{20} = IR_{\text{ukur}} \times \left(\frac{L_{\text{meter}}}{1000}\right) \times k_{t,\text{ins}} \quad [\text{G}\Omega\cdot\text{km}]$$
   *Evaluasi: Memenuhi jika $IR_{20} \ge \text{Spek Min}$.*

3. **Mutual Capacitance (MC)**:
   $$MC = \frac{Cap_{\text{ukur}}}{L_{\text{meter}} / 1000} \quad [\text{nF/km}]$$
   *Evaluasi: Memenuhi jika $MC \le \text{Spek Max}$.*

4. **L/R Ratio (Inductance to Resistance)**:
   $$L/R = \frac{\text{Induktansi}\,(\mu\text{H})}{CR\,(\Omega)} \quad [\mu\text{H}/\Omega]$$
   *Evaluasi: Memenuhi jika $L/R \le \text{Batas Max}$ (misal: $\le 25\,\mu\text{H}/\Omega$).*

---

## 4. Struktur Data & Kamus Konfigurasi (Data Dictionaries)

### Struktur Tabel Koreksi Suhu
Format kamus JSON untuk faktor koreksi suhu (rentang 5.0°C hingga 90.0°C):

```javascript
const CORRECTION_FACTORS = {
  CU: {
    "5.0": "1.064", "10.0": "1.042", "15.0": "1.020",
    "20.0": "1.000", "25.0": "0.980", "28.0": "0.969",
    "30.0": "0.962", "35.0": "0.943", "40.0": "0.926",
    "50.0": "0.893", "70.0": "0.833", "90.0": "0.781"
  },
  AL: {
    "5.0": "1.064", "10.0": "1.042", "15.0": "1.020",
    "20.0": "1.000", "25.0": "0.980", "28.0": "0.969",
    "30.0": "0.962", "35.0": "0.943", "40.0": "0.926",
    "50.0": "0.893", "70.0": "0.833", "90.0": "0.781"
  },
  TCU: {
    /* Sama dengan CU */
  }
};
```

### Struktur Batas Spesifikasi Konduktor
Format kamus batas hambatan maksimum standar (dalam $\Omega/\text{km}$ pada $20^\circ\text{C}$):

```typescript
interface ConductorSpec {
  acuan: Record<string, string>;       // Format: "ukuran_mm2": "nilai_max_ohm_km"
  single_core?: Record<string, string>;
  multi_core?: Record<string, string>;
}

const SPEC_VALUES: Record<"CU" | "AL" | "TCU", ConductorSpec> = {
  CU: {
    acuan: {
      "0.5": "36.0",
      "0.75": "24.5",
      "1.0": "18.1",
      "1.5": "12.1",
      "2.5": "7.41",
      "4": "4.61",
      "6": "3.08",
      "10": "1.83",
      "16": "1.15",
      "25": "0.727",
      "35": "0.524",
      "50": "0.387",
      "70": "0.268",
      "95": "0.193",
      "120": "0.153",
      "150": "0.124",
      "185": "0.0991",
      "240": "0.0754",
      "300": "0.0601",
      "400": "0.0470",
      "500": "0.0366",
      "630": "0.0283"
    }
  },
  AL: {
    acuan: {
      "10": "3.08",
      "16": "1.91",
      "25": "1.20",
      "35": "0.868",
      "50": "0.641",
      "70": "0.443",
      "95": "0.320",
      "120": "0.253",
      "150": "0.206",
      "185": "0.164",
      "240": "0.125",
      "300": "0.100",
      "400": "0.0778",
      "500": "0.0605",
      "630": "0.0469"
    }
  },
  TCU: {
    acuan: {
      "0.5": "36.7",
      "0.75": "24.8",
      "1.0": "18.2",
      "1.5": "12.2",
      "2.5": "7.56",
      "4": "4.70",
      "6": "3.11",
      "10": "1.84",
      "16": "1.16",
      "25": "0.734"
    }
  }
};
```

---

## 5. Logika Interaksi & Validasi Input

1. **Dukungan Koma (`,`) & Titik (`.`)**:
   - Pengguna Indonesia terbiasa mengetik koma untuk desimal.
   - Script otomatis mengonversi `,` menjadi `.` saat *input event* terjadi:
     ```javascript
     function sanitizeNumeric(val) {
       let clean = val.replace(/,/g, '.');
       const parts = clean.split('.');
       if (parts.length > 2) {
         clean = parts[0] + '.' + parts.slice(1).join('');
       }
       return clean.replace(/[^0-9.]/g, '');
     }
     ```
2. **Perhitungan Real-Time (Tanpa Tombol Submit)**:
   - Setiap kali salah satu input berubah (`pembacaan`, `panjang`, `suhu`, `konduktor`, `penampang`, atau `satuan`), fungsi `hitungHasil()` dipanggil secara otomatis.
3. **Status Visual Evaluasi**:
   - **Lolos / Memenuhi**: Nilai hasil $\le$ Spek Max $\rightarrow$ Warna teks hijau (`text-green-500` / `dark:text-green-400`), badge sukses.
   - **Gagal / Melebihi**: Nilai hasil $>$ Spek Max $\rightarrow$ Warna teks merah (`text-red-500` / `dark:text-rose-400`), badge peringatan.
   - **Mode Panjang**: Warna ungu/biru tema (`text-purple-600` / `dark:text-purple-400`).

---

## 6. Panduan Implementasi ke Framework Lain (Next Project)

### Integrasi ke React / Next.js (TypeScript)

Berikut adalah modul logika inti (*custom hook*) siap pakai untuk proyek React/Next.js:

```tsx
// useCableResistance.ts
import { useState, useMemo } from 'react';

export type UnitType = 'mohm' | 'ohm';
export type ModeType = 'hambatan' | 'panjang';
export type ConductorType = 'CU' | 'AL' | 'TCU';

export function useCableResistance() {
  const [mode, setMode] = useState<ModeType>('hambatan');
  const [unit, setUnit] = useState<UnitType>('mohm');
  const [reading, setReading] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [temp, setTemp] = useState<string>('');
  const [conductor, setConductor] = useState<ConductorType>('CU');
  const [size, setSize] = useState<string>('120');

  // Hitung Faktor Koreksi Suhu (kt)
  const correctionFactor = useMemo(() => {
    const t = parseFloat(temp.replace(',', '.'));
    if (isNaN(t)) return null;
    const c = conductor === 'AL' ? 228.0 : 234.5;
    return (c + 20) / (c + t);
  }, [temp, conductor]);

  // Kalkulasi Hasil
  const calculation = useMemo(() => {
    const r = parseFloat(reading.replace(',', '.'));
    const l = parseFloat(length.replace(',', '.'));
    const kt = correctionFactor;

    if (isNaN(r) || r <= 0 || !kt) return null;

    // Normalisasi ke mΩ jika unitnya Ohm
    const rMohm = unit === 'ohm' ? r * 1000 : r;

    if (mode === 'panjang') {
      const acuan = l; // Pada mode panjang, input length diisi nilai acuan standar (Ω/km)
      if (isNaN(acuan) || acuan <= 0) return null;
      const meter = (rMohm * kt) / acuan;
      return {
        type: 'panjang',
        value: meter,
        formatted: meter.toFixed(2),
        unit: 'Meter'
      };
    } else {
      if (isNaN(l) || l <= 0) return null;
      const r20 = (rMohm / l) * kt;
      return {
        type: 'hambatan',
        value: r20,
        formatted: r20.toFixed(4),
        unit: 'Ω/km'
      };
    }
  }, [reading, length, correctionFactor, unit, mode]);

  return {
    mode, setMode,
    unit, setUnit,
    reading, setReading,
    length, setLength,
    temp, setTemp,
    conductor, setConductor,
    size, setSize,
    correctionFactor,
    calculation
  };
}
```

### Integrasi ke Vue 3 (Composition API)

```vue
<!-- CableCalculator.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue';

const mode = ref<'hambatan' | 'panjang'>('hambatan');
const unit = ref<'mohm' | 'ohm'>('mohm');
const reading = ref('');
const length = ref('');
const temperature = ref('20');
const conductor = ref<'CU' | 'AL' | 'TCU'>('CU');

const kt = computed(() => {
  const t = parseFloat(temperature.value.replace(',', '.'));
  if (isNaN(t)) return 1.0;
  const c = conductor.value === 'AL' ? 228 : 234.5;
  return (c + 20) / (c + t);
});

const result = computed(() => {
  const r = parseFloat(reading.value.replace(',', '.'));
  const l = parseFloat(length.value.replace(',', '.'));
  if (!r || !l || !kt.value) return null;

  const rMili = unit.value === 'ohm' ? r * 1000 : r;
  if (mode.value === 'panjang') {
    return ((rMili * kt.value) / l).toFixed(2); // l bertindak sebagai acuan Ω/km
  }
  return ((rMili / l) * kt.value).toFixed(4);
});
</script>
```

### Integrasi ke Flutter / Mobile App

Untuk replikasi di Flutter, model logika dapat dibuat sebagai *pure Dart class*:

```dart
// cable_calculator_service.dart
class CableCalculatorService {
  static double getCorrectionFactor({
    required double tempCelsius,
    required bool isAluminium,
  }) {
    final double c = isAluminium ? 228.0 : 234.5;
    return (c + 20.0) / (c + tempCelsius);
  }

  static double calculateR20({
    required double reading,
    required double lengthMeter,
    required double tempCelsius,
    required bool isOhmUnit,
    required bool isAluminium,
  }) {
    final double readingMiliOhm = isOhmUnit ? reading * 1000.0 : reading;
    final double kt = getCorrectionFactor(
      tempCelsius: tempCelsius,
      isAluminium: isAluminium,
    );
    return (readingMiliOhm / lengthMeter) * kt;
  }

  static double estimateLength({
    required double reading,
    required double specOhmPerKm,
    required double tempCelsius,
    required bool isOhmUnit,
    required bool isAluminium,
  }) {
    final double readingMiliOhm = isOhmUnit ? reading * 1000.0 : reading;
    final double kt = getCorrectionFactor(
      tempCelsius: tempCelsius,
      isAluminium: isAluminium,
    );
    return (readingMiliOhm * kt) / specOhmPerKm;
  }
}
```

### Integrasi ke REST API (Node.js / Express atau Python)

Contoh *schema request* & *response* jika logika ini dijadikan Microservice:

**Request Body (`POST /api/v1/cable/calculate`):**
```json
{
  "standard": "IEC_60228",
  "conductor": "CU",
  "crossSection": "120",
  "readingValue": 0.145,
  "readingUnit": "ohm",
  "cableLengthMeter": 1000,
  "temperatureCelsius": 28.5,
  "mode": "RESISTANCE"
}
```

**Response Body (`200 OK`):**
```json
{
  "status": "success",
  "data": {
    "r20_ohm_per_km": 0.1402,
    "temperatureCorrectionFactor": 0.9675,
    "standardMaxLimit": 0.153,
    "isCompliant": true,
    "evaluationMessage": "Hasil pengujian memenuhi spesifikasi standar IEC 60228."
  }
}
```

---

## 7. Checklist Pengujian & QA (Quality Assurance)

Sebelum merilis implementasi baru pada proyek turunan, pastikan skenario berikut teruji:

- [ ] **Validasi Nol & Negatif**: Input 0 atau angka negatif tidak memunculkan pesan error *crash* atau `Infinity`.
- [ ] **Desimal Koma & Titik**: Input desimal dengan tanda koma (`1,25`) dan titik (`1.25`) menghasilkan angka yang identik.
- [ ] **Toggle Satuan (mΩ ↔ Ω)**:
  - Input `1.0 Ω` pada panjang `1000 m` suhu $20^\circ\text{C}$ menghasilkan $R_{20} = 1.0000\,\Omega/\text{km}$.
  - Mengubah toggle ke `mΩ` otomatis menghitung ulang tanpa perlu ketik ulang.
- [ ] **Suhu di Luar Lookup Table**:
  - Uji suhu $28.3^\circ\text{C}$ (desimal). Sistem otomatis menggunakan formula $k_t = (234.5+20)/(234.5+28.3)$ secara mulus.
- [ ] **Batas Maksimum Standar**:
  - Kabel CU $120\,\text{mm}^2$ (Batas IEC: $0.153\,\Omega/\text{km}$).
  - Jika kalkulasi $0.1520\,\Omega/\text{km}$ $\rightarrow$ Warna Hijau (PASS).
  - Jika kalkulasi $0.1540\,\Omega/\text{km}$ $\rightarrow$ Warna Merah (FAIL).
- [ ] **Estimasi Panjang**:
  - Nilai pembacaan dikalikan faktor koreksi dibagi acuan standar menghasilkan panjang meter yang akurat.
- [ ] **Responsivitas Layar Seluler**:
  - Tidak ada elemen yang terpotong pada resolusi iPhone SE (375px) hingga tablet/desktop (1200px+).
- [ ] **Dark Mode Persistence**:
  - Pilihan tema pengguna tetap tersimpan saat berpindah standar (misal dari IEC ke AS/NZS).

