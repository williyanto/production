/* BersihIn Web App — Converted from Flutter Bersih.In */
(() => {
  'use strict';

  const STORAGE_KEYS = {
    tasks: 'bersihin_web_tasks_v1',
    history: 'bersihin_web_history_v1',
    settings: 'bersihin_web_settings_v1',
    initialized: 'bersihin_web_initialized_v1',
  };

  const CATEGORIES = [
    'Ruang Utama',
    'Kamar Tidur',
    'Kamar Mandi',
    'Dapur',
    'Langit-langit',
    'Jendela',
    'Luar Rumah',
    'Elektronik',
    'Peliharaan',
    'Lainnya',
  ];

  const DAILY_TIPS = [
    {
      title: 'Sirkulasi Udara Segar',
      content: 'Buka jendela rumah selama 15 menit setiap pagi untuk mengganti udara lembap dan mencegah tumbuhnya jamur.',
      category: 'Kesehatan Rumah',
    },
    {
      title: 'Pembersih Alami Kerak',
      content: 'Campuran cuka putih dan baking soda sangat ampuh merontokkan kerak membandel di keran dan nat kamar mandi.',
      category: 'Kamar Mandi',
    },
    {
      title: 'Teknik Menyapu Efektif',
      content: 'Sapu lantai mulai dari sudut ruangan terdalam menuju pintu keluar agar kotoran tidak tercecer kembali.',
      category: 'Teknik Cepat',
    },
    {
      title: 'Kulkas Bebas Bau',
      content: 'Letakkan mangkuk kecil berisi bubuk kopi atau potongan lemon di sudut rak kulkas untuk menyerap bau tak sedap.',
      category: 'Dapur',
    },
    {
      title: 'Perawatan Spons Cuci',
      content: 'Rendam spons cuci piring dalam air mendidih atau ganti setiap 2 minggu agar tidak menjadi sarang bakteri.',
      category: 'Sanitasi',
    },
    {
      title: 'Filter AC Bersih, Listrik Hemat',
      content: 'Mencuci saringan debu AC secara rutin dapat meningkatkan kesejukan udara dan menghemat daya listrik hingga 15%.',
      category: 'Elektronik',
    },
    {
      title: 'Membersihkan Kaca Berkilau',
      content: 'Gunakan kertas koran bekas atau kain mikrofiber saat mengelap kaca agar tidak meninggalkan serat benang.',
      category: 'Jendela',
    },
    {
      title: 'Prinsip 10 Menit Setiap Hari',
      content: 'Membersihkan rumah 10-15 menit setiap hari jauh lebih ringan daripada menumpuknya hingga akhir pekan.',
      category: 'Motivasi',
    },
  ];

  const TEMPLATES = [
    {
      id: 'lebaran_deep_clean',
      name: 'Deep Cleaning Hari Raya',
      description: 'Paket pembersihan menyeluruh untuk menyambut tamu dan keluarga',
      items: [
        { title: 'Cuci Karpet & Sajadah', category: 'Ruang Utama', frequencyValue: 2, frequencyUnit: 'bulan', intervalDays: 60, notes: 'Cuci atau vacuum karpet ruang tamu dan area ibadah' },
        { title: 'Cuci Gorden & Vitrase', category: 'Jendela', frequencyValue: 3, frequencyUnit: 'bulan', intervalDays: 90, notes: 'Lepas gorden dan rendam dengan pewangi' },
        { title: 'Poles & Seka Sofa / Meja', category: 'Ruang Utama', frequencyValue: 1, frequencyUnit: 'bulan', intervalDays: 30, notes: 'Gunakan pembersih khusus bahan kulit/kain sofa' },
        { title: 'Rapikan Lemari Dapur & Toples', category: 'Dapur', frequencyValue: 1, frequencyUnit: 'bulan', intervalDays: 30, notes: 'Tata toples kue dan bersihkan remah-remah di rak' },
      ],
    },
    {
      id: 'hujan_sanitasi',
      name: 'Sanitasi Musim Hujan',
      description: 'Cegah jentik nyamuk, lumut licin, dan jamur dinding lembap',
      items: [
        { title: 'Periksa Genangan & Pot Luar', category: 'Luar Rumah', frequencyValue: 3, frequencyUnit: 'hari', intervalDays: 3, notes: 'Buang genangan air pada alas pot dan barang bekas' },
        { title: 'Sikat Lumut Teras & Carport', category: 'Luar Rumah', frequencyValue: 1, frequencyUnit: 'minggu', intervalDays: 7, notes: 'Gunakan sikat kawat dan karbol agar tidak licin' },
        { title: 'Bersihkan Talang Air Atap', category: 'Langit-langit', frequencyValue: 1, frequencyUnit: 'bulan', intervalDays: 30, notes: 'Angkat daun kering yang menyumbat pipa talang' },
      ],
    },
    {
      id: 'weekend_power',
      name: 'Weekend Quick Cleaning (30 Menit)',
      description: 'Rutinitas cepat akhir pekan agar rumah tetap segar sepanjang minggu',
      items: [
        { title: 'Ganti Sprei & Sarung Bantal', category: 'Kamar Tidur', frequencyValue: 1, frequencyUnit: 'minggu', intervalDays: 7, notes: 'Ganti sprei kasur dan jemur bantal di terik matahari' },
        { title: 'Sikat Wastafel & Kloset Cepat', category: 'Kamar Mandi', frequencyValue: 3, frequencyUnit: 'hari', intervalDays: 3, notes: 'Semprot disinfektan dan sikat ringan 5 menit' },
        { title: 'Kosongkan Seluruh Tempat Sampah', category: 'Ruang Utama', frequencyValue: 2, frequencyUnit: 'hari', intervalDays: 2, notes: 'Ganti kantong kresek dan semprot pewangi ruangan' },
      ],
    },
    {
      id: 'gudang_sortir',
      name: 'Sortir Gudang & Area Tersimpan',
      description: 'Bebaskan rumah dari tumpukan barang yang tidak terpakai',
      items: [
        { title: 'Sortir Kardus & Barang Tak Terpakai', category: 'Lainnya', frequencyValue: 2, frequencyUnit: 'bulan', intervalDays: 60, notes: 'Pisahkan barang untuk didonasikan atau didaur ulang' },
        { title: 'Pasang Kapur Barus & Anti Rayap', category: 'Lainnya', frequencyValue: 1, frequencyUnit: 'bulan', intervalDays: 30, notes: 'Ganti kamper di sudut lemari dan sudut rak gudang' },
      ],
    },
  ];

  // Date Utilities
  function startOfDay(d) {
    const dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  function addDays(d, days) {
    const dt = new Date(d);
    dt.setDate(dt.getDate() + days);
    return dt;
  }

  function isSameDay(a, b) {
    if (!a || !b) return false;
    const da = new Date(a);
    const db = new Date(b);
    return da.getFullYear() === db.getFullYear() &&
      da.getMonth() === db.getMonth() &&
      da.getDate() === db.getDate();
  }

  function daysBetween(fromDate, toDate) {
    const msPerDay = 86400000;
    return Math.round((startOfDay(toDate) - startOfDay(fromDate)) / msPerDay);
  }

  function calcIntervalDays(value, unit) {
    const v = Math.max(1, Number(value) || 1);
    if (unit === 'minggu') return v * 7;
    if (unit === 'bulan') return v * 30;
    return v;
  }

  function formatFrequency(value, unit) {
    if (unit === 'hari') return value === 1 ? 'Setiap hari' : `${value} hari sekali`;
    if (unit === 'minggu') return value === 1 ? '1 minggu sekali' : `${value} minggu sekali`;
    if (unit === 'bulan') return value === 1 ? '1 bulan sekali' : `${value} bulan sekali`;
    return `${value} ${unit} sekali`;
  }

  function formatIndoDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const d = new Date(date);
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function getDefaultPresets() {
    const today = startOfDay(new Date()).toISOString();
    const yesterday = addDays(new Date(), -1).toISOString();
    const twoDaysAgo = addDays(new Date(), -2).toISOString();
    const inThreeDays = addDays(new Date(), 3).toISOString();
    const inTenDays = addDays(new Date(), 10).toISOString();

    return [
      { id: 'preset_menyapu', title: 'Menyapu Lantai', category: 'Ruang Utama', intervalDays: 1, frequencyUnit: 'hari', frequencyValue: 1, lastCompletedAt: yesterday, nextDueDate: today, notes: 'Membersihkan debu dan remah di lantai ruangan', isPreset: true },
      { id: 'preset_mengepel', title: 'Mengepel Lantai', category: 'Ruang Utama', intervalDays: 3, frequencyUnit: 'hari', frequencyValue: 3, lastCompletedAt: twoDaysAgo, nextDueDate: today, notes: 'Mengepel lantai menggunakan cairan pembersih harum', isPreset: true },
      { id: 'preset_kamar_mandi', title: 'Membersihkan Kamar Mandi', category: 'Kamar Mandi', intervalDays: 7, frequencyUnit: 'minggu', frequencyValue: 1, lastCompletedAt: null, nextDueDate: yesterday, notes: 'Kuras bak/lantai, sikat kloset, dan bersihkan wastafel', isPreset: true },
      { id: 'preset_sarang_laba', title: 'Membersihkan Sarang Laba-laba', category: 'Langit-langit', intervalDays: 30, frequencyUnit: 'bulan', frequencyValue: 1, lastCompletedAt: null, nextDueDate: inThreeDays, notes: 'Bersihkan sudut plafon dan dinding dari sarang laba-laba', isPreset: true },
      { id: 'preset_kaca', title: 'Membersihkan Kaca', category: 'Jendela', intervalDays: 7, frequencyUnit: 'minggu', frequencyValue: 1, lastCompletedAt: null, nextDueDate: today, notes: 'Semprot dan lap kaca jendela serta cermin rumah', isPreset: true },
      { id: 'preset_got', title: 'Membersihkan Got / Selokan', category: 'Luar Rumah', intervalDays: 30, frequencyUnit: 'bulan', frequencyValue: 1, lastCompletedAt: null, nextDueDate: inTenDays, notes: 'Angkat sampah dan lumpur agar aliran selokan lancar', isPreset: true },
      { id: 'preset_aquarium', title: 'Membersihkan Aquarium', category: 'Peliharaan', intervalDays: 14, frequencyUnit: 'minggu', frequencyValue: 2, lastCompletedAt: null, nextDueDate: inThreeDays, notes: 'Ganti sebagian air (water change) dan cuci busa filter', isPreset: true },
      { id: 'preset_ac', title: 'Membersihkan AC', category: 'Elektronik', intervalDays: 90, frequencyUnit: 'bulan', frequencyValue: 3, lastCompletedAt: null, nextDueDate: inTenDays, notes: 'Cuci filter AC atau jadwalkan teknisi servis AC berkala', isPreset: true },
      { id: 'preset_kulkas', title: 'Membersihkan Kulkas', category: 'Dapur', intervalDays: 30, frequencyUnit: 'bulan', frequencyValue: 1, lastCompletedAt: null, nextDueDate: today, notes: 'Buang makanan kadaluarsa dan seka rak-rak kulkas', isPreset: true },
    ];
  }

  function getSeedHistory() {
    const now = new Date();
    return [
      { id: 'h1', taskId: 'preset_menyapu', taskTitle: 'Menyapu Lantai', category: 'Ruang Utama', completedAt: addDays(now, -3).toISOString() },
      { id: 'h2', taskId: 'preset_menyapu', taskTitle: 'Menyapu Lantai', category: 'Ruang Utama', completedAt: addDays(now, -2).toISOString() },
      { id: 'h3', taskId: 'preset_mengepel', taskTitle: 'Mengepel Lantai', category: 'Ruang Utama', completedAt: addDays(now, -2).toISOString() },
      { id: 'h4', taskId: 'preset_menyapu', taskTitle: 'Menyapu Lantai', category: 'Ruang Utama', completedAt: addDays(now, -1).toISOString() },
    ];
  }

  // State
  const state = {
    activeTab: 'timeline',
    timelineFilter: 'today', // today | overdue | completed | all
    tasksCategoryFilter: 'Semua',
    tasksSearch: '',
    houseFilter: 'Semua Area',
    tipIndex: new Date().getDate() % DAILY_TIPS.length,
    statsMode: 'monthly', // monthly | yearly
    statsYear: new Date().getFullYear(),
    statsMonth: new Date().getMonth() + 1,
    tasks: [],
    history: [],
    settings: {
      houseName: 'Rumah Utama',
      dailyReminderEnabled: true,
      reminderTime: '07:00',
      soundEnabled: true,
      theme: 'light', // light | dark
    },
    lastUndoSnapshot: null,
  };

  // Persistence
  function loadState() {
    try {
      const initialized = localStorage.getItem(STORAGE_KEYS.initialized);
      if (!initialized) {
        state.tasks = getDefaultPresets();
        state.history = getSeedHistory();
        localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(state.tasks));
        localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
        localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
        localStorage.setItem(STORAGE_KEYS.initialized, '1');
      } else {
        state.tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || '[]');
        state.history = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]');
        const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || '{}');
        state.settings = { ...state.settings, ...savedSettings };
      }
    } catch {
      state.tasks = getDefaultPresets();
      state.history = getSeedHistory();
    }
    applyTheme(state.settings.theme);
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(state.tasks));
  }

  function saveHistory() {
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
  }

  function saveSettings() {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sun = document.getElementById('themeIconSun');
    const moon = document.getElementById('themeIconMoon');
    if (sun && moon) {
      sun.classList.toggle('hidden', theme === 'dark');
      moon.classList.toggle('hidden', theme !== 'dark');
    }
  }

  // Task Status Helpers
  function isTaskCompletedToday(task) {
    return task.lastCompletedAt && isSameDay(task.lastCompletedAt, new Date());
  }

  function isTaskOverdue(task) {
    if (isTaskCompletedToday(task)) return false;
    return startOfDay(task.nextDueDate) < startOfDay(new Date());
  }

  function isTaskDueToday(task) {
    if (isTaskCompletedToday(task)) return false;
    return startOfDay(task.nextDueDate) <= startOfDay(new Date());
  }

  function getTaskStatusMeta(task) {
    if (isTaskCompletedToday(task)) {
      return { label: 'Selesai', chipClass: 'chip-success', meterClass: 'success', pct: 100 };
    }
    const diff = daysBetween(new Date(), task.nextDueDate);
    if (diff < 0) {
      return { label: `Terlambat ${Math.abs(diff)} hr`, chipClass: 'chip-danger', meterClass: 'danger', pct: 100 };
    }
    if (diff === 0) {
      return { label: 'Hari ini', chipClass: 'chip-warning', meterClass: 'warning', pct: 85 };
    }
    const pct = Math.max(12, Math.min(90, Math.round((1 - diff / Math.max(1, task.intervalDays)) * 100)));
    return { label: `${diff} hr lagi`, chipClass: 'chip-neutral', meterClass: '', pct };
  }

  function computeStreaks() {
    if (!state.history.length) return { current: 0, best: 0 };
    const daySet = new Set(
      state.history.map((h) => {
        const d = startOfDay(h.completedAt);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      })
    );
    const sorted = Array.from(daySet)
      .map((s) => {
        const [y, m, d] = s.split('-').map(Number);
        return new Date(y, m - 1, d);
      })
      .sort((a, b) => a - b);

    let best = 0;
    let run = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0 || daysBetween(sorted[i - 1], sorted[i]) === 1) {
        run += 1;
      } else {
        run = 1;
      }
      if (run > best) best = run;
    }

    const today = startOfDay(new Date());
    const yesterday = addDays(today, -1);
    const lastDay = sorted[sorted.length - 1];
    let current = 0;
    if (isSameDay(lastDay, today) || isSameDay(lastDay, yesterday)) {
      current = 1;
      for (let i = sorted.length - 1; i > 0; i--) {
        if (daysBetween(sorted[i - 1], sorted[i]) === 1) current += 1;
        else break;
      }
    }
    return { current, best };
  }

  function getRoomHealthList() {
    const map = new Map();
    state.tasks.forEach((t) => {
      if (!map.has(t.category)) {
        map.set(t.category, { room: t.category, total: 0, completed: 0, overdue: 0, dueToday: 0 });
      }
      const r = map.get(t.category);
      r.total += 1;
      if (isTaskCompletedToday(t)) r.completed += 1;
      else if (isTaskOverdue(t)) r.overdue += 1;
      else if (isTaskDueToday(t)) r.dueToday += 1;
    });
    return Array.from(map.values()).map((r) => {
      let status = 'clean';
      let label = 'Bersih';
      if (r.overdue > 0) {
        status = 'dirty';
        label = `${r.overdue} terlambat`;
      } else if (r.dueToday > 0) {
        status = 'attention';
        label = `${r.dueToday} hari ini`;
      }
      return { ...r, status, label };
    });
  }

  // Toast
  let toastTimer = null;
  function showToast(message, canUndo = false) {
    const banner = document.getElementById('toastBanner');
    const msgEl = document.getElementById('toastMessage');
    const undoBtn = document.getElementById('toastUndoBtn');
    msgEl.textContent = message;
    undoBtn.classList.toggle('hidden', !canUndo);
    banner.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      banner.classList.remove('show');
    }, 3600);
  }

  // Toggle Task Completion
  function toggleTask(taskId) {
    const idx = state.tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) return;
    const task = state.tasks[idx];
    state.lastUndoSnapshot = {
      tasks: JSON.parse(JSON.stringify(state.tasks)),
      history: JSON.parse(JSON.stringify(state.history)),
    };

    if (isTaskCompletedToday(task)) {
      // Undo today's completion
      task.lastCompletedAt = null;
      task.nextDueDate = startOfDay(new Date()).toISOString();
      state.history = state.history.filter(
        (h) => !(h.taskId === task.id && isSameDay(h.completedAt, new Date()))
      );
      saveTasks();
      saveHistory();
      renderAll();
      showToast(`Status "${task.title}" dikembalikan`, false);
    } else {
      const now = new Date();
      task.lastCompletedAt = now.toISOString();
      task.nextDueDate = startOfDay(addDays(now, task.intervalDays)).toISOString();
      state.history.push({
        id: `rec_${Date.now()}`,
        taskId: task.id,
        taskTitle: task.title,
        category: task.category,
        completedAt: now.toISOString(),
      });
      saveTasks();
      saveHistory();
      renderAll();
      showToast(`Tugas ${task.title} selesai ✨`, true);
    }
  }

  // Escape HTML
  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Render Header
  function renderHeader() {
    const streaks = computeStreaks();
    const houseLabel = state.houseFilter === 'Semua Area'
      ? state.settings.houseName
      : `${state.settings.houseName} • ${state.houseFilter}`;
    document.getElementById('headerHouseName').textContent = houseLabel;
    document.getElementById('headerSubtitle').textContent =
      `${state.tasks.length} tugas • Pengingat ${state.settings.reminderTime}`;
    const streakBtn = document.getElementById('streakBadgeBtn');
    streakBtn.classList.toggle('inactive', streaks.current === 0);
    document.getElementById('headerStreakText').textContent = `${streaks.current} hari`;
    document.getElementById('notifyDot').classList.toggle('hidden', !state.settings.dailyReminderEnabled);
  }

  // Task Card HTML
  function renderTaskCard(task, showMeter = false) {
    const done = isTaskCompletedToday(task);
    const meta = getTaskStatusMeta(task);
    return `
      <article class="task-card ${done ? 'completed' : ''}" data-task-id="${esc(task.id)}">
        <button class="task-check-btn ${done ? 'checked' : ''}" data-action="toggle" data-id="${esc(task.id)}" type="button" aria-label="Tandai ${esc(task.title)}">
          ${done ? '<svg class="icon icon-xs" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></svg>' : ''}
        </button>
        <div class="task-body" data-action="edit" data-id="${esc(task.id)}">
          <div class="task-title-row">
            <span class="task-title">${esc(task.title)}</span>
            <span class="chip ${meta.chipClass}">${esc(meta.label)}</span>
          </div>
          <div class="task-meta-row">
            <span class="chip chip-primary">${esc(task.category)}</span>
            <span class="task-freq">
              <svg class="icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              ${esc(formatFrequency(task.frequencyValue, task.frequencyUnit))}
            </span>
          </div>
          ${task.notes ? `<p class="task-notes">${esc(task.notes)}</p>` : ''}
          ${showMeter ? `
            <div class="meter-track meter-track-sm">
              <div class="meter-fill ${meta.meterClass}" style="width: ${meta.pct}%"></div>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }

  // Render Tab 1: Timeline
  function renderTimeline() {
    const container = document.getElementById('view-timeline');
    const scopedTasks = state.houseFilter === 'Semua Area'
      ? state.tasks
      : state.tasks.filter((t) => t.category === state.houseFilter);

    const dueToday = scopedTasks.filter(isTaskDueToday);
    const overdue = scopedTasks.filter(isTaskOverdue);
    const completedToday = scopedTasks.filter(isTaskCompletedToday);
    const totalTodayScope = dueToday.length + completedToday.length;
    const ratePct = totalTodayScope === 0 ? 100 : Math.round((completedToday.length / totalTodayScope) * 100);
    const meterClass = ratePct >= 80 ? 'success' : ratePct >= 40 ? 'warning' : 'danger';

    let list = scopedTasks;
    if (state.timelineFilter === 'today') {
      list = scopedTasks.filter((t) => isTaskDueToday(t) || isTaskCompletedToday(t));
    } else if (state.timelineFilter === 'overdue') {
      list = overdue;
    } else if (state.timelineFilter === 'completed') {
      list = completedToday;
    }

    const rooms = getRoomHealthList();
    const tip = DAILY_TIPS[state.tipIndex % DAILY_TIPS.length];

    container.innerHTML = `
      <div class="page-header-row">
        <div>
          <h1 class="page-title">Ringkasan Hari Ini</h1>
          <p class="page-caption">${esc(formatIndoDate(new Date()))}</p>
        </div>
        <button class="btn-primary btn-sm" id="quickAddBtn" type="button">
          <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          Tugas
        </button>
      </div>

      <!-- High-Density Progress Card -->
      <div class="card">
        <div class="summary-top">
          <div>
            <span class="page-caption">Progres Pembersihan</span>
            <div class="summary-stats">
              <span class="summary-big-num">${ratePct}%</span>
              <span class="summary-of">${completedToday.length} dari ${totalTodayScope} selesai</span>
            </div>
          </div>
          <span class="chip ${overdue.length > 0 ? 'chip-danger' : 'chip-success'}">
            ${overdue.length > 0 ? `${overdue.length} Terlambat` : 'On Track'}
          </span>
        </div>
        <div class="meter-track">
          <div class="meter-fill ${meterClass}" style="width: ${ratePct}%"></div>
        </div>
        <div class="summary-kpi-grid">
          <div class="kpi-mini">
            <span class="kpi-mini-val">${dueToday.length}</span>
            <span class="kpi-mini-lbl">Jatuh Tempo</span>
          </div>
          <div class="kpi-mini">
            <span class="kpi-mini-val">${overdue.length}</span>
            <span class="kpi-mini-lbl">Terlambat</span>
          </div>
          <div class="kpi-mini">
            <span class="kpi-mini-val">${completedToday.length}</span>
            <span class="kpi-mini-lbl">Selesai Hari Ini</span>
          </div>
        </div>
      </div>

      <!-- Room Health Strip -->
      <div class="section-label-row">
        <span class="section-label">Kesehatan Area</span>
        ${state.houseFilter !== 'Semua Area' ? `<button class="toast-action" id="resetAreaFilterBtn" type="button">Reset</button>` : ''}
      </div>
      <div class="h-scroll">
        ${rooms.map((r) => `
          <div class="room-pill-card" data-room="${esc(r.room)}">
            <div class="room-pill-head">
              <span class="room-pill-name">${esc(r.room)}</span>
              <span class="room-dot ${r.status}"></span>
            </div>
            <div class="room-pill-meta">${esc(r.label)} • ${r.total} tugas</div>
          </div>
        `).join('')}
      </div>

      <!-- Daily Tip -->
      <div class="tip-card">
        <div class="tip-icon-box" aria-hidden="true">
          <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
        </div>
        <div class="tip-body">
          <div class="tip-head">
            <span class="tip-title">${esc(tip.title)}</span>
            <button class="chip chip-primary" id="nextTipBtn" type="button" style="border:none;cursor:pointer;">Tips lain</button>
          </div>
          <p class="tip-text">${esc(tip.content)}</p>
        </div>
      </div>

      <!-- Segmented Filter -->
      <div class="segmented-control" role="tablist" aria-label="Filter timeline">
        <button class="seg-btn ${state.timelineFilter === 'today' ? 'active' : ''}" data-tl-filter="today" type="button">Hari Ini</button>
        <button class="seg-btn ${state.timelineFilter === 'overdue' ? 'active' : ''}" data-tl-filter="overdue" type="button">Terlambat</button>
        <button class="seg-btn ${state.timelineFilter === 'completed' ? 'active' : ''}" data-tl-filter="completed" type="button">Selesai</button>
        <button class="seg-btn ${state.timelineFilter === 'all' ? 'active' : ''}" data-tl-filter="all" type="button">Semua</button>
      </div>

      <!-- Task List -->
      <div class="task-list">
        ${list.length > 0 ? list.map((t) => renderTaskCard(t, false)).join('') : `
          <div class="empty-state">
            <div class="empty-state-title">Tidak ada tugas di filter ini</div>
            <div class="empty-state-sub">Semua area bersih atau coba pilih tab filter lainnya.</div>
          </div>
        `}
      </div>
    `;
  }

  // Render Tab 2: All Tasks
  function renderTasks() {
    const container = document.getElementById('view-tasks');
    const q = state.tasksSearch.trim().toLowerCase();
    const filtered = state.tasks.filter((t) => {
      const catOk = state.tasksCategoryFilter === 'Semua' || t.category === state.tasksCategoryFilter;
      const qOk = !q || t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || (t.notes || '').toLowerCase().includes(q);
      return catOk && qOk;
    });

    const cats = ['Semua', ...new Set(state.tasks.map((t) => t.category))];

    container.innerHTML = `
      <div class="page-header-row">
        <div>
          <h1 class="page-title">Daftar Tugas</h1>
          <p class="page-caption">${state.tasks.length} jadwal aktif di rumah</p>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="btn-secondary btn-sm" id="openTemplatesBtn" type="button">Template</button>
          <button class="btn-primary btn-sm" id="addTaskBtn" type="button">
            <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            Baru
          </button>
        </div>
      </div>

      <div class="field-wrap">
        <span class="field-prefix">
          <svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <input class="input-field input-with-prefix" id="taskSearchInput" type="search" placeholder="Cari tugas, ruangan, atau catatan..." value="${esc(state.tasksSearch)}" />
      </div>

      <div class="chip-filter-row">
        ${cats.map((c) => `
          <button class="filter-chip ${state.tasksCategoryFilter === c ? 'active' : ''}" data-cat-filter="${esc(c)}" type="button">${esc(c)}</button>
        `).join('')}
      </div>

      <div class="task-list">
        ${filtered.length > 0 ? filtered.map((t) => renderTaskCard(t, true)).join('') : `
          <div class="empty-state">
            <div class="empty-state-title">Tugas tidak ditemukan</div>
            <div class="empty-state-sub">Coba kata kunci lain atau tambahkan tugas kustom baru.</div>
          </div>
        `}
      </div>
    `;
  }

  // Render Tab 3: Statistics
  function renderStats() {
    const container = document.getElementById('view-stats');
    const streaks = computeStreaks();
    const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    const periodHistory = state.history.filter((h) => {
      const d = new Date(h.completedAt);
      if (state.statsMode === 'monthly') {
        return d.getFullYear() === state.statsYear && (d.getMonth() + 1) === state.statsMonth;
      }
      return d.getFullYear() === state.statsYear;
    });

    // Bar chart data
    let bars = [];
    if (state.statsMode === 'monthly') {
      // Group into 6 buckets of ~5 days for clean mobile high-density chart
      const daysInMonth = new Date(state.statsYear, state.statsMonth, 0).getDate();
      const buckets = [
        { label: '1-5', count: 0 },
        { label: '6-10', count: 0 },
        { label: '11-15', count: 0 },
        { label: '16-20', count: 0 },
        { label: '21-25', count: 0 },
        { label: `26-${daysInMonth}`, count: 0 },
      ];
      periodHistory.forEach((h) => {
        const day = new Date(h.completedAt).getDate();
        const idx = Math.min(5, Math.floor((day - 1) / 5));
        buckets[idx].count += 1;
      });
      bars = buckets;
    } else {
      bars = monthsShort.map((m, idx) => ({
        label: m,
        count: periodHistory.filter((h) => new Date(h.completedAt).getMonth() === idx).length,
      }));
    }
    const maxBar = Math.max(1, ...bars.map((b) => b.count));

    // Category Breakdown
    const catCounts = {};
    periodHistory.forEach((h) => {
      catCounts[h.category] = (catCounts[h.category] || 0) + 1;
    });
    const catEntries = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);

    // Badges
    const totalAll = state.history.length;
    const customCount = state.tasks.filter((t) => !t.isPreset).length;
    const badges = [
      { title: 'Pemula Rajin 🥉', desc: 'Streak 3 hari berturut-turut', cur: streaks.best, target: 3 },
      { title: 'Pahlawan Kebersihan 🥈', desc: 'Streak 7 hari berturut-turut', cur: streaks.best, target: 7 },
      { title: 'Langkah Awal ✨', desc: 'Selesaikan 10 tugas', cur: totalAll, target: 10 },
      { title: 'Perencana Teladan 📋', desc: 'Tambah 3 tugas kustom', cur: customCount, target: 3 },
    ];

    container.innerHTML = `
      <div class="page-header-row">
        <div>
          <h1 class="page-title">Statistik & Tren</h1>
          <p class="page-caption">Pantau konsistensi kebersihan rumah</p>
        </div>
      </div>

      <div class="segmented-control">
        <button class="seg-btn ${state.statsMode === 'monthly' ? 'active' : ''}" data-stats-mode="monthly" type="button">Bulanan</button>
        <button class="seg-btn ${state.statsMode === 'yearly' ? 'active' : ''}" data-stats-mode="yearly" type="button">Tahunan</button>
      </div>

      <div class="period-nav">
        <button class="icon-btn" id="prevPeriodBtn" type="button" aria-label="Periode sebelumnya">
          <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span class="period-label">
          ${state.statsMode === 'monthly' ? `${monthsFull[state.statsMonth - 1]} ${state.statsYear}` : `Tahun ${state.statsYear}`}
        </span>
        <button class="icon-btn" id="nextPeriodBtn" type="button" aria-label="Periode berikutnya">
          <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div class="metric-grid-2">
        <div class="metric-card">
          <span class="metric-lbl">Selesai Periode Ini</span>
          <span class="metric-val">${periodHistory.length}</span>
        </div>
        <div class="metric-card">
          <span class="metric-lbl">Total Sepanjang Masa</span>
          <span class="metric-val">${totalAll}</span>
        </div>
        <div class="metric-card">
          <span class="metric-lbl">Streak Aktif</span>
          <span class="metric-val">${streaks.current} hari</span>
        </div>
        <div class="metric-card">
          <span class="metric-lbl">Rekor Streak</span>
          <span class="metric-val">${streaks.best} hari</span>
        </div>
      </div>

      <!-- Bar Chart Card -->
      <div class="card">
        <div class="section-label-row" style="margin-top:0;">
          <span class="card-title">Aktivitas Pembersihan</span>
          <span class="chip chip-primary">${periodHistory.length} aktivitas</span>
        </div>
        <div class="chart-bars">
          ${bars.map((b) => {
            const hPct = b.count === 0 ? 6 : Math.max(14, Math.round((b.count / maxBar) * 100));
            return `
              <div class="chart-col" title="${b.label}: ${b.count} tugas">
                <div class="chart-bar ${b.count > 0 ? 'has-val' : ''}" style="height: ${hPct}%"></div>
                <span class="chart-col-lbl">${esc(b.label)}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="card">
        <span class="card-title">Distribusi Area</span>
        ${catEntries.length > 0 ? catEntries.map(([cat, count]) => {
          const pct = Math.round((count / periodHistory.length) * 100);
          return `
            <div style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;font-size:12px;">
                <span style="font-weight:600;">${esc(cat)}</span>
                <span style="color:var(--text-muted);">${count} (${pct}%)</span>
              </div>
              <div class="meter-track meter-track-sm">
                <div class="meter-fill" style="width:${pct}%"></div>
              </div>
            </div>
          `;
        }).join('') : '<p class="page-caption" style="margin-top:8px;">Belum ada catatan selesai pada periode ini.</p>'}
      </div>

      <!-- Badges -->
      <div class="section-label-row">
        <span class="section-label">Lencana Pencapaian</span>
      </div>
      <div class="badge-grid">
        ${badges.map((b) => {
          const unlocked = b.cur >= b.target;
          const pct = Math.min(100, Math.round((b.cur / b.target) * 100));
          return `
            <div class="badge-card ${unlocked ? '' : 'locked'}">
              <div class="badge-head">
                <span class="badge-title">${esc(b.title)}</span>
                <span class="chip ${unlocked ? 'chip-success' : 'chip-neutral'}">${Math.min(b.cur, b.target)}/${b.target}</span>
              </div>
              <p class="badge-desc">${esc(b.desc)}</p>
              <div class="meter-track meter-track-sm">
                <div class="meter-fill ${unlocked ? 'success' : ''}" style="width:${pct}%"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Render Tab 4: Settings
  function renderSettings() {
    const container = document.getElementById('view-settings');
    container.innerHTML = `
      <div class="page-header-row">
        <div>
          <h1 class="page-title">Pengaturan</h1>
          <p class="page-caption">Preferensi pengingat, tema, dan data</p>
        </div>
      </div>

      <div class="card">
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Pengingat Harian</span>
            <span class="setting-desc">Notifikasi cek kebersihan rumah setiap hari</span>
          </div>
          <label class="switch">
            <input type="checkbox" id="settingReminderToggle" ${state.settings.dailyReminderEnabled ? 'checked' : ''} />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Jam Pengingat</span>
            <span class="setting-desc">Waktu notifikasi harian dikirim</span>
          </div>
          <div class="field-wrap" style="width:128px;">
            <input class="input-field input-with-suffix" id="settingReminderTime" type="time" value="${esc(state.settings.reminderTime)}" />
            <span class="field-suffix-badge">WIB</span>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Suara Umpan Balik</span>
            <span class="setting-desc">Efek suara saat tugas diselesaikan</span>
          </div>
          <label class="switch">
            <input type="checkbox" id="settingSoundToggle" ${state.settings.soundEnabled ? 'checked' : ''} />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="card">
        <div class="setting-info" style="margin-bottom:10px;">
          <span class="setting-name">Tema Tampilan</span>
          <span class="setting-desc">Pilih mode terang atau gelap</span>
        </div>
        <div class="segmented-control">
          <button class="seg-btn ${state.settings.theme === 'light' ? 'active' : ''}" data-theme-set="light" type="button">Terang</button>
          <button class="seg-btn ${state.settings.theme === 'dark' ? 'active' : ''}" data-theme-set="dark" type="button">Gelap</button>
        </div>
      </div>

      <div class="card" style="display:flex;flex-direction:column;gap:8px;">
        <span class="card-title">Cadangkan & Data</span>
        <button class="btn-secondary" id="exportBackupBtn" type="button">Ekspor Data JSON</button>
        <button class="btn-secondary btn-danger-ghost" id="resetDataBtn" type="button">Reset ke Jadwal Bawaan</button>
      </div>

      <div class="card card-compact" style="text-align:center;">
        <div style="font-weight:700;font-size:13px;">BersihIn Web v1.0</div>
        <div class="page-caption">Diubah dari aplikasi Flutter Bersih.In • Soft Minimalist UI</div>
      </div>
    `;
  }

  function renderAll() {
    renderHeader();
    renderTimeline();
    renderTasks();
    renderStats();
    renderSettings();
  }

  // Bottom Sheet Helpers
  function openSheet(title, bodyHtml) {
    document.getElementById('sheetTitle').textContent = title;
    document.getElementById('sheetBody').innerHTML = bodyHtml;
    document.getElementById('sheetBackdrop').classList.add('open');
  }

  function closeSheet() {
    document.getElementById('sheetBackdrop').classList.remove('open');
  }

  function openTaskFormSheet(taskId = null) {
    const task = taskId ? state.tasks.find((t) => t.id === taskId) : null;
    const title = task ? 'Edit Tugas' : 'Tambah Tugas Kustom';
    openSheet(title, `
      <form id="taskForm" data-edit-id="${esc(task ? task.id : '')}" style="display:flex;flex-direction:column;gap:12px;">
        <div class="input-group">
          <label class="input-label" for="tfTitle">Nama Tugas</label>
          <input class="input-field" id="tfTitle" required placeholder="Misal: Cuci gorden ruang tamu" value="${esc(task ? task.title : '')}" />
        </div>

        <div class="input-group">
          <label class="input-label" for="tfCategory">Area / Kategori</label>
          <select class="select-field" id="tfCategory">
            ${CATEGORIES.map((c) => `<option value="${esc(c)}" ${task && task.category === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}
          </select>
        </div>

        <div class="form-row-2">
          <div class="input-group">
            <label class="input-label" for="tfFreqVal">Setiap</label>
            <div class="field-wrap">
              <input class="input-field input-with-suffix" id="tfFreqVal" type="number" min="1" max="365" required value="${task ? task.frequencyValue : 1}" />
              <span class="field-suffix-badge" id="tfUnitBadge">${esc(task ? task.frequencyUnit : 'hari')}</span>
            </div>
          </div>
          <div class="input-group">
            <label class="input-label" for="tfFreqUnit">Satuan</label>
            <select class="select-field" id="tfFreqUnit">
              <option value="hari" ${!task || task.frequencyUnit === 'hari' ? 'selected' : ''}>Hari</option>
              <option value="minggu" ${task && task.frequencyUnit === 'minggu' ? 'selected' : ''}>Minggu</option>
              <option value="bulan" ${task && task.frequencyUnit === 'bulan' ? 'selected' : ''}>Bulan</option>
            </select>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label" for="tfNotes">Catatan Tambahan (Opsional)</label>
          <textarea class="textarea-field" id="tfNotes" rows="2" placeholder="Detail langkah atau alat yang dibutuhkan...">${esc(task ? task.notes || '' : '')}</textarea>
        </div>

        <div class="sheet-footer">
          <button class="btn-primary" type="submit">${task ? 'Simpan Perubahan' : 'Tambahkan Tugas'}</button>
          ${task ? `<button class="btn-secondary btn-danger-ghost" id="deleteTaskBtn" data-id="${esc(task.id)}" type="button">Hapus Tugas</button>` : ''}
          <button class="btn-secondary" id="cancelSheetBtn" type="button">Batal</button>
        </div>
      </form>
    `);

    const unitSel = document.getElementById('tfFreqUnit');
    const unitBadge = document.getElementById('tfUnitBadge');
    unitSel.addEventListener('change', () => {
      unitBadge.textContent = unitSel.value;
    });

    document.getElementById('cancelSheetBtn').addEventListener('click', closeSheet);

    const delBtn = document.getElementById('deleteTaskBtn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        state.tasks = state.tasks.filter((t) => t.id !== task.id);
        saveTasks();
        closeSheet();
        renderAll();
        showToast(`Tugas "${task.title}" dihapus`);
      });
    }

    document.getElementById('taskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const titleVal = document.getElementById('tfTitle').value.trim();
      const categoryVal = document.getElementById('tfCategory').value;
      const freqVal = Math.max(1, parseInt(document.getElementById('tfFreqVal').value, 10) || 1);
      const freqUnit = document.getElementById('tfFreqUnit').value;
      const notesVal = document.getElementById('tfNotes').value.trim();
      const intervalDays = calcIntervalDays(freqVal, freqUnit);

      if (!titleVal) return;

      if (task) {
        task.title = titleVal;
        task.category = categoryVal;
        task.frequencyValue = freqVal;
        task.frequencyUnit = freqUnit;
        task.intervalDays = intervalDays;
        task.notes = notesVal;
      } else {
        state.tasks.unshift({
          id: `custom_${Date.now()}`,
          title: titleVal,
          category: categoryVal,
          intervalDays,
          frequencyUnit: freqUnit,
          frequencyValue: freqVal,
          lastCompletedAt: null,
          nextDueDate: startOfDay(new Date()).toISOString(),
          notes: notesVal,
          isPreset: false,
        });
      }

      saveTasks();
      closeSheet();
      renderAll();
      showToast(task ? 'Perubahan disimpan' : `Tugas "${titleVal}" ditambahkan ✨`);
    });
  }

  function openTemplatesSheet() {
    openSheet('Paket Template Pembersihan', `
      <p class="page-caption">Pilih paket untuk menambahkan beberapa jadwal sekaligus.</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${TEMPLATES.map((tpl) => `
          <div class="card card-compact">
            <div class="summary-top">
              <div>
                <div class="card-title">${esc(tpl.name)}</div>
                <p class="page-caption" style="margin-top:2px;">${esc(tpl.description)}</p>
              </div>
              <span class="chip chip-primary">${tpl.items.length} tugas</span>
            </div>
            <button class="btn-secondary btn-sm apply-tpl-btn" data-tpl-id="${esc(tpl.id)}" type="button" style="margin-top:10px;width:100%;">
              Terapkan Paket
            </button>
          </div>
        `).join('')}
      </div>
    `);

    document.querySelectorAll('.apply-tpl-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tpl = TEMPLATES.find((t) => t.id === btn.dataset.tplId);
        if (!tpl) return;
        let added = 0;
        tpl.items.forEach((item) => {
          const exists = state.tasks.some((t) => t.title.toLowerCase() === item.title.toLowerCase());
          if (!exists) {
            state.tasks.push({
              id: `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
              title: item.title,
              category: item.category,
              intervalDays: item.intervalDays,
              frequencyUnit: item.frequencyUnit,
              frequencyValue: item.frequencyValue,
              lastCompletedAt: null,
              nextDueDate: startOfDay(new Date()).toISOString(),
              notes: item.notes,
              isPreset: false,
            });
            added += 1;
          }
        });
        saveTasks();
        closeSheet();
        renderAll();
        showToast(added > 0 ? `${added} tugas dari "${tpl.name}" ditambahkan` : 'Semua tugas paket sudah ada');
      });
    });
  }

  function openHouseSwitcherSheet() {
    const rooms = ['Semua Area', ...new Set(state.tasks.map((t) => t.category))];
    openSheet('Pilih Area / Profil Rumah', `
      <div class="input-group">
        <label class="input-label" for="houseNameInput">Nama Hunian</label>
        <div style="display:flex;gap:8px;">
          <input class="input-field" id="houseNameInput" value="${esc(state.settings.houseName)}" />
          <button class="btn-primary btn-sm" id="saveHouseNameBtn" type="button">Simpan</button>
        </div>
      </div>
      <div class="section-label-row">
        <span class="section-label">Filter Area di Timeline</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${rooms.map((r) => `
          <button class="btn-secondary switch-area-btn" data-area="${esc(r)}" type="button" style="justify-content:space-between;${state.houseFilter === r ? 'border-color:var(--accent);color:var(--accent);background:var(--accent-soft);' : ''}">
            <span>${esc(r)}</span>
            <span>${state.houseFilter === r ? 'Aktif' : ''}</span>
          </button>
        `).join('')}
      </div>
    `);

    document.getElementById('saveHouseNameBtn').addEventListener('click', () => {
      const val = document.getElementById('houseNameInput').value.trim();
      if (val) {
        state.settings.houseName = val;
        saveSettings();
        renderHeader();
        showToast('Nama hunian diperbarui');
      }
    });

    document.querySelectorAll('.switch-area-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.houseFilter = btn.dataset.area;
        closeSheet();
        renderAll();
      });
    });
  }

  // Global Event Delegation
  function bindEvents() {
    // Bottom Navigation
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        state.activeTab = tab;
        document.querySelectorAll('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.tab === tab));
        document.querySelectorAll('.tab-view').forEach((v) => v.classList.toggle('active', v.id === `view-${tab}`));
        document.getElementById('appContent').scrollTop = 0;
      });
    });

    // Header actions
    document.getElementById('headerSwitcherBtn').addEventListener('click', openHouseSwitcherSheet);

    document.getElementById('themeToggleBtn').addEventListener('click', () => {
      state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
      applyTheme(state.settings.theme);
      saveSettings();
      renderSettings();
    });

    document.getElementById('notifyTestBtn').addEventListener('click', () => {
      showToast('Pengingat: "Apakah sudah membersihkan rumah hari ini?" 🔔');
    });

    document.getElementById('streakBadgeBtn').addEventListener('click', () => {
      document.querySelector('.nav-item[data-tab="stats"]').click();
    });

    // Toast Undo
    document.getElementById('toastUndoBtn').addEventListener('click', () => {
      if (!state.lastUndoSnapshot) return;
      state.tasks = state.lastUndoSnapshot.tasks;
      state.history = state.lastUndoSnapshot.history;
      state.lastUndoSnapshot = null;
      saveTasks();
      saveHistory();
      renderAll();
      showToast('Aksi dibatalkan');
    });

    // Sheet close
    document.getElementById('sheetCloseBtn').addEventListener('click', closeSheet);
    document.getElementById('sheetBackdrop').addEventListener('click', (e) => {
      if (e.target.id === 'sheetBackdrop') closeSheet();
    });

    // Delegated clicks inside appContent
    const content = document.getElementById('appContent');
    content.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('[data-action="toggle"]');
      if (toggleBtn) {
        toggleTask(toggleBtn.dataset.id);
        return;
      }

      const editBody = e.target.closest('[data-action="edit"]');
      if (editBody) {
        openTaskFormSheet(editBody.dataset.id);
        return;
      }

      const tlFilter = e.target.closest('[data-tl-filter]');
      if (tlFilter) {
        state.timelineFilter = tlFilter.dataset.tlFilter;
        renderTimeline();
        return;
      }

      const roomCard = e.target.closest('[data-room]');
      if (roomCard) {
        state.houseFilter = roomCard.dataset.room;
        renderAll();
        return;
      }

      if (e.target.closest('#resetAreaFilterBtn')) {
        state.houseFilter = 'Semua Area';
        renderAll();
        return;
      }

      if (e.target.closest('#nextTipBtn')) {
        state.tipIndex = (state.tipIndex + 1) % DAILY_TIPS.length;
        renderTimeline();
        return;
      }

      if (e.target.closest('#quickAddBtn') || e.target.closest('#addTaskBtn')) {
        openTaskFormSheet();
        return;
      }

      if (e.target.closest('#openTemplatesBtn')) {
        openTemplatesSheet();
        return;
      }

      const catFilter = e.target.closest('[data-cat-filter]');
      if (catFilter) {
        state.tasksCategoryFilter = catFilter.dataset.catFilter;
        renderTasks();
        return;
      }

      const statsMode = e.target.closest('[data-stats-mode]');
      if (statsMode) {
        state.statsMode = statsMode.dataset.statsMode;
        renderStats();
        return;
      }

      if (e.target.closest('#prevPeriodBtn')) {
        if (state.statsMode === 'monthly') {
          if (state.statsMonth === 1) {
            state.statsMonth = 12;
            state.statsYear -= 1;
          } else {
            state.statsMonth -= 1;
          }
        } else {
          state.statsYear -= 1;
        }
        renderStats();
        return;
      }

      if (e.target.closest('#nextPeriodBtn')) {
        const now = new Date();
        if (state.statsMode === 'monthly') {
          if (state.statsYear === now.getFullYear() && state.statsMonth >= now.getMonth() + 1) return;
          if (state.statsMonth === 12) {
            state.statsMonth = 1;
            state.statsYear += 1;
          } else {
            state.statsMonth += 1;
          }
        } else {
          if (state.statsYear >= now.getFullYear()) return;
          state.statsYear += 1;
        }
        renderStats();
        return;
      }

      const themeBtn = e.target.closest('[data-theme-set]');
      if (themeBtn) {
        state.settings.theme = themeBtn.dataset.themeSet;
        applyTheme(state.settings.theme);
        saveSettings();
        renderSettings();
        return;
      }

      if (e.target.closest('#exportBackupBtn')) {
        const payload = JSON.stringify({ tasks: state.tasks, history: state.history, settings: state.settings }, null, 2);
        const blob = new Blob([payload], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bersihin-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Backup JSON berhasil diunduh');
        return;
      }

      if (e.target.closest('#resetDataBtn')) {
        localStorage.removeItem(STORAGE_KEYS.initialized);
        loadState();
        renderAll();
        showToast('Data dikembalikan ke jadwal bawaan');
      }
    });

    content.addEventListener('input', (e) => {
      if (e.target.id === 'taskSearchInput') {
        state.tasksSearch = e.target.value;
        const caret = e.target.selectionStart;
        renderTasks();
        const input = document.getElementById('taskSearchInput');
        if (input) {
          input.focus();
          input.setSelectionRange(caret, caret);
        }
      }
    });

    content.addEventListener('change', (e) => {
      if (e.target.id === 'settingReminderToggle') {
        state.settings.dailyReminderEnabled = e.target.checked;
        saveSettings();
        renderHeader();
        showToast(e.target.checked ? 'Pengingat harian diaktifkan' : 'Pengingat harian dimatikan');
      } else if (e.target.id === 'settingReminderTime') {
        state.settings.reminderTime = e.target.value || '07:00';
        saveSettings();
        renderHeader();
        showToast(`Jam pengingat diubah ke ${state.settings.reminderTime}`);
      } else if (e.target.id === 'settingSoundToggle') {
        state.settings.soundEnabled = e.target.checked;
        saveSettings();
      }
    });
  }

  // Init
  loadState();
  bindEvents();
  renderAll();
})();
