async function makeChallengeStartScreen() {

  async function waitForButton() {

    return new Promise((resolve, reject) => {

      let survivalButton = document.getElementById("survival-button");

      survivalButton.onclick = async () => {
        playTone(randomNote());
        await makeSurvivalBaseScreen();
        resolve(false);
      }

      let backButton = document.getElementById("back-button");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while (!quit) {

    let challengeSelectScreen = makeElement("main", "challenge-select-screen", "screen");

      let challengeSelectScreenInfo = makeElement("header", "challenge-select-screen-info", "marquee");
        challengeSelectScreenInfo.innerHTML = "Select a Challenge";
      challengeSelectScreen.appendChild(challengeSelectScreenInfo);

      let challengeSelect = makeElement("nav", "challenge-select");

        let survivalButton = makeButton("Survival", null, "survival-button", "bigButton");
        challengeSelect.appendChild(survivalButton);

        let backButton = makeButton("Back", null, "back-button", "bigButton");
        challengeSelect.appendChild(backButton);

      challengeSelectScreen.appendChild(challengeSelect);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(challengeSelectScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}