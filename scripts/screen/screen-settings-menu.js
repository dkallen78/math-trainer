async function makeSettingsScreen() {
  //----------------------------------------------------//
	//Makes the base settings screen from which all       //
  //  settings can be accessed                          //
	//----------------------------------------------------//

  async function waitForButton() {
    return new Promise ((resolve, reject) => {
      const themeButton = get("settings-screen__theme-button");
      themeButton.onclick = async () => {
        themeButton.onclick = null;
        playTone(randomNote());
        await makeThemeScreen();
        resolve(false);
      }

      const soundButton = get("settings-screen__sound-button");
      soundButton.onclick = async () => {
        soundButton.onclick = null;
        playTone(randomNote());
        await makeSoundScreen();
        resolve(false);
      }

      const numpadButton = get("settings-screen__numpad-button");
      numpadButton.onclick = async () => {
        numpadButton.onclick = null;
        playTone(randomNote());
        await makeNumpadScreen();
        resolve(false);
      }

      const backButton = get("settings-screen__back-button");
      backButton.onclick = async () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      }
  })
}

  let quit = false;
  while (!quit) {

    const settingsScreen = make.main("settings-screen", ["screen", "flex-column"]);
      
      const themeButton = make.button("Theme", "settings-screen__theme-button", "button-big");
      settingsScreen.appendChild(themeButton);

      const soundButton = make.button("Sound", "settings-screen__sound-button", "button-big");
      settingsScreen.appendChild(soundButton);

      const numpadButton = make.button("Number Pad", "settings-screen__numpad-button", "button-big");
      settingsScreen.appendChild(numpadButton);

      const backButton = make.button("Back", "settings-screen__back-button", "button-big");
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

  return new Promise (async (resolve) => {
    const themeMenuScreen = make.main("theme-menu-screen", ["screen", "flex-column"]);
      //
      //Takes theme data from data-themes.js to make the theme buttons
      for (const theme in themes) {
        const themeButton = make.button(themes[theme].name, `theme-menu-screen__${theme}-theme-button`, "button-medium", () => {
          playTone(randomNote());
          root.style.setProperty("--text-color", themes[theme].textColor);
          root.style.setProperty("--bg-color", themes[theme].bgColor);
          root.style.setProperty("--border-color", themes[theme].borderColor);
          root.style.setProperty("--button-bg-color", themes[theme].buttonBgColor);
          root.style.setProperty("--inactive-color", themes[theme].inactiveColor);
        })
        themeMenuScreen.appendChild(themeButton);
      }

      const backButton = make.button("Back", "theme-menu-screen__back-button", "button-medium");
        backButton.onclick = () => {
          backButton.onclick = null;
          playTone(randomNote());
          resolve();
        };
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
      selectKey.onclick = async () => {
        selectKey.onclick = null;
        playTone(randomNote());
        await makeKeyScreen();
        resolve(false);
      }

      const selectScale = get("sound-options-screen__select-scale-button");
      selectScale.onclick = async () => {
        selectScale.onclick = null;
        playTone(randomNote());
        await makeScaleScreen();
        resolve(false);
      }

      const backButton = get("sound-options-screen__back-button");
      backButton.onclick = () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;
  while(!quit) {

    const soundScreen = make.main("sound-screen", ["screen", "flex-column"]);

      const soundToggleButton = make.button("Sound On", "sound-options-screen__sound-toggle-button", "button-big");
        if (user.soundOn === false) {
          soundToggleButton.innerHTML = "Sound Off";
        }
        soundToggleButton.onclick = () => {
          if (user.soundOn) {
            user.soundOn = false;
            soundToggleButton.innerHTML = "Sound Off";
          } else {
            user.soundOn = true;
            soundToggleButton.innerHTML = "Sound On";
            playTone(randomNote());
          }
        };
        soundScreen.appendChild(soundToggleButton);

      const selectKeyButton = make.button("Select Key", "sound-options-screen__select-key-button", "button-big");
      soundScreen.appendChild(selectKeyButton);

      const selectScaleButton = make.button("Select Scale", "sound-options-screen__select-scale-button", "button-big");
      soundScreen.appendChild(selectScaleButton);

      const playRandomNoteButton = make.button("Random Note", "sound-options-screen__play-random-note-button", "button-big");
        playRandomNoteButton.onclick = () => {
          playTone(randomNote());
        };
        soundScreen.appendChild(playRandomNoteButton);

      const backButton = make.button("Back", "sound-options-screen__back-button", "button-big");
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
      const keyBackButton = make.button("Back", "key-selection-screen__back-button", "button-big", () => {
        keyBackButton.onclick = null;
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
        backButton.onclick = null;
        playTone(randomNote());
        resolve();
      });
      scaleSelectionScreen.appendChild(backButton);

    await fadeTransition(scaleSelectionScreen);
  })
}

async function makeNumpadScreen() {

  async function waitForButton() {
    return new Promise ((resolve, reject) => {


      const backButton = get("number-pad-screen__back-button");
      backButton.onclick = async () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;
  while (!quit) {
    const numpadScreen = make.main("number-pad-screen", ["screen", "flex-column"]);

      

      const backButton = make.button("Back", "number-pad-screen__back-button", "button-big");
      numpadScreen.appendChild(backButton);

    await fadeTransition(numpadScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}