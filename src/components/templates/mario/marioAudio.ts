/**
 * 8-Bit Retro Sound Effects & Chiptune Synthesizer using Web Audio API
 * No external sound files required — 100% reliable, zero-latency, works offline.
 */

class MarioAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Play a simple retro 8-bit jump sound
  public playJump() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Play coin collection chime (B5 -> E6)
  public playCoin() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.linearRampToValueAtTime(0.01, now + 0.08);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    gain2.gain.setValueAtTime(0.25, now + 0.08);
    gain2.gain.linearRampToValueAtTime(0.01, now + 0.35);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.36);
  }

  // Play block bump sound
  public playBump() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Play milestone / section unlocked chime
  public playPowerUp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [330, 392, 659, 523, 587, 784]; // E4, G4, E5, C5, D5, G5
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.06;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.linearRampToValueAtTime(0.01, start + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.09);
    });
  }

  // Play victory fanfare when reaching the wedding castle / partner
  public playFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Iconic celebration fanfare
    const fanfareNotes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.28 },
      { f: 415.30, d: 0.28 }, // G#4
      { f: 466.16, d: 0.28 }, // A#4
      { f: 523.25, d: 0.18 }, // C5
      { f: 466.16, d: 0.12 }, // A#4
      { f: 523.25, d: 0.65 }, // C5
    ];

    let current = ctx.currentTime;
    fanfareNotes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, current);

      gain.gain.setValueAtTime(0.22, current);
      gain.gain.linearRampToValueAtTime(0.01, current + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(current);
      osc.stop(current + note.d + 0.02);

      current += note.d + 0.04;
    });
  }

  // Joyful 8-Bit Wedding Chiptune Background Loop
  public startBgm() {
    if (this.isMuted || this.isBgmPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.isBgmPlaying = true;

    // Upbeat 8-bit chiptune melody (Here Comes The Bride / Romantic Mario cadence)
    const melody: { f: number; d: number }[] = [
      // Phrase 1: Romantic fanfare
      { f: 392.00, d: 0.3 }, // G4
      { f: 523.25, d: 0.3 }, // C5
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.4 },
      { f: 392.00, d: 0.3 }, // G4
      { f: 587.33, d: 0.3 }, // D5
      { f: 493.88, d: 0.3 }, // B4
      { f: 523.25, d: 0.5 }, // C5
      // Phrase 2
      { f: 392.00, d: 0.25 }, // G4
      { f: 523.25, d: 0.25 }, // C5
      { f: 659.25, d: 0.25 }, // E5
      { f: 783.99, d: 0.35 }, // G5
      { f: 659.25, d: 0.25 }, // E5
      { f: 523.25, d: 0.3 },  // C5
      { f: 587.33, d: 0.5 },  // D5
      // Phrase 3: Bouncy bridge
      { f: 659.25, d: 0.2 }, // E5
      { f: 698.46, d: 0.2 }, // F5
      { f: 783.99, d: 0.3 }, // G5
      { f: 659.25, d: 0.2 }, // E5
      { f: 523.25, d: 0.3 }, // C5
      { f: 587.33, d: 0.3 }, // D5
      { f: 523.25, d: 0.6 }, // C5
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.isBgmPlaying || this.isMuted) return;
      const c = this.getContext();
      if (!c) return;

      const n = melody[noteIdx];
      const now = c.currentTime;

      // Lead melody oscillator
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(n.f, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.linearRampToValueAtTime(0.005, now + n.d);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + n.d);

      // Bass accompaniment
      const bassOsc = c.createOscillator();
      const bassGain = c.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(n.f / 2, now);
      bassGain.gain.setValueAtTime(0.04, now);
      bassGain.gain.linearRampToValueAtTime(0.005, now + n.d);

      bassOsc.connect(bassGain);
      bassGain.connect(c.destination);
      bassOsc.start(now);
      bassOsc.stop(now + n.d);

      noteIdx = (noteIdx + 1) % melody.length;
      const nextDelay = (n.d + 0.08) * 1000;
      this.bgmInterval = window.setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearTimeout(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const marioAudio = new MarioAudioEngine();
