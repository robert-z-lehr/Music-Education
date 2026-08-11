# Piano Studio — Beginner Remote Teaching Companion

This branch contains a lightweight GitHub Pages resource for beginner piano teaching.

## Teaching model

The core loop is:

**Hear → Imitate → Understand → Read → Explore**

The site intentionally lets beginners make recognizable music before notation becomes a gatekeeper. Reading grows in parallel with ear training and imitation.

Suggested balance:

- Lessons 1–2: about 80% ear/imitation, 20% reading
- Lessons 3–5: about 60% ear/imitation, 40% reading
- Lessons 6–10: roughly equal balance
- Later: adapt to the student's goals

## Curriculum arc

1. Make a Melody
2. Keep the Pulse
3. Read What You Played
4. Shape the Sound
5. Add the Left Hand
6. Build Chords
7. Scales Explain Keys
8. Play from Chord Symbols
9. Hear Functional Harmony
10. Use the Circle of Fifths
11. Modes by Sound
12. Reharmonize

The later path can branch toward classical repertoire, pop accompaniment, composition, improvisation, jazz, film/game music, or ear playing.

## Practice philosophy

Students are not expected to begin perfectly. They are expected to practice with increasing control.

1. Listen
2. Simplify
3. Slow down
4. Repeat the corrected version
5. Reconnect the fragment to the music

The site includes a focus generator and metronome to support this process.

## Adding lesson media

Store teacher-created media under `assets/` and use descriptive names such as:

```text
assets/
  lesson-01/
    melody-normal.mp3
    melody-slow.mp3
    phrase-01-loop.mp4
    keyboard-overhead.mp4
```

Good demonstration sets contain:

- a normal-speed performance
- a slow version
- a 2–5 second loop of the difficult fragment
- an optional overhead keyboard view

See `assets/README.md` for media conventions.

## Just the Facts

This public site should not reproduce scans, photographed pages, answer keys, or substantial copyrighted material from the commercial *Just the Facts* music-theory books without permission.

A clean approach is to:

- treat the books as optional companion workbooks
- have students obtain lawful copies when assigned
- reference the relevant book/lesson from this site
- create original explanations, examples, notation, games, audio, and exercises here

## Files

- `index.html` — student-facing site structure
- `styles.css` — responsive visual design
- `script.js` — lesson data, vocabulary, practice interactions, and metronome
- `TEACHING_GUIDE.md` — suggested remote lesson structure and curriculum notes
- `assets/README.md` — conventions for recordings and other lesson media

## Branch

Built on:

`agent/beginner-piano-teaching-site`
