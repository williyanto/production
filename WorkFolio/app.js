/* WorkFolio Web App — Converted from Flutter WorkFolio */
(() => {
  'use strict';

  const STORAGE_KEYS = {
    users: 'workfolio_web_users_v1',
    activeUserId: 'workfolio_web_active_user_v1',
    theme: 'workfolio_web_theme_v1',
  };

  const MONTHS_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ];

  const DAYS_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const PROJECT_TAG_SUGGESTIONS = [
    '#ProjectAlpha',
    '#Maintenance',
    '#Development',
    '#Deployment',
    '#Audit',
  ];

  const ACTIVITY_TYPES = {
    overtime: { id: 'overtime', label: 'Lembur', chipClass: 'chip-accent', color: 'var(--accent)', unit: 'Jam' },
    leave: { id: 'leave', label: 'Cuti', chipClass: 'chip-sky', color: 'var(--sky)', unit: 'Hari' },
    lateArrival: { id: 'lateArrival', label: 'Terlambat', chipClass: 'chip-warning', color: 'var(--warning)', unit: 'Menit' },
    earlyDeparture: { id: 'earlyDeparture', label: 'Pulang Awal', chipClass: 'chip-warning', color: 'var(--warning)', unit: 'Menit' },
    training: { id: 'training', label: 'Training', chipClass: 'chip-purple', color: 'var(--purple)', unit: 'Jam' },
    sickLeave: { id: 'sickLeave', label: 'Sakit / Izin', chipClass: 'chip-teal', color: 'var(--teal)', unit: 'Hari' },
    sanction: { id: 'sanction', label: 'Sanksi', chipClass: 'chip-danger', color: 'var(--danger)', unit: 'Hari' },
    custom: { id: 'custom', label: 'Kustom', chipClass: 'chip-slate', color: 'var(--slate)', unit: 'Jam' },
  };

  function defaultTemplates() {
    return [
      { id: 'tpl_l1', code: 'L1', label: 'Shift Malam (L1)', startHour: 23, startMinute: 0, endHour: 7, endMinute: 0, duration: 8 },
      { id: 'tpl_l2', code: 'L2', label: 'Shift Pagi (L2)', startHour: 7, startMinute: 0, endHour: 15, endMinute: 45, duration: 8.75 },
      { id: 'tpl_l3', code: 'L3', label: 'Shift Sore (L3)', startHour: 15, startMinute: 30, endHour: 23, endMinute: 15, duration: 7.75 },
    ];
  }

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function toIsoDate(d) {
    const dt = d instanceof Date ? d : new Date(d);
    return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`;
  }

  function addDaysIso(baseDate, offsetDays) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + offsetDays);
    return toIsoDate(d);
  }

  function createDefaultState() {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth(); // 0-indexed
    const mkDate = (monthOffset, day) => {
      const dt = new Date(y, m + monthOffset, Math.min(day, 28));
      return toIsoDate(dt);
    };

    const userId = 'user_williyanto';
    const user = {
      id: userId,
      userName: 'Williyanto Adi',
      companyName: 'PT Mengkoding Indonesia',
      workStartDate: '2023-03-01',
      annualLeaveQuota: 12,
      lastYearLeaveQuota: 3,
      lastYearLeaveExpiryMonth: 3,
      maxWeeklyOvertimeHours: 18,
      maxMonthlyOvertimeHours: 50,
      enableDailyReminder: true,
      dailyReminderHour: 17,
      dailyReminderMinute: 0,
      documentWarningDays: 30,
      templates: defaultTemplates(),
      activities: [
        {
          id: 'act_1',
          type: 'overtime',
          date: mkDate(0, Math.max(1, now.getDate() - 1)),
          duration: 8,
          customTitle: 'Shift Malam (L1)',
          note: 'Monitoring deploy release v2.4 & cek database',
          projectTag: '#Deployment',
          sanctionEndDate: null,
        },
        {
          id: 'act_2',
          type: 'overtime',
          date: mkDate(0, Math.max(1, now.getDate() - 3)),
          duration: 8.75,
          customTitle: 'Shift Pagi (L2)',
          note: 'Sinkronisasi API gateway dan patch keamanan',
          projectTag: '#ProjectAlpha',
          sanctionEndDate: null,
        },
        {
          id: 'act_3',
          type: 'training',
          date: mkDate(0, Math.max(1, now.getDate() - 5)),
          duration: 3,
          customTitle: 'Workshop Clean Architecture',
          note: 'Sesi internal engineering sharing',
          projectTag: '#Development',
          sanctionEndDate: null,
        },
        {
          id: 'act_4',
          type: 'leave',
          date: mkDate(-1, 14),
          duration: 2,
          customTitle: 'Cuti Tahunan',
          note: 'Urusan keluarga di luar kota',
          projectTag: '',
          sanctionEndDate: null,
        },
        {
          id: 'act_5',
          type: 'overtime',
          date: mkDate(-1, 20),
          duration: 7.75,
          customTitle: 'Shift Sore (L3)',
          note: 'Audit log bulanan server produksi',
          projectTag: '#Audit',
          sanctionEndDate: null,
        },
        {
          id: 'act_6',
          type: 'lateArrival',
          date: mkDate(0, Math.max(1, now.getDate() - 7)),
          duration: 15,
          customTitle: 'Terlambat Masuk',
          note: 'Hujan deras & kemacetan di jalur utama',
          projectTag: '',
          sanctionEndDate: null,
        },
        {
          id: 'act_7',
          type: 'overtime',
          date: mkDate(-2, 11),
          duration: 12,
          customTitle: 'Maintenance Server',
          note: 'Migrasi storage & backup terjadwal',
          projectTag: '#Maintenance',
          sanctionEndDate: null,
        },
      ],
      documents: [
        {
          id: 'doc_1',
          title: 'Kontrak Kerja PKWT',
          documentNumber: 'HRD/PKWT/2026/084',
          issueDate: addDaysIso(now, -340),
          expiryDate: addDaysIso(now, 25),
          note: 'Perlu konfirmasi perpanjangan dengan HRD',
        },
        {
          id: 'doc_2',
          title: 'SIM A Pribadi',
          documentNumber: '1234-5678-0091',
          issueDate: addDaysIso(now, -1200),
          expiryDate: addDaysIso(now, 420),
          note: 'Berlaku untuk kendaraan operasional',
        },
        {
          id: 'doc_3',
          title: 'Sertifikat Keamanan Kerja',
          documentNumber: 'CERT-K3-8821',
          issueDate: addDaysIso(now, -400),
          expiryDate: addDaysIso(now, -5),
          note: 'Jadwalkan ulang ujian perpanjangan sertifikat',
        },
      ],
    };

    return { users: [user], activeUserId: userId };
  }

  // App State
  const now = new Date();
  const state = {
    users: [],
    activeUserId: null,
    activeTab: 'activities',
    profileSubTab: 'profile', // 'profile' | 'settings'
    selectedYear: now.getFullYear(),
    selectedMonth: now.getMonth(), // 0-11
    calendarSelectedDate: toIsoDate(now),
    statsYear: now.getFullYear(),
    filterType: 'all',
    searchQuery: '',
    dismissedReminder: false,
    theme: 'light',
    toastTimer: null,
    lastDeletedActivity: null,
  };

  function loadStorage() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        state.theme = savedTheme;
      }
      const rawUsers = localStorage.getItem(STORAGE_KEYS.users);
      const rawActive = localStorage.getItem(STORAGE_KEYS.activeUserId);
      if (rawUsers) {
        const parsed = JSON.parse(rawUsers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.users = parsed;
          state.activeUserId = parsed.some((u) => u.id === rawActive) ? rawActive : parsed[0].id;
          return;
        }
      }
    } catch (_) {}

    const def = createDefaultState();
    state.users = def.users;
    state.activeUserId = def.activeUserId;
    saveStorage();
  }

  function saveStorage() {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(state.users));
    localStorage.setItem(STORAGE_KEYS.activeUserId, state.activeUserId);
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  }

  function getActiveUser() {
    return state.users.find((u) => u.id === state.activeUserId) || state.users[0];
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatNumber(n) {
    const rounded = Math.round(n * 100) / 100;
    return Number.isInteger(rounded) ? String(rounded) : String(rounded);
  }

  function formatDateIndo(isoStr) {
    const [y, m, d] = isoStr.split('-').map(Number);
    return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
  }

  function formatDuration(act) {
    const dur = Number(act.duration) || 0;
    switch (act.type) {
      case 'overtime':
      case 'training':
        return `${formatNumber(dur)} Jam`;
      case 'leave':
      case 'sickLeave':
        return `${formatNumber(dur)} Hari`;
      case 'lateArrival':
      case 'earlyDeparture':
        if (dur >= 60) {
          const h = Math.floor(dur / 60);
          const mins = Math.round(dur % 60);
          return mins > 0 ? `${h}j ${mins}m` : `${h} Jam`;
        }
        return `${Math.round(dur)} Menit`;
      case 'sanction': {
        if (!act.sanctionEndDate) return 'Sanksi';
        const rem = diffDaysFromToday(act.sanctionEndDate);
        return rem > 0 ? `Sisa ${rem} Hari` : 'Selesai';
      }
      case 'custom':
        return dur > 0 ? `${formatNumber(dur)} Jam` : 'Catatan';
      default:
        return '';
    }
  }

  function diffDaysFromToday(isoDate) {
    const today = new Date();
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [y, m, d] = isoDate.split('-').map(Number);
    const t1 = new Date(y, m - 1, d);
    return Math.round((t1 - t0) / 86400000);
  }

  function calculateLeaveSummary(user, year) {
    const entries = (user.activities || [])
      .filter((a) => a.type === 'leave' && Number(a.date.slice(0, 4)) === year)
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));

    let lastYearRem = Number(user.lastYearLeaveQuota) || 0;
    let usedLastYear = 0;
    let usedAnnual = 0;
    const expiryMonth = Number(user.lastYearLeaveExpiryMonth) || 3;

    for (const entry of entries) {
      let needed = Number(entry.duration) || 0;
      const entryMonth = Number(entry.date.slice(5, 7));
      if (entryMonth <= expiryMonth && lastYearRem > 0) {
        if (needed <= lastYearRem) {
          usedLastYear += needed;
          lastYearRem -= needed;
          needed = 0;
        } else {
          usedLastYear += lastYearRem;
          needed -= lastYearRem;
          lastYearRem = 0;
        }
      }
      if (needed > 0) usedAnnual += needed;
    }

    const annualQuota = Number(user.annualLeaveQuota) || 12;
    const remainingAnnual = Math.max(0, annualQuota - usedAnnual);
    const remainingLastYear = Math.max(0, (Number(user.lastYearLeaveQuota) || 0) - usedLastYear);
    const activeAtMonth = (month1Based) => {
      if (month1Based <= expiryMonth && (Number(user.lastYearLeaveQuota) || 0) > 0) {
        return remainingAnnual + remainingLastYear;
      }
      return remainingAnnual;
    };

    return {
      annualQuota,
      lastYearQuota: Number(user.lastYearLeaveQuota) || 0,
      expiryMonth,
      usedFromLastYear: usedLastYear,
      usedFromAnnual: usedAnnual,
      totalTaken: usedLastYear + usedAnnual,
      remainingAnnual,
      remainingLastYear,
      activeAtMonth,
    };
  }

  function checkOvertimeLimits(user) {
    const ref = new Date();
    const dayOfWeek = ref.getDay() === 0 ? 7 : ref.getDay(); // 1=Mon..7=Sun
    const monday = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate() - (dayOfWeek - 1));
    const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    const monIso = toIsoDate(monday);
    const sunIso = toIsoDate(sunday);
    const curPrefix = `${ref.getFullYear()}-${pad2(ref.getMonth() + 1)}`;

    const acts = user.activities || [];
    const weeklyHours = acts
      .filter((a) => a.type === 'overtime' && a.date >= monIso && a.date <= sunIso)
      .reduce((s, a) => s + (Number(a.duration) || 0), 0);

    const monthlyHours = acts
      .filter((a) => a.type === 'overtime' && a.date.startsWith(curPrefix))
      .reduce((s, a) => s + (Number(a.duration) || 0), 0);

    const maxW = Number(user.maxWeeklyOvertimeHours) || 18;
    const maxM = Number(user.maxMonthlyOvertimeHours) || 50;

    let weeklyLevel = 'normal';
    if (weeklyHours > maxW) weeklyLevel = 'exceeded';
    else if (weeklyHours >= maxW * 0.8 && weeklyHours > 0) weeklyLevel = 'warning';

    let monthlyLevel = 'normal';
    if (monthlyHours > maxM) monthlyLevel = 'exceeded';
    else if (monthlyHours >= maxM * 0.8 && monthlyHours > 0) monthlyLevel = 'warning';

    return { weeklyHours, maxW, monthlyHours, maxM, weeklyLevel, monthlyLevel };
  }

  function getDocStatus(doc, warningDays) {
    const days = diffDaysFromToday(doc.expiryDate);
    if (days < 0) {
      return { level: 'danger', chipClass: 'chip-danger', label: 'Kedaluwarsa', text: `Lewat ${Math.abs(days)} hari`, days };
    }
    if (days <= warningDays) {
      const txt = days === 0 ? 'Hari ini!' : days === 1 ? 'Besok!' : `Sisa ${days} hari`;
      return { level: 'warning', chipClass: 'chip-warning', label: 'Segera Habis', text: txt, days };
    }
    const labelText = days < 30 ? `Sisa ${days} hari` : days < 365 ? `Sisa ${Math.floor(days / 30)} bulan` : `Sisa ${Math.floor(days / 365)} tahun`;
    return { level: 'success', chipClass: 'chip-success', label: 'Aman', text: labelText, days };
  }

  // Theme
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const sun = document.getElementById('themeIconSun');
    const moon = document.getElementById('themeIconMoon');
    if (state.theme === 'dark') {
      sun.classList.add('hidden');
      moon.classList.remove('hidden');
    } else {
      sun.classList.remove('hidden');
      moon.classList.add('hidden');
    }
  }

  // Toast
  function showToast(message, undoCallback = null) {
    const banner = document.getElementById('toastBanner');
    const msgEl = document.getElementById('toastMessage');
    const undoBtn = document.getElementById('toastUndoBtn');
    msgEl.textContent = message;
    if (undoCallback) {
      undoBtn.classList.remove('hidden');
      undoBtn.onclick = () => {
        undoCallback();
        banner.classList.remove('show');
      };
    } else {
      undoBtn.classList.add('hidden');
      undoBtn.onclick = null;
    }
    banner.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      banner.classList.remove('show');
    }, 3400);
  }

  // Bottom Sheet
  function openSheet(title, htmlContent, onMount = null) {
    document.getElementById('sheetTitle').textContent = title;
    const body = document.getElementById('sheetBody');
    body.innerHTML = htmlContent;
    const backdrop = document.getElementById('sheetBackdrop');
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    if (typeof onMount === 'function') onMount(body);
  }

  function closeSheet() {
    const backdrop = document.getElementById('sheetBackdrop');
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  // Header & Badges
  function renderHeader() {
    const user = getActiveUser();
    const initials = user.userName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0].toUpperCase())
      .join('') || 'WF';

    document.getElementById('headerAvatar').textContent = initials;
    document.getElementById('headerUserName').textContent = user.userName;
    document.getElementById('headerCompanyName').textContent = user.companyName;

    const limits = checkOvertimeLimits(user);
    const chip = document.getElementById('headerOvertimeChip');
    const chipText = document.getElementById('headerOvertimeText');
    chipText.textContent = `${formatNumber(limits.weeklyHours)}/${formatNumber(limits.maxW)}j`;
    chip.classList.remove('is-warning', 'is-danger');
    if (limits.weeklyLevel === 'exceeded') chip.classList.add('is-danger');
    else if (limits.weeklyLevel === 'warning') chip.classList.add('is-warning');

    const warnDays = Number(user.documentWarningDays) || 30;
    const hasAlertDocs = (user.documents || []).some((d) => {
      const days = diffDaysFromToday(d.expiryDate);
      return days <= warnDays;
    });
    document.getElementById('docsBadgeDot').classList.toggle('hidden', !hasAlertDocs);
  }

  // Render All Views
  function renderAll() {
    renderHeader();
    renderActivitiesTab();
    renderCalendarTab();
    renderStatsTab();
    renderDocsTab();
    renderProfileTab();
  }

  // =========================================================
  // TAB 1: AKTIVITAS
  // =========================================================
  function renderActivitiesTab() {
    const container = document.getElementById('view-activities');
    const user = getActiveUser();
    const monthPrefix = `${state.selectedYear}-${pad2(state.selectedMonth + 1)}`;
    const isCurrentMonth = state.selectedYear === now.getFullYear() && state.selectedMonth === now.getMonth();

    const monthActs = (user.activities || [])
      .filter((a) => a.date.startsWith(monthPrefix))
      .sort((a, b) => b.date.localeCompare(a.date));

    const totalOvertime = monthActs
      .filter((a) => a.type === 'overtime')
      .reduce((s, a) => s + (Number(a.duration) || 0), 0);
    const overtimeSessions = monthActs.filter((a) => a.type === 'overtime').length;
    const lateCount = monthActs.filter((a) => a.type === 'lateArrival').length;
    const earlyCount = monthActs.filter((a) => a.type === 'earlyDeparture').length;
    const sickCount = monthActs.filter((a) => a.type === 'sickLeave').length;

    const leaveSum = calculateLeaveSummary(user, state.selectedYear);
    const activeLeaveRemaining = leaveSum.activeAtMonth(state.selectedMonth + 1);
    const maxMonthly = Number(user.maxMonthlyOvertimeHours) || 50;
    const monthPct = Math.min(100, Math.round((totalOvertime / maxMonthly) * 100));
    const meterTone = totalOvertime > maxMonthly ? 'is-danger' : totalOvertime >= maxMonthly * 0.8 ? 'is-warning' : 'is-accent';

    const limits = checkOvertimeLimits(user);
    const todayIso = toIsoDate(now);
    const hasTodayActivity = (user.activities || []).some((a) => a.date === todayIso);

    const warnDays = Number(user.documentWarningDays) || 30;
    const alertDocs = (user.documents || []).filter((d) => diffDaysFromToday(d.expiryDate) <= warnDays);

    // Apply search & filter
    const q = state.searchQuery.trim().toLowerCase();
    const filtered = monthActs.filter((a) => {
      if (state.filterType !== 'all' && a.type !== state.filterType) return false;
      if (q) {
        const hay = `${a.customTitle} ${a.note} ${a.projectTag} ${ACTIVITY_TYPES[a.type]?.label || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    let html = `
      <div class="sticky-month-bar">
        <div class="month-nav-group">
          <button class="month-arrow-btn" id="actPrevMonthBtn" type="button" aria-label="Bulan sebelumnya">
            <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button class="month-picker-btn" id="actMonthPickerBtn" type="button">
            <span>${MONTHS_ID[state.selectedMonth]} ${state.selectedYear}</span>
            <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button class="month-arrow-btn" id="actNextMonthBtn" type="button" aria-label="Bulan berikutnya">
            <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div class="month-bar-actions">
          ${!isCurrentMonth ? `<button class="today-jump-btn" id="actJumpTodayBtn" type="button">Bulan Ini</button>` : ''}
        </div>
      </div>

      <div class="search-box">
        <svg class="icon icon-sm search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input class="search-input" id="actSearchInput" type="text" placeholder="Cari catatan, shift, atau #ProjectTag..." value="${escapeHtml(state.searchQuery)}" />
        ${state.searchQuery ? `<button class="search-clear-btn" id="actSearchClearBtn" type="button" aria-label="Hapus pencarian"><svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>` : ''}
      </div>
    `;

    // Smart Daily Reminder
    if (user.enableDailyReminder && !hasTodayActivity && !state.dismissedReminder && isCurrentMonth) {
      html += `
        <div class="alert-card tone-accent">
          <div class="alert-icon" style="color: var(--accent);">
            <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
          </div>
          <div class="alert-body">
            <div class="alert-title">Rekap Kerja Hari Ini</div>
            <div class="alert-desc">Kamu belum mencatat aktivitas kerja hari ini (${formatDateIndo(todayIso)}).</div>
            <div style="display:flex; gap:8px; align-items:center; margin-top:8px;">
              <button class="alert-cta" id="reminderQuickAddBtn" type="button" style="margin-top:0;">+ Catat Sekarang</button>
              <button class="btn btn-outline btn-sm" id="reminderDismissBtn" type="button">Nanti</button>
            </div>
          </div>
        </div>
      `;
    }

    // Disnaker PP 35/2021 Cap Alert
    if (limits.weeklyLevel !== 'normal' || limits.monthlyLevel !== 'normal') {
      const isDanger = limits.weeklyLevel === 'exceeded' || limits.monthlyLevel === 'exceeded';
      const tone = isDanger ? 'tone-danger' : 'tone-warning';
      const title = limits.weeklyLevel === 'exceeded'
        ? 'Batas Lembur Mingguan Terlampaui (PP 35/2021)'
        : limits.weeklyLevel === 'warning'
        ? 'Mendekati Batas Lembur Mingguan'
        : limits.monthlyLevel === 'exceeded'
        ? 'Target Lembur Bulanan Terlampaui'
        : 'Mendekati Batas Lembur Bulanan';
      const msg = `Minggu ini: ${formatNumber(limits.weeklyHours)}/${formatNumber(limits.maxW)} Jam • Bulan ini: ${formatNumber(limits.monthlyHours)}/${formatNumber(limits.maxM)} Jam.`;

      html += `
        <div class="alert-card ${tone}" id="disnakerAlertCard" style="cursor:pointer;">
          <div class="alert-icon" style="color: var(--${isDanger ? 'danger' : 'warning'});">
            <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <div class="alert-body">
            <div class="alert-title">${title}</div>
            <div class="alert-desc">${msg} Ketuk untuk info regulasi.</div>
          </div>
        </div>
      `;
    }

    // Expiring Document Alert
    if (alertDocs.length > 0 && isCurrentMonth) {
      html += `
        <div class="alert-card tone-warning" id="homeDocAlertCard" style="cursor:pointer;">
          <div class="alert-icon" style="color: var(--warning);">
            <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div class="alert-body">
            <div class="alert-title">${alertDocs.length} Dokumen Perlu Perhatian</div>
            <div class="alert-desc">${escapeHtml(alertDocs[0].title)} (${getDocStatus(alertDocs[0], warnDays).text}). Ketuk untuk kelola.</div>
          </div>
        </div>
      `;
    }

    // KPI Cards
    html += `
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Total Lembur</span>
            <div class="kpi-icon-box" style="background:var(--accent-soft); color:var(--accent);">
              <svg class="icon icon-xs" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            </div>
          </div>
          <div class="kpi-value">${formatNumber(totalOvertime)} <span style="font-size:12px; font-weight:600; color:var(--text-muted);">Jam</span></div>
          <div class="meter-track"><div class="meter-fill ${meterTone}" style="width:${monthPct}%"></div></div>
          <div class="kpi-meta">${overtimeSessions} sesi • Batas ${formatNumber(maxMonthly)}j</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-label">Sisa Cuti Aktif</span>
            <div class="kpi-icon-box" style="background:var(--sky-soft); color:var(--sky);">
              <svg class="icon icon-xs" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
            </div>
          </div>
          <div class="kpi-value">${formatNumber(activeLeaveRemaining)} <span style="font-size:12px; font-weight:600; color:var(--text-muted);">Hari</span></div>
          <div class="kpi-meta">
            ${lateCount > 0 ? `<span class="chip chip-warning">Telat ${lateCount}x</span>` : ''}
            ${earlyCount > 0 ? `<span class="chip chip-warning">Pulang Awal ${earlyCount}x</span>` : ''}
            ${sickCount > 0 ? `<span class="chip chip-teal">Sakit ${sickCount}x</span>` : ''}
            ${lateCount === 0 && earlyCount === 0 && sickCount === 0 ? 'Disiplin bersih bulan ini' : ''}
          </div>
        </div>
      </div>
    `;

    // Category Filter Pills
    html += `
      <div class="filter-scroll" id="actFilterScroll">
        <button class="filter-pill ${state.filterType === 'all' ? 'active' : ''}" data-filter="all" type="button">Semua (${monthActs.length})</button>
        ${Object.values(ACTIVITY_TYPES).map((t) => {
          const count = monthActs.filter((a) => a.type === t.id).length;
          if (count === 0 && state.filterType !== t.id) return '';
          return `<button class="filter-pill ${state.filterType === t.id ? 'active' : ''}" data-filter="${t.id}" type="button">${t.label} (${count})</button>`;
        }).join('')}
      </div>
    `;

    // Timeline List
    if (filtered.length === 0) {
      html += `
        <div class="empty-state">
          <svg class="icon icon-lg" style="color:var(--text-muted);" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <h4>Belum ada catatan aktivitas</h4>
          <p>Ketuk tombol <strong>+</strong> di kanan bawah untuk mencatat lembur, cuti, atau kegiatan kerja.</p>
        </div>
      `;
    } else {
      html += `<div class="activity-list">`;
      for (const act of filtered) {
        const meta = ACTIVITY_TYPES[act.type] || ACTIVITY_TYPES.custom;
        const [yy, mm, dd] = act.date.split('-').map(Number);
        const dObj = new Date(yy, mm - 1, dd);
        const dayName = DAYS_SHORT[dObj.getDay()];
        const title = act.customTitle?.trim() || meta.label;
        const durText = formatDuration(act);

        html += `
          <article class="activity-card" data-act-id="${act.id}">
            <div class="date-squircle">
              <span class="day-num">${pad2(dd)}</span>
              <span class="day-name">${dayName}</span>
            </div>
            <div class="activity-main">
              <div class="activity-top-row">
                <div class="activity-title">${escapeHtml(title)}</div>
                ${durText ? `<span class="duration-pill">${escapeHtml(durText)}</span>` : ''}
              </div>
              <div class="activity-chips">
                <span class="chip ${meta.chipClass}">${meta.label}</span>
                ${act.projectTag ? `<span class="chip chip-slate">${escapeHtml(act.projectTag)}</span>` : ''}
              </div>
              ${act.note ? `<p class="activity-note">${escapeHtml(act.note)}</p>` : ''}
            </div>
          </article>
        `;
      }
      html += `</div>`;
    }

    container.innerHTML = html;

    // Bind Events
    document.getElementById('actPrevMonthBtn').onclick = () => shiftMonth(-1);
    document.getElementById('actNextMonthBtn').onclick = () => shiftMonth(1);
    document.getElementById('actMonthPickerBtn').onclick = openMonthYearPickerSheet;
    const jumpBtn = document.getElementById('actJumpTodayBtn');
    if (jumpBtn) {
      jumpBtn.onclick = () => {
        state.selectedYear = now.getFullYear();
        state.selectedMonth = now.getMonth();
        renderActivitiesTab();
      };
    }

    const searchInput = document.getElementById('actSearchInput');
    searchInput.oninput = (e) => {
      state.searchQuery = e.target.value;
      renderActivitiesTab();
      const el = document.getElementById('actSearchInput');
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    };
    const clearBtn = document.getElementById('actSearchClearBtn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        state.searchQuery = '';
        renderActivitiesTab();
      };
    }

    const remAdd = document.getElementById('reminderQuickAddBtn');
    if (remAdd) remAdd.onclick = () => openActivitySheet(null, todayIso);
    const remDis = document.getElementById('reminderDismissBtn');
    if (remDis) remDis.onclick = () => { state.dismissedReminder = true; renderActivitiesTab(); };

    const disnakerCard = document.getElementById('disnakerAlertCard');
    if (disnakerCard) disnakerCard.onclick = openDisnakerInfoSheet;

    const docAlert = document.getElementById('homeDocAlertCard');
    if (docAlert) docAlert.onclick = () => switchTab('docs');

    container.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.onclick = () => {
        state.filterType = btn.dataset.filter;
        renderActivitiesTab();
      };
    });

    container.querySelectorAll('.activity-card').forEach((card) => {
      card.onclick = () => {
        const act = (user.activities || []).find((a) => a.id === card.dataset.actId);
        if (act) openActivitySheet(act);
      };
    });
  }

  function shiftMonth(delta) {
    let m = state.selectedMonth + delta;
    let y = state.selectedYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    state.selectedMonth = m;
    state.selectedYear = y;
    renderActivitiesTab();
    renderCalendarTab();
  }

  // =========================================================
  // TAB 2: KALENDER
  // =========================================================
  function renderCalendarTab() {
    const container = document.getElementById('view-calendar');
    const user = getActiveUser();
    const y = state.selectedYear;
    const m = state.selectedMonth;
    const monthPrefix = `${y}-${pad2(m + 1)}`;
    const todayIso = toIsoDate(now);

    const firstDay = new Date(y, m, 1);
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0

    const actsByDate = {};
    for (const a of user.activities || []) {
      if (a.date.startsWith(monthPrefix)) {
        if (!actsByDate[a.date]) actsByDate[a.date] = [];
        actsByDate[a.date].push(a);
      }
    }

    // Ensure selected date is inside current month
    if (!state.calendarSelectedDate.startsWith(monthPrefix)) {
      state.calendarSelectedDate = todayIso.startsWith(monthPrefix) ? todayIso : `${monthPrefix}-01`;
    }

    let gridHtml = '';
    for (let i = 0; i < startOffset; i++) {
      gridHtml += `<div class="cal-cell is-empty"></div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${monthPrefix}-${pad2(d)}`;
      const dayActs = actsByDate[iso] || [];
      const isToday = iso === todayIso;
      const isSel = iso === state.calendarSelectedDate;
      const dots = dayActs.slice(0, 3).map((a) => {
        const meta = ACTIVITY_TYPES[a.type] || ACTIVITY_TYPES.custom;
        return `<span class="cal-dot" style="background-color:${meta.color};"></span>`;
      }).join('');

      gridHtml += `
        <button class="cal-cell ${isToday ? 'is-today' : ''} ${isSel ? 'is-selected' : ''}" data-cal-date="${iso}" type="button">
          <span>${d}</span>
          <div class="cal-dots">${dots}</div>
        </button>
      `;
    }

    const selActs = actsByDate[state.calendarSelectedDate] || [];

    let html = `
      <div class="sticky-month-bar">
        <div class="month-nav-group">
          <button class="month-arrow-btn" id="calPrevBtn" type="button"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
          <button class="month-picker-btn" id="calPickerBtn" type="button">
            <span>${MONTHS_ID[m]} ${y}</span>
            <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button class="month-arrow-btn" id="calNextBtn" type="button"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
        </div>
        <button class="today-jump-btn" id="calAddOnDateBtn" type="button">+ Catat</button>
      </div>

      <div class="card">
        <div class="calendar-weekdays">
          <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
        </div>
        <div class="calendar-grid">${gridHtml}</div>
      </div>

      <div class="section-header">
        <div>
          <div class="section-title">${formatDateIndo(state.calendarSelectedDate)}</div>
          <div class="section-subtitle">${selActs.length} aktivitas tercatat</div>
        </div>
        <button class="btn btn-primary btn-sm" id="calLogSelectedBtn" type="button">+ Catat di Tanggal Ini</button>
      </div>
    `;

    if (selActs.length === 0) {
      html += `
        <div class="empty-state">
          <h4>Tidak ada aktivitas pada tanggal ini</h4>
          <p>Ketuk "Catat di Tanggal Ini" untuk menambahkan catatan.</p>
        </div>
      `;
    } else {
      html += `<div class="activity-list">`;
      for (const act of selActs) {
        const meta = ACTIVITY_TYPES[act.type] || ACTIVITY_TYPES.custom;
        html += `
          <article class="activity-card" data-cal-act-id="${act.id}">
            <div class="activity-main">
              <div class="activity-top-row">
                <div class="activity-title">${escapeHtml(act.customTitle?.trim() || meta.label)}</div>
                ${formatDuration(act) ? `<span class="duration-pill">${escapeHtml(formatDuration(act))}</span>` : ''}
              </div>
              <div class="activity-chips">
                <span class="chip ${meta.chipClass}">${meta.label}</span>
                ${act.projectTag ? `<span class="chip chip-slate">${escapeHtml(act.projectTag)}</span>` : ''}
              </div>
              ${act.note ? `<p class="activity-note">${escapeHtml(act.note)}</p>` : ''}
            </div>
          </article>
        `;
      }
      html += `</div>`;
    }

    container.innerHTML = html;

    document.getElementById('calPrevBtn').onclick = () => shiftMonth(-1);
    document.getElementById('calNextBtn').onclick = () => shiftMonth(1);
    document.getElementById('calPickerBtn').onclick = openMonthYearPickerSheet;
    document.getElementById('calAddOnDateBtn').onclick = () => openActivitySheet(null, state.calendarSelectedDate);
    document.getElementById('calLogSelectedBtn').onclick = () => openActivitySheet(null, state.calendarSelectedDate);

    container.querySelectorAll('[data-cal-date]').forEach((cell) => {
      cell.onclick = () => {
        state.calendarSelectedDate = cell.dataset.calDate;
        renderCalendarTab();
      };
    });

    container.querySelectorAll('[data-cal-act-id]').forEach((card) => {
      card.onclick = () => {
        const act = (user.activities || []).find((a) => a.id === card.dataset.calActId);
        if (act) openActivitySheet(act);
      };
    });
  }

  // =========================================================
  // TAB 3: STATISTIK
  // =========================================================
  function renderStatsTab() {
    const container = document.getElementById('view-stats');
    const user = getActiveUser();
    const yr = state.statsYear;
    const yearPrefix = `${yr}-`;
    const yearActs = (user.activities || []).filter((a) => a.date.startsWith(yearPrefix));

    // Monthly overtime array (12 months)
    const monthlyOT = Array(12).fill(0);
    for (const a of yearActs) {
      if (a.type === 'overtime') {
        const mIdx = Number(a.date.slice(5, 7)) - 1;
        if (mIdx >= 0 && mIdx < 12) monthlyOT[mIdx] += Number(a.duration) || 0;
      }
    }

    const totalAnnualOT = monthlyOT.reduce((s, v) => s + v, 0);
    const activeMonths = monthlyOT.filter((v) => v > 0).length;
    const avgMonthlyOT = activeMonths > 0 ? totalAnnualOT / activeMonths : 0;
    const maxOT = Math.max(1, ...monthlyOT);
    const peakMonthIdx = monthlyOT.indexOf(Math.max(...monthlyOT));

    const leaveSum = calculateLeaveSummary(user, yr);
    const totalQuotaPool = leaveSum.annualQuota + leaveSum.lastYearQuota;
    const leaveUsedPct = totalQuotaPool > 0 ? Math.min(100, Math.round((leaveSum.totalTaken / totalQuotaPool) * 100)) : 0;

    // Project Tag Breakdown
    const tagMap = {};
    for (const a of yearActs) {
      if (a.type === 'overtime' && a.projectTag) {
        tagMap[a.projectTag] = (tagMap[a.projectTag] || 0) + (Number(a.duration) || 0);
      }
    }
    const tagEntries = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);
    const maxTagHours = tagEntries.length > 0 ? tagEntries[0][1] : 1;

    let barsHtml = '';
    for (let i = 0; i < 12; i++) {
      const val = monthlyOT[i];
      const pct = val > 0 ? Math.max(8, Math.round((val / maxOT) * 100)) : 0;
      const isPeak = val > 0 && i === peakMonthIdx;
      barsHtml += `
        <div class="bar-col">
          <span class="bar-val">${val > 0 ? formatNumber(val) : ''}</span>
          <div class="bar-track">
            <div class="bar-fill ${isPeak ? 'is-peak' : ''}" style="height:${pct}%"></div>
          </div>
          <span class="bar-label">${MONTHS_SHORT[i][0]}</span>
        </div>
      `;
    }

    let html = `
      <div class="sticky-month-bar">
        <div class="month-nav-group">
          <button class="month-arrow-btn" id="statsPrevYearBtn" type="button"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
          <span class="month-picker-btn" style="cursor:default;">Rekap Tahun ${yr}</span>
          <button class="month-arrow-btn" id="statsNextYearBtn" type="button"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
        </div>
        <button class="today-jump-btn" id="statsExportBtn" type="button">Ekspor</button>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Lembur ${yr}</span>
          <div class="kpi-value">${formatNumber(totalAnnualOT)} <span style="font-size:12px; color:var(--text-muted);">Jam</span></div>
          <div class="kpi-meta">Rata-rata ${formatNumber(avgMonthlyOT)}j / bln aktif</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Bulan Puncak</span>
          <div class="kpi-value" style="font-size:17px;">${Math.max(...monthlyOT) > 0 ? MONTHS_ID[peakMonthIdx] : '—'}</div>
          <div class="kpi-meta">${Math.max(...monthlyOT) > 0 ? `${formatNumber(monthlyOT[peakMonthIdx])} Jam lembur` : 'Belum ada data'}</div>
        </div>
      </div>

      <div class="card">
        <div class="section-header" style="margin-bottom:4px;">
          <span class="section-title">Tren Lembur 12 Bulan</span>
          <span class="chip chip-accent">${activeMonths} bln aktif</span>
        </div>
        <div class="bar-chart-wrap">${barsHtml}</div>
      </div>

      <div class="card">
        <div class="section-header" style="margin-bottom:8px;">
          <span class="section-title">Kuota & Pemakaian Cuti ${yr}</span>
          <span class="chip chip-sky">${formatNumber(leaveSum.totalTaken)}/${totalQuotaPool} Hari</span>
        </div>
        <div class="meter-track" style="margin-bottom:8px;">
          <div class="meter-fill is-accent" style="width:${leaveUsedPct}%"></div>
        </div>
        <div class="kpi-meta" style="justify-content:space-between;">
          <span>Sisa Tahunan: <strong>${formatNumber(leaveSum.remainingAnnual)} Hari</strong></span>
          <span>Carry-over: <strong>${formatNumber(leaveSum.remainingLastYear)} Hari</strong> (s/d ${MONTHS_SHORT[leaveSum.expiryMonth - 1]})</span>
        </div>
      </div>
    `;

    if (tagEntries.length > 0) {
      html += `
        <div class="card">
          <div class="section-header" style="margin-bottom:10px;">
            <span class="section-title">Alokasi Lembur per Proyek</span>
            <span class="section-subtitle">${tagEntries.length} tag</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${tagEntries.map(([tag, hrs]) => {
              const pct = Math.round((hrs / maxTagHours) * 100);
              return `
                <div class="alloc-row">
                  <div class="alloc-top">
                    <span>${escapeHtml(tag)}</span>
                    <span>${formatNumber(hrs)} Jam</span>
                  </div>
                  <div class="meter-track"><div class="meter-fill is-accent" style="width:${pct}%"></div></div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Frequency Breakdown
    html += `
      <div class="card">
        <div class="section-header" style="margin-bottom:10px;">
          <span class="section-title">Frekuensi Aktivitas (${yearActs.length})</span>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          ${Object.values(ACTIVITY_TYPES).map((t) => {
            const cnt = yearActs.filter((a) => a.type === t.id).length;
            return `<span class="chip ${t.chipClass}">${t.label}: ${cnt}</span>`;
          }).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;

    document.getElementById('statsPrevYearBtn').onclick = () => { state.statsYear -= 1; renderStatsTab(); };
    document.getElementById('statsNextYearBtn').onclick = () => { state.statsYear += 1; renderStatsTab(); };
    document.getElementById('statsExportBtn').onclick = openExportSheet;
  }

  // =========================================================
  // TAB 4: DOKUMEN
  // =========================================================
  function renderDocsTab() {
    const container = document.getElementById('view-docs');
    const user = getActiveUser();
    const warnDays = Number(user.documentWarningDays) || 30;
    const docs = (user.documents || []).slice().sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));

    const expiredCnt = docs.filter((d) => diffDaysFromToday(d.expiryDate) < 0).length;
    const soonCnt = docs.filter((d) => { const x = diffDaysFromToday(d.expiryDate); return x >= 0 && x <= warnDays; }).length;

    let html = `
      <div class="section-header">
        <div>
          <div class="section-title" style="font-size:17px;">Pengingat Dokumen</div>
          <div class="section-subtitle">Pantau masa berlaku SIM, KTP, Kontrak & Sertifikat</div>
        </div>
        <button class="btn btn-primary btn-sm" id="docAddBtn" type="button">+ Tambah</button>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Kedaluwarsa</span>
          <div class="kpi-value" style="color:${expiredCnt > 0 ? 'var(--danger)' : 'var(--text-primary)'};">${expiredCnt}</div>
          <div class="kpi-meta">Perlu segera diperpanjang</div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Segera Habis (H-${warnDays})</span>
          <div class="kpi-value" style="color:${soonCnt > 0 ? 'var(--warning)' : 'var(--text-primary)'};">${soonCnt}</div>
          <div class="kpi-meta">Total ${docs.length} dokumen tersimpan</div>
        </div>
      </div>
    `;

    if (docs.length === 0) {
      html += `
        <div class="empty-state">
          <h4>Belum ada dokumen dipantau</h4>
          <p>Tambahkan SIM, Kontrak Kerja, atau Sertifikat untuk menerima pengingat masa berlaku.</p>
        </div>
      `;
    } else {
      for (const doc of docs) {
        const st = getDocStatus(doc, warnDays);
        const totalSpan = Math.max(1, diffDaysFromToday(doc.expiryDate) - diffDaysFromToday(doc.issueDate));
        const pct = st.days < 0 ? 100 : Math.min(100, Math.max(8, Math.round((1 - st.days / Math.max(365, totalSpan)) * 100)));
        const meterCls = st.level === 'danger' ? 'is-danger' : st.level === 'warning' ? 'is-warning' : '';

        html += `
          <article class="doc-card" data-doc-id="${doc.id}">
            <div class="doc-top">
              <div>
                <div class="doc-title">${escapeHtml(doc.title)}</div>
                ${doc.documentNumber ? `<div class="doc-num">No: ${escapeHtml(doc.documentNumber)}</div>` : ''}
              </div>
              <span class="chip ${st.chipClass}">${st.text}</span>
            </div>
            <div class="meter-track"><div class="meter-fill ${meterCls}" style="width:${pct}%"></div></div>
            <div class="doc-dates">
              <span>Terbit: ${formatDateIndo(doc.issueDate)}</span>
              <span>Berlaku s/d: <strong>${formatDateIndo(doc.expiryDate)}</strong></span>
            </div>
            ${doc.note ? `<p class="activity-note">${escapeHtml(doc.note)}</p>` : ''}
          </article>
        `;
      }
    }

    container.innerHTML = html;

    document.getElementById('docAddBtn').onclick = () => openDocSheet(null);
    container.querySelectorAll('.doc-card').forEach((card) => {
      card.onclick = () => {
        const doc = (user.documents || []).find((d) => d.id === card.dataset.docId);
        if (doc) openDocSheet(doc);
      };
    });
  }

  // =========================================================
  // TAB 5: PROFIL & PENGATURAN
  // =========================================================
  function renderProfileTab() {
    const container = document.getElementById('view-profile');
    const user = getActiveUser();
    const initials = user.userName.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join('') || 'WF';

    const start = new Date(user.workStartDate);
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (months < 0) months = 0;
    const tenureText = `${Math.floor(months / 12)} Tahun ${months % 12} Bulan`;
    const leaveSum = calculateLeaveSummary(user, now.getFullYear());

    let html = `
      <div class="segmented-control">
        <button class="seg-btn ${state.profileSubTab === 'profile' ? 'active' : ''}" id="subTabProfileBtn" type="button">Profil Saya</button>
        <button class="seg-btn ${state.profileSubTab === 'settings' ? 'active' : ''}" id="subTabSettingsBtn" type="button">Pengaturan</button>
      </div>
    `;

    if (state.profileSubTab === 'profile') {
      html += `
        <div class="profile-hero">
          <div class="profile-hero-avatar">${initials}</div>
          <div class="profile-hero-info">
            <h3>${escapeHtml(user.userName)}</h3>
            <p>${escapeHtml(user.companyName)}</p>
            <p style="margin-top:4px; font-size:11px; opacity:0.85;">Masa Kerja: ${tenureText}</p>
          </div>
        </div>

        <div class="card">
          <div class="section-header" style="margin-bottom:8px;">
            <span class="section-title">Ringkasan Kuota Cuti ${now.getFullYear()}</span>
            <button class="btn btn-outline btn-sm" id="editProfileBtn" type="button">Edit Profil</button>
          </div>
          <div class="setting-row">
            <div><div class="setting-label">Kuota Cuti Tahunan</div><div class="setting-desc">Jatah tahun berjalan</div></div>
            <strong>${user.annualLeaveQuota} Hari</strong>
          </div>
          <div class="setting-row">
            <div><div class="setting-label">Cuti Tahun Lalu (Carry-over)</div><div class="setting-desc">Berlaku s/d ${MONTHS_ID[user.lastYearLeaveExpiryMonth - 1]}</div></div>
            <strong>${user.lastYearLeaveQuota} Hari</strong>
          </div>
          <div class="setting-row">
            <div><div class="setting-label">Sisa Cuti Aktif Saat Ini</div><div class="setting-desc">Terpakai ${formatNumber(leaveSum.totalTaken)} hari</div></div>
            <span class="chip chip-sky">${formatNumber(leaveSum.activeAtMonth(now.getMonth() + 1))} Hari</span>
          </div>
        </div>

        <div class="card">
          <div class="section-header" style="margin-bottom:8px;">
            <span class="section-title">Akun Tersimpan (${state.users.length})</span>
            <button class="btn btn-primary btn-sm" id="addUserBtn" type="button">+ Profil Baru</button>
          </div>
          ${state.users.map((u) => `
            <div class="setting-row">
              <div>
                <div class="setting-label">${escapeHtml(u.userName)}</div>
                <div class="setting-desc">${escapeHtml(u.companyName)}</div>
              </div>
              ${u.id === user.id
                ? `<span class="chip chip-success">Aktif</span>`
                : `<button class="btn btn-outline btn-sm" data-switch-uid="${u.id}" type="button">Pakai</button>`}
            </div>
          `).join('')}
        </div>
      `;
    } else {
      html += `
        <div class="card">
          <div class="section-header" style="margin-bottom:6px;">
            <span class="section-title">Tampilan & Pengingat</span>
          </div>
          <div class="setting-row">
            <div>
              <div class="setting-label">Mode Gelap (Dark Mode)</div>
              <div class="setting-desc">Sesuaikan tema terang atau gelap</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="setDarkToggle" ${state.theme === 'dark' ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </label>
          </div>
          <div class="setting-row">
            <div>
              <div class="setting-label">Pengingat Catat Harian</div>
              <div class="setting-desc">Tampilkan banner pengingat di Beranda</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="setDailyRemToggle" ${user.enableDailyReminder ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </label>
          </div>
        </div>

        <div class="card">
          <div class="section-header" style="margin-bottom:8px;">
            <span class="section-title">Batas Lembur (Disnaker PP 35/2021)</span>
            <button class="btn btn-outline btn-sm" id="editLimitsBtn" type="button">Ubah</button>
          </div>
          <div class="setting-row">
            <div class="setting-label">Batas Mingguan</div>
            <span class="chip chip-accent">${formatNumber(user.maxWeeklyOvertimeHours)} Jam / Minggu</span>
          </div>
          <div class="setting-row">
            <div class="setting-label">Target Maksimal Bulanan</div>
            <span class="chip chip-accent">${formatNumber(user.maxMonthlyOvertimeHours)} Jam / Bulan</span>
          </div>
        </div>

        <div class="card">
          <div class="section-header" style="margin-bottom:8px;">
            <span class="section-title">Template Shift Lembur</span>
            <button class="btn btn-primary btn-sm" id="addTemplateBtn" type="button">+ Shift</button>
          </div>
          ${(user.templates || []).map((t) => `
            <div class="setting-row">
              <div>
                <div class="setting-label">${escapeHtml(t.code)} — ${escapeHtml(t.label)}</div>
                <div class="setting-desc">${pad2(t.startHour)}.${pad2(t.startMinute)} - ${pad2(t.endHour)}.${pad2(t.endMinute)} (${formatNumber(t.duration)} Jam)</div>
              </div>
              <button class="btn btn-outline btn-sm" data-edit-tpl="${t.id}" type="button">Edit</button>
            </div>
          `).join('')}
        </div>

        <div class="card">
          <div class="section-header" style="margin-bottom:8px;">
            <span class="section-title">Cadangkan & Pulihkan (JSON)</span>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline btn-full" id="backupJsonBtn" type="button">Salin Backup</button>
            <button class="btn btn-outline btn-full" id="restoreJsonBtn" type="button">Pulihkan JSON</button>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    document.getElementById('subTabProfileBtn').onclick = () => { state.profileSubTab = 'profile'; renderProfileTab(); };
    document.getElementById('subTabSettingsBtn').onclick = () => { state.profileSubTab = 'settings'; renderProfileTab(); };

    if (state.profileSubTab === 'profile') {
      document.getElementById('editProfileBtn').onclick = openEditProfileSheet;
      document.getElementById('addUserBtn').onclick = openAddUserSheet;
      container.querySelectorAll('[data-switch-uid]').forEach((b) => {
        b.onclick = () => {
          state.activeUserId = b.dataset.switchUid;
          saveStorage();
          renderAll();
          showToast(`Beralih ke profil ${getActiveUser().userName}`);
        };
      });
    } else {
      document.getElementById('setDarkToggle').onchange = (e) => {
        state.theme = e.target.checked ? 'dark' : 'light';
        applyTheme();
        saveStorage();
      };
      document.getElementById('setDailyRemToggle').onchange = (e) => {
        user.enableDailyReminder = e.target.checked;
        saveStorage();
        renderActivitiesTab();
        showToast(user.enableDailyReminder ? 'Pengingat harian diaktifkan' : 'Pengingat harian dimatikan');
      };
      document.getElementById('editLimitsBtn').onclick = openLimitsSheet;
      document.getElementById('addTemplateBtn').onclick = () => openTemplateSheet(null);
      container.querySelectorAll('[data-edit-tpl]').forEach((b) => {
        b.onclick = () => {
          const tpl = (user.templates || []).find((t) => t.id === b.dataset.editTpl);
          if (tpl) openTemplateSheet(tpl);
        };
      });
      document.getElementById('backupJsonBtn').onclick = () => {
        const jsonStr = JSON.stringify(user, null, 2);
        navigator.clipboard?.writeText(jsonStr).then(() => {
          showToast('Data backup JSON disalin ke clipboard');
        }).catch(() => {
          openBackupPreviewSheet(jsonStr);
        });
      };
      document.getElementById('restoreJsonBtn').onclick = openRestoreSheet;
    }
  }

  // =========================================================
  // BOTTOM SHEETS (MODALS)
  // =========================================================
  function openActivitySheet(existing = null, defaultDate = null) {
    const user = getActiveUser();
    const isEdit = Boolean(existing);
    const selType = existing ? existing.type : 'overtime';
    const selDate = existing ? existing.date : (defaultDate || toIsoDate(now));
    const selDur = existing ? existing.duration : 8;
    const selTitle = existing ? existing.customTitle : '';
    const selTag = existing ? existing.projectTag : '';
    const selNote = existing ? existing.note : '';
    const selSanctionEnd = existing?.sanctionEndDate || addDaysIso(now, 90);

    const html = `
      <form id="activityForm">
        <div class="form-group">
          <label class="form-label">Jenis Aktivitas</label>
          <div class="chip-grid" id="actTypeChips">
            ${Object.values(ACTIVITY_TYPES).map((t) => `
              <button type="button" class="choice-chip ${t.id === selType ? 'active' : ''}" data-type="${t.id}">${t.label}</button>
            `).join('')}
          </div>
        </div>

        <div class="form-group ${selType === 'overtime' ? '' : 'hidden'}" id="overtimeTemplateGroup">
          <label class="form-label">Template Shift Cepat</label>
          <div class="chip-grid">
            ${(user.templates || []).map((tpl) => `
              <button type="button" class="choice-chip" data-tpl-id="${tpl.id}">${escapeHtml(tpl.code)} (${formatNumber(tpl.duration)}j)</button>
            `).join('')}
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" for="actDateInput">Tanggal</label>
            <input class="form-input" id="actDateInput" type="date" value="${selDate}" required />
          </div>
          <div class="form-group" id="actDurationGroup">
            <label class="form-label" for="actDurInput">Durasi</label>
            <div class="input-wrap has-suffix">
              <input class="form-input" id="actDurInput" type="number" step="0.25" min="0" value="${selDur}" />
              <span class="input-suffix" id="actDurSuffix">${ACTIVITY_TYPES[selType].unit}</span>
            </div>
          </div>
        </div>

        <div class="form-group ${selType === 'sanction' ? '' : 'hidden'}" id="sanctionEndGroup">
          <label class="form-label" for="actSanctionEndInput">Berakhir Pada Tanggal</label>
          <input class="form-input" id="actSanctionEndInput" type="date" value="${selSanctionEnd}" />
        </div>

        <div class="form-group">
          <label class="form-label" for="actTitleInput">Judul / Nama Shift (Opsional)</label>
          <input class="form-input" id="actTitleInput" type="text" placeholder="Misal: Shift Malam (L1) atau SP 1" value="${escapeHtml(selTitle)}" />
        </div>

        <div class="form-group">
          <label class="form-label" for="actTagInput">Label / Tag Proyek (Opsional)</label>
          <input class="form-input" id="actTagInput" type="text" placeholder="#ProjectAlpha" value="${escapeHtml(selTag)}" />
          <div class="chip-grid" style="margin-top:6px;">
            ${PROJECT_TAG_SUGGESTIONS.map((tag) => `<button type="button" class="choice-chip" data-pick-tag="${tag}">${tag}</button>`).join('')}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="actNoteInput">Catatan</label>
          <textarea class="form-textarea" id="actNoteInput" rows="2" placeholder="Detail pekerjaan atau keterangan...">${escapeHtml(selNote)}</textarea>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
          <button class="btn btn-primary btn-full" type="submit">${isEdit ? 'Simpan Perubahan' : 'Simpan Aktivitas'}</button>
          ${isEdit ? `<button class="btn btn-danger-soft btn-full" id="actDeleteBtn" type="button">Hapus Aktivitas</button>` : ''}
        </div>
      </form>
    `;

    openSheet(isEdit ? 'Edit Aktivitas' : 'Catat Aktivitas Baru', html, (body) => {
      let currentType = selType;
      const updateTypeUI = () => {
        body.querySelectorAll('#actTypeChips .choice-chip').forEach((c) => {
          c.classList.toggle('active', c.dataset.type === currentType);
        });
        document.getElementById('overtimeTemplateGroup').classList.toggle('hidden', currentType !== 'overtime');
        document.getElementById('sanctionEndGroup').classList.toggle('hidden', currentType !== 'sanction');
        document.getElementById('actDurationGroup').classList.toggle('hidden', currentType === 'sanction');
        document.getElementById('actDurSuffix').textContent = ACTIVITY_TYPES[currentType].unit;
      };

      body.querySelectorAll('#actTypeChips .choice-chip').forEach((chip) => {
        chip.onclick = () => {
          currentType = chip.dataset.type;
          updateTypeUI();
        };
      });

      body.querySelectorAll('[data-tpl-id]').forEach((btn) => {
        btn.onclick = () => {
          const tpl = (user.templates || []).find((t) => t.id === btn.dataset.tplId);
          if (tpl) {
            document.getElementById('actDurInput').value = tpl.duration;
            document.getElementById('actTitleInput').value = tpl.label;
          }
        };
      });

      body.querySelectorAll('[data-pick-tag]').forEach((btn) => {
        btn.onclick = () => {
          document.getElementById('actTagInput').value = btn.dataset.pickTag;
        };
      });

      document.getElementById('activityForm').onsubmit = (e) => {
        e.preventDefault();
        const dateVal = document.getElementById('actDateInput').value;
        const durVal = parseFloat(document.getElementById('actDurInput').value) || 0;
        const titleVal = document.getElementById('actTitleInput').value.trim();
        let tagVal = document.getElementById('actTagInput').value.trim();
        if (tagVal && !tagVal.startsWith('#')) tagVal = `#${tagVal}`;
        const noteVal = document.getElementById('actNoteInput').value.trim();
        const sanctionEnd = currentType === 'sanction' ? document.getElementById('actSanctionEndInput').value : null;

        if (isEdit) {
          existing.type = currentType;
          existing.date = dateVal;
          existing.duration = durVal;
          existing.customTitle = titleVal;
          existing.projectTag = tagVal;
          existing.note = noteVal;
          existing.sanctionEndDate = sanctionEnd;
          showToast('Aktivitas diperbarui');
        } else {
          user.activities.push({
            id: `act_${Date.now()}`,
            type: currentType,
            date: dateVal,
            duration: durVal,
            customTitle: titleVal,
            projectTag: tagVal,
            note: noteVal,
            sanctionEndDate: sanctionEnd,
          });
          showToast('Aktivitas tersimpan');
        }

        // Jump to activity's month so user immediately sees it
        const [yy, mm] = dateVal.split('-').map(Number);
        state.selectedYear = yy;
        state.selectedMonth = mm - 1;
        state.calendarSelectedDate = dateVal;
        saveStorage();
        closeSheet();
        renderAll();
      };

      const delBtn = document.getElementById('actDeleteBtn');
      if (delBtn) {
        delBtn.onclick = () => {
          const idx = user.activities.findIndex((a) => a.id === existing.id);
          if (idx !== -1) {
            const removed = user.activities.splice(idx, 1)[0];
            saveStorage();
            closeSheet();
            renderAll();
            showToast('Aktivitas dihapus', () => {
              user.activities.push(removed);
              saveStorage();
              renderAll();
            });
          }
        };
      }
    });
  }

  function openMonthYearPickerSheet() {
    let tempYear = state.selectedYear;
    const renderPicker = (body) => {
      body.innerHTML = `
        <div class="section-header" style="margin-bottom:12px;">
          <button class="month-arrow-btn" id="pickPrevY" type="button"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
          <strong style="font-size:15px;">${tempYear}</strong>
          <button class="month-arrow-btn" id="pickNextY" type="button"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
          ${MONTHS_SHORT.map((mName, idx) => `
            <button type="button" class="choice-chip ${tempYear === state.selectedYear && idx === state.selectedMonth ? 'active' : ''}" data-pick-m="${idx}" style="padding:10px 6px; text-align:center;">
              ${mName}
            </button>
          `).join('')}
        </div>
      `;
      document.getElementById('pickPrevY').onclick = () => { tempYear -= 1; renderPicker(body); };
      document.getElementById('pickNextY').onclick = () => { tempYear += 1; renderPicker(body); };
      body.querySelectorAll('[data-pick-m]').forEach((btn) => {
        btn.onclick = () => {
          state.selectedYear = tempYear;
          state.selectedMonth = Number(btn.dataset.pickM);
          closeSheet();
          renderActivitiesTab();
          renderCalendarTab();
        };
      });
    };
    openSheet('Pilih Bulan & Tahun', '', renderPicker);
  }

  function openExportSheet() {
    const user = getActiveUser();
    const monthPrefix = `${state.selectedYear}-${pad2(state.selectedMonth + 1)}`;
    const monthActs = (user.activities || [])
      .filter((a) => a.date.startsWith(monthPrefix))
      .sort((a, b) => a.date.localeCompare(b.date));

    const leaveSum = calculateLeaveSummary(user, state.selectedYear);
    const totalOT = monthActs.filter((a) => a.type === 'overtime').reduce((s, a) => s + (Number(a.duration) || 0), 0);
    const otSessions = monthActs.filter((a) => a.type === 'overtime').length;
    const totalLeave = monthActs.filter((a) => a.type === 'leave').reduce((s, a) => s + (Number(a.duration) || 0), 0);

    const waLines = [
      `📋 *REKAPITULASI KERJA & LEMBUR BULANAN*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Karyawan:* ${user.userName}`,
      `🏢 *Perusahaan:* ${user.companyName}`,
      `📅 *Periode:* ${MONTHS_ID[state.selectedMonth]} ${state.selectedYear}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `📊 *RINGKASAN UTAMA:*`,
      `• Total Lembur: *${formatNumber(totalOT)} Jam* (${otSessions} sesi)`,
      `• Cuti Bulan Ini: *${formatNumber(totalLeave)} Hari* (Sisa Kuota: ${formatNumber(leaveSum.activeAtMonth(state.selectedMonth + 1))} Hari)`,
      ``,
      `📝 *RINCIAN AKTIVITAS:*`,
      ...(monthActs.length === 0
        ? ['_(Tidak ada catatan aktivitas di bulan ini)_']
        : monthActs.map((a) => {
            const dur = formatDuration(a);
            const tag = a.projectTag ? ` [${a.projectTag}]` : '';
            const note = a.note ? ` - ${a.note}` : '';
            return `• ${formatDateIndo(a.date)}: *${a.customTitle || ACTIVITY_TYPES[a.type].label}*${dur ? ` (${dur})` : ''}${tag}${note}`;
          })),
      ``,
      `Generated via *WorkFolio Web*`,
    ].join('\n');

    const csvRows = [
      ['Tanggal', 'Jenis', 'Judul', 'Durasi', 'Proyek', 'Catatan'],
      ...monthActs.map((a) => [
        a.date,
        ACTIVITY_TYPES[a.type].label,
        a.customTitle || ACTIVITY_TYPES[a.type].label,
        formatDuration(a),
        a.projectTag || '',
        (a.note || '').replace(/"/g, '""'),
      ]),
    ];
    const csvText = csvRows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');

    let mode = 'wa';
    const renderExp = (body) => {
      const content = mode === 'wa' ? waLines : csvText;
      body.innerHTML = `
        <div class="segmented-control" style="margin-bottom:12px;">
          <button class="seg-btn ${mode === 'wa' ? 'active' : ''}" id="expWaBtn" type="button">Slip WhatsApp</button>
          <button class="seg-btn ${mode === 'csv' ? 'active' : ''}" id="expCsvBtn" type="button">Tabel CSV</button>
        </div>
        <textarea class="form-textarea" id="expPreview" rows="10" readonly style="font-family:monospace; font-size:11.5px;">${escapeHtml(content)}</textarea>
        <div style="display:flex; gap:8px; margin-top:12px;">
          <button class="btn btn-primary btn-full" id="expCopyBtn" type="button">Salin Teks</button>
          ${mode === 'csv' ? `<button class="btn btn-outline btn-full" id="expDownloadBtn" type="button">Unduh .CSV</button>` : ''}
        </div>
      `;
      document.getElementById('expWaBtn').onclick = () => { mode = 'wa'; renderExp(body); };
      document.getElementById('expCsvBtn').onclick = () => { mode = 'csv'; renderExp(body); };
      document.getElementById('expCopyBtn').onclick = () => {
        navigator.clipboard?.writeText(content).then(() => showToast('Laporan disalin ke clipboard'));
      };
      const dl = document.getElementById('expDownloadBtn');
      if (dl) {
        dl.onclick = () => {
          const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `WorkFolio_${monthPrefix}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          showToast('File CSV diunduh');
        };
      }
    };
    openSheet(`Ekspor ${MONTHS_ID[state.selectedMonth]} ${state.selectedYear}`, '', renderExp);
  }

  function openDisnakerInfoSheet() {
    const html = `
      <div class="card" style="background:var(--bg-shell); margin-bottom:12px;">
        <div class="section-title" style="margin-bottom:4px;">PP No. 35 Tahun 2021 (Pasal 26)</div>
        <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5;">
          Waktu kerja lembur hanya dapat dilakukan paling lama <strong>4 jam dalam 1 hari</strong> dan <strong>18 jam dalam 1 minggu</strong>.
          WorkFolio memantau akumulasi mingguan dan bulanan Anda agar tetap sehat dan sesuai regulasi.
        </p>
      </div>
      <button class="btn btn-primary btn-full" id="closeDisnakerBtn" type="button">Mengerti</button>
    `;
    openSheet('Regulasi Batas Lembur', html, () => {
      document.getElementById('closeDisnakerBtn').onclick = closeSheet;
    });
  }

  function openDocSheet(existing = null) {
    const user = getActiveUser();
    const isEdit = Boolean(existing);
    const html = `
      <form id="docForm">
        <div class="form-group">
          <label class="form-label" for="docTitleInput">Nama Dokumen</label>
          <input class="form-input" id="docTitleInput" type="text" placeholder="Misal: SIM A, Kontrak Kerja, Paspor" value="${escapeHtml(existing?.title || '')}" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="docNumInput">Nomor Dokumen (Opsional)</label>
          <input class="form-input" id="docNumInput" type="text" value="${escapeHtml(existing?.documentNumber || '')}" />
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label" for="docIssueInput">Tanggal Terbit</label>
            <input class="form-input" id="docIssueInput" type="date" value="${existing?.issueDate || toIsoDate(now)}" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="docExpiryInput">Berlaku Sampai</label>
            <input class="form-input" id="docExpiryInput" type="date" value="${existing?.expiryDate || addDaysIso(now, 365)}" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="docNoteInput">Catatan</label>
          <textarea class="form-textarea" id="docNoteInput" rows="2">${escapeHtml(existing?.note || '')}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn btn-primary btn-full" type="submit">${isEdit ? 'Simpan Perubahan' : 'Tambah Dokumen'}</button>
          ${isEdit ? `<button class="btn btn-danger-soft btn-full" id="docDeleteBtn" type="button">Hapus Dokumen</button>` : ''}
        </div>
      </form>
    `;

    openSheet(isEdit ? 'Edit Dokumen' : 'Tambah Pengingat Dokumen', html, () => {
      document.getElementById('docForm').onsubmit = (e) => {
        e.preventDefault();
        const payload = {
          id: existing ? existing.id : `doc_${Date.now()}`,
          title: document.getElementById('docTitleInput').value.trim(),
          documentNumber: document.getElementById('docNumInput').value.trim(),
          issueDate: document.getElementById('docIssueInput').value,
          expiryDate: document.getElementById('docExpiryInput').value,
          note: document.getElementById('docNoteInput').value.trim(),
        };
        if (isEdit) Object.assign(existing, payload);
        else user.documents.push(payload);
        saveStorage();
        closeSheet();
        renderAll();
        showToast(isEdit ? 'Dokumen diperbarui' : 'Dokumen ditambahkan');
      };

      const delBtn = document.getElementById('docDeleteBtn');
      if (delBtn) {
        delBtn.onclick = () => {
          user.documents = user.documents.filter((d) => d.id !== existing.id);
          saveStorage();
          closeSheet();
          renderAll();
          showToast('Dokumen dihapus');
        };
      }
    });
  }

  function openEditProfileSheet() {
    const user = getActiveUser();
    const html = `
      <form id="editProfForm">
        <div class="form-group">
          <label class="form-label">Nama Lengkap</label>
          <input class="form-input" id="epName" type="text" value="${escapeHtml(user.userName)}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Perusahaan</label>
          <input class="form-input" id="epComp" type="text" value="${escapeHtml(user.companyName)}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Tanggal Mulai Bekerja</label>
          <input class="form-input" id="epStart" type="date" value="${user.workStartDate}" required />
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Cuti Tahunan</label>
            <div class="input-wrap has-suffix">
              <input class="form-input" id="epQuota" type="number" min="0" value="${user.annualLeaveQuota}" />
              <span class="input-suffix">Hari</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Carry-over Lalu</label>
            <div class="input-wrap has-suffix">
              <input class="form-input" id="epCarry" type="number" min="0" value="${user.lastYearLeaveQuota}" />
              <span class="input-suffix">Hari</span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Batas Bulan Carry-over (1-12)</label>
          <select class="form-select" id="epExpMonth">
            ${MONTHS_ID.map((mn, i) => `<option value="${i + 1}" ${user.lastYearLeaveExpiryMonth === i + 1 ? 'selected' : ''}>${mn}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-primary btn-full" type="submit">Simpan Profil</button>
      </form>
    `;
    openSheet('Edit Profil Karyawan', html, () => {
      document.getElementById('editProfForm').onsubmit = (e) => {
        e.preventDefault();
        user.userName = document.getElementById('epName').value.trim();
        user.companyName = document.getElementById('epComp').value.trim();
        user.workStartDate = document.getElementById('epStart').value;
        user.annualLeaveQuota = Number(document.getElementById('epQuota').value) || 12;
        user.lastYearLeaveQuota = Number(document.getElementById('epCarry').value) || 0;
        user.lastYearLeaveExpiryMonth = Number(document.getElementById('epExpMonth').value) || 3;
        saveStorage();
        closeSheet();
        renderAll();
        showToast('Profil diperbarui');
      };
    });
  }

  function openAddUserSheet() {
    const html = `
      <form id="addUserForm">
        <div class="form-group">
          <label class="form-label">Nama Pengguna</label>
          <input class="form-input" id="auName" type="text" placeholder="Nama lengkap" required />
        </div>
        <div class="form-group">
          <label class="form-label">Nama Perusahaan</label>
          <input class="form-input" id="auComp" type="text" placeholder="PT Contoh Sejahtera" required />
        </div>
        <button class="btn btn-primary btn-full" type="submit">Buat & Aktifkan Profil</button>
      </form>
    `;
    openSheet('Tambah Profil Baru', html, () => {
      document.getElementById('addUserForm').onsubmit = (e) => {
        e.preventDefault();
        const newId = `user_${Date.now()}`;
        state.users.push({
          id: newId,
          userName: document.getElementById('auName').value.trim(),
          companyName: document.getElementById('auComp').value.trim(),
          workStartDate: toIsoDate(now),
          annualLeaveQuota: 12,
          lastYearLeaveQuota: 0,
          lastYearLeaveExpiryMonth: 3,
          maxWeeklyOvertimeHours: 18,
          maxMonthlyOvertimeHours: 50,
          enableDailyReminder: true,
          dailyReminderHour: 17,
          dailyReminderMinute: 0,
          documentWarningDays: 30,
          templates: defaultTemplates(),
          activities: [],
          documents: [],
        });
        state.activeUserId = newId;
        saveStorage();
        closeSheet();
        renderAll();
        showToast('Profil baru dibuat');
      };
    });
  }

  function openProfileSwitcherSheet() {
    const user = getActiveUser();
    const html = `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${state.users.map((u) => `
          <button type="button" class="activity-card" data-sw-id="${u.id}" style="width:100%; text-align:left; align-items:center; justify-content:space-between;">
            <div>
              <div class="activity-title">${escapeHtml(u.userName)}</div>
              <div class="section-subtitle">${escapeHtml(u.companyName)}</div>
            </div>
            ${u.id === user.id ? `<span class="chip chip-success">Aktif</span>` : `<span class="chip chip-slate">Pilih</span>`}
          </button>
        `).join('')}
        <button class="btn btn-primary btn-full" id="swAddNewBtn" type="button" style="margin-top:6px;">+ Tambah Profil Baru</button>
      </div>
    `;
    openSheet('Pilih Profil Kerja', html, (body) => {
      body.querySelectorAll('[data-sw-id]').forEach((b) => {
        b.onclick = () => {
          state.activeUserId = b.dataset.swId;
          saveStorage();
          closeSheet();
          renderAll();
        };
      });
      document.getElementById('swAddNewBtn').onclick = openAddUserSheet;
    });
  }

  function openLimitsSheet() {
    const user = getActiveUser();
    const html = `
      <form id="limitsForm">
        <div class="form-group">
          <label class="form-label">Batas Lembur Mingguan</label>
          <div class="input-wrap has-suffix">
            <input class="form-input" id="limW" type="number" step="0.5" min="1" value="${user.maxWeeklyOvertimeHours}" required />
            <span class="input-suffix">Jam</span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Target Maksimal Bulanan</label>
          <div class="input-wrap has-suffix">
            <input class="form-input" id="limM" type="number" step="1" min="1" value="${user.maxMonthlyOvertimeHours}" required />
            <span class="input-suffix">Jam</span>
          </div>
        </div>
        <button class="btn btn-primary btn-full" type="submit">Simpan Batas Lembur</button>
      </form>
    `;
    openSheet('Atur Batas Lembur', html, () => {
      document.getElementById('limitsForm').onsubmit = (e) => {
        e.preventDefault();
        user.maxWeeklyOvertimeHours = parseFloat(document.getElementById('limW').value) || 18;
        user.maxMonthlyOvertimeHours = parseFloat(document.getElementById('limM').value) || 50;
        saveStorage();
        closeSheet();
        renderAll();
        showToast('Batas lembur diperbarui');
      };
    });
  }

  function openTemplateSheet(existing = null) {
    const user = getActiveUser();
    const isEdit = Boolean(existing);
    const html = `
      <form id="tplForm">
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Kode Shift</label>
            <input class="form-input" id="tplCode" type="text" placeholder="L4" value="${escapeHtml(existing?.code || '')}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Durasi</label>
            <div class="input-wrap has-suffix">
              <input class="form-input" id="tplDur" type="number" step="0.25" min="0.5" value="${existing?.duration || 8}" required />
              <span class="input-suffix">Jam</span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Nama Template</label>
          <input class="form-input" id="tplLabel" type="text" placeholder="Shift Khusus" value="${escapeHtml(existing?.label || '')}" required />
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn btn-primary btn-full" type="submit">${isEdit ? 'Simpan Template' : 'Tambah Template'}</button>
          ${isEdit ? `<button class="btn btn-danger-soft btn-full" id="tplDelBtn" type="button">Hapus Template</button>` : ''}
        </div>
      </form>
    `;
    openSheet(isEdit ? 'Edit Template Shift' : 'Tambah Template Shift', html, () => {
      document.getElementById('tplForm').onsubmit = (e) => {
        e.preventDefault();
        const payload = {
          id: existing ? existing.id : `tpl_${Date.now()}`,
          code: document.getElementById('tplCode').value.trim(),
          label: document.getElementById('tplLabel').value.trim(),
          startHour: existing?.startHour ?? 8,
          startMinute: existing?.startMinute ?? 0,
          endHour: existing?.endHour ?? 16,
          endMinute: existing?.endMinute ?? 0,
          duration: parseFloat(document.getElementById('tplDur').value) || 8,
        };
        if (isEdit) Object.assign(existing, payload);
        else user.templates.push(payload);
        saveStorage();
        closeSheet();
        renderProfileTab();
        showToast('Template shift disimpan');
      };
      const del = document.getElementById('tplDelBtn');
      if (del) {
        del.onclick = () => {
          user.templates = user.templates.filter((t) => t.id !== existing.id);
          saveStorage();
          closeSheet();
          renderProfileTab();
          showToast('Template dihapus');
        };
      }
    });
  }

  function openBackupPreviewSheet(jsonStr) {
    openSheet('Salin JSON Backup', `<textarea class="form-textarea" rows="12" readonly>${escapeHtml(jsonStr)}</textarea>`);
  }

  function openRestoreSheet() {
    const html = `
      <form id="restoreForm">
        <div class="form-group">
          <label class="form-label">Tempel JSON Backup WorkFolio</label>
          <textarea class="form-textarea" id="restoreJsonInput" rows="8" placeholder='{"userName": "...", "activities": [...]}' required></textarea>
        </div>
        <button class="btn btn-primary btn-full" type="submit">Pulihkan Data</button>
      </form>
    `;
    openSheet('Pulihkan Data JSON', html, () => {
      document.getElementById('restoreForm').onsubmit = (e) => {
        e.preventDefault();
        try {
          const parsed = JSON.parse(document.getElementById('restoreJsonInput').value);
          if (!parsed || !parsed.userName || !Array.isArray(parsed.activities)) {
            throw new Error('Format tidak valid');
          }
          const idx = state.users.findIndex((u) => u.id === parsed.id);
          if (idx !== -1) state.users[idx] = parsed;
          else state.users.push(parsed);
          state.activeUserId = parsed.id || state.users[state.users.length - 1].id;
          saveStorage();
          closeSheet();
          renderAll();
          showToast('Data berhasil dipulihkan');
        } catch (_) {
          showToast('Format JSON backup tidak valid');
        }
      };
    });
  }

  // Tab Navigation
  function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll('.tab-view').forEach((v) => {
      v.classList.toggle('active', v.id === `view-${tabName}`);
    });
    document.querySelectorAll('.nav-item').forEach((n) => {
      n.classList.toggle('active', n.dataset.tab === tabName);
    });
    document.getElementById('appContent').scrollTop = 0;
  }

  // Init
  function init() {
    loadStorage();
    applyTheme();
    renderAll();

    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.onclick = () => switchTab(btn.dataset.tab);
    });

    document.getElementById('fabAddBtn').onclick = () => openActivitySheet(null);
    document.getElementById('headerSwitcherBtn').onclick = openProfileSwitcherSheet;
    document.getElementById('headerExportBtn').onclick = openExportSheet;
    document.getElementById('headerOvertimeChip').onclick = openDisnakerInfoSheet;
    document.getElementById('themeToggleBtn').onclick = () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      saveStorage();
      renderProfileTab();
    };

    document.getElementById('sheetCloseBtn').onclick = closeSheet;
    document.getElementById('sheetBackdrop').onclick = (e) => {
      if (e.target.id === 'sheetBackdrop') closeSheet();
    };
  }

  document.addEventListener('DOMContentLoaded', init);
})();
