function makeTitleScreen() {
  /*
  //Makes the title screen                                //
  */

  clearElement(document.body);

  let titleScreen = makeElement("div", "titleScreen", "screen");

    let titleDiv = makeElement("div", "titleDiv");
      titleDiv.innerHTML = "QuickMath";
    titleScreen.appendChild(titleDiv);

    let letsGoButton = makeButton("Let's Go!", () => {
      playTone(randomNote());
      makeModeSelectScreen();
    }, "letsGoButton", "bigButton");
    titleScreen.appendChild(letsGoButton);

  document.body.appendChild(titleScreen);

  document.onkeydown = (e) => {
    if (e.key === "Enter") {
      playTone(randomNote());
      makeModeSelectScreen();
    }
  }
}

async function makeModeSelectScreen() {
  /*
  //Makes the mode select screen. This is also the base   //
  //  to which the program returns when all other loops   //
  //  have ended                                          //
  */

  async function waitForButton() {
    
    return new Promise((resolve, reject) => {
      let progressionButton = document.getElementById("progressionButton");
      progressionButton.onclick = async () => {
        playTone(randomNote());
        await makeProgressionStartScreen();
        resolve();
      }

      let settingsButton = document.getElementById("settingsButton");
      settingsButton.onclick = async () => {
        playTone(randomNote());
        await makeSettingsBaseScreen();
        resolve();
      }

      if (document.getElementById("resumeButton")) {
        let resumeButton = document.getElementById("resumeButton");
        resumeButton.onclick = async () => {
          let loadUser = JSON.parse(localStorage.getItem("userData"));
          user.level = loadUser.level;
          playTone(randomNote());
          await makeLevelSelectScreen();
          resolve();
        }

        let clearDataButton = document.getElementById("clearDataButton");
        clearDataButton.onclick = () => {
          playTone(randomNote());
          localStorage.clear();
          resolve();
        }
      }

      document.onkeydown = async function(e) {
        playTone(randomNote());
        //await makeProgressionStartScreen();
        resolve();
      }
    })
  }
  
  let quit = false;

  while (!quit) {

    let modeSelectScreen = makeElement("div", "modeSelectScreen", "screen");

      let button = makeButton("Progression", null, "progressionButton", "bigButton");
      modeSelectScreen.appendChild(button);

      button = makeButton("Settings", null, "settingsButton", "bigButton");
      modeSelectScreen.appendChild(button);

      /*if (localStorage.getItem("userData")) {
        button = makeButton("Resume", null, "resumeButton", "bigButton");
        modeSelectScreen.appendChild(button);

        button = makeButton("Clear Data", null, "clearDataButton", "bigButton");
        modeSelectScreen.appendChild(button);
      }*/
      
    await fadeOut(document.body);
    clearElement(document.body);  
    document.body.appendChild(modeSelectScreen);
    await fadeIn(document.body);

    await waitForButton();

    document.onkeydown = "";
  }
}





function randomNote() {
  /*
  //Returns a random note from the current active scale   //
  //------------------------------------------------------//
  //return(float): the frequency of the randomly selected //
  //  note                                                //
  */

  return notes[user.activeScale[rnd(0, (user.activeScale.length - 1))]];
}

function makeChord(chordPack, key) {
  /*
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
  */

  let chord = [];

  chordPack.forEach((x, i) => {
    chord[i] = notes[x + key];
  })

  return chord;
}


const user = {
  activeScale: [14, 16, 18, 21, 23],
  activeKey: 14,
  skillLevel: {
    mixedOps: 0,
    upTo: 0,
    doubles: 0,
    nearDoubles: 0
  }
}

//The notes A2 through A7, 61 in total
const notes = [
  110, 116.54, 123.47, 
  130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94,
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88,
  523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77,
  1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1670, 1864.66, 1975.53,
  2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520
]

const chords = {
  I: [0, 4, 7, 12],
  IV: [7, 11, 14, 19],
  V: [9, 13, 16, 21],
  TT: [0, 6, 12]
}
