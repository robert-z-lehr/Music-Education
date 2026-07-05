
// Music Theory Application [javascript file]

//-----------------------------------------------------------------------------------------------------------------//
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//  IMPORT DEPENDENCIES & DEFINE OBJECTS  IMPORT DEPENDENCIES & DEFINE OBJECTS  IMPORT DEPENDENCIES & DEFINE OBJECTS  
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

// Create a global variable named 'VF' to store the VexFlow namespace after loading the library
let VF;

// Import necessary classes from the VexFlow library.
const { Renderer, TickContext, Stave, StaveNote, Accidental } = Vex.Flow;

// Select the HTML div element where the music notation will be rendered.
const div = document.getElementById("output");

// Initialize the renderer for the SVG format.
const renderer = new Renderer(div, Renderer.Backends.SVG);

// (Configure) Set the size of the SVG canvas where the music notation will appear.
renderer.resize(1560, 1000);

// Get the context of the renderer, which is necessary for drawing.
const context = renderer.getContext();

// Initialize a TickContext, which is necessary for managing the timing and positioning of notes.
const tickContext = new TickContext();

// Change 'const' to 'let' to allow reassignment
let stave = new Stave(10, 10, 1550).addClef("treble");

// Draw the stave on the SVG canvas.
stave.setContext(context).draw();

// Define an array of possible note durations.
const durations = ["8", "4", "2", "1"];

// Define an array of clefs
const clefs = ['treble', 'bass'];

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
// Prepare the TickContext for formatting by calculating the positions of tickables (notes).
tickContext.preFormat().setX(1540);  // Adjust to a value close to the end of your new stave width

// This array will hold groups of SVG elements that represent notes currently displayed on the stave.
const visibleNoteGroups = [];

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

    // Attach event listeners and other initializations that depend on the DOM being loaded
    document.addEventListener('DOMContentLoaded', function() {

        // Initialize UI components and other elements that need the DOM
        setUpDownloadButtons();
        renderSheetMusic(); // Make sure to render the sheet music once everything is loaded

        // TESTING - START
        // New functionality added here
        const VF = Vex.Flow;
        const musicContainer = document.getElementById("music-container");

        // Define the number of lines and measures per line
        const numberOfLines = 4;
        const measuresPerLine = 4;
        const measureWidth = 250;

        for (let i = 0; i < numberOfLines; i++) {
            const div = document.createElement('div');
            div.classList.add('stave-line');
            musicContainer.appendChild(div);

            const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
            renderer.resize(measuresPerLine * measureWidth, 150);
            const context = renderer.getContext();

            let startX = 10;
            for (let j = 0; j < measuresPerLine; j++) {
                const stave = new VF.Stave(startX, 0, measureWidth);
                if (j === 0) {
                    stave.addClef("treble").addTimeSignature("4/4");
                }
                stave.setContext(context).draw();

                const notes = [
                    new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
                    new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
                    new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
                    new VF.StaveNote({ keys: ["f/4"], duration: "q" })
                ];

                const voice = new VF.Voice({num_beats: 4, beat_value: 4});
                voice.addTickables(notes);
                new VF.Formatter().joinVoices([voice]).format([voice], 200);
                voice.draw(context, stave);

                startX += measureWidth;
            }
        } // TESTING - END
    });
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

    // Stem direction is intentionally omitted: VexFlow auto-computes the correct
    // direction from the note's staff position (down at/above the middle line,
    // up below it), same as addNote()/getRandomNote() elsewhere in this file.
    const note = new VF.StaveNote({
        keys: [selectedNote],
        duration: selectedDuration
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
        duration: duration
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

// EVENT LISTENERS SET UP FOR DONWLOAD BUTTONS FUNCTION | EVENT LISTENERS SET UP FOR DONWLOAD BUTTONS FUNCTION |
function setUpDownloadButtons() { // Function to set up event listeners for download buttons
    document.getElementById('downloadPdfBtn').addEventListener('click', downloadAsPDF);
    document.getElementById('downloadAsPngBtn').addEventListener('click', downloadAsPNG);
}

// DOWNLOAD AS PDF FUNCTION | DOWNLOAD AS PDF FUNCTION | DOWNLOAD AS PDF FUNCTION | DOWNLOAD AS PDF FUNCTION | DOWNLOAD AS PDF FUNCTION |
function downloadAsPDF() { // Function to download the rendered sheet music as PDF
    html2canvas(document.getElementById('sheetMusicContainer')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        // Access jsPDF from a namespaced property under window
        const pdf = new window.jspdf.jsPDF(); 
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('sheet-music.pdf');
    });
}

// DOWNLOAD AS PNG FUNCTION | DOWNLOAD AS PNG FUNCTION | DOWNLOAD AS PNG FUNCTION | DOWNLOAD AS PNG FUNCTION | DOWNLOAD AS PNG FUNCTION |
function downloadAsPNG() { // Function to download the rendered sheet music as PNG
    html2canvas(document.getElementById('sheetMusicContainer')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'sheet-music.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// HANDLE CLEF CHANGE FUNCTION | HANDLE CLEF CHANGE FUNCTION | HANDLE CLEF CHANGE FUNCTION | HANDLE CLEF CHANGE FUNCTION |
function handleClefChange() { // Listens for clef changes and redraw stave if needed
    const currentTime = new Date().getTime();
    if (currentTime % 2 === 0) {
        const newClef = stave.clef === "treble" ? "bass" : "treble";
        stave.setClef(newClef);
        context.clear();  // Clear the existing drawing
        stave.setContext(context).draw();
        console.log(`Clef changed to ${newClef}`);
    }
}

// RETRIEVE A RANDOM NOTE FUNCTION | RETRIEVE A RANDOM NOTE FUNCTION | RETRIEVE A RANDOM NOTE FUNCTION | RETRIEVE A RANDOM NOTE FUNCTION |
function getRandomNote() { // Function to get a random note from the appropriate range
    let noteArray = stave.clef === "treble" ? trebleNotes : bassNotes;
    const noteIndex = Math.floor(Math.random() * noteArray.length);
    const note = noteArray[noteIndex];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    return new StaveNote({
        clef: stave.clef,
        keys: [note],
        duration: duration.toString()
    });
}

// ADD NOTE FUNCTION | ADD NOTE FUNCTION | ADD NOTE FUNCTION | ADD NOTE FUNCTION | ADD NOTE FUNCTION | ADD NOTE FUNCTION | ADD NOTE FUNCTION |
function addNote() { // Update the addNote function to use this new method
    console.log("Attempting to add a note...");
    let notesArray = stave.clef === "treble" ? trebleNotes : bassNotes;

    if (notesArray.length === 0) {
        console.log("No more notes available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * notesArray.length);
    const [letter, accidental, octave] = notesArray[randomIndex];

    const duration = durations[Math.floor(Math.random() * durations.length)];
    console.log(`Creating note: ${letter}${accidental}/${octave} with duration: ${duration}`);

    const note = new StaveNote({
        clef: stave.clef,
        keys: [`${letter}${accidental}/${octave}`],
        duration: duration
    });

    if (accidental) {
        note.addAccidental(0, new Accidental(accidental));
    }

    tickContext.addTickable(note).preFormat().setX(1540);
    console.log("TickContext formatted and note added.");

    const noteGroup = context.openGroup();
    note.setContext(context).setStave(stave).draw();
    context.closeGroup();
    console.log("Note drawn on stave.");

    // Start off-screen to the right within the visible container
    // noteGroup.style.transform = 'translateX(0px)';
    window.getComputedStyle(noteGroup).transform;
    console.log("Initial transform applied.");
    noteGroup.classList.add("scroll");

    // Allow the transition to start smoothly
    setTimeout(() => {
        noteGroup.classList.add("scrolling");
        console.log("Scrolling class added, animation should start.");
    }, 100);  // Ensures CSS catches up to start transition

    visibleNoteGroups.push(noteGroup);
    console.log("Note group added to visible groups.");
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

// RENDER SHEET MUSIC FUNCTION | RENDER SHEET MUSIC FUNCTION | RENDER SHEET MUSIC FUNCTION | RENDER SHEET MUSIC FUNCTION |
function renderSheetMusic() { // Function to render sheet music using VexFlow
    
    const div = document.getElementById('sheetMusicContainer');
    div.innerHTML = ''; // Clear existing content

    // Create a container for the label
    const controlsContainer = document.createElement('div');
    div.appendChild(controlsContainer); // Append the container to the main div

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'View downloadable sheet music:';
    controlsContainer.appendChild(label);

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'Generate Sheet Music';
    button.addEventListener('click', generateSingleNoteQuestion);
    controlsContainer.appendChild(button);

    const VF = Vex.Flow;
    const width = 500; // Width of each stave
    const heightPerStave = 150; // Height per stave, adjust as needed
    const numberOfStaves = 4; // Total number of staves
    const measuresPerStave = 2; // Number of measures per stave

    div.style.width = `${width}px`;
    div.style.height = `${heightPerStave * numberOfStaves}px`;
    div.style.overflowY = 'auto';

    let staveYPosition = 10; // Initial Y position for the first stave

    for (let i = 0; i < numberOfStaves; i++) {
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(width, heightPerStave);
        const context = renderer.getContext();

        for (let j = 0; j < measuresPerStave; j++) {
            const staveXPosition = 10 + (width / measuresPerStave) * j;
            const staveWidth = width / measuresPerStave - 20; // Leave some margin on each side
            const stave = new VF.Stave(staveXPosition, staveYPosition, staveWidth);

            if (i === 0 && j === 0) {
                stave.addClef('treble');
            }
            stave.setContext(context).draw();

            // Create notes for the measure
            const notes = [
                new VF.StaveNote({ keys: ['d/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['b/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' }),
                // Repeat the pattern to fill the measure
                new VF.StaveNote({ keys: ['d/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['b/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' })
            ];

            // Create beams for the 16th notes
            const beams = VF.Beam.generateBeams(notes);

            // Create a voice and add notes
            const voice = new VF.Voice({num_beats: 4, beat_value: 4});
            voice.addTickables(notes);

            // Format and draw the voice
            new VF.Formatter().joinVoices([voice]).format([voice], staveWidth);
            voice.draw(context, stave);

            // Draw beams
            beams.forEach(beam => beam.setContext(context).draw());
        }

        staveYPosition += heightPerStave; // Move down for the next set of staves
    }
}

// Call the main function to start the application
main();

//----------------------------------------------------------------------------------------------------------------------//
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS   
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

// Listen for clicks on the "Add Note" button and add a note to the stave from the appropriate array (if there are any notes left)
document.getElementById("add-note").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "black";
    console.log("Add Note button clicked");

    // Determine which array to use based on the current clef
    let notesArray = stave.clef === "treble" ? trebleNotes : bassNotes;

    if (notesArray.length === 0) {
        console.log("No more notes available.");
        return;
    }

    handleClefChange(); // Handle clef changes based on condition
    addNote(); // Add note function that now correctly handles noteGroup scope
});

// Listen for clicks on the "Right Answer" button and animate the correctly answered note moving upwards.
document.getElementById("right-answer").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "green";
    if (visibleNoteGroups.length === 0) return;
    
    // Remove the first note group from the array and animate it
    const group = visibleNoteGroups.shift();
    group.classList.add("correct");

    // Force a reflow to ensure the transform applies immediately
    window.getComputedStyle(group).transform;

    // Extract the x translation value from the computed style and apply the transform
    const transformMatrix = window.getComputedStyle(group).transform;
    const x = transformMatrix.split(",")[4].trim();
    group.style.transform = `translate(${x}px, -800px)`;
});

// Listen for clicks on the "Wrong Answer" button and animate the correctly answered note moving upwards.
document.getElementById("wrong-answer").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "red";
    if (visibleNoteGroups.length === 0) return;
    
    // Remove the first note group from the array and animate it
    const group = visibleNoteGroups.shift();
    group.classList.add("incorrect");

    // Force a reflow to ensure the transform applies immediately
    window.getComputedStyle(group).transform;

    // Extract the x translation value from the computed style and apply the transform
    const transformMatrix = window.getComputedStyle(group).transform;
    const x = transformMatrix.split(",")[4].trim();
    group.style.transform = `translate(${x}px, 800px)`;
});

// Listen for clicks on the "Too Slow" button and animate the correctly answered note moving upwards.
document.getElementById("not-fast-enough-answer").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "purple";
    if (visibleNoteGroups.length === 0) return;
    
    // Remove the first note group from the array and animate it
    const group = visibleNoteGroups.shift();
    group.classList.add("too-slow");

    // Force a reflow to ensure the transform applies immediately
    window.getComputedStyle(group).transform;

    // Extract the x translation value from the computed style and apply the transform
    const transformMatrix = window.getComputedStyle(group).transform;
    const x = transformMatrix.split(",")[4].trim();
    group.style.transform = `translate(${x}px, 0px)`;
});