const SCALES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/** 
 *  Function that takes # of sides fractal parameter to map
 *  it to a scale root note.
 * **/
function setScale(sides) {
    console.log("scale = " + SCALES[sides - 1]);
    return SCALES[sides - 1];
}

/** 
 *  Function that returns an array of notes within designated scale 
 *  that range from RootNote3 - RootNote6 octaves
 * **/
function getNotes(rootNote, major, octaves = 4) {
    /* 
        2 - whole step
        1 - half step
    */
    const majorScalePattern = [2, 2, 1, 2, 2, 2, 1]; 
    const naturalMinorScalePattern = [2, 1, 2, 2, 1, 2, 2];
  
    // Create note map
    const noteNames = SCALES;
    const notePositions = {};
    noteNames.forEach((note, index) => {
      notePositions[note] = index;
    });
  
    const rootPosition = notePositions[rootNote];
  
    // Set scale pattern 
    let scalePattern;
    major == "major" ? scalePattern = majorScalePattern : scalePattern = naturalMinorScalePattern;
    console.log("scale pattern= " + scalePattern);

    // Generate the scale notes for the specified number of octaves
    const notes = [];
    let currentPosition = rootPosition;
    for (let octave = 0; octave < octaves; octave++) {
      for (const interval of scalePattern) {
        console.log(noteNames[currentPosition] + (octave + 3));
        notes.push(noteNames[currentPosition] + (octave + 3)); 
        currentPosition = (currentPosition + interval) % 12;
      }
    }
  
    return notes;
}


class Music {
    constructor(sides, layers, spread, branches, color) {
        this.scale = setScale(sides); // scale root note e.g D
        this.major = color % 2 == 0 ? "major" : "minor"; // major or natural minor scale
        this.scaleNotes = getNotes(this.scale); // array of notes within scale
    }

    playNote() {
        // create a synth
        const synth = new Tone.Synth().toDestination();
        // play a note from that synth
        synth.triggerAttackRelease(this.scaleNotes, "8n");
    }
}

export default function() {
    return new Music();
};

