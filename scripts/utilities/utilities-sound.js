const notes = [
//  C                 D                 E        F                G                A               B
                                                                                  110,  116.54,  123.47, 
  130.81, 138.59,  146.83,  155.56,  164.81,  174.61,  185,     196,     207.65,  220,  233.08,  246.94,
  261.63, 277.18,  293.66,  311.13,  329.63,  349.23,  369.99,  392,     415.3,   440,  466.16,  493.88,
  523.25, 554.37,  587.33,  622.25,  659.25,  698.46,  739.99,  783.99,  830.61,  880,  932.33,  987.77,
  1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53,
  2093,   2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520
];

const chords = {
  I: [0, 4, 7, 12],
  IV: [7, 11, 14, 19],
  V: [9, 13, 16, 21],
  TT: [0, 6, 12]
}

const scales = {
  major: [0, 2, 4, 7, 9],
  minor: [0, 3, 5, 7, 10],
  mongolian: [0, 2, 4, 7, 9],
  hirojoshi: [0, 1, 5, 6, 10],
  yo: [0, 2, 5, 7, 9],
  in: [0, 1, 5, 7, 8], 
  hungarian: [0, 2, 3, 5, 6, 7, 10]
}

/*
  This estabilshes the audio context that all of the functions use
*/
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/*
  The audio compressor node that ensures that the volume of sound 
  does not go above a certain level
*/
const compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
  compressor.knee.setValueAtTime(40, audioCtx.currentTime);
  compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
  compressor.attack.setValueAtTime(0, audioCtx.currentTime);
  compressor.release.setValueAtTime(1, audioCtx.currentTime);

/*
  Connects the compressor node to the destination, i.e. routes the 
  output from the compressor to the audio output
*/
compressor.connect(audioCtx.destination);

function playTone(frequency, wave = "sine", decay = 0.05) {
  //----------------------------------------------------//
  //Generates a tone and outputs it to the computer     //
  //----------------------------------------------------//
  //frequency(float): frequency of the tone             //
  //wave(string): the type of wave used to generate     //
  //  the tone                                          //
  //decay(float): approximately one fifth of the time   //
  //  (in seconds) it takes for the tone to reduce in   //
  //  volume to 0                                       //
  //----------------------------------------------------//
  //----------------------------------------------------//
    
  if (!user.soundOn) return;

  /*
    Creates the oscillator node which will generate the tone
  */
  const oscillator = audioCtx.createOscillator();

  /*
    Creates the gain node which will contol the gain
  */
  const gainNode = audioCtx.createGain();

  /*
    Connects the oscillator node to the gain node and the 
    gain node to the compressor node, i.e. routes the output 
    from the oscillator through the gain node which is then 
    sent to the compressor
  */
  oscillator.connect(gainNode).connect(compressor);

  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); 
  oscillator.start();

  /*
    Gradually ramps down the gain to 0, beginning at the current 
    time, for a set amount of time
  */
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, decay);

  oscillator.stop(audioCtx.currentTime + (decay * 10));  
}

function playChord(chordNotes) {
  //----------------------------------------------------//
  //Plays a chord                                       //
  //----------------------------------------------------//
  //chordNotes(float): the frequency of the note to be  //
  //  played in the notes array                         //
  //----------------------------------------------------//

  chordNotes.forEach((frequency) => {
    playTone(frequency, "sine", .075);
  })
}

function playArpeggio(arpNotes, interval = 40) {
  //----------------------------------------------------//
  //Plays an arpeggio                                   //
  //----------------------------------------------------//
  //arpNotes(float): the frequency of the note to be    //
  //  played in the notes array                         //
  //interval(integer): the time between each note in ms //
  //----------------------------------------------------//

  let currentNote = 0;

  let noteInterval = setInterval(() => {
    playTone(arpNotes[currentNote]);      
    currentNote++;
    if (currentNote >= arpNotes.length) {clearInterval(noteInterval)}
  }, interval);
}

function randomNote() {
  //----------------------------------------------------//
  //Returns a random note from the current active scale //
  //----------------------------------------------------//
  //return(float): the frequency of the randomly        //
  //  selected note                                     //
  //----------------------------------------------------//
  
  return notes[
    user.activeScale[
      rnd(0, (user.activeScale.length - 1))
    ] + user.activeKey
  ];
}

function randomChord() {
  let rndChords = ["I", "IV", "V"];
  return chords[rndChords[rnd(0, 2)]];
}

function makeChord(chordPack, key) {
  //----------------------------------------------------//
  //Makes an array of frequencies that can be passed to //
  //  the chord or arpeggio functions                   //
  //----------------------------------------------------//
  //chordPack(array[integer]): the intervals of the     //
  //  notes in the chord in relation to the tonic       //
  //key(integer): the position of the tonic note        //
  //  frequency in the notes array                      //
  //----------------------------------------------------//
  //return(array[float]): the frequencies of the notes  //
  //  to be played                                      //
  //----------------------------------------------------//

  let chord = [];

  chordPack.forEach((x, i) => {
    chord[i] = notes[x + key];
  })

  return chord;
}

