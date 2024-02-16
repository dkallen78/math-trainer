async function doMathSurvival(operations) {
  //----------------------------------------------------//
  //Builds the math interface screen for Survival       //
  //  Challenge problems                                //
  //----------------------------------------------------//

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

  const interface = make.main("math-survival-interface", ["screen", "grid", "math-interface"]);

    const problemDisplay = make.section("math-survival-interface__problem-display", "problem-display");
    interface.appendChild(problemDisplay)

    const inputDisplay = make.section("math-survival-interface__input-display", "input-display");
    interface.appendChild(inputDisplay);

    const numberPad = numPad();
    interface.appendChild(numberPad);

    const svg = make.svg("math-survival-interface__svg");
      const rect = make.rect("1.5%", "1.5%", "97%", "97%", "math-survival-interface__svg__countdownRect");
        set(rect, ["rx", "3%"], ["fill-opacity", "0%"]);
      svg.appendChild(rect);
    interface.appendChild(svg);

  await fadeTransition(interface);

  await mathLoop();

  async function mathLoop() {

    let newProblem = true;
    let problem;
    //
    //The elements I need the exact measures of to animate the
    //  <rect> stroke
    const svgBox = svg.getBoundingClientRect();
    const rectBox = rect.getBoundingClientRect();
    //
    //The measurements I need to animate the <rect> stroke
    const diagonalNormal = Math.sqrt((svgBox.width ** 2) + (svgBox.height ** 2)) / Math.sqrt(2);
    const rawPerimeter = 2 * (rectBox.height + rectBox.width);
    const cornerRadius = svgBox.width * .03;
    const cornerCircumference = 2 * Math.PI * cornerRadius;
    const perimeter = rawPerimeter - (8 * cornerRadius) + cornerCircumference;
    const perimeterPercent = (perimeter / diagonalNormal) * 100;
    //
    //Animates the countdown by reducing the percentage of 
    //  stroke around the <rect>
    challengeTimer.timeStart();
    let challengeTimerCountdown = setInterval(() => {
      let timePercent = (challengeTimer.max - challengeTimer.elapsed) / challengeTimer.max;
      rect.setAttribute("stroke-dasharray", `${timePercent * perimeterPercent}% ${perimeterPercent}%`);
    }, 10);

    let quit = false;
    while(!quit) {

      if (newProblem) {
        problem = getNewProblem();
      }

      problemDisplay.innerHTML = problem.equation;
      numPad.on(inputDisplay);

      await waitForAnswer(problem)
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
            const interval = 50;
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
            await makeSurvivalSummaryScreen();
            break;
        }
      })
    }
  }

  async function waitForAnswer(problem) {
    //----------------------------------------------------//
    //Waits for user input after a problem has been       //
    //  displayed                                         //
    //----------------------------------------------------//

    return new Promise((resolve, reject) => {

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
          inputNumber(event.key, inputDisplay);
        } else if (event.key === "Backspace") {
          inputNumber("-1", inputDisplay);
        } else if (event.key === "Escape") {
          playTone(randomNote());
          reject("quit");
        } else if (event.key === "Enter") {
                
          let solution = parseFloat(inputDisplay.innerHTML, 10);
          clear(inputDisplay);
        
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
        
        let solution = parseFloat(inputDisplay.innerHTML, 10);
        clear(inputDisplay);
        
        if (problem.answer === solution) {
          resolve();
        } else {
          reject("answer");
        }
      }      
    })
  }

  function getNewProblem() {
    //----------------------------------------------------//
    //gets the problem for the challenge                  //
    //----------------------------------------------------//

    const elapsed = Math.floor(challengeTimer.rawElapsed / 1000);

    let survivalProblems = {
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

    operations.keys.forEach((e) => {
      if (operations[e]) {
        problemSet.push(survivalProblems[e]);
      }
    });

    [problem.answer, problem.equation] = rnd.index(problemSet)();

    return problem;
  }

  async function makeSurvivalSummaryScreen() {
    //----------------------------------------------------//
    //Makes the summary screen post challenge             //
    //----------------------------------------------------//
  
    let summaryScreen = make.main("summary-screen", ["screen", "flex-column"]);
  
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
  
      let doneButton = make.button("Done", "summary-screen__done-button", "button-big");
      summaryScreen.appendChild(doneButton);
  
      await fadeTransition(summaryScreen);
  
    return new Promise ((resolve, reject) => {
      
      let doneButton = get("summary-screen__done-button");
      set.click(doneButton, () => {
        playTone(randomNote());
        resolve();
      });
    })
  }
}