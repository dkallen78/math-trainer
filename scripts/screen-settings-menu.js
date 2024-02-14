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
        await makeKeyScreen();
        resolve(false);
      })

      const selectScale = get("sound-options-screen__select-scale-button");
      set.click(selectScale, async () => {
        playTone(randomNote());
        await makeScaleScreen();
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

async function makeKeyScreen() {
  //----------------------------------------------------//
	//Makes the screen to let the user change the key     //
	//----------------------------------------------------//

  let allNotes = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"]

  function chooseKey(key, elem) {

    user.keyNote = key;
    const activeKeyDisplay = get("key-selection-screen__active-key-display");
    activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;
    
    playArpeggio(makeChord(user.activeScale, user.activeKey), 200);

  }

  function chooseOctave(octave, elem) {

    user.keyOctave = octave;
    const activeKeyDisplay = get("key-selection-screen__active-key-display");
    activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;

    playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
  }

  return new Promise (async (resolve, reject) => {
    const keySelectionScreen = make.main(-"key-selection-screen", ["screen", "flex-column"]);

      const activeKeyDisplay = make.header("key-selection-screen__active-key-display", "marquee");
        activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;
      keySelectionScreen.appendChild(activeKeyDisplay);
      //
      //Displays the buttons for selecting the different keys
      const selectKey = make.section("key-selection-screen__select-key");
        //
        //Header for the key selection section
        const keyHed = make.header("key-selection-screen__select-key__key-hed", "marquee-small");
          keyHed.innerHTML = "Select Key";
        selectKey.appendChild(keyHed);
        //
        //The 5 black keys
        const blackKeys = make.div("key-selection-screen__select-key__black-keys");

          const blackNotes = ["C♯/\nD♭", "D♯/\nE♭", "F♯/\nG♭", "G♯/\nA♭", "A♯/\nB♭"];
          const blackIntervals = [1, 3, 6, 8, 10];

          for (let i = 0; i < blackNotes.length; i++) {
            const noteButton = make.button(blackNotes[i], `key-${blackIntervals[i]}`, "key-buttons", () => {
              chooseKey(blackIntervals[i], noteButton);
            });
            blackKeys.appendChild(noteButton);
          }
        selectKey.appendChild(blackKeys);
        //
        //the 7 white keys
        const whiteKeys = make.div("key-selection-screen__select-key__white-keys");
          const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
          const whiteIntervals = [0, 2, 4, 5, 7, 9, 11];
          for (let i = 0; i < whiteNotes.length; i++) {
            const noteButton = make.button(whiteNotes[i], `key-${whiteIntervals[i]}`, "key-buttons", () => {
              chooseKey(whiteIntervals[i], noteButton);
            });
            whiteKeys.appendChild(noteButton);
          }
        selectKey.appendChild(whiteKeys);

      keySelectionScreen.appendChild(selectKey);
      //
      //Displays the buttons for selecting the different octaves
      const selectOctave = make.section("key-selection-screen__select-octave");
        //
        //Header for the octave selection section
        const octaveHed = make.div("key-selection-screen__select-octave__octave-hed", "marquee-small");
          octaveHed.innerHTML = "Select Octave";
        selectOctave.appendChild(octaveHed);
        //
        //The four octave buttons
        const octaves = make.div("key-selction-screen__select-octave__octaves");
          for (let i = 3; i < 7; i++) {
            const octaveButton = make.button(i, `octave-${i}`, "key-buttons", () => {
              chooseOctave(i, octaveButton);
            });
            octaves.appendChild(octaveButton);
          }
        selectOctave.appendChild(octaves);

      keySelectionScreen.appendChild(selectOctave);
      //
      //The Back button
      const keyBackButton = make.button("Back", "key-selection-screen__back-button", "big-button", () => {
        playTone(randomNote());
        resolve();
      });
      keySelectionScreen.appendChild(keyBackButton);

    await fadeTransition(keySelectionScreen);
    
  })
}

async function makeScaleScreen() {
  //----------------------------------------------------//
	//Makes the screen to let the user change the scale   //
	//----------------------------------------------------//

  function makeScaleButton(scale, name) {

    let button = make.button(name, `${name}-Button`, "button-medium", () => {
      user.activeScale = scale;
      playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
    });
    return button;
  }

  return new Promise (async (resolve, reject) => {

    let scaleSelectionScreen = make.main("scale-selection-screen", ["screen", "flex-column"]);

      let majorButton = makeScaleButton(scales.major, "Major");
      scaleSelectionScreen.appendChild(majorButton);

      let minorButton = makeScaleButton(scales.minor, "Minor");
      scaleSelectionScreen.appendChild(minorButton);

      let mongolianButton = makeScaleButton(scales.mongolian, "Mongolian");
      scaleSelectionScreen.appendChild(mongolianButton);

      let hiroButton = makeScaleButton(scales.hirojoshi, "Hirojoshi");
      scaleSelectionScreen.appendChild(hiroButton);

      let yoButton = makeScaleButton(scales.yo, "Yo");
      scaleSelectionScreen.appendChild(yoButton);
      
      let inButton = makeScaleButton(scales.in, "In");
      scaleSelectionScreen.appendChild(inButton);

      let hungarianButton = makeScaleButton(scales.hungarian, "Hungarian");
      scaleSelectionScreen.appendChild(hungarianButton);

      let backButton = make.button("Back", "scale-selection-screen__back-button", "button-medium", () => {
        playTone(randomNote());
        resolve();
      });
      scaleSelectionScreen.appendChild(backButton);

    await fadeTransition(scaleSelectionScreen);
  })
}