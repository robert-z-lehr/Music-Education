
// Music Theory Application [javascript file]

//-----------------------------------------------------------------------------------------------------------------//
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//  IMPORT DEPENDENCIES & DEFINE OBJECTS  IMPORT DEPENDENCIES & DEFINE OBJECTS  IMPORT DEPENDENCIES & DEFINE OBJECTS  
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

// Create a global variable named 'VF' to store the VexFlow namespace after loading the library
let VF;

// Define an array of possible note durations.
const durations = ["8", "4", "2", "1"];

// Generate an array of note configurations, each with a note letter, accidental, and octave.
// For each note configuration, create a StaveNote object.
// The map function transforms each note configuration into a StaveNote.
// Adjusting the octave for treble clef to stay mostly on the staff

// Define notes for treble and bass clefs
const trebleNotes = [
    ["a", "", "4"],
    ["a", "b", "4"],
    ["a", "#", "4"],
    ["b", "", "4"],
    ["b", "b", "4"],
    ["b", "#", "4"],
    ["c", "", "4"],
    ["c", "b", "4"],
    ["c", "#", "4"],
    ["d", "", "4"],
    ["d", "b", "4"],
    ["d", "#", "4"],
    ["e", "", "4"],
    ["e", "b", "4"],
    ["e", "#", "4"],
    ["f", "", "4"],
    ["f", "b", "4"],
    ["f", "#", "4"],
    ["g", "", "4"],
    ["g", "b", "4"],
    ["g", "#", "4"]
];
const bassNotes = [
    ["a", "", "3"],
    ["a", "b", "3"],
    ["a", "#", "3"],
    ["b", "", "3"],
    ["b", "b", "3"],
    ["b", "#", "3"],
    ["c", "", "3"],
    ["c", "b", "3"],
    ["c", "#", "3"],
    ["d", "", "3"],
    ["d", "b", "3"],
    ["d", "#", "3"],
    ["e", "", "3"],
    ["e", "b", "3"],
    ["e", "#", "3"],
    ["f", "", "3"],
    ["f", "b", "3"],
    ["f", "#", "3"],
    ["g", "", "3"],
    ["g", "b", "3"],
    ["g", "#", "3"]
];

// Initialize VexFlow
window.onload = function() {
    generateSingleNoteQuestion();
};

//----------------------------------------------------------------------------------------------------------------------------------// 
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

// MAIN FUNCTION | MAIN FUNCTION | MAIN FUNCTION | MAIN FUNCTION | MAIN FUNCTION | MAIN FUNCTION | MAIN FUNCTION | MAIN FUNCTION |
function main() { // Main function to start the application
    // Start loading VexFlow immediately, not waiting for DOM content to load
    loadVexFlowScript();
}

// LOAD VEXFLOW LIBRARY FUNCTION | LOAD VEXFLOW LIBRARY FUNCTION | LOAD VEXFLOW LIBRARY FUNCTION | LOAD VEXFLOW LIBRARY FUNCTION |
function loadVexFlowScript() { // Function to load the VexFlow library and set up the application
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/vexflow/3.0.9/vexflow-min.js";
    script.onload = () => {
        VF = Vex.Flow;
        initializeMusicTheoryQuestions();
    };
    document.head.appendChild(script);
}

function initializeMusicTheoryQuestions() { // Function to initialize all music theory questions
    generateTimeSignatureQuestion();
    generateKeySignatureQuestion();
    generateRhythmQuestion();
    generateSingleNoteQuestion();
    generateArticulationQuestion(); // TBD
    generateAccidentalQuestion(); // TBD
    generateClefQuestion(); // TBD
    generateChordQuestion(); // TBD
    // Initialize more questions here...

    createScrollingNoteAnimation(document.getElementById('trebleScrollingNote'), {
        clef: 'treble',
        notes: trebleNotes
    });
    createScrollingNoteAnimation(document.getElementById('bassScrollingNote'), {
        clef: 'bass',
        notes: bassNotes
    });
}

// SINGLE NOTE UPDATED FUNCTION | SINGLE NOTE UPDATED FUNCTION | SINGLE NOTE UPDATED FUNCTION | SINGLE NOTE UPDATED FUNCTION |
function generateSingleNoteQuestion() {
    const questionDiv = document.getElementById("singleNoteQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start';
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'Name the note:';
    controlsContainer.appendChild(label);

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Note';
    button.addEventListener('click', generateSingleNoteQuestion);
    controlsContainer.appendChild(button);

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1';
    staffContainer.style.paddingLeft = '20px';
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(250, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 200);
    stave.addClef("treble").setContext(context).draw();

    // Generate and draw a random note
    const notes = [
        "c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4",
        "c#/4", "d#/4", "e#/4", "f#/4", "g#/4", "a#/4", "b#/4",
        "cb/4", "db/4", "eb/4", "fb/4", "gb/4", "ab/4", "bb/4",
        "c/5", "d/5", "e/5", "f/5", "g/5", "a/5", "b/5",
        "c#/5", "d#/5", "e#/5", "f#/5", "g#/5", "a#/5", "b#/5",
        "cb/5", "db/5", "eb/5", "fb/5", "gb/5", "ab/5", "bb/5"
    ];
    const durations = ["w", "h", "q", "8", "16"];
    const selectedNote = notes[Math.floor(Math.random() * notes.length)];
    const selectedDuration = durations[Math.floor(Math.random() * durations.length)];

    // auto_stem: true makes VexFlow actually run its own stem-direction
    // calculation (down at/above the middle line, up below it). Without this
    // flag VexFlow silently defaults every note to an upward stem.
    const note = new VF.StaveNote({
        keys: [selectedNote],
        duration: selectedDuration,
        auto_stem: true
    });

    // Add accidental if needed
    if (selectedNote.includes("#")) {
        note.addAccidental(0, new VF.Accidental("#"));
    } else if (selectedNote.includes("b")) {
        note.addAccidental(0, new VF.Accidental("b"));
    }

    VF.Formatter.FormatAndDraw(context, stave, [note]);
}

// RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | 
function generateRhythmQuestion() {
    const questionDiv = document.getElementById("rhythmQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start';
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'Clap the rhythm shown:';
    controlsContainer.appendChild(label);

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Rhythm';
    button.addEventListener('click', generateRhythmQuestion);
    controlsContainer.appendChild(button);

// Create and append the text box below the button
    // const textBox = document.createElement('input');
    // textBox.type = 'text';
    // textBox.setAttribute('maxlength', '200');
    // textBox.setAttribute('placeholder', 'Type your answer here...');
    // textBox.style.marginTop = '10px';
    // controlsContainer.appendChild(textBox);

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1';
    staffContainer.style.paddingLeft = '20px';
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150);
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 400);
    stave.addClef("percussion");
    stave.setContext(context).draw();

    // Define rhythm patterns and select one
    const rhythmPatterns = [
        ["q", "q", "q", "q"], 
        ["8", "8", "q", "q", "q"],
        ["q", "8", "8", "q", "q"],
        ["q", "q", "8", "8", "q"],
        ["16", "16", "16", "16", "q", "q"],
        ["1", "2", "q", "8", "16", "32"],
        ["3", "3", "2", "q", "8", "8", "16", "16"],
        ["1"]
    ];
    const selectedPattern = rhythmPatterns[Math.floor(Math.random() * rhythmPatterns.length)];

    // Generate and draw notes based on the selected rhythm pattern
    const notes = selectedPattern.map(duration => new VF.StaveNote({
        keys: ["b/4"],
        duration: duration,
        auto_stem: true
    }));
    const beams = VF.Beam.generateBeams(notes.filter(note => note.duration !== "q" && note.duration !== "h" && note.duration !== "w"));
    VF.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(beam => beam.setContext(context).draw());
}

// KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION |
function generateKeySignatureQuestion() {
    const questionDiv = document.getElementById("keySignatureQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start'; // Align items at the start of the container
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column'; // Stack items vertically
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'Identify the major key signature:';
    controlsContainer.appendChild(label); // Append the label to the controls container for vertical alignment

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Key Signature';
    button.addEventListener('click', generateKeySignatureQuestion);
    controlsContainer.appendChild(button); // Append the button to the controls container

// Create and append the text box below the button
    // const textBox = document.createElement('input');
    // textBox.type = 'text';
    // textBox.setAttribute('maxlength', '200');
    // textBox.setAttribute('placeholder', 'Type your answer here...');
    // textBox.style.marginTop = '10px'; // Add some space between the button and the text box
    // controlsContainer.appendChild(textBox); // Append the text box to the controls container

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1'; // Allow the staff container to take up remaining space
    staffContainer.style.paddingLeft = '20px'; // Add some space between the controls and the staff
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150); // Set the size of the staff
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 400); // Adjust starting position if needed

    // Define an array of possible key signatures and select one at random
    const keySignatures = [
        "C", "G", "D", "A", "E", "B", "F#", "C#",
        "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"
    ];
    const selectedKeySignature = keySignatures[Math.floor(Math.random() * keySignatures.length)];

    // Use the randomly selected key signature
    stave.addClef("treble").addKeySignature(selectedKeySignature);
    stave.setContext(context).draw();
}

// TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | 
function generateTimeSignatureQuestion() {
    const questionDiv = document.getElementById("timeSignatureQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start'; // Align items at the start of the container
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column'; // Stack items vertically
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'What does this time signature tell us?';
    controlsContainer.appendChild(label); // Append the label to the controls container for vertical alignment

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Time Signature';
    button.addEventListener('click', generateTimeSignatureQuestion);
    controlsContainer.appendChild(button); // Append the button to the controls container

// Create and append the text box below the button
    // const textBox = document.createElement('input');
    // textBox.type = 'text';
    // textBox.setAttribute('maxlength', '200');
    // textBox.setAttribute('placeholder', 'Type your answer here...');
    // textBox.style.marginTop = '10px'; // Add some space between the button and the text box
    // controlsContainer.appendChild(textBox); // Append the text box to the controls container

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1'; // Allow the staff container to take up remaining space
    staffContainer.style.paddingLeft = '20px'; // Add some space between the controls and the staff
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150); // Set the size of the staff
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 400); // Adjust starting position if needed
    const timeSignatures = ["4/4", "3/4", "2/4", "6/8", "5/4", "7/8"];
    const selectedTimeSignature = timeSignatures[Math.floor(Math.random() * timeSignatures.length)];
    stave.addTimeSignature(selectedTimeSignature);
    stave.setContext(context).draw();
}

// GENERATE CLEF FUNCTION | GENERATE CLEF FUNCTION | GENERATE CLEF FUNCTION | GENERATE CLEF FUNCTION | GENERATE CLEF FUNCTION |
function generateClefQuestion() { // Logic for generating a new clef question
}

// GENERATE ARTICULATION FUNCTION | GENERATE ARTICULATION FUNCTION | GENERATE ARTICULATION FUNCTION | GENERATE ARTICULATION FUNCTION |
function generateArticulationQuestion() { // Logic for generating a new articulation question
}

// GENERATE ACCIDENTAL FUNCTION | GENERATE ACCIDENTAL FUNCTION | GENERATE ACCIDENTAL FUNCTION | GENERATE ACCIDENTAL FUNCTION |
function generateAccidentalQuestion() { // Logic for generating a new articulation question
}

// GENERATE CHORD FUNCTION | GENERATE CHORD FUNCTION | GENERATE CHORD FUNCTION | GENERATE CHORD FUNCTION | GENERATE CHORD FUNCTION |
function generateChordQuestion() { // Logic for generating a new chord question
}

// SCROLLING NOTE ANIMATION FACTORY | SCROLLING NOTE ANIMATION FACTORY | SCROLLING NOTE ANIMATION FACTORY |
// Builds a self-contained scrolling-note-animation instance (its own stave,
// renderer, controls, and note-group state) into `container`, parameterized
// by clef so the same logic drives both a treble-only and a bass-only
// instance instead of duplicating it.
function createScrollingNoteAnimation(container, { clef, notes }) {
    container.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = clef === 'treble' ? 'Treble Clef' : 'Bass Clef';
    container.appendChild(heading);

    const animationContainer = document.createElement('div');
    animationContainer.classList.add('animation-container');
    const outputDiv = document.createElement('div');
    animationContainer.appendChild(outputDiv);
    container.appendChild(animationContainer);

    const controlsDiv = document.createElement('div');
    controlsDiv.classList.add('controls');
    container.appendChild(controlsDiv);

    const addNoteBtn = document.createElement('button');
    addNoteBtn.textContent = 'Add Note';
    const rightAnswerBtn = document.createElement('button');
    rightAnswerBtn.textContent = 'Right Answer';
    const wrongAnswerBtn = document.createElement('button');
    wrongAnswerBtn.textContent = 'Wrong Answer';
    const tooSlowBtn = document.createElement('button');
    tooSlowBtn.textContent = 'Too Slow';
    [addNoteBtn, rightAnswerBtn, wrongAnswerBtn, tooSlowBtn].forEach(btn => controlsDiv.appendChild(btn));

    const renderer = new VF.Renderer(outputDiv, VF.Renderer.Backends.SVG);
    renderer.resize(1560, 1000);
    const context = renderer.getContext();
    const tickContext = new VF.TickContext();
    const stave = new VF.Stave(10, 10, 1550).addClef(clef);
    stave.setContext(context).draw();
    tickContext.preFormat().setX(1540);

    const visibleNoteGroups = [];

    function addNote() {
        const randomIndex = Math.floor(Math.random() * notes.length);
        const [letter, accidental, octave] = notes[randomIndex];
        const duration = durations[Math.floor(Math.random() * durations.length)];

        const note = new VF.StaveNote({
            clef,
            keys: [`${letter}${accidental}/${octave}`],
            duration: duration,
            auto_stem: true
        });

        if (accidental) {
            note.addAccidental(0, new VF.Accidental(accidental));
        }

        tickContext.addTickable(note).preFormat().setX(1540);

        const noteGroup = context.openGroup();
        note.setContext(context).setStave(stave).draw();
        context.closeGroup();

        window.getComputedStyle(noteGroup).transform;
        noteGroup.classList.add("scroll");

        setTimeout(() => {
            noteGroup.classList.add("scrolling");
        }, 100); // Ensures CSS catches up to start transition

        visibleNoteGroups.push(noteGroup);
    }

    function animateAnswer(className, translateY) {
        if (visibleNoteGroups.length === 0) return;

        const group = visibleNoteGroups.shift();
        group.classList.add(className);

        // Force a reflow to ensure the transform applies immediately
        window.getComputedStyle(group).transform;

        const transformMatrix = window.getComputedStyle(group).transform;
        const x = transformMatrix.split(",")[4].trim();
        group.style.transform = `translate(${x}px, ${translateY}px)`;
    }

    addNoteBtn.addEventListener('click', () => {
        animationContainer.style.borderColor = 'black';
        addNote();
    });
    rightAnswerBtn.addEventListener('click', () => {
        animationContainer.style.borderColor = 'green';
        animateAnswer('correct', -800);
    });
    wrongAnswerBtn.addEventListener('click', () => {
        animationContainer.style.borderColor = 'red';
        animateAnswer('incorrect', 800);
    });
    tooSlowBtn.addEventListener('click', () => {
        animationContainer.style.borderColor = 'purple';
        animateAnswer('too-slow', 0);
    });
}

// CLEAR AND RENDER CONTENT FUNCTION | CLEAR AND RENDER CONTENT FUNCTION | CLEAR AND RENDER CONTENT FUNCTION | CLEAR AND RENDER CONTENT FUNCTION |
function clearAndSetUpRenderer(elementId) { // To set up the renderer and clear previous content
    const div = document.getElementById(elementId);
    div.innerHTML = '';
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150);
    const context = renderer.getContext();
    return { div, context };
}

// SELECT RANDOM ELEMENT FROM ARRAY FUNCTION | SELECT RANDOM ELEMENT FROM ARRAY FUNCTION | SELECT RANDOM ELEMENT FROM ARRAY FUNCTION |
function selectRandomElement(array) { // Function to select a random element from an array
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// ADD NEW QUESTION BUTTON FUNCTION | ADD NEW QUESTION BUTTON FUNCTION | ADD NEW QUESTION BUTTON FUNCTION | ADD NEW QUESTION BUTTON FUNCTION |
function addNewQuestionButton(div, buttonText, onClickFunction) { // to add a new question button
    const btn = document.createElement('button');
    btn.textContent = buttonText;
    btn.onclick = onClickFunction;
    div.appendChild(btn);
}

// APPEND QUESTION LABEL FUNCTION | APPEND QUESTION LABEL FUNCTION | APPEND QUESTION LABEL FUNCTION | APPEND QUESTION LABEL FUNCTION |
function appendQuestionLabel(div, labelText) { // Function to append a question label
    div.insertAdjacentHTML('beforeend', `<p>${labelText}</p>`);
}

// Call the main function to start the application
main();