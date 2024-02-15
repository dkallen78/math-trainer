async function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  const titleScreen = make.main("title-screen", ["screen", "grid"]);

    const header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

    const launchButton = make.button("Let's Go!", "title-screen__launch-button", "button-big", () => {
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
      set.click(challengeButton, async () => {
        playTone(randomNote());
        //await makeChallengeBaseScreen();
        resolve();
      });

      const skillsButton = get("mode-select-screen__strategies-button");
      set.click(skillsButton, async () => {
        playTone(randomNote());
        await makeStrategiesStartScreen();
        resolve();
      })

      const settingsButton = get("mode-select-screen__settings-button");
      set.click(settingsButton, async () => {
        playTone(randomNote());
        await makeSettingsScreen();
        resolve();
      })
    })
  }

  let quit = false;
  while (!quit) {
    const modeSelectScreen = make.main("mode-select-screen", ["screen", "flex-column"]);
    
      const challengeButton = make.button("Challenge", "mode-select-screen__challenge-button", "button-big");
      modeSelectScreen.appendChild(challengeButton);

      const strategiesButton = make.button("Strategies", "mode-select-screen__strategies-button", "button-big");
      modeSelectScreen.appendChild(strategiesButton);

      const settingsButton = make.button("Settings", "mode-select-screen__settings-button", "button-big");
      modeSelectScreen.appendChild(settingsButton);

    await fadeTransition(modeSelectScreen);

    await waitForButton();
  }
}