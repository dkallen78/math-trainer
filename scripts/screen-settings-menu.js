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
          //await makeThemeScreen();
          resolve(false);
      })

      const soundButton = get("settings-screen__sound-button");
      set.click(soundButton, async () => {
        playTone(randomNote());
        //await makeSoundScreen();
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
      
      let settingsScreenInfo = make.header("settings-screen__info", "marquee");
        settingsScreenInfo.innerHTML = "Settings Menu"; 
      settingsScreen.appendChild(settingsScreenInfo);

      let themeButton = make.button("Theme", "settings-screen__theme-button", "big-button");
      settingsScreen.appendChild(themeButton);

      let soundButton = make.button("Sound", "settings-screen__sound-button", "big-button");
      settingsScreen.appendChild(soundButton);

      let backButton = make.button("Back", "settings-screen__back-button", "big-button");
      settingsScreen.appendChild(backButton);

    await fadeTransition(settingsScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}