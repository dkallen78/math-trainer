async function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  const titleScreen = make.main("title-screen", ["screen", "grid"]);

    const header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

    const launchButton = make.button("Let's Go!", "title-screen__launch-button", "big-button", () => {
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

      const skillsButton = get("mode-select-screen__skills-button");
      set.click(skillsButton, async () => {
        playTone(randomNote());
        //await makeSkillsStartScreen();
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
    
      const challengeButton = make.button("Challenge", "mode-select-screen__challenge-button", "big-button");
      modeSelectScreen.appendChild(challengeButton);

      const skillsButton = make.button("Skills", "mode-select-screen__skills-button", "big-button");
      modeSelectScreen.appendChild(skillsButton);

      const settingsButton = make.button("Settings", "mode-select-screen__settings-button", "big-button");
      modeSelectScreen.appendChild(settingsButton);

    await fadeTransition(modeSelectScreen);

    await waitForButton();
  }
}