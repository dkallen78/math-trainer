function getProgressionProblem(skillSet) {
  /*
  //Creates a random arithmetic problem                 //
  //----------------------------------------------------//
  //skillSet(array[function]): an array of functions    //
  //  that are randomly called to generate the problems //
  //----------------------------------------------------//
  //return(object): the object containing the problem   //
  //  details                                           //
  */

  let skill = rnd(0, skillSet.length - 1);

  let problem = {
    answer: 0,
    equation: "",
    skill: "",
    skillNum: 0,
    level: 0,
    attempts: 0
  }

  problem.skillNum = skill;
  problem.level = user.skillLevel[problem.skill];

  [problem.answer, problem.equation] = skillSet[skill]();
  
  return problem;
}

async function makeProgressionStartScreen() {
  /*
  //Makes the starting screen for Progression Mode      //
  */


  async function waitForButton() {
    /*
    //Assigns functions to the buttons and waits for
    //  them to be pressed
    */

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

      document.onkeydown = async function(e) {
        if (e.key === "Escape") {
          playTone(randomNote());
          resolve(true);
        } else if (e.key === "Enter") {
          playTone(randomNote());
          await makeProgressionInputScreen();
          resolve(false);
        }
      }
    })
  }

  async function spinSkills() {
    /*
    //Assigns the three skill categories randomly and 
    //  makes them "spin" by changing the category displayed
    */

    let skill1 = document.getElementById("skill1Button");
    let skill2 = document.getElementById("skill2Button");
    let skill3 = document.getElementById("skill3Button");

    let skillArray = Object.keys(prog);


    let count = 0;

    let spinInterval = setInterval(() => {
      playTone(261.63, "sine", .05);

      skill1.innerHTML = prog[skillArray[count % 3]].string;
      skill2.innerHTML = prog[skillArray[(count + 1) % 3]].string;
      skill3.innerHTML = prog[skillArray[(count + 2) % 3]].string;

      count++;

      if (count >= 10) {
        let skillKey = rnd(0, skillArray.length - 1);
        skill1.innerHTML = prog[skillArray[skillKey]].string;
        currentProg.skill1 = skillArray[skillKey];
        skillArray.splice(skillKey, 1);
    
        skillKey = rnd(0, skillArray.length - 1);
        skill2.innerHTML = prog[skillArray[skillKey]].string;
        currentProg.skill2 = skillArray[skillKey];
        skillArray.splice(skillKey, 1);
    
        skillKey = rnd(0, skillArray.length - 1);
        skill3.innerHTML = prog[skillArray[skillKey]].string;
        currentProg.skill3 = skillArray[skillKey];

        console.log(currentProg.skill1, currentProg.skill2, currentProg.skill3);
    
        clearInterval(spinInterval);
      }
    }, 50)
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

    document.onkeydown = "";
  }
}

async function makeProgressionInputScreen() {
  /*
  //Makes the problem and solution output elements and 
  //  the number input element (number pad)
  */

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
  /*
  //The main logic loop of Progression Mode
  */

  let quit = false;
  let getNewProblem = true;
  let problem;
  let problemDisplay = document.getElementById("problemDisplay");

  let startTime, totalTime;

  let skillSet = [
    prog[currentProg.skill1].set[user.skillLevel[currentProg.skill1]],
    prog[currentProg.skill2].set[user.skillLevel[currentProg.skill2]],
    prog[currentProg.skill3].set[user.skillLevel[currentProg.skill3]]
  ]

  let skillData = {
    [currentProg.skill1]: new ProgressQueue(2),
    [currentProg.skill2]: new ProgressQueue(2),
    [currentProg.skill3]: new ProgressQueue(2)
  }

  let currentSkills = [
    currentProg.skill1,
    currentProg.skill2,
    currentProg.skill3
  ]

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

        skillData[currentSkills[problem.skillNum]].push([totalTime, digitCount(problem.answer)]);

        if (skillData[currentSkills[problem.skillNum]].pass) {
          /*
          //What to do when the user achieves mastery in the current skill
          */

          playArpeggio(makeChord(chords.I.concat(chords.IV, chords.V), user.activeKey)); 
          if (user.skillLevel[currentSkills[problem.skillNum]] < (prog[currentSkills[problem.skillNum]].set.length - 1)) {
            user.skillLevel[currentSkills[problem.skillNum]]++;
          }

          skillSet.splice(problem.skillNum, 1);
          currentSkills.splice(problem.skillNum, 1);

          if (skillSet.length < 1) {quit = true}
        } else {
          playChord(makeChord(chords.I, user.activeKey));
        }
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
  /*
  //Waits for user input after a problem has been displayed
  */

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
      () => doubles(1, 5, 1, 0, 0),
      () => doubles(1, 10, 1, 0, 0),
      () => doubles(1, 20, 1, 0, 0),
      () => doubles(1, 5, 10, 0, 0)
    ]
  },
  nearDoubles: {
    string: "Near Doubles",
    set: [
      () => doubles(1, 5, 1, 1, 1),
      () => doubles(1, 10, 1, 1, 1),
      () => doubles(11, 20, 1, 1, 1)
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

class ProgressQueue {
  constructor(size) {
    this.size = size;
    this.q = [];
  }
  get length() {
    return this.q.length;
  }
  get avg() {
    return Math.round(this.q.reduce((average, current) => {
      let oldTotal = average[0] * average[1];
      let newTotal = oldTotal + current[0];
      let newCount = average[1] + current[1];
      return [(newTotal / newCount), newCount];
    }, [0, 0])[0]);
  }
  get pass() {
    if (this.length < this.size || this.avg > 15000) {
      return false;
    } else {
      return true;
    }
  }
  push(x) {
    if (this.q.push(x) > this.size) {
      this.q.shift();
    }
  }
}