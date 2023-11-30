const SCALES = ["Ab1", "A1", "Bb1", "B1", "C2", "C#2", "D2", "Eb2", "E2", "F2", "F#2", "G2"];
const MIDI_SHARP_NAMES = ['B#_0',  'C#_1', 'Cx_1', 'D#_1',   'E_1',  'E#_1',  'F#_1', 'Fx_1',  'G#_1', 'Gx_1', 'A#_1', 'B_1',
                    'B#_1', 'C#0', 'Cx0', 'D#0', 'E0', 'E#0', 'F#0', 'Fx0', 'G#0', 'Gx0', 'A#0', 'B0',
                    'B#0', 'C#1', 'Cx1', 'D#1', 'E1', 'E#1', 'F#1', 'Fx1', 'G#1', 'Gx1', 'A#1', 'B1',
                    'B#1', 'C#2', 'Cx2', 'D#2', 'E2', 'E#2', 'F#2', 'Fx2', 'G#2', 'Gx2', 'A#2', 'B2',
                    'B#2', 'C#3', 'Cx3', 'D#3', 'E3', 'E#3', 'F#3', 'Fx3', 'G#3', 'Gx3', 'A#3', 'B3',
                    'B#3', 'C#4', 'Cx4', 'D#4', 'E4', 'E#4', 'F#4', 'Fx4', 'G#4', 'Gx4', 'A#4', 'B4',
                    'B#4', 'C#5', 'Cx5', 'D#5', 'E5', 'E#5', 'F#5', 'Fx5', 'G#5', 'Gx5', 'A#5', 'B5',
                    'B#5', 'C#6', 'Cx6', 'D#6', 'E6', 'E#6', 'F#6', 'Fx6', 'G#6', 'Gx6', 'A#6', 'B6',
                    'B#6', 'C#7', 'Cx7', 'D#7', 'E7', 'E#7', 'F#7', 'Fx7', 'G#7', 'Gx7', 'A#7', 'B7',
                    'B#7', 'C#8', 'Cx8', 'D#8', 'E8', 'E#8', 'F#8', 'Fx8', 'G#8', 'Gx8', 'A#8', 'B8',
                    'B#8', 'C#9', 'Cx9', 'D#9', 'E9', 'E#9', 'F#9', 'Fx9'];
                          

const MIDI_FLAT_NAMES = ['C_1', 'Db_1', 'D_1', 'Eb_1', 'Fb_1', 'F_1', 'Gb_1', 'G_1', 'Ab_1', 'A_1', 'Bb_1', 'Cb0',
                    'C0', 'Db0', 'D0', 'Eb0', 'Fb0', 'F0', 'Gb0', 'G0', 'Ab0', 'A0', 'Bb0', 'Cb1',
                    'C1', 'Db1', 'D1', 'Eb1', 'Fb1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'Cb2',
                    'C2', 'Db2', 'D2', 'Eb2', 'Fb2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'Cb3',
                    'C3', 'Db3', 'D3', 'Eb3', 'Fb3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'Cb4',
                    'C4', 'Db4', 'D4', 'Eb4', 'Fb4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'Cb5',
                    'C5', 'Db5', 'D5', 'Eb5', 'Fb5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'Cb6',
                    'C6', 'Db6', 'D6', 'Eb6', 'Fb6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'Cb7',
                    'C7', 'Db7', 'D7', 'Eb7', 'Fb7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'Cb8',
                    'C8', 'Db8', 'D8', 'Eb8', 'Fb8', 'F8', 'Gb8', 'G8', 'Ab8', 'A8', 'Bb8', 'Cb9',
                    'C9', 'Db9', 'D9', 'Eb9', 'Fb9', 'F9', 'Gb9', 'G9'];

const DURATION = {
    '1n': 1, //whole note
    '2n': 0.5,
    '4n': 0.25, 
    '8n': 0.125,
    '16n': 0.0625,
    '32n': 0.03125,
    '64n': 0.015625,
    '1n.': 1.5, //dotted whole note
    '2n.': 0.75,
    '4n.': 0.375,
    '8n.': 0.1875,
    '16n.': 0.09375,
    '32n.': 0.046875,
    '64n.': 0.0234375
};

const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11, 12];
const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10, 12];

/***
 * Axiom and rules derived from Worth and Stepney's context-sensitive
 * stochastic L-system. 
 */
const AXIOM1 = 'F++F---F'
const AXIOM2 = 'F++F++F+++F---F--F--F'
const AXIOM3 = 'F--F+++F++F--F-F+F---F+++F--F+F'
const RULES = new Map([
    ['[dFF]', 'F'], //Repetition
    ['[d-F+F]', 'F'], // Appoggiatura
    ['[+F-F]', 'F'], // Appoggiatura
    ['[Fd+F-F]', 'FF'], // Neighbour note
    ['[Fd-F+F]', 'FF'], // Neighbour note
    ['[Fd++F-F]', 'F+F'], // This rule onward all represent musical skips
    ['[Fd+++F--F]', 'F+F'],
    ['[Fd-F++F]', 'F+F'],
    ['[Fd--F+++F]', 'F+F'],
    ['[-Fd++F-F]', 'F-F'],
    ['[-Fd+++F--F]', 'F-F'],
    ['[-Fd-F++F]', 'F-F'],
    ['[-Fd--F+++F]', 'F-F'],
]);


function expandScalePattern(pattern, octaves) {
    const expandedPattern = [];

    for (let i = 0; i < octaves; i++) {
        expandedPattern.push(...pattern.map(note => note + i * 12));
    }

    return [...new Set(expandedPattern)];
}

function noteNameToMIDI(noteName)  {
    var i;
    var MIDInumber = -1; // default if not found
    for(i = 0; i < MIDI_SHARP_NAMES.length; i++) {
        if( noteName == MIDI_SHARP_NAMES[i] ||
                noteName == MIDI_FLAT_NAMES[i] ) {
            MIDInumber = i;
        }
    }
    return Number(MIDInumber); 
}  

function makeScale(majorOrMinor, keyNameAndOctave) {
    var ALPHA_NAMES = ['A','B','C','D','E','F','G'];
    var startingName = keyNameAndOctave;
    var offset;

    for(var i = 0; i < ALPHA_NAMES.length; i++) {
        if(startingName.includes(ALPHA_NAMES[i])) {
            offset = i;
            break;
        }
    }

    var startingNote = noteNameToMIDI(keyNameAndOctave);
    var myScaleFormula = (majorOrMinor == "major") ? expandScalePattern(MAJOR_SCALE, 4) : expandScalePattern(MINOR_SCALE, 4);
    // console.log(myScaleFormula);
    var myNoteQueue = [];
    for(var i=0; i < myScaleFormula.length; i++) {
        if(MIDI_SHARP_NAMES[myScaleFormula[i] + startingNote].includes(ALPHA_NAMES[(offset+i) % ALPHA_NAMES.length])) {
            myNoteQueue.push(MIDI_SHARP_NAMES[myScaleFormula[i] + startingNote]);
        } else if(MIDI_FLAT_NAMES[myScaleFormula[i] + startingNote].includes(ALPHA_NAMES[(offset+i) % ALPHA_NAMES.length])) {
            myNoteQueue.push(MIDI_FLAT_NAMES[myScaleFormula[i] + startingNote]);
        } else {
            console.log("ERROR");
        }
    }
    console.log("scale = " + myNoteQueue);
    return myNoteQueue;
}

function lSystemGenerator(axiom, rules, iterations) {
    // console.log("iterations = " + iterations)
    let result = axiom;

    for (let i = 0; i <= iterations; i++) {
        result = applyRules(result, rules);
    }
    // console.log("final sequence = " + result);
    return result;
}

function applyRules(sequence, rules) {
    let result = '';

    for (let i = 0; i < sequence.length; i++) {
        let currentOne = sequence[i]
        let currentTwo = sequence.slice(i, i + 2);
        let currentThree = sequence.slice(i, i + 3);

        let potentialRules = [];
        let ruleApplied = false;

        for (const rule of rules) {
            const [successor, predecessor] = rule;
            if (currentOne === predecessor) {
                if (currentOne === 'F') {
                    if (Math.random() <= 0.5) {
                        result += 'F'
                        ruleApplied = true;
                        break;
                    } else {
                        potentialRules = potentialRules.concat(successor);
                    }
                } 
            } else if (currentTwo === predecessor || currentThree === predecessor) {
                potentialRules = potentialRules.concat(successor);
            }
        }
        
        if(!ruleApplied && (potentialRules.length > 0)) {
            const randomIndex = Math.floor(Math.random() * potentialRules.length);
            const selectedRule = potentialRules[randomIndex];
            result += selectedRule;
            i += RULES.get(selectedRule).length - 1; 
            ruleApplied = true;
        }
        
        if (!ruleApplied) {
            result += currentOne;
        }
    }

    return result;
}

// Assumes common time
function addDurations(duration1, duration2) {
    const value1 = DURATION[duration1] || 0;
    const value2 = DURATION[duration2] || 0;
    const sum = value1 + value2;

    const resultDuration = Object.entries(DURATION).reduce((closest, [duration, value]) => {
        return Math.abs(sum - value) < Math.abs(sum - DURATION[closest]) ? duration : closest;
    }, '1n');

    return resultDuration;
}

function halveDuration(duration) {
    const value = DURATION[duration] || 0;
    const halvedValue = value * 0.5;

    const halvedDuration = Object.entries(DURATION).find(([dur, val]) => val === halvedValue)?.[0] || '1n';
    
    return halvedDuration;
}

function interpretLSystem(lSystemSequence, startingNote, initialDuration, scale) {
    const stack = [];
    const result = [];
    let currentNote = startingNote;
    let currentDuration = initialDuration;

    for (const symbol of lSystemSequence) {
        switch (symbol) {
            case 'F':
                // Increase note duration by initial duration 
                currentDuration = addDurations(currentDuration, initialDuration);
                break;

            case 'd':
                // Halve the duration
                currentDuration = halveDuration(currentDuration);

            case '+':
                // Move up one note in the scale of the chosen key
                currentNote = moveNote(currentNote, 1, scale);
                break;

            case '-':
                // Move down one note in the scale of the chosen key
                currentNote = moveNote(currentNote, -1, scale);
                break;

            case '[':
                // Push current state and set note duration to 0
                stack.push({ note: currentNote, duration: currentDuration });
                currentDuration = initialDuration;
                break;

            case ']':
                // Play note according to current state, then pop state
                const prevState = stack.pop();
                if (prevState) {
                    result.push({ note: prevState.note, duration: prevState.duration });
                    currentNote = prevState.note;
                    currentDuration = prevState.duration;
                }
                break;

            default:
                break;
        }
    }
    return result;
}

// Function to move note up or down in the scale
function moveNote(currentNote, offset, scale) {
    const currentIndex = scale.indexOf(currentNote);
    if (currentIndex !== -1) {
        let newNoteIndex = currentIndex + offset;
        if(scale[newNoteIndex]) {
            return scale[newNoteIndex];
        }
    }
    return currentNote; // Return current note if not found in the scale
}

function setScale(sides) {
    return SCALES[sides - 1];
}

function setInitialDuration(spread) {
    if (spread <= 0.9 ) {
        return '8n';
    } else if (spread > 0.9 && spread <= 1.7) {
        return '4n';
    } else {
        return '2n';
    }
}

function setAxiom(branches) {
    if(branches == 1) {
        return AXIOM1;
    } else if (branches == 2) {
        return AXIOM2;
    } else {
        return AXIOM3;
    }
}

class Music {
    constructor(sides, layers, spread, branches, color) {
        this.iterations = layers + 1; // could change to layers, but need to see how larger iterations look 
        this.initialDuration = setInitialDuration(spread);
        this.keyName = setScale(sides); // scale root note e.g D
        this.major = color % 2 == 0 ? "major" : "minor"; // major or natural minor scale
        this.scaleNotes = makeScale(this.major, this.keyName); // scaleNotes with durations
        this.axiom = setAxiom(branches);
        this.lSystemSequence = lSystemGenerator(this.axiom, RULES, Number(this.iterations));
        this.noteQueue = interpretLSystem(this.lSystemSequence, this.scaleNotes[15], this.initialDuration, this.scaleNotes); 
        this.isMuted = false;
    }

    muteIt() {
        this.isMuted = true;
        Tone.Master.volume.value = -100;
    }

    unmuteIt() {
        this.isMuted = false;
        Tone.Master.volume.value = 1;
    }

    stopIt() {
        Tone.Transport.stop();
        Tone.Transport.cancel(0);
    } 

    startSong() {
        this.stopIt();
        console.log(this.noteQueue);
        var synth = SampleLibrary.load({
            instruments: ["piano", 'guitar-acoustic', 'xylophone'],
            baseUrl: "../src/samples/"
        });
        synth['piano'].release = 0.5;
        synth['piano'].toDestination();

        synth['xylophone'].release = 0.5;
        synth['xylophone'].toDestination();

        if (this.isMuted) {
            this.muteIt();
        } else {
            this.unmuteIt();
        }
        
        let cumulativeTime = 0;

        const part = new Tone.Part((time, { note, duration }) => {
            const formattedDuration = Tone.Time(duration).toNotation();
            synth['xylophone'].triggerAttackRelease(note, formattedDuration, time);
        }, this.noteQueue.map(({ note, duration }) => {
            const formattedDuration = Tone.Time(duration).toSeconds();
            cumulativeTime += formattedDuration;
            return { note, duration, time: `+${cumulativeTime}` };
        }));
    
        const totalDuration = cumulativeTime + 0.01;
        part.loop = true;
        part.loopEnd = totalDuration;
    
        // Start the part
        part.start(0.1)
    
        // Start the Tone.Transport
        Tone.Transport.start("+0.1");
    }
}

export default function(sides, layers, spread, branches, color) {
    return new Music(sides, layers, spread, branches, color);
};

