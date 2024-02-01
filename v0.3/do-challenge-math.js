async function makeChallengeInputScreen(challengeOperations) {
  //----------------------------------------------------//
  //Makes the HTML scafold for the answer display and   //
  //  number input                                      //
  //----------------------------------------------------//

  let inputScreen = makeElement("main", "challenge-input-screen", "screen");

    let problemDisplay = makeElement("section", "challenge-input-screen__problem-display", "problem-display");
      
    inputScreen.appendChild(problemDisplay)

    let solutionDisplay = makeElement("section", "challenge-input-screen__solution-display", "solution-display");
    inputScreen.appendChild(solutionDisplay);

    let numberPad = makeNumberPad()
    inputScreen.appendChild(numberPad);

    let svg = makeSVG("svg", "challenge-input-screen__svg");
      let rect = makeSVG("rect", "challenge-input-screen__svg__countdownRect");
        rect.setAttribute("x", "1.5%");
        rect.setAttribute("width", "97%");
        rect.setAttribute("y", "1.5%");
        rect.setAttribute("height", "97%");
        rect.setAttribute("rx", "3%");
        rect.setAttribute("fill-opacity", "0%");
        //rect.setAttribute("stroke-width", "2%");
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


  let problemDisplay = document.getElementById("challenge-input-screen__problem-display");
  let solutionDisplay = document.getElementById("challenge-input-screen__solution-display");
  let newProblem = true;
  let problem;
  let timer = {
    start: performance.now(),
    max: 60_000,
    add: function(time) {
      this.max += time;
    },
    get elapsed() {
      return performance.now() - this.start;
    }
  }
  //
  //The elements I need the exact measures of to animate the
  //  <rect> stroke
  let svg = document.getElementById("challenge-input-screen__svg");
  let svgBox = svg.getBoundingClientRect();
  let rect = document.getElementById("challenge-input-screen__svg__countdownRect");
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
  let timerCountdown = setInterval(() => {
    let timePercent = (timer.max - timer.elapsed) / timer.max;
    rect.setAttribute("stroke-dasharray", `${timePercent * perimeterPercent}% ${perimeterPercent}%`);
  }, 10);

  let quit = false;
  while (!quit) {

    if (newProblem) {
      problem = getChallengeProblem(challengeOperations, timer.elapsed);
    }

    problemDisplay.innerHTML = problem.equation;
    numPadOn(solutionDisplay);

    await waitForChallengeAnswer(problem)
      .then(() => {
        playChord(makeChord(chords.I, user.activeKey));
        newProblem = true;
        timer.max += 2000;
      })
      .catch((end) => {
        //
        //If the user quits
        if (end) {
          quit = true;
        //
        //If the answer is wrong
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

function getChallengeProblem(challengeOperations, elapsed) {

  elapsed = Math.floor(elapsed / 1000);

  let problemFunctions = {
    "+": () => addWithin(1, elapsed),
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
    let solutionDisplay = document.getElementById("challenge-input-screen__solution-display");

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

    document.getElementById("number-pad__button-quit").onclick = () => {
      playTone(randomNote());
      reject(true);
    }
      
    document.getElementById("number-pad__button-submit").onclick = () => {
      
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