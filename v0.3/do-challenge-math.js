async function makeChallengeInputScreen(problemSet) {

  let inputScreen = makeElement("main", "challenge-input-screen", "screen");

    let problemDisplay = makeElement("section", "challenge-input-screen__problem-display");
    inputScreen.appendChild(problemDisplay)

    let solutionDisplay = makeElement("section", "challenge-input-screen__solution-display");
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