# Beginner Music Score Studio

A browser-based, JSON-driven music education tool built for GitHub Pages.

## Development branch features

- Single-staff and grand-staff scores
- Multiple systems per page
- Optional note names, finger numbers, pitch colors, accidentals, dynamics, clefs, and tempo
- Large beginner-friendly notation on a cream paper interface
- Printable static piano keyboard
- Interactive Web Audio piano keyboard
- Direct PDF download
- Responsive desktop, tablet, and phone layout

## Edit the score content

Example scores are stored in `score-data.js`. Each score is plain JavaScript data so additional pieces can be added without changing the renderer.

```js
{ p: "f#/4", d: "q", f: 4, a: "#" }
```

- `p`: VexFlow pitch and octave
- `d`: duration, such as `q`, `h`, or `w`
- `f`: optional finger number
- `a`: optional displayed accidental

## Architecture

The first version intentionally separates score data, rendering, interface styling, keyboard audio, and PDF export. Future modules can add drag-and-drop editing, touch editing, MIDI, MusicXML, ABC notation, transposition, playback cursors, metronome, practice mode, worksheet mode, and flashcards.

## Local use

Open `index.html` through a local web server or deploy the branch with GitHub Pages. The application has no build step.

## Libraries

- VexFlow
- html2canvas
- jsPDF
