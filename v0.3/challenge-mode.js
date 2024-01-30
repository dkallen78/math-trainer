async function makeChallengeBaseScreen() {
  //----------------------------------------------------//
  //Makes the screen that will display the different    //
  //  challenge modes                                   //
  //----------------------------------------------------//


  async function waitForButton() {

    return new Promise((resolve, reject) => {

      let survivalButton = document.getElementById("challenge-select-screen__menu__survival-button");

      survivalButton.onclick = async () => {
        playTone(randomNote());
        await makeSurvivalBaseScreen();
        resolve(false);
      }

      let backButton = document.getElementById("challenge-select-screen__menu__back-button");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while (!quit) {

    let challengeBaseScreen = makeElement("main", "challenge-base-screen", "screen");

      let challengeBaseScreenInfo = makeElement("header", "challenge-select-screen__info", "marquee");
        challengeBaseScreenInfo.innerHTML = "Select a Challenge";
      challengeBaseScreen.appendChild(challengeBaseScreenInfo);

      let challengeMenu = makeElement("nav", "challenge-select-screen__menu");

        let survivalButton = makeButton("Survival", null, "challenge-select-screen__menu__survival-button", "big-button");
        challengeMenu.appendChild(survivalButton);

        let backButton = makeButton("Back", null, "challenge-select-screen__menu__back-button", "big-button");
        challengeMenu.appendChild(backButton);

      challengeBaseScreen.appendChild(challengeMenu);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(challengeBaseScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}

async function makeSurvivalBaseScreen() {
  
  async function waitForButton() {

  }

  let quit = false;

  while (!quit) {

    let survivalBaseScreen = makeElement("main", "survival-base-screen", "screen");

    let survivalBaseScreenHeader = makeElement("header", "survival-base-screen__header", "marquee");
      survivalBaseScreenHeader.innerHTML = "Select Operations for Challenge";
    survivalBaseScreen.appendChild(survivalBaseScreenHeader);

    let survivalMenu = makeElement("nav", "survival-base-screen__menu");

      let additionButton = makeButton("+", null, "survival-base-screen__menu__addition-button", "inactive-button");
      skillsSelect.appendChild(additionButton);

      let subtractionButton = makeButton("-", null, "survival-base-screen__menu__subtraction-button", "inactive-button");
      skillsSelect.appendChild(subtractionButton);

      let multiplicationButton = makeButton("×", null, "survival-base-screen__menu__multiplication-button", "inactive-button");
      skillsSelect.appendChild(multiplicationButton);

      let divisionButton = makeButton("÷", null, "survival-base-screen__menu__division-button", "inactive-button");
      skillsSelect.appendChild(divisionButton);

      let backButton = makeButton("Back", null, "ssurvival-base-screen__menu__BackButton", "big-button");
      skillsSelect.appendChild(backButton);

    survivalBaseScreen.appendChild(survivalMenu);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(survivalBaseScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}