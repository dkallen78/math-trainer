let challengeTimer = {
  start: 0,
  rawStart: 0,
  max: 5_000,
  add: (time) => {
    this.max += time;
  },
  timeStart: function() {
    this.start = performance.now();
    this.rawStart = this.start;
  },
  get elapsed() {
    return performance.now() - this.start;
  },
  get rawElapsed() {
    return performance.now() - this.rawStart;
  }
}

let challengeDeets = {
  score: 0,
  totalTime: 0,
  init: function() {
    this.score = 0;
    this.totalTime = 0;
  }
}

async function makeChallengeInputScreen(challengeOperations) {
  //----------------------------------------------------//
  //Makes the HTML scafold for the answer display and   //
  //  number input                                      //
  //----------------------------------------------------//

  let inputScreen = make.main("challenge-input-screen", "screen");

    let problemDisplay = make.section("challenge-input-screen__problem-display", "problem-display");
    inputScreen.appendChild(problemDisplay)

    let solutionDisplay = make.section("challenge-input-screen__solution-display", "solution-display");
    inputScreen.appendChild(solutionDisplay);

    let numberPad = makeNumberPad()
    inputScreen.appendChild(numberPad);

    let svg = make.svg("challenge-input-screen__svg");
      let rect = make.rect("1.5%", "1.5%", "97%", "97%", "challenge-input-screen__svg__countdownRect");
        set(rect, ["rx", "3%"], ["fill-opacity", "0%"]);
      svg.appendChild(rect);
    inputScreen.appendChild(svg);

  await fadeOut(document.body);
  clearElement(document.body);
  document.body.appendChild(inputScreen);
  await fadeIn(document.body);

  let quit = false;
  while (!quit) {
    await challengeMathLoop(challengeOperations)
      .then((exit) => {quit = exit});
  }
}

async function challengeMathLoop(challengeOperations) {
  //----------------------------------------------------//
  //The loop that handles all of the challenge logic    //
  //----------------------------------------------------//

  let problemDisplay = get("challenge-input-screen__problem-display");
  let solutionDisplay = get("challenge-input-screen__solution-display");
  let newProblem = true;
  let problem;
  challengeDeets.init();
  //
  //The elements I need the exact measures of to animate the
  //  <rect> stroke
  let svg = get("challenge-input-screen__svg");
  let svgBox = svg.getBoundingClientRect();
  let rect = get("challenge-input-screen__svg__countdownRect");
  let rectBox = rect.getBoundingClientRect();
  //
  //The measurements I need to animate the <rect> stroke
  let diagNormal = Math.sqrt((svgBox.width ** 2) + (svgBox.height ** 2)) / Math.sqrt(2);
  let rawPerimeter = 2 * (rectBox.height + rectBox.width);
  let cornerRadius = svgBox.width * .03;
  let cornerCircumference = 2 * Math.PI * cornerRadius;
  let perimeter = rawPerimeter - (8 * cornerRadius) + cornerCircumference;
  let perimeterPercent = (perimeter / diagNormal) * 100;
  //
  //Animates the countdown by reducing the percentage of 
  //  stroke around the <rect>
  challengeTimer.timeStart();
  let challengeTimerCountdown = setInterval(() => {
    let timePercent = (challengeTimer.max - challengeTimer.elapsed) / challengeTimer.max;
    rect.setAttribute("stroke-dasharray", `${timePercent * perimeterPercent}% ${perimeterPercent}%`);
  }, 10);

  let quit = false;
  while (!quit) {

    if (newProblem) {
      problem = getChallengeProblem(challengeOperations, challengeTimer.rawElapsed);
    }

    problemDisplay.innerHTML = problem.equation;
    numPadOn(solutionDisplay);

    await waitForChallengeAnswer(problem)
      .then(() => {
        playChord(makeChord(randomChord(), user.activeKey));
        newProblem = true;
        if (challengeTimer.elapsed > 2000) {
          challengeTimer.start += 2000;
        } else {
          challengeTimer.start += challengeTimer.elapsed;
        }
        
        challengeDeets.score += digitCount(problem.answer);
      })
      .catch(async (reject) => {
        switch(reject) {
          //
          //If the user quits
          case "quit":
            quit = true;
            break;
          //
          //If the user produces an incorrect answer
          case "answer":
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
            break;
          //
          //If time runs out
          case "time":
            clearInterval(challengeTimerCountdown);
            playArpeggio(makeChord(chords.I.concat(chords.IV, chords.V), user.activeKey));
            challengeDeets.totalTime = challengeTimer.rawElapsed;
            quit = true;
            await makeChallengeSummaryScreen();
            break;
        }
      })
    
    document.onkeydown = "";
  }
  return true;
}

function getChallengeProblem(challengeOperations, elapsed) {
  //----------------------------------------------------//
  //gets the problem for the challenge                  //
  //----------------------------------------------------//

  elapsed = Math.floor(elapsed / 1000);

  let problemFunctions = {
    "+": () => addWithin(Math.ceil(elapsed / 5), elapsed),
    "-": () => subWithin(1, elapsed),
    "×": 0,
    "÷": 0
  }

  let problemSet = [];
  let problem = {
    answer: 0,
    equation: ""
  }

  challengeOperations.keys.forEach((e) => {
    if (challengeOperations[e]) {
      problemSet.push(problemFunctions[e]);
    }
  });

  let challengeProblem = rnd(0, problemSet.length - 1);

  [problem.answer, problem.equation] = problemSet[challengeProblem]();

  return problem;
}

async function waitForChallengeAnswer(problem) {
  //----------------------------------------------------//
  //Waits for user input after a problem has been       //
  //  displayed                                         //
  //----------------------------------------------------//

  return new Promise((resolve, reject) => {
    let solutionDisplay = get("challenge-input-screen__solution-display");

    let timeCheck = setInterval(() => {
      if (challengeTimer.elapsed > challengeTimer.max) {
        clearInterval(timeCheck);
        reject("time");
      }
    }, 10);

    //
    //Handles keyboard input
    document.onkeydown = (event) => {
      let key = parseInt(event.key, 10);
      if ((key >= 0 && key <= 9 || event.key === ".")) {
        inputNumber(event.key, solutionDisplay);
      } else if (event.key === "Backspace") {
        inputNumber("-1", solutionDisplay);
      } else if (event.key === "Escape") {
        playTone(randomNote());
        reject("quit");
      } else if (event.key === "Enter") {
              
        let solution = parseFloat(solutionDisplay.innerHTML, 10);
        clearElement(solutionDisplay);
      
        if (problem.answer === solution) {
          resolve();
        } else {
          reject("answer");
        }
      }
      event.preventDefault();
    }
    //
    //When the user presses the Quit button
    get("number-pad__button-quit").onclick = () => {
      playTone(randomNote());
      reject("quit");
    }
    //
    //When the user submits an answer
    get("number-pad__button-submit").onclick = () => {
      
      let solution = parseFloat(solutionDisplay.innerHTML, 10);
      clearElement(solutionDisplay);
      
      if (problem.answer === solution) {
        resolve();
      } else {
        reject("answer");
      }
    }      
  })
}

async function makeChallengeSummaryScreen() {
  //----------------------------------------------------//
  //Makes the summary screen post challenge             //
  //----------------------------------------------------//

  let summaryScreen = make.main("summary-screen", "screen");

    let summaryDisplay = make.header("summary-screen__summary-display", "marquee");
      summaryDisplay.innerHTML = "Challenge Complete!";
    summaryScreen.appendChild(summaryDisplay);

    let challengeStats = make.section("summary-screen__challenge-stats");

      let challengeScore = make.div("summary-display__challenge-stats__challenge-score");
        challengeScore.innerHTML = `Score: ${challengeDeets.score}`;
      challengeStats.appendChild(challengeScore);

      let challengeTime = make.div("summary-display__challenge-stats__challenge-score");
        let displayTime = (challengeDeets.totalTime / 1000).toPrecision(4)
        challengeTime.innerHTML = `Total Time: ${displayTime} s`;
      challengeStats.appendChild(challengeTime);

    summaryScreen.appendChild(challengeStats);

    let doneButton = make.button("Done", "summary-screen__done-button", "big-button");
    summaryScreen.appendChild(doneButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(summaryScreen);
    await fadeIn(document.body);

  return new Promise ((resolve, reject) => {
    
    let doneButton = get("summary-screen__done-button");
    set.click(doneButton, () => {
      playTone(randomNote());
      resolve();
    });
  })
}