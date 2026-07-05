import { noteToMidi, midiToNote, isBlackKey } from "./note-utils.js";

const WHITE_KEY_WIDTH = 40;
const BLACK_KEY_WIDTH = 24;

// Reusable, audio-agnostic keyboard: renders keys for a note range and exposes
// both a real-input path (pointer/keyboard presses -> pianokey:down/up events)
// and a programmatic path (highlightKey/unhighlightKey) for later phases
// (scale/chord overlays, song playback) to drive visually without simulating
// real presses or triggering audio themselves.
export class PianoKeyboard {
    constructor(container, { startNote = "C3", endNote = "C5", onKeyDown = null, onKeyUp = null } = {}) {
        this.container = container;
        this.onKeyDown = onKeyDown;
        this.onKeyUp = onKeyUp;
        this.keyElements = new Map(); // note -> element
        this.pressedSources = new Map(); // note -> source (guards duplicate down/up)

        this.container.classList.add("piano-keyboard");
        this._bindEvents();
        this.setRange(startNote, endNote);
    }

    setRange(startNote, endNote) {
        const startMidi = noteToMidi(startNote);
        const endMidi = noteToMidi(endNote);
        if (endMidi < startMidi) {
            throw new Error(`endNote (${endNote}) must not be before startNote (${startNote})`);
        }
        this.startMidi = startMidi;
        this.endMidi = endMidi;
        this.pressedSources.clear();
        this._render();
    }

    getRange() {
        return { startNote: midiToNote(this.startMidi), endNote: midiToNote(this.endMidi) };
    }

    isValidNote(note) {
        let midi;
        try {
            midi = noteToMidi(note);
        } catch {
            return false;
        }
        return midi >= this.startMidi && midi <= this.endMidi;
    }

    getKeyElement(note) {
        return this.keyElements.get(note) || null;
    }

    highlightKey(note, { className = "is-active" } = {}) {
        const el = this.getKeyElement(note);
        if (el) el.classList.add(className);
    }

    unhighlightKey(note, { className = "is-active" } = {}) {
        const el = this.getKeyElement(note);
        if (el) el.classList.remove(className);
    }

    highlightKeys(notes, opts) {
        notes.forEach((note) => this.highlightKey(note, opts));
    }

    clearHighlights(className = "is-active") {
        this.keyElements.forEach((el) => el.classList.remove(className));
    }

    _render() {
        this.container.innerHTML = "";
        this.keyElements.clear();

        const wrapper = document.createElement("div");
        wrapper.className = "piano-keyboard__keys";

        let whiteIndex = -1; // index of the most recently placed white key
        const blackKeyElements = [];

        for (let midi = this.startMidi; midi <= this.endMidi; midi++) {
            const note = midiToNote(midi);
            const black = isBlackKey(midi);

            const el = document.createElement("div");
            el.className = `piano-key ${black ? "piano-key--black" : "piano-key--white"}`;
            el.dataset.note = note;
            el.setAttribute("role", "button");
            el.setAttribute("tabindex", "0");
            el.setAttribute("aria-label", note.replace("#", " sharp "));

            if (black) {
                el.style.left = `${(whiteIndex + 1) * WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2}px`;
                el.style.width = `${BLACK_KEY_WIDTH}px`;
                blackKeyElements.push(el);
            } else {
                whiteIndex++;
                el.style.width = `${WHITE_KEY_WIDTH}px`;
                wrapper.appendChild(el);
            }

            this.keyElements.set(note, el);
        }

        wrapper.style.width = `${(whiteIndex + 1) * WHITE_KEY_WIDTH}px`;
        blackKeyElements.forEach((el) => wrapper.appendChild(el));

        this.container.appendChild(wrapper);
    }

    _bindEvents() {
        this.container.addEventListener("pointerdown", (e) => {
            const el = e.target.closest(".piano-key");
            if (!el) return;
            try {
                el.setPointerCapture(e.pointerId);
            } catch {
                // Capture is a best-effort safety net for drag-off-key release;
                // the press itself must still register even if it fails.
            }
            this._press(el.dataset.note, e.pointerType === "touch" ? "touch" : "mouse");
        });

        this.container.addEventListener("pointerup", (e) => {
            const el = e.target.closest(".piano-key");
            if (!el) return;
            this._release(el.dataset.note);
        });

        this.container.addEventListener("pointercancel", (e) => {
            const el = e.target.closest(".piano-key");
            if (!el) return;
            this._release(el.dataset.note);
        });

        // Keyboard accessibility: Enter/Space act like a press on the focused key.
        this.container.addEventListener("keydown", (e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            const el = e.target.closest(".piano-key");
            if (!el || e.repeat) return;
            e.preventDefault();
            this._press(el.dataset.note, "keyboard");
        });

        this.container.addEventListener("keyup", (e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            const el = e.target.closest(".piano-key");
            if (!el) return;
            e.preventDefault();
            this._release(el.dataset.note);
        });
    }

    _press(note, source) {
        if (this.pressedSources.has(note)) return; // already down
        this.pressedSources.set(note, source);
        this.highlightKey(note, { className: "is-pressed" });
        if (this.onKeyDown) this.onKeyDown(note, source);
        this.container.dispatchEvent(new CustomEvent("pianokey:down", { detail: { note, source } }));
    }

    _release(note) {
        if (!this.pressedSources.has(note)) return; // idempotent
        const source = this.pressedSources.get(note);
        this.pressedSources.delete(note);
        this.unhighlightKey(note, { className: "is-pressed" });
        if (this.onKeyUp) this.onKeyUp(note, source);
        this.container.dispatchEvent(new CustomEvent("pianokey:up", { detail: { note, source } }));
    }
}
