async function makeSettingsScreen() {
  //----------------------------------------------------//
	//Makes the base settings screen from which all       //
  //  settings can be accessed                          //
	//----------------------------------------------------//

  async function waitForButton() {
    return new Promise ((resolve, reject) => {
      const themeButton = get("settings-screen__theme-button");
      set.click(themeButton, async () => {
        playTone(randomNote());
          await makeThemeScreen();
          resolve(false);
      })

      const soundButton = get("settings-screen__sound-button");
      set.click(soundButton, async () => {
        playTone(randomNote());
        await makeSoundScreen();
        resolve(false);
      })

      const backButton = get("settings-screen__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      })
  })
  }

  let quit = false;
  while (!quit) {

    const settingsScreen = make.main("settings-screen", ["screen", "flex-column"]);
      
      const settingsScreenInfo = make.header("settings-screen__info", "marquee");
        settingsScreenInfo.innerHTML = "Settings Menu"; 
      settingsScreen.appendChild(settingsScreenInfo);

      const themeButton = make.button("Theme", "settings-screen__theme-button", "big-button");
      settingsScreen.appendChild(themeButton);

      const soundButton = make.button("Sound", "settings-screen__sound-button", "big-button");
      settingsScreen.appendChild(soundButton);

      const backButton = make.button("Back", "settings-screen__back-button", "big-button");
      settingsScreen.appendChild(backButton);

    await fadeTransition(settingsScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}

async function makeThemeScreen() {
  //----------------------------------------------------//
	//Makes the Theme Menu where the color palettes can   //
  //  be changed                                        //
	//----------------------------------------------------//

  const root = document.documentElement;

  return new Promise (async (resolve, reject) => {
    const themeMenuScreen = make.main("theme-menu-screen", ["screen", "flex-column"]);

      const defaultThemeButton = make.button("Default", "theme-menu-screen__default-theme-button", "big-button");
        set.click(defaultThemeButton, () => {
          playTone(randomNote());
          root.style.setProperty("--text-color", "hsla(0, 0%, 0%, 1)");
          root.style.setProperty("--bg-color", "hsla(0, 0%, 100%, 1)");
          root.style.setProperty("--border-color", "hsla(0, 0%, 0%, 1)");
          root.style.setProperty("--button-bg-color", "hsla(0, 0%, 0%, 0)");
        });
      themeMenuScreen.appendChild(defaultThemeButton);

      const vaporWaveThemeButton = make.button("Vapor Wave", "theme-menu-screen__vapor-wave-theme-button", "big-button");
        set.click(vaporWaveThemeButton, () => {
          playTone(randomNote());
          root.style.setProperty("--text-color", "hsla(190, 100%, 50%, 1)");
          root.style.setProperty("--bg-color", "hsla(0, 0%, 0%, 1)");
          root.style.setProperty("--border-color", "hsla(300, 100%, 50%, 1)");
          root.style.setProperty("--button-bg-color", "hsla(0, 0%, 0%, 0)");
        });
      themeMenuScreen.appendChild(vaporWaveThemeButton);

      const chalkThemeButton = make.button("Chalk Board", "theme-menu-screen__chalk-theme-button", "big-button");
        set.click(chalkThemeButton, () => {
          playTone(randomNote());
          root.style.setProperty("--text-color", "hsla(0, 0%, 100%, 1)");
          root.style.setProperty("--bg-color", "hsla(100, 95%, 35%, 1)");
          root.style.setProperty("--border-color", "hsla(0, 0%, 100%, 1)");
          root.style.setProperty("--button-bg-color", "hsla(100, 95%, 35%, 1)");
        });
      themeMenuScreen.appendChild(chalkThemeButton);

      const backButton = make.button("Back", "theme-menu-screen__back-button", "big-button");
        set.click(backButton, () => {
          playTone(randomNote());
          resolve();
        });
      themeMenuScreen.appendChild(backButton);

    await fadeTransition(themeMenuScreen);
  })
}

async function makeSoundScreen() {
  //----------------------------------------------------//
	//Lists the basic options for in-app sound            //
	//----------------------------------------------------//

  async function waitForButton() {
    return new Promise ((resolve, reject) => {

      let selectKey = get("sound-options-screen__select-key-button");
      set.click(selectKey, async () => {
        playTone(randomNote());
        //await makeKeyScreen();
        resolve(false);
      })

      const selectScale = get("sound-options-screen__select-scale-button");
      set.click(selectScale, async () => {
        playTone(randomNote());
        //await makeScaleScreen();
        resolve(false);
      })

      const backButton = get("sound-options-screen__back-button");
      set.click(backButton, () => {
        playTone(randomNote());
        resolve(true);
      })
    })
  }

  let quit = false;
  while(!quit) {

    const soundScreen = make.main("sound-screen", ["screen", "flex-column"]);

      const soundToggleButton = make.button("Sound On", "sound-options-screen__sound-toggle-button", "big-button");
        if (user.soundOn === false) {
          soundToggleButton.innerHTML = "Sound Off";
        }
        set.click(soundToggleButton, () => {
          if (user.soundOn) {
            user.soundOn = false;
            soundToggleButton.innerHTML = "Sound Off";
          } else {
            user.soundOn = true;
            soundToggleButton.innerHTML = "Sound On";
            playTone(randomNote());
          }
        });
        soundScreen.appendChild(soundToggleButton);

      const selectKeyButton = make.button("Select Key", "sound-options-screen__select-key-button", "big-button");
      soundScreen.appendChild(selectKeyButton);

      const selectScaleButton = make.button("Select Scale", "sound-options-screen__select-scale-button", "big-button");
      soundScreen.appendChild(selectScaleButton);

      const playRandomNoteButton = make.button("Random Note", "sound-options-screen__play-random-note-button", "big-button");
        set.click(playRandomNoteButton, () => {
          playTone(randomNote());
        });
        soundScreen.appendChild(playRandomNoteButton);

      const backButton = make.button("Back", "sound-options-screen__back-button", "big-button");
      soundScreen.appendChild(backButton);

    await fadeTransition(soundScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}