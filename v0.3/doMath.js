async function makeInputScreen(problemSet) {

  let inputScreen = makeElement("div", "inputScreen", "screen");

    let problemDisplay = makeElement("div", "problemDisplay");
    inputScreen.appendChild(problemDisplay)

    let solutionDisplay = makeElement("div", "solutionDisplay");
    inputScreen.appendChild(solutionDisplay);

    let numberPad = makeNumberPad()
    inputScreen.appendChild(numberPad);

  await fadeOut(document.body);
  clearElement(document.body);
  document.body.appendChild(inputScreen);
  await fadeIn(document.body);

  let quit = false;
  while (!quit) {
    await mathLoop(problemSet)
      .then((exit) => {quit = exit});
  }
}

async function mathLoop(problemSet) {

  let quit = false;
  let newProblem = true;
  let problem;
  let problemDisplay = document.getElementById("problemDisplay");

  let startTime, totalTime;

  //
  //This holds the completed answers and how long it took to
  //  complete them. The number passed to it determines the 
  //  minimum number of problems that need to be answered before
  //  "competency" is reached
  let queue = new ProgressQueue(2);

  while (!quit) {

    if (newProblem) {
      problem = getNewProblem(problemSet);
      startTime = Date.now();
    }

    problemDisplay.innerHTML = problem.equation;
    numPadOn();

    await waitForAnswer(problem)
      .then(() => {

        totalTime = Date.now() - startTime;

        queue.push([totalTime, digitCount(problem.answer)]);

        if (queue.pass) {
          playArpeggio(makeChord(chords.I.concat(chords.IV, chords.V), user.activeKey)); 

          let targets = problemSet[problem.skillNum].id;
          user[targets[0]][targets[1]][targets[2]] = true;

          if ("notification" in problemSet[problem.skillNum]) {
            notify.push(problemSet[problem.skillNum].notification);
          }

          quit = true;
        } else {
          playChord(makeChord(chords.I, user.activeKey));
        }
        newProblem = true;  
      })
      .catch((end) => {
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

function getNewProblem(problemSet) {
  /*
  //Creates a random arithmetic problem                 //
  //----------------------------------------------------//
  //skillSet(array[function]): an array of functions    //
  //  that are randomly called to generate the problems //
  //----------------------------------------------------//
  //return(object): the object containing the problem   //
  //  details                                           //
  */

  let skill = rnd(0, problemSet.length - 1);

  console.log(problemSet[skill]);

  let problem = {
    answer: 0,
    equation: "",
    //skill: "",
    skillNum: 0,
    //level: 0,
    //attempts: 0
  }

  problem.skillNum = skill;

  [problem.answer, problem.equation] = problemSet[skill].run();

  return problem;
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
        playTone(randomNote());
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
      playTone(randomNote());
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