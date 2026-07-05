import { noteToMidi } from "./note-utils.js";

// Contract future audio engines (e.g. a Tone.js-backed one) must implement so
// PianoKeyboard/piano-main.js can swap engines without any other changes:
//   unlock(), playNote(note, duration), noteOff(note), stopAll()
export class AudioEngine {
    constructor({ attack = 0.01, release = 0.15, waveform = "triangle" } = {}) {
        this.attack = attack;
        this.release = release;
        this.waveform = waveform;
        this.context = null;
        this.masterGain = null;
        this.voices = new Map(); // note -> { oscillator, gainNode }
    }

    static noteToFrequency(note) {
        const midi = noteToMidi(note);
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    // Must be called from within a user-gesture handler (click/touch) so the
    // AudioContext isn't left "suspended" by autoplay policies (Safari/iOS).
    unlock() {
        if (!this.context) {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.3;
            this.masterGain.connect(this.context.destination);
        }
        if (this.context.state === "suspended") {
            this.context.resume();
        }
    }

    playNote(note, duration) {
        this.unlock();
        this._stopVoice(note, true);

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.type = this.waveform;
        oscillator.frequency.value = AudioEngine.noteToFrequency(note);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(1, now + this.attack);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        oscillator.start(now);

        this.voices.set(note, { oscillator, gainNode });

        if (typeof duration === "number") {
            this._scheduleRelease(note, now + duration);
        }
    }

    noteOff(note) {
        this._stopVoice(note, false);
    }

    stopAll() {
        for (const note of Array.from(this.voices.keys())) {
            this._stopVoice(note, true);
        }
    }

    _scheduleRelease(note, atTime) {
        const voice = this.voices.get(note);
        if (!voice) return;
        const now = this.context.currentTime;
        const delay = Math.max(0, atTime - now);
        setTimeout(() => this._stopVoice(note, false), delay * 1000);
    }

    // immediate=true skips the release ramp (used when retriggering the same note)
    _stopVoice(note, immediate) {
        const voice = this.voices.get(note);
        if (!voice) return; // idempotent: already stopped
        this.voices.delete(note);

        const { oscillator, gainNode } = voice;
        const now = this.context.currentTime;
        const releaseTime = immediate ? 0.02 : this.release;

        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + releaseTime);

        oscillator.stop(now + releaseTime + 0.02);
        oscillator.onended = () => {
            oscillator.disconnect();
            gainNode.disconnect();
        };
    }
}
