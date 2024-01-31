function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  clearElement(document.body);

  let titleScreen = makeElement("main", "title-screen", "screen");

    let titleScreenHeader = makeElement("header", "title-screen__header", "marquee");
      titleScreenHeader.innerHTML = "QuickMath";
    titleScreen.appendChild(titleScreenHeader);

    let launchButton = makeButton("Let's Go!", () => {
      playTone(randomNote());
      makeModeSelectScreen();
    }, "title-screen__launch-button", "big-button");
    titleScreen.appendChild(launchButton);

  document.body.appendChild(titleScreen);

  document.onkeydown = (e) => {
    if (e.key === "Enter") {
      playTone(randomNote());
      makeModeSelectScreen();
    }
  }
}

async function makeModeSelectScreen() {
  //----------------------------------------------------//
	//Makes the mode select screen. This is also the base //
  //  to which the program returns when all other loops //
  //  have ended                                        //
	//----------------------------------------------------//

  async function waitForButton() {
    
    return new Promise((resolve, reject) => {
      let challengeButton = document.getElementById("mode-select-screen__challenge-button");
      challengeButton.onclick = async () => {
        playTone(randomNote());
        await makeChallengeBaseScreen();
        resolve();
      }

      let skillsButton = document.getElementById("mode-select-screen__skills-button");
      skillsButton.onclick = async () => {
        playTone(randomNote());
        await makeSkillsStartScreen();
        resolve();
      }

      let settingsButton = document.getElementById("mode-select-screen__settings-button");
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

    let modeSelectScreen = makeElement("main", "mode-select-screen", "screen");

      let challengeButton = makeButton("Challenge", null, "mode-select-screen__challenge-button", "bigButton");
      modeSelectScreen.appendChild(challengeButton);

      let skillsButton = makeButton("Skills", null, "mode-select-screen__skills-button", "bigButton");
      modeSelectScreen.appendChild(skillsButton);

      let settingsButton = makeButton("Settings", null, "mode-select-screen__settings-button", "bigButton");
      modeSelectScreen.appendChild(settingsButton);

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

function operationUnlock(op) {
  switch(op) {
    case "+":
      return true;
      break;
    case "-":
      return user.addition.partition[1];
      break;
    case "×":
      return false;
      break;
    case "÷":
      return false;
      break;
  }
}

function makeNumberPad() {
  //----------------------------------------------------//
  //Makes and returns a div element with a number pad   //
  //  inside of it. Additionally, it defines the        //
  //  behavior for touch and mouse events               //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  //----------------------------------------------------//
  
  let numberPad = makeElement("div", "number-pad");
  
    numberPad.appendChild(makeButton("1", () => {}, "number-pad__button-1"));
    numberPad.appendChild(makeButton("2", () => {}, "number-pad__button-2"));
    numberPad.appendChild(makeButton("3", () => {}, "number-pad__button-3"));
    numberPad.appendChild(makeButton("←", () => {}, "number-pad__button-back"));
    numberPad.appendChild(makeButton("4", () => {}, "number-pad__button-4"));
    numberPad.appendChild(makeButton("5", () => {}, "number-pad__button-5"));
    numberPad.appendChild(makeButton("6", () => {}, "number-pad__button-6"));
    numberPad.appendChild(makeButton("7", () => {}, "number-pad__button-7"));
    numberPad.appendChild(makeButton("8", () => {}, "number-pad__button-8"));
    numberPad.appendChild(makeButton("9", () => {}, "number-pad__button-9"));
    numberPad.appendChild(makeButton("Submit", () => {}, "number-pad__button-submit"));
    numberPad.appendChild(makeButton("0", () => {}, "number-pad__button-0"));
    numberPad.appendChild(makeButton(".", () => {}, "number-pad__button-decimal"));
    numberPad.appendChild(makeButton("Quit", () => {}, "number-pad__button-quit"));
  
    for (let i = 0; i < numberPad.children.length; i++) {
      numberPad.children[i].addEventListener("touchstart", () => {
        numberPad.children[i].style.backgroundColor = "hsla(0, 100%, 0%, .125)";
      });
      numberPad.children[i].addEventListener("touchend", () => {
        numberPad.children[i].style.backgroundColor = "var(--transparent)";
      });
      numberPad.children[i].addEventListener("mousedown", () => {
        numberPad.children[i].style.backgroundColor = "hsla(0, 100%, 0%, .125)";
      });
      numberPad.children[i].addEventListener("mouseup", () => {
        numberPad.children[i].style.backgroundColor = "var(--transparent)";
      });
    }
  
  return numberPad;
}

function numPadOn() {
  //----------------------------------------------------//
  //Enables the onclick functions of the number pad     //
  //----------------------------------------------------//
  
  document.getElementById("number-pad__button-1").onclick = function() {inputNumber("1")}
  document.getElementById("number-pad__button-2").onclick = function() {inputNumber("2")}
  document.getElementById("number-pad__button-3").onclick = function() {inputNumber("3")}
  document.getElementById("number-pad__button-4").onclick = function() {inputNumber("4")}
  document.getElementById("number-pad__button-5").onclick = function() {inputNumber("5")}
  document.getElementById("number-pad__button-6").onclick = function() {inputNumber("6")}
  document.getElementById("number-pad__button-7").onclick = function() {inputNumber("7")}
  document.getElementById("number-pad__button-8").onclick = function() {inputNumber("8")}
  document.getElementById("number-pad__button-9").onclick = function() {inputNumber("9")}
  document.getElementById("number-pad__button-0").onclick = function() {inputNumber("0")}
  document.getElementById("number-pad__button-back").onclick = function() {inputNumber("-1")}
  document.getElementById("number-pad__button-decimal").onclick = function() {inputNumber(".")}
  
  return null;
}

function numPadOff() {
  //----------------------------------------------------//
  //Disables the onclick functions of the number pad    //
  //----------------------------------------------------//
  
  document.getElementById("number-pad__button-1").onclick = "";
  document.getElementById("number-pad__button-2").onclick = "";
  document.getElementById("number-pad__button-3").onclick = "";
  document.getElementById("number-pad__button-4").onclick = "";
  document.getElementById("number-pad__button-5").onclick = "";
  document.getElementById("number-pad__button-6").onclick = "";
  document.getElementById("number-pad__button-7").onclick = "";
  document.getElementById("number-pad__button-8").onclick = "";
  document.getElementById("number-pad__button-9").onclick = "";
  document.getElementById("number-pad__button-0").onclick = "";
  document.getElementById("number-pad__button-back").onclick = "";
  document.getElementById("number-pad__button-decimal").onclick = "";
  document.getElementById("number-pad__button-submit").onclick = "";
}

function inputNumber(num) {
  //----------------------------------------------------//
  //Adds a number to the solutionDisplay element        //
  //----------------------------------------------------//
  //num(string): either a number/symbol to display or a //
  //  numeric code:                                     //
  //    -1: backspace                                   //
  //    10: submit answer                               //
  //----------------------------------------------------//
  
  let display = document.getElementById("solutionDisplay");
  
  playTone(randomNote());
  if (num === "-1") {
    /*
      Removes the last input number. If the last input
        number was preceded by a decimal point, the
        decimal point is removed as well.
    */
  
    let current = display.innerHTML;
  
    if (current[current.length - 2] === ".") {
      display.innerHTML = current.slice(0, -2);
    } else {
      display.innerHTML = current.slice(0, -1);
    }
  } else if (num === "10") {
  
  } else {
    display.innerHTML += num;
  }
  
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


let notify = [];

//The notes C2 through B7, 72 in total
const notes = [
  65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110, 116.54, 123.47, 
  130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94,
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88,
  523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77,
  1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53,
  2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07
]

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
let user = {
  soundOn: true,
  activeScale: scales.major,
  keyNote: 0,
  keyOctave: 4,
  get activeKey() {
    return ((this.keyOctave - 2) * 12) + this.keyNote;
  },
  addition: {
    fundamentals: [1, 1, 1, 1, 1],
    placeValue: [],
    reorder: [1, 1, 1],
    partition: [],
    compensation: []
  },
  subtraction: {
    fundamentals: [],
    partition: []
  },
  tour: false,
  fast: false,
  qDepth: 10,
  maxAvg: 5000
}
