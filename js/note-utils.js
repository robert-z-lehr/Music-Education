// Shared note-name <-> MIDI helpers used by the piano keyboard and audio engine.
// Note names use sharps only (e.g. "C4", "F#3"), consistent with the rest of the app.

const NOTE_TO_SEMITONE = {
    C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
    "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};

const SEMITONE_TO_NOTE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const BLACK_KEY_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]);

const NOTE_PATTERN = /^([A-G])(#)?(-?\d+)$/;

export function noteToMidi(note) {
    const match = NOTE_PATTERN.exec(note);
    if (!match) {
        throw new Error(`Invalid note name: "${note}"`);
    }
    const [, letter, sharp, octaveStr] = match;
    const pitchClass = NOTE_TO_SEMITONE[letter + (sharp || "")];
    const octave = parseInt(octaveStr, 10);
    return (octave + 1) * 12 + pitchClass;
}

export function midiToNote(midi) {
    const pitchClass = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    return `${SEMITONE_TO_NOTE[pitchClass]}${octave}`;
}

export function isBlackKey(midi) {
    const pitchClass = ((midi % 12) + 12) % 12;
    return BLACK_KEY_PITCH_CLASSES.has(pitchClass);
}
