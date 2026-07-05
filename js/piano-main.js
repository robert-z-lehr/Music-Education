import { AudioEngine } from "./audio-engine.js";
import { PianoKeyboard } from "./piano-keyboard.js";

const container = document.getElementById("piano-keyboard");
const audioEngine = new AudioEngine();

const keyboard = new PianoKeyboard(container, {
    startNote: container.dataset.startNote || "C3",
    endNote: container.dataset.endNote || "B4",
});

container.addEventListener("pianokey:down", (e) => {
    const { note, source } = e.detail;
    if (source === "mouse" || source === "touch" || source === "keyboard") {
        audioEngine.playNote(note);
    }
});

container.addEventListener("pianokey:up", (e) => {
    const { note } = e.detail;
    audioEngine.noteOff(note);
});

window.addEventListener("pagehide", () => audioEngine.stopAll());
