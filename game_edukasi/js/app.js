/**
 * Main Educational Game Controller for 4-Year-Old Children
 * Optimized for snappy, fast transitions and zero waiting!
 */

class EduGameApp {
  constructor() {
    this.stars = parseInt(localStorage.getItem('edu_game_stars') || '0', 10);
    this.currentMode = 'menu';
    
    // Spelling state
    this.spellingIndex = 0;
    this.spellingFilled = [];
    this.availableLetters = [];
    
    // Counting state
    this.countingIndex = 0;
    this.tappedItemIndices = new Set();

    // Balloon pop state
    this.balloonRound = 0;
    this.currentBalloonTarget = null;
    this.balloonOptions = [];
    this.balloonType = 'letter'; // 'letter' or 'number'

    // Custom Challenge state
    this.currentBalloonFilter = 'letters';
    this.settingsDataInitialized = false;

    // Star target and clown reward state
    this.starTarget = parseInt(localStorage.getItem('edu_star_target') || '10', 10);
    this.clownDuration = parseInt(localStorage.getItem('edu_clown_duration') || '10', 10);
    this.clownModel = localStorage.getItem('edu_clown_model') || 'random';
    this.lastClownMilestone = parseInt(localStorage.getItem('edu_last_clown_milestone') || '0', 10);
    this.pendingClownReward = false;
    this.clownTimer = null;
    this.currentLiveClownId = null;

    // Transition timer reference for instant skipping
    this.autoAdvanceTimer = null;

    // Warna & Bentuk state
    this.shapesTarget = null;

    // Petunjuk (hint) & rapor belajar
    this.hintCooldown = false;
    this.stats = this.loadStats();

    // Motivational phrases (Warm, uplifting, never punishing)
    this.encouragePhrases = [
      'Ayo coba lagi, kamu pasti bisa! 🌈',
      'Hampir tepat! Yuk coba sekali lagi ya! ✨',
      'Tidak apa-apa sayang, ayo coba yang ini! 💪',
      'Tetap semangat! Kamu hebat sudah mencoba! ⭐',
      'Yuk kita perhatikan lagi sama-sama! 🔍'
    ];

    // Celebratory phrases
    this.praisePhrases = [
      'Horeee! Kamu hebat sekali! 🎉',
      'Pintar sekali! Jawabanmu benar! 🌟',
      'Luar biasa! Kamu sungguh jagoan! 🏆',
      'Wah betul! Mantap sekali! 🎈',
      'Juara! Lanjutkan ya teman kecil! 💖'
    ];

    this.initDOM();
    this.bindEvents();
    this.updateStarsDisplay();
    this.renderMascot('happy', 'Halo teman kecil! Mau belajar mengeja atau berhitung hari ini? 🎨');
  }

  initDOM() {
    this.dom = {
      starsCount: document.getElementById('stars-count'),
      btnMute: document.getElementById('btn-mute'),
      btnBgm: document.getElementById('btn-bgm'),
      btnFullscreen: document.getElementById('btn-fullscreen'),
      btnAlbum: document.getElementById('btn-album'),
      btnCloseAlbum: document.getElementById('btn-close-album'),
      albumOverlay: document.getElementById('album-overlay'),
      stickersGrid: document.getElementById('stickers-grid'),
      btnInfo: document.getElementById('btn-info'),
      btnCloseInfo: document.getElementById('btn-close-info'),
      infoOverlay: document.getElementById('info-overlay'),
      btnResetStars: document.getElementById('btn-reset-stars'),
      btnHome: document.getElementById('btn-home'),
      screenTitle: document.getElementById('screen-title'),
      
      // Screens
      screenMenu: document.getElementById('screen-menu'),
      screenSpelling: document.getElementById('screen-spelling'),
      screenCounting: document.getElementById('screen-counting'),
      screenBalloons: document.getElementById('screen-balloons'),
      
      // Menu Mode Cards
      cardSpelling: document.getElementById('mode-card-spelling'),
      cardCounting: document.getElementById('mode-card-counting'),
      cardBalloons: document.getElementById('mode-card-balloons'),
      
      // Spelling Elements
      spellingIllustration: document.getElementById('spelling-illustration'),
      spellingSlotsContainer: document.getElementById('spelling-slots'),
      spellingBankContainer: document.getElementById('spelling-bank'),
      btnSpeakWord: document.getElementById('btn-speak-word'),
      btnResetWord: document.getElementById('btn-reset-word'),
      spellingCategory: document.getElementById('spelling-category'),
      
      // Counting Elements
      countingPrompt: document.getElementById('counting-prompt'),
      countingCounterBadge: document.getElementById('counting-counter-badge'),
      countingPlayground: document.getElementById('counting-playground'),
      countingOptions: document.getElementById('counting-options'),
      btnSpeakCounting: document.getElementById('btn-speak-counting'),
      btnResetCounting: document.getElementById('btn-reset-counting'),

      // Balloon Game Elements
      balloonTargetPrompt: document.getElementById('balloon-target-prompt'),
      balloonTargetSymbol: document.getElementById('balloon-target-symbol'),
      balloonsSky: document.getElementById('balloons-sky'),
      btnSpeakBalloon: document.getElementById('btn-speak-balloon'),
      btnRefreshBalloons: document.getElementById('btn-refresh-balloons'),
      
      // Mascot & Feedback
      mascotSvgContainer: document.getElementById('mascot-svg-container'),
      mascotSpeechText: document.getElementById('mascot-speech-text'),
      motivationBanner: document.getElementById('motivation-banner'),
      motivationText: document.getElementById('motivation-text'),
      
      // Celebration Modal
      celebrationOverlay: document.getElementById('celebration-overlay'),
      celebrationTitle: document.getElementById('celebration-title'),
      celebrationMessage: document.getElementById('celebration-message'),
      btnCelebrationNext: document.getElementById('btn-celebration-next'),
      btnCelebrationHome: document.getElementById('btn-celebration-home'),

      // Settings Screen Elements
      screenSettings: document.getElementById('screen-settings'),
      btnSettingsNav: document.getElementById('btn-settings-nav'),
      btnBackSettings: document.getElementById('btn-back-settings'),
      setTabBtnClown: document.getElementById('set-tab-btn-clown'),
      setTabBtnWord: document.getElementById('set-tab-btn-word'),
      setTabBtnCount: document.getElementById('set-tab-btn-count'),
      setTabBtnBalloon: document.getElementById('set-tab-btn-balloon'),
      setTabContentClown: document.getElementById('set-tab-content-clown'),
      setTabContentWord: document.getElementById('set-tab-content-word'),
      setTabContentCount: document.getElementById('set-tab-content-count'),
      setTabContentBalloon: document.getElementById('set-tab-content-balloon'),
      inputCustomStarTarget: document.getElementById('input-custom-star-target'),
      btnSaveStarTarget: document.getElementById('btn-save-star-target'),
      btnPreviewClown: document.getElementById('btn-preview-clown'),
      clownModelsSelectionGrid: document.getElementById('clown-models-selection-grid'),
      inputSettingsWord: document.getElementById('input-settings-word'),
      btnPlaySettingsWord: document.getElementById('btn-play-settings-word'),
      settingsWordsPresets: document.getElementById('settings-words-presets'),
      settingsNumberButtons: document.getElementById('settings-number-buttons'),
      settingsBalloonGrid: document.getElementById('settings-balloon-grid'),
      settingsBalloonFilterLetters: document.getElementById('settings-balloon-filter-letters'),
      settingsBalloonFilterNumbers: document.getElementById('settings-balloon-filter-numbers'),

      // Dancing Clown Milestone Reward Overlay Elements
      clownRewardOverlay: document.getElementById('clown-reward-overlay'),
      clownRewardTitle: document.getElementById('clown-reward-title'),
      clownCountdownTimer: document.getElementById('clown-countdown-timer'),
      clownSvgStage: document.getElementById('clown-svg-stage'),
      btnSwitchClownLive: document.getElementById('btn-switch-clown-live'),
      btnCloseClownReward: document.getElementById('btn-close-clown-reward'),

      // Warna & Bentuk
      screenShapes: document.getElementById('screen-shapes'),
      cardShapes: document.getElementById('mode-card-shapes'),
      shapesPrompt: document.getElementById('shapes-prompt'),
      shapesTargetBadge: document.getElementById('shapes-target-badge'),
      shapesOptions: document.getElementById('shapes-options'),
      btnSpeakShapes: document.getElementById('btn-speak-shapes'),
      btnRefreshShapes: document.getElementById('btn-refresh-shapes'),

      // Progres menu
      menuProgressLabel: document.getElementById('menu-progress-label'),
      menuProgressFill: document.getElementById('menu-progress-fill')
    };
  }

  bindEvents() {
    // Navigation
    this.dom.btnHome.addEventListener('click', () => {
      soundEngine.playClick();
      this.clearAutoAdvance();
      this.switchScreen('menu');
    });

    this.dom.btnMute.addEventListener('click', () => {
      const isMuted = soundEngine.toggleMute();
      this.dom.btnMute.innerHTML = isMuted ? '🔇' : '🔊';
      soundEngine.playClick();
    });

    this.dom.btnBgm.addEventListener('click', () => {
      soundEngine.playClick();
      if (soundEngine.isBgmPlaying) {
        soundEngine.stopBgm();
        this.dom.btnBgm.style.background = '#FFFFFF';
      } else {
        soundEngine.startBgm();
        this.dom.btnBgm.style.background = '#FEF08A';
      }
    });

    this.dom.btnFullscreen.addEventListener('click', () => {
      soundEngine.playClick();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
    // Sembunyikan tombol layar penuh di perangkat yang tidak mendukung (mis. iPhone Safari)
    if (!document.fullscreenEnabled || !document.documentElement.requestFullscreen) {
      this.dom.btnFullscreen.style.display = 'none';
    }

    // Sticker Album
    this.dom.btnAlbum.addEventListener('click', () => {
      soundEngine.playPop();
      this.openAlbumModal();
    });

    this.dom.btnCloseAlbum.addEventListener('click', () => {
      soundEngine.playClick();
      this.dom.albumOverlay.classList.remove('active');
    });

    // Parental Guide Info Modal
    if (this.dom.btnInfo) {
      this.dom.btnInfo.addEventListener('click', () => {
        soundEngine.playClick();
        this.renderReport();
        this.dom.infoOverlay.classList.add('active');
      });
    }

    if (this.dom.btnCloseInfo) {
      this.dom.btnCloseInfo.addEventListener('click', () => {
        soundEngine.playClick();
        this.dom.infoOverlay.classList.remove('active');
      });
    }

    // Close overlays when clicking outside modal dialog (backdrop click)
    [this.dom.customOverlay, this.dom.albumOverlay, this.dom.infoOverlay].forEach(overlay => {
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            overlay.classList.remove('active');
          }
        });
      }
    });

    if (this.dom.btnResetStars) {
      this.dom.btnResetStars.addEventListener('click', () => {
        const confirmReset = confirm('Apakah Ayah/Bunda yakin ingin mereset koleksi bintang dan rapor belajar kembali ke 0?');
        if (confirmReset) {
          this.stars = 0;
          this.lastClownMilestone = 0;
          this.pendingClownReward = false;
          localStorage.setItem('edu_game_stars', '0');
          localStorage.setItem('edu_last_clown_milestone', '0');
          this.stats = this.defaultStats();
          this.saveStats();
          this.updateStarsDisplay();
          this.renderReport();
          soundEngine.playPop();
          alert('Bintang & rapor berhasil direset ke 0! ⭐');
        }
      });
    }

    // Petunjuk (hint) di semua mode permainan
    document.querySelectorAll('.btn-hint').forEach(btn => {
      btn.addEventListener('click', () => this.useHint());
    });

    // Mode Warna & Bentuk
    if (this.dom.cardShapes) {
      this.dom.cardShapes.addEventListener('click', () => {
        soundEngine.playPop();
        this.startShapesMode();
      });
    }
    if (this.dom.btnSpeakShapes) {
      this.dom.btnSpeakShapes.addEventListener('click', () => {
        soundEngine.playClick();
        if (this.shapesTarget) soundEngine.speak(this.getShapesPromptText());
      });
    }
    if (this.dom.btnRefreshShapes) {
      this.dom.btnRefreshShapes.addEventListener('click', () => {
        soundEngine.playClick();
        this.loadShapesRound();
      });
    }

    // Menu Cards
    this.dom.cardSpelling.addEventListener('click', () => {
      soundEngine.playPop();
      this.startSpellingMode();
    });

    this.dom.cardCounting.addEventListener('click', () => {
      soundEngine.playPop();
      this.startCountingMode();
    });

    this.dom.cardBalloons.addEventListener('click', () => {
      soundEngine.playPop();
      this.startBalloonsMode();
    });

    // Settings & Customization Page Navigation
    if (this.dom.btnSettingsNav) {
      this.dom.btnSettingsNav.addEventListener('click', () => {
        soundEngine.playClick();
        this.switchScreen('settings');
      });
    }

    if (this.dom.btnBackSettings) {
      this.dom.btnBackSettings.addEventListener('click', () => {
        soundEngine.playClick();
        this.switchScreen('menu');
      });
    }

    // Tabs inside Settings Page
    if (this.dom.setTabBtnClown) {
      this.dom.setTabBtnClown.addEventListener('click', () => {
        soundEngine.playClick();
        this.switchSettingsTab('clown');
      });
    }
    if (this.dom.setTabBtnWord) {
      this.dom.setTabBtnWord.addEventListener('click', () => {
        soundEngine.playClick();
        this.switchSettingsTab('word');
      });
    }
    if (this.dom.setTabBtnCount) {
      this.dom.setTabBtnCount.addEventListener('click', () => {
        soundEngine.playClick();
        this.switchSettingsTab('count');
      });
    }
    if (this.dom.setTabBtnBalloon) {
      this.dom.setTabBtnBalloon.addEventListener('click', () => {
        soundEngine.playClick();
        this.switchSettingsTab('balloon');
      });
    }

    // Star Target Setting in Settings Page
    const starPills = document.querySelectorAll('.btn-star-target-pill');
    starPills.forEach(pill => {
      pill.addEventListener('click', () => {
        soundEngine.playClick();
        starPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const targetVal = parseInt(pill.getAttribute('data-target'), 10);
        this.setStarTarget(targetVal);
        if (this.dom.inputCustomStarTarget) this.dom.inputCustomStarTarget.value = targetVal;
      });
    });

    if (this.dom.btnSaveStarTarget && this.dom.inputCustomStarTarget) {
      this.dom.btnSaveStarTarget.addEventListener('click', () => {
        soundEngine.playClick();
        const customVal = parseInt(this.dom.inputCustomStarTarget.value, 10);
        if (!isNaN(customVal) && customVal > 0) {
          starPills.forEach(p => p.classList.remove('active'));
          this.setStarTarget(customVal);
          alert(`Target Bintang berhasil diatur ke ${customVal} ⭐!`);
        }
      });
    }

    // Clown Duration Setting
    const durationPills = document.querySelectorAll('.btn-clown-duration-pill');
    durationPills.forEach(pill => {
      pill.addEventListener('click', () => {
        soundEngine.playClick();
        durationPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const durVal = parseInt(pill.getAttribute('data-duration'), 10);
        this.setClownDuration(durVal);
      });
    });

    // Preview Clown Reward Button
    if (this.dom.btnPreviewClown) {
      this.dom.btnPreviewClown.addEventListener('click', () => {
        soundEngine.playPop();
        this.startClownReward();
      });
    }

    // Dancing Clown Overlay Controls
    if (this.dom.btnSwitchClownLive) {
      this.dom.btnSwitchClownLive.addEventListener('click', () => {
        soundEngine.playHornHonk();
        this.switchClownLive();
      });
    }

    if (this.dom.btnCloseClownReward) {
      this.dom.btnCloseClownReward.addEventListener('click', () => {
        soundEngine.playClick();
        this.stopClownReward();
      });
    }

    // Custom Word Form inside Settings
    if (this.dom.btnPlaySettingsWord) {
      this.dom.btnPlaySettingsWord.addEventListener('click', () => {
        this.handleSettingsWordSubmit();
      });
    }

    if (this.dom.inputSettingsWord) {
      this.dom.inputSettingsWord.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleSettingsWordSubmit();
        }
      });
    }

    // Custom Balloon Filters inside Settings
    if (this.dom.settingsBalloonFilterLetters) {
      this.dom.settingsBalloonFilterLetters.addEventListener('click', () => {
        soundEngine.playClick();
        this.setSettingsBalloonFilter('letters');
      });
    }

    if (this.dom.settingsBalloonFilterNumbers) {
      this.dom.settingsBalloonFilterNumbers.addEventListener('click', () => {
        soundEngine.playClick();
        this.setSettingsBalloonFilter('numbers');
      });
    }

    // Speak buttons
    this.dom.btnSpeakWord.addEventListener('click', () => {
      soundEngine.playClick();
      const currentWord = WORDS_DATABASE[this.spellingIndex];
      soundEngine.speak(currentWord.soundText + '. ' + currentWord.sentence);
    });

    this.dom.btnResetWord.addEventListener('click', () => {
      soundEngine.playClick();
      this.resetCurrentSpellingWord();
    });

    this.dom.btnSpeakCounting.addEventListener('click', () => {
      soundEngine.playClick();
      const currentCount = NUMBERS_DATABASE[this.countingIndex];
      soundEngine.speak(currentCount.voicePrompt);
    });

    this.dom.btnResetCounting.addEventListener('click', () => {
      soundEngine.playClick();
      this.loadCountingQuestion();
    });

    this.dom.spellingIllustration.addEventListener('click', () => {
      soundEngine.playPop();
      const currentWord = WORDS_DATABASE[this.spellingIndex];
      soundEngine.speak(currentWord.soundText);
    });

    this.dom.btnSpeakBalloon.addEventListener('click', () => {
      soundEngine.playClick();
      this.speakBalloonPrompt();
    });

    this.dom.btnRefreshBalloons.addEventListener('click', () => {
      soundEngine.playClick();
      this.loadBalloonRound();
    });

    // Mascot interactive tap (Easter Egg!)
    const mascotPhrases = [
      'Meong! Ciko senang belajar bersamamu! 🐾',
      'Halo teman pintar! Kamu anak hebat! ⭐',
      'Ayo terus kumpulkan bintangnya ya! 🎈',
      'Meong! Kamu sungguh jagoan kecil! 💖'
    ];
    this.dom.mascotSvgContainer.style.cursor = 'pointer';
    this.dom.mascotSvgContainer.title = 'Sentuh Ciko!';
    this.dom.mascotSvgContainer.addEventListener('click', () => {
      soundEngine.playMeow();
      const phrase = mascotPhrases[Math.floor(Math.random() * mascotPhrases.length)];
      this.renderMascot('cheer', phrase);
      soundEngine.speak(phrase);
      confetti.burst({ count: 25, x: window.innerWidth / 2, y: window.innerHeight * 0.85 });
    });

    // Celebration Next Button (Manual click required: user decides when to advance!)
    this.dom.btnCelebrationNext.addEventListener('click', (e) => {
      e.stopPropagation();
      soundEngine.playPop();
      this.triggerNextQuestionImmediately();
    });

    if (this.dom.btnCelebrationHome) {
      this.dom.btnCelebrationHome.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEngine.playClick();
        this.closeCelebration();
        this.switchScreen('menu');
      });
    }

    // Keyboard support for desktop
    window.addEventListener('keydown', (e) => {
      if (this.dom.celebrationOverlay.classList.contains('active')) {
        this.triggerNextQuestionImmediately();
        return;
      }

      if (this.currentMode === 'spelling') {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          const match = this.availableLetters.find(l => l.letter === key && !l.used);
          if (match) {
            this.handleLetterChoice(match);
          }
        } else if (e.key === 'Backspace') {
          for (let i = this.spellingFilled.length - 1; i >= 0; i--) {
            if (this.spellingFilled[i] !== null) {
              this.removeLetterFromSlot(i);
              break;
            }
          }
        }
      } else if (this.currentMode === 'counting') {
        const digit = parseInt(e.key, 10);
        if (!isNaN(digit)) {
          const numberData = NUMBERS_DATABASE[this.countingIndex];
          if (numberData.options.includes(digit)) {
            this.handleNumberChoice(digit, numberData.number);
          }
        }
      }
    });
  }

  clearAutoAdvance() {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  triggerNextQuestionImmediately() {
    this.clearAutoAdvance();
    this.closeCelebration();

    if (this.pendingClownReward) {
      this.pendingClownReward = false;
      this.startClownReward();
      return;
    }

    if (this.currentMode === 'spelling') {
      this.spellingIndex = (this.spellingIndex + 1) % WORDS_DATABASE.length;
      this.loadSpellingQuestion();
    } else if (this.currentMode === 'counting') {
      this.countingIndex = (this.countingIndex + 1) % NUMBERS_DATABASE.length;
      this.loadCountingQuestion();
    } else if (this.currentMode === 'balloons') {
      this.loadBalloonRound();
    }
  }

  switchScreen(screenName) {
    this.currentMode = screenName;
    this.clearAutoAdvance();

    this.dom.screenMenu.classList.remove('active');
    this.dom.screenSpelling.classList.remove('active');
    this.dom.screenCounting.classList.remove('active');
    this.dom.screenBalloons.classList.remove('active');
    if (this.dom.screenSettings) this.dom.screenSettings.classList.remove('active');

    if (screenName === 'menu') {
      this.dom.screenMenu.classList.add('active');
      this.dom.screenTitle.textContent = '🌟 Belajar Ceria';
      this.renderMascot('happy', 'Pilih permainan yang kamu sukai ya teman! 🎈');
      soundEngine.speak('Pilih permainan yang kamu sukai ya!');
    } else if (screenName === 'spelling') {
      this.dom.screenSpelling.classList.add('active');
      this.dom.screenTitle.textContent = '🔤 Belajar Mengeja';
    } else if (screenName === 'counting') {
      this.dom.screenCounting.classList.add('active');
      this.dom.screenTitle.textContent = '🔢 Belajar Berhitung';
    } else if (screenName === 'balloons') {
      this.dom.screenBalloons.classList.add('active');
      this.dom.screenTitle.textContent = '🎈 Pecahkan Balon';
    } else if (screenName === 'settings') {
      this.dom.screenSettings.classList.add('active');
      this.dom.screenTitle.textContent = '⚙️ Pengaturan & Kustom';
      this.openSettingsScreen('clown');
      this.renderMascot('happy', 'Di sini kamu bisa atur badut joget dan kustom belajar! 🎪');
    }
  }

  addStar() {
    this.stars++;
    localStorage.setItem('edu_game_stars', this.stars.toString());
    this.updateStarsDisplay();
    soundEngine.playStar();

    // Check if star reward milestone is reached
    const milestoneDiff = this.stars - this.lastClownMilestone;
    if (this.starTarget > 0 && milestoneDiff >= this.starTarget) {
      this.lastClownMilestone = this.stars;
      localStorage.setItem('edu_last_clown_milestone', this.lastClownMilestone.toString());
      this.pendingClownReward = true;
    }
  }

  updateStarsDisplay() {
    this.dom.starsCount.textContent = this.stars;
  }

  // ==========================================
  // SPELLING MODE LOGIC
  // ==========================================
  startSpellingMode() {
    this.switchScreen('spelling');
    this.loadSpellingQuestion();
  }

  loadSpellingQuestion() {
    const wordData = WORDS_DATABASE[this.spellingIndex];
    this.spellingFilled = new Array(wordData.letters.length).fill(null);

    this.dom.spellingIllustration.innerHTML = wordData.svg + 
      `<div class="speaker-hint-btn" title="Dengarkan Suara">🔊</div>`;
    this.dom.spellingCategory.textContent = `Kategori: ${wordData.category}`;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const targetLetters = [...wordData.letters];
    const extraCount = 2;
    for (let i = 0; i < extraCount; i++) {
      let randChar;
      do {
        randChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      } while (targetLetters.includes(randChar));
      targetLetters.push(randChar);
    }

    this.availableLetters = targetLetters
      .map((letter, id) => ({ letter, id, used: false }))
      .sort(() => Math.random() - 0.5);

    this.renderSpellingSlots();
    this.renderSpellingBank();

    this.renderMascot('happy', `Ayo susun huruf untuk kata: ${wordData.word}! 🎨`);
    soundEngine.speak(wordData.word);
  }

  resetCurrentSpellingWord() {
    this.spellingFilled = new Array(WORDS_DATABASE[this.spellingIndex].letters.length).fill(null);
    this.availableLetters.forEach(l => l.used = false);
    this.renderSpellingSlots();
    this.renderSpellingBank();
  }

  renderSpellingSlots() {
    const wordData = WORDS_DATABASE[this.spellingIndex];
    this.dom.spellingSlotsContainer.innerHTML = '';

    wordData.letters.forEach((targetChar, index) => {
      const slot = document.createElement('div');
      slot.className = 'letter-slot';
      const filledLetterObj = this.spellingFilled[index];

      if (filledLetterObj) {
        slot.textContent = filledLetterObj.letter;
        slot.classList.add('filled');
        slot.addEventListener('click', () => {
          this.removeLetterFromSlot(index);
        });
      } else {
        slot.textContent = '';
      }

      this.dom.spellingSlotsContainer.appendChild(slot);
    });
  }

  renderSpellingBank() {
    this.dom.spellingBankContainer.innerHTML = '';

    this.availableLetters.forEach((item) => {
      const bubble = document.createElement('button');
      bubble.className = `letter-bubble ${item.used ? 'used' : ''}`;
      bubble.textContent = item.letter;

      bubble.addEventListener('click', () => {
        if (!item.used) {
          this.handleLetterChoice(item);
        }
      });

      this.dom.spellingBankContainer.appendChild(bubble);
    });
  }

  handleLetterChoice(letterObj) {
    const wordData = WORDS_DATABASE[this.spellingIndex];
    const nextSlotIndex = this.spellingFilled.findIndex(val => val === null);
    if (nextSlotIndex === -1) return;

    const targetExpectedLetter = wordData.letters[nextSlotIndex];

    if (letterObj.letter === targetExpectedLetter) {
      soundEngine.playPop();
      soundEngine.speak(letterObj.letter);

      this.spellingFilled[nextSlotIndex] = letterObj;
      letterObj.used = true;

      this.renderSpellingSlots();
      this.renderSpellingBank();

      const isComplete = this.spellingFilled.every(item => item !== null);
      if (isComplete) {
        this.triggerSpellingSuccess();
      }
    } else {
      this.triggerGentleEncouragement();
    }
  }

  removeLetterFromSlot(slotIndex) {
    const removedLetterObj = this.spellingFilled[slotIndex];
    if (!removedLetterObj) return;

    soundEngine.playClick();
    removedLetterObj.used = false;
    this.spellingFilled[slotIndex] = null;

    this.renderSpellingSlots();
    this.renderSpellingBank();
  }

  triggerSpellingSuccess() {
    const wordData = WORDS_DATABASE[this.spellingIndex];
    
    // Flash slots green
    const slots = this.dom.spellingSlotsContainer.querySelectorAll('.letter-slot');
    slots.forEach(s => s.classList.add('success-flash'));

    this.addStar();
    soundEngine.playCorrect();
    confetti.doubleCannon();

    this.renderMascot('cheer', `Horeee! ${wordData.word}! Kamu hebat! 🎉`);

    // Voice in background (asynchronous, non-blocking!)
    soundEngine.speak(`Horeee! ${wordData.word}! Pintar sekali!`);

    // Show celebration modal: Wait for user to decide to continue or go home
    if (this.pendingClownReward) {
      this.showCelebrationModal(
        '🎪 REWARD BINTANG TERCAPAI! 🎪',
        `Horeee! Kamu berhasil mengumpulkan <b>${this.stars}</b> Bintang! Tekan Lanjut untuk menonton Badut Berjoget Ceria! 🎉`
      );
    } else {
      this.showCelebrationModal(
        'Horeee! Luar Biasa! 🎉',
        `Kamu berhasil mengeja kata <b>${wordData.word}</b> dengan tepat!`
      );
    }
  }

  // ==========================================
  // COUNTING MODE LOGIC
  // ==========================================
  startCountingMode() {
    this.switchScreen('counting');
    this.loadCountingQuestion();
  }

  loadCountingQuestion() {
    const numberData = NUMBERS_DATABASE[this.countingIndex];
    this.tappedItemIndices.clear();

    this.dom.countingPrompt.textContent = numberData.voicePrompt;
    this.updateCountingBadge(0, numberData.number);

    this.dom.countingPlayground.innerHTML = '';
    for (let i = 0; i < numberData.number; i++) {
      const itemEl = document.createElement('div');
      itemEl.className = 'counting-item';
      itemEl.innerHTML = numberData.svg;

      itemEl.addEventListener('click', () => {
        this.handleItemTap(itemEl, i + 1);
      });

      this.dom.countingPlayground.appendChild(itemEl);
    }

    this.dom.countingOptions.innerHTML = '';
    numberData.options.forEach(num => {
      const btn = document.createElement('button');
      btn.className = 'btn-number-choice';
      const dots = '●'.repeat(num);

      btn.innerHTML = `
        <span class="choice-num">${num}</span>
        <span class="choice-dots">${dots}</span>
      `;

      btn.addEventListener('click', () => {
        this.handleNumberChoice(num, numberData.number);
      });

      this.dom.countingOptions.appendChild(btn);
    });

    this.renderMascot('happy', `Sentuh gambarnya untuk berhitung ya! 🔢✨`);
    soundEngine.speak(numberData.voicePrompt);
  }

  handleItemTap(itemEl, index) {
    if (!this.tappedItemIndices.has(index)) {
      this.tappedItemIndices.add(index);
      itemEl.classList.add('tapped');

      const tag = document.createElement('span');
      tag.className = 'counting-tag';
      tag.textContent = this.tappedItemIndices.size;
      itemEl.appendChild(tag);

      soundEngine.playCountNote(this.tappedItemIndices.size);
      const indonesianNumbers = ['Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh'];
      const spokenNum = indonesianNumbers[this.tappedItemIndices.size - 1] || `${this.tappedItemIndices.size}`;
      soundEngine.speak(spokenNum);

      const targetCount = NUMBERS_DATABASE[this.countingIndex].number;
      this.updateCountingBadge(this.tappedItemIndices.size, targetCount);
    } else {
      soundEngine.playPop();
    }
  }

  updateCountingBadge(current, total) {
    this.dom.countingCounterBadge.innerHTML = `👆 Disentuh: <b>${current}</b> dari <b>${total}</b>`;
  }

  handleNumberChoice(selectedNumber, correctNumber) {
    if (selectedNumber === correctNumber) {
      this.addStar();
      soundEngine.playCorrect();
      confetti.burst({ count: 90 });

      this.renderMascot('cheer', `Hebat sekali! Benar, ada ${correctNumber}! 🥳`);
      soundEngine.speak(`Pintar! Ada ${correctNumber}!`);

      if (this.pendingClownReward) {
        this.showCelebrationModal(
          '🎪 REWARD BINTANG TERCAPAI! 🎪',
          `Horeee! Kamu berhasil mengumpulkan <b>${this.stars}</b> Bintang! Tekan Lanjut untuk menonton Badut Berjoget Ceria! 🎉`
        );
      } else {
        this.showCelebrationModal(
          'Pintar Sekali! ⭐',
          `Jawabanmu benar! Ada <b>${correctNumber}</b> benda yang lucu!`
        );
      }
    } else {
      this.triggerGentleEncouragement();
    }
  }

  // ==========================================
  // BALLOONS MINI-GAME LOGIC
  // ==========================================
  startBalloonsMode() {
    this.switchScreen('balloons');
    this.loadBalloonRound();
  }

  loadBalloonRound() {
    const isLetter = Math.random() > 0.4;
    this.balloonType = isLetter ? 'letter' : 'number';

    const colors = ['#FF477E', '#3A86FF', '#06D6A0', '#FFD166', '#8338EC', '#FF9F1C'];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let targetSymbol = '';
    let pool = [];

    if (isLetter) {
      targetSymbol = alphabet[Math.floor(Math.random() * alphabet.length)];
      pool = [targetSymbol];
      while (pool.length < 4) {
        const rand = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!pool.includes(rand)) pool.push(rand);
      }
    } else {
      const randNum = Math.floor(Math.random() * 9) + 1;
      targetSymbol = `${randNum}`;
      pool = [targetSymbol];
      while (pool.length < 4) {
        const rand = `${Math.floor(Math.random() * 9) + 1}`;
        if (!pool.includes(rand)) pool.push(rand);
      }
    }

    this.currentBalloonTarget = targetSymbol;
    this.dom.balloonTargetSymbol.textContent = targetSymbol;
    const promptText = `Pecahkan balon dengan ${isLetter ? 'huruf' : 'angka'} ${targetSymbol}!`;
    this.dom.balloonTargetPrompt.textContent = promptText;

    // Shuffle pool
    pool.sort(() => Math.random() - 0.5);

    // Render balloons in sky
    this.dom.balloonsSky.innerHTML = '';
    pool.forEach((symbol, index) => {
      const balloon = document.createElement('div');
      balloon.className = 'floating-balloon';
      const color = colors[index % colors.length];
      balloon.style.background = color;
      balloon.style.animationDelay = `${(index * 0.4).toFixed(1)}s`;

      balloon.innerHTML = `
        <span class="balloon-symbol">${symbol}</span>
        <div class="floating-balloon-string"></div>
      `;

      balloon.addEventListener('click', (e) => {
        this.handleBalloonTap(balloon, symbol, e);
      });

      this.dom.balloonsSky.appendChild(balloon);
    });

    this.renderMascot('happy', promptText);
    soundEngine.speak(promptText);
  }

  speakBalloonPrompt() {
    const isLetter = this.balloonType === 'letter';
    soundEngine.speak(`Pecahkan balon dengan ${isLetter ? 'huruf' : 'angka'} ${this.currentBalloonTarget}!`);
  }

  handleBalloonTap(balloonEl, symbol, event) {
    if (symbol === this.currentBalloonTarget) {
      // Pop balloon!
      soundEngine.playBalloonPop();
      balloonEl.classList.add('balloon-popping');

      // Confetti burst from balloon position
      const rect = balloonEl.getBoundingClientRect();
      confetti.burst({ count: 50, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

      this.addStar();
      soundEngine.playCorrect();
      this.renderMascot('cheer', `Horeee! Balon ${symbol} pecah! 🎉`);
      soundEngine.speak(`Hebat! Balon ${symbol}!`);

      if (this.pendingClownReward) {
        this.showCelebrationModal(
          '🎪 REWARD BINTANG TERCAPAI! 🎪',
          `Horeee! Kamu berhasil mengumpulkan <b>${this.stars}</b> Bintang! Tekan Lanjut untuk menonton Badut Berjoget Ceria! 🎉`
        );
      } else {
        this.showCelebrationModal(
          'Balon Pecah! 🎈',
          `Kamu berhasil memecahkan balon <b>${symbol}</b>!`
        );
      }
    } else {
      // Wrong balloon tapped: gentle wobble
      soundEngine.playPop();
      balloonEl.classList.add('gentle-wiggle');
      setTimeout(() => balloonEl.classList.remove('gentle-wiggle'), 400);

      this.triggerGentleEncouragement();
    }
  }

  // ==========================================
  // CELEBRATION & ENCOURAGEMENT SYSTEM
  // ==========================================
  showCelebrationModal(title, message) {
    this.dom.celebrationTitle.innerHTML = title;
    this.dom.celebrationMessage.innerHTML = message;
    this.dom.celebrationOverlay.classList.add('active');
  }

  showQuickCelebration(title, message) {
    this.showCelebrationModal(title, message);
  }

  closeCelebration() {
    this.dom.celebrationOverlay.classList.remove('active');
  }

  triggerGentleEncouragement() {
    soundEngine.playEncourage();

    const activeBox = this.currentMode === 'spelling' ? 
      this.dom.screenSpelling.querySelector('.spelling-box') : 
      (this.currentMode === 'counting' ? 
        this.dom.screenCounting.querySelector('.counting-box') : 
        this.dom.screenBalloons.querySelector('.balloons-box'));
    
    if (activeBox) {
      activeBox.classList.remove('gentle-wiggle');
      void activeBox.offsetWidth;
      activeBox.classList.add('gentle-wiggle');
    }

    const randomEncourage = this.encouragePhrases[Math.floor(Math.random() * this.encouragePhrases.length)];
    this.renderMascot('motivate', randomEncourage);
    this.showMotivationBanner(randomEncourage);
    soundEngine.speak(randomEncourage);
  }

  showMotivationBanner(text) {
    this.dom.motivationText.textContent = text;
    this.dom.motivationBanner.classList.add('active');

    if (this.bannerTimer) clearTimeout(this.bannerTimer);
    this.bannerTimer = setTimeout(() => {
      this.dom.motivationBanner.classList.remove('active');
    }, 2400);
  }

  // ==========================================
  // STICKER ALBUM MODAL
  // ==========================================
  openAlbumModal() {
    this.dom.stickersGrid.innerHTML = '';

    STICKERS_DATABASE.forEach(sticker => {
      const isUnlocked = this.stars >= sticker.starsRequired;
      const card = document.createElement('div');
      card.className = `sticker-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        ${!isUnlocked ? `<span class="sticker-lock-badge">⭐ ${sticker.starsRequired}</span>` : ''}
        <div class="sticker-svg-wrapper">${sticker.svg}</div>
        <div class="sticker-name">${sticker.name}</div>
      `;

      card.addEventListener('click', () => {
        if (isUnlocked) {
          soundEngine.playStar();
          soundEngine.speak(`${sticker.name}. ${sticker.desc}`);
          confetti.burst({ count: 35 });
        } else {
          soundEngine.playEncourage();
          soundEngine.speak(`Kumpulkan ${sticker.starsRequired} bintang untuk membuka stiker ini!`);
        }
      });

      this.dom.stickersGrid.appendChild(card);
    });

    this.dom.albumOverlay.classList.add('active');
  }

  // ==========================================
  // SETTINGS & CUSTOMIZATION SCREEN CONTROLLER
  // ==========================================
  openSettingsScreen(tab = 'clown') {
    if (!this.settingsDataInitialized) {
      this.initSettingsData();
      this.settingsDataInitialized = true;
    }
    this.switchSettingsTab(tab);
  }

  switchSettingsTab(tabName) {
    if (this.dom.setTabBtnClown) this.dom.setTabBtnClown.classList.toggle('active', tabName === 'clown');
    if (this.dom.setTabBtnWord) this.dom.setTabBtnWord.classList.toggle('active', tabName === 'word');
    if (this.dom.setTabBtnCount) this.dom.setTabBtnCount.classList.toggle('active', tabName === 'count');
    if (this.dom.setTabBtnBalloon) this.dom.setTabBtnBalloon.classList.toggle('active', tabName === 'balloon');

    if (this.dom.setTabContentClown) this.dom.setTabContentClown.classList.toggle('active', tabName === 'clown');
    if (this.dom.setTabContentWord) this.dom.setTabContentWord.classList.toggle('active', tabName === 'word');
    if (this.dom.setTabContentCount) this.dom.setTabContentCount.classList.toggle('active', tabName === 'count');
    if (this.dom.setTabContentBalloon) this.dom.setTabContentBalloon.classList.toggle('active', tabName === 'balloon');

    if (tabName === 'word' && this.dom.inputSettingsWord) {
      setTimeout(() => this.dom.inputSettingsWord.focus(), 150);
    }
  }

  initSettingsData() {
    // 1. Sync Star Target & Duration inputs/pills
    if (this.dom.inputCustomStarTarget) {
      this.dom.inputCustomStarTarget.value = this.starTarget;
    }
    const starPills = document.querySelectorAll('.btn-star-target-pill');
    starPills.forEach(p => {
      const val = parseInt(p.getAttribute('data-target'), 10);
      p.classList.toggle('active', val === this.starTarget);
    });

    const durPills = document.querySelectorAll('.btn-clown-duration-pill');
    durPills.forEach(p => {
      const val = parseInt(p.getAttribute('data-duration'), 10);
      p.classList.toggle('active', val === this.clownDuration);
    });

    // 2. Render Clown Models Selection Grid
    this.renderClownModelSettingsGrid();

    // 3. Populate Word Presets
    this.populateSettingsWordPresets();

    // 4. Populate Number Buttons
    this.populateSettingsNumbers();

    // 5. Populate Balloon Grid
    this.populateSettingsBalloonSymbols();
  }

  setStarTarget(val) {
    this.starTarget = val;
    localStorage.setItem('edu_star_target', val.toString());
  }

  setClownDuration(sec) {
    this.clownDuration = sec;
    localStorage.setItem('edu_clown_duration', sec.toString());
  }

  setClownModel(modelId) {
    this.clownModel = modelId;
    localStorage.setItem('edu_clown_model', modelId);
    this.renderClownModelSettingsGrid();
  }

  renderClownModelSettingsGrid() {
    if (!this.dom.clownModelsSelectionGrid) return;
    this.dom.clownModelsSelectionGrid.innerHTML = '';

    // Option 1: Random Variatif
    const randomCard = document.createElement('div');
    randomCard.className = `clown-model-card ${this.clownModel === 'random' ? 'active' : ''}`;
    randomCard.innerHTML = `
      <div class="clown-card-avatar" style="background: #FEF3C7;">🎲</div>
      <div class="clown-card-name">Acak Bergantian</div>
      <div class="clown-card-badge">Selalu Variasi</div>
    `;
    randomCard.addEventListener('click', () => {
      soundEngine.playPop();
      this.setClownModel('random');
    });
    this.dom.clownModelsSelectionGrid.appendChild(randomCard);

    // Specific clown cards from CLOWNS_DATABASE
    CLOWNS_DATABASE.forEach(clown => {
      const card = document.createElement('div');
      card.className = `clown-model-card ${this.clownModel === clown.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="clown-card-avatar" style="background: ${clown.bgColor};">🤡</div>
        <div class="clown-card-name">${clown.name.split(' ')[1] || clown.name}</div>
        <div class="clown-card-badge">${clown.role.split('&')[0]}</div>
      `;
      card.addEventListener('click', () => {
        soundEngine.playPop();
        this.setClownModel(clown.id);
      });
      this.dom.clownModelsSelectionGrid.appendChild(card);
    });
  }

  populateSettingsWordPresets() {
    if (!this.dom.settingsWordsPresets) return;
    const presets = [
      'MAMA', 'PAPA', 'AYAH', 'IBU', 
      'DINO', 'BUKU', 'ADIK', 'KUCING', 
      'AYAM', 'BUNGA', 'RUMAH', 'MOBIL', 
      'PISANG', 'BINTANG'
    ];

    this.dom.settingsWordsPresets.innerHTML = '';
    presets.forEach(word => {
      const chip = document.createElement('button');
      chip.className = 'custom-chip';
      chip.textContent = word;
      chip.addEventListener('click', () => {
        soundEngine.playClick();
        this.dom.inputSettingsWord.value = word;
        this.handleSettingsWordSubmit();
      });
      this.dom.settingsWordsPresets.appendChild(chip);
    });
  }

  populateSettingsNumbers() {
    if (!this.dom.settingsNumberButtons) return;
    this.dom.settingsNumberButtons.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement('button');
      btn.className = 'btn-custom-num-choice';
      btn.textContent = i;
      btn.title = `Pilih Angka ${i}`;
      btn.addEventListener('click', () => {
        soundEngine.playClick();
        this.playCustomNumber(i);
      });
      this.dom.settingsNumberButtons.appendChild(btn);
    }
  }

  setSettingsBalloonFilter(filterType) {
    this.currentBalloonFilter = filterType;
    if (this.dom.settingsBalloonFilterLetters) this.dom.settingsBalloonFilterLetters.classList.toggle('active', filterType === 'letters');
    if (this.dom.settingsBalloonFilterNumbers) this.dom.settingsBalloonFilterNumbers.classList.toggle('active', filterType === 'numbers');
    this.populateSettingsBalloonSymbols();
  }

  populateSettingsBalloonSymbols() {
    if (!this.dom.settingsBalloonGrid) return;
    this.dom.settingsBalloonGrid.innerHTML = '';

    if (this.currentBalloonFilter === 'letters') {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let char of alphabet) {
        const btn = document.createElement('button');
        btn.className = 'btn-custom-symbol-choice';
        btn.textContent = char;
        btn.title = `Target Huruf ${char}`;
        btn.addEventListener('click', () => {
          soundEngine.playClick();
          this.playCustomBalloon(char, true);
        });
        this.dom.settingsBalloonGrid.appendChild(btn);
      }
    } else {
      for (let i = 1; i <= 9; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn-custom-symbol-choice';
        btn.textContent = i;
        btn.title = `Target Angka ${i}`;
        btn.addEventListener('click', () => {
          soundEngine.playClick();
          this.playCustomBalloon(`${i}`, false);
        });
        this.dom.settingsBalloonGrid.appendChild(btn);
      }
    }
  }

  handleSettingsWordSubmit() {
    const rawVal = this.dom.inputSettingsWord.value.trim().toUpperCase();
    const cleanWord = rawVal.replace(/[^A-Z]/g, '').slice(0, 7);

    if (!cleanWord || cleanWord.length < 2) {
      soundEngine.playEncourage();
      this.showMotivationBanner('Ketik kata minimal 2 huruf ya! ✍️');
      soundEngine.speak('Ketik kata minimal dua huruf ya!');
      return;
    }

    // Create custom word entry
    const customWordObj = {
      id: 'custom_' + Date.now(),
      word: cleanWord,
      letters: cleanWord.split(''),
      category: 'Kustom Kamu ✏️',
      themeColor: '#8338EC',
      bgColor: '#F3E8FF',
      soundText: cleanWord,
      sentence: `Ayo susun kata ${cleanWord}! Kamu pasti bisa!`,
      svg: this.generateCustomWordSVG(cleanWord)
    };

    // Prepend to WORDS_DATABASE and select
    WORDS_DATABASE.unshift(customWordObj);
    this.spellingIndex = 0;

    this.switchScreen('spelling');
    this.loadSpellingQuestion();

    soundEngine.playCorrect();
    confetti.burst({ count: 45 });
    this.renderMascot('cheer', `Kata baru: ${cleanWord}! Ayo dieja ya! 🚀`);
    soundEngine.speak(`Ayo susun huruf untuk kata ${cleanWord}!`);
    this.dom.inputSettingsWord.value = '';
  }

  generateCustomWordSVG(word) {
    const sparkles = `
      <polygon points="25,25 28,33 36,33 30,38 32,46 25,41 18,46 20,38 14,33 22,33" fill="#FFD166"/>
      <polygon points="135,28 137,34 143,34 138,38 140,44 135,40 130,44 132,38 127,34 133,34" fill="#FFD166"/>
      <circle cx="28" cy="125" r="4" fill="#38BDF8"/>
      <circle cx="132" cy="125" r="5" fill="#F472B6"/>
    `;

    return `
      <svg viewBox="0 0 160 160" width="100%" height="100%">
        <defs>
          <linearGradient id="customBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#C084FC" />
            <stop offset="100%" stop-color="#7C3AED" />
          </linearGradient>
        </defs>
        ${sparkles}
        <rect x="18" y="24" width="124" height="112" rx="28" fill="url(#customBadgeGrad)" filter="drop-shadow(0 8px 14px rgba(124, 58, 237, 0.35))"/>
        <rect x="24" y="30" width="112" height="100" rx="22" fill="#FFFFFF" opacity="0.18"/>
        <!-- Mascot smiley in badge -->
        <circle cx="80" cy="62" r="22" fill="#FFD166" stroke="#FFFFFF" stroke-width="3"/>
        <circle cx="72" cy="59" r="3" fill="#1E293B"/>
        <circle cx="88" cy="59" r="3" fill="#1E293B"/>
        <path d="M74,68 Q80,74 86,68" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Custom Word in Badge -->
        <text x="80" y="112" font-size="20" font-family="'Nunito', sans-serif" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
          ${word}
        </text>
      </svg>
    `;
  }

  playCustomNumber(numberVal) {
    const foundIndex = NUMBERS_DATABASE.findIndex(n => n.number === numberVal);
    this.countingIndex = foundIndex !== -1 ? foundIndex : 0;

    this.switchScreen('counting');
    this.loadCountingQuestion();

    soundEngine.playPop();
    confetti.burst({ count: 45 });
    this.renderMascot('happy', `Ayo hitung ada berapa benda di layar! 🔢`);
  }

  playCustomBalloon(symbol, isLetter) {
    this.switchScreen('balloons');
    this.loadCustomBalloonRound(symbol, isLetter);
  }

  loadCustomBalloonRound(targetSymbol, isLetter) {
    this.balloonType = isLetter ? 'letter' : 'number';
    this.currentBalloonTarget = targetSymbol;
    this.dom.balloonTargetSymbol.textContent = targetSymbol;

    const colors = ['#FF477E', '#3A86FF', '#06D6A0', '#FFD166', '#8338EC', '#FF9F1C'];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let pool = [targetSymbol];
    if (isLetter) {
      while (pool.length < 4) {
        const rand = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!pool.includes(rand)) pool.push(rand);
      }
    } else {
      while (pool.length < 4) {
        const rand = `${Math.floor(Math.random() * 9) + 1}`;
        if (!pool.includes(rand)) pool.push(rand);
      }
    }

    const promptText = `Pecahkan balon dengan ${isLetter ? 'huruf' : 'angka'} ${targetSymbol}!`;
    this.dom.balloonTargetPrompt.textContent = promptText;

    // Shuffle pool
    pool.sort(() => Math.random() - 0.5);

    // Render balloons in sky
    this.dom.balloonsSky.innerHTML = '';
    pool.forEach((symbol, index) => {
      const balloon = document.createElement('div');
      balloon.className = 'floating-balloon';
      const color = colors[index % colors.length];
      balloon.style.background = color;
      balloon.style.animationDelay = `${(index * 0.4).toFixed(1)}s`;

      balloon.innerHTML = `
        <span class="balloon-symbol">${symbol}</span>
        <div class="floating-balloon-string"></div>
      `;

      balloon.addEventListener('click', (e) => {
        this.handleBalloonTap(balloon, symbol, e);
      });

      this.dom.balloonsSky.appendChild(balloon);
    });

    this.renderMascot('cheer', promptText);
    soundEngine.speak(promptText);
  }

  // ==========================================
  // DANCING CLOWN REWARD SYSTEM
  // ==========================================
  startClownReward(previewDuration = null) {
    const duration = previewDuration || this.clownDuration || 10;
    
    // Determine which clown to show
    let selectedClown = null;
    if (this.clownModel === 'random') {
      const randomIndex = Math.floor(Math.random() * CLOWNS_DATABASE.length);
      selectedClown = CLOWNS_DATABASE[randomIndex];
    } else {
      selectedClown = CLOWNS_DATABASE.find(c => c.id === this.clownModel) || CLOWNS_DATABASE[0];
    }
    this.currentLiveClownId = selectedClown.id;

    // Render clown on stage
    this.renderClownOnStage(selectedClown);

    // Audio & Confetti
    soundEngine.startCarnivalMusic();
    soundEngine.playHornHonk();
    confetti.doubleCannon();

    // Show Overlay
    this.dom.clownRewardOverlay.classList.add('active');
    this.dom.clownRewardTitle.textContent = `Horeee! ${selectedClown.name} Berjoget! 🎉`;
    soundEngine.speak(`Horeee! Hadiah bintang tercapai! Lihat ${selectedClown.name} berjoget gembira!`);

    // Countdown Timer
    let remaining = duration;
    this.dom.clownCountdownTimer.textContent = remaining;

    if (this.clownTimer) clearInterval(this.clownTimer);
    this.clownTimer = setInterval(() => {
      remaining--;
      this.dom.clownCountdownTimer.textContent = remaining;

      // Regular confetti puffs during the dance
      if (remaining % 3 === 0) {
        confetti.burst({ count: 30 });
      }

      if (remaining <= 0) {
        this.stopClownReward();
      }
    }, 1000);
  }

  renderClownOnStage(clownObj) {
    this.dom.clownSvgStage.innerHTML = clownObj.svg;
  }

  switchClownLive() {
    const currentIndex = CLOWNS_DATABASE.findIndex(c => c.id === this.currentLiveClownId);
    const nextIndex = (currentIndex + 1) % CLOWNS_DATABASE.length;
    const nextClown = CLOWNS_DATABASE[nextIndex];
    this.currentLiveClownId = nextClown.id;

    this.renderClownOnStage(nextClown);
    this.dom.clownRewardTitle.textContent = `Horeee! ${nextClown.name} Berjoget! 🎉`;
    soundEngine.playHornHonk();
    confetti.burst({ count: 40 });
  }

  stopClownReward() {
    if (this.clownTimer) {
      clearInterval(this.clownTimer);
      this.clownTimer = null;
    }
    soundEngine.stopCarnivalMusic();
    this.dom.clownRewardOverlay.classList.remove('active');
    soundEngine.playPop();
  }

  // ==========================================
  // MASCOT CIKO THE CAT (SVG RENDERER)
  // ==========================================
  renderMascot(mood = 'happy', speechText = '') {
    this.dom.mascotSpeechText.textContent = speechText;

    let mascotEye = '';
    let mascotMouth = '';
    let mascotAccessory = '';

    if (mood === 'happy') {
      mascotEye = `
        <ellipse cx="36" cy="48" rx="5.5" ry="6.5" fill="#1E293B"/>
        <ellipse cx="64" cy="48" rx="5.5" ry="6.5" fill="#1E293B"/>
        <circle cx="38" cy="46" r="2.2" fill="#FFFFFF"/>
        <circle cx="66" cy="46" r="2.2" fill="#FFFFFF"/>
      `;
      mascotMouth = `<path d="M44,56 Q47,60 50,56 Q53,60 56,56" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    } else if (mood === 'cheer') {
      mascotEye = `
        <path d="M31,48 Q36,41 41,48" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M59,48 Q64,41 69,48" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
      `;
      mascotMouth = `<path d="M44,55 Q50,65 56,55 Z" fill="#EF4444"/>`;
      mascotAccessory = `
        <polygon points="50,10 38,32 62,32" fill="#FFD166" stroke="#F59E0B" stroke-width="2"/>
        <circle cx="50" cy="9" r="4" fill="#FF5E7E"/>
      `;
    } else if (mood === 'motivate') {
      mascotEye = `
        <path d="M30,48 Q35,43 40,48" stroke="#1E293B" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="64" cy="48" rx="5.5" ry="6.5" fill="#1E293B"/>
        <circle cx="66" cy="46" r="2.2" fill="#FFFFFF"/>
      `;
      mascotMouth = `<path d="M46,56 Q50,61 54,56" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      mascotAccessory = `
        <polygon points="78,54 81,61 88,61 82,65 84,72 78,68 72,72 74,65 68,61 75,61" fill="#FFD166" stroke="#F59E0B" stroke-width="1.5"/>
      `;
    }

    const svg = `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <radialGradient id="catHeadGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFDE7D"/>
            <stop offset="100%" stop-color="#F8B400"/>
          </radialGradient>
        </defs>
        <!-- Telinga -->
        <polygon points="26,40 18,16 42,28" fill="#F8B400"/>
        <polygon points="26,38 21,21 38,29" fill="#FF9A76"/>
        <polygon points="74,40 82,16 58,28" fill="#F8B400"/>
        <polygon points="74,38 79,21 62,29" fill="#FF9A76"/>
        <!-- Kepala -->
        <circle cx="50" cy="52" r="32" fill="url(#catHeadGrad)"/>
        <!-- Pipi -->
        <circle cx="28" cy="55" r="5" fill="#FF85A1" opacity="0.75"/>
        <circle cx="72" cy="55" r="5" fill="#FF85A1" opacity="0.75"/>
        <!-- Hidung -->
        <polygon points="50,53 47,50 53,50" fill="#FF5E7E"/>
        <!-- Mata & Mulut -->
        ${mascotEye}
        ${mascotMouth}
        <!-- Kumis -->
        <line x1="20" y1="52" x2="10" y2="50" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="20" y1="56" x2="12" y2="58" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="80" y1="52" x2="90" y2="50" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="80" y1="56" x2="88" y2="58" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
        ${mascotAccessory}
      </svg>
    `;

    this.dom.mascotSvgContainer.innerHTML = svg;
  }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.eduApp = new EduGameApp();
});
