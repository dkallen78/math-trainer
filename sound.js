const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
    compressor.knee.setValueAtTime(40, audioCtx.currentTime);
    compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
    compressor.attack.setValueAtTime(0, audioCtx.currentTime);
    compressor.release.setValueAtTime(1, audioCtx.currentTime);

compressor.connect(audioCtx.destination);

/*let notes = [
    110, 116.54, 123.47, 
    130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94,
    261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88,
    523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77,
    1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1670, 1864.66, 1975.53,
    2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520
];*/

function playTone(frequency) {
    /*
    //Generates a tone and outputs it to the computer     //
    //----------------------------------------------------//
    //frequency(float): frequency of the tone             //
    //----------------------------------------------------//
    */
    
    let decay = 0.1;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode).connect(compressor);


    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); 
    oscillator.start();

    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, decay);
    oscillator.stop(audioCtx.currentTime + (decay * 5));    
}

function playChord(chordNotes) {
    /*
    //Plays a chord                                       //
    //----------------------------------------------------//
    //chordNotes(float): the frequency of the note to be  //
    //  played in the notes array                         //
    */
  
    chordNotes.forEach((frequency) => {
        playTone(frequency);
    })
}

function playArpeggio(arpNotes) {
    /*
    //Plays a arpeggio                                    //
    //----------------------------------------------------//
    //arpNotes(float): the frequency of the note to be    //
    //  played in the notes array                         //
    */

    let timeInterval = 40;
    let currentNote = 0;
  
    let noteInterval = setInterval(() => {
        playTone(arpNotes[currentNote]);      currentNote++;
        if (currentNote >= arpNotes.length) {clearInterval(noteInterval)}
    }, timeInterval);
}

