/**
 * Web Audio API Sound Generator & Web Speech API Voice Controller
 * 100% self-contained, zero external audio files needed!
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.speechSynth = window.speechSynthesis || null;
    this.idVoice = null;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
    this.bgmVolume = 0.08;

    this.initSpeech();
    // AudioContext will be initialized on first user gesture
    document.addEventListener('pointerdown', () => this.ensureContext(), { once: true });
    document.addEventListener('keydown', () => this.ensureContext(), { once: true });
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initSpeech() {
    if (!this.speechSynth) return;

    const findVoice = () => {
      const voices = this.speechSynth.getVoices();
      // Try to find an Indonesian voice
      this.idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID')) ||
                     voices.find(v => v.lang.includes('ms') || v.lang.includes('MS')) ||
                     null;
    };

    findVoice();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = findVoice;
    }
  }

  /**
   * Speak a phrase in friendly Indonesian
   */
  speak(text, onEnd) {
    if (this.isMuted || !this.speechSynth) {
      if (onEnd) setTimeout(onEnd, 300);
      return;
    }

    try {
      this.speechSynth.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.idVoice) {
        utterance.voice = this.idVoice;
        utterance.lang = this.idVoice.lang;
      } else {
        utterance.lang = 'id-ID';
      }
      utterance.rate = 0.88;  // Friendly, clear pace for 4-year-olds
      utterance.pitch = 1.2;  // High, cheerful, child-friendly pitch
      utterance.volume = 1.0;

      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      if (onEnd) onEnd();
    }
  }

  /**
   * Gentle bubble pop sound
   */
  playPop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    // Frequency sweep upward (bubbly pop)
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Balloon bursting pop sound with bubbly snap
   */
  playBalloonPop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // High snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  /**
   * Playful cute cat meow / chirp sound for Mascot Ciko
   */
  playMeow() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Cat meow pitch curve: rises then drops
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(460, now + 0.34);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  /**
   * Light click sound when pressing letters or buttons
   */
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * Happy xylophone chime for counting items (1, 2, 3...)
   */
  playCountNote(index = 1) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    // Major scale frequencies: C4, D4, E4, F4, G4, A4, B4, C5, D5, E5
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
    const freq = notes[Math.min(index - 1, notes.length - 1)] || 440;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm bell/xylophone envelope
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Joyful celebration jingle for correct answer (C - E - G - C5 fanfare)
   */
  playCorrect() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    chords.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (i * 0.09);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.3, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.36);
    });
  }

  /**
   * Gentle, warm encouraging chime (NOT harsh buzzer!)
   * Plays a supportive, uplifting two-tone bounce
   */
  playEncourage() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Two soft warm tones: G4 -> A4 (resolving upward, encouraging!)
    const notes = [392.00, 440.00];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (i * 0.14);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }

  /**
   * Star sparkling harp sound
   */
  playStar() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 987.77, 1318.51];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + (i * 0.06);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.26);
    });
  }

  /**
   * Cheerful background music generator using soothing marimba arpeggio
   */
  startBgm() {
    if (this.isBgmPlaying || this.isMuted) return;
    this.ensureContext();
    this.isBgmPlaying = true;

    const melody = [
      523.25, 659.25, 783.99, 659.25, // C E G E
      587.33, 698.46, 880.00, 698.46, // D F A F
      659.25, 783.99, 987.77, 783.99, // E G B G
      523.25, 659.25, 783.99, 1046.50 // C E G C6
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;

      const freq = melody[step % melody.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(this.bgmVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);

      step++;
      this.bgmTimer = setTimeout(playNext, 450);
    };

    playNext();
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  /**
   * Cheerful carnival polka tune for dancing clown reward
   */
  startCarnivalMusic() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.stopCarnivalMusic();

    this.isCarnivalPlaying = true;
    const notes = [
      { f: 523.25, d: 0.16 }, // C5
      { f: 587.33, d: 0.16 }, // D5
      { f: 659.25, d: 0.16 }, // E5
      { f: 698.46, d: 0.16 }, // F5
      { f: 783.99, d: 0.32 }, // G5
      { f: 659.25, d: 0.16 }, // E5
      { f: 783.99, d: 0.32 }, // G5
      { f: 659.25, d: 0.16 }, // E5
      { f: 523.25, d: 0.32 }, // C5
      { f: 587.33, d: 0.16 }, // D5
      { f: 659.25, d: 0.16 }, // E5
      { f: 587.33, d: 0.16 }, // D5
      { f: 523.25, d: 0.32 }, // C5
      { f: 392.00, d: 0.32 }  // G4
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isCarnivalPlaying || !this.ctx) return;
      const note = notes[noteIdx];
      const now = this.ctx.currentTime;

      // Melody note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + note.d);

      // Bass oom-pah
      if (noteIdx % 2 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(note.f / 4, now);
        bassGain.gain.setValueAtTime(0.10, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + note.d * 1.4);
        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + note.d * 1.4);
      }

      noteIdx = (noteIdx + 1) % notes.length;
      this.carnivalTimer = setTimeout(playNext, note.d * 1000);
    };

    playNext();
  }

  stopCarnivalMusic() {
    this.isCarnivalPlaying = false;
    if (this.carnivalTimer) {
      clearTimeout(this.carnivalTimer);
      this.carnivalTimer = null;
    }
  }

  /**
   * Funny clown bike-horn honk sound
   */
  playHornHonk() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 587.33].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.20);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
      this.stopCarnivalMusic();
      if (this.speechSynth) this.speechSynth.cancel();
    } else {
      this.startBgm();
    }
    return this.isMuted;
  }
}

// Global instance
window.soundEngine = new SoundEngine();

