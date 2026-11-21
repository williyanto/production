// ============================================================================
// SERVIS.IN WEB — SINGLE-SCREEN MULTI-TAB APP LOGIC
// ============================================================================

const STORAGE_KEY = 'servisin_web_state_v4';

const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// ============================================================================
// PEMISAH TITIK RIBUAN OTOMATIS (1.000 | 10.000 | 100.000 | Rp 75.000)
// ============================================================================
function formatNumber(num) {
  const n = Math.round(Number(num) || 0);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseFormattedNumber(val) {
  if (typeof val === 'number') return Math.round(val);
  const cleaned = String(val || '').replace(/\D/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}

function formatThousandInput(inputEl) {
  if (!inputEl) return;
  const rawDigits = String(inputEl.value || '').replace(/\D/g, '');
  if (!rawDigits) {
    inputEl.value = '';
    return;
  }
  const num = parseInt(rawDigits, 10);
  inputEl.value = formatNumber(num);
}

function formatKm(km) {
  return `${formatNumber(km)} km`;
}

function formatRupiah(amount) {
  return `Rp ${formatNumber(amount)}`;
}

function formatDurationMonths(days) {
  if (!days || days <= 0) return '-';
  if (days % 365 === 0) return `${days / 365} Tahun (${days} hari)`;
  if (days % 30 === 0) return `${days / 30} Bulan (${days} hari)`;
  return `${days} Hari`;
}

function formatDurationShort(days) {
  if (!days || days <= 0) return '-';
  if (days % 365 === 0) return `${days / 365} thn`;
  if (days % 30 === 0) return `${days / 30} bln`;
  return `${days} hr`;
}

function formatDateShort(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateDayMonth(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'long' });
}

function daysBetween(date1, date2) {
  const c1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const c2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.round((c2 - c1) / (1000 * 60 * 60 * 24));
}

// ============================================================================
// INITIAL DATA (Semua item memiliki patokan KM DAN patokan Bulan/Hari)
// ============================================================================
function createInitialState() {
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth();

  const makeDate = (year, month, day) => new Date(year, month, day, 10, 0, 0).toISOString();
  const daysAgo = (n) => new Date(now.getTime() - n * 86400000).toISOString();

  const v1Id = 'veh-vario-160';
  const v2Id = 'veh-nmax-155';

  return {
    activeTab: 'home',
    activeMotorSubTab: 'kendaraan',
    activeVehicleId: v1Id,
    homeFilter: 'Semua',
    homeSearchQuery: '',
    heroExpanded: false,
    historyViewYear: curYear,
    historyViewMonth: curMonth,
    settings: {
      darkMode: false,
      isNotificationEnabled: true,
      reminderDaysBefore: 7,
      nearDueKmThreshold: 300,
    },
    vehicles: [
      {
        id: v1Id,
        name: 'Honda Vario 160',
        plateNumber: 'B 4123 ABC',
        currentOdo: 12750,
        vehicleType: 'Matic',
        taxDueDate: new Date(now.getTime() + 42 * 86400000).toISOString().slice(0, 10),
        lastOdoUpdate: now.toISOString(),
      },
      {
        id: v2Id,
        name: 'Yamaha NMAX 155',
        plateNumber: 'D 8821 KLP',
        currentOdo: 24100,
        vehicleType: 'Matic',
        taxDueDate: new Date(now.getTime() + 180 * 86400000).toISOString().slice(0, 10),
        lastOdoUpdate: daysAgo(4),
      }
    ],
    serviceItems: [
      {
        id: 'item-1',
        vehicleId: v1Id,
        title: 'Ganti Oli Mesin',
        category: 'Oli & Cairan',
        intervalKm: 2000,
        intervalDays: 90, // 3 bulan
        lastServiceDate: daysAgo(94), // Sudah lewat 4 hari dari 3 bulan walau KM belum 2.000 km!
        lastServiceKm: 11200,
        estimatedCost: 75000,
        partCode: '08232-2MB-K0LN1',
        notes: 'Ganti tiap 2.000 km atau 3 bulan (mana yang lebih dulu)',
      },
      {
        id: 'item-2',
        vehicleId: v1Id,
        title: 'Servis CVT & Bersihkan',
        category: 'CVT & Transmisi',
        intervalKm: 6000,
        intervalDays: 120, // 4 bulan
        lastServiceDate: daysAgo(115), // Tinggal 5 hari lagi menuju 4 bulan
        lastServiceKm: 7000, // Sisa 250 km menuju 13.000 km
        estimatedCost: 55000,
        partCode: '22100-K1Z-N21',
        notes: 'Pembersihan debu CVT & gemuk tiap 6.000 km atau 4 bulan',
      },
      {
        id: 'item-3',
        vehicleId: v1Id,
        title: 'Ganti Oli Gardan (Transmisi)',
        category: 'Oli & Cairan',
        intervalKm: 6000,
        intervalDays: 180, // 6 bulan
        lastServiceDate: daysAgo(175), // Sisa 5 hari menuju 6 bulan
        lastServiceKm: 8000,
        estimatedCost: 25000,
        partCode: '08294-M99-K0LV1',
        notes: 'Kapasitas 120ml tiap 6.000 km atau 6 bulan',
      },
      {
        id: 'item-4',
        vehicleId: v1Id,
        title: 'Cek / Ganti Kampas Rem',
        category: 'Pengereman & Ban',
        intervalKm: 8000,
        intervalDays: 180, // 6 bulan
        lastServiceDate: daysAgo(90),
        lastServiceKm: 8500,
        estimatedCost: 65000,
        partCode: '06455-K59-A71',
        notes: 'Periksa kampas rem depan & belakang tiap 8.000 km / 6 bulan',
      },
      {
        id: 'item-5',
        vehicleId: v1Id,
        title: 'Ganti Busi',
        category: 'Mesin & Filter',
        intervalKm: 8000,
        intervalDays: 240, // 8 bulan
        lastServiceDate: daysAgo(110),
        lastServiceKm: 8000,
        estimatedCost: 35000,
        partCode: '31919-K25-601',
        notes: 'Busi NGK CPR9EA-9 tiap 8.000 km atau 8 bulan',
      },
      {
        id: 'item-6',
        vehicleId: v1Id,
        title: 'Ganti Filter Udara',
        category: 'Mesin & Filter',
        intervalKm: 12000,
        intervalDays: 365, // 12 bulan
        lastServiceDate: daysAgo(150),
        lastServiceKm: 6000,
        estimatedCost: 65000,
        partCode: '17210-K1Z-J10',
        notes: 'Filter udara viscous paper tiap 12.000 km atau 1 tahun',
      },
      {
        id: 'item-7',
        vehicleId: v1Id,
        title: 'Periksa / Ganti Aki (Accu)',
        category: 'Kelistrikan',
        intervalKm: 15000,
        intervalDays: 540, // 18 bulan
        lastServiceDate: daysAgo(320),
        lastServiceKm: 5000,
        estimatedCost: 275000,
        partCode: '31500-KZR-602',
        notes: 'Aki GTZ6V MF tiap 15.000 km atau 18 bulan',
      },
      {
        id: 'item-8',
        vehicleId: v1Id,
        title: 'Ganti V-Belt & Roller CVT',
        category: 'CVT & Transmisi',
        intervalKm: 24000,
        intervalDays: 720, // 24 bulan
        lastServiceDate: daysAgo(200),
        lastServiceKm: 0,
        estimatedCost: 185000,
        partCode: '23100-K1Z-N21',
        notes: 'Ganti 1 set V-Belt dan roller tiap 24.000 km atau 2 tahun',
      },
      // Data Motor Ke-2 (Yamaha NMAX 155)
      {
        id: 'item-nmax-1',
        vehicleId: v2Id,
        title: 'Ganti Oli Mesin Yamalube',
        category: 'Oli & Cairan',
        intervalKm: 2000,
        intervalDays: 90, // 3 bulan
        lastServiceDate: daysAgo(95), // Lewat 5 hari dari 3 bulan
        lastServiceKm: 22600, // Padahal baru jalan 1.500 km (belum 2.000 km)
        estimatedCost: 85000,
        partCode: '90793-AJ491',
        notes: 'Ganti tiap 2.000 km atau 3 bulan (mana yang tercapai dulu)',
      },
      {
        id: 'item-nmax-2',
        vehicleId: v2Id,
        title: 'Periksa V-Belt & Roller NMAX',
        category: 'CVT & Transmisi',
        intervalKm: 25000,
        intervalDays: 720, // 24 bulan
        lastServiceDate: daysAgo(400),
        lastServiceKm: 0, // Sisa 900 km menuju 25.000 km
        estimatedCost: 220000,
        partCode: 'B65-E7641-00',
        notes: 'Wajib ganti tiap 25.000 km atau 2 tahun',
      },
      {
        id: 'item-nmax-3',
        vehicleId: v2Id,
        title: 'Ganti Oli Gardan NMAX',
        category: 'Oli & Cairan',
        intervalKm: 6000,
        intervalDays: 180, // 6 bulan
        lastServiceDate: daysAgo(176), // Sisa 4 hari menuju 6 bulan
        lastServiceKm: 20000,
        estimatedCost: 30000,
        partCode: '90793-AJ809',
        notes: 'Ganti tiap 6.000 km atau 6 bulan',
      }
    ],
    serviceLogs: [
      {
        id: 'log-cur-1',
        vehicleId: v1Id,
        serviceItemId: 'item-4',
        serviceTitle: 'Cek / Ganti Kampas Rem',
        date: makeDate(curYear, curMonth, 2),
        odoKm: 12100,
        cost: 65000,
        workshopName: 'Planet Ban Sudirman',
        notes: 'Ganti kampas rem depan cakram + bersihkan kaliper',
      },
      {
        id: 'log-cur-2',
        vehicleId: v1Id,
        serviceItemId: 'item-3',
        serviceTitle: 'Ganti Oli Gardan (Transmisi)',
        date: makeDate(curYear, curMonth, 8),
        odoKm: 12450,
        cost: 25000,
        workshopName: 'AHASS Tunas Jaya',
        notes: 'Oli transmisi AHM 120ml + cek tekanan ban nitrogen',
      },
      {
        id: 'log-prev-1',
        vehicleId: v1Id,
        serviceItemId: 'item-1',
        serviceTitle: 'Ganti Oli Mesin',
        date: makeDate(curYear, curMonth - 1, 14),
        odoKm: 11200,
        cost: 75000,
        workshopName: 'AHASS Tunas Jaya',
        notes: 'Oli SPX2 0.8L + servis ringan berkala',
      },
      {
        id: 'log-prev-2',
        vehicleId: v1Id,
        serviceItemId: 'item-5',
        serviceTitle: 'Ganti Busi',
        date: makeDate(curYear, curMonth - 1, 22),
        odoKm: 11500,
        cost: 35000,
        workshopName: 'Bengkel Maju Motor',
        notes: 'Ganti busi NGK CPR9EA-9 baru',
      },
      {
        id: 'log-prev2-1',
        vehicleId: v1Id,
        serviceItemId: 'item-6',
        serviceTitle: 'Ganti Filter Udara',
        date: makeDate(curYear, curMonth - 2, 10),
        odoKm: 9200,
        cost: 65000,
        workshopName: 'AHASS Tunas Jaya',
        notes: 'Ganti elemen saringan udara original',
      }
    ]
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.vehicles && parsed.vehicles.length > 0) {
        parsed.vehicles.forEach((v, idx) => {
          if (!v.taxDueDate) {
            const days = idx === 0 ? 42 : 180;
            v.taxDueDate = new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
          }
        });
        // Pastikan setiap item punya intervalDays & intervalKm
        if (Array.isArray(parsed.serviceItems)) {
          parsed.serviceItems.forEach((it) => {
            if (!it.intervalDays || it.intervalDays <= 0) it.intervalDays = 90;
            if (!it.intervalKm || it.intervalKm <= 0) it.intervalKm = 2000;
          });
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Gagal memuat state:', e);
  }
  return createInitialState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Gagal menyimpan state:', e);
  }
}

function applyThemeMode() {
  const isDark = !!(state.settings && state.settings.darkMode);
  document.body.classList.toggle('dark-mode', isDark);
}

// ============================================================================
// EVALUASI KOMPONEN BERDASARKAN KM DAN LAMA PERGANTIAN TERAKHIR (BULAN/HARI)
// ============================================================================
function evaluateServiceItem(item, currentOdo) {
  const today = new Date();
  const lastDate = new Date(item.lastServiceDate);
  const reminderDaysBefore = state.settings?.reminderDaysBefore ?? 7;
  const nearKmThreshold = state.settings?.nearDueKmThreshold ?? 300;
  const notifEnabled = state.settings?.isNotificationEnabled ?? true;

  const intervalKm = item.intervalKm > 0 ? item.intervalKm : 2000;
  const intervalDays = item.intervalDays > 0 ? item.intervalDays : 90;

  const usedKm = Math.max(0, currentOdo - item.lastServiceKm);
  const daysPassed = Math.max(0, daysBetween(lastDate, today));

  const nextDueKm = item.lastServiceKm + intervalKm;
  const nextDueDate = new Date(lastDate.getTime() + intervalDays * 86400000);

  const remainingKm = nextDueKm - currentOdo;
  const remainingDays = daysBetween(today, nextDueDate);

  const kmDue = remainingKm <= 0;
  const dateDue = remainingDays <= 0;
  const isDue = kmDue || dateDue;

  const kmNear = remainingKm <= nearKmThreshold;
  const dateNear = remainingDays <= reminderDaysBefore;
  const isNearDue = notifEnabled && !isDue && (kmNear || dateNear);

  // Hitung rasio ketercapaian (bisa > 1.0 jika sudah lewat batas, untuk pengurutan prioritas)
  const rawProgressKm = usedKm / intervalKm;
  const rawProgressDays = daysPassed / intervalDays;
  const rawUrgencyScore = Math.max(rawProgressKm, rawProgressDays);
  const progress = Math.min(Math.max(rawUrgencyScore, 0), 1);

  // Tentukan alasan utama kenapa komponen perlu diganti/diperiksa (KM vs Waktu)
  const triggeredByTime = rawProgressDays >= rawProgressKm;

  let status = 'safe';
  let statusLabel = 'Kondisi Aman';
  let urgentReasonText = '';

  if (isDue) {
    status = 'due';
    statusLabel = 'Waktunya Ganti!';
    if (dateDue && kmDue) {
      urgentReasonText = `Lewat ${formatKm(Math.abs(remainingKm))} & ${Math.abs(remainingDays)} hari`;
    } else if (dateDue) {
      urgentReasonText = `Sudah ${daysPassed} hari (Batas ${formatDurationShort(intervalDays)})`;
    } else {
      urgentReasonText = `Lewat ${formatKm(Math.abs(remainingKm))} dari jadwal`;
    }
  } else if (isNearDue) {
    status = 'near';
    statusLabel = 'Segera Periksa';
    if (dateNear && (!kmNear || remainingDays / reminderDaysBefore <= remainingKm / nearKmThreshold)) {
      urgentReasonText = `Sisa ${remainingDays} hari lagi (${formatDurationShort(intervalDays)})`;
    } else {
      urgentReasonText = `Sisa ${formatKm(remainingKm)} lagi`;
    }
  } else {
    if (triggeredByTime) {
      urgentReasonText = `Sisa ${remainingDays} hari / ${formatKm(remainingKm)}`;
    } else {
      urgentReasonText = `Sisa ${formatKm(remainingKm)} / ${remainingDays} hari`;
    }
  }

  return {
    ...item,
    intervalKm,
    intervalDays,
    usedKm,
    daysPassed,
    nextDueKm,
    nextDueDate,
    remainingKm,
    remainingDays,
    kmDue,
    dateDue,
    isDue,
    isNearDue,
    rawUrgencyScore,
    progress,
    triggeredByTime,
    status,
    statusLabel,
    urgentReasonText,
  };
}

function getActiveVehicle() {
  return state.vehicles.find((v) => v.id === state.activeVehicleId) || state.vehicles[0];
}

function getEvaluatedItemsForActiveVehicle() {
  const vehicle = getActiveVehicle();
  if (!vehicle) return [];
  const rawItems = state.serviceItems.filter((i) => i.vehicleId === vehicle.id);
  const evaluated = rawItems.map((i) => evaluateServiceItem(i, vehicle.currentOdo));

  // Urutkan dari yang paling mendekati / paling lewat batas (rawUrgencyScore tertinggi di atas)
  evaluated.sort((a, b) => {
    if (a.isDue && !b.isDue) return -1;
    if (!a.isDue && b.isDue) return 1;
    if (a.isNearDue && !b.isNearDue) return -1;
    if (!a.isNearDue && b.isNearDue) return 1;
    return b.rawUrgencyScore - a.rawUrgencyScore;
  });

  return evaluated;
}

function getLogsForActiveVehicle() {
  const vehicle = getActiveVehicle();
  if (!vehicle) return [];
  return state.serviceLogs
    .filter((l) => l.vehicleId === vehicle.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'Oli & Cairan': return 'fa-oil-can';
    case 'CVT & Transmisi': return 'fa-gears';
    case 'Mesin & Filter': return 'fa-temperature-high';
    case 'Pengereman & Ban': return 'fa-circle-dot';
    case 'Kelistrikan': return 'fa-bolt';
    default: return 'fa-screwdriver-wrench';
  }
}

// ============================================================================
// MAIN TAB & SUB-TAB NAVIGATION
// ============================================================================
function switchTab(tabKey) {
  state.activeTab = tabKey;

  const tabMap = {
    home: 'tabHome',
    history: 'tabHistory',
    vehicles: 'tabVehicles',
  };

  Object.entries(tabMap).forEach(([k, id]) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', k === tabKey);
  });

  document.querySelectorAll('.nav-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabKey);
  });

  saveState();
  renderAll();
}

function switchMotorSubTab(subKey) {
  state.activeMotorSubTab = subKey;

  const subMap = {
    kendaraan: 'subtabKendaraan',
    setting: 'subtabSetting',
    about: 'subtabAbout',
  };

  Object.entries(subMap).forEach(([k, id]) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', k === subKey);
  });

  document.querySelectorAll('.subtab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.subtab === subKey);
  });

  saveState();
}

// ============================================================================
// RENDER ALL TABS
// ============================================================================
function renderAll() {
  applyThemeMode();
  const vehicle = getActiveVehicle();
  const items = getEvaluatedItemsForActiveVehicle();
  const logs = getLogsForActiveVehicle();

  renderHomeTab(vehicle, items);
  renderHistoryTab(vehicle, logs);
  renderVehiclesTab(vehicle);
  renderSettingsTab();
}

// ----------------------------------------------------------------------------
// TAB 1: BERANDA
// ----------------------------------------------------------------------------
function toggleHeroUrgentList() {
  state.heroExpanded = !state.heroExpanded;
  renderAll();
}

function renderHomeTab(vehicle, items) {
  document.getElementById('homeVehicleSub').textContent = `${vehicle.plateNumber} • ${vehicle.vehicleType}`;

  // 1. Quick Vehicle Switcher di Header Beranda (Tampil bersih seperti judul teks biasa)
  const quickSelect = document.getElementById('homeVehicleQuickSelect');
  if (quickSelect) {
    quickSelect.innerHTML = state.vehicles.map((v) => `
      <option value="${v.id}" ${v.id === vehicle.id ? 'selected' : ''}>
        ${v.name}
      </option>
    `).join('');
  }

  // Search clear button visibility
  const clearBtn = document.getElementById('homeSearchClearBtn');
  if (clearBtn) {
    clearBtn.style.display = state.homeSearchQuery ? 'inline-flex' : 'none';
  }

  // Inline Odometer Input (dengan pemisah titik ribuan)
  const odoInput = document.getElementById('inlineOdoInput');
  if (document.activeElement !== odoInput) {
    odoInput.value = formatNumber(vehicle.currentOdo);
  }
  document.getElementById('homeOdoLastUpdate').textContent =
    `Update: ${formatDateShort(vehicle.lastOdoUpdate)}`;

  const dueItems = items.filter((i) => i.isDue);
  const nearItems = items.filter((i) => i.isNearDue);
  const safeItems = items.filter((i) => !i.isDue && !i.isNearDue);
  const attentionItems = [...dueItems, ...nearItems];
  const attentionCount = attentionItems.length;

  // Estimasi Budget ke Bengkel
  const urgentBudget = attentionItems.reduce((sum, i) => sum + (i.estimatedCost || 0), 0);
  const estBudgetEl = document.getElementById('homeEstBudgetVal');
  if (estBudgetEl) {
    estBudgetEl.textContent = urgentBudget > 0
      ? formatRupiah(urgentBudget)
      : (items[0] ? formatRupiah(items[0].estimatedCost) : 'Rp 0');
  }

  // Status Pajak STNK
  const stnkValEl = document.getElementById('homeStnkStatusVal');
  const stnkIconBox = document.getElementById('homeStnkIconBox');
  if (stnkValEl && stnkIconBox) {
    if (vehicle.taxDueDate) {
      const taxDays = daysBetween(new Date(), new Date(vehicle.taxDueDate));
      if (taxDays < 0) {
        stnkValEl.textContent = `Lewat ${Math.abs(taxDays)} hr`;
        stnkIconBox.style.background = 'var(--danger-bg)';
        stnkIconBox.style.color = 'var(--danger-text)';
      } else if (taxDays <= 30) {
        stnkValEl.textContent = `${taxDays} hari lagi`;
        stnkIconBox.style.background = 'var(--amber-bg)';
        stnkIconBox.style.color = 'var(--amber-text)';
      } else {
        stnkValEl.textContent = `${taxDays} hari lagi`;
        stnkIconBox.style.background = 'var(--emerald-bg)';
        stnkIconBox.style.color = 'var(--emerald-text)';
      }
    } else {
      stnkValEl.textContent = 'Belum diset';
    }
  }

  // ==========================================================================
  // KARTU PRIORITAS KOMPAK (TANPA MASKOT UNGU):
  // Default menampilkan 2 item (1 Merah paling mendekati, 2 Kuning setelahnya).
  // Klik "Lainnya" langsung menampilkan sisa list di bawahnya (tanpa buka jendela/modal baru).
  // ==========================================================================
  const heroHeaderBadge = document.getElementById('heroHeaderBadge');
  const heroUrgentList = document.getElementById('heroUrgentList');
  const heroActions = document.getElementById('heroPriorityActions');

  // Gunakan daftar yang mendekati/jatuh tempo, atau jika semua aman ambil 2 teratas yang paling dekat jadwalnya
  const sourceList = attentionItems.length > 0 ? attentionItems : items.slice(0, 2);
  const isExpanded = !!state.heroExpanded;
  const visibleUrgentItems = isExpanded ? sourceList : sourceList.slice(0, 2);
  const extraCount = Math.max(0, sourceList.length - 2);

  if (attentionItems.length > 0) {
    heroHeaderBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> ${attentionItems.length} Komponen Mendekati / Wajib Ganti`;
  } else {
    heroHeaderBadge.innerHTML = `<i class="fa-solid fa-shield-check" style="color:#10b981;"></i> Jadwal Pergantian Terdekat`;
  }

  if (visibleUrgentItems.length === 0) {
    heroUrgentList.innerHTML = `
      <div style="font-size:12px; color:var(--text-secondary); padding:6px 0;">
        Belum ada komponen servis terdaftar pada motor ini.
      </div>
    `;
    heroActions.innerHTML = `
      <button class="btn-pill-purple" onclick="openAddServiceModal()">
        <i class="fa-solid fa-plus"></i> Tambah Komponen
      </button>
    `;
  } else {
    heroUrgentList.innerHTML = visibleUrgentItems.map((item, idx) => {
      // Item 1 = Merah (paling mendekati akan diganti), Item 2 & seterusnya = Kuning (setelah merah)
      const isFirst = idx === 0;
      const rankClass = isFirst ? 'rank-red' : 'rank-yellow';
      const dotClass = isFirst ? 'red' : 'yellow';
      const textClass = isFirst ? 'red-text' : 'yellow-text';

      return `
        <div class="urgent-slot-card ${rankClass}" onclick="openServiceDetailModal('${item.id}')">
          <div class="urgent-slot-left">
            <span class="urgent-rank-dot ${dotClass}">${idx + 1}</span>
            <div style="min-width: 0;">
              <div class="urgent-slot-name">${item.title}</div>
              <div class="urgent-slot-meta ${textClass}">
                <i class="fa-solid ${item.triggeredByTime ? 'fa-calendar-day' : 'fa-gauge-high'}"></i>
                <span>${item.urgentReasonText} • ${formatRupiah(item.estimatedCost)}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="urgent-slot-btn"
            onclick="event.stopPropagation(); openLogModalForItem('${item.id}');"
            title="Catat Sudah Servis"
          >
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      `;
    }).join('');

    heroActions.innerHTML = `
      <button class="btn-pill-purple" onclick="openLogModalForItem('${visibleUrgentItems[0].id}')">
        <i class="fa-solid fa-screwdriver-wrench"></i> Catat Servis
      </button>
      ${sourceList.length > 2 ? `
        <button type="button" class="btn-pill-white" onclick="toggleHeroUrgentList()">
          <i class="fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}" style="color:var(--purple-600);"></i>
          ${isExpanded ? 'Sembunyikan' : `Lainnya (+${extraCount} item)`}
        </button>
      ` : `
        <button type="button" class="btn-pill-white" onclick="openServiceDetailModal('${visibleUrgentItems[0].id}')">
          Periksa Detail
        </button>
      `}
    `;
  }

  // Semi-circular Gauges
  const totalCount = Math.max(items.length, 1);
  const arcMax = 150.8;
  const dueRatio = Math.min(Math.max(attentionCount / totalCount, 0.1), 1);
  const safeRatio = Math.min(Math.max(safeItems.length / totalCount, 0.1), 1);

  document.getElementById('gaugeArcDue').setAttribute('stroke-dashoffset', (arcMax * (1 - dueRatio)).toFixed(1));
  document.getElementById('gaugeArcSafe').setAttribute('stroke-dashoffset', (arcMax * (1 - safeRatio)).toFixed(1));

  document.getElementById('gaugeDueSub').textContent = `${attentionCount} komponen`;
  document.getElementById('gaugeSafeSub').textContent = `${safeItems.length} komponen aman`;

  document.getElementById('gaugeCardDue').classList.toggle('active-filter', state.homeFilter === 'Perlu Diganti');
  document.getElementById('gaugeCardSafe').classList.toggle('active-filter', state.homeFilter === 'Semua');

  // Filter Pills dengan Full Ikon Kategori
  const filterDefs = [
    { key: 'Semua', label: `Semua (${items.length})`, icon: 'fa-layer-group' },
    { key: 'Perlu Diganti', label: `Perlu Diperiksa (${attentionCount})`, icon: 'fa-triangle-exclamation' },
    { key: 'Oli & Cairan', label: 'Oli & Cairan', icon: 'fa-oil-can' },
    { key: 'CVT & Transmisi', label: 'CVT & Transmisi', icon: 'fa-gears' },
    { key: 'Mesin & Filter', label: 'Mesin & Filter', icon: 'fa-temperature-high' },
    { key: 'Pengereman & Ban', label: 'Rem & Ban', icon: 'fa-circle-dot' },
    { key: 'Kelistrikan', label: 'Kelistrikan', icon: 'fa-bolt' },
  ];

  document.getElementById('homeFilterPills').innerHTML = filterDefs.map((f) => `
    <button class="filter-pill ${state.homeFilter === f.key ? 'active' : ''}" onclick="setHomeFilter('${f.key}')">
      <i class="fa-solid ${f.icon}"></i>
      <span>${f.label}</span>
    </button>
  `).join('');

  // Filtered Component List
  const q = (state.homeSearchQuery || '').trim().toLowerCase();
  const filtered = items.filter((item) => {
    if (state.homeFilter === 'Perlu Diganti' && !(item.isDue || item.isNearDue)) return false;
    if (
      state.homeFilter !== 'Semua' &&
      state.homeFilter !== 'Perlu Diganti' &&
      item.category !== state.homeFilter
    ) {
      return false;
    }
    if (q) {
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.partCode || '').toLowerCase().includes(q) ||
        (item.notes || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const listEl = document.getElementById('homeComponentList');
  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="card-panel" style="text-align:center; padding: 24px 16px;">
        <div style="font-size:14px; font-weight:800; margin-bottom:4px;">Tidak ada komponen di kategori ini</div>
        <div style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">
          Coba pilih kategori lain atau tampilkan semua komponen.
        </div>
        <button class="btn-pill-purple" onclick="clearHomeSearch(); setHomeFilter('Semua');">Tampilkan Semua</button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map((item) => {
    const borderClass = item.isDue ? 'due-border' : item.isNearDue ? 'near-border' : '';
    const badgeClass = item.isDue ? 'danger' : item.isNearDue ? 'warning' : 'safe';
    const barColor = item.isDue ? '#ef4444' : item.isNearDue ? '#f59e0b' : '#7c3aed';

    const kmStatusText = item.remainingKm <= 0
      ? `Lewat ${formatKm(Math.abs(item.remainingKm))}`
      : `Sisa ${formatKm(item.remainingKm)} (Max ${formatKm(item.intervalKm)})`;

    const timeStatusText = item.remainingDays <= 0
      ? `Lewat ${Math.abs(item.remainingDays)} hr (Batas ${formatDurationShort(item.intervalDays)})`
      : `Sisa ${item.remainingDays} hr (Tiap ${formatDurationShort(item.intervalDays)})`;

    return `
      <div class="component-card ${borderClass}">
        <div class="comp-card-top">
          <div class="comp-title-wrap" onclick="openServiceDetailModal('${item.id}')">
            <div class="comp-icon-box">
              <i class="fa-solid ${getCategoryIcon(item.category)}"></i>
            </div>
            <div>
              <div class="comp-title">${item.title}</div>
              <div class="comp-category">
                <i class="fa-solid ${getCategoryIcon(item.category)}"></i>
                <span>${item.category} • ${formatRupiah(item.estimatedCost)}</span>
              </div>
            </div>
          </div>
          <span class="status-pill-badge ${badgeClass}">${item.statusLabel}</span>
        </div>

        <div class="comp-progress-track">
          <div class="comp-progress-fill" style="width:${Math.round(item.progress * 100)}%; background:${barColor};"></div>
        </div>

        <!-- Patokan Ganda: Jarak KM & Lama Waktu Pergantian Terakhir -->
        <div class="dual-interval-grid" onclick="openServiceDetailModal('${item.id}')" style="cursor:pointer;">
          <div class="interval-col">
            <span class="interval-col-label">
              <i class="fa-solid fa-gauge-high" style="color:var(--purple-600);"></i> Patokan Jarak
            </span>
            <span class="interval-col-val" style="${item.kmDue ? 'color:var(--danger-text);' : ''}">
              ${kmStatusText}
            </span>
          </div>
          <div class="interval-col">
            <span class="interval-col-label">
              <i class="fa-regular fa-calendar-check" style="color:var(--purple-600);"></i> Patokan Waktu
            </span>
            <span class="interval-col-val" style="${item.dateDue ? 'color:var(--danger-text);' : ''}">
              ${timeStatusText}
            </span>
          </div>
        </div>

        <div class="comp-card-footer">
          <span onclick="openServiceDetailModal('${item.id}')" style="cursor:pointer;">
            Diganti: <strong>${formatDateShort(item.lastServiceDate)}</strong> (${formatKm(item.lastServiceKm)})
          </span>
          <button class="comp-action-btn" onclick="openLogModalForItem('${item.id}')">
            <i class="fa-solid fa-check"></i> Servis
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setHomeFilter(filterKey) {
  state.homeFilter = filterKey;
  saveState();
  renderAll();
}

function handleHomeSearch(query) {
  state.homeSearchQuery = query;
  renderAll();
}

function clearHomeSearch() {
  state.homeSearchQuery = '';
  const input = document.getElementById('homeSearchInput');
  if (input) input.value = '';
  renderAll();
}

// --- Inline Odometer Handler on Beranda ---
function handleInlineOdoUpdate(e) {
  e.preventDefault();
  const input = document.getElementById('inlineOdoInput');
  const newOdo = parseFormattedNumber(input.value);
  if (newOdo < 0) return;

  const vehicle = getActiveVehicle();
  vehicle.currentOdo = newOdo;
  vehicle.lastOdoUpdate = new Date().toISOString();

  saveState();
  renderAll();
  showToast(`Odometer ${vehicle.name} diperbarui ke ${formatKm(newOdo)}!`);
}

// ----------------------------------------------------------------------------
// TAB 2: RIWAYAT SERVIS (TIMELINE SEBULAN + NAVIGASI BULAN SEBELUM/SESUDAH)
// ----------------------------------------------------------------------------
function renderHistoryTab(vehicle, allLogs) {
  document.getElementById('historyVehicleSub').textContent =
    `Buku Servis Digital • ${vehicle.name} (${vehicle.plateNumber})`;

  const y = state.historyViewYear;
  const m = state.historyViewMonth;

  document.getElementById('historyMonthLabel').textContent = `${MONTH_NAMES_ID[m]} ${y}`;

  const monthlyLogs = allLogs.filter((log) => {
    const d = new Date(log.date);
    return d.getFullYear() === y && d.getMonth() === m;
  });

  monthlyLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const monthlyTotal = monthlyLogs.reduce((sum, l) => sum + (Number(l.cost) || 0), 0);
  document.getElementById('historyMonthlyTotal').textContent = formatRupiah(monthlyTotal);
  document.getElementById('historyMonthlyCount').textContent = `${monthlyLogs.length} Perawatan`;
  document.getElementById('historyMonthSub').textContent =
    `Timeline perawatan bulan ${MONTH_NAMES_ID[m]}`;

  const wrap = document.getElementById('historyTimelineWrap');
  if (monthlyLogs.length === 0) {
    wrap.innerHTML = `
      <div class="card-panel" style="text-align:center; padding: 28px 16px;">
        <i class="fa-regular fa-calendar-xmark" style="font-size: 32px; color: var(--text-muted); margin-bottom: 10px;"></i>
        <div style="font-size:14px; font-weight:800; margin-bottom:4px;">
          Belum ada catatan servis di ${MONTH_NAMES_ID[m]} ${y}
        </div>
        <div style="font-size:12px; color:var(--text-secondary); margin-bottom:14px;">
          Gunakan tombol panah bulan di atas untuk melihat bulan lain atau catat servis baru.
        </div>
        <button class="btn-pill-purple" onclick="openLogModalForItem(null)">
          <i class="fa-solid fa-plus"></i> Catat Servis Bulan Ini
        </button>
      </div>
    `;
    return;
  }

  wrap.innerHTML = `
    <div class="timeline-container">
      ${monthlyLogs.map((log) => `
        <div class="timeline-item">
          <span class="timeline-dot"></span>
          <div class="timeline-date-badge">
            <span><i class="fa-regular fa-calendar"></i> ${formatDateDayMonth(log.date)}</span>
            <div style="display:flex; gap:8px;">
              <button
                type="button"
                style="border:none; background:none; color:var(--purple-600); cursor:pointer; font-size:12px;"
                onclick="openEditLogModal('${log.id}')"
                title="Ubah Catatan Riwayat"
              >
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button
                type="button"
                style="border:none; background:none; color:var(--text-muted); cursor:pointer; font-size:12px;"
                onclick="deleteServiceLog('${log.id}')"
                title="Hapus Catatan"
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
          <div class="timeline-title">${log.serviceTitle}</div>
          <div class="timeline-meta">
            <span><i class="fa-solid fa-gauge-high" style="color:var(--purple-600);"></i> ${formatKm(log.odoKm)}</span>
            <span><i class="fa-solid fa-store" style="color:var(--purple-600);"></i> ${log.workshopName || 'Bengkel'}</span>
            <span style="font-weight:800; color:var(--emerald-text);">${formatRupiah(log.cost)}</span>
          </div>
          ${log.notes ? `<div class="timeline-notes">"${log.notes}"</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function changeHistoryMonth(delta) {
  let m = state.historyViewMonth + delta;
  let y = state.historyViewYear;
  if (m < 0) {
    m = 11;
    y -= 1;
  } else if (m > 11) {
    m = 0;
    y += 1;
  }
  state.historyViewMonth = m;
  state.historyViewYear = y;
  saveState();
  renderAll();
}

function jumpToLatestLogMonth() {
  const logs = getLogsForActiveVehicle();
  if (logs.length > 0) {
    const latest = new Date(logs[0].date);
    state.historyViewYear = latest.getFullYear();
    state.historyViewMonth = latest.getMonth();
  } else {
    const now = new Date();
    state.historyViewYear = now.getFullYear();
    state.historyViewMonth = now.getMonth();
  }
  saveState();
  renderAll();
}

// ----------------------------------------------------------------------------
// TAB 3: MOTOR (DROPDOWN DAFTAR MOTOR | SETTING | ABOUT)
// ----------------------------------------------------------------------------
function renderVehiclesTab(activeVehicle) {
  document.getElementById('vehicleCountBadge').textContent = `${state.vehicles.length} Motor`;

  const dropdown = document.getElementById('vehiclesPageDropdown');
  if (dropdown) {
    dropdown.innerHTML = state.vehicles.map((v) => `
      <option value="${v.id}" ${v.id === activeVehicle.id ? 'selected' : ''}>
        ${v.name} — ${v.plateNumber} (${formatKm(v.currentOdo)})
      </option>
    `).join('');
  }

  const delBtn = document.getElementById('deleteSelectedVehicleBtn');
  if (delBtn) {
    delBtn.style.display = state.vehicles.length > 1 ? 'inline-flex' : 'none';
  }

  const itemCount = state.serviceItems.filter((i) => i.vehicleId === activeVehicle.id).length;
  const infoBox = document.getElementById('selectedVehicleQuickInfo');
  if (infoBox) {
    infoBox.innerHTML = `
      <div>
        <strong style="color:var(--text-primary);">${activeVehicle.name}</strong> • ${activeVehicle.vehicleType}<br/>
        <span>Odometer: <b>${formatKm(activeVehicle.currentOdo)}</b> • Pajak STNK: <b>${activeVehicle.taxDueDate ? formatDateShort(activeVehicle.taxDueDate) : '-'}</b></span>
      </div>
      <span class="status-pill-badge safe">${itemCount} Item</span>
    `;
  }
}

function selectActiveVehicle(vehicleId) {
  state.activeVehicleId = vehicleId;
  state.heroExpanded = false;
  saveState();
  renderAll();
  const v = getActiveVehicle();
  showToast(`Motor aktif: ${v.name}`);
}

function editSelectedVehicleFromDropdown() {
  const dropdown = document.getElementById('vehiclesPageDropdown');
  const id = dropdown ? dropdown.value : state.activeVehicleId;
  editVehicleOnPage(id);
}

function deleteSelectedVehicleFromDropdown() {
  const dropdown = document.getElementById('vehiclesPageDropdown');
  const id = dropdown ? dropdown.value : state.activeVehicleId;
  deleteVehicle(id);
}

function editVehicleOnPage(vehicleId) {
  const v = state.vehicles.find((x) => x.id === vehicleId);
  if (!v) return;

  document.getElementById('vehicleFormTitle').textContent = `Ubah Data: ${v.name}`;
  document.getElementById('vehicleEditId').value = v.id;
  document.getElementById('vehicleNameInput').value = v.name;
  document.getElementById('vehiclePlateInput').value = v.plateNumber;
  document.getElementById('vehicleOdoInput').value = formatNumber(v.currentOdo);
  document.getElementById('vehicleTypeInput').value = v.vehicleType;
  document.getElementById('vehicleTaxDateInput').value = v.taxDueDate || '';
  document.getElementById('vehicleSubmitBtnText').textContent = 'Perbarui Data Motor';
  document.getElementById('cancelEditVehicleBtn').style.display = 'inline-block';

  document.getElementById('vehicleFormCard').scrollIntoView({ behavior: 'smooth' });
}

function resetVehicleForm() {
  document.getElementById('vehicleFormTitle').textContent = 'Tambah Motor Baru';
  document.getElementById('vehicleEditId').value = '';
  document.getElementById('vehicleNameInput').value = '';
  document.getElementById('vehiclePlateInput').value = '';
  document.getElementById('vehicleOdoInput').value = '0';
  document.getElementById('vehicleTypeInput').value = 'Matic';
  document.getElementById('vehicleTaxDateInput').value = '';
  document.getElementById('vehicleSubmitBtnText').textContent = 'Simpan Data Motor';
  document.getElementById('cancelEditVehicleBtn').style.display = 'none';
}

function handleSaveVehiclePage(e) {
  e.preventDefault();
  const editId = document.getElementById('vehicleEditId').value;
  const name = document.getElementById('vehicleNameInput').value.trim();
  const plateNumber = document.getElementById('vehiclePlateInput').value.trim();
  const currentOdo = parseFormattedNumber(document.getElementById('vehicleOdoInput').value);
  const vehicleType = document.getElementById('vehicleTypeInput').value;
  const taxDueDate = document.getElementById('vehicleTaxDateInput').value || '';
  const nowIso = new Date().toISOString();

  if (editId) {
    const idx = state.vehicles.findIndex((v) => v.id === editId);
    if (idx !== -1) {
      state.vehicles[idx] = {
        ...state.vehicles[idx],
        name,
        plateNumber,
        currentOdo,
        vehicleType,
        taxDueDate,
        lastOdoUpdate: nowIso,
      };
    }
    showToast(`Data motor "${name}" berhasil diperbarui!`);
  } else {
    const newId = 'veh-' + Date.now();
    state.vehicles.push({
      id: newId,
      name,
      plateNumber,
      currentOdo,
      vehicleType,
      taxDueDate,
      lastOdoUpdate: nowIso,
    });

    state.serviceItems.push(
      {
        id: 'item-' + Date.now() + '-1',
        vehicleId: newId,
        title: 'Ganti Oli Mesin',
        category: 'Oli & Cairan',
        intervalKm: 2000,
        intervalDays: 90,
        lastServiceDate: nowIso,
        lastServiceKm: Math.max(0, currentOdo - 1500),
        estimatedCost: 75000,
        notes: 'Ganti tiap 2.000 km atau 3 bulan',
      },
      {
        id: 'item-' + Date.now() + '-2',
        vehicleId: newId,
        title: 'Periksa Kampas Rem',
        category: 'Pengereman & Ban',
        intervalKm: 8000,
        intervalDays: 180,
        lastServiceDate: nowIso,
        lastServiceKm: Math.max(0, currentOdo - 3000),
        estimatedCost: 60000,
        notes: 'Cek tiap 8.000 km atau 6 bulan',
      },
      {
        id: 'item-' + Date.now() + '-3',
        vehicleId: newId,
        title: vehicleType === 'Matic' ? 'Servis CVT & Roller' : 'Setel & Lumasi Rantai',
        category: 'CVT & Transmisi',
        intervalKm: 6000,
        intervalDays: 120,
        lastServiceDate: nowIso,
        lastServiceKm: Math.max(0, currentOdo - 4000),
        estimatedCost: 55000,
        notes: 'Perawatan transmisi tiap 6.000 km atau 4 bulan',
      }
    );

    state.activeVehicleId = newId;
    showToast(`Motor "${name}" ditambahkan & diaktifkan!`);
  }

  resetVehicleForm();
  saveState();
  renderAll();
}

function deleteVehicle(vehicleId) {
  if (state.vehicles.length <= 1) {
    showToast('Minimal harus ada 1 motor di garasi');
    return;
  }
  state.vehicles = state.vehicles.filter((v) => v.id !== vehicleId);
  state.serviceItems = state.serviceItems.filter((i) => i.vehicleId !== vehicleId);
  state.serviceLogs = state.serviceLogs.filter((l) => l.vehicleId !== vehicleId);

  if (state.activeVehicleId === vehicleId) {
    state.activeVehicleId = state.vehicles[0].id;
  }
  saveState();
  renderAll();
  showToast('Data motor dihapus');
}

// ----------------------------------------------------------------------------
// SUB-TAB SETTING (TERMASUK DARK MODE)
// ----------------------------------------------------------------------------
function renderSettingsTab() {
  const s = state.settings || {
    darkMode: false,
    isNotificationEnabled: true,
    reminderDaysBefore: 7,
    nearDueKmThreshold: 300,
  };
  document.getElementById('settingDarkMode').checked = !!s.darkMode;
  document.getElementById('settingNotifEnabled').checked = !!s.isNotificationEnabled;
  document.getElementById('settingReminderDays').value = String(s.reminderDaysBefore || 7);
  document.getElementById('settingNearKm').value = String(s.nearDueKmThreshold || 300);
}

function handleSettingsChange() {
  const prevDark = !!(state.settings && state.settings.darkMode);
  const newDark = document.getElementById('settingDarkMode').checked;

  state.settings = {
    darkMode: newDark,
    isNotificationEnabled: document.getElementById('settingNotifEnabled').checked,
    reminderDaysBefore: parseInt(document.getElementById('settingReminderDays').value, 10) || 7,
    nearDueKmThreshold: parseInt(document.getElementById('settingNearKm').value, 10) || 300,
  };
  saveState();
  renderAll();

  if (prevDark !== newDark) {
    showToast(newDark ? 'Dark Mode diaktifkan' : 'Light Mode diaktifkan');
  } else {
    showToast('Pengaturan berhasil disimpan');
  }
}

function exportBackupJson() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', `servisin_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('File cadangan JSON berhasil diunduh');
}

function importBackupJson(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && Array.isArray(parsed.vehicles) && parsed.vehicles.length > 0) {
        state = parsed;
        saveState();
        renderAll();
        showToast('Data cadangan JSON berhasil dipulihkan!');
      } else {
        showToast('Format file JSON tidak valid');
      }
    } catch (_) {
      showToast('Gagal membaca file JSON');
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}

function resetDemoData() {
  localStorage.removeItem(STORAGE_KEY);
  state = createInitialState();
  saveState();
  renderAll();
  showToast('Data berhasil direset ke kondisi awal');
}

// ============================================================================
// MODALS: CATAT SERVIS, TAMBAH/EDIT KOMPONEN, DETAIL KOMPONEN
// ============================================================================
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function openLogModalForItem(preselectedId) {
  const vehicle = getActiveVehicle();
  const items = getEvaluatedItemsForActiveVehicle();
  const select = document.getElementById('logItemSelect');

  document.getElementById('editLogId').value = '';
  select.innerHTML = items.map((i) => `
    <option value="${i.id}" ${i.id === preselectedId ? 'selected' : ''}>
      ${i.title} (${i.statusLabel})
    </option>
  `).join('');

  document.getElementById('logDateInput').value = new Date().toISOString().slice(0, 10);
  document.getElementById('logOdoInput').value = formatNumber(vehicle.currentOdo);
  document.getElementById('logWorkshopInput').value = '';
  handleLogItemChange();
  document.getElementById('logServiceModal').classList.add('open');
}

function openEditLogModal(logId) {
  const log = state.serviceLogs.find((l) => l.id === logId);
  if (!log) return;

  const items = getEvaluatedItemsForActiveVehicle();
  const select = document.getElementById('logItemSelect');

  document.getElementById('editLogId').value = log.id;
  select.innerHTML = items.map((i) => `
    <option value="${i.id}" ${i.id === log.serviceItemId ? 'selected' : ''}>
      ${i.title}
    </option>
  `).join('');

  document.getElementById('logDateInput').value = new Date(log.date).toISOString().slice(0, 10);
  document.getElementById('logOdoInput').value = formatNumber(log.odoKm);
  document.getElementById('logCostInput').value = formatNumber(log.cost);
  document.getElementById('logWorkshopInput').value = log.workshopName || '';
  document.getElementById('logNotesInput').value = log.notes || '';
  document.getElementById('logServiceModal').classList.add('open');
}

function handleLogItemChange() {
  if (document.getElementById('editLogId').value) return;
  const selectedId = document.getElementById('logItemSelect').value;
  const item = state.serviceItems.find((i) => i.id === selectedId);
  if (item) {
    document.getElementById('logCostInput').value = formatNumber(item.estimatedCost || 50000);
    document.getElementById('logNotesInput').value = item.notes || '';
  }
}

function handleLogServiceSubmit(e) {
  e.preventDefault();
  const vehicle = getActiveVehicle();
  const editLogId = document.getElementById('editLogId').value;
  const itemId = document.getElementById('logItemSelect').value;
  const dateStr = document.getElementById('logDateInput').value;
  const logDate = dateStr ? new Date(dateStr + 'T10:00:00') : new Date();
  const odoKm = parseFormattedNumber(document.getElementById('logOdoInput').value) || vehicle.currentOdo;
  const cost = parseFormattedNumber(document.getElementById('logCostInput').value);
  const workshopName = document.getElementById('logWorkshopInput').value.trim() || 'Bengkel Langganan';
  const notes = document.getElementById('logNotesInput').value.trim();

  const item = state.serviceItems.find((i) => i.id === itemId);
  const isoDate = logDate.toISOString();

  if (editLogId) {
    const idx = state.serviceLogs.findIndex((l) => l.id === editLogId);
    if (idx !== -1) {
      state.serviceLogs[idx] = {
        ...state.serviceLogs[idx],
        serviceItemId: item ? item.id : state.serviceLogs[idx].serviceItemId,
        serviceTitle: item ? item.title : state.serviceLogs[idx].serviceTitle,
        date: isoDate,
        odoKm,
        cost,
        workshopName,
        notes,
      };
    }
    showToast('Catatan riwayat servis berhasil diperbarui!');
  } else {
    state.serviceLogs.unshift({
      id: 'log-' + Date.now(),
      vehicleId: vehicle.id,
      serviceItemId: item ? item.id : null,
      serviceTitle: item ? item.title : 'Servis Berkala',
      date: isoDate,
      odoKm,
      cost,
      workshopName,
      notes,
    });
    showToast(`Servis "${item ? item.title : ''}" dicatat & siklus KM + Waktu direset!`);
  }

  if (item) {
    item.lastServiceKm = odoKm;
    item.lastServiceDate = isoDate;
  }

  if (odoKm > vehicle.currentOdo) {
    vehicle.currentOdo = odoKm;
    vehicle.lastOdoUpdate = isoDate;
  }

  state.historyViewYear = logDate.getFullYear();
  state.historyViewMonth = logDate.getMonth();

  saveState();
  renderAll();
  closeModal('logServiceModal');
}

function deleteServiceLog(logId) {
  state.serviceLogs = state.serviceLogs.filter((l) => l.id !== logId);
  saveState();
  renderAll();
  showToast('Catatan riwayat servis dihapus');
}

// --- Add / Edit Service Item Modal ---
function openAddServiceModal() {
  const vehicle = getActiveVehicle();
  document.getElementById('serviceModalTitle').textContent = 'Tambah Komponen Servis';
  document.getElementById('editServiceId').value = '';
  document.getElementById('serviceTitleInput').value = '';
  document.getElementById('serviceCategoryInput').value = 'Oli & Cairan';
  document.getElementById('serviceIntervalKmInput').value = formatNumber(2000);
  document.getElementById('serviceIntervalDaysInput').value = '90';
  document.getElementById('serviceLastKmInput').value = formatNumber(vehicle.currentOdo);
  document.getElementById('serviceLastDateInput').value = new Date().toISOString().slice(0, 10);
  document.getElementById('serviceCostInput').value = formatNumber(75000);
  document.getElementById('servicePartCodeInput').value = '';
  document.getElementById('serviceNotesInput').value = '';
  document.getElementById('deleteServiceItemBtn').style.display = 'none';

  document.getElementById('addServiceModal').classList.add('open');
}

function openEditServiceModal(itemId) {
  const item = state.serviceItems.find((i) => i.id === itemId);
  if (!item) return;

  document.getElementById('serviceModalTitle').textContent = 'Edit Komponen Servis';
  document.getElementById('editServiceId').value = item.id;
  document.getElementById('serviceTitleInput').value = item.title;
  document.getElementById('serviceCategoryInput').value = item.category;
  document.getElementById('serviceIntervalKmInput').value = formatNumber(item.intervalKm || 2000);

  const daysSelect = document.getElementById('serviceIntervalDaysInput');
  const daysStr = String(item.intervalDays || 90);
  if (!Array.from(daysSelect.options).some((o) => o.value === daysStr)) {
    const opt = document.createElement('option');
    opt.value = daysStr;
    opt.textContent = formatDurationMonths(item.intervalDays);
    daysSelect.appendChild(opt);
  }
  daysSelect.value = daysStr;

  document.getElementById('serviceLastKmInput').value = formatNumber(item.lastServiceKm || 0);
  document.getElementById('serviceLastDateInput').value = item.lastServiceDate
    ? new Date(item.lastServiceDate).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
  document.getElementById('serviceCostInput').value = formatNumber(item.estimatedCost || 0);
  document.getElementById('servicePartCodeInput').value = item.partCode || '';
  document.getElementById('serviceNotesInput').value = item.notes || '';
  document.getElementById('deleteServiceItemBtn').style.display = 'inline-flex';

  document.getElementById('addServiceModal').classList.add('open');
}

function handleSaveServiceItem(e) {
  e.preventDefault();
  const vehicle = getActiveVehicle();
  const editId = document.getElementById('editServiceId').value;
  const title = document.getElementById('serviceTitleInput').value.trim();
  const category = document.getElementById('serviceCategoryInput').value;
  const intervalKm = parseFormattedNumber(document.getElementById('serviceIntervalKmInput').value) || 2000;
  const intervalDays = parseInt(document.getElementById('serviceIntervalDaysInput').value, 10) || 90;
  const lastServiceKm = parseFormattedNumber(document.getElementById('serviceLastKmInput').value);
  const lastDateStr = document.getElementById('serviceLastDateInput').value;
  const lastServiceDate = lastDateStr ? new Date(lastDateStr + 'T10:00:00').toISOString() : new Date().toISOString();
  const estimatedCost = parseFormattedNumber(document.getElementById('serviceCostInput').value);
  const partCode = document.getElementById('servicePartCodeInput').value.trim();
  const notes = document.getElementById('serviceNotesInput').value.trim();

  if (editId) {
    const idx = state.serviceItems.findIndex((i) => i.id === editId);
    if (idx !== -1) {
      state.serviceItems[idx] = {
        ...state.serviceItems[idx],
        title,
        category,
        intervalKm,
        intervalDays,
        lastServiceKm,
        lastServiceDate,
        estimatedCost,
        partCode,
        notes,
      };
    }
    showToast(`Komponen "${title}" diperbarui`);
  } else {
    state.serviceItems.push({
      id: 'item-' + Date.now(),
      vehicleId: vehicle.id,
      title,
      category,
      intervalKm,
      intervalDays,
      lastServiceDate,
      lastServiceKm,
      estimatedCost,
      partCode,
      notes,
    });
    showToast(`Komponen "${title}" ditambahkan`);
  }

  saveState();
  renderAll();
  closeModal('addServiceModal');
}

function handleDeleteServiceItem() {
  const editId = document.getElementById('editServiceId').value;
  if (!editId) return;
  state.serviceItems = state.serviceItems.filter((i) => i.id !== editId);
  saveState();
  renderAll();
  closeModal('addServiceModal');
  showToast('Komponen dihapus');
}

// --- Detail Komponen Modal ---
function openServiceDetailModal(itemId) {
  const vehicle = getActiveVehicle();
  const items = getEvaluatedItemsForActiveVehicle();
  const item = items.find((i) => i.id === itemId);
  if (!item) return;

  const itemLogs = state.serviceLogs
    .filter((l) => l.serviceItemId === item.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const pct = Math.round(item.progress * 100);
  const statusColor = item.isDue ? 'var(--danger-text)' : item.isNearDue ? 'var(--amber-text)' : 'var(--emerald-text)';
  const statusBg = item.isDue ? 'var(--danger-bg)' : item.isNearDue ? 'var(--amber-bg)' : 'var(--emerald-bg)';

  document.getElementById('detailModalTitle').textContent = item.title;
  document.getElementById('detailEditBtn').onclick = () => {
    closeModal('serviceDetailModal');
    openEditServiceModal(item.id);
  };

  const remKmText = item.remainingKm <= 0
    ? `Terlambat ${formatKm(Math.abs(item.remainingKm))}`
    : `Sisa ${formatKm(item.remainingKm)} lagi`;

  const remDaysText = item.remainingDays <= 0
    ? `Terlambat ${Math.abs(item.remainingDays)} hari`
    : `Sisa ${item.remainingDays} hari lagi`;

  document.getElementById('serviceDetailBody').innerHTML = `
    <div style="background:${statusBg}; color:${statusColor}; padding:14px 16px; border-radius:18px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <div style="font-size:14px; font-weight:800;">${item.statusLabel}</div>
        <div style="font-size:11.5px; opacity:0.9;">${item.urgentReasonText}</div>
      </div>
      <div style="font-size:18px; font-weight:800;">${pct}%</div>
    </div>

    <div style="background:var(--surface-input); border-radius:18px; padding:14px; margin-bottom:14px; display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:12px;">
      <div>
        <div style="color:var(--text-secondary); font-size:11px;">Kategori</div>
        <div style="font-weight:700;"><i class="fa-solid ${getCategoryIcon(item.category)}" style="color:var(--purple-600);"></i> ${item.category}</div>
      </div>
      <div>
        <div style="color:var(--text-secondary); font-size:11px;">Estimasi Biaya</div>
        <div style="font-weight:800; color:var(--purple-600);">${formatRupiah(item.estimatedCost)}</div>
      </div>
      <div>
        <div style="color:var(--text-secondary); font-size:11px;">Patokan KM (Tiap ${formatKm(item.intervalKm)})</div>
        <div style="font-weight:700;">Target: ${formatKm(item.nextDueKm)}</div>
        <div style="font-size:10.5px; color:${item.kmDue ? 'var(--danger-text)' : statusColor}; font-weight:700;">${remKmText}</div>
      </div>
      <div>
        <div style="color:var(--text-secondary); font-size:11px;">Patokan Waktu (${formatDurationMonths(item.intervalDays)})</div>
        <div style="font-weight:700;">Target: ${formatDateShort(item.nextDueDate.toISOString())}</div>
        <div style="font-size:10.5px; color:${item.dateDue ? 'var(--danger-text)' : statusColor}; font-weight:700;">${remDaysText}</div>
      </div>
      <div style="grid-column: span 2;">
        <div style="color:var(--text-secondary); font-size:11px;">Pergantian Terakhir</div>
        <div style="font-weight:700;">${formatDateShort(item.lastServiceDate)} (${item.daysPassed} hari lalu) pada Odo ${formatKm(item.lastServiceKm)}</div>
      </div>
      ${item.partCode ? `
      <div style="grid-column: span 2; display:flex; align-items:center; justify-content:space-between;">
        <div>
          <div style="color:var(--text-secondary); font-size:11px;">Kode Part Resmi</div>
          <div style="font-weight:800;">${item.partCode}</div>
        </div>
        <button type="button" class="comp-action-btn" onclick="navigator.clipboard?.writeText('${item.partCode}'); showToast('Kode part disalin!');">
          <i class="fa-regular fa-copy"></i> Salin
        </button>
      </div>` : ''}
      ${item.notes ? `
      <div style="grid-column: span 2;">
        <div style="color:var(--text-secondary); font-size:11px;">Catatan</div>
        <div style="font-weight:600;">${item.notes}</div>
      </div>` : ''}
    </div>

    <div style="font-size:12.5px; font-weight:800; margin-bottom:8px; display:flex; justify-content:space-between;">
      <span>Riwayat Pengerjaan Komponen Ini</span>
      <span style="color:var(--text-secondary);">${itemLogs.length} kali</span>
    </div>

    <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px; max-height:130px; overflow-y:auto;">
      ${itemLogs.length === 0 ? `
        <div style="font-size:11.5px; color:var(--text-secondary); text-align:center; padding:12px; background:var(--surface-input); border-radius:12px;">
          Belum ada riwayat pengerjaan untuk komponen ini.
        </div>
      ` : itemLogs.map((l) => `
        <div style="background:var(--surface-input); padding:9px 12px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:12px; font-weight:700;">${formatDateShort(l.date)} • ${formatKm(l.odoKm)}</div>
            <div style="font-size:11px; color:var(--text-secondary);">${l.workshopName || 'Bengkel'}</div>
          </div>
          <span class="status-pill-badge safe">${formatRupiah(l.cost)}</span>
        </div>
      `).join('')}
    </div>

    <div class="modal-footer" style="margin-top:0;">
      <button type="button" class="btn-pill-white" onclick="closeModal('serviceDetailModal')">Tutup</button>
      <button type="button" class="btn-pill-purple" onclick="closeModal('serviceDetailModal'); openLogModalForItem('${item.id}');">
        <i class="fa-solid fa-check"></i> Catat Sudah Servis
      </button>
    </div>
  `;

  document.getElementById('serviceDetailModal').classList.add('open');
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.25s ease';
    setTimeout(() => el.remove(), 250);
  }, 2600);
}

// --- Batch Service (Semua Item yang Mendekati Diganti & Kalkulator Bengkel) ---
function openBatchServiceModal() {
  const vehicle = getActiveVehicle();
  const items = getEvaluatedItemsForActiveVehicle();
  const container = document.getElementById('batchChecklistContainer');

  container.innerHTML = items.map((item, idx) => {
    const precheck = item.isDue || item.isNearDue;
    const isFirst = idx === 0;
    const isSecond = idx === 1;
    const badgeClass = isFirst ? 'danger' : isSecond || item.isNearDue ? 'warning' : 'safe';
    const borderStyle = isFirst
      ? 'border-left: 4px solid #ef4444;'
      : isSecond
      ? 'border-left: 4px solid #f59e0b;'
      : '';

    return `
      <label class="batch-check-item" style="${borderStyle}">
        <div class="batch-check-left">
          <input
            type="checkbox"
            class="batch-item-checkbox"
            value="${item.id}"
            data-cost="${item.estimatedCost || 0}"
            ${precheck ? 'checked' : ''}
            onchange="recalcBatchTotal()"
          />
          <div>
            <div style="font-size:13px; font-weight:800;">${item.title}</div>
            <div style="font-size:10.5px; color:var(--text-secondary);">${item.urgentReasonText}</div>
          </div>
        </div>
        <span class="status-pill-badge ${badgeClass}">${formatRupiah(item.estimatedCost)}</span>
      </label>
    `;
  }).join('');

  document.getElementById('batchOdoInput').value = formatNumber(vehicle.currentOdo);
  document.getElementById('batchWorkshopInput').value = '';
  recalcBatchTotal();
  document.getElementById('batchServiceModal').classList.add('open');
}

function recalcBatchTotal() {
  const boxes = document.querySelectorAll('.batch-item-checkbox:checked');
  let total = 0;
  boxes.forEach((b) => {
    total += parseInt(b.dataset.cost, 10) || 0;
  });
  document.getElementById('batchTotalCostLabel').textContent = formatRupiah(total);
}

function handleBatchServiceSubmit(e) {
  e.preventDefault();
  const boxes = Array.from(document.querySelectorAll('.batch-item-checkbox:checked'));
  if (boxes.length === 0) {
    showToast('Pilih minimal 1 komponen yang diservis');
    return;
  }

  const vehicle = getActiveVehicle();
  const odoKm = parseFormattedNumber(document.getElementById('batchOdoInput').value) || vehicle.currentOdo;
  const workshopName = document.getElementById('batchWorkshopInput').value.trim() || 'Bengkel Resmi';
  const nowIso = new Date().toISOString();

  boxes.forEach((box) => {
    const itemId = box.value;
    const item = state.serviceItems.find((i) => i.id === itemId);
    if (item) {
      state.serviceLogs.unshift({
        id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
        vehicleId: vehicle.id,
        serviceItemId: item.id,
        serviceTitle: item.title,
        date: nowIso,
        odoKm,
        cost: item.estimatedCost || 0,
        workshopName,
        notes: 'Servis berkala sekaligus',
      });
      item.lastServiceKm = odoKm;
      item.lastServiceDate = nowIso;
    }
  });

  if (odoKm > vehicle.currentOdo) {
    vehicle.currentOdo = odoKm;
    vehicle.lastOdoUpdate = nowIso;
  }

  const now = new Date();
  state.historyViewYear = now.getFullYear();
  state.historyViewMonth = now.getMonth();

  saveState();
  renderAll();
  closeModal('batchServiceModal');
  showToast(`${boxes.length} komponen berhasil dicatat selesai diservis!`);
}

// --- Cetak Buku Servis Digital ---
function printServiceBook() {
  const vehicle = getActiveVehicle();
  const items = getEvaluatedItemsForActiveVehicle();
  const logs = getLogsForActiveVehicle();
  const totalAllTime = logs.reduce((s, l) => s + (Number(l.cost) || 0), 0);

  const win = window.open('', '_blank', 'width=800,height=700');
  if (!win) {
    showToast('Izinkan pop-up browser untuk mencetak Buku Servis');
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <title>Buku Servis Digital - ${vehicle.name}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #1e293b; padding: 28px; }
        h1 { margin: 0 0 4px; color: #6d28d9; font-size: 22px; }
        .sub { color: #64748b; font-size: 13px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
        th { background: #f1f5f9; font-weight: bold; }
        .footer { font-size: 11px; color: #94a3b8; margin-top: 24px; text-align: center; }
      </style>
    </head>
    <body>
      <h1>Buku Servis Digital — Servis.In</h1>
      <div class="sub">
        <strong>Kendaraan:</strong> ${vehicle.name} (${vehicle.plateNumber}) • ${vehicle.vehicleType} <br/>
        <strong>Odometer Saat Ini:</strong> ${formatKm(vehicle.currentOdo)} •
        <strong>Total Pengeluaran Tercatat:</strong> ${formatRupiah(totalAllTime)} (${logs.length}x servis)
      </div>

      <h3>Status Komponen (Patokan KM & Waktu)</h3>
      <table>
        <thead>
          <tr>
            <th>Komponen</th>
            <th>Kategori</th>
            <th>Pergantian Terakhir</th>
            <th>Target KM</th>
            <th>Target Waktu</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((i) => `
            <tr>
              <td>${i.title}</td>
              <td>${i.category}</td>
              <td>${formatKm(i.lastServiceKm)} (${formatDateShort(i.lastServiceDate)})</td>
              <td>${formatKm(i.nextDueKm)} (Tiap ${formatKm(i.intervalKm)})</td>
              <td>${formatDateShort(i.nextDueDate.toISOString())} (${formatDurationShort(i.intervalDays)})</td>
              <td>${i.statusLabel}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h3>Riwayat Perawatan</h3>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Komponen / Pengerjaan</th>
            <th>Odometer</th>
            <th>Bengkel</th>
            <th>Biaya</th>
          </tr>
        </thead>
        <tbody>
          ${logs.map((l) => `
            <tr>
              <td>${formatDateShort(l.date)}</td>
              <td>${l.serviceTitle} ${l.notes ? `<br/><small style="color:#64748b;">${l.notes}</small>` : ''}</td>
              <td>${formatKm(l.odoKm)}</td>
              <td>${l.workshopName || '-'}</td>
              <td>${formatRupiah(l.cost)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">Dicetak dari Aplikasi Servis.In — Dibuat oleh Williyanto Adi (2026)</div>
      <script>window.onload = () => window.print();<\/script>
    </body>
    </html>
  `);
  win.document.close();
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
