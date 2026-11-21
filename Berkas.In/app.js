/* ==========================================================================
   Berkas.In Web — Application State, Sample Data & UI Controller
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'berkas_in_web_state_v1';
  const THEME_KEY = 'berkas_in_web_theme_v1';

  // --- SVG Icon Helpers (Outline, stroke-width 1.85px, round caps) ---
  const ICONS = {
    cabinet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M10 15h4"/><path d="M10 7h4"/></svg>',
    drawer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>',
    move: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
  };

  // --- Utilities ---
  const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();
  const daysAgo = (d) => new Date(Date.now() - d * 86400 * 1000).toISOString();

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatRelativeTime(iso) {
    if (!iso) return '-';
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Baru saja';
    if (mins < 60) return `${mins} mnt lalu`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} jam lalu`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days} hari lalu`;
    return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function formatDateTime(iso) {
    if (!iso) return '-';
    return new Date(iso).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getStatusPillClass(status) {
    switch (status) {
      case 'Tersimpan': return 'pill--success';
      case 'Dipinjam': return 'pill--warning';
      case 'Hilang': return 'pill--danger';
      case 'Diarsipkan': return 'pill--muted';
      default: return 'pill--accent';
    }
  }

  function getActionPillClass(aksi) {
    switch (aksi) {
      case 'Dibuat': return 'pill--accent';
      case 'Dikembalikan': return 'pill--success';
      case 'Dipinjam': return 'pill--warning';
      case 'Dipindahkan': return 'pill--accent';
      case 'Hilang': return 'pill--danger';
      default: return 'pill--muted';
    }
  }

  function getMeterClass(pct) {
    if (pct >= 90) return 'meter-fill--danger';
    if (pct >= 70) return 'meter-fill--warning';
    return 'meter-fill--success';
  }

  // --- Sample Data (Exact match with Flutter StorageService._generateSampleData) ---
  function generateSampleData() {
    return {
      lemariList: [
        {
          id: 'lemari-1',
          nama: 'Lemari 1 (Utama)',
          kode: 'LMR-01',
          deskripsi: 'Lemari penyimpanan arsip utama ruang administrasi',
          lokasiFisik: 'Ruang Arsip Utama, Sisi Kiri',
          color: '#4F6EF7'
        },
        {
          id: 'lemari-2',
          nama: 'Lemari 2 (Legal & Aset)',
          kode: 'LMR-02',
          deskripsi: 'Lemari dokumen hukum, sertifikat, dan aset kantor',
          lokasiFisik: 'Ruang Manager / Brankas Arsip',
          color: '#168A5B'
        }
      ],
      laciList: [
        {
          id: 'laci-1-a',
          lemariId: 'lemari-1',
          nama: 'Laci A (Atas)',
          kode: 'LC-1A',
          keterangan: 'Laci tingkat 1 untuk arsip surat masuk/keluar',
          kapasitasMaksimal: 30
        },
        {
          id: 'laci-1-b',
          lemariId: 'lemari-1',
          nama: 'Laci B (Tengah)',
          kode: 'LC-1B',
          keterangan: 'Laci tingkat 2 untuk berkas operasional dan berkas penting',
          kapasitasMaksimal: 40
        },
        {
          id: 'laci-2-a',
          lemariId: 'lemari-2',
          nama: 'Laci A (Legal)',
          kode: 'LC-2A',
          keterangan: 'Dokumen perjanjian, MOU, & izin usaha',
          kapasitasMaksimal: 35
        }
      ],
      mapList: [
        {
          id: 'map-1-b-c',
          laciId: 'laci-1-b',
          lemariId: 'lemari-1',
          nama: 'Map C (Dokumen Prioritas)',
          kode: 'MAP-1BC',
          kategori: 'Prioritas',
          deskripsi: 'Folder berkas khusus berkas A dan dokumen penting terkini'
        },
        {
          id: 'map-1-b-1',
          laciId: 'laci-1-b',
          lemariId: 'lemari-1',
          nama: 'Map Faktur & Tagihan',
          kode: 'MAP-1B1',
          kategori: 'Keuangan',
          deskripsi: 'Faktur vendor dan invoice berjalan'
        },
        {
          id: 'map-1-a-1',
          laciId: 'laci-1-a',
          lemariId: 'lemari-1',
          nama: 'Map Surat Keputusan (SK)',
          kode: 'MAP-1A1',
          kategori: 'Legal',
          deskripsi: 'SK Direksi dan arsip kepengurusan'
        },
        {
          id: 'map-2-a-1',
          laciId: 'laci-2-a',
          lemariId: 'lemari-2',
          nama: 'Map Sertifikat Tanah & Gedung',
          kode: 'MAP-2A1',
          kategori: 'Aset',
          deskripsi: 'Sertifikat kepemilikan aset perusahaan'
        }
      ],
      berkasList: [
        {
          id: 'berkas-a',
          nomorBerkas: 'BKS-2026-A01',
          nama: 'Berkas A (Sertifikat Hak Milik No. 892)',
          kategori: 'Legal & Aset',
          deskripsi: 'Dokumen asli kepemilikan lahan kantor cabang barat',
          lemariId: 'lemari-1',
          laciId: 'laci-1-b',
          mapId: 'map-1-b-c',
          status: 'Tersimpan',
          peminjam: null,
          tanggalPinjam: null,
          catatan: 'Disimpan dalam plastik proteksi anti-lembab di Map C',
          tags: ['Sertifikat', 'Asli', 'Prioritas A'],
          createdAt: daysAgo(14),
          terakhirDiubah: hoursAgo(2.25),
          riwayat: [
            {
              id: 'rw-1',
              berkasId: 'berkas-a',
              timestamp: daysAgo(14),
              aksi: 'Dibuat',
              keterangan: 'Pendaftaran berkas baru ke sistem',
              lokasiBaru: 'Lemari 1 (Utama) > Laci A (Atas) > Map Surat Keputusan (SK)',
              pelaksana: 'Admin Arsip'
            },
            {
              id: 'rw-2',
              berkasId: 'berkas-a',
              timestamp: daysAgo(7),
              aksi: 'Dipinjam',
              keterangan: 'Dipinjam sementara untuk verifikasi notaris',
              lokasiLama: 'Lemari 1 (Utama) > Laci A (Atas) > Map Surat Keputusan (SK)',
              lokasiBaru: 'Dipinjam (Notaris Rina SH)',
              pelaksana: 'Staff Legal'
            },
            {
              id: 'rw-3',
              berkasId: 'berkas-a',
              timestamp: hoursAgo(2.25),
              aksi: 'Dipindahkan',
              keterangan: 'Dikembalikan & dipindahkan ke Map C di Laci B agar aman',
              lokasiLama: 'Lemari 1 (Utama) > Laci A (Atas)',
              lokasiBaru: 'Lemari 1 (Utama) > Laci B (Tengah) > Map C (Dokumen Prioritas)',
              pelaksana: 'Budi Santoso (Admin)'
            }
          ]
        },
        {
          id: 'berkas-b',
          nomorBerkas: 'BKS-2026-B02',
          nama: 'Berkas Kontrak Kerjasama Vendor Cloud 2026',
          kategori: 'Kontrak',
          deskripsi: 'Perjanjian SLA dan layanan cloud hosting server',
          lemariId: 'lemari-1',
          laciId: 'laci-1-b',
          mapId: 'map-1-b-c',
          status: 'Tersimpan',
          peminjam: null,
          tanggalPinjam: null,
          catatan: 'Berlaku s/d Desember 2027',
          tags: ['Kontrak', 'IT', 'Vendor'],
          createdAt: daysAgo(10),
          terakhirDiubah: daysAgo(1),
          riwayat: [
            {
              id: 'rw-b1',
              berkasId: 'berkas-b',
              timestamp: daysAgo(10),
              aksi: 'Dibuat',
              keterangan: 'Pemberkasan kontrak vendor',
              lokasiBaru: 'Lemari 1 (Utama) > Laci B (Tengah) > Map C (Dokumen Prioritas)',
              pelaksana: 'Staff Procurement'
            }
          ]
        },
        {
          id: 'berkas-c',
          nomorBerkas: 'BKS-2026-C03',
          nama: 'Laporan Audit Pajak Tahunan',
          kategori: 'Keuangan',
          deskripsi: 'Rekapitulasi SPT dan bukti potong pajak penghasilan',
          lemariId: 'lemari-1',
          laciId: 'laci-1-b',
          mapId: 'map-1-b-1',
          status: 'Dipinjam',
          peminjam: 'Dewi Lestari (Akuntansi)',
          tanggalPinjam: hoursAgo(8),
          catatan: 'Pemeriksaan audit internal Q3',
          tags: ['Pajak', 'Audit', 'Finance'],
          createdAt: daysAgo(5),
          terakhirDiubah: hoursAgo(8),
          riwayat: [
            {
              id: 'rw-c1',
              berkasId: 'berkas-c',
              timestamp: daysAgo(5),
              aksi: 'Dibuat',
              keterangan: 'Arsip keuangan diinput',
              lokasiBaru: 'Lemari 1 (Utama) > Laci B (Tengah) > Map Faktur & Tagihan',
              pelaksana: 'Finance Team'
            },
            {
              id: 'rw-c2',
              berkasId: 'berkas-c',
              timestamp: hoursAgo(8),
              aksi: 'Dipinjam',
              keterangan: 'Dipinjam oleh Dewi Lestari (Akuntansi)',
              lokasiLama: 'Lemari 1 (Utama) > Laci B (Tengah) > Map Faktur & Tagihan',
              pelaksana: 'Dewi Lestari'
            }
          ]
        }
      ]
    };
  }

  // --- App State ---
  let data = loadState();
  let ui = {
    activeTab: 'home',
    selectedLemariFilter: 'all', // 'all' or lemari.id
    searchQuery: '',
    statusFilter: 'Semua',
    explorePath: { lemariId: null, laciId: null, mapId: null },
    historyFilter: 'Semua'
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.lemariList)) return parsed;
      }
    } catch (_) {}
    const sample = generateSampleData();
    saveState(sample);
    return sample;
  }

  function saveState(nextData = data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    } catch (_) {}
  }

  // --- Lookups ---
  const getLemari = (id) => data.lemariList.find((l) => l.id === id);
  const getLaci = (id) => data.laciList.find((l) => l.id === id);
  const getMap = (id) => data.mapList.find((m) => m.id === id);
  const getBerkas = (id) => data.berkasList.find((b) => b.id === id);

  function getLocationPath(lemariId, laciId, mapId) {
    const l = getLemari(lemariId)?.nama || 'Lemari ?';
    const c = getLaci(laciId)?.nama || 'Laci ?';
    const m = getMap(mapId)?.nama || 'Map ?';
    return `${l} > ${c} > ${m}`;
  }

  function getFilteredBerkas() {
    const q = ui.searchQuery.trim().toLowerCase();
    return data.berkasList
      .filter((b) => {
        if (ui.selectedLemariFilter !== 'all' && b.lemariId !== ui.selectedLemariFilter) return false;
        if (ui.statusFilter !== 'Semua' && b.status !== ui.statusFilter) return false;
        if (!q) return true;
        return (
          b.nama.toLowerCase().includes(q) ||
          b.nomorBerkas.toLowerCase().includes(q) ||
          b.kategori.toLowerCase().includes(q) ||
          (b.peminjam && b.peminjam.toLowerCase().includes(q)) ||
          (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)))
        );
      })
      .sort((a, b) => new Date(b.terakhirDiubah) - new Date(a.terakhirDiubah));
  }

  // --- Toast ---
  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
  }

  // --- Theme Management ---
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const sun = document.getElementById('themeIconSun');
    const moon = document.getElementById('themeIconMoon');
    if (theme === 'dark') {
      sun.style.display = 'block';
      moon.style.display = 'none';
    } else {
      sun.style.display = 'none';
      moon.style.display = 'block';
    }
  }

  // --- Bottom Sheet Controller ---
  const sheetBackdrop = document.getElementById('sheetBackdrop');
  const sheetTitle = document.getElementById('sheetTitle');
  const sheetBody = document.getElementById('sheetBody');

  function openSheet(title, htmlContent, onMount) {
    sheetTitle.textContent = title;
    sheetBody.innerHTML = htmlContent;
    sheetBackdrop.classList.add('open');
    sheetBackdrop.setAttribute('aria-hidden', 'false');
    if (typeof onMount === 'function') onMount(sheetBody);
  }

  function closeSheet() {
    sheetBackdrop.classList.remove('open');
    sheetBackdrop.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('sheetCloseBtn').addEventListener('click', closeSheet);
  sheetBackdrop.addEventListener('click', (e) => {
    if (e.target === sheetBackdrop) closeSheet();
  });

  // --- Header Rendering ---
  function renderHeader() {
    const titleEl = document.getElementById('headerTitle');
    const subEl = document.getElementById('headerSubtitle');
    const chipEl = document.getElementById('headerStatusChip');

    const scopedBerkas = ui.selectedLemariFilter === 'all'
      ? data.berkasList
      : data.berkasList.filter((b) => b.lemariId === ui.selectedLemariFilter);

    const dipinjamCount = scopedBerkas.filter((b) => b.status === 'Dipinjam').length;

    if (ui.selectedLemariFilter === 'all') {
      titleEl.textContent = 'Semua Lemari';
      subEl.textContent = `${data.lemariList.length} Lemari • ${data.berkasList.length} Berkas`;
    } else {
      const lemari = getLemari(ui.selectedLemariFilter);
      if (lemari) {
        titleEl.textContent = lemari.nama;
        subEl.textContent = `${lemari.kode} • ${lemari.lokasiFisik || 'Arsip Aktif'}`;
      } else {
        ui.selectedLemariFilter = 'all';
        renderHeader();
        return;
      }
    }

    if (dipinjamCount > 0) {
      chipEl.className = 'status-chip status-chip--warning';
      chipEl.innerHTML = `<span class="status-dot"></span> ${dipinjamCount} Dipinjam`;
    } else {
      chipEl.className = 'status-chip status-chip--success';
      chipEl.innerHTML = `<span class="status-dot"></span> Lengkap`;
    }
  }

  // --- Main Render Dispatcher ---
  function render() {
    renderHeader();
    const content = document.getElementById('appContent');
    switch (ui.activeTab) {
      case 'home':
        renderHome(content);
        break;
      case 'explore':
        renderExplore(content);
        break;
      case 'history':
        renderHistory(content);
        break;
      case 'stats':
        renderStats(content);
        break;
      case 'settings':
        renderSettings(content);
        break;
    }
  }

  // --- Tab 1: Ringkasan (Home Dashboard) ---
  function renderHome(container) {
    const scopedBerkas = ui.selectedLemariFilter === 'all'
      ? data.berkasList
      : data.berkasList.filter((b) => b.lemariId === ui.selectedLemariFilter);

    const scopedLaci = ui.selectedLemariFilter === 'all'
      ? data.laciList
      : data.laciList.filter((l) => l.lemariId === ui.selectedLemariFilter);

    const totalBerkas = scopedBerkas.length;
    const tersimpan = scopedBerkas.filter((b) => b.status === 'Tersimpan').length;
    const dipinjam = scopedBerkas.filter((b) => b.status === 'Dipinjam').length;
    const totalCap = scopedLaci.reduce((acc, l) => acc + (l.kapasitasMaksimal || 50), 0);
    const capPct = totalCap > 0 ? Math.min(100, Math.round((totalBerkas / totalCap) * 100)) : 0;

    const filtered = getFilteredBerkas();

    container.innerHTML = `
      <div class="input-field-wrap">
        <span class="input-prefix">${ICONS.search}</span>
        <input type="text" class="input-control" id="homeSearchInput" placeholder="Cari nama, nomor berkas, tag, peminjam..." value="${esc(ui.searchQuery)}" />
        ${ui.searchQuery ? `<button class="input-suffix" id="clearSearchBtn" type="button">Reset</button>` : `<span class="input-suffix">${filtered.length} hasil</span>`}
      </div>

      <div class="segmented" role="tablist" aria-label="Filter Status">
        ${['Semua', 'Tersimpan', 'Dipinjam', 'Diarsipkan'].map((st) => `
          <button class="seg-btn ${ui.statusFilter === st ? 'active' : ''}" data-status="${st}" type="button">${st}</button>
        `).join('')}
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Total Berkas</span>
            <span class="kpi-icon" style="background:var(--accent-soft);color:var(--accent)">${ICONS.file}</span>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">${totalBerkas}</span>
            <span class="kpi-unit">dokumen</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Tersimpan</span>
            <span class="kpi-icon" style="background:var(--success-soft);color:var(--success)">${ICONS.check}</span>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">${tersimpan}</span>
            <span class="kpi-unit">di rak</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Dipinjam</span>
            <span class="kpi-icon" style="background:var(--warning-soft);color:var(--warning)">${ICONS.user}</span>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">${dipinjam}</span>
            <span class="kpi-unit">keluar</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Kapasitas Laci</span>
            <span class="kpi-icon" style="background:var(--bg-alt);color:var(--text-secondary)">${ICONS.drawer}</span>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">${capPct}%</span>
            <span class="kpi-unit">${totalBerkas}/${totalCap}</span>
          </div>
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">Meter Kapasitas Laci</span>
        <button class="section-action" id="goExploreBtn" type="button">Jelajah ${ICONS.chevronRight}</button>
      </div>

      <div class="card">
        <div class="list-stack">
          ${scopedLaci.length === 0 ? `<div class="card-meta">Belum ada laci pada lemari ini.</div>` : scopedLaci.map((laci) => {
            const count = data.berkasList.filter((b) => b.laciId === laci.id).length;
            const max = laci.kapasitasMaksimal || 50;
            const pct = Math.min(100, Math.round((count / max) * 100));
            const lemari = getLemari(laci.lemariId);
            return `
              <div class="meter-wrap" style="cursor:pointer" data-jump-laci="${laci.id}">
                <div class="meter-labels">
                  <span style="font-weight:600;color:var(--text-primary)">${esc(laci.nama)} <span style="font-weight:400;color:var(--text-muted)">(${esc(lemari?.kode || '')})</span></span>
                  <span>${count} / ${max} berkas</span>
                </div>
                <div class="meter-track">
                  <div class="meter-fill ${getMeterClass(pct)}" style="width:${Math.max(pct, count > 0 ? 6 : 0)}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">Daftar Berkas (${filtered.length})</span>
        <button class="section-action" id="quickAddBerkasLink" type="button">${ICONS.plus} Tambah</button>
      </div>

      <div class="list-stack">
        ${filtered.length === 0 ? `
          <div class="card empty-state">
            ${ICONS.file}
            <div style="font-weight:600;color:var(--text-secondary)">Tidak ada berkas ditemukan</div>
            <div style="font-size:11.5px">Coba ubah kata kunci pencarian atau filter status.</div>
          </div>
        ` : filtered.map(renderBerkasCardHTML).join('')}
      </div>
    `;

    // Events
    const searchInput = document.getElementById('homeSearchInput');
    searchInput.addEventListener('input', (e) => {
      ui.searchQuery = e.target.value;
      renderHome(container);
      // Keep focus at end
      const nextInput = document.getElementById('homeSearchInput');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    });

    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ui.searchQuery = '';
        renderHome(container);
      });
    }

    container.querySelectorAll('.seg-btn[data-status]').forEach((btn) => {
      btn.addEventListener('click', () => {
        ui.statusFilter = btn.dataset.status;
        renderHome(container);
      });
    });

    document.getElementById('goExploreBtn').addEventListener('click', () => {
      switchTab('explore');
    });

    document.getElementById('quickAddBerkasLink').addEventListener('click', () => {
      openAddEditBerkasSheet();
    });

    container.querySelectorAll('[data-jump-laci]').forEach((el) => {
      el.addEventListener('click', () => {
        const laci = getLaci(el.dataset.jumpLaci);
        if (laci) {
          ui.explorePath = { lemariId: laci.lemariId, laciId: laci.id, mapId: null };
          switchTab('explore');
        }
      });
    });

    bindBerkasCardClicks(container);
  }

  function renderBerkasCardHTML(b) {
    const loc = getLocationPath(b.lemariId, b.laciId, b.mapId);
    const pillCls = getStatusPillClass(b.status);
    return `
      <div class="card card--interactive berkas-card" data-berkas-id="${esc(b.id)}">
        <div class="berkas-top">
          <div style="min-width:0">
            <div class="berkas-code">${esc(b.nomorBerkas)} • ${esc(b.kategori)}</div>
            <div class="berkas-name">${esc(b.nama)}</div>
          </div>
          <span class="pill ${pillCls}">${esc(b.status)}</span>
        </div>

        <div class="location-breadcrumb">
          ${ICONS.pin}
          <span>${esc(loc)}</span>
        </div>

        <div class="berkas-footer">
          <div class="tag-row">
            ${(b.tags || []).slice(0, 3).map((t) => `<span class="pill pill--muted">#${esc(t)}</span>`).join('')}
          </div>
          <span class="card-meta">${formatRelativeTime(b.terakhirDiubah)}</span>
        </div>
      </div>
    `;
  }

  function bindBerkasCardClicks(container) {
    container.querySelectorAll('[data-berkas-id]').forEach((el) => {
      el.addEventListener('click', () => {
        openBerkasDetailSheet(el.dataset.berkasId);
      });
    });
  }

  // --- Tab 2: Jelajah Hierarki (Lemari -> Laci -> Map -> Berkas) ---
  function renderExplore(container) {
    const { lemariId, laciId, mapId } = ui.explorePath;
    const lemari = lemariId ? getLemari(lemariId) : null;
    const laci = laciId ? getLaci(laciId) : null;
    const map = mapId ? getMap(mapId) : null;

    let breadcrumbHTML = `<button class="drill-crumb ${!lemari ? 'current' : ''}" data-nav="root" type="button">Lemari</button>`;
    if (lemari) {
      breadcrumbHTML += `<span class="drill-sep">/</span><button class="drill-crumb ${!laci ? 'current' : ''}" data-nav="lemari" type="button">${esc(lemari.kode || lemari.nama)}</button>`;
    }
    if (laci) {
      breadcrumbHTML += `<span class="drill-sep">/</span><button class="drill-crumb ${!map ? 'current' : ''}" data-nav="laci" type="button">${esc(laci.kode || laci.nama)}</button>`;
    }
    if (map) {
      breadcrumbHTML += `<span class="drill-sep">/</span><span class="drill-crumb current">${esc(map.kode || map.nama)}</span>`;
    }

    let bodyHTML = '';
    let addBtnLabel = '+ Lemari';
    let addAction = () => openAddLemariSheet();

    if (!lemari) {
      // Level 1: Lemari list
      bodyHTML = data.lemariList.map((l) => {
        const lacis = data.laciList.filter((c) => c.lemariId === l.id);
        const berkasCount = data.berkasList.filter((b) => b.lemariId === l.id).length;
        return `
          <div class="card card--interactive node-card" data-open-lemari="${esc(l.id)}">
            <div class="node-row">
              <div class="node-icon" style="background:var(--accent-soft);color:var(--accent)">${ICONS.cabinet}</div>
              <div class="node-info">
                <div class="node-title-row">
                  <span class="card-title">${esc(l.nama)}</span>
                  <span class="pill pill--accent">${esc(l.kode)}</span>
                </div>
                <div class="node-sub">${esc(l.lokasiFisik || l.deskripsi || 'Lokasi arsip')}</div>
              </div>
            </div>
            <div class="berkas-footer">
              <span class="card-meta">${lacis.length} Laci • ${berkasCount} Berkas</span>
              <span class="section-action" style="padding:0">Buka ${ICONS.chevronRight}</span>
            </div>
          </div>
        `;
      }).join('');
    } else if (!laci) {
      // Level 2: Laci inside Lemari
      addBtnLabel = '+ Laci';
      addAction = () => openAddLaciSheet(lemari.id);
      const lacis = data.laciList.filter((c) => c.lemariId === lemari.id);
      bodyHTML = lacis.length === 0 ? `
        <div class="card empty-state">${ICONS.drawer}<div>Belum ada laci di ${esc(lemari.nama)}</div></div>
      ` : lacis.map((c) => {
        const maps = data.mapList.filter((m) => m.laciId === c.id);
        const berkasCount = data.berkasList.filter((b) => b.laciId === c.id).length;
        const max = c.kapasitasMaksimal || 50;
        const pct = Math.min(100, Math.round((berkasCount / max) * 100));
        return `
          <div class="card card--interactive node-card" data-open-laci="${esc(c.id)}">
            <div class="node-row">
              <div class="node-icon" style="background:var(--success-soft);color:var(--success)">${ICONS.drawer}</div>
              <div class="node-info">
                <div class="node-title-row">
                  <span class="card-title">${esc(c.nama)}</span>
                  <span class="pill pill--muted">${esc(c.kode)}</span>
                </div>
                <div class="node-sub">${esc(c.keterangan || 'Laci penyimpanan')}</div>
              </div>
            </div>
            <div class="meter-wrap">
              <div class="meter-labels">
                <span>${maps.length} Map Folder</span>
                <span>${berkasCount}/${max} berkas (${pct}%)</span>
              </div>
              <div class="meter-track">
                <div class="meter-fill ${getMeterClass(pct)}" style="width:${Math.max(pct, berkasCount > 0 ? 6 : 0)}%"></div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    } else if (!map) {
      // Level 3: Map inside Laci
      addBtnLabel = '+ Map';
      addAction = () => openAddMapSheet(lemari.id, laci.id);
      const maps = data.mapList.filter((m) => m.laciId === laci.id);
      bodyHTML = maps.length === 0 ? `
        <div class="card empty-state">${ICONS.folder}<div>Belum ada map di ${esc(laci.nama)}</div></div>
      ` : maps.map((m) => {
        const berkasCount = data.berkasList.filter((b) => b.mapId === m.id).length;
        return `
          <div class="card card--interactive node-card" data-open-map="${esc(m.id)}">
            <div class="node-row">
              <div class="node-icon" style="background:var(--warning-soft);color:var(--warning)">${ICONS.folder}</div>
              <div class="node-info">
                <div class="node-title-row">
                  <span class="card-title">${esc(m.nama)}</span>
                  <span class="pill pill--accent">${esc(m.kategori)}</span>
                </div>
                <div class="node-sub">${esc(m.kode)} • ${esc(m.deskripsi || 'Folder arsip')}</div>
              </div>
            </div>
            <div class="berkas-footer">
              <span class="card-meta">${berkasCount} Berkas di dalam map</span>
              <span class="section-action" style="padding:0">Lihat Berkas ${ICONS.chevronRight}</span>
            </div>
          </div>
        `;
      }).join('');
    } else {
      // Level 4: Berkas inside Map
      addBtnLabel = '+ Berkas';
      addAction = () => openAddEditBerkasSheet(null, { lemariId: lemari.id, laciId: laci.id, mapId: map.id });
      const berkas = data.berkasList.filter((b) => b.mapId === map.id);
      bodyHTML = berkas.length === 0 ? `
        <div class="card empty-state">${ICONS.file}<div>Map ini masih kosong</div></div>
      ` : berkas.map(renderBerkasCardHTML).join('');
    }

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Jelajah Arsip</h1>
          <div class="page-subtitle">Hierarki Lemari → Laci → Map → Berkas</div>
        </div>
        <button class="pill pill--accent" id="exploreAddBtn" type="button" style="padding:6px 11px;font-size:12px">${esc(addBtnLabel)}</button>
      </div>

      <div class="drill-bar">${breadcrumbHTML}</div>

      <div class="list-stack">${bodyHTML}</div>
    `;

    document.getElementById('exploreAddBtn').addEventListener('click', addAction);

    container.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nav = btn.dataset.nav;
        if (nav === 'root') ui.explorePath = { lemariId: null, laciId: null, mapId: null };
        if (nav === 'lemari') ui.explorePath.laciId = null, ui.explorePath.mapId = null;
        if (nav === 'laci') ui.explorePath.mapId = null;
        renderExplore(container);
      });
    });

    container.querySelectorAll('[data-open-lemari]').forEach((el) => {
      el.addEventListener('click', () => {
        ui.explorePath = { lemariId: el.dataset.openLemari, laciId: null, mapId: null };
        renderExplore(container);
      });
    });

    container.querySelectorAll('[data-open-laci]').forEach((el) => {
      el.addEventListener('click', () => {
        ui.explorePath.laciId = el.dataset.openLaci;
        ui.explorePath.mapId = null;
        renderExplore(container);
      });
    });

    container.querySelectorAll('[data-open-map]').forEach((el) => {
      el.addEventListener('click', () => {
        ui.explorePath.mapId = el.dataset.openMap;
        renderExplore(container);
      });
    });

    bindBerkasCardClicks(container);
  }

  // --- Tab 3: Riwayat Aktivitas ---
  function renderHistory(container) {
    const logs = [];
    data.berkasList.forEach((b) => {
      (b.riwayat || []).forEach((r) => {
        logs.push({ ...r, berkasNama: b.nama, nomorBerkas: b.nomorBerkas });
      });
    });
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const filteredLogs = ui.historyFilter === 'Semua'
      ? logs
      : logs.filter((l) => l.aksi === ui.historyFilter);

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Riwayat Berkas</h1>
          <div class="page-subtitle">Jejak audit perpindahan &amp; peminjaman</div>
        </div>
        <span class="pill pill--muted">${filteredLogs.length} log</span>
      </div>

      <div class="segmented">
        ${['Semua', 'Dibuat', 'Dipinjam', 'Dipindahkan', 'Dikembalikan'].map((f) => `
          <button class="seg-btn ${ui.historyFilter === f ? 'active' : ''}" data-hfilter="${f}" type="button">${f}</button>
        `).join('')}
      </div>

      <div class="card">
        ${filteredLogs.length === 0 ? `
          <div class="empty-state">${ICONS.clock}<div>Belum ada catatan riwayat.</div></div>
        ` : `
          <div class="timeline-list">
            ${filteredLogs.map((r, idx) => `
              <div class="timeline-item" style="cursor:pointer" data-berkas-id="${esc(r.berkasId)}">
                <div class="timeline-dot-col">
                  <div class="timeline-dot" style="background:var(--accent)"></div>
                  ${idx < filteredLogs.length - 1 ? '<div class="timeline-line"></div>' : ''}
                </div>
                <div class="timeline-body">
                  <div class="timeline-head">
                    <span class="pill ${getActionPillClass(r.aksi)}">${esc(r.aksi)}</span>
                    <span class="timeline-time">${formatRelativeTime(r.timestamp)}</span>
                  </div>
                  <div style="font-weight:600;font-size:13px;margin-top:4px;color:var(--text-primary)">${esc(r.berkasNama)}</div>
                  <div class="timeline-desc">${esc(r.keterangan)} • <span style="color:var(--text-muted)">${esc(r.pelaksana || 'Admin')}</span></div>
                  ${r.lokasiBaru ? `<div class="timeline-loc">${r.lokasiLama ? `${esc(r.lokasiLama)} → ` : ''}${esc(r.lokasiBaru)}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    container.querySelectorAll('[data-hfilter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        ui.historyFilter = btn.dataset.hfilter;
        renderHistory(container);
      });
    });

    bindBerkasCardClicks(container);
  }

  // --- Tab 4: Statistik ---
  function renderStats(container) {
    const total = data.berkasList.length || 1;
    const statuses = [
      { label: 'Tersimpan', count: data.berkasList.filter((b) => b.status === 'Tersimpan').length, cls: 'meter-fill--success', pill: 'pill--success' },
      { label: 'Dipinjam', count: data.berkasList.filter((b) => b.status === 'Dipinjam').length, cls: 'meter-fill--warning', pill: 'pill--warning' },
      { label: 'Diarsipkan', count: data.berkasList.filter((b) => b.status === 'Diarsipkan').length, cls: 'meter-fill--accent', pill: 'pill--accent' },
      { label: 'Hilang', count: data.berkasList.filter((b) => b.status === 'Hilang').length, cls: 'meter-fill--danger', pill: 'pill--danger' }
    ];

    const catMap = {};
    data.berkasList.forEach((b) => {
      catMap[b.kategori] = (catMap[b.kategori] || 0) + 1;
    });
    const categories = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const borrowed = data.berkasList.filter((b) => b.status === 'Dipinjam');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Statistik Arsip</h1>
          <div class="page-subtitle">Ringkasan distribusi &amp; kapasitas penyimpanan</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="margin-bottom:10px">Distribusi Status Berkas</div>
        <div class="list-stack">
          ${statuses.map((s) => {
            const pct = Math.round((s.count / total) * 100);
            return `
              <div class="meter-wrap">
                <div class="meter-labels">
                  <span class="pill ${s.pill}">${s.label}</span>
                  <span>${s.count} berkas (${pct}%)</span>
                </div>
                <div class="meter-track">
                  <div class="meter-fill ${s.cls}" style="width:${pct}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="margin-bottom:10px">Kategori Terbanyak</div>
        <div class="list-stack">
          ${categories.map(([cat, count]) => `
            <div class="row-between">
              <span style="font-weight:500;color:var(--text-secondary)">${esc(cat)}</span>
              <span class="pill pill--accent">${count} berkas</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section-header">
        <span class="section-title">Sedang Dipinjam (${borrowed.length})</span>
      </div>

      <div class="list-stack">
        ${borrowed.length === 0 ? `
          <div class="card card-meta">Semua berkas sedang berada di lemari penyimpanan.</div>
        ` : borrowed.map((b) => `
          <div class="card card--interactive" data-berkas-id="${esc(b.id)}">
            <div class="row-between">
              <div>
                <div style="font-weight:600;font-size:13.5px">${esc(b.nama)}</div>
                <div class="card-meta" style="margin-top:2px">Peminjam: <strong>${esc(b.peminjam || '-')}</strong> • ${formatRelativeTime(b.tanggalPinjam)}</div>
              </div>
              <span class="pill pill--warning">Dipinjam</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    bindBerkasCardClicks(container);
  }

  // --- Tab 5: Profil & Pengaturan ---
  function renderSettings(container) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Profil &amp; Pengaturan</h1>
          <div class="page-subtitle">Preferensi tampilan &amp; manajemen data lokal</div>
        </div>
      </div>

      <div class="card">
        <div class="node-row">
          <div class="node-icon" style="background:var(--accent-soft);color:var(--accent)">${ICONS.cabinet}</div>
          <div class="node-info">
            <div class="card-title">Berkas.In Web</div>
            <div class="node-sub">Sistem Manajemen Arsip Fisik • Penyimpanan Lokal Browser</div>
          </div>
          <span class="pill pill--success">v1.0</span>
        </div>
      </div>

      <div class="card">
        <div class="row-between">
          <div>
            <div class="card-title">Mode Gelap (Dark Theme)</div>
            <div class="card-meta">Sesuaikan kontras layar untuk kenyamanan mata</div>
          </div>
          <button class="pill ${isDark ? 'pill--accent' : 'pill--muted'}" id="settingsThemeBtn" type="button" style="padding:6px 12px">
            ${isDark ? 'Aktif' : 'Nonaktif'}
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="margin-bottom:4px">Cadangkan &amp; Reset Data</div>
        <div class="card-meta" style="margin-bottom:12px">Ekspor seluruh data lemari, laci, map, dan berkas ke file JSON atau kembalikan ke data contoh awal.</div>
        <div class="btn-row">
          <button class="btn-secondary" id="exportJsonBtn" type="button">Ekspor JSON</button>
          <button class="btn-danger-ghost" id="resetSampleBtn" type="button">Reset Contoh</button>
        </div>
      </div>
    `;

    document.getElementById('settingsThemeBtn').addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      renderSettings(container);
    });

    document.getElementById('exportJsonBtn').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `berkas-in-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Backup JSON berhasil diunduh');
    });

    document.getElementById('resetSampleBtn').addEventListener('click', () => {
      data = generateSampleData();
      saveState();
      ui.selectedLemariFilter = 'all';
      ui.explorePath = { lemariId: null, laciId: null, mapId: null };
      render();
      showToast('Data contoh berhasil dipulihkan');
    });
  }

  // --- Bottom Sheet: Lemari Switcher ---
  function openLemariSwitcherSheet() {
    const html = `
      <div class="list-stack">
        <button class="card card--interactive row-between" data-pick-lemari="all" type="button" style="text-align:left;${ui.selectedLemariFilter === 'all' ? 'border-color:var(--accent)' : ''}">
          <div>
            <div class="card-title">Semua Lemari</div>
            <div class="card-meta">${data.lemariList.length} Lemari • ${data.berkasList.length} Total Berkas</div>
          </div>
          ${ui.selectedLemariFilter === 'all' ? '<span class="pill pill--accent">Dipilih</span>' : ''}
        </button>

        ${data.lemariList.map((l) => {
          const count = data.berkasList.filter((b) => b.lemariId === l.id).length;
          const active = ui.selectedLemariFilter === l.id;
          return `
            <button class="card card--interactive row-between" data-pick-lemari="${esc(l.id)}" type="button" style="text-align:left;${active ? 'border-color:var(--accent)' : ''}">
              <div>
                <div class="card-title">${esc(l.nama)}</div>
                <div class="card-meta">${esc(l.kode)} • ${count} berkas • ${esc(l.lokasiFisik || '-')}</div>
              </div>
              ${active ? '<span class="pill pill--accent">Dipilih</span>' : ''}
            </button>
          `;
        }).join('')}
      </div>

      <button class="btn-secondary" id="switcherAddLemariBtn" type="button">${ICONS.plus} Tambah Lemari Baru</button>
    `;

    openSheet('Pilih Lemari Aktif', html, (body) => {
      body.querySelectorAll('[data-pick-lemari]').forEach((btn) => {
        btn.addEventListener('click', () => {
          ui.selectedLemariFilter = btn.dataset.pickLemari;
          closeSheet();
          render();
        });
      });
      body.querySelector('#switcherAddLemariBtn').addEventListener('click', () => {
        openAddLemariSheet();
      });
    });
  }

  // --- Bottom Sheet: Detail Berkas ---
  function openBerkasDetailSheet(berkasId) {
    const b = getBerkas(berkasId);
    if (!b) return;
    const loc = getLocationPath(b.lemariId, b.laciId, b.mapId);
    const isBorrowed = b.status === 'Dipinjam';

    const html = `
      <div class="row-between">
        <span class="berkas-code" style="font-size:12px">${esc(b.nomorBerkas)}</span>
        <span class="pill ${getStatusPillClass(b.status)}">${esc(b.status)}</span>
      </div>

      <div>
        <div style="font-size:16px;font-weight:700;color:var(--text-primary)">${esc(b.nama)}</div>
        <div class="card-meta" style="margin-top:3px">Kategori: ${esc(b.kategori)} • Diubah ${formatRelativeTime(b.terakhirDiubah)}</div>
      </div>

      <div class="location-breadcrumb">
        ${ICONS.pin}
        <span>${esc(loc)}</span>
      </div>

      ${isBorrowed ? `
        <div class="card" style="background:var(--warning-soft);border-color:transparent">
          <div style="font-weight:600;color:var(--warning);font-size:12.5px">Sedang Dipinjam oleh ${esc(b.peminjam || '-')}</div>
          <div class="card-meta" style="color:var(--warning);opacity:0.9">Sejak ${formatDateTime(b.tanggalPinjam)}</div>
        </div>
      ` : ''}

      ${b.deskripsi ? `<div><div class="input-label">Deskripsi</div><div style="font-size:12.5px;color:var(--text-secondary);margin-top:2px">${esc(b.deskripsi)}</div></div>` : ''}
      ${b.catatan ? `<div><div class="input-label">Catatan</div><div style="font-size:12.5px;color:var(--text-secondary);margin-top:2px">${esc(b.catatan)}</div></div>` : ''}

      ${(b.tags && b.tags.length) ? `
        <div class="tag-row">
          ${b.tags.map((t) => `<span class="pill pill--muted">#${esc(t)}</span>`).join('')}
        </div>
      ` : ''}

      <div class="btn-row">
        <button class="btn-primary" id="btnBorrowReturn" type="button">
          ${isBorrowed ? 'Kembalikan Berkas' : 'Pinjamkan Berkas'}
        </button>
        <button class="btn-secondary" id="btnMoveBerkas" type="button">${ICONS.move} Pindahkan</button>
      </div>

      <div class="btn-row">
        <button class="btn-secondary" id="btnEditBerkas" type="button">${ICONS.edit} Edit</button>
        <button class="btn-danger-ghost" id="btnDeleteBerkas" type="button">${ICONS.trash} Hapus</button>
      </div>

      <div class="section-header" style="margin-top:4px">
        <span class="section-title">Riwayat Berkas (${(b.riwayat || []).length})</span>
      </div>

      <div class="timeline-list">
        ${[...(b.riwayat || [])].reverse().map((r, idx, arr) => `
          <div class="timeline-item">
            <div class="timeline-dot-col">
              <div class="timeline-dot" style="background:var(--accent)"></div>
              ${idx < arr.length - 1 ? '<div class="timeline-line"></div>' : ''}
            </div>
            <div class="timeline-body">
              <div class="timeline-head">
                <span class="pill ${getActionPillClass(r.aksi)}">${esc(r.aksi)}</span>
                <span class="timeline-time">${formatDateTime(r.timestamp)}</span>
              </div>
              <div class="timeline-desc">${esc(r.keterangan)}</div>
              ${r.lokasiBaru ? `<div class="timeline-loc">${r.lokasiLama ? `${esc(r.lokasiLama)} → ` : ''}${esc(r.lokasiBaru)}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    openSheet('Detail Berkas', html, (body) => {
      body.querySelector('#btnBorrowReturn').addEventListener('click', () => {
        if (isBorrowed) {
          b.status = 'Tersimpan';
          const prevPeminjam = b.peminjam;
          b.peminjam = null;
          b.tanggalPinjam = null;
          b.terakhirDiubah = new Date().toISOString();
          b.riwayat.push({
            id: uid('rw'),
            berkasId: b.id,
            timestamp: b.terakhirDiubah,
            aksi: 'Dikembalikan',
            keterangan: `Dikembalikan oleh ${prevPeminjam || 'Peminjam'}`,
            lokasiBaru: getLocationPath(b.lemariId, b.laciId, b.mapId),
            pelaksana: 'Admin Arsip'
          });
          saveState();
          closeSheet();
          render();
          showToast('Berkas berhasil dikembalikan');
        } else {
          openBorrowSheet(b.id);
        }
      });

      body.querySelector('#btnMoveBerkas').addEventListener('click', () => openMoveBerkasSheet(b.id));
      body.querySelector('#btnEditBerkas').addEventListener('click', () => openAddEditBerkasSheet(b.id));
      body.querySelector('#btnDeleteBerkas').addEventListener('click', () => {
        data.berkasList = data.berkasList.filter((item) => item.id !== b.id);
        saveState();
        closeSheet();
        render();
        showToast('Berkas dihapus');
      });
    });
  }

  // --- Bottom Sheet: Pinjam Berkas ---
  function openBorrowSheet(berkasId) {
    const b = getBerkas(berkasId);
    if (!b) return;
    const html = `
      <div class="card-meta">Berkas: <strong>${esc(b.nama)}</strong></div>
      <div class="input-group">
        <label class="input-label" for="borrowerInput">Nama Peminjam</label>
        <div class="input-field-wrap">
          <input id="borrowerInput" class="input-control" type="text" placeholder="Contoh: Andi Pratama (Legal)" required />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="borrowNoteInput">Keperluan / Catatan</label>
        <div class="input-field-wrap">
          <input id="borrowNoteInput" class="input-control" type="text" placeholder="Opsional: Verifikasi dokumen..." />
        </div>
      </div>
      <button class="btn-primary" id="confirmBorrowBtn" type="button">Konfirmasi Peminjaman</button>
    `;
    openSheet('Pinjamkan Berkas', html, (body) => {
      body.querySelector('#confirmBorrowBtn').addEventListener('click', () => {
        const peminjam = body.querySelector('#borrowerInput').value.trim();
        if (!peminjam) {
          showToast('Nama peminjam wajib diisi');
          return;
        }
        const note = body.querySelector('#borrowNoteInput').value.trim();
        const now = new Date().toISOString();
        b.status = 'Dipinjam';
        b.peminjam = peminjam;
        b.tanggalPinjam = now;
        b.terakhirDiubah = now;
        b.riwayat.push({
          id: uid('rw'),
          berkasId: b.id,
          timestamp: now,
          aksi: 'Dipinjam',
          keterangan: note ? `${note} (${peminjam})` : `Dipinjam oleh ${peminjam}`,
          lokasiLama: getLocationPath(b.lemariId, b.laciId, b.mapId),
          lokasiBaru: `Dipinjam (${peminjam})`,
          pelaksana: peminjam
        });
        saveState();
        closeSheet();
        render();
        showToast('Status berkas diubah menjadi Dipinjam');
      });
    });
  }

  // --- Bottom Sheet: Pindahkan Berkas ---
  function openMoveBerkasSheet(berkasId) {
    const b = getBerkas(berkasId);
    if (!b) return;

    const html = `
      <div class="card-meta">Lokasi saat ini: <strong>${esc(getLocationPath(b.lemariId, b.laciId, b.mapId))}</strong></div>
      <div class="input-group">
        <label class="input-label">Lemari Tujuan</label>
        <div class="input-field-wrap">
          <select id="moveLemari" class="input-control">
            ${data.lemariList.map((l) => `<option value="${esc(l.id)}" ${l.id === b.lemariId ? 'selected' : ''}>${esc(l.nama)}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Laci Tujuan</label>
        <div class="input-field-wrap">
          <select id="moveLaci" class="input-control"></select>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Map Tujuan</label>
        <div class="input-field-wrap">
          <select id="moveMap" class="input-control"></select>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Keterangan Pemindahan</label>
        <div class="input-field-wrap">
          <input id="moveNote" class="input-control" type="text" placeholder="Contoh: Penataan ulang arsip prioritas" />
        </div>
      </div>
      <button class="btn-primary" id="confirmMoveBtn" type="button">Pindahkan Berkas</button>
    `;

    openSheet('Pindahkan Lokasi Berkas', html, (body) => {
      const selLemari = body.querySelector('#moveLemari');
      const selLaci = body.querySelector('#moveLaci');
      const selMap = body.querySelector('#moveMap');

      function populateLaci(selectedLaciId) {
        const lacis = data.laciList.filter((l) => l.lemariId === selLemari.value);
        selLaci.innerHTML = lacis.length
          ? lacis.map((l) => `<option value="${esc(l.id)}" ${l.id === selectedLaciId ? 'selected' : ''}>${esc(l.nama)}</option>`).join('')
          : '<option value="">(Tidak ada laci)</option>';
        populateMap(b.mapId);
      }

      function populateMap(selectedMapId) {
        const maps = data.mapList.filter((m) => m.laciId === selLaci.value);
        selMap.innerHTML = maps.length
          ? maps.map((m) => `<option value="${esc(m.id)}" ${m.id === selectedMapId ? 'selected' : ''}>${esc(m.nama)}</option>`).join('')
          : '<option value="">(Tidak ada map)</option>';
      }

      selLemari.addEventListener('change', () => populateLaci(null));
      selLaci.addEventListener('change', () => populateMap(null));
      populateLaci(b.laciId);

      body.querySelector('#confirmMoveBtn').addEventListener('click', () => {
        if (!selLemari.value || !selLaci.value || !selMap.value) {
          showToast('Pilih Lemari, Laci, dan Map tujuan yang valid');
          return;
        }
        const lokasiLama = getLocationPath(b.lemariId, b.laciId, b.mapId);
        const now = new Date().toISOString();
        b.lemariId = selLemari.value;
        b.laciId = selLaci.value;
        b.mapId = selMap.value;
        b.terakhirDiubah = now;
        const lokasiBaru = getLocationPath(b.lemariId, b.laciId, b.mapId);
        const note = body.querySelector('#moveNote').value.trim();

        b.riwayat.push({
          id: uid('rw'),
          berkasId: b.id,
          timestamp: now,
          aksi: 'Dipindahkan',
          keterangan: note || 'Dipindahkan ke lokasi penyimpanan baru',
          lokasiLama,
          lokasiBaru,
          pelaksana: 'Admin Arsip'
        });

        saveState();
        closeSheet();
        render();
        showToast('Berkas berhasil dipindahkan');
      });
    });
  }

  // --- Bottom Sheet: Tambah / Edit Berkas ---
  function openAddEditBerkasSheet(berkasId = null, presetLoc = null) {
    const existing = berkasId ? getBerkas(berkasId) : null;
    const defLemari = existing?.lemariId || presetLoc?.lemariId || (ui.selectedLemariFilter !== 'all' ? ui.selectedLemariFilter : data.lemariList[0]?.id || '');
    const defLaci = existing?.laciId || presetLoc?.laciId || '';
    const defMap = existing?.mapId || presetLoc?.mapId || '';

    const html = `
      <div class="input-group">
        <label class="input-label">Nomor / Kode Berkas</label>
        <div class="input-field-wrap">
          <input id="fNomor" class="input-control" type="text" placeholder="BKS-2026-004" value="${esc(existing?.nomorBerkas || `BKS-2026-0${data.berkasList.length + 1}`)}" />
          <span class="input-suffix">kode</span>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Nama Berkas</label>
        <div class="input-field-wrap">
          <input id="fNama" class="input-control" type="text" placeholder="Contoh: Sertifikat Hak Milik..." value="${esc(existing?.nama || '')}" />
        </div>
      </div>
      <div class="btn-row">
        <div class="input-group">
          <label class="input-label">Kategori</label>
          <div class="input-field-wrap">
            <input id="fKategori" class="input-control" type="text" placeholder="Legal / Keuangan" value="${esc(existing?.kategori || 'Umum')}" />
          </div>
        </div>
        <div class="input-group">
          <label class="input-label">Status</label>
          <div class="input-field-wrap">
            <select id="fStatus" class="input-control">
              ${['Tersimpan', 'Dipinjam', 'Diarsipkan', 'Hilang'].map((s) => `<option value="${s}" ${(existing?.status || 'Tersimpan') === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Lemari</label>
        <div class="input-field-wrap">
          <select id="fLemari" class="input-control">
            ${data.lemariList.map((l) => `<option value="${esc(l.id)}" ${l.id === defLemari ? 'selected' : ''}>${esc(l.nama)}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="btn-row">
        <div class="input-group">
          <label class="input-label">Laci</label>
          <div class="input-field-wrap">
            <select id="fLaci" class="input-control"></select>
          </div>
        </div>
        <div class="input-group">
          <label class="input-label">Map</label>
          <div class="input-field-wrap">
            <select id="fMap" class="input-control"></select>
          </div>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Tags (pisahkan dengan koma)</label>
        <div class="input-field-wrap">
          <input id="fTags" class="input-control" type="text" placeholder="Asli, Prioritas, 2026" value="${esc((existing?.tags || []).join(', '))}" />
          <span class="input-suffix">tag</span>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Catatan / Deskripsi</label>
        <div class="input-field-wrap">
          <textarea id="fCatatan" class="input-control" placeholder="Lokasi detail atau catatan kondisi berkas...">${esc(existing?.catatan || existing?.deskripsi || '')}</textarea>
        </div>
      </div>
      <button class="btn-primary" id="saveBerkasBtn" type="button">${existing ? 'Simpan Perubahan' : 'Simpan Berkas'}</button>
    `;

    openSheet(existing ? 'Edit Berkas' : 'Tambah Berkas Baru', html, (body) => {
      const selLemari = body.querySelector('#fLemari');
      const selLaci = body.querySelector('#fLaci');
      const selMap = body.querySelector('#fMap');

      function fillLaci(targetLaci) {
        const lacis = data.laciList.filter((l) => l.lemariId === selLemari.value);
        selLaci.innerHTML = lacis.length
          ? lacis.map((l) => `<option value="${esc(l.id)}" ${l.id === targetLaci ? 'selected' : ''}>${esc(l.nama)}</option>`).join('')
          : '<option value="">(Kosong)</option>';
        fillMap(defMap);
      }

      function fillMap(targetMap) {
        const maps = data.mapList.filter((m) => m.laciId === selLaci.value);
        selMap.innerHTML = maps.length
          ? maps.map((m) => `<option value="${esc(m.id)}" ${m.id === targetMap ? 'selected' : ''}>${esc(m.nama)}</option>`).join('')
          : '<option value="">(Kosong)</option>';
      }

      selLemari.addEventListener('change', () => fillLaci(null));
      selLaci.addEventListener('change', () => fillMap(null));
      fillLaci(defLaci);

      body.querySelector('#saveBerkasBtn').addEventListener('click', () => {
        const nama = body.querySelector('#fNama').value.trim();
        const nomorBerkas = body.querySelector('#fNomor').value.trim();
        if (!nama) {
          showToast('Nama berkas wajib diisi');
          return;
        }
        if (!selLemari.value || !selLaci.value || !selMap.value) {
          showToast('Pastikan Lemari, Laci, dan Map telah dipilih');
          return;
        }
        const now = new Date().toISOString();
        const tags = body.querySelector('#fTags').value.split(',').map((t) => t.trim()).filter(Boolean);
        const catatan = body.querySelector('#fCatatan').value.trim();
        const kategori = body.querySelector('#fKategori').value.trim() || 'Umum';
        const status = body.querySelector('#fStatus').value;

        if (existing) {
          existing.nomorBerkas = nomorBerkas;
          existing.nama = nama;
          existing.kategori = kategori;
          existing.status = status;
          existing.lemariId = selLemari.value;
          existing.laciId = selLaci.value;
          existing.mapId = selMap.value;
          existing.tags = tags;
          existing.catatan = catatan;
          existing.terakhirDiubah = now;
          existing.riwayat.push({
            id: uid('rw'),
            berkasId: existing.id,
            timestamp: now,
            aksi: 'Diedit',
            keterangan: 'Informasi berkas diperbarui',
            lokasiBaru: getLocationPath(existing.lemariId, existing.laciId, existing.mapId),
            pelaksana: 'Admin Arsip'
          });
          showToast('Berkas diperbarui');
        } else {
          const id = uid('berkas');
          data.berkasList.unshift({
            id,
            nomorBerkas: nomorBerkas || `BKS-${Date.now().toString().slice(-4)}`,
            nama,
            kategori,
            deskripsi: catatan,
            lemariId: selLemari.value,
            laciId: selLaci.value,
            mapId: selMap.value,
            status,
            peminjam: null,
            tanggalPinjam: null,
            catatan,
            tags,
            createdAt: now,
            terakhirDiubah: now,
            riwayat: [
              {
                id: uid('rw'),
                berkasId: id,
                timestamp: now,
                aksi: 'Dibuat',
                keterangan: 'Pendaftaran berkas baru ke sistem',
                lokasiBaru: getLocationPath(selLemari.value, selLaci.value, selMap.value),
                pelaksana: 'Admin Arsip'
              }
            ]
          });
          showToast('Berkas baru ditambahkan');
        }

        saveState();
        closeSheet();
        render();
      });
    });
  }

  // --- Bottom Sheets: Tambah Lemari / Laci / Map ---
  function openAddLemariSheet() {
    const html = `
      <div class="input-group">
        <label class="input-label">Nama Lemari</label>
        <div class="input-field-wrap"><input id="lNama" class="input-control" placeholder="Contoh: Lemari 3 (HRD)" /></div>
      </div>
      <div class="input-group">
        <label class="input-label">Kode Lemari</label>
        <div class="input-field-wrap"><input id="lKode" class="input-control" value="LMR-0${data.lemariList.length + 1}" /><span class="input-suffix">kode</span></div>
      </div>
      <div class="input-group">
        <label class="input-label">Lokasi Fisik</label>
        <div class="input-field-wrap"><input id="lLok" class="input-control" placeholder="Contoh: Lantai 2, Ruang HRD" /></div>
      </div>
      <button class="btn-primary" id="saveLemariBtn" type="button">Simpan Lemari</button>
    `;
    openSheet('Tambah Lemari Baru', html, (body) => {
      body.querySelector('#saveLemariBtn').addEventListener('click', () => {
        const nama = body.querySelector('#lNama').value.trim();
        if (!nama) return showToast('Nama lemari wajib diisi');
        data.lemariList.push({
          id: uid('lemari'),
          nama,
          kode: body.querySelector('#lKode').value.trim() || 'LMR',
          lokasiFisik: body.querySelector('#lLok').value.trim(),
          deskripsi: ''
        });
        saveState();
        closeSheet();
        render();
        showToast('Lemari baru ditambahkan');
      });
    });
  }

  function openAddLaciSheet(lemariId) {
    const html = `
      <div class="input-group">
        <label class="input-label">Nama Laci</label>
        <div class="input-field-wrap"><input id="cNama" class="input-control" placeholder="Contoh: Laci C (Bawah)" /></div>
      </div>
      <div class="btn-row">
        <div class="input-group">
          <label class="input-label">Kode Laci</label>
          <div class="input-field-wrap"><input id="cKode" class="input-control" value="LC-${data.laciList.length + 1}" /></div>
        </div>
        <div class="input-group">
          <label class="input-label">Kapasitas</label>
          <div class="input-field-wrap"><input id="cKap" class="input-control" type="number" value="40" /><span class="input-suffix">berkas</span></div>
        </div>
      </div>
      <button class="btn-primary" id="saveLaciBtn" type="button">Simpan Laci</button>
    `;
    openSheet('Tambah Laci Baru', html, (body) => {
      body.querySelector('#saveLaciBtn').addEventListener('click', () => {
        const nama = body.querySelector('#cNama').value.trim();
        if (!nama) return showToast('Nama laci wajib diisi');
        data.laciList.push({
          id: uid('laci'),
          lemariId,
          nama,
          kode: body.querySelector('#cKode').value.trim() || 'LC',
          kapasitasMaksimal: parseInt(body.querySelector('#cKap').value, 10) || 40,
          keterangan: ''
        });
        saveState();
        closeSheet();
        render();
        showToast('Laci baru ditambahkan');
      });
    });
  }

  function openAddMapSheet(lemariId, laciId) {
    const html = `
      <div class="input-group">
        <label class="input-label">Nama Map</label>
        <div class="input-field-wrap"><input id="mNama" class="input-control" placeholder="Contoh: Map Pajak 2026" /></div>
      </div>
      <div class="btn-row">
        <div class="input-group">
          <label class="input-label">Kode Map</label>
          <div class="input-field-wrap"><input id="mKode" class="input-control" value="MAP-${data.mapList.length + 1}" /></div>
        </div>
        <div class="input-group">
          <label class="input-label">Kategori</label>
          <div class="input-field-wrap"><input id="mKat" class="input-control" value="Umum" /></div>
        </div>
      </div>
      <button class="btn-primary" id="saveMapBtn" type="button">Simpan Map</button>
    `;
    openSheet('Tambah Map Baru', html, (body) => {
      body.querySelector('#saveMapBtn').addEventListener('click', () => {
        const nama = body.querySelector('#mNama').value.trim();
        if (!nama) return showToast('Nama map wajib diisi');
        data.mapList.push({
          id: uid('map'),
          lemariId,
          laciId,
          nama,
          kode: body.querySelector('#mKode').value.trim() || 'MAP',
          kategori: body.querySelector('#mKat').value.trim() || 'Umum',
          deskripsi: ''
        });
        saveState();
        closeSheet();
        render();
        showToast('Map baru ditambahkan');
      });
    });
  }

  // --- Navigation & Global Listeners ---
  function switchTab(tabName) {
    ui.activeTab = tabName;
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    render();
  }

  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('lemariSwitcherBtn').addEventListener('click', openLemariSwitcherSheet);

  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  document.getElementById('fabAddBtn').addEventListener('click', () => {
    openAddEditBerkasSheet();
  });

  // Init
  initTheme();
  render();
})();
