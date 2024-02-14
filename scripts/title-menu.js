async function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  let titleScreen = make.main("title-screen", ["screen", "grid"]);

    let header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

    let launchButton = make.button("Let's Go!", "title-screen__launch-button", "big-button", () => {
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
      
    })
  }

  let quit = false;
  while (!quit) {
    console.log("mode")
    let modeSelectScreen = make.main("mode-select-screen", ["screen", "flex-column"]);
    
      let challengeButton = make.button("Challenge", "mode-select-screen__challenge-button", "big-button");
      modeSelectScreen.appendChild(challengeButton);

      let skillsButton = make.button("Skills", "mode-select-screen__skills-button", "big-button");
      modeSelectScreen.appendChild(skillsButton);

      let settingsButton = make.button("Settings", "mode-select-screen__settings-button", "big-button");
      modeSelectScreen.appendChild(settingsButton);

    //await fadeTransition(modeSelectScreen);
    await fadeOut(document.body);
    clear(document.body);  
    document.body.appendChild(modeSelectScreen);
    await fadeIn(document.body);

    await waitForButton();
  }
}