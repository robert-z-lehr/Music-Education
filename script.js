const lessons = [
  {
    n: 1,
    title: "Make a Melody",
    description: "Choose a familiar tune, imitate a short right-hand phrase, and learn the keyboard by sound before symbols take over.",
    tags: ["ear", "imitation", "keyboard", "finger numbers"]
  },
  {
    n: 2,
    title: "Keep the Pulse",
    description: "Separate rhythm from pitch. Tap, clap, count, and then put the notes back in without losing the beat.",
    tags: ["pulse", "rhythm", "rests", "tempo"]
  },
  {
    n: 3,
    title: "Read What You Played",
    description: "Connect a melody you already know to staff direction, note names, steps, skips, repeats, and basic note values.",
    tags: ["notation", "staff", "treble clef", "note values"]
  },
  {
    n: 4,
    title: "Shape the Sound",
    description: "Turn correct notes into music using dynamics, articulation, phrasing, and deliberate listening.",
    tags: ["dynamics", "articulation", "phrasing"]
  },
  {
    n: 5,
    title: "Add the Left Hand",
    description: "Begin with single bass notes, fifths, and simple patterns. Build coordination without overloading either hand.",
    tags: ["left hand", "coordination", "bass", "fifths"]
  },
  {
    n: 6,
    title: "Build Chords",
    description: "Hear and construct intervals, major and minor triads, then use I, IV, and V to support a melody.",
    tags: ["intervals", "triads", "I–IV–V", "harmony"]
  },
  {
    n: 7,
    title: "Scales Explain Keys",
    description: "Use whole and half steps to build major scales, understand key signatures, and see where melodies get their note families.",
    tags: ["scales", "keys", "whole steps", "half steps"]
  },
  {
    n: 8,
    title: "Play from Chord Symbols",
    description: "Move from note-by-note dependence toward lead sheets, inversions, accompaniment patterns, and melody-plus-chords playing.",
    tags: ["lead sheets", "inversions", "accompaniment"]
  },
  {
    n: 9,
    title: "Hear Functional Harmony",
    description: "Learn seventh chords, ii–V–I motion, cadences, relative major/minor, and voice leading through real repertoire.",
    tags: ["7th chords", "ii–V–I", "cadences", "voice leading"]
  },
  {
    n: 10,
    title: "Use the Circle",
    description: "Use the circle of fifths as a map for key signatures, related keys, transposition, harmonic motion, and later modulation.",
    tags: ["circle of fifths", "transposition", "related keys"]
  },
  {
    n: 11,
    title: "Modes by Sound",
    description: "Introduce Dorian, Mixolydian, Aeolian, and other modes when repertoire gives them a job, not as an isolated memorization chart.",
    tags: ["modes", "improvisation", "modal sound"]
  },
  {
    n: 12,
    title: "Reharmonize",
    description: "Explore secondary dominants, tritone substitutions, altered dominants, and chord-scale relationships after functional harmony is secure.",
    tags: ["secondary dominants", "tritone substitution", "jazz"]
  }
];

const theory = [
  ["Sound + keyboard geography", "High/low, groups of 2 and 3 black keys, finger numbers.", "Lesson 1"],
  ["Pulse + rhythm", "Beat, note length, rests, counting, subdivision.", "Lessons 1–3"],
  ["Notation", "Staff direction, clefs, note names, values, measures, time signatures.", "Lessons 2–6"],
  ["Intervals + triads", "Build harmony from distances between notes and major/minor chord quality.", "Lessons 4–7"],
  ["Scales + keys", "Whole/half-step structure, key signatures, relative minor, scale fingering.", "Lessons 6–9"],
  ["Functional harmony", "I, IV, V, ii, vi, seventh chords, cadences, voice leading.", "Lessons 6–10"],
  ["Circle of fifths", "A compact map of key signatures, related keys, transposition, and harmonic distance.", "After keys make sense"],
  ["Modes", "Treat a familiar collection of notes as having a different tonal center; learn modes through repertoire.", "After scales + harmony"],
  ["Jazz harmony", "ii–V–I, secondary dominants, tritone substitutions, altered dominants, extensions.", "After 7th chords"],
  ["Independent musicianship", "Read, hear internally, improvise, arrange, compose, diagnose practice, and make musical choices.", "Continuous goal"]
];

const vocabulary = [
  ["Articulation", "How a note begins, connects, and ends, such as legato, staccato, or accented."],
  ["Cadence", "A harmonic arrival or punctuation point that creates varying degrees of rest or expectation."],
  ["Dynamics", "Relative loudness and changes in loudness over time."],
  ["Interval", "The distance between two pitches."],
  ["Key", "A tonal system organized around a home pitch and a characteristic collection of notes and harmonies."],
  ["Legato", "Notes played smoothly and connected."],
  ["Mode", "A scale-like pitch collection understood around a particular tonal center and characteristic interval pattern."],
  ["Phrase", "A musical idea that behaves somewhat like a sentence or clause."],
  ["Phrasing", "How a performer shapes direction, emphasis, breathing, and arrival across a musical phrase."],
  ["Pulse", "The underlying recurring beat you can tap along with."],
  ["Rhythm", "The pattern of durations and attacks that unfolds over the pulse."],
  ["Scale", "An ordered collection of pitches used as a framework for melody and harmony."],
  ["Staccato", "Notes played detached or shortened relative to their written duration."],
  ["Tempo", "The speed of the underlying beat."],
  ["Tonic", "The home pitch or chord of a key."],
  ["Triad", "A three-note chord commonly built from stacked thirds."],
  ["Tritone", "An interval spanning three whole steps; it is central to dominant seventh tension."],
  ["Tritone substitution", "In jazz, replacing a dominant seventh chord with another dominant seventh chord whose root is a tritone away, preserving the crucial guide-tone tritone while often creating chromatic bass motion."],
  ["Voice leading", "How individual notes move from one chord to the next, especially by small and smooth motions."]
];

const focusChoices = [
  "Pitch",
  "Rhythm",
  "Tempo",
  "Dynamics",
  "Articulation",
  "Phrasing",
  "Fingering",
  "Hand position",
  "Left/right coordination",
  "Relaxation",
  "Listening"
];

function renderLessons() {
  const grid = document.getElementById("lessonGrid");
  grid.innerHTML = lessons.map(lesson => `
    <article class="lesson-card">
      <span class="lesson-number">LESSON ${lesson.n.toString().padStart(2, "0")}</span>
      <h3>${lesson.title}</h3>
      <p>${lesson.description}</p>
      <div class="lesson-tags">
        ${lesson.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderTheory() {
  const map = document.getElementById("theoryMap");
  map.innerHTML = theory.map((item, index) => `
    <article class="theory-step">
      <span class="theory-index">${index + 1}</span>
      <div>
        <strong>${item[0]}</strong>
        <p>${item[1]}</p>
      </div>
      <span class="theory-when">${item[2]}</span>
    </article>
  `).join("");
}

function renderVocabulary(filter = "") {
  const list = document.getElementById("vocabList");
  const query = filter.trim().toLowerCase();
  const filtered = vocabulary.filter(([term, definition]) =>
    term.toLowerCase().includes(query) || definition.toLowerCase().includes(query)
  );

  list.innerHTML = filtered.length
    ? filtered.map(([term, definition]) => `
      <article class="vocab-item">
        <strong>${term}</strong>
        <span>${definition}</span>
      </article>
    `).join("")
    : `<p>No matching vocabulary yet.</p>`;
}

function setupNavigation() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupFocusGenerator() {
  const output = document.getElementById("focusOutput");
  const button = document.getElementById("newFocus");
  let previous = output.textContent;

  button.addEventListener("click", () => {
    let next = previous;
    while (next === previous && focusChoices.length > 1) {
      next = focusChoices[Math.floor(Math.random() * focusChoices.length)];
    }
    previous = next;
    output.textContent = next;
  });
}

function setupVocabularySearch() {
  const input = document.getElementById("vocabSearch");
  input.addEventListener("input", event => renderVocabulary(event.target.value));
}

function setupMetronome() {
  const slider = document.getElementById("bpmSlider");
  const value = document.getElementById("bpmValue");
  const button = document.getElementById("metronomeToggle");

  let timer = null;
  let audioContext = null;

  function clickBeat() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = 900;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.045);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
  }

  function start() {
    clickBeat();
    timer = window.setInterval(clickBeat, (60_000 / Number(slider.value)));
    button.textContent = "Stop metronome";
  }

  function stop() {
    window.clearInterval(timer);
    timer = null;
    button.textContent = "Start metronome";
  }

  slider.addEventListener("input", () => {
    value.textContent = slider.value;
    if (timer) {
      stop();
      start();
    }
  });

  button.addEventListener("click", async () => {
    if (audioContext?.state === "suspended") await audioContext.resume();
    timer ? stop() : start();
  });
}

renderLessons();
renderTheory();
renderVocabulary();
setupNavigation();
setupFocusGenerator();
setupVocabularySearch();
setupMetronome();
