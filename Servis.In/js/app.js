/**
 * SERVIS.IN v4.0 — Aplikasi Perawatan Kendaraan
 * Fitur:
 * - Ringkasan Padat & Rapi + Kartu Prioritas Minggu Ini
 * - Multi-Kendaraan & Template Per Model Kendaraan
 * - Pengingat Oli, Servis, Sparepart (Odometer vs Waktu - Mana Tercapai Dulu)
 * - Pencarian Riwayat + Filter Kategori, Rentang Waktu & Urutan Biaya
 * - Statistik Odometer & Grafik Biaya Tahunan
 * - Pengingat Dokumen (STNK, Plat, SIM, Asuransi)
 * - Sinkronisasi Antar Perangkat (File Cloud & Kode Sinkron) + Backup/Restore
 * - Layar Sambutan Pengguna Baru, Dialog Konfirmasi + Undo, Input Ribuan Otomatis, Swipe & Pull-to-Refresh
 * Author: Williyanto Adi 2026
 */
(function () {
  'use strict';

  const STORE_KEY = 'servis_in_store_v4';
  const V3_KEY = 'servis_in_store_v3';
  const OLD_KEY = 'servis_in_app_state_v2026';
  const ACCOUNTS_KEY = 'servis_in_accounts_v1';
  const ACTIVE_ACC_KEY = 'servis_in_active_account_id';

  const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const MONTHS_S = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const CAT = {
    oli:       { label: 'Oli',       icon: 'droplet', color: '#C87A0A' },
    servis:    { label: 'Servis',    icon: 'wrench',  color: '#4F6EF7' },
    sparepart: { label: 'Sparepart', icon: 'cog',     color: '#168A5B' },
    lainnya:   { label: 'Lainnya',   icon: 'receipt', color: '#64748B' }
  };

  const DOC_TYPES = {
    stnk:     { label: 'Pajak tahunan (STNK)', icon: 'file',   renew: 12 },
    plat:     { label: 'Ganti plat 5 tahunan', icon: 'car',    renew: 60 },
    sim:      { label: 'SIM',                  icon: 'id',     renew: 60 },
    asuransi: { label: 'Asuransi',             icon: 'shield', renew: 12 },
    lainnya:  { label: 'Dokumen lain',         icon: 'file',   renew: 12 }
  };

  // Template Per Model Kendaraan Populer di Indonesia
  const MODEL_TEMPLATES = [
    {
      id: 'vario-pcx',
      label: 'Honda Vario 125/160 · PCX · ADV',
      type: 'Motor Matic',
      defaultName: 'Honda Vario 160',
      items: [
        { category: 'oli', name: 'Oli Mesin Matic', intervalKm: 2500, intervalMonths: 2, estCost: 75000, notes: 'SPX2 / MPX2 10W-30 (0.8L)' },
        { category: 'oli', name: 'Oli Gardan / Transmisi', intervalKm: 5000, intervalMonths: 4, estCost: 25000, notes: 'Gear Oil 120ml' },
        { category: 'servis', name: 'Servis Berkala & Pembersihan CVT', intervalKm: 4000, intervalMonths: 3, estCost: 95000, notes: 'Injeksi, Throttle Body & CVT' },
        { category: 'sparepart', name: 'Kampas Rem Depan / Belakang', intervalKm: 8000, intervalMonths: 6, estCost: 85000, notes: 'Cek ketebalan kampas' },
        { category: 'sparepart', name: 'Filter Udara', intervalKm: 12000, intervalMonths: 10, estCost: 65000, notes: 'Elemen filter kertas' },
        { category: 'sparepart', name: 'Busi', intervalKm: 12000, intervalMonths: 12, estCost: 95000, notes: 'NGK LMAR8L-9' },
        { category: 'sparepart', name: 'V-Belt & Roller Set', intervalKm: 24000, intervalMonths: 20, estCost: 265000, notes: 'Paket V-Belt + Roller' },
        { category: 'oli', name: 'Air Radiator (Coolant)', intervalKm: 12000, intervalMonths: 12, estCost: 45000, notes: 'Pre-mixed Coolant' }
      ]
    },
    {
      id: 'beat-scoopy',
      label: 'Honda BeAT · Scoopy · Genio',
      type: 'Motor Matic',
      defaultName: 'Honda BeAT',
      items: [
        { category: 'oli', name: 'Oli Mesin Matic (BeAT/Scoopy)', intervalKm: 2500, intervalMonths: 2, estCost: 65000, notes: 'MPX2 10W-30 (0.65L)' },
        { category: 'oli', name: 'Oli Gardan / Transmisi', intervalKm: 5000, intervalMonths: 4, estCost: 22000, notes: 'Gear Oil 120ml' },
        { category: 'servis', name: 'Servis Berkala & CVT', intervalKm: 4000, intervalMonths: 3, estCost: 80000, notes: 'Cek CVT & Injeksi PGM-FI' },
        { category: 'sparepart', name: 'Kampas Rem Depan & Belakang', intervalKm: 8000, intervalMonths: 6, estCost: 65000, notes: '' },
        { category: 'sparepart', name: 'Filter Udara', intervalKm: 12000, intervalMonths: 10, estCost: 55000, notes: '' },
        { category: 'sparepart', name: 'Busi Standar / Iridium', intervalKm: 10000, intervalMonths: 10, estCost: 45000, notes: '' },
        { category: 'sparepart', name: 'V-Belt & Roller Set eSAF', intervalKm: 24000, intervalMonths: 20, estCost: 210000, notes: '' }
      ]
    },
    {
      id: 'nmax-aerox',
      label: 'Yamaha NMAX · Aerox · Lexi · Grand Filano',
      type: 'Motor Matic',
      defaultName: 'Yamaha NMAX 155',
      items: [
        { category: 'oli', name: 'Oli Mesin Yamalube', intervalKm: 2500, intervalMonths: 2, estCost: 82000, notes: 'Power Matic / Super Matic (0.9L)' },
        { category: 'oli', name: 'Oli Gardan', intervalKm: 5000, intervalMonths: 4, estCost: 25000, notes: '150ml' },
        { category: 'servis', name: 'Servis Injeksi & CVT', intervalKm: 4000, intervalMonths: 3, estCost: 100000, notes: 'Greasing CVT & cek YECVT/Roller' },
        { category: 'sparepart', name: 'Kampas Rem Cakram', intervalKm: 8000, intervalMonths: 6, estCost: 85000, notes: 'Depan & Belakang' },
        { category: 'sparepart', name: 'Filter Udara & Busi', intervalKm: 12000, intervalMonths: 10, estCost: 90000, notes: '' },
        { category: 'sparepart', name: 'V-Belt & Roller Set', intervalKm: 20000, intervalMonths: 18, estCost: 255000, notes: '' },
        { category: 'oli', name: 'Yamacoolant Radiator', intervalKm: 12000, intervalMonths: 12, estCost: 50000, notes: '' }
      ]
    },
    {
      id: 'motor-sport-bebek',
      label: 'Motor Bebek / Sport (Supra · MX King · CB150R · Vixion)',
      type: 'Motor Bebek / Sport',
      defaultName: 'Honda CB150R',
      items: [
        { category: 'oli', name: 'Oli Mesin', intervalKm: 2500, intervalMonths: 2, estCost: 85000, notes: 'SAE 10W-30 / 10W-40 (1.0L - 1.2L)' },
        { category: 'servis', name: 'Servis Injeksi & Pelumasan Rantai', intervalKm: 3000, intervalMonths: 3, estCost: 85000, notes: 'Setel ketegangan rantai & klep' },
        { category: 'sparepart', name: 'Kampas Rem Depan / Belakang', intervalKm: 8000, intervalMonths: 6, estCost: 75000, notes: '' },
        { category: 'sparepart', name: 'Gear Set & Rantai Roda', intervalKm: 20000, intervalMonths: 18, estCost: 280000, notes: 'Paket Gear Depan, Belakang & Rantai' },
        { category: 'sparepart', name: 'Filter Udara & Busi', intervalKm: 12000, intervalMonths: 12, estCost: 95000, notes: '' }
      ]
    },
    {
      id: 'mpv-avanza-xpander',
      label: 'Mobil MPV / SUV (Avanza · Xpander · Rush · Innova)',
      type: 'Mobil MPV / SUV',
      defaultName: 'Toyota Avanza Veloz',
      items: [
        { category: 'oli', name: 'Oli Mesin & Filter Oli', intervalKm: 10000, intervalMonths: 6, estCost: 650000, notes: 'Full Synthetic 0W-20 / 5W-30 (4L) + Filter' },
        { category: 'servis', name: 'Servis Berkala & Tune Up', intervalKm: 10000, intervalMonths: 6, estCost: 550000, notes: 'Bersihkan rem 4 roda, throttle body & scanner' },
        { category: 'servis', name: 'Spooring, Balancing & Rotasi Ban', intervalKm: 10000, intervalMonths: 6, estCost: 250000, notes: 'Rotasi silang 4 roda' },
        { category: 'oli', name: 'Oli Transmisi (Matic / CVT / Manual)', intervalKm: 40000, intervalMonths: 24, estCost: 750000, notes: 'ATF / CVTF FE' },
        { category: 'sparepart', name: 'Filter Udara & Filter Kabin AC', intervalKm: 20000, intervalMonths: 12, estCost: 280000, notes: 'Jaga sirkulasi AC tetap bersih' },
        { category: 'sparepart', name: 'Kampas Rem (Brake Pad)', intervalKm: 30000, intervalMonths: 18, estCost: 480000, notes: '' },
        { category: 'oli', name: 'Minyak Rem & Air Radiator', intervalKm: 40000, intervalMonths: 24, estCost: 320000, notes: 'DOT 3/4 & Long Life Coolant' }
      ]
    },
    {
      id: 'city-brio-hatchback',
      label: 'Mobil Hatchback / Sedan (Brio · Agya · Jazz · Yaris)',
      type: 'Mobil Sedan / Hatchback',
      defaultName: 'Honda Brio RS',
      items: [
        { category: 'oli', name: 'Oli Mesin & Filter Oli', intervalKm: 10000, intervalMonths: 6, estCost: 580000, notes: '0W-20 (3.5L - 4L) + Filter Oli' },
        { category: 'servis', name: 'Servis Berkala & Cek Rem', intervalKm: 10000, intervalMonths: 6, estCost: 450000, notes: '' },
        { category: 'servis', name: 'Spooring & Balancing', intervalKm: 10000, intervalMonths: 6, estCost: 220000, notes: '' },
        { category: 'oli', name: 'Oli Transmisi CVTF / MTF', intervalKm: 40000, intervalMonths: 24, estCost: 650000, notes: '' },
        { category: 'sparepart', name: 'Filter AC & Filter Udara', intervalKm: 20000, intervalMonths: 12, estCost: 240000, notes: '' }
      ]
    },
    {
      id: 'ev-electric',
      label: 'Kendaraan Listrik / EV (Air EV · Binguo · Ioniq · Motor Listrik)',
      type: 'Kendaraan Listrik (EV)',
      defaultName: 'Wuling Air EV',
      items: [
        { category: 'servis', name: 'Inspeksi Sistem Baterai & Motor Listrik', intervalKm: 10000, intervalMonths: 6, estCost: 300000, notes: 'Cek SOH baterai, konektor HV & firmware' },
        { category: 'oli', name: 'Oli Gardan / Reduction Gear EV', intervalKm: 20000, intervalMonths: 12, estCost: 280000, notes: '' },
        { category: 'sparepart', name: 'Filter Kabin AC', intervalKm: 15000, intervalMonths: 12, estCost: 150000, notes: '' },
        { category: 'servis', name: 'Rotasi Ban, Balancing & Cek Rem', intervalKm: 10000, intervalMonths: 6, estCost: 200000, notes: '' }
      ]
    }
  ];

  const $ = (id) => document.getElementById(id);
  const ic = (name) => `<svg class="ic"><use href="#i-${name}"/></svg>`;
  const vehicleIcon = (type) => ic(/^Motor/.test(type || '') ? 'bike' : 'car');

  // ---------------- Date & Format Helpers ----------------
  function fmtISO(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  const today = () => fmtISO(new Date());
  function parseISO(s) {
    if (!s) return new Date();
    const p = s.split('-').map(Number);
    return new Date(p[0], (p[1] || 1) - 1, p[2] || 1);
  }
  function addDays(s, n) { const d = parseISO(s); d.setDate(d.getDate() + Math.round(n)); return fmtISO(d); }
  function addMonths(s, m) {
    const d = parseISO(s);
    const w = Math.floor(m);
    d.setMonth(d.getMonth() + w);
    const extra = Math.round((m - w) * 30);
    if (extra > 0) d.setDate(d.getDate() + extra);
    return fmtISO(d);
  }
  function daysBetween(a, b) { return Math.round((parseISO(b) - parseISO(a)) / 86400000); }
  function fmtDate(s) { if (!s) return '-'; const d = parseISO(s); return `${d.getDate()} ${MONTHS_S[d.getMonth()]} ${d.getFullYear()}`; }
  function fmtDateShort(s) { if (!s) return '-'; const d = parseISO(s); return `${d.getDate()} ${MONTHS_S[d.getMonth()]}`; }
  const num = (n) => Math.round(Number(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const rp = (n) => 'Rp ' + num(n);
  function compactRp(n) {
    const v = Math.round(Number(n) || 0);
    if (!v) return '0';
    if (v >= 1000000) return (v / 1000000).toFixed(1).replace('.0', '') + 'jt';
    if (v >= 1000) return Math.round(v / 1000) + 'rb';
    return String(v);
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  const makeId = (p) => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

  // ---------------- Live Thousand Separator Inputs (UI/UX #3) ----------------
  const NUMERIC_INPUT_IDS = [
    'modal-input-odo', 'rem-interval-km', 'rem-last-odo', 'rem-est-cost',
    'comp-odo', 'comp-cost', 'exp-cost', 'exp-odo', 'input-current-odo', 'nv-odo', 'wl-odo'
  ];

  function parseFormattedNum(val) {
    if (val == null) return 0;
    const digits = String(val).replace(/[^\d]/g, '');
    return digits ? Number(digits) : 0;
  }

  function getNumInput(id) {
    const el = $(id);
    return el ? parseFormattedNum(el.value) : 0;
  }

  function setNumInput(id, val) {
    const el = $(id);
    if (!el) return;
    const n = Math.round(Number(val) || 0);
    el.value = n === 0 && el.value === '' ? '' : num(n);
  }

  function setupFormattedNumericInputs() {
    NUMERIC_INPUT_IDS.forEach((id) => {
      const el = $(id);
      if (!el) return;
      el.setAttribute('type', 'text');
      el.setAttribute('inputmode', 'numeric');
      el.addEventListener('input', () => {
        const raw = el.value.replace(/[^\d]/g, '');
        el.value = raw ? num(Number(raw)) : '';
      });
    });
  }

  // ---------------- Templates Helper ----------------
  function getCustomTemplates() {
    if (!store || !Array.isArray(store.customTemplates)) return [];
    return store.customTemplates;
  }

  function getAllTemplates() {
    return [...getCustomTemplates(), ...MODEL_TEMPLATES];
  }

  function getTemplateById(id) {
    return getAllTemplates().find((m) => m.id === id) || null;
  }

  function buildRemindersFromTemplate(templateId, currentOdo) {
    const t = today();
    const tpl = getTemplateById(templateId) || MODEL_TEMPLATES[0];
    return (tpl.items || []).map((item) => ({
      id: makeId('rem'),
      category: item.category || 'servis',
      name: item.name,
      intervalKm: Number(item.intervalKm) || 3000,
      intervalMonths: Number(item.intervalMonths) || 3,
      lastOdo: currentOdo,
      lastDate: t,
      estCost: Number(item.estCost) || 0,
      notes: item.notes || ''
    }));
  }

  function populateTemplateSelects(filterType, selectEl, preferredId, showAllModels) {
    if (!selectEl) return;
    const prevVal = preferredId || selectEl.value;
    const customs = getCustomTemplates().filter((m) => showAllModels || !filterType || m.type === filterType);
    const builtins = MODEL_TEMPLATES.filter((m) => showAllModels || !filterType || m.type === filterType);
    const builtinList = builtins.length ? builtins : MODEL_TEMPLATES;

    let html = '';
    if (customs.length) {
      html += `<optgroup label="Template Kustom Saya">` +
        customs.map((m) => `<option value="${esc(m.id)}">★ ${esc(m.label)} (${m.items.length} item)</option>`).join('') +
        `</optgroup>`;
    }
    html += `<optgroup label="Template Model Bawaan">` +
      builtinList.map((m) => `<option value="${esc(m.id)}">${esc(m.label)}</option>`).join('') +
      `</optgroup>`;
    html += `<optgroup label="Lainnya">` +
      `<option value="__create_custom__">+ Buat Template Kustom Baru…</option>` +
      `<option value="none">Kosongkan (buat manual nanti)</option>` +
      `</optgroup>`;

    selectEl.innerHTML = html;

    if (prevVal && prevVal !== '__create_custom__' && [...selectEl.options].some((o) => o.value === prevVal)) {
      selectEl.value = prevVal;
    } else if (customs.length) {
      selectEl.value = customs[0].id;
    } else if (builtinList.length) {
      selectEl.value = builtinList[0].id;
    }
  }

  // ---------------- Sample Data ----------------
  function createSampleVehicle() {
    const t = today();
    const now = parseISO(t);
    const mDate = (off, day) => fmtISO(new Date(now.getFullYear(), now.getMonth() + off, day));
    return {
      id: makeId('veh'),
      profile: {
        type: 'Motor Matic', name: 'Honda Vario 160 ABS', plateNumber: 'B 4512 KXY', year: 2024,
        currentOdo: 24850, dailyKm: 35, lastOdoUpdate: addDays(t, -2),
        odoReminder: { enabled: true, value: 1, unit: 'weeks' }
      },
      reminders: [
        { id: 'rem-oli-mesin', category: 'oli', name: 'Oli Mesin Full Synthetic', intervalKm: 2500, intervalMonths: 2, lastOdo: 21900, lastDate: addDays(t, -45), estCost: 75000, notes: '10W-30 0,8L' },
        { id: 'rem-servis-cvt', category: 'servis', name: 'Servis Berkala & Pembersihan CVT', intervalKm: 4000, intervalMonths: 3, lastOdo: 20400, lastDate: addDays(t, -75), estCost: 95000, notes: 'Throttle body, injeksi, CVT' },
        { id: 'rem-oli-gardan', category: 'oli', name: 'Oli Gardan / Transmisi', intervalKm: 5000, intervalMonths: 4, lastOdo: 21500, lastDate: addDays(t, -122), estCost: 25000, notes: '120 ml' },
        { id: 'rem-filter-udara', category: 'sparepart', name: 'Filter Udara (Air Filter)', intervalKm: 10000, intervalMonths: 8, lastOdo: 15600, lastDate: addDays(t, -210), estCost: 65000, notes: '' },
        { id: 'rem-kampas-rem', category: 'sparepart', name: 'Kampas Rem Depan Cakram', intervalKm: 8000, intervalMonths: 6, lastOdo: 17000, lastDate: addDays(t, -150), estCost: 85000, notes: '' },
        { id: 'rem-busi', category: 'sparepart', name: 'Busi Laser Iridium', intervalKm: 12000, intervalMonths: 12, lastOdo: 18000, lastDate: addDays(t, -160), estCost: 110000, notes: '' },
        { id: 'rem-vbelt', category: 'sparepart', name: 'V-Belt & Roller Set', intervalKm: 20000, intervalMonths: 18, lastOdo: 12000, lastDate: addDays(t, -280), estCost: 265000, notes: '' },
        { id: 'rem-coolant', category: 'oli', name: 'Air Radiator Coolant', intervalKm: 12000, intervalMonths: 12, lastOdo: 19500, lastDate: addDays(t, -140), estCost: 45000, notes: '' }
      ],
      selectedChecklistIds: ['rem-oli-mesin', 'rem-servis-cvt'],
      inspections: [
        { id: 'insp-1', title: 'Tekanan angin & alur ban', sub: 'Depan 29 psi, belakang 33 psi', status: 'ok' },
        { id: 'insp-2', title: 'Lampu utama, sein & rem', sub: 'Semua menyala normal', status: 'ok' },
        { id: 'insp-3', title: 'Minyak rem & tuas', sub: 'Cek level minyak rem', status: 'warn' },
        { id: 'insp-4', title: 'Tegangan aki', sub: 'Normal 12,4–14,2 V', status: 'ok' }
      ],
      expenses: [
        { id: 'exp-101', title: 'Ganti oli & servis ringan', category: 'oli', cost: 115000, date: mDate(-2, 10), odo: 22350, note: 'AHASS' },
        { id: 'exp-102', title: 'Ban belakang tubeless', category: 'sparepart', cost: 345000, date: mDate(-2, 22), odo: 22650, note: 'Planet Ban' },
        { id: 'exp-103', title: 'Ganti oli mesin', category: 'oli', cost: 75000, date: mDate(-1, 3), odo: 23400, note: 'Rutin' },
        { id: 'exp-104', title: 'Kampas rem belakang', category: 'sparepart', cost: 65000, date: mDate(-1, 18), odo: 23900, note: 'Bengkel resmi' },
        { id: 'exp-105', title: 'Isi nitrogen & cek kelistrikan', category: 'servis', cost: 35000, date: mDate(0, 3), odo: 24350, note: '' },
        { id: 'exp-106', title: 'Lampu senja LED', category: 'sparepart', cost: 45000, date: mDate(0, 10), odo: 24680, note: '' }
      ],
      odoLog: [
        { date: addDays(t, -75), odo: 22350 },
        { date: addDays(t, -60), odo: 22650 },
        { date: addDays(t, -40), odo: 23400 },
        { date: addDays(t, -25), odo: 23900 },
        { date: addDays(t, -14), odo: 24350 },
        { date: addDays(t, -7), odo: 24680 },
        { date: addDays(t, -2), odo: 24850 }
      ],
      documents: [
        { id: makeId('doc'), type: 'stnk', name: 'Pajak STNK', expiry: addDays(t, 21), remindDays: 30, notes: '' },
        { id: makeId('doc'), type: 'sim', name: 'SIM C', expiry: addDays(t, 240), remindDays: 45, notes: '' },
        { id: makeId('doc'), type: 'asuransi', name: 'Asuransi TLO', expiry: addDays(t, 95), remindDays: 30, notes: '' },
        { id: makeId('doc'), type: 'plat', name: 'Ganti plat 5 tahunan', expiry: addDays(t, 700), remindDays: 60, notes: '' }
      ]
    };
  }

  function normalizeVehicle(v) {
    v.profile = v.profile || {};
    const p = v.profile;
    p.type = p.type || 'Motor Matic';
    p.name = p.name || 'Kendaraan';
    p.plateNumber = p.plateNumber || '-';
    p.year = p.year || new Date().getFullYear();
    p.currentOdo = Number(p.currentOdo) || 0;
    p.dailyKm = Number(p.dailyKm) || 30;
    p.lastOdoUpdate = p.lastOdoUpdate || today();
    p.odoReminder = p.odoReminder || { enabled: true, value: 1, unit: 'weeks' };
    v.id = v.id || makeId('veh');
    v.reminders = Array.isArray(v.reminders) ? v.reminders : [];
    v.expenses = Array.isArray(v.expenses) ? v.expenses : [];
    v.inspections = Array.isArray(v.inspections) ? v.inspections : [];
    v.selectedChecklistIds = Array.isArray(v.selectedChecklistIds) ? v.selectedChecklistIds : [];
    v.documents = Array.isArray(v.documents) ? v.documents : [];
    v.odoLog = Array.isArray(v.odoLog) ? v.odoLog : [];
    if (v.odoLog.length === 0) v.odoLog.push({ date: p.lastOdoUpdate, odo: p.currentOdo });
    v.odoLog.sort((a, b) => a.date.localeCompare(b.date));
    return v;
  }

  // ---------------- Multi-Account Storage & Helpers ----------------
  let isBrandNewUser = false;
  let isLoggedOut = false;

  function loadAccounts() {
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  function saveAccounts(accs) {
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accs || []));
    } catch (e) {
      console.error(e);
    }
  }

  function getActiveAccountId() {
    return localStorage.getItem(ACTIVE_ACC_KEY) || null;
  }

  function setActiveAccountId(id) {
    if (id) {
      localStorage.setItem(ACTIVE_ACC_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_ACC_KEY);
    }
  }

  function loadStore() {
    let accounts = loadAccounts();
    const activeAccId = getActiveAccountId();

    // 1. Cek jika sudah ada akun dan ada ID akun yang sedang aktif/login
    if (accounts.length > 0 && activeAccId) {
      const acc = accounts.find((a) => a.id === activeAccId);
      if (acc && acc.store && Array.isArray(acc.store.vehicles) && acc.store.vehicles.length) {
        acc.store.vehicles.forEach(normalizeVehicle);
        if (!acc.store.vehicles.some((v) => v.id === acc.store.activeId)) acc.store.activeId = acc.store.vehicles[0].id;
        acc.store.theme = acc.store.theme === 'dark' ? 'dark' : 'light';
        acc.lastLogin = new Date().toISOString();
        saveAccounts(accounts);
        return acc.store;
      }
    }

    // 2. Migrasi otomatis data lama bagi pengguna yang sebelumnya sudah menggunakan v4/v3
    if (accounts.length === 0) {
      try {
        let legacyStore = null;
        const raw4 = localStorage.getItem(STORE_KEY);
        if (raw4) {
          const s = JSON.parse(raw4);
          if (s && Array.isArray(s.vehicles) && s.vehicles.length) legacyStore = s;
        }
        if (!legacyStore) {
          const raw3 = localStorage.getItem(V3_KEY);
          if (raw3) {
            const s = JSON.parse(raw3);
            if (s && Array.isArray(s.vehicles) && s.vehicles.length) legacyStore = s;
          }
        }
        if (!legacyStore) {
          const old = localStorage.getItem(OLD_KEY);
          if (old) {
            const o = JSON.parse(old);
            if (o && o.profile) {
              const theme = o.theme;
              delete o.theme;
              const v = normalizeVehicle(o);
              legacyStore = { theme: theme === 'dark' ? 'dark' : 'light', activeId: v.id, vehicles: [v], updatedAt: new Date().toISOString() };
            }
          }
        }

        if (legacyStore && Array.isArray(legacyStore.vehicles) && legacyStore.vehicles.length) {
          legacyStore.vehicles.forEach(normalizeVehicle);
          if (!legacyStore.vehicles.some((v) => v.id === legacyStore.activeId)) legacyStore.activeId = legacyStore.vehicles[0].id;
          legacyStore.theme = legacyStore.theme === 'dark' ? 'dark' : 'light';
          const firstVeh = legacyStore.vehicles[0];
          const accName = (firstVeh && firstVeh.profile && firstVeh.profile.name) ? firstVeh.profile.name : 'Akun Utama';
          const newAcc = {
            id: 'acc_' + Date.now().toString(36),
            name: accName,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            vehicleSummary: `${firstVeh.profile.name} · ${firstVeh.profile.plateNumber || ''}`,
            store: legacyStore
          };
          accounts = [newAcc];
          saveAccounts(accounts);
          setActiveAccountId(newAcc.id);
          return legacyStore;
        }
      } catch (e) {
        console.error('Migration error:', e);
      }
    }

    // 3. Jika ada akun tersimpan tapi status sedang logout (tidak ada activeAccId)
    if (accounts.length > 0 && !activeAccId) {
      isLoggedOut = true;
      // Gunakan akun pertama sebagai fallback sementara agar render engine siap di balik modal
      const acc = accounts[0];
      if (acc && acc.store && Array.isArray(acc.store.vehicles)) {
        acc.store.vehicles.forEach(normalizeVehicle);
        return acc.store;
      }
    }

    // 4. Pengguna baru sama sekali (belum ada data)
    isBrandNewUser = true;
    const v = normalizeVehicle(createSampleVehicle());
    return { theme: 'light', activeId: v.id, vehicles: [v], updatedAt: new Date().toISOString() };
  }

  let store = loadStore();
  let state = getActive();
  function getActive() { return store.vehicles.find((v) => v.id === store.activeId) || store.vehicles[0]; }

  let syncFileHandle = null;

  function save() {
    store.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (e) {
      console.error(e);
    }

    // Selalu sinkronkan data ke akun yang sedang aktif
    const activeId = getActiveAccountId();
    if (activeId) {
      const accs = loadAccounts();
      const idx = accs.findIndex((a) => a.id === activeId);
      if (idx >= 0) {
        accs[idx].store = store;
        accs[idx].lastLogin = new Date().toISOString();
        const v = getActive();
        if (v && v.profile) {
          accs[idx].vehicleSummary = `${v.profile.name} · ${v.profile.plateNumber || ''}`;
        }
        saveAccounts(accs);
      }
    }

    if (syncFileHandle) {
      writeToSyncFile().catch(() => {});
    }
    updateSyncStatusUI();
  }

  // UI state
  let reminderFilter = 'all';
  let showAllParts = false;
  let riwayatView = 'perawatan';
  let searchQuery = '';
  let searchCat = 'all';
  let searchRange = 'all';
  let searchSort = 'new';
  let viewY = parseISO(today()).getFullYear();
  let viewM = parseISO(today()).getMonth();
  let reportYear = parseISO(today()).getFullYear();

  // ---------------- Engine: Pengingat Odometer vs Waktu ----------------
  function evalReminder(rem) {
    const cur = Number(state.profile.currentOdo) || 0;
    const dailyKm = Math.max(1, Number(state.profile.dailyKm) || 30);
    const t = today();

    const intervalKm = Math.max(100, Number(rem.intervalKm) || 2000);
    const targetOdo = (Number(rem.lastOdo) || 0) + intervalKm;
    const remKm = targetOdo - cur;
    const pctKm = Math.min(150, Math.max(0, ((cur - (Number(rem.lastOdo) || 0)) / intervalKm) * 100));

    const lastDate = rem.lastDate || t;
    const months = Math.max(0.5, Number(rem.intervalMonths) || 1);
    const targetDate = addMonths(lastDate, months);
    const totalDays = Math.max(1, daysBetween(lastDate, targetDate));
    const remDays = daysBetween(t, targetDate);
    const pctTime = Math.min(150, Math.max(0, (Math.max(0, daysBetween(lastDate, t)) / totalDays) * 100));

    const dominant = pctKm >= pctTime ? 'odometer' : 'waktu';
    const maxPct = Math.max(pctKm, pctTime);

    let status = 'good';
    if (remKm <= 0 || remDays <= 0 || maxPct >= 100) status = 'overdue';
    else if (maxPct >= 78 || remKm <= 300 || remDays <= 14) status = 'due_soon';

    const predicted = addDays(t, remKm <= 0 ? 0 : Math.round(remKm / dailyKm));
    const effectiveDue = daysBetween(predicted, targetDate) >= 0 ? predicted : targetDate;

    let badge;
    if (status === 'overdue') badge = remKm <= 0 ? `Lewat ${num(Math.abs(remKm))} km` : `Lewat ${Math.abs(remDays)} hr`;
    else if (status === 'due_soon') badge = dominant === 'odometer' ? `${num(remKm)} km lagi` : `${remDays} hr lagi`;
    else badge = dominant === 'odometer' ? `${num(remKm)} km` : `${remDays} hr`;

    let reason;
    if (status === 'overdue') reason = remKm <= 0 ? `Lewat ${num(Math.abs(remKm))} km dari target ${num(targetOdo)} km` : `Lewat ${Math.abs(remDays)} hari dari ${fmtDate(targetDate)}`;
    else if (dominant === 'odometer') reason = `Target ${num(targetOdo)} km (sisa ${num(remKm)} km)`;
    else reason = `Target ${fmtDate(targetDate)} (sisa ${remDays} hari)`;

    return Object.assign({}, rem, { targetOdo, remKm, pctKm, targetDate, remDays, pctTime, dominant, maxPct, status, effectiveDue, badge, reason });
  }
  const evaluated = () => state.reminders.map(evalReminder).sort((a, b) => b.maxPct - a.maxPct);

  function evalOdoReminder() {
    const cfg = state.profile.odoReminder;
    const since = Math.max(0, daysBetween(state.profile.lastOdoUpdate || today(), today()));
    const interval = cfg.unit === 'weeks' ? cfg.value * 7 : cfg.value;
    const remDays = interval - since;
    return {
      enabled: cfg.enabled, isDue: cfg.enabled && remDays <= 0, remDays, since,
      label: `Setiap ${cfg.value} ${cfg.unit === 'weeks' ? 'minggu' : 'hari'}`
    };
  }

  // ---------------- Engine: Dokumen ----------------
  function evalDoc(d) {
    const remDays = daysBetween(today(), d.expiry);
    const status = remDays < 0 ? 'overdue' : remDays <= (Number(d.remindDays) || 30) ? 'due_soon' : 'good';
    const badge = status === 'overdue' ? `Lewat ${Math.abs(remDays)} hr` : status === 'due_soon' ? `${remDays} hr lagi` : `${remDays} hr`;
    return Object.assign({}, d, { remDays, status, badge });
  }
  const docsEval = () => state.documents.map(evalDoc).sort((a, b) => a.remDays - b.remDays);

  // ---------------- Engine: Odometer & Statistik ----------------
  function logSorted() { return state.odoLog.slice().sort((a, b) => a.date.localeCompare(b.date)); }
  function odoAt(dateISO) {
    const log = logSorted();
    if (!log.length) return state.profile.currentOdo;
    let val = log[0].odo;
    log.forEach((e) => { if (e.date <= dateISO) val = e.odo; });
    return val;
  }
  function recordOdo(odo, date) {
    state.odoLog = state.odoLog.filter((e) => e.date !== date);
    state.odoLog.push({ date, odo });
    state.odoLog.sort((a, b) => a.date.localeCompare(b.date));
  }
  function setOdometer(odo, date) {
    state.profile.currentOdo = odo;
    state.profile.lastOdoUpdate = date;
    recordOdo(odo, date);
  }
  function kmInMonth(y, m) {
    const start = fmtISO(new Date(y, m, 1));
    const endDate = fmtISO(new Date(y, m + 1, 0));
    const end = endDate > today() ? today() : endDate;
    if (end < start) return 0;
    return Math.max(0, odoAt(end) - odoAt(addDays(start, -1)));
  }
  function computeStats() {
    const log = logSorted();
    const res = { avg: null, totalKm: 0, costPerKm: null };
    if (log.length >= 2) {
      const last = log[log.length - 1];
      const windowStart = addDays(last.date, -90);
      let base = log[0];
      log.forEach((e) => { if (e.date <= windowStart) base = e; });
      const days = daysBetween(base.date, last.date);
      if (days > 0 && last.odo >= base.odo) res.avg = (last.odo - base.odo) / days;
      res.totalKm = last.odo - log[0].odo;
      if (res.totalKm > 0) {
        const spent = state.expenses
          .filter((e) => e.date >= log[0].date && e.date <= last.date)
          .reduce((s, e) => s + (Number(e.cost) || 0), 0);
        res.costPerKm = spent / res.totalKm;
      }
    }
    return res;
  }

  // ---------------- Engine: Riwayat Bulanan ----------------
  function monthData(y, m) {
    const now = parseISO(today());
    const diff = (y - now.getFullYear()) * 12 + (m - now.getMonth());
    const type = diff < 0 ? 'past' : diff === 0 ? 'current' : 'future';
    const recorded = state.expenses
      .filter((e) => { const d = parseISO(e.date); return d.getFullYear() === y && d.getMonth() === m; })
      .sort((a, b) => b.date.localeCompare(a.date));
    const totalRecorded = recorded.reduce((s, e) => s + (Number(e.cost) || 0), 0);

    const projected = [];
    if (diff >= 0) {
      const dailyKm = Math.max(1, Number(state.profile.dailyKm) || 30);
      const start = new Date(y, m, 1);
      const end = new Date(y, m + 1, 0);
      evaluated().forEach((it) => {
        const kmCycle = Math.max(7, Math.round(it.intervalKm / dailyKm));
        const timeCycle = Math.max(7, Math.round(it.intervalMonths * 30.4375));
        const cycle = Math.min(kmCycle, timeCycle);
        let due = it.status === 'overdue' ? today() : it.effectiveDue;
        for (let i = 0; i < 18; i++) {
          const d = parseISO(due);
          if (d > end) break;
          if (d >= start) {
            projected.push({ remId: it.id, title: it.name, category: it.category, cost: Number(it.estCost) || 0, date: due, label: i === 0 && it.status === 'overdue' ? 'Lewat jadwal' : (kmCycle <= timeCycle ? 'Prediksi odometer' : 'Jadwal waktu') });
            break;
          }
          due = addDays(due, cycle);
        }
      });
    }
    const totalProjected = projected.reduce((s, e) => s + e.cost, 0);
    return { type, diff, recorded, totalRecorded, projected, totalProjected };
  }

  // ---------------- Render Functions ----------------
  function applyTheme() {
    const dark = store.theme === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    $('meta-theme-color').setAttribute('content', dark ? '#11141B' : '#F3F5F9');
    $('input-dark-mode').checked = dark;
  }

  function renderHeader() {
    const p = state.profile;
    document.title = `${p.name} — Servis.In`;
    $('header-vehicle-icon').innerHTML = vehicleIcon(p.type);
    $('header-vehicle-name').textContent = p.name;
    $('header-vehicle-meta').textContent = `${p.plateNumber} · ${p.type} · ${p.year}`;
    $('header-vehicle-count').textContent = store.vehicles.length > 1 ? `${store.vehicles.length} kendaraan` : '';
  }

  // Ultra-Compact Reminder Row (Fits 6-8 items per screen!)
  function compactReminderRow(it) {
    const cat = CAT[it.category] || CAT.servis;
    const pct = Math.min(100, Math.round(it.maxPct));
    const noteText = it.notes ? ` · ${esc(it.notes)}` : '';
    return `
      <div class="swipe-wrap" data-swipe-row>
        <div class="swipe-actions">
          <button type="button" class="swipe-btn done" data-action="complete-rem" data-id="${it.id}">Selesai</button>
          <button type="button" class="swipe-btn edit" data-action="edit-rem" data-id="${it.id}">Edit</button>
          <button type="button" class="swipe-btn del" data-action="delete-rem" data-id="${it.id}">Hapus</button>
        </div>
        <div class="c-row" data-open-item="rem" data-id="${it.id}">
          <span class="c-status-bar ${it.status}"></span>
          <span class="rem-ic ${it.category}">${ic(cat.icon)}</span>
          <div class="c-main">
            <div class="c-line1">
              <span class="c-title">${esc(it.name)}</span>
            </div>
            <div class="c-line2">
              <div class="c-mini-bar ${it.status}"><i style="width:${pct}%"></i></div>
              <span>${num(it.targetOdo)} km · ${fmtDateShort(it.targetDate)} · <b>${rp(it.estCost)}</b>${noteText}</span>
            </div>
          </div>
          <div class="c-right">
            <span class="chip ${it.status}">${it.badge}</span>
            <button type="button" class="btn-quick-done" data-action="complete-rem" data-id="${it.id}" title="Catat Selesai" aria-label="Selesai">${ic('check')}</button>
          </div>
        </div>
      </div>`;
  }

  function renderRingkasan() {
    const p = state.profile;
    const odo = evalOdoReminder();
    const list = evaluated();
    const urgent = list.filter((r) => r.status !== 'good');
    const docs = docsEval().filter((d) => d.status !== 'good');
    const estUrgentCost = urgent.reduce((s, r) => s + (Number(r.estCost) || 0), 0);

    $('home-odo-value').textContent = num(p.currentOdo);
    $('home-odo-updated-text').textContent = odo.since === 0 ? 'Hari ini' : fmtDateShort(p.lastOdoUpdate);
    $('odo-due-dot').classList.toggle('hidden', !odo.isDue);

    $('sum-urgent-count').textContent = urgent.length;
    $('sum-doc-count').textContent = docs.length;
    $('sum-cost-est').textContent = compactRp(estUrgentCost) === '0' ? 'Rp 0' : 'Rp ' + compactRp(estUrgentCost);

    $('strip-urgent-btn').className = 'sum-item' + (urgent.some((r) => r.status === 'overdue') ? ' bad' : urgent.length ? ' warn' : '');
    $('strip-doc-btn').className = 'sum-item' + (docs.some((d) => d.status === 'overdue') ? ' bad' : docs.length ? ' warn' : '');

    const nb = $('nav-badge-checklist');
    nb.textContent = urgent.length;
    nb.classList.toggle('hidden', urgent.length === 0);

    $('count-cat-all').textContent = list.length;
    ['oli', 'servis', 'sparepart'].forEach((c) => { $('count-cat-' + c).textContent = list.filter((r) => r.category === c).length; });

    const filtered = reminderFilter === 'all' ? list : list.filter((r) => r.category === reminderFilter);

    // Priority Card at top (UI/UX #6)
    let prioHTML = '';
    if (urgent.length > 0 && reminderFilter === 'all') {
      const top = urgent[0];
      const isOverdue = top.status === 'overdue';
      prioHTML = `
        <div class="priority-banner ${isOverdue ? '' : 'warn'}">
          <div class="prio-left">
            <span class="prio-tag">${isOverdue ? 'Prioritas' : 'Segera'}</span>
            <span class="prio-text">${esc(top.name)} <span class="prio-sub">· ${top.badge}</span></span>
          </div>
          <button type="button" class="btn-tonal" data-action="complete-rem" data-id="${top.id}">Selesai</button>
        </div>`;
    }

    $('reminders-container').innerHTML = filtered.length
      ? `${prioHTML}<div class="compact-stack">${filtered.map(compactReminderRow).join('')}</div>`
      : '<div class="empty-box">Belum ada pengingat. Tekan tombol + untuk menambah.</div>';
  }

  // ----- Pencarian, Filter & Urutan Riwayat -----
  function searchTokens() {
    return searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
  }
  function highlight(text, tokens) {
    let out = esc(text);
    tokens.forEach((t) => {
      const re = new RegExp('(' + esc(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }
  function expenseRow(e, tokens) {
    tokens = tokens || [];
    const c = CAT[e.category] || CAT.lainnya;
    const meta = [fmtDate(e.date), e.odo ? `${num(e.odo)} km` : '', e.note].filter(Boolean).map((m) => highlight(m, tokens)).join(' · ');
    return `<div class="row-card">
      <span class="rem-ic ${e.category}">${ic(c.icon)}</span>
      <div class="row-body"><div class="row-title">${highlight(e.title, tokens)}</div><div class="row-meta">${meta}</div></div>
      <div class="row-end"><span class="row-amount">${rp(e.cost)}</span>
        <button type="button" class="btn-ghost-icon" data-action="edit-exp" data-id="${e.id}" aria-label="Edit">${ic('edit')}</button>
        <button type="button" class="btn-ghost-icon" data-action="delete-exp" data-id="${e.id}" aria-label="Hapus">${ic('trash')}</button>
      </div>
    </div>`;
  }

  function isFilterActive() {
    return searchQuery.length > 0 || searchCat !== 'all' || searchRange !== 'all' || searchSort !== 'new';
  }

  function renderSearch() {
    const tokens = searchTokens();
    const hasFilter = searchCat !== 'all' || searchRange !== 'all' || searchSort !== 'new';
    const active = tokens.length > 0 || hasFilter;

    $('btn-clear-search').hidden = !searchQuery;
    $('filter-dot').hidden = !hasFilter;
    $('btn-filter-toggle').classList.toggle('active', !$('filter-panel').hidden || hasFilter);
    $('month-content').hidden = active;
    $('search-results').hidden = !active;
    if (!active) return;

    const t = today();
    const curYear = parseISO(t).getFullYear();

    const hits = state.expenses
      .filter((e) => {
        if (searchCat !== 'all' && e.category !== searchCat) return false;
        if (searchRange === '30' && daysBetween(e.date, t) > 30) return false;
        if (searchRange === '90' && daysBetween(e.date, t) > 90) return false;
        if (searchRange === 'year' && parseISO(e.date).getFullYear() !== curYear) return false;
        if (!tokens.length) return true;
        const hay = [e.title, e.note, (CAT[e.category] || CAT.lainnya).label, e.date, fmtDate(e.date), e.odo].join(' ').toLowerCase();
        return tokens.every((tk) => hay.includes(tk));
      })
      .sort((a, b) => {
        if (searchSort === 'old') return a.date.localeCompare(b.date);
        if (searchSort === 'high') return (Number(b.cost) || 0) - (Number(a.cost) || 0);
        if (searchSort === 'low') return (Number(a.cost) || 0) - (Number(b.cost) || 0);
        return b.date.localeCompare(a.date);
      });

    const total = hits.reduce((s, e) => s + (Number(e.cost) || 0), 0);
    $('search-summary').textContent = hits.length ? `${hits.length} catatan ditemukan · total ${rp(total)}` : 'Tidak ada catatan yang cocok';

    let html = '';
    let lastKey = '';
    const groupByMonth = searchSort === 'new' || searchSort === 'old';
    hits.forEach((e) => {
      if (groupByMonth) {
        const d = parseISO(e.date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (key !== lastKey) { html += `<div class="group-label">${MONTHS[d.getMonth()]} ${d.getFullYear()}</div>`; lastKey = key; }
      }
      html += expenseRow(e, tokens);
    });
    $('search-results-list').innerHTML = html || '<div class="empty-box">Tidak ada riwayat yang cocok dengan pencarian/filter.</div>';
  }

  function renderRiwayat() {
    ['perawatan', 'odometer', 'tahunan'].forEach((v) => {
      $('seg-' + v).classList.toggle('active', riwayatView === v);
      $('view-' + v).hidden = riwayatView !== v;
    });
    $('btn-add-expense').hidden = riwayatView !== 'perawatan';
    if (riwayatView === 'perawatan') renderPerawatan();
    else if (riwayatView === 'odometer') renderOdometerView();
    else renderTahunanView();
  }

  function renderPerawatan() {
    renderSearch();
    const d = monthData(viewY, viewM);
    const title = `${MONTHS[viewM]} ${viewY}`;
    $('expense-month-title').textContent = title;
    const badge = $('expense-month-badge');
    badge.textContent = d.type === 'current' ? 'Bulan ini' : 'Kembali ke bulan ini';
    badge.classList.toggle('static', d.type === 'current');

    $('label-primary-cost').textContent = 'Biaya dikeluarkan';
    $('val-primary-cost').textContent = rp(d.totalRecorded);
    if (d.type === 'past') {
      $('label-secondary-cost').textContent = 'Jumlah catatan';
      $('val-secondary-cost').textContent = `${d.recorded.length} catatan`;
    } else {
      $('label-secondary-cost').textContent = 'Estimasi servis';
      $('val-secondary-cost').textContent = rp(d.totalProjected);
    }

    const items = d.type === 'future' && !d.recorded.length ? d.projected : d.recorded.concat(d.projected);
    const totals = { oli: 0, servis: 0, sparepart: 0, lainnya: 0 };
    items.forEach((i) => { totals[totals[i.category] !== undefined ? i.category : 'lainnya'] += Number(i.cost) || 0; });
    const grand = Object.values(totals).reduce((a, b) => a + b, 0);
    $('expense-cat-breakdown').innerHTML = grand === 0
      ? '<div class="empty-note">Belum ada data pada bulan ini</div>'
      : `<div class="stack-bar">${Object.keys(totals).filter((k) => totals[k] > 0).map((k) => `<div style="width:${Math.max(4, Math.round(totals[k] / grand * 100))}%;background:${CAT[k].color}"></div>`).join('')}</div>
         <div class="legend">${Object.keys(totals).filter((k) => totals[k] > 0).map((k) => `<span><i style="background:${CAT[k].color}"></i>${CAT[k].label} ${rp(totals[k])}</span>`).join('')}</div>`;

    $('recorded-section-title').textContent = 'Riwayat perawatan';
    $('recorded-expense-list').innerHTML = d.recorded.length
      ? d.recorded.map((e) => expenseRow(e)).join('')
      : '<div class="empty-box">Belum ada riwayat pada bulan ini.</div>';

    const sec = $('projected-expenses-section');
    if (d.type === 'past') { sec.hidden = true; return; }
    sec.hidden = false;
    $('projected-section-title').textContent = d.type === 'current' ? 'Jatuh tempo bulan ini' : 'Proyeksi jadwal servis';
    $('projected-expense-list').innerHTML = d.projected.length
      ? d.projected.map((p) => {
          const c = CAT[p.category] || CAT.servis;
          return `<div class="row-card dashed">
            <span class="rem-ic ${p.category}">${ic(c.icon)}</span>
            <div class="row-body"><div class="row-title">${esc(p.title)}</div><div class="row-meta">${fmtDate(p.date)} · ${p.label}</div></div>
            <div class="row-end"><span class="row-amount">${rp(p.cost)}</span>
              <button type="button" class="btn-tonal" data-action="complete-rem" data-id="${p.remId}">Selesai</button></div>
          </div>`;
        }).join('')
      : '<div class="empty-box">Tidak ada jadwal jatuh tempo pada bulan ini.</div>';
  }

  function renderOdometerView() {
    const st = computeStats();
    const now = parseISO(today());
    $('stat-avg-day').textContent = st.avg == null ? '-' : `${st.avg.toFixed(1).replace('.', ',')} km`;
    $('stat-km-month').textContent = `${num(kmInMonth(now.getFullYear(), now.getMonth()))} km`;
    $('stat-total-km').textContent = st.totalKm ? `${num(st.totalKm)} km` : '-';
    $('stat-cost-km').textContent = st.costPerKm == null ? '-' : `Rp ${num(st.costPerKm)}`;

    const applyCard = $('apply-avg-card');
    if (st.avg == null) {
      applyCard.hidden = false;
      $('stat-avg-note').textContent = 'Catat odometer berkala untuk menghitung rata-rata harian.';
      $('btn-apply-avg').hidden = true;
    } else {
      const rounded = Math.max(1, Math.round(st.avg));
      applyCard.hidden = false;
      $('btn-apply-avg').hidden = rounded === Number(state.profile.dailyKm);
      $('stat-avg-note').textContent = rounded === Number(state.profile.dailyKm)
        ? `Prediksi servis memakai ${rounded} km/hari (sesuai data terukur).`
        : `Terukur ${rounded} km/hari, prediksi memakai ${state.profile.dailyKm} km/hari.`;
    }

    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ y: d.getFullYear(), m: d.getMonth(), km: kmInMonth(d.getFullYear(), d.getMonth()), cur: i === 0 });
    }
    const max = Math.max(1, ...months.map((x) => x.km));
    $('odo-chart').innerHTML = months.map((x) => `
      <div class="bar-col ${x.cur ? 'current' : ''}">
        <span class="bar-val">${x.km ? num(x.km) : '0'}</span>
        <div class="bar-track"><div class="bar-fill" style="height:${Math.max(3, Math.round(x.km / max * 100))}%"></div></div>
        <span class="bar-lbl">${MONTHS_S[x.m]}</span>
      </div>`).join('');

    const log = logSorted();
    const rows = log.map((e, i) => ({ e, delta: i > 0 ? e.odo - log[i - 1].odo : null })).reverse().slice(0, 12);
    $('odo-log-list').innerHTML = rows.length
      ? rows.map(({ e, delta }) => `
        <div class="row-card">
          <span class="rem-ic servis">${ic('gauge')}</span>
          <div class="row-body"><div class="row-title">${num(e.odo)} km</div><div class="row-meta">${fmtDate(e.date)}${delta != null ? ` · +${num(delta)} km` : ''}</div></div>
          <button type="button" class="btn-ghost-icon" data-action="delete-log" data-id="${e.date}" aria-label="Hapus">${ic('trash')}</button>
        </div>`).join('')
      : '<div class="empty-box">Belum ada catatan odometer.</div>';
  }

  // ----- Grafik Biaya Tahunan -----
  function renderTahunanView() {
    $('year-title').textContent = reportYear;
    const yearExps = state.expenses.filter((e) => parseISO(e.date).getFullYear() === reportYear);
    const prevExps = state.expenses.filter((e) => parseISO(e.date).getFullYear() === reportYear - 1);

    const total = yearExps.reduce((s, e) => s + (Number(e.cost) || 0), 0);
    const prevTotal = prevExps.reduce((s, e) => s + (Number(e.cost) || 0), 0);
    const now = parseISO(today());
    const divisor = reportYear === now.getFullYear() ? Math.max(1, now.getMonth() + 1) : 12;

    $('year-total').textContent = rp(total);
    $('year-avg').textContent = rp(Math.round(total / divisor));

    if (prevTotal > 0) {
      const diffPct = Math.round(((total - prevTotal) / prevTotal) * 100);
      $('year-delta').textContent = `${diffPct >= 0 ? '+' : ''}${diffPct}% dibanding ${reportYear - 1}`;
    } else {
      $('year-delta').textContent = `${yearExps.length} transaksi tercatat`;
    }

    // 12-Month Stacked Bars
    const monthly = Array.from({ length: 12 }, () => ({ oli: 0, servis: 0, sparepart: 0, lainnya: 0, sum: 0 }));
    const catYear = { oli: 0, servis: 0, sparepart: 0, lainnya: 0 };

    yearExps.forEach((e) => {
      const m = parseISO(e.date).getMonth();
      const c = monthly[m][e.category] !== undefined ? e.category : 'lainnya';
      const val = Number(e.cost) || 0;
      monthly[m][c] += val;
      monthly[m].sum += val;
      catYear[c] += val;
    });

    const maxMonth = Math.max(1, ...monthly.map((m) => m.sum));
    $('year-chart').innerHTML = monthly.map((m, idx) => {
      const isCur = reportYear === now.getFullYear() && idx === now.getMonth();
      const segs = Object.keys(CAT).filter((k) => m[k] > 0).map((k) => {
        const h = Math.max(3, Math.round((m[k] / maxMonth) * 100));
        return `<div class="bar-seg" style="height:${h}%;background:${CAT[k].color}"></div>`;
      }).join('');
      return `
        <div class="bar-col ${isCur ? 'current' : ''}">
          <span class="bar-val">${compactRp(m.sum)}</span>
          <div class="bar-track">${segs}</div>
          <span class="bar-lbl">${MONTHS_S[idx].slice(0, 3)}</span>
        </div>`;
    }).join('');

    $('year-legend').innerHTML = Object.keys(CAT).map((k) =>
      `<span><i style="background:${CAT[k].color}"></i>${CAT[k].label}</span>`
    ).join('');

    $('year-cats').innerHTML = total === 0
      ? '<div class="empty-note">Belum ada pengeluaran pada tahun ini.</div>'
      : Object.keys(CAT).map((k) => {
          const val = catYear[k];
          const pct = total ? Math.round((val / total) * 100) : 0;
          return `<div class="cat-row">
            <div class="cat-row-left"><span class="cat-dot" style="background:${CAT[k].color}"></span><span>${CAT[k].label}</span></div>
            <strong>${rp(val)} <small style="color:var(--text-3);font-weight:400">(${pct}%)</small></strong>
          </div>`;
        }).join('');

    const topList = yearExps.slice().sort((a, b) => (Number(b.cost) || 0) - (Number(a.cost) || 0)).slice(0, 5);
    $('year-top').innerHTML = topList.length
      ? topList.map((e) => expenseRow(e)).join('')
      : '<div class="empty-box">Belum ada transaksi pada tahun ini.</div>';
  }

  function renderChecklist() {
    const list = evaluated();
    const parts = showAllParts ? list : list.filter((r) => r.status !== 'good');
    const valid = new Set(list.map((r) => r.id));
    state.selectedChecklistIds = state.selectedChecklistIds.filter((id) => valid.has(id));

    $('due-checklist-container').innerHTML = parts.length
      ? parts.map((it) => {
          const checked = state.selectedChecklistIds.includes(it.id);
          return `<label class="check-card ${checked ? 'checked' : ''}">
            <input type="checkbox" data-check-part="${it.id}" ${checked ? 'checked' : ''}>
            <div class="row-body"><div class="row-title">${esc(it.name)}</div><div class="row-meta">${esc(it.reason)}</div></div>
            <div class="row-end"><span class="row-amount">${rp(it.estCost)}</span><span class="chip ${it.status}">${it.badge}</span></div>
          </label>`;
        }).join('')
      : '<div class="empty-box">Tidak ada part yang mendesak. Aktifkan "Semua" untuk melihat seluruh komponen.</div>';

    const sel = list.filter((r) => state.selectedChecklistIds.includes(r.id));
    $('chk-selected-count').textContent = sel.length;
    $('chk-selected-cost').textContent = `Estimasi: ${rp(sel.reduce((s, r) => s + (Number(r.estCost) || 0), 0))}`;
    $('btn-complete-checked').disabled = sel.length === 0;

    $('physical-checklist-container').innerHTML = state.inspections.length
      ? state.inspections.map((i) => `
        <div class="insp-card">
          <div class="row-body"><div class="row-title">${esc(i.title)}</div><div class="row-meta">${esc(i.sub || '')}</div></div>
          <div class="insp-right">
            <div class="insp-btns">
              <button type="button" class="insp-btn ${i.status === 'ok' ? 'active-ok' : ''}" data-insp-id="${i.id}" data-insp-val="ok">Aman</button>
              <button type="button" class="insp-btn ${i.status === 'warn' ? 'active-warn' : ''}" data-insp-id="${i.id}" data-insp-val="warn">Cek</button>
              <button type="button" class="insp-btn ${i.status === 'bad' ? 'active-bad' : ''}" data-insp-id="${i.id}" data-insp-val="bad">Ganti</button>
            </div>
            <div class="insp-tools">
              <button type="button" class="btn-ghost-icon" data-action="edit-insp" data-id="${i.id}" aria-label="Edit">${ic('edit')}</button>
              <button type="button" class="btn-ghost-icon" data-action="delete-insp" data-id="${i.id}" aria-label="Hapus">${ic('trash')}</button>
            </div>
          </div>
        </div>`).join('')
      : '<div class="empty-box">Belum ada item pemeriksaan fisik. Tekan "+ Item" untuk menambah.</div>';
  }

  function renderDocs() {
    const docs = docsEval();
    const alerts = docs.filter((d) => d.status !== 'good').length;
    const nb = $('nav-badge-doc');
    nb.textContent = alerts;
    nb.classList.toggle('hidden', alerts === 0);

    $('doc-list').innerHTML = docs.length
      ? `<div class="compact-stack">${docs.map((d) => {
          const t = DOC_TYPES[d.type] || DOC_TYPES.lainnya;
          return `
            <div class="swipe-wrap" data-swipe-row>
              <div class="swipe-actions">
                <button type="button" class="swipe-btn done" data-action="renew-doc" data-id="${d.id}">Perpanjang</button>
                <button type="button" class="swipe-btn edit" data-action="edit-doc" data-id="${d.id}">Edit</button>
                <button type="button" class="swipe-btn del" data-action="delete-doc" data-id="${d.id}">Hapus</button>
              </div>
              <div class="c-row" data-open-item="doc" data-id="${d.id}">
                <span class="c-status-bar ${d.status}"></span>
                <span class="rem-ic ${d.status === 'good' ? 'sparepart' : d.status === 'due_soon' ? 'oli' : 'lainnya'}">${ic(t.icon)}</span>
                <div class="c-main">
                  <div class="c-line1"><span class="c-title">${esc(d.name)}</span></div>
                  <div class="c-line2"><span>${t.label} · Berlaku s.d. <b>${fmtDate(d.expiry)}</b></span></div>
                </div>
                <div class="c-right">
                  <span class="chip ${d.status}">${d.badge}</span>
                </div>
              </div>
            </div>`;
        }).join('')}</div>`
      : '<div class="empty-box">Belum ada dokumen. Tambahkan pajak STNK, SIM, atau asuransi.</div>';
  }

  // Mini tab state untuk rata-rata km (day / week)
  let profileRateUnit = 'day';

  function updateRateConversionHint(val) {
    const n = Math.max(0, Number(val) || 0);
    const hint = $('rate-convert-hint');
    if (!hint) return;
    if (profileRateUnit === 'day') {
      hint.textContent = `≈ ${n} km/hari (${n * 7} km/minggu)`;
    } else {
      const perDay = Math.round(n / 7);
      hint.textContent = `≈ ${n} km/minggu (${perDay} km/hari)`;
    }
  }

  function setProfileRateUnit(unit) {
    if (unit === profileRateUnit) return;
    const input = $('input-daily-km');
    const curVal = Number(input.value) || (profileRateUnit === 'day' ? 30 : 210);
    profileRateUnit = unit;
    if (unit === 'week') {
      input.value = Math.round(curVal * 7);
      if ($('rate-unit-badge')) $('rate-unit-badge').textContent = 'km/minggu';
    } else {
      input.value = Math.max(1, Math.round(curVal / 7));
      if ($('rate-unit-badge')) $('rate-unit-badge').textContent = 'km/hari';
    }
    document.querySelectorAll('#mini-tab-rate-unit .mini-tab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.rateUnit === unit);
    });
    updateRateConversionHint(input.value);
  }

  function renderTemplatePreview() {
    const sel = $('apply-template-select');
    if (!sel) return;
    const tplId = sel.value;
    const box = $('template-preview-box');
    const editBtn = $('btn-edit-template');
    const editLabel = $('btn-edit-template-label');
    const delBtn = $('btn-del-custom-tpl');

    if (tplId === '__create_custom__') {
      box.innerHTML = '<span style="font-size:11.5px;color:var(--text-2)">Klik tombol di bawah untuk membuat template kustom baru.</span>';
      if (editBtn) editBtn.hidden = true;
      if (delBtn) delBtn.hidden = true;
      return;
    }

    if (!tplId || tplId === 'none') {
      box.innerHTML = '<span style="font-size:11.5px;color:var(--text-3)">Kosongkan daftar pengingat (buat manual sendiri).</span>';
      if (editBtn) editBtn.hidden = true;
      if (delBtn) delBtn.hidden = true;
      return;
    }

    const tpl = getTemplateById(tplId);
    if (!tpl) {
      box.innerHTML = '';
      if (editBtn) editBtn.hidden = true;
      if (delBtn) delBtn.hidden = true;
      return;
    }

    const isCustom = String(tpl.id).startsWith('ctpl-');
    if (editBtn) {
      editBtn.hidden = false;
      if (editLabel) {
        editLabel.textContent = isCustom ? 'Edit template kustom ini' : 'Sesuaikan / Edit template ini';
      }
    }
    if (delBtn) {
      delBtn.hidden = !isCustom;
    }

    box.innerHTML = `
      <div class="tpl-prev-head">
        <div class="tpl-prev-title-wrap">
          <span class="tpl-type-badge ${isCustom ? 'custom' : 'builtin'}">${isCustom ? '★ Kustom' : 'Model Bawaan'}</span>
          <strong>${esc(tpl.defaultName || tpl.label)}</strong>
          <small>(${esc(tpl.type)})</small>
        </div>
        <div class="tpl-prev-actions">
          <button type="button" class="btn-ghost-sm" id="btn-quick-edit-tpl" title="Edit / sesuaikan template ini">
            <svg class="ic"><use href="#i-edit"/></svg><span>${isCustom ? 'Edit' : 'Sesuaikan'}</span>
          </button>
          <span>${tpl.items.length} item</span>
        </div>
      </div>
      <div class="tpl-prev-tags">
        ${tpl.items.map((it) => `<span class="tpl-tag">${esc(it.name)} · <b>${num(it.intervalKm)} km</b> / ${it.intervalMonths} bln</span>`).join('')}
      </div>
    `;

    const quickEdit = $('btn-quick-edit-tpl');
    if (quickEdit) {
      quickEdit.addEventListener('click', () => {
        openCustomTemplateModal(tpl, false);
      });
    }
  }

  function renderProfile() {
    const p = state.profile;
    $('profile-preview-icon').innerHTML = vehicleIcon(p.type);
    $('profile-preview-type').textContent = p.type;
    $('profile-preview-name').textContent = p.name;
    $('profile-preview-plate').textContent = p.plateNumber;
    $('profile-preview-plate-sub').textContent = `TAHUN ${p.year}`;

    // Render Akun Aktif & Logout Card
    const accs = loadAccounts();
    const activeAccId = getActiveAccountId();
    const activeAcc = accs.find((a) => a.id === activeAccId) || { name: p.name || 'Akun Utama' };
    if ($('account-user-name')) $('account-user-name').textContent = activeAcc.name;
    if ($('account-user-meta')) {
      const vCount = store.vehicles ? store.vehicles.length : 1;
      $('account-user-meta').textContent = `${vCount} Kendaraan · ${p.name}`;
    }

    $('input-vehicle-type').value = p.type;
    $('input-vehicle-name').value = p.name;
    $('input-plate-number').value = p.plateNumber;
    $('input-vehicle-year').value = p.year;
    setNumInput('input-current-odo', p.currentOdo);

    // Mini tab rata-rata penggunaan (Per Hari / Per Minggu)
    if (profileRateUnit === 'day') {
      $('input-daily-km').value = p.dailyKm;
      if ($('rate-unit-badge')) $('rate-unit-badge').textContent = 'km/hari';
    } else {
      $('input-daily-km').value = Math.round(p.dailyKm * 7);
      if ($('rate-unit-badge')) $('rate-unit-badge').textContent = 'km/minggu';
    }
    document.querySelectorAll('#mini-tab-rate-unit .mini-tab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.rateUnit === profileRateUnit);
    });
    updateRateConversionHint($('input-daily-km').value);

    $('btn-delete-vehicle').disabled = store.vehicles.length <= 1;

    // Populate template selector in Profile without losing current selection
    const currentSelected = $('apply-template-select').value;
    const preferredTplId = p.templateId || (currentSelected && currentSelected !== '__create_custom__' ? currentSelected : 'vario-pcx');
    populateTemplateSelects(null, $('apply-template-select'), preferredTplId, true);
    renderTemplatePreview();

    const activeTpl = getTemplateById(p.templateId);
    $('template-active-label').textContent = activeTpl
      ? `Aktif: ${activeTpl.label}`
      : 'Pilih model atau buat template kustom';

    const r = p.odoReminder;
    const o = evalOdoReminder();
    $('input-odo-rem-enabled').checked = r.enabled;
    $('input-odo-rem-val').value = r.value;
    $('input-odo-rem-unit').value = r.unit;
    $('profile-odo-rem-status').textContent = !o.enabled ? 'Nonaktif' : o.isDue ? `${o.label} · saatnya update` : `${o.label} · ${o.remDays} hari lagi`;
    const body = $('odo-reminder-settings-body');
    body.style.opacity = r.enabled ? '1' : '.45';
    body.style.pointerEvents = r.enabled ? 'auto' : 'none';
    document.querySelectorAll('[data-odo-preset]').forEach((c) => c.classList.toggle('active', c.dataset.odoPreset === `${r.value}-${r.unit}`));

    updateSyncStatusUI();
  }

  function renderVehicleList() {
    $('vehicle-list').innerHTML = store.vehicles.map((v) => `
      <button type="button" class="row-card clickable ${v.id === store.activeId ? 'active-item' : ''}" data-switch-vehicle="${v.id}">
        <span class="v-avatar">${vehicleIcon(v.profile.type)}</span>
        <div class="row-body"><div class="row-title">${esc(v.profile.name)}</div><div class="row-meta">${esc(v.profile.plateNumber)} · ${num(v.profile.currentOdo)} km</div></div>
        ${v.id === store.activeId ? `<span style="color:var(--primary)">${ic('check')}</span>` : ''}
      </button>`).join('');
  }

  function renderAll() {
    applyTheme();
    renderHeader();
    renderRingkasan();
    renderRiwayat();
    renderChecklist();
    renderDocs();
    renderProfile();
  }

  // ---------------- Toast with Undo & Custom Confirm (UI/UX #2) ----------------
  function toast(msg, undoCallback) {
    const el = document.createElement('div');
    el.className = 'toast-msg';
    const span = document.createElement('span');
    span.textContent = msg;
    el.appendChild(span);

    if (typeof undoCallback === 'function') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'toast-undo';
      btn.textContent = 'Urungkan';
      btn.addEventListener('click', () => {
        undoCallback();
        el.remove();
      });
      el.appendChild(btn);
    }

    $('toast-container').appendChild(el);
    setTimeout(() => {
      if (!el.parentNode) return;
      el.style.opacity = '0';
      el.style.transition = 'opacity .25s';
      setTimeout(() => el.remove(), 260);
    }, undoCallback ? 4800 : 2500);
  }

  let confirmCallback = null;
  function askConfirm(title, message, okLabel, onConfirm) {
    $('confirm-title').textContent = title || 'Konfirmasi';
    $('confirm-msg').textContent = message || 'Apakah Anda yakin?';
    $('confirm-ok').textContent = okLabel || 'Hapus';
    confirmCallback = onConfirm;
    openModal('modal-confirm');
  }

  const openModal = (id) => { $(id).classList.add('open'); $(id).setAttribute('aria-hidden', 'false'); };
  const closeModal = (id) => { $(id).classList.remove('open'); $(id).setAttribute('aria-hidden', 'true'); };

  function switchTab(id) {
    document.querySelectorAll('.tab-pane').forEach((p) => p.classList.toggle('active', p.id === id));
    document.querySelectorAll('.nav-tab').forEach((b) => b.classList.toggle('active', b.dataset.target === id));
    $('app-content').scrollTop = 0;
  }

  function download(filename, text, mime) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  // ---------------- Detail Modal (#modal-item) ----------------
  function openItemDetail(kind, id) {
    if (kind === 'rem') {
      const raw = state.reminders.find((r) => r.id === id);
      if (!raw) return;
      const it = evalReminder(raw);
      $('item-title').textContent = it.name;
      $('item-body').innerHTML = `
        <dt>Kategori</dt><dd>${(CAT[it.category] || CAT.servis).label}</dd>
        <dt>Status</dt><dd>${it.badge} (${Math.round(it.maxPct)}%)</dd>
        <dt>Target Odometer</dt><dd>${num(it.targetOdo)} km (tiap ${num(it.intervalKm)} km)</dd>
        <dt>Target Waktu</dt><dd>${fmtDate(it.targetDate)} (tiap ${it.intervalMonths} bln)</dd>
        <dt>Servis Terakhir</dt><dd>${num(it.lastOdo)} km · ${fmtDate(it.lastDate)}</dd>
        <dt>Estimasi Biaya</dt><dd>${rp(it.estCost)}</dd>
        ${it.notes ? `<dt>Catatan</dt><dd>${esc(it.notes)}</dd>` : ''}
      `;
      $('item-actions').innerHTML = `
        <button type="button" class="btn-primary" data-item-act="complete-rem" data-id="${it.id}">Catat Selesai</button>
        <button type="button" class="btn-ghost" data-item-act="edit-rem" data-id="${it.id}">Edit</button>
        <button type="button" class="btn-ghost" style="color:var(--danger)" data-item-act="delete-rem" data-id="${it.id}">Hapus</button>
      `;
      openModal('modal-item');
    } else if (kind === 'doc') {
      const raw = state.documents.find((d) => d.id === id);
      if (!raw) return;
      const d = evalDoc(raw);
      const t = DOC_TYPES[d.type] || DOC_TYPES.lainnya;
      $('item-title').textContent = d.name;
      $('item-body').innerHTML = `
        <dt>Jenis</dt><dd>${t.label}</dd>
        <dt>Berlaku Sampai</dt><dd>${fmtDate(d.expiry)} (${d.badge})</dd>
        <dt>Pengingat</dt><dd>${d.remindDays} hari sebelum jatuh tempo</dd>
        ${d.notes ? `<dt>Catatan</dt><dd>${esc(d.notes)}</dd>` : ''}
      `;
      $('item-actions').innerHTML = `
        <button type="button" class="btn-primary" data-item-act="renew-doc" data-id="${d.id}">Perpanjang</button>
        <button type="button" class="btn-ghost" data-item-act="edit-doc" data-id="${d.id}">Edit</button>
        <button type="button" class="btn-ghost" style="color:var(--danger)" data-item-act="delete-doc" data-id="${d.id}">Hapus</button>
      `;
      openModal('modal-item');
    }
  }

  // ---------------- Sinkronisasi Antar Perangkat ----------------
  function encodeSyncCode() {
    const payload = JSON.stringify({ app: 'servis.in', v: 4, store });
    const bytes = new TextEncoder().encode(payload);
    let binary = '';
    bytes.forEach((b) => { binary += String.fromCharCode(b); });
    return 'SI1:' + btoa(binary);
  }

  function decodeSyncCode(codeStr) {
    const clean = (codeStr || '').trim();
    if (!clean.startsWith('SI1:')) throw new Error('Prefix tidak valid');
    const binary = atob(clean.slice(4));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (!parsed || parsed.app !== 'servis.in' || !parsed.store || !Array.isArray(parsed.store.vehicles)) {
      throw new Error('Data tidak valid');
    }
    return parsed.store;
  }

  async function writeToSyncFile() {
    if (!syncFileHandle) return;
    const writable = await syncFileHandle.createWritable();
    await writable.write(JSON.stringify({ app: 'servis.in', version: 4, exportedAt: new Date().toISOString(), store }, null, 2));
    await writable.close();
  }

  async function readFromSyncFile() {
    if (!syncFileHandle) return;
    const file = await syncFileHandle.getFile();
    const text = await file.text();
    if (!text.trim()) {
      await writeToSyncFile();
      return;
    }
    const data = JSON.parse(text);
    if (data && data.store && Array.isArray(data.store.vehicles)) {
      const remoteTime = new Date(data.store.updatedAt || data.exportedAt || 0).getTime();
      const localTime = new Date(store.updatedAt || 0).getTime();
      if (remoteTime > localTime) {
        data.store.vehicles.forEach(normalizeVehicle);
        store = data.store;
        state = getActive();
        localStorage.setItem(STORE_KEY, JSON.stringify(store));
        renderAll();
        toast('Data terbaru dimuat dari file sinkron');
      } else {
        await writeToSyncFile();
        toast('File sinkron diperbarui');
      }
    }
  }

  function updateSyncStatusUI() {
    const hasFS = 'showOpenFilePicker' in window && 'showSaveFilePicker' in window;
    $('sync-file-unsupported').hidden = hasFS;
    $('btn-sync-new').hidden = !hasFS || !!syncFileHandle;
    $('btn-sync-pick').hidden = !hasFS || !!syncFileHandle;
    $('btn-sync-now').hidden = !syncFileHandle;
    $('btn-sync-off').hidden = !syncFileHandle;
    $('btn-share-backup').hidden = !(navigator.canShare && navigator.share);

    if (syncFileHandle) {
      $('sync-status-short').textContent = `Terhubung: ${syncFileHandle.name}`;
      $('sync-file-status').textContent = `File aktif: ${syncFileHandle.name} (tersimpan otomatis)`;
    } else {
      $('sync-status-short').textContent = 'Siap (Kode Sinkron / File Cloud)';
      $('sync-file-status').textContent = 'Belum ada file sinkron yang dihubungkan';
    }
    if (store.updatedAt) {
      const d = new Date(store.updatedAt);
      $('sync-updated').textContent = `Terakhir diperbarui: ${fmtDate(fmtISO(d))} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  }

  // ---------------- Swipe & Pull-to-Refresh Gestures (Touch + Mouse Drag) ----------------
  function initGestures() {
    const content = $('app-content');
    let startX = 0, startY = 0, activeSwipeWrap = null, pulling = false, isDown = false;

    function onStart(x, y, target) {
      startX = x;
      startY = y;
      isDown = true;
      activeSwipeWrap = target.closest('[data-swipe-row]');
      pulling = content.scrollTop === 0 && !target.closest('button, input, select, textarea');
    }

    function onMove(x, y) {
      if (!isDown) return;
      const dx = x - startX;
      const dy = y - startY;

      if (activeSwipeWrap && Math.abs(dx) > 22 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        document.querySelectorAll('[data-swipe-row].swiped').forEach((w) => {
          if (w !== activeSwipeWrap) w.classList.remove('swiped');
        });
        activeSwipeWrap.classList.toggle('swiped', dx < -28);
      }

      if (pulling && dy > 42 && Math.abs(dy) > Math.abs(dx) * 1.8 && content.scrollTop === 0) {
        $('ptr').classList.add('active');
        $('ptr-text').textContent = dy > 80 ? 'Lepaskan untuk memuat ulang' : 'Tarik untuk memuat ulang';
      }
    }

    function onEnd() {
      if (!isDown) return;
      isDown = false;
      const ptr = $('ptr');
      if (ptr.classList.contains('active')) {
        ptr.classList.remove('active');
        renderAll();
        toast('Data diperbarui');
      }
      activeSwipeWrap = null;
      pulling = false;
    }

    content.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) onStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
    }, { passive: true });
    content.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    content.addEventListener('touchend', onEnd, { passive: true });

    content.addEventListener('mousedown', (e) => {
      if (e.button === 0) onStart(e.clientX, e.clientY, e.target);
    });
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);

    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-swipe-row]')) {
        document.querySelectorAll('[data-swipe-row].swiped').forEach((w) => w.classList.remove('swiped'));
      }
    });
  }

  // ---------------- Custom Template Modal Builder ----------------
  function createCustomTplRowHTML(item) {
    const it = item || { category: 'oli', name: '', intervalKm: 3000, intervalMonths: 3, estCost: 75000, notes: '' };
    return `
      <div class="ctpl-row" data-ctpl-row>
        <div class="ctpl-row-top">
          <select class="form-control" data-ctpl-field="category">
            <option value="oli" ${it.category === 'oli' ? 'selected' : ''}>Ganti Oli</option>
            <option value="servis" ${it.category === 'servis' ? 'selected' : ''}>Servis</option>
            <option value="sparepart" ${it.category === 'sparepart' ? 'selected' : ''}>Sparepart</option>
          </select>
          <input type="text" class="form-control" data-ctpl-field="name" placeholder="Nama perawatan (misal: Oli Mesin)" value="${esc(it.name)}" required maxlength="60">
          <button type="button" class="btn-ghost-icon" data-ctpl-del title="Hapus baris">${ic('trash')}</button>
        </div>
        <div class="ctpl-row-sub">
          <input type="number" class="form-control" data-ctpl-field="intervalKm" placeholder="KM (3000)" value="${Number(it.intervalKm) || 3000}" min="100" step="50" required title="Interval Kilometer">
          <input type="number" class="form-control" data-ctpl-field="intervalMonths" placeholder="Bln (3)" value="${Number(it.intervalMonths) || 3}" min="0.5" step="0.5" required title="Interval Bulan">
          <input type="number" class="form-control" data-ctpl-field="estCost" placeholder="Biaya Rp" value="${Number(it.estCost) || 0}" min="0" step="500" required title="Estimasi Biaya (Rp)">
        </div>
      </div>
    `;
  }

  function updateCtplCount() {
    $('ctpl-item-count').textContent = document.querySelectorAll('#ctpl-items-list [data-ctpl-row]').length;
  }

  function openCustomTemplateModal(existingTpl, fromCurrentReminders) {
    if (existingTpl) {
      const isCustom = String(existingTpl.id).startsWith('ctpl-');
      $('modal-ctpl-title').textContent = isCustom
        ? 'Edit template kustom'
        : 'Sesuaikan template: ' + (existingTpl.defaultName || existingTpl.label);
      $('ctpl-id').value = isCustom ? existingTpl.id : '';
      $('ctpl-name').value = isCustom
        ? (existingTpl.defaultName || existingTpl.label)
        : (existingTpl.defaultName || existingTpl.label) + ' (Kustom)';
      $('ctpl-type').value = existingTpl.type || state.profile.type;
      $('ctpl-items-list').innerHTML = (existingTpl.items || []).map(createCustomTplRowHTML).join('');
    } else if (fromCurrentReminders) {
      $('modal-ctpl-title').textContent = 'Simpan jadi template kustom';
      $('ctpl-id').value = '';
      $('ctpl-name').value = state.profile.name + ' (Kustom)';
      $('ctpl-type').value = state.profile.type;
      const source = state.reminders.length ? state.reminders : MODEL_TEMPLATES[0].items;
      $('ctpl-items-list').innerHTML = source.map(createCustomTplRowHTML).join('');
    } else {
      $('modal-ctpl-title').textContent = 'Buat template kustom baru';
      $('ctpl-id').value = '';
      $('ctpl-name').value = '';
      $('ctpl-type').value = state.profile.type;
      const starter = [
        { category: 'oli', name: 'Oli Mesin', intervalKm: 2500, intervalMonths: 2, estCost: 70000 },
        { category: 'servis', name: 'Servis Berkala', intervalKm: 4000, intervalMonths: 3, estCost: 90000 },
        { category: 'sparepart', name: 'Kampas Rem', intervalKm: 8000, intervalMonths: 6, estCost: 75000 }
      ];
      $('ctpl-items-list').innerHTML = starter.map(createCustomTplRowHTML).join('');
    }
    updateCtplCount();
    openModal('modal-custom-template');
  }

  // ---------------- Action Handler (Shared between Row, Swipe & Detail Modal) ----------------
  function handleDataAction(a, id) {
    if (a === 'complete-rem') {
      const r = state.reminders.find((x) => x.id === id); if (!r) return;
      $('comp-rem-id').value = r.id;
      $('comp-item-title').textContent = r.name;
      setNumInput('comp-odo', state.profile.currentOdo);
      $('comp-date').value = today();
      setNumInput('comp-cost', r.estCost);
      $('comp-note').value = '';
      openModal('modal-complete-service');
    } else if (a === 'edit-rem') {
      const r = state.reminders.find((x) => x.id === id); if (!r) return;
      $('modal-reminder-title').textContent = 'Edit pengingat';
      $('rem-id').value = r.id; $('rem-category').value = r.category; $('rem-name').value = r.name;
      setNumInput('rem-interval-km', r.intervalKm); $('rem-interval-months').value = r.intervalMonths;
      setNumInput('rem-last-odo', r.lastOdo); $('rem-last-date').value = r.lastDate;
      setNumInput('rem-est-cost', r.estCost); $('rem-notes').value = r.notes || '';
      openModal('modal-reminder');
    } else if (a === 'delete-rem') {
      const r = state.reminders.find((x) => x.id === id); if (!r) return;
      askConfirm('Hapus Pengingat', `Hapus pengingat "${r.name}"?`, 'Hapus', () => {
        const idx = state.reminders.findIndex((x) => x.id === id);
        const removed = state.reminders.splice(idx, 1)[0];
        save(); renderAll();
        toast(`"${removed.name}" dihapus`, () => {
          state.reminders.splice(idx, 0, removed);
          save(); renderAll();
        });
      });
    } else if (a === 'edit-exp') {
      const x = state.expenses.find((y) => y.id === id); if (!x) return;
      $('modal-expense-title').textContent = 'Edit riwayat';
      $('exp-id').value = x.id; $('exp-title').value = x.title; $('exp-category').value = x.category;
      setNumInput('exp-cost', x.cost); $('exp-date').value = x.date; setNumInput('exp-odo', x.odo || 0); $('exp-note').value = x.note || '';
      openModal('modal-expense');
    } else if (a === 'delete-exp') {
      const x = state.expenses.find((y) => y.id === id); if (!x) return;
      askConfirm('Hapus Catatan Riwayat', `Hapus catatan "${x.title}" (${rp(x.cost)})?`, 'Hapus', () => {
        const idx = state.expenses.findIndex((y) => y.id === id);
        const removed = state.expenses.splice(idx, 1)[0];
        save(); renderAll();
        toast('Catatan riwayat dihapus', () => {
          state.expenses.splice(idx, 0, removed);
          save(); renderAll();
        });
      });
    } else if (a === 'delete-log') {
      if (state.odoLog.length <= 1) { toast('Minimal satu catatan odometer'); return; }
      const entry = state.odoLog.find((x) => x.date === id); if (!entry) return;
      askConfirm('Hapus Catatan Odometer', `Hapus catatan odometer ${num(entry.odo)} km (${fmtDate(entry.date)})?`, 'Hapus', () => {
        state.odoLog = state.odoLog.filter((x) => x.date !== id);
        save(); renderAll();
        toast('Catatan odometer dihapus', () => {
          recordOdo(entry.odo, entry.date);
          save(); renderAll();
        });
      });
    } else if (a === 'edit-doc' || a === 'renew-doc') {
      const d = state.documents.find((x) => x.id === id); if (!d) return;
      const renew = a === 'renew-doc';
      $('modal-doc-title').textContent = renew ? 'Perpanjang dokumen' : 'Edit dokumen';
      $('doc-id').value = d.id; $('doc-type').value = d.type; $('doc-name').value = d.name;
      const base = d.expiry > today() ? d.expiry : today();
      $('doc-expiry').value = renew ? addMonths(base, (DOC_TYPES[d.type] || DOC_TYPES.lainnya).renew) : d.expiry;
      $('doc-remind-days').value = d.remindDays; $('doc-notes').value = d.notes || '';
      openModal('modal-doc');
    } else if (a === 'delete-doc') {
      const d = state.documents.find((x) => x.id === id); if (!d) return;
      askConfirm('Hapus Dokumen', `Hapus dokumen "${d.name}"?`, 'Hapus', () => {
        const idx = state.documents.findIndex((x) => x.id === id);
        const removed = state.documents.splice(idx, 1)[0];
        save(); renderAll();
        toast(`Dokumen "${removed.name}" dihapus`, () => {
          state.documents.splice(idx, 0, removed);
          save(); renderAll();
        });
      });
    } else if (a === 'edit-insp') {
      const insp = state.inspections.find((x) => x.id === id); if (!insp) return;
      $('modal-insp-title').textContent = 'Edit item pemeriksaan';
      $('insp-id').value = insp.id;
      $('insp-title-input').value = insp.title;
      $('insp-sub-input').value = insp.sub || '';
      $('insp-status-input').value = insp.status || 'ok';
      openModal('modal-inspection');
    } else if (a === 'delete-insp') {
      const insp = state.inspections.find((x) => x.id === id); if (!insp) return;
      askConfirm('Hapus Pemeriksaan Fisik', `Hapus item "${insp.title}"?`, 'Hapus', () => {
        const idx = state.inspections.findIndex((x) => x.id === id);
        const removed = state.inspections.splice(idx, 1)[0];
        save(); renderChecklist();
        toast(`"${removed.title}" dihapus`, () => {
          state.inspections.splice(idx, 0, removed);
          save(); renderChecklist();
        });
      });
    }
  }

  // ---------------- Event Listeners ----------------
  function init() {
    setupFormattedNumericInputs();
    initGestures();

    // Welcome Modal Setup (UI/UX #1)
    // ---------------- Layar Awal (Onboarding / Akun Tersimpan / Mulai Baru) ----------------
    function switchWelcomeTab(tab) {
      const isSaved = tab === 'saved';
      const panelSaved = $('wpanel-saved');
      const panelNew = $('wpanel-new');
      const tabSaved = $('wtab-btn-saved');
      const tabNew = $('wtab-btn-new');

      if (panelSaved) panelSaved.style.display = isSaved ? 'block' : 'none';
      if (panelNew) panelNew.style.display = isSaved ? 'none' : 'block';
      if (tabSaved) tabSaved.classList.toggle('active', isSaved);
      if (tabNew) tabNew.classList.toggle('active', !isSaved);
    }

    function renderWelcomeScreen(preferTab) {
      const accs = loadAccounts();
      const hasAccounts = accs.length > 0;
      const tabsNav = $('welcome-tabs-nav');
      const subText = $('welcome-sub-text');
      const backBtn = $('btn-welcome-back-saved');
      const countEl = $('welcome-saved-count');

      if (countEl) countEl.textContent = accs.length;

      // Populate dropdown jenis & template
      populateTemplateSelects($('wl-type').value, $('wl-template'), null, false);
      const tpl = getTemplateById($('wl-template').value);
      if (tpl) $('wl-name').value = tpl.defaultName;
      if (!$('wl-year').value) $('wl-year').value = new Date().getFullYear();
      if (!getNumInput('wl-odo')) setNumInput('wl-odo', 10000);

      // Render daftar akun yang pernah tersimpan
      const listEl = $('saved-accounts-list');
      if (listEl) {
        if (!accs.length) {
          listEl.innerHTML = '<div style="padding:16px;text-align:center;font-size:12px;color:var(--text-3);">Belum ada akun yang tersimpan.</div>';
        } else {
          listEl.innerHTML = accs.map((a) => {
            const firstV = (a.store && a.store.vehicles && a.store.vehicles[0]) ? a.store.vehicles[0] : null;
            const vType = firstV ? firstV.profile.type : 'Kendaraan';
            const vName = firstV ? firstV.profile.name : 'Kendaraan';
            const vPlate = firstV ? firstV.profile.plateNumber : '';
            const vYear = firstV ? firstV.profile.year : '';
            const vOdo = firstV ? num(firstV.profile.currentOdo) + ' km' : '-';
            const vMeta = [vName, vPlate, vYear ? `(${vYear})` : ''].filter(Boolean).join(' · ');
            return `
              <div class="saved-acc-card">
                <div class="saved-acc-avatar">${vehicleIcon(vType)}</div>
                <div class="saved-acc-main">
                  <div class="saved-acc-name">${esc(a.name || vName)}</div>
                  <div class="saved-acc-meta">${esc(vMeta)}</div>
                  <div class="saved-acc-sub">Odometer: <b>${vOdo}</b></div>
                </div>
                <div class="saved-acc-actions">
                  <button type="button" class="btn-acc-enter" data-enter-acc="${esc(a.id)}">Masuk</button>
                  <button type="button" class="btn-acc-del" data-del-acc="${esc(a.id)}" title="Hapus akun dari perangkat">${ic('trash')}</button>
                </div>
              </div>
            `;
          }).join('');
        }
      }

      if (hasAccounts) {
        if (tabsNav) tabsNav.style.display = 'flex';
        if (backBtn) backBtn.style.display = 'inline-flex';
        if (subText) subText.textContent = 'Mulai dengan akun yang sudah ada atau buat akun baru.';
        switchWelcomeTab(preferTab || 'saved');
      } else {
        if (tabsNav) tabsNav.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none';
        if (subText) subText.textContent = 'Isi data kendaraan pertama Anda untuk memulai pemantauan.';
        switchWelcomeTab('new');
      }
    }

    function handleLogout() {
      const accs = loadAccounts();
      const activeId = getActiveAccountId();
      const currentAcc = accs.find((a) => a.id === activeId) || { name: 'Akun Anda' };

      askConfirm(
        'Keluar dari Akun',
        `Keluar dari akun "${currentAcc.name}"? Data kendaraan Anda tetap tersimpan dan dapat dibuka kembali kapan saja dari layar awal.`,
        'Keluar',
        () => {
          save();
          setActiveAccountId(null);
          isLoggedOut = true;
          renderWelcomeScreen('saved');
          openModal('modal-welcome');
          toast('Berhasil keluar dari akun');
        }
      );
    }

    $('wl-type').addEventListener('change', () => {
      populateTemplateSelects($('wl-type').value, $('wl-template'), null, false);
      const tpl = getTemplateById($('wl-template').value);
      if (tpl) $('wl-name').value = tpl.defaultName;
    });
    $('wl-template').addEventListener('change', () => {
      if ($('wl-template').value === '__create_custom__') {
        populateTemplateSelects($('wl-type').value, $('wl-template'), null, false);
        openCustomTemplateModal(null, false);
        return;
      }
      const tpl = getTemplateById($('wl-template').value);
      if (tpl) $('wl-name').value = tpl.defaultName;
    });

    $('form-welcome').addEventListener('submit', (e) => {
      e.preventDefault();
      const odo = getNumInput('wl-odo');
      const tplId = $('wl-template').value;
      const type = $('wl-type').value;
      const vehName = $('wl-name').value.trim() || 'Kendaraan Saya';
      const accName = ($('wl-acc-name') && $('wl-acc-name').value.trim()) ? $('wl-acc-name').value.trim() : vehName;
      const plate = $('wl-plate').value.trim().toUpperCase();
      const year = Number($('wl-year').value) || new Date().getFullYear();

      const v = normalizeVehicle({
        id: makeId('veh'),
        profile: {
          type: type,
          name: vehName,
          plateNumber: plate,
          year: year,
          currentOdo: odo,
          dailyKm: 30,
          lastOdoUpdate: today(),
          templateId: tplId !== 'none' ? tplId : '',
          odoReminder: { enabled: true, value: 1, unit: 'weeks' }
        },
        reminders: tplId !== 'none' ? buildRemindersFromTemplate(tplId, odo) : [],
        inspections: [
          { id: makeId('insp'), title: 'Tekanan angin & alur ban', sub: '', status: 'ok' },
          { id: makeId('insp'), title: 'Lampu utama, sein & rem', sub: '', status: 'ok' },
          { id: makeId('insp'), title: 'Minyak rem & tuas', sub: '', status: 'ok' }
        ],
        odoLog: [{ date: today(), odo }]
      });

      const newStore = {
        theme: (store && store.theme) ? store.theme : 'light',
        activeId: v.id,
        vehicles: [v],
        customTemplates: (store && store.customTemplates) ? store.customTemplates : [],
        welcomeSeen: true,
        updatedAt: new Date().toISOString()
      };

      const newAcc = {
        id: 'acc_' + Date.now().toString(36),
        name: accName,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        vehicleSummary: `${v.profile.name} · ${v.profile.plateNumber}`,
        store: newStore
      };

      const accs = loadAccounts();
      accs.push(newAcc);
      saveAccounts(accs);
      setActiveAccountId(newAcc.id);

      store = newStore;
      state = v;
      save();
      renderAll();
      closeModal('modal-welcome');
      toast(`Selamat datang! ${v.profile.name} siap dipantau.`);
    });

    $('btn-welcome-sample').addEventListener('click', () => {
      const sampleV = normalizeVehicle(createSampleVehicle());
      const newStore = {
        theme: (store && store.theme) ? store.theme : 'light',
        activeId: sampleV.id,
        vehicles: [sampleV],
        customTemplates: (store && store.customTemplates) ? store.customTemplates : [],
        welcomeSeen: true,
        updatedAt: new Date().toISOString()
      };
      const sampleAcc = {
        id: 'acc_' + Date.now().toString(36),
        name: 'Data Contoh (Vario 160)',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        vehicleSummary: `${sampleV.profile.name} · ${sampleV.profile.plateNumber}`,
        store: newStore
      };
      const accs = loadAccounts();
      accs.push(sampleAcc);
      saveAccounts(accs);
      setActiveAccountId(sampleAcc.id);

      store = newStore;
      state = sampleV;
      save();
      renderAll();
      closeModal('modal-welcome');
      toast('Menggunakan data contoh');
    });

    // Welcome Screen Navigation Buttons
    if ($('wtab-btn-saved')) $('wtab-btn-saved').addEventListener('click', () => switchWelcomeTab('saved'));
    if ($('wtab-btn-new')) $('wtab-btn-new').addEventListener('click', () => switchWelcomeTab('new'));
    if ($('btn-welcome-goto-new')) $('btn-welcome-goto-new').addEventListener('click', () => switchWelcomeTab('new'));
    if ($('btn-welcome-back-saved')) $('btn-welcome-back-saved').addEventListener('click', () => switchWelcomeTab('saved'));

    // Delegasi Aksi Akun Tersimpan (Masuk / Hapus)
    const savedListEl = $('saved-accounts-list');
    if (savedListEl) {
      savedListEl.addEventListener('click', (e) => {
        const enterBtn = e.target.closest('[data-enter-acc]');
        if (enterBtn) {
          const accId = enterBtn.dataset.enterAcc;
          const accs = loadAccounts();
          const targetAcc = accs.find((a) => a.id === accId);
          if (!targetAcc) return;
          setActiveAccountId(accId);
          store = targetAcc.store;
          store.vehicles.forEach(normalizeVehicle);
          state = getActive();
          closeModal('modal-welcome');
          renderAll();
          toast(`Masuk sebagai ${targetAcc.name}`);
          return;
        }

        const delBtn = e.target.closest('[data-del-acc]');
        if (delBtn) {
          const accId = delBtn.dataset.delAcc;
          const accs = loadAccounts();
          const targetAcc = accs.find((a) => a.id === accId);
          if (!targetAcc) return;
          askConfirm(
            'Hapus Akun',
            `Hapus akun "${targetAcc.name}" beserta datanya dari perangkat ini? Tindakan ini tidak dapat dibatalkan.`,
            'Hapus Akun',
            () => {
              const remaining = accs.filter((a) => a.id !== accId);
              saveAccounts(remaining);
              if (getActiveAccountId() === accId) {
                setActiveAccountId(null);
              }
              renderWelcomeScreen('saved');
              toast(`Akun "${targetAcc.name}" telah dihapus.`);
            }
          );
          return;
        }
      });
    }

    $('btn-open-welcome').addEventListener('click', () => {
      renderWelcomeScreen('saved');
      openModal('modal-welcome');
    });

    if (isBrandNewUser || isLoggedOut) {
      renderWelcomeScreen(isLoggedOut ? 'saved' : 'new');
      openModal('modal-welcome');
    }

    // Confirm Modal Buttons
    $('confirm-cancel').addEventListener('click', () => { confirmCallback = null; closeModal('modal-confirm'); });
    $('confirm-ok').addEventListener('click', () => {
      const cb = confirmCallback;
      confirmCallback = null;
      closeModal('modal-confirm');
      if (typeof cb === 'function') cb();
    });

    // Item Detail Modal Actions
    $('item-actions').addEventListener('click', (e) => {
      const b = e.target.closest('[data-item-act]');
      if (!b) return;
      closeModal('modal-item');
      handleDataAction(b.dataset.itemAct, b.dataset.id);
    });

    // Navigasi Bawah & Shortcut Strip
    document.querySelectorAll('.nav-tab').forEach((b) => b.addEventListener('click', () => switchTab(b.dataset.target)));
    $('strip-urgent-btn').addEventListener('click', () => switchTab('tab-checklist'));
    $('strip-doc-btn').addEventListener('click', () => switchTab('tab-dokumen'));
    $('strip-cost-btn').addEventListener('click', () => switchTab('tab-riwayat'));

    // Tema (Toggle di Profil)
    $('input-dark-mode').addEventListener('change', (e) => {
      store.theme = e.target.checked ? 'dark' : 'light';
      save(); applyTheme();
    });

    // Tentang
    document.querySelectorAll('[data-open-about]').forEach((b) => b.addEventListener('click', () => openModal('modal-about')));
    $('btn-about-profile').addEventListener('click', () => openModal('modal-about'));

    // Modal Close
    document.querySelectorAll('[data-close-modal]').forEach((b) => b.addEventListener('click', () => closeModal(b.dataset.closeModal)));
    document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.addEventListener('click', (e) => {
      if (e.target === bd && !bd.hasAttribute('data-static')) closeModal(bd.id);
    }));

    // ---- Multi-Kendaraan & Template ----
    $('header-vehicle-trigger').addEventListener('click', () => { renderVehicleList(); openModal('modal-vehicles'); });
    $('vehicle-list').addEventListener('click', (e) => {
      const b = e.target.closest('[data-switch-vehicle]');
      if (!b) return;
      store.activeId = b.dataset.switchVehicle;
      state = getActive();
      reminderFilter = 'all';
      document.querySelectorAll('#tab-ringkasan .filter-pill').forEach((p) => p.classList.toggle('active', p.dataset.cat === 'all'));
      save(); renderAll(); closeModal('modal-vehicles');
      toast(`Beralih ke ${state.profile.name}`);
    });
    $('btn-add-vehicle').addEventListener('click', () => {
      $('form-add-vehicle').reset();
      $('nv-year').value = new Date().getFullYear();
      setNumInput('nv-odo', 0);
      populateTemplateSelects($('nv-type').value, $('nv-template'), null, false);
      const tpl = getTemplateById($('nv-template').value);
      if (tpl) $('nv-name').value = tpl.defaultName;
      closeModal('modal-vehicles');
      openModal('modal-add-vehicle');
    });
    $('nv-type').addEventListener('change', () => {
      populateTemplateSelects($('nv-type').value, $('nv-template'), null, false);
      const tpl = getTemplateById($('nv-template').value);
      if (tpl) $('nv-name').value = tpl.defaultName;
    });
    $('nv-template').addEventListener('change', () => {
      if ($('nv-template').value === '__create_custom__') {
        populateTemplateSelects($('nv-type').value, $('nv-template'), null, false);
        openCustomTemplateModal(null, false);
        return;
      }
      const tpl = getTemplateById($('nv-template').value);
      if (tpl) $('nv-name').value = tpl.defaultName;
    });
    $('form-add-vehicle').addEventListener('submit', (e) => {
      e.preventDefault();
      const odo = getNumInput('nv-odo');
      const tplId = $('nv-template').value;
      const v = normalizeVehicle({
        id: makeId('veh'),
        profile: {
          type: $('nv-type').value, name: $('nv-name').value.trim(),
          plateNumber: $('nv-plate').value.trim().toUpperCase(), year: Number($('nv-year').value),
          currentOdo: odo, dailyKm: 30, lastOdoUpdate: today(),
          templateId: tplId !== 'none' ? tplId : '',
          odoReminder: { enabled: true, value: 1, unit: 'weeks' }
        },
        reminders: tplId !== 'none' ? buildRemindersFromTemplate(tplId, odo) : [],
        inspections: [
          { id: makeId('insp'), title: 'Tekanan angin & alur ban', sub: '', status: 'ok' },
          { id: makeId('insp'), title: 'Lampu utama, sein & rem', sub: '', status: 'ok' },
          { id: makeId('insp'), title: 'Minyak rem & tuas', sub: '', status: 'ok' }
        ],
        odoLog: [{ date: today(), odo }]
      });
      store.vehicles.push(v);
      store.activeId = v.id;
      state = v;
      save(); renderAll(); closeModal('modal-add-vehicle');
      toast(`${v.profile.name} ditambahkan`);
    });
    $('btn-delete-vehicle').addEventListener('click', () => {
      if (store.vehicles.length <= 1) return;
      askConfirm('Hapus Kendaraan', `Hapus kendaraan "${state.profile.name}" beserta seluruh datanya?`, 'Hapus', () => {
        const removed = state;
        store.vehicles = store.vehicles.filter((v) => v.id !== store.activeId);
        store.activeId = store.vehicles[0].id;
        state = getActive();
        save(); renderAll();
        toast(`"${removed.profile.name}" dihapus`, () => {
          store.vehicles.push(removed);
          store.activeId = removed.id;
          state = removed;
          save(); renderAll();
        });
      });
    });

    // ---- Template Perawatan & Custom Template di Profil ----
    $('apply-template-select').addEventListener('change', () => {
      if ($('apply-template-select').value === '__create_custom__') {
        populateTemplateSelects(null, $('apply-template-select'), state.profile.templateId || 'vario-pcx', true);
        renderTemplatePreview();
        openCustomTemplateModal(null, false);
        return;
      }
      renderTemplatePreview();
    });

    $('btn-apply-template').addEventListener('click', () => {
      const tplId = $('apply-template-select').value;
      if (!tplId || tplId === '__create_custom__') return;

      const replaceMode = $('chk-replace-template').checked;
      const updateVName = $('chk-update-vname').checked;

      const prevReminders = JSON.parse(JSON.stringify(state.reminders));
      const prevName = state.profile.name;
      const prevType = state.profile.type;
      const prevTplId = state.profile.templateId || '';

      if (tplId === 'none') {
        if (!replaceMode) {
          toast('Centang opsi "Ganti daftar pengingat" jika ingin mengosongkan');
          return;
        }
        state.reminders = [];
        state.profile.templateId = 'none';
        save(); renderAll();
        toast('Daftar pengingat dikosongkan', () => {
          state.reminders = prevReminders;
          state.profile.templateId = prevTplId;
          save(); renderAll();
        });
        return;
      }

      const tpl = getTemplateById(tplId);
      if (!tpl) return;

      const newItems = buildRemindersFromTemplate(tplId, state.profile.currentOdo);

      if (replaceMode) {
        state.reminders = newItems;
      } else {
        const existingNames = new Set(state.reminders.map((r) => r.name.toLowerCase()));
        newItems.forEach((it) => {
          if (!existingNames.has(it.name.toLowerCase())) {
            state.reminders.push(it);
          }
        });
      }

      state.profile.templateId = tpl.id;
      if (updateVName) {
        state.profile.name = tpl.defaultName || tpl.label;
        state.profile.type = tpl.type || state.profile.type;
      }

      save();
      renderAll();
      $('apply-template-select').value = tpl.id;
      renderTemplatePreview();

      toast(`Template "${tpl.defaultName || tpl.label}" diterapkan (${state.reminders.length} item)`, () => {
        state.reminders = prevReminders;
        state.profile.name = prevName;
        state.profile.type = prevType;
        state.profile.templateId = prevTplId;
        save(); renderAll();
      });
    });

    $('btn-new-custom-tpl').addEventListener('click', () => openCustomTemplateModal(null, false));
    $('btn-save-current-as-tpl').addEventListener('click', () => openCustomTemplateModal(null, true));
    $('btn-edit-custom-tpl').addEventListener('click', () => {
      const tpl = getTemplateById($('apply-template-select').value);
      if (tpl && String(tpl.id).startsWith('ctpl-')) {
        openCustomTemplateModal(tpl, false);
      }
    });
    $('btn-del-custom-tpl').addEventListener('click', () => {
      const tpl = getTemplateById($('apply-template-select').value);
      if (!tpl || !String(tpl.id).startsWith('ctpl-')) return;
      askConfirm('Hapus Template Kustom', `Hapus template kustom "${tpl.label}"?`, 'Hapus', () => {
        store.customTemplates = getCustomTemplates().filter((m) => m.id !== tpl.id);
        if (state.profile.templateId === tpl.id) state.profile.templateId = 'vario-pcx';
        save(); renderAll();
        toast(`Template "${tpl.label}" dihapus`, () => {
          store.customTemplates = store.customTemplates || [];
          store.customTemplates.push(tpl);
          state.profile.templateId = tpl.id;
          save(); renderAll();
        });
      });
    });

    $('btn-ctpl-add-row').addEventListener('click', () => {
      $('ctpl-items-list').insertAdjacentHTML('beforeend', createCustomTplRowHTML());
      updateCtplCount();
    });

    $('ctpl-items-list').addEventListener('click', (e) => {
      const delBtn = e.target.closest('[data-ctpl-del]');
      if (!delBtn) return;
      const rows = document.querySelectorAll('#ctpl-items-list [data-ctpl-row]');
      if (rows.length <= 1) {
        toast('Minimal satu item perawatan dalam template');
        return;
      }
      delBtn.closest('[data-ctpl-row]').remove();
      updateCtplCount();
    });

    $('form-custom-template').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('ctpl-id').value || makeId('ctpl');
      const name = $('ctpl-name').value.trim() || 'Template Kustom';
      const type = $('ctpl-type').value;
      const rows = [...document.querySelectorAll('#ctpl-items-list [data-ctpl-row]')];
      const items = rows.map((row) => ({
        category: row.querySelector('[data-ctpl-field="category"]').value,
        name: row.querySelector('[data-ctpl-field="name"]').value.trim(),
        intervalKm: Math.max(100, Number(row.querySelector('[data-ctpl-field="intervalKm"]').value) || 3000),
        intervalMonths: Math.max(0.5, Number(row.querySelector('[data-ctpl-field="intervalMonths"]').value) || 3),
        estCost: Math.max(0, Number(row.querySelector('[data-ctpl-field="estCost"]').value) || 0),
        notes: ''
      })).filter((it) => it.name);

      if (!items.length) {
        toast('Tambahkan minimal 1 item perawatan');
        return;
      }

      const tplObj = { id, label: name, defaultName: name, type, items };
      store.customTemplates = store.customTemplates || [];
      const idx = store.customTemplates.findIndex((m) => m.id === id);
      if (idx >= 0) store.customTemplates[idx] = tplObj;
      else store.customTemplates.push(tplObj);

      // Langsung terapkan ke kendaraan aktif
      state.profile.templateId = id;
      state.profile.name = name;
      state.profile.type = type;
      state.reminders = buildRemindersFromTemplate(id, state.profile.currentOdo);

      save();
      renderAll();
      $('apply-template-select').value = id;
      renderTemplatePreview();
      closeModal('modal-custom-template');
      toast(`Template kustom "${name}" disimpan & diterapkan!`);
    });

    // ---- Odometer ----
    function openOdo() { setNumInput('modal-input-odo', state.profile.currentOdo); openModal('modal-odo'); }
    $('btn-open-odo-modal').addEventListener('click', openOdo);
    $('btn-log-odo').addEventListener('click', openOdo);
    document.querySelectorAll('[data-add-km]').forEach((c) => c.addEventListener('click', () => {
      setNumInput('modal-input-odo', getNumInput('modal-input-odo') + Number(c.dataset.addKm));
    }));
    $('form-update-odo').addEventListener('submit', (e) => {
      e.preventDefault();
      const v = getNumInput('modal-input-odo');
      if (v < state.profile.currentOdo) { toast('Odometer tidak boleh lebih kecil dari sebelumnya'); return; }
      setOdometer(v, today());
      save(); renderAll(); closeModal('modal-odo');
      toast(`Odometer diperbarui: ${num(v)} km`);
    });
    $('btn-apply-avg').addEventListener('click', () => {
      const st = computeStats();
      if (st.avg == null) return;
      state.profile.dailyKm = Math.max(1, Math.round(st.avg));
      save(); renderAll();
      toast(`Prediksi memakai ${state.profile.dailyKm} km/hari`);
    });

    // ---- Filter & Pengingat ----
    document.querySelectorAll('#tab-ringkasan .filter-pill').forEach((p) => p.addEventListener('click', () => {
      reminderFilter = p.dataset.cat;
      document.querySelectorAll('#tab-ringkasan .filter-pill').forEach((x) => x.classList.toggle('active', x === p));
      renderRingkasan();
    }));
    $('btn-add-reminder').addEventListener('click', () => {
      $('modal-reminder-title').textContent = 'Tambah pengingat';
      $('form-reminder').reset();
      $('rem-id').value = '';
      $('rem-category').value = reminderFilter === 'all' ? 'oli' : reminderFilter;
      setNumInput('rem-interval-km', 3000);
      $('rem-interval-months').value = 3;
      setNumInput('rem-last-odo', state.profile.currentOdo);
      $('rem-last-date').value = today();
      setNumInput('rem-est-cost', 75000);
      openModal('modal-reminder');
    });
    $('form-reminder').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('rem-id').value;
      const payload = {
        id: id || makeId('rem'),
        category: $('rem-category').value,
        name: $('rem-name').value.trim(),
        intervalKm: Math.max(100, getNumInput('rem-interval-km') || 2000),
        intervalMonths: Math.max(0.5, Number($('rem-interval-months').value) || 1),
        lastOdo: getNumInput('rem-last-odo'),
        lastDate: $('rem-last-date').value || today(),
        estCost: getNumInput('rem-est-cost'),
        notes: $('rem-notes').value.trim()
      };
      const i = state.reminders.findIndex((r) => r.id === id);
      if (i >= 0) state.reminders[i] = payload; else state.reminders.push(payload);
      save(); renderAll(); closeModal('modal-reminder');
      toast(i >= 0 ? 'Pengingat diperbarui' : 'Pengingat ditambahkan');
    });

    // Delegated Clicks inside #app-content
    $('app-content').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (btn) {
        e.stopPropagation();
        handleDataAction(btn.dataset.action, btn.dataset.id);
        return;
      }
      const insp = e.target.closest('[data-insp-id]');
      if (insp) {
        const it = state.inspections.find((x) => x.id === insp.dataset.inspId);
        if (it) { it.status = insp.dataset.inspVal; save(); renderChecklist(); }
        return;
      }
      const row = e.target.closest('[data-open-item]');
      if (row) {
        const wrap = row.closest('[data-swipe-row]');
        if (wrap && wrap.classList.contains('swiped')) {
          wrap.classList.remove('swiped');
          return;
        }
        openItemDetail(row.dataset.openItem, row.dataset.id);
      }
    });

    // Selesai Servis Submit
    $('form-complete-service').addEventListener('submit', (e) => {
      e.preventDefault();
      const r = state.reminders.find((x) => x.id === $('comp-rem-id').value);
      if (!r) return;
      const odo = getNumInput('comp-odo') || state.profile.currentOdo;
      const date = $('comp-date').value || today();
      const cost = getNumInput('comp-cost');
      r.lastOdo = odo; r.lastDate = date;
      if (cost > 0) r.estCost = cost;
      if (odo > state.profile.currentOdo) setOdometer(odo, date); else recordOdo(odo, date);
      state.expenses.push({ id: makeId('exp'), title: r.name, category: r.category, cost, date, odo, note: $('comp-note').value.trim() });
      state.selectedChecklistIds = state.selectedChecklistIds.filter((x) => x !== r.id);
      save(); renderAll(); closeModal('modal-complete-service');
      toast(`"${r.name}" tercatat di riwayat`);
    });

    // ---- Cek Part ----
    $('chk-show-all-parts').addEventListener('change', (e) => { showAllParts = e.target.checked; renderChecklist(); });
    $('due-checklist-container').addEventListener('change', (e) => {
      const c = e.target.closest('[data-check-part]'); if (!c) return;
      const set = new Set(state.selectedChecklistIds);
      c.checked ? set.add(c.dataset.checkPart) : set.delete(c.dataset.checkPart);
      state.selectedChecklistIds = Array.from(set);
      save(); renderChecklist();
    });
    $('btn-select-all-due').addEventListener('click', () => {
      const list = evaluated();
      const vis = showAllParts ? list : list.filter((r) => r.status !== 'good');
      const all = vis.every((p) => state.selectedChecklistIds.includes(p.id));
      state.selectedChecklistIds = all ? [] : vis.map((p) => p.id);
      save(); renderChecklist();
    });
    $('btn-complete-checked').addEventListener('click', () => {
      const ids = state.selectedChecklistIds.slice();
      if (!ids.length) return;
      const t = today(), odo = state.profile.currentOdo;
      let n = 0;
      ids.forEach((id) => {
        const r = state.reminders.find((x) => x.id === id);
        if (!r) return;
        r.lastOdo = odo; r.lastDate = t;
        state.expenses.push({ id: makeId('exp'), title: r.name, category: r.category, cost: Number(r.estCost) || 0, date: t, odo, note: 'Dari daftar Cek Part' });
        n++;
      });
      state.selectedChecklistIds = [];
      save(); renderAll(); toast(`${n} part selesai diservis`);
    });
    $('btn-add-inspection').addEventListener('click', () => {
      $('modal-insp-title').textContent = 'Tambah item pemeriksaan';
      $('form-inspection').reset();
      $('insp-id').value = '';
      $('insp-status-input').value = 'ok';
      openModal('modal-inspection');
    });
    $('form-inspection').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('insp-id').value;
      const payload = {
        id: id || makeId('insp'),
        title: $('insp-title-input').value.trim(),
        sub: $('insp-sub-input').value.trim(),
        status: $('insp-status-input').value || 'ok'
      };
      const idx = state.inspections.findIndex((x) => x.id === id);
      if (idx >= 0) state.inspections[idx] = payload;
      else state.inspections.push(payload);
      save(); renderChecklist(); closeModal('modal-inspection');
      toast(idx >= 0 ? 'Item pemeriksaan diperbarui' : 'Item pemeriksaan ditambahkan');
    });

    // ---- Riwayat, Filter Pencarian & Tahunan ----
    document.querySelectorAll('.seg').forEach((s) => s.addEventListener('click', () => { riwayatView = s.dataset.seg; renderRiwayat(); }));

    $('input-search').addEventListener('input', (e) => { searchQuery = e.target.value.trim(); renderSearch(); });
    $('btn-clear-search').addEventListener('click', () => { searchQuery = ''; $('input-search').value = ''; renderSearch(); $('input-search').focus(); });
    $('btn-filter-toggle').addEventListener('click', () => {
      $('filter-panel').hidden = !$('filter-panel').hidden;
      renderSearch();
    });
    document.querySelectorAll('[data-scat]').forEach((p) => p.addEventListener('click', () => {
      searchCat = p.dataset.scat;
      document.querySelectorAll('[data-scat]').forEach((x) => x.classList.toggle('active', x === p));
      renderSearch();
    }));
    $('search-range').addEventListener('change', (e) => { searchRange = e.target.value; renderSearch(); });
    $('search-sort').addEventListener('change', (e) => { searchSort = e.target.value; renderSearch(); });
    $('btn-reset-filter').addEventListener('click', () => {
      searchQuery = ''; searchCat = 'all'; searchRange = 'all'; searchSort = 'new';
      $('input-search').value = '';
      $('search-range').value = 'all';
      $('search-sort').value = 'new';
      document.querySelectorAll('[data-scat]').forEach((x) => x.classList.toggle('active', x.dataset.scat === 'all'));
      $('filter-panel').hidden = true;
      renderSearch();
    });

    const shift = (n) => { const d = new Date(viewY, viewM + n, 1); viewY = d.getFullYear(); viewM = d.getMonth(); renderPerawatan(); };
    $('btn-prev-month').addEventListener('click', () => shift(-1));
    $('btn-next-month').addEventListener('click', () => shift(1));
    $('expense-month-badge').addEventListener('click', () => { const n = parseISO(today()); viewY = n.getFullYear(); viewM = n.getMonth(); renderPerawatan(); });

    $('btn-prev-year').addEventListener('click', () => { reportYear--; renderTahunanView(); });
    $('btn-next-year').addEventListener('click', () => { reportYear++; renderTahunanView(); });

    $('btn-add-expense').addEventListener('click', () => {
      $('modal-expense-title').textContent = 'Catat riwayat';
      $('form-expense').reset();
      $('exp-id').value = '';
      const n = parseISO(today());
      $('exp-date').value = viewY === n.getFullYear() && viewM === n.getMonth() ? today() : fmtISO(new Date(viewY, viewM, 15));
      setNumInput('exp-odo', state.profile.currentOdo);
      openModal('modal-expense');
    });
    $('form-expense').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('exp-id').value;
      const date = $('exp-date').value || today();
      const payload = {
        id: id || makeId('exp'), title: $('exp-title').value.trim(), category: $('exp-category').value,
        cost: getNumInput('exp-cost'), date,
        odo: getNumInput('exp-odo') || state.profile.currentOdo, note: $('exp-note').value.trim()
      };
      const i = state.expenses.findIndex((x) => x.id === id);
      if (i >= 0) state.expenses[i] = payload; else state.expenses.push(payload);
      const d = parseISO(date); viewY = d.getFullYear(); viewM = d.getMonth();
      save(); renderAll(); closeModal('modal-expense');
      toast('Riwayat disimpan');
    });

    // ---- Dokumen ----
    $('btn-add-doc').addEventListener('click', () => {
      $('modal-doc-title').textContent = 'Tambah dokumen';
      $('form-doc').reset();
      $('doc-id').value = '';
      $('doc-remind-days').value = 30;
      $('doc-expiry').value = addMonths(today(), 12);
      openModal('modal-doc');
    });
    $('doc-type').addEventListener('change', () => {
      if (!$('doc-id').value) $('doc-name').value = $('doc-type').selectedOptions[0].textContent;
    });
    $('form-doc').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('doc-id').value;
      const payload = {
        id: id || makeId('doc'), type: $('doc-type').value, name: $('doc-name').value.trim(),
        expiry: $('doc-expiry').value, remindDays: Math.max(1, Number($('doc-remind-days').value) || 30), notes: $('doc-notes').value.trim()
      };
      const i = state.documents.findIndex((x) => x.id === id);
      if (i >= 0) state.documents[i] = payload; else state.documents.push(payload);
      save(); renderAll(); closeModal('modal-doc');
      toast('Dokumen disimpan');
    });

    // ---- Profil ----
    $('form-profile').addEventListener('submit', (e) => {
      e.preventDefault();
      const odo = getNumInput('input-current-odo');
      const p = state.profile;
      p.type = $('input-vehicle-type').value;
      p.name = $('input-vehicle-name').value.trim() || 'Kendaraan';
      p.plateNumber = $('input-plate-number').value.trim().toUpperCase();
      p.year = Number($('input-vehicle-year').value) || p.year;
      p.dailyKm = Math.max(1, Number($('input-daily-km').value) || 30);
      if (odo !== p.currentOdo) setOdometer(odo, today());
      save(); renderAll(); toast('Profil disimpan');
    });
    $('input-odo-rem-enabled').addEventListener('change', (e) => {
      state.profile.odoReminder.enabled = e.target.checked;
      save(); renderAll();
    });
    document.querySelectorAll('[data-odo-preset]').forEach((c) => c.addEventListener('click', () => {
      const [v, u] = c.dataset.odoPreset.split('-');
      $('input-odo-rem-val').value = v; $('input-odo-rem-unit').value = u;
      state.profile.odoReminder = { enabled: $('input-odo-rem-enabled').checked, value: Number(v), unit: u };
      save(); renderAll();
    }));
    $('btn-save-odo-rem').addEventListener('click', () => {
      state.profile.odoReminder = {
        enabled: $('input-odo-rem-enabled').checked,
        value: Math.max(1, Number($('input-odo-rem-val').value) || 1),
        unit: $('input-odo-rem-unit').value
      };
      save(); renderAll(); toast('Jadwal pengingat disimpan');
    });

    // ---- Sinkronisasi Antar Perangkat ----
    $('btn-sync-new').addEventListener('click', async () => {
      try {
        syncFileHandle = await window.showSaveFilePicker({
          suggestedName: 'servis-in-sync.json',
          types: [{ description: 'JSON Sync File', accept: { 'application/json': ['.json'] } }]
        });
        await writeToSyncFile();
        updateSyncStatusUI();
        toast('File sinkron berhasil dibuat & dihubungkan');
      } catch (e) { /* dibatalkan */ }
    });
    $('btn-sync-pick').addEventListener('click', async () => {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{ description: 'JSON Sync File', accept: { 'application/json': ['.json'] } }]
        });
        syncFileHandle = handle;
        await readFromSyncFile();
        updateSyncStatusUI();
      } catch (e) { /* dibatalkan */ }
    });
    $('btn-sync-now').addEventListener('click', async () => {
      try {
        await readFromSyncFile();
      } catch (e) {
        toast('Gagal mengakses file sinkron');
      }
    });
    $('btn-sync-off').addEventListener('click', () => {
      syncFileHandle = null;
      updateSyncStatusUI();
      toast('File sinkron diputuskan');
    });

    $('btn-code-copy').addEventListener('click', async () => {
      try {
        const code = encodeSyncCode();
        await navigator.clipboard.writeText(code);
        toast('Kode sinkron disalin ke clipboard');
      } catch (e) {
        $('code-input').value = encodeSyncCode();
        openModal('modal-code');
      }
    });
    $('btn-code-paste').addEventListener('click', () => {
      $('code-input').value = '';
      openModal('modal-code');
    });
    $('btn-code-apply').addEventListener('click', () => {
      try {
        const importedStore = decodeSyncCode($('code-input').value);
        importedStore.vehicles.forEach(normalizeVehicle);
        if (!importedStore.vehicles.some((v) => v.id === importedStore.activeId)) {
          importedStore.activeId = importedStore.vehicles[0].id;
        }
        store = importedStore;
        state = getActive();
        save(); renderAll(); closeModal('modal-code');
        toast('Data dari kode sinkron berhasil diterapkan');
      } catch (e) {
        toast('Kode sinkron tidak valid');
      }
    });
    $('btn-share-backup').addEventListener('click', async () => {
      try {
        const json = JSON.stringify({ app: 'servis.in', version: 4, exportedAt: new Date().toISOString(), store }, null, 2);
        const file = new File([json], `servis-in-backup-${today()}.json`, { type: 'application/json' });
        await navigator.share({ title: 'Backup Servis.In', files: [file] });
      } catch (e) { /* dibatalkan */ }
    });

    // ---- Backup, Restore & Reset ----
    $('btn-export-json').addEventListener('click', () => {
      const data = { app: 'servis.in', version: 4, exportedAt: new Date().toISOString(), store };
      download(`servis-in-backup-${today()}.json`, JSON.stringify(data, null, 2), 'application/json');
      toast('Backup berhasil diunduh');
    });
    $('btn-import-json').addEventListener('click', () => $('input-import-file').click());
    $('input-import-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          const s = data && data.app === 'servis.in' ? data.store : null;
          if (!s || !Array.isArray(s.vehicles) || !s.vehicles.length) throw new Error('format');
          askConfirm('Pulihkan Data Backup', `Pulihkan ${s.vehicles.length} kendaraan dari file backup? Data saat ini akan diganti.`, 'Pulihkan', () => {
            s.vehicles.forEach(normalizeVehicle);
            if (!s.vehicles.some((v) => v.id === s.activeId)) s.activeId = s.vehicles[0].id;
            s.theme = s.theme === 'dark' ? 'dark' : 'light';
            store = s; state = getActive();
            save(); renderAll(); toast('Data berhasil dipulihkan');
          });
        } catch (err) {
          toast('File backup tidak valid');
        }
      };
      reader.readAsText(file);
    });
    $('btn-export-csv').addEventListener('click', () => {
      const q = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
      const rows = [['Kendaraan', 'Tanggal', 'Kategori', 'Perawatan', 'Biaya', 'Odometer', 'Catatan'].map(q).join(',')];
      store.vehicles.forEach((v) => {
        v.expenses.slice().sort((a, b) => a.date.localeCompare(b.date)).forEach((x) => {
          rows.push([v.profile.name, x.date, (CAT[x.category] || CAT.lainnya).label, x.title, x.cost, x.odo || '', x.note || ''].map(q).join(','));
        });
      });
      download(`servis-in-riwayat-${today()}.csv`, '\ufeff' + rows.join('\r\n'), 'text/csv;charset=utf-8');
      toast('Riwayat diekspor (CSV)');
    });

    $('btn-reset-data').addEventListener('click', () => {
      askConfirm('Reset ke Data Contoh', 'Reset semua kendaraan dan data ke contoh awal?', 'Reset', () => {
        const v = normalizeVehicle(createSampleVehicle());
        store = { theme: store.theme, activeId: v.id, vehicles: [v] };
        state = v;
        save(); renderAll(); toast('Data direset ke contoh awal');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => { init(); renderAll(); });
})();
