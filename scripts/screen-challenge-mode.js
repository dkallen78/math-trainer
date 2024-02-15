async function makeChallengesStartScreen() {

  async function waitForButton() {

    return new Promise((resolve, reject) => {

      let survivalButton = get("challenge-select-screen__survival-button");
      set.click(survivalButton, async () => {
        playTone(randomNote());
        //await makeSurvivalBaseScreen();
        resolve(false);
      });

      let backButton = get("challenge-select-screen__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      });
    })
  }

  let quit = false;
  while(!quit) {

    let challengeBaseScreen = make.main("challenge-base-screen", ["screen", "flex-column"]);

      let survivalButton = make.button("Survival", "challenge-select-screen__survival-button", "button-big");
      challengeBaseScreen.appendChild(survivalButton);

      let backButton = make.button("Back", "challenge-select-screen__back-button", "button-big");
      challengeBaseScreen.appendChild(backButton);

    await fadeTransition(challengeBaseScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}