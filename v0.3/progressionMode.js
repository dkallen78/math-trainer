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
  
function getProgressionProblem(skillSet) {

  let skill = rnd(0, skillSet.length - 1);

  let problem = {
    answer: 0,
    equation: "",
    skill: "",
    level: 0,
    attempts: 0
  }

  problem.skill = currentProg[`skill${skill + 1}`];

  [problem.answer, problem.equation] = skillSet[skill]();
  
  return problem;
}

async function makeProgressionStartScreen() {

  async function waitForButton() {
    return new Promise((resolve, reject) => {
      let startButton = document.getElementById("progressionStartButton");
      startButton.onclick = async () => {
        playTone(randomNote());
        await makeProgressionInputScreen();
        resolve(false);
      }

      let backButton = document.getElementById("progressionBackButton");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  async function spinSkills() {
    let skill1 = document.getElementById("skill1Button");
    let skill2 = document.getElementById("skill2Button");
    let skill3 = document.getElementById("skill3Button");

    let skillArray = Object.keys(prog);
    let skill1key, skill2key, skill3key

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let skillInterval1 = setInterval(() => {

      skill1key = rnd(0, skillArray.length - 1);
      skill1.innerHTML = prog[skillArray[skill1key]].string;
      count1++;
      if (count1 > 1) {
        currentProg.skill1 = skillArray[skill1key];
        skillArray.splice(skill1key, 1);
        clearInterval(skillInterval1);
      }
    }, 50);

    let skillInterval2 = setInterval(() => {

      skill2key = rnd(0, skillArray.length - 1);
      skill2.innerHTML = prog[skillArray[skill2key]].string;
      count2++;
      if (count2 > 2) {
        currentProg.skill2 = skillArray[skill2key];
        skillArray.splice(skill2key, 1);
        clearInterval(skillInterval2);

      }
    }, 50);

    let skillInterval3 = setInterval(() => {
      playTone(261.63, "sine", .05);

      skill3key = rnd(0, skillArray.length - 1);
      skill3.innerHTML = prog[skillArray[skill3key]].string;
      count3++;
      if (count3 > 3) {
        currentProg.skill3 = skillArray[skill3key];
        skillArray.splice(skill3key, 1);
        clearInterval(skillInterval3);
        }
    }, 50);
  }

    let quit = false;

  while (!quit) {
    let progressionSelectScreen = makeElement("div", "progressionSelectScreen", "screen");

      let startGuide = makeElement("div", "startGuide");
        startGuide.innerHTML = "Get Ready";
      progressionSelectScreen.appendChild(startGuide);

      let activeSkills = makeElement("div", "activeSkills");

        let skill1 = makeButton("", null, "skill1Button", "skillDisplay");
        activeSkills.appendChild(skill1);

        let skill2 = makeButton("", null, "skill2Button", "skillDisplay");
        activeSkills.appendChild(skill2);

        let skill3 = makeButton("", null, "skill3Button", "skillDisplay");
        activeSkills.appendChild(skill3);

      progressionSelectScreen.appendChild(activeSkills);

      let button = makeButton("Start", null, "progressionStartButton");
      progressionSelectScreen.appendChild(button);

      let backButton = makeButton("Back", null, "progressionBackButton");
      progressionSelectScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);  
    document.body.appendChild(progressionSelectScreen);
    await fadeIn(document.body);

    await spinSkills();

    await waitForButton()
      .then((exit) => {quit = exit});

  }
  //return;
}

async function makeProgressionInputScreen() {

  let progressionInputScreen = makeElement("div", "progressionInputScreen", "screen");

    let problemDisplay = makeElement("div", "problemDisplay");
    progressionInputScreen.appendChild(problemDisplay)

    let solutionDisplay = makeElement("div", "solutionDisplay");
    progressionInputScreen.appendChild(solutionDisplay);

    let numberPad = makeNumberPad()
    progressionInputScreen.appendChild(numberPad);

  await fadeOut(document.body);
  clearElement(document.body);
  document.body.appendChild(progressionInputScreen);
  await fadeIn(document.body);
    
  let quit = false;
  while (!quit) {
    await progressionLoop()
      .then((exit) => {quit = exit});
  }
}

async function progressionLoop() {

  let quit = false;
  let getNewProblem = true;
  let problem;
  let problemDisplay = document.getElementById("problemDisplay");

  let starttime, totalTime;

  let skillSet = [
    prog[currentProg.skill1].set[user.skillLevel[currentProg.skill1]],
    prog[currentProg.skill2].set[user.skillLevel[currentProg.skill2]],
    prog[currentProg.skill3].set[user.skillLevel[currentProg.skill3]]
  ];

  while (!quit) {

    if (getNewProblem) {
      problem = getProgressionProblem(skillSet);
      startTime = Date.now();
    }

    problemDisplay.innerHTML = problem.equation;
    numPadOn();

    await waitForAnswer(problem)
      .then(() => {
        /*
        //What to do when the user enters a correct answer
        */
        totalTime = Date.now() - startTime;
        playChord(makeChord(chords.I, user.activeKey));
        getNewProblem = true;
      })
      .catch((end) => {
        /*
        //What to do when the user quits or enters an incorrect answer
        */
        if (end) {
          quit = true;
        } else {
          playChord(makeChord(chords.TT, user.activeKey));
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

async function waitForAnswer(problem) {

    return new Promise((resolve, reject) => {
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
          }

          document.getElementById("buttonQuit").onclick = () => {
            console.log("click quit");
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
    })
}

let currentProg = {
    skill1: "",
    skill2: "",
    skill3: ""
}

let prog = {
    mixedOps: {
        string: "+/-",
        set: [
            () => within(1, 5),
            () => within(1, 10),
            () => toOrFrom(1, 10)
        ]
    },
    upTo: {
        string: "Up To",
        set: [
            () => upTo(1, 10),
            () => upTo(11, 20),
            () => upTo(1, 20)
        ]
    },
    doubles: {
        string: "Doubles",
        set: [
            () => doubles(1, 10, 1, 0, 0),
            () => doubles(1, 20, 1, 0, 0),
            () => doubles(1, 5, 10, 0, 0)
        ]
    }
}

let progData = {
  mixedOps: {
    0: [],
    1: [],
    2: []
  },
  upTo: {
    0: [],
    1: [],
    2: []
  },
  doubles: {
    0: [],
    1: [],
    2: []
  }
}