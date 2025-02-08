async function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  const titleScreen = make.main("title-screen", ["screen", "grid"]);

    const header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

    const launchButton = make.button("Let's Go!", "title-screen__launch-button", "button-big", () => {
      launchButton.onclick = null;
      playTone(randomNote());
      makeModeSelectScreen();
    });
    titleScreen.appendChild(launchButton);

  await fadeTransition(titleScreen);
}

async function makeModeSelectScreen() {
  //----------------------------------------------------//
	//Makes the mode select screen. This is also the base //
  //  to which the program returns when all other loops //
  //  have ended                                        //
	//----------------------------------------------------//

  async function waitForButton() {
    return new Promise((resolve, reject) => {
      const challengeButton = get("mode-select-screen__challenge-button");
      challengeButton.onclick = async () => {
        challengeButton.onclick = null;
        playTone(randomNote());
        await makeChallengesStartScreen();
        resolve();
      };

      const strategiesButton = get("mode-select-screen__strategies-button");
      strategiesButton.onclick = async () => {
        strategiesButton.onclick = null;
        playTone(randomNote());
        await makeStrategiesStartScreen();
        resolve();
      }

      const settingsButton = get("mode-select-screen__settings-button");
      settingsButton.onclick = async () => {
        settingsButton.onclick = null;
        playTone(randomNote());
        await makeSettingsScreen();
        resolve();
      }
    })
  }

  let quit = false;
  while (!quit) {
    
    const modeSelectScreen = make.main("mode-select-screen", ["screen", "flex-column"]);
    
      const challengeButton = make.button("Challenges", "mode-select-screen__challenge-button", "button-big");
      modeSelectScreen.appendChild(challengeButton);

      const strategiesButton = make.button("Strategies", "mode-select-screen__strategies-button", "button-big");
      modeSelectScreen.appendChild(strategiesButton);

      const settingsButton = make.button("Settings", "mode-select-screen__settings-button", "button-big");
      modeSelectScreen.appendChild(settingsButton);

    await fadeTransition(modeSelectScreen);
-
    await waitForButton();
  }
}