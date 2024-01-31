async function makeChallengeInputScreen(challengeOperations) {

  let inputScreen = makeElement("main", "challenge-input-screen", "screen");

    let problemDisplay = makeElement("section", "challenge-input-screen__problem-display", "problem-display");
    inputScreen.appendChild(problemDisplay)

    let solutionDisplay = makeElement("section", "challenge-input-screen__solution-display", "solution-display");
    inputScreen.appendChild(solutionDisplay);

    let numberPad = makeNumberPad()
    inputScreen.appendChild(numberPad);

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

  let startTime = 0;
  let elapsedTime = 0;
  let maxTime = 60_000;

  let quit = false;
  while (!quit) {

  }
}

function getChallengeProblem(challengeOperations) {
  
}