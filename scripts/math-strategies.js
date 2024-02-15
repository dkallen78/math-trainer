async function doMathStrategy(strategy) {

  const interface = make.main("math-strategy-interface", ["screen", "grid", "math-interface"]);

    const problemDisplay = make.section("math-strategy-interface__problem-display", "problem-display");
    interface.appendChild(problemDisplay);

    const inputDisplay = make.section("math-strategy-interface__input-display", "input-display");
    interface.appendChild(inputDisplay);

    const numberPad = numPad();
    interface.appendChild(numberPad);

  await fadeTransition(interface);

  await mathLoop();

  async function mathLoop() {

    let newProblem = true;
    let problem;
    let startTime = 0;
    let totalTime = 0;
    //
    //This holds the completed answers and how long it took to
    //  complete them. The number passed to it determines the 
    //  minimum number of problems that need to be answered before
    //  "competency" is reached
    let queue = new ProgressQueue(user.qDepth, user.maxAvg);

    let quit = false;
    while(!quit) {

      if (newProblem) {
        problem = getNewProblem();
        startTime = performance.now();
      }

      problemDisplay.innerHTML = problem.equation;
      numPad.on(inputDisplay);

      await waitForAnswer(problem)
      .then(() => {
        totalTime = performance.now() - startTime;

        queue.push(totalTime, digitCount(problem.answer));

        if (queue.pass) {
          playArpeggio(makeChord(chords.I.concat(chords.IV, chords.V), user.activeKey));

          if ("notification" in strategy && !user[strategy.id[0]][strategy.id[1]][strategy.id[2]]) {
            notify.push(strategy.notification);
          }

          user[strategy.id[0]][strategy.id[1]][strategy.id[2]] = true;

          quit = true;
        } else {
          playChord(makeChord(chords.I, user.activeKey));
        }

        newProblem = true;
      })
      .catch((exitLoop) => {
        
        if (exitLoop) {
          quit = true;
        } else {

          playChord(makeChord(chords.TT, user.activeKey));

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
    //return true;
  }

  async function waitForAnswer(problem) {

    return new Promise((resolve, reject) => {

      document.onkeydown = (event) => {
        let key = parseInt(event.key, 10);
        if ((key >= 0 && key <= 9 || event.key === ".")) {
          inputNumber(event.key, solutionDisplay);
        } else if (event.key === "Backspace") {
          inputNumber("-1", solutionDisplay);
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

      get("number-pad__button-quit").onclick = () => {
        playTone(randomNote());
        reject(true);
      }
        
      get("number-pad__button-submit").onclick = () => {
        
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

  function getNewProblem() {

    let problem = {};
    problem.answer = 0;
    problem.equation = "";

    [problem.answer, problem.equation] = strategy.run();

    return problem;
  }
}

class ProgressQueue {
  //----------------------------------------------------//
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
  //----------------------------------------------------//

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
      const previousAverage = average.time * average.digits;
      const newTotalTime = previousAverage + current.time;
      const newDigitCount = average.digits + current.digits
      return {time: (newTotalTime / newDigitCount), digits: newDigitCount}
    }, {time: 0, digits: 0}).time);
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