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
  let queue = new ProgressQueue(2, 15000);

  while (!quit) {

    //
    //Gets a new problem and establishes a start time to establish
    //  how long it took to solve
    if (newProblem) {
      problem = getNewProblem(problemSet);
      startTime = Date.now();
    }

    //
    //Displays the problem on the screen and activates the number pad buttons
    problemDisplay.innerHTML = problem.equation;
    numPadOn();

    await waitForAnswer(problem)
      /*
      //What to do for a correct answer
      */
      .then(() => {
        //
        //Get the time taken to answer the question
        totalTime = Date.now() - startTime;
        //
        //Push that time and the number of digits in the answer
        //  into our queue
        queue.push([totalTime, digitCount(problem.answer)]);
        /*
        //queue.pass checks to see if "mastery" has been achieved
        //  based on the total number of digits in the correct solutions
        //  and the average amount of time it took
        */
        if (queue.pass) {
          playArpeggio(makeChord(chords.I.concat(chords.IV, chords.V), user.activeKey)); 
          //
          //Marks the skill as completed in the user object
          let targets = problemSet[problem.skillNum].id;
          user[targets[0]][targets[1]][targets[2]] = true;
          //
          //Checks if there is a notification associated with passing the
          //  current skill, and puts it in the notify array to be announced
          //  on the Skills page
          if ("notification" in problemSet[problem.skillNum]) {
            notify.push(problemSet[problem.skillNum].notification);
          }
          //
          //Flags the loop to end
          quit = true;
        /*
        //Correct answer, incomplete mastery
        */
        } else {
          playChord(makeChord(chords.I, user.activeKey));
        }
        //
        //Flags a new problem to be grabbed on the next loop
        newProblem = true;  
      })
      /*
      //What to do for an incorrect answer or quit
      */
      .catch((end) => {
        /*
        //If the user quits
        */
        if (end) {
          quit = true;
        /*
        //If the answer is wrong
        */
        } else {
          //
          //Play the tritone
          playChord(makeChord(chords.TT, user.activeKey));
          //
          //Flags to keep the current problem
          newProblem = false;
          //
          //All this causes the problem to shake a bit
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

    /*
    //Handles keyboard input
    */
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
  /*
  //A queue data structure designed to hold the average //
  //  time per digit taken to answer a fixed number of  //
  //  previous questions                                //
  //----------------------------------------------------//
  //size(integer): the maximum number of problems in    //
  //  the queue                                         //
  //limit(integer): the maximum average per digit answer//
  //  rate to "master" a skill                          //
  //----------------------------------------------------//
  //length(integer): the current length of the queue    //
  //avg(integer): the average milliseconds per digit    //
  //  taken to find the correct answer                  //
  //pass(boolean): whether or not the user has met the  //
  //  pass requirements of answering [size] questions   //
  //  with an average per digit of less than [limit]    //
  //  milliseconds                                      //
  //push(undefined): adds a new time/digit pair to the  //
  //  queue and removes the oldest one if the size of   //
  //  the queue is greater than [size]                  //
  */

  constructor(size, limit) {
    this.size = size;
    this.limit = limit;
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
    if (this.length < this.size || this.avg > this.limit) {
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