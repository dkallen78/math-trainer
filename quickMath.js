
function makeNumberPad() {
  /*
  //Makes and returns a div element with a number pad   //
  //  inside of it. Additionally, it defines the        //
  //  behavior for touch and mouse events               //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  */

  let numberPad = makeElement("div", "numberPad");

    numberPad.appendChild(makeButton("1", () => {}, "button1"));
    numberPad.appendChild(makeButton("2", () => {}, "button2"));
    numberPad.appendChild(makeButton("3", () => {}, "button3"));
    numberPad.appendChild(makeButton("←", () => {}, "buttonBack"));
    numberPad.appendChild(makeButton("4", () => {}, "button4"));
    numberPad.appendChild(makeButton("5", () => {}, "button5"));
    numberPad.appendChild(makeButton("6", () => {}, "button6"));
    numberPad.appendChild(makeButton("7", () => {}, "button7"));
    numberPad.appendChild(makeButton("8", () => {}, "button8"));
    numberPad.appendChild(makeButton("9", () => {}, "button9"));
    numberPad.appendChild(makeButton("Submit", () => {}, "buttonSubmit"));
    numberPad.appendChild(makeButton("0", () => {}, "button0"));
    numberPad.appendChild(makeButton(".", () => {}, "buttonDecimal"));
    numberPad.appendChild(makeButton("Quit", () => {}, "buttonQuit"));

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
  /*
  //Enables the onclick functions of the number pad
  */

  document.getElementById("button1").onclick = function() {inputNumber("1")}
  document.getElementById("button2").onclick = function() {inputNumber("2")}
  document.getElementById("button3").onclick = function() {inputNumber("3")}
  document.getElementById("button4").onclick = function() {inputNumber("4")}
  document.getElementById("button5").onclick = function() {inputNumber("5")}
  document.getElementById("button6").onclick = function() {inputNumber("6")}
  document.getElementById("button7").onclick = function() {inputNumber("7")}
  document.getElementById("button8").onclick = function() {inputNumber("8")}
  document.getElementById("button9").onclick = function() {inputNumber("9")}
  document.getElementById("button0").onclick = function() {inputNumber("0")}
  document.getElementById("buttonBack").onclick = function() {inputNumber("-1")}
  document.getElementById("buttonDecimal").onclick = function() {inputNumber(".")}

  return null;
}

function numPadOff() {
  /*
  //Disables the onclick functions of the number pad
  */

  document.getElementById("button1").onclick = "";
  document.getElementById("button2").onclick = "";
  document.getElementById("button3").onclick = "";
  document.getElementById("button4").onclick = "";
  document.getElementById("button5").onclick = "";
  document.getElementById("button6").onclick = "";
  document.getElementById("button7").onclick = "";
  document.getElementById("button8").onclick = "";
  document.getElementById("button9").onclick = "";
  document.getElementById("button0").onclick = "";
  document.getElementById("buttonBack").onclick = "";
  document.getElementById("buttonDecimal").onclick = "";
  document.getElementById("buttonSubmit").onclick = "";
}

function inputNumber(num) {
  /*
  //Adds a number to the solutionDisplay element        //
  //----------------------------------------------------//
  //num(string): either a number/symbol to display or a //
  //  numeric code                                      //
  //  -1: backspace                                     //
  //  10: submit answer                                 //
  */

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

function waitForAnswer(problem) {
  /*
  //Evaluates whether the user's response to a problem  //
  //  is correct                                        //
  //----------------------------------------------------//
  //problem(object): the problem object which contains  //
  //  the answer to evaluate against the user's response//
  //----------------------------------------------------//
  //return(promise[resolve]): when the answer is correct//
  //return(promise[reject]): either when the answer is  //
  //  incorrect or when the user quits                  //
  */

  return new Promise((resolve, reject) => {

    console.log(problem.answer, problem.skill);

    let solutionDisplay = document.getElementById("solutionDisplay");

    document.onkeydown = event => {
      let key = parseInt(event.key, 10);
      if ((key >= 0 && key <= 9 || event.key === ".")) {
        inputNumber(event.key);
      } else if (event.key === "Backspace") {
        inputNumber("-1");
      } else if (event.key === "Escape") {
        reject(true);
      } else if (event.key === "Enter") {
        
        let solution = parseFloat(solutionDisplay.innerHTML, 10);
        clearElement(solutionDisplay);

        if (problem.answer === solution) {
          resolve();
        } else {
          reject(false);
        }
      }
      event.preventDefault();
    };

    document.getElementById("buttonQuit").onclick = () => {
      reject(true);
    }

    document.getElementById("buttonSubmit").onclick = () => {

      let solution = parseFloat(solutionDisplay.innerHTML, 10);

      clearElement(solutionDisplay);

      if (problem.answer === solution) {
        resolve();
      } else {
        reject(false);
      }
    }
  });
}

function getProblem(weight) {
  /*
  //Gets a problem to display based on the user's level
  */

  let problem = {
    answer: 0,
    equation: "",
    level: 0,
    skill: 0,
    attempts: 0,
  };

  let weightSum = 0;
  let activeSkills = 1;
  let activeWeight = [];
  weight.forEach((element, index) => {
    if (element > 0) {
      activeWeight[index] = activeSkills * 10;
      activeSkills++;
      weightSum += 10;
    }
  });
  

  problem.level = user.activeLevel;

  let chance = rnd(1, weightSum);

  problem.skill = activeWeight.findIndex((element) => chance <= element);
  
  //problem.skill = rnd(0, (levels[user.activeLevel].length - 1));
  [problem.answer, problem.equation] = levels[user.activeLevel][problem.skill]();

  return problem;
}

async function practiceLoop() {
  /*
  //The loop where the user receives problems           //
  */

  let quit = false;
  let getNewProblem = true;
  let problem;
  let problemDisplay = document.getElementById("problemDisplay");

  let startTime, totalTime;

  let weight = new Array(levels[user.activeLevel].length).fill(10);

  while (!quit) {

    //If it's the first pass of the loop or the
    //  user has entered a correct answer, we 
    //  get a new problem
    if (getNewProblem) {
      problem = getProblem(weight);
      startTime = Date.now();
    }

    problemDisplay.innerHTML = problem.equation;
    numPadOn();
    

    //After the problem is displayed, waitForAnswer() 
    //  patiently waits for the user to enter a number
    //  and submit it
    await waitForAnswer(problem)

      //If the user submits a correct answer, waitForAnswer() 
      //  resolves without error, and the loop repeats
      .then(() => {
        
        totalTime = Date.now() - startTime;
        user.updateAverage(problem, totalTime);

        //Determines if the user has "mastered" the current skill, 
        //  and if so, removes that problem type from the random pool
        if (user.levelData[problem.level][problem.skill][0] < 5000 && 
            user.levelData[problem.level][problem.skill][1] > 20) {
              weight[problem.skill] = -1;
              playArpeggio(makeChord(chords.I.concat(chords.IV, chords.V), user.activeKey));
              console.log(`Skill ${problem.skill} completed`);
              
            if (weight.every((x) => {return x === -1})) {
              console.log("quitting from leveling");
              if (user.activeLevel === user.level) {user.level++}
              quit = true;
            }  
        } else {
          playChord(makeChord(chords.I, user.activeKey));
        }
        
        getNewProblem = true;
      })

      //If the user submits an incorrect answer or decides 
      //  to quit, waitForAnswer() throws an error. An incorrect
      //  answer will restart the loop with the same problem. If 
      //  they quit, the loop will be broken
      .catch((end) => {

        //If the user quits
        if (end) {
          quit = true;
        //If the user submits an incorrect answer, the problemDisplay
        //  elements jiggles
        } else {
          playChord(makeChord(chords.TT, user.activeKey));
          problem.attempts++;
          getNewProblem = false;
          let interval = 50;
          problemDisplay.style.padding = "0 .5rem .5rem 0";
          setTimeout(function() {
            problemDisplay.style.padding = ".5rem 0 0 .5rem";
          }, interval);
          setTimeout(function() {
            problemDisplay.style.padding = "";
          }, (interval * 2));
        }

      })
    document.onkeydown = "";
  }

  return true;

}

function makeTitleScreen() {
  /*
  //Makes the screen that will display the sign in
  //  and register options
  */

  clearElement(document.body);

  let titleScreen = makeElement("div", "titleScreen", "screen");

    let titleDiv = makeElement("div", "titleDiv");
      titleDiv.innerHTML = "QuickMath";
    titleScreen.appendChild(titleDiv);

    let letsGoButton = makeButton("Let's Go!", () => {
      makeModeSelectScreen();
      playTone(randomNote());
    }, "letsGoButton");
    titleScreen.appendChild(letsGoButton);

  document.body.appendChild(titleScreen);
}

async function makeModeSelectScreen() {
  /*
  //The start of the "loop." From here the user can
  //  select which type of practice they want. Currently
  //  only one option available
  */
  async function waitForButton() {

    return new Promise((resolve, reject) => {
      let practiceButton = document.getElementById("practiceButton");
      practiceButton.onclick = async () => {
        playTone(randomNote());
        await makeLevelSelectScreen();
        resolve();
      }
    });
  }

  let quit = false;

  while (!quit) {
    clearElement(document.body);

    let modeSelectScreen = makeElement("div", "modeSelectScreen", "screen");

      let button = makeButton("Practice", null, "practiceButton", "modeButtons");
      modeSelectScreen.appendChild(button);

      button = makeButton("Speed", null, "speedButton", "modeButtons");
      modeSelectScreen.appendChild(button);

    document.body.appendChild(modeSelectScreen);

    await waitForButton();

  }
}

async function makeLevelSelectScreen() {
  /*
  //Makes the screen that will display the available levels
  */

  async function waitForButton() {
    /*
    //Assigns functions to the level select buttons       //
    //----------------------------------------------------//
    //resolve(): when the button is pressed               //
    */

    return new Promise((resolve, reject) => {

      for (let i = 1; i <= 12; i++) {
        /*
          Makes the buttons for the levels of mastery
        */
        let button = document.getElementById(`level${i}Button`);
        if (user.level >= i) {
          button.onclick = async () => {
            playTone(randomNote());
            user.activeLevel = i;
            await makePracticeScreen();
            resolve(false);
          }
        } 
      }

      let button = document.getElementById("backButton");
      button.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    });
  }

  let quit = false;

  while (!quit) {
    clearElement(document.body);

    let levelSelectScreen = makeElement("div", "levelSelectScreen", "screen");

      for (let i = 1; i <= 12; i++) {
        /*
          Makes the buttons for the levels of mastery
        */
        let buttText = "";
        let buttFunc;
        if (user.level >= i) {
          buttText = `Level ${i}`;
        } else {
          buttText = "Locked";
        }

        let button = makeButton(buttText, null, `level${i}Button`, "levelButtons");
        levelSelectScreen.appendChild(button);
      }

      let button = makeButton("Back", null, "backButton", "levelButtons");
      levelSelectScreen.appendChild(button);

    document.body.appendChild(levelSelectScreen);

    await waitForButton()
      .then((butt) => {
        quit = butt;
      })
  }
}

async function makePracticeScreen() {
  /*
  //Makes the screen that displays problems and accepts //
  //  input for answers                                 //
  //----------------------------------------------------//
  //return(boolean)                                     //
  */

  async function getReady() {
    /*
    //Puts a button on the screen and fades it out when   //
    //  it's pressed                                      //
    //----------------------------------------------------//
    //resolve(): when the button is pressed
    */

    function fade() {
      return new Promise ((resolve, reject) => {
        readyButton.style.filter = "opacity(0%)";

        readyButton.addEventListener("transitionend", function(e) {
          readyButton.parentNode.removeChild(readyButton);
          e.stopImmediatePropagation();
          resolve();
        });
      });
    }

    let readyButton = makeButton("Ready?", null, "readyButton");
    practiceScreen.appendChild(readyButton);

    return new Promise ((resolve, reject) => {

      document.onkeydown = async (event) => {
        if (event.key === "Enter") {
          document.onkeyDown = "";
          //playTone(randomNote());
          await fade()
            .then(resolve);
        }
      }

      readyButton.onclick = async () => {
        //playTone(randomNote());
        await fade()
          .then(resolve);
      }
    });
  }

  async function countdown(num) {
    /*
    //Displays a countdown from a given argument          //
    //----------------------------------------------------//
    //num(integer): the number from which to countdown    //
    //----------------------------------------------------//
    //return(boolean)                                     //
    */

    function fadeNumber(num) {
      /*
      //Fades out and removes a number from the countdown   //
      //----------------------------------------------------//
      //num(DOM element): div element containing the number //
      //  to be removed                                     //
      //----------------------------------------------------//
      //return(promise[resolve]): when the number is faded  //
      */

      return new Promise ((resolve, reject) => {

        setTimeout(() => {
          num.style.filter = "opacity(0%)";
          num.style.fontSize = "0rem";
        }, 0);

        num.addEventListener("transitionend", function(e) {
          if (e.propertyName === "filter") {
            num.parentNode.removeChild(num);
            e.stopImmediatePropagation();
            resolve();
          }
        });
      })
    }

    for (let i = num; i > 0; i--) {
      let number = makeElement("div", null, "countdown");
      number.innerHTML = i;
      practiceScreen.appendChild(number);
      //playTone(randomNote());
      playTone(notes[user.activeKey + 12]);

      await fadeNumber(number);
    }

    return true;
  }

  clearElement(document.body);

  let practiceScreen = makeElement("div", "practiceScreen", "screen");
  document.body.appendChild(practiceScreen);

    await getReady();

    await countdown(3);

    let problemDisplay = makeElement("div", "problemDisplay");
    practiceScreen.appendChild(problemDisplay)

    let solutionDisplay = makeElement("div", "solutionDisplay");
    practiceScreen.appendChild(solutionDisplay);

    let numberPad = makeNumberPad()
    practiceScreen.appendChild(numberPad);


  let quit = false;
  while (!quit) {
    await practiceLoop()
      .then((val) => {quit = val})
  }
  return true;
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

function randomNote() {
  /*
  //Returns a random note from the current active scale   //
  //------------------------------------------------------//
  //return(float): the frequency of the randomly selected //
  //  note                                                //
  */

  return notes[user.activeScale[rnd(0, (user.activeScale.length - 1))]];
}

const user = {
  /*
    Data about the user
  */
  level: 11,
  activeLevel: 0,
  activeScale: [14, 16, 18, 21, 23],
  activeKey: 14,
  levelData: {
    "1": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0]
    },
    "2": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0]
    },
    "3": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0]
    },
    "4": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0],
      "6": [0, 0]
    },
    "5": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0]
    },
    "6": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0]
    },
    "7": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0]
    },
    "8": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0]
    },
    "9": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0]
    },
    "10": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0],
      "6": [0, 0]
    },
    "11": {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0]
    }
  },
  updateAverage: function(problem, newTime) {
    /*
    //Calculates a new average time given the previous    //
    //  average and the new time                          //
    //----------------------------------------------------//
    //problem(object): contains details about the problem //
    //  .answer(float): answer to the problem             //
    //  .destination(string): where to update the new avg //
    //  .level(integer): difficulty level of the problem  //
    //  .skill(integer): which skill record to update     //
    //newTime(integer): new time to add to the running avg//
    */

    let newAvg;
    let newDigits = problem.answer.toString(10).length;
    let oldAvg = this.levelData[problem.level][problem.skill][0];
    let oldDigits = this.levelData[problem.level][problem.skill][1];

    newAvg = ((oldAvg * oldDigits) + newTime) / (oldDigits + newDigits);
    newDigits += oldDigits;
    this.levelData[problem.level][problem.skill] = [Math.round(newAvg), newDigits];
  }
};

const levels = {
  "1": [
    () => upTo(1, 9, 10),
    () => addition(2, 5, 1, 3, 5, 1),
    () => doubles(1, 9, 1, 0, 0)
  ],
  "2": [
    () => mixedOps(1, 10, 1, 0, 10, 1),
    () => mixedOps(13, 19, 1, 0, 9, 1),
    () => mixedOps(10, 10, 1, 0, 9, 1),
    () => addition(1, 9, 1, 1, 9, 10),
    () => doubles(1, 9, 1, 1, 1)
  ],
  "3": [
    () => mixedOps(1, 10, 1, 0, 10, 1),
    () => maxSum(20, 1),
    () => maxSum(10, 10),
    () => nextMultiple(11, 89, 1, 10),
    () => doubles(1, 20, 1, 0, 0),
    () => doubles(1, 5, 10, 0, 0)
  ],
  "4": [
    () => mixedOps(1, 10, 1, 1, 10, 1),
    () => addition(1, 9, 1, 1, 9, 10),
    () => subtract(1, 9, 10, 1, 9, 1),
    () => mixedOps(11, 99, 1, 1, 9, 1),
    () => mixedOps(11, 99, 1, 1, 9, 10),
    () => doubles(11, 30, 1, 1, 1),
    () => doubles(1, 6, 10, 1, 1)
  ],
  "5": [
    () => addition(4, 9, 1, 4, 9, 1),
    () => subtract(10, 20, 1, 1, 19),
    () => mixedOps(1, 15, 10, 1, 10, 10),
    () => upTo(11, 89, 100),
    () => doubles(1, 10, 10, 0, 0)
  ],
  "6": [
    () => mixedThrees(1, 5, 1, 5, 1, 5),
    () => mixedOps(1, 10, 10, 11, 99, 1),
    () => mixedOps(11, 99, 1, 11, 99, 1),
    () => doubles(11, 30, 1, 1, 2),
    () => doubles(1, 9, 10, 10, 10)
  ],
  "7": [
    () => mixedOps(1, 9, 10, 1, 9, 10),
    () => mixedOps(1, 9, 100, 1, 9, 100),
    () => mixedOps(1, 9, 1000, 1, 9, 1000),
    () => doubles(1, 100, 1, 0, 0),
    () => halves(2, 100, 1),
    () => nextMultiple(101, 999, 1, 100),
  ],
  "8": [
    () => mixedOps(10, 99, 1, 10, 99, 1),
    () => nearMultiple(1, 99, 1, 9, 10, 1, 2),
    () => doubles(11, 99, 1, 1, 2),
    () => mixedOps(1, 99, 10, 1, 99, 10)
  ],
  "9": [
    () => mixedOpsDec(11, 99, 11, 99, 1, 1),
    () => doublesDec(11, 99, 1, 0, 0),
    () => halvesDec(12, 100, 1),
    () => nextMultiple(1001, 9999, 1, 1000),
    () => nextMultipleDec(11, 99, 1, 1)
  ],
  "10": [
    () => mixedOps(11, 99, 1, 11, 99, 1),
    () => mixedOps(11, 99, 10, 11, 99, 10),
    () => nearMultiple(11, 99, 1, 9, 10, 1, 2),
    () => nearMultiple(101, 999, 1, 9, 100, 1, 2),
    () => mixedOpsDec(11, 99, 11, 99, 1, 1),
    () => nearMultipleDif(1, 9, 1, 9, 1, 12, 100),
    () => nearMultipleDif(1, 9, 1, 9, 1, 30, 1000)
  ],
  "11": [
    () => mixedMax(1, 99, 1, 100, 10),
    () => mixedOpsDec(11, 99, 11, 99, 1, 1, false),
    () => nextMultipleDec(11, 99, 1, 1),
    () => nextMultipleDec(111, 999, 2, 1)
  ]
};

const scales = {
  pentMaj: [0, 2, 4, 7, 9],
  pentMin: [0, 3, 5, 7, 10],
  jap: [0, 2, 5, 7, 9]
}

const chords = {
  I: [0, 4, 7, 12],
  IV: [7, 11, 14, 19],
  V: [9, 13, 16, 21],
  TT: [0, 6, 12]
}

//The notes A2 through A7, 61 in total
const notes = [
  110, 116.54, 123.47, 
  130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94,
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88,
  523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77,
  1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1670, 1864.66, 1975.53,
  2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520
];