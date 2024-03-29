async function makeSettingsScreen() {
  //----------------------------------------------------//
	//Makes the base settings screen from which all       //
  //  settings can be accessed                          //
	//----------------------------------------------------//

  async function waitForButton() {
      return new Promise ((resolve, reject) => {
          let themeButton = get("settings-screen__theme-button");
          set.click(themeButton, async () => {
            playTone(randomNote());
              await makeThemeScreen();
              resolve(false);
          })

          let soundButton = get("settings-screen__sound-button");
          set.click(soundButton, async () => {
            playTone(randomNote());
            await makeSoundScreen();
            resolve(false);
          })
  
          let backButton = get("settings-screen__back-button");
          set.click(backButton, async () => {
            playTone(randomNote());
            resolve(true);
          })
      })
  }

  let quit = false;

  while (!quit) {

    let settingsScreen = make.main("settings-screen", "screen");

      let settingsScreenInfo = make.header("settings-screen__info", "marquee");
        settingsScreenInfo.innerHTML = "Settings Menu"; 
      settingsScreen.appendChild(settingsScreenInfo);

      let themeButton = make.button("Theme", "settings-screen__theme-button", "big-button");
      settingsScreen.appendChild(themeButton);

      let soundButton = make.button("Sound", "settings-screen__sound-button", "big-button");
      settingsScreen.appendChild(soundButton);

      let backButton = make.button("Back", "settings-screen__back-button", "big-button");
      settingsScreen.appendChild(backButton);

      let tourButton = make.button("Normal", "settings-screen__tour-button", "big-button");
        if (user.tour === true) {
          tourButton.innerHTML = "Tour";
        }
        set.click(tourButton, () => {
          if (!user.tour) {
            playTone(randomNote());
            user.tour = true;
            tourButton.innerHTML = "Tour";

            user.addition.fundamentals = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.addition.placeValue = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.addition.reorder = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.addition.partition = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.addition.compensation = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.addition.sequence = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.addition.fractions = [1, 1, 1, 1, 1, 1, 1, 1, 1];

            user.subtraction.fundamentals = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.subtraction.partition = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.subtraction.decomposition = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.subtraction.sequence = [1, 1, 1, 1, 1, 1, 1, 1, 1];

            user.multiplication.fundamentals = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.multiplication.distribution = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            user.multiplication.association = [1, 1, 1, 1, 1, 1, 1, 1, 1];

            user.division.fundamentals = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            
          } else {
            playTone(randomNote());
            user.tour = false;
            tourButton.innerHTML = "Normal";

            user.addition.fundamentals = [];
            user.addition.placeValue = [];
            user.addition.reorder = [];
            user.addition.partition = [];
            user.addition.compensation = [];
            user.addition.sequence = [];
            user.addition.fractions = [];

            user.subtraction.fundamentals = [];
            user.subtraction.partition = [];
            user.subtraction.decomposition = [];
            user.subtraction.sequence = [];

            user.multiplication.fundamentals = [];
            user.multiplication.distribution = [];
            user.multiplication.association = [];

            user.division.fundamentals = [];
          }
        });
      settingsScreen.appendChild(tourButton);

      let fastButton = make.button("Normal", "settings-screen__fast-button", "big-button");
        if (user.fast === true) {
          fastButton.innerHTML = "Fast";
        }
        set.click(fastButton, () => {
          if (!user.fast) {
            playTone(randomNote());
            user.fast = true;
            fastButton.innerHTML = "Fast";
            user.qDepth = 2;
            user.maxAvg = 15000;
          } else {
            playTone(randomNote());
            user.fast = false;
            fastButton.innerHTML = "Normal";
            user.qDepth = 10;
            user.maxAvg = 5000;
          }
        });
      settingsScreen.appendChild(fastButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(settingsScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}

async function makeThemeScreen() {
  //----------------------------------------------------//
	//Makes the Theme Menu where the color palettes can   //
  //  be changed                                        //
	//----------------------------------------------------//

  let root = document.documentElement;

  return new Promise (async (resolve, reject) => {
    let themeMenuScreen = make.main("theme-menu-screen", "screen");

      let defaultThemeButton = make.button("Default", "theme-menu-screen__default-theme-button", "theme-button");
        set.click(defaultThemeButton, () => {
          playTone(randomNote());
          root.style.setProperty("--text-color", "hsla(0, 0%, 0%, 1)");
          root.style.setProperty("--bg-color", "hsla(0, 0%, 100%, 1)");
          root.style.setProperty("--border-color", "hsla(0, 0%, 0%, 1)");
          root.style.setProperty("--button-bg-color", "hsla(0, 0%, 0%, 0)");
        });
      themeMenuScreen.appendChild(defaultThemeButton);

      let vaporWaveThemeButton = make.button("Vapor Wave", "theme-menu-screen__vapor-wave-theme-button", "theme-button");
        set.click(vaporWaveThemeButton, () => {
          playTone(randomNote());
          root.style.setProperty("--text-color", "hsla(190, 100%, 50%, 1)");
          root.style.setProperty("--bg-color", "hsla(0, 0%, 0%, 1)");
          root.style.setProperty("--border-color", "hsla(300, 100%, 50%, 1)");
          root.style.setProperty("--button-bg-color", "hsla(0, 0%, 0%, 0)");
        });
      themeMenuScreen.appendChild(vaporWaveThemeButton);

      let chalkThemeButton = make.button("Chalk Board", "theme-menu-screen__chalk-theme-button", "theme-button");
        set.click(chalkThemeButton, () => {
          playTone(randomNote());
          root.style.setProperty("--text-color", "hsla(0, 0%, 100%, 1)");
          root.style.setProperty("--bg-color", "hsla(100, 95%, 35%, 1)");
          root.style.setProperty("--border-color", "hsla(0, 0%, 100%, 1)");
          root.style.setProperty("--button-bg-color", "hsla(100, 95%, 35%, 1)");
        });
      themeMenuScreen.appendChild(chalkThemeButton);

      let backButton = make.button("Back", "theme-menu-screen__back-button", "big-button");
        set.click(backButton, () => {
          playTone(randomNote());
          resolve();
        });
      themeMenuScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(themeMenuScreen);
    await fadeIn(document.body);
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

      let selectScale = get("sound-options-screen__select-scale-button");
      set.click(selectScale, async () => {
        playTone(randomNote());
        await makeScaleScreen();
        resolve(false);
      })

      let backButton = get("sound-options-screen__back-button");
      set.click(backButton, () => {
        playTone(randomNote());
        resolve(true);
      })
    })
  }

  let quit = false;

  while(!quit) {
    let soundOptionsScreen = make.main("sound-options-screen", "screen");

      let soundToggleButton = make.button("Sound On", "sound-options-screen__sound-toggle-button", "big-button");
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
      soundOptionsScreen.appendChild(soundToggleButton);

      let selectKeyButton = make.button("Select Key", "sound-options-screen__select-key-button", "big-button");
      soundOptionsScreen.appendChild(selectKeyButton);

      let selectScaleButton = make.button("Select Scale", "sound-options-screen__select-scale-button", "big-button");
      soundOptionsScreen.appendChild(selectScaleButton);

      let playRandomNoteButton = make.button("Random Note", "sound-options-screen__play-random-note-button", "big-button");
        set.click(playRandomNoteButton, () => {
          playTone(randomNote());
        });
      soundOptionsScreen.appendChild(playRandomNoteButton);

      let backButton = make.button("Back", "sound-options-screen__back-button", "big-button");
      soundOptionsScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(soundOptionsScreen);
    await fadeIn(document.body);

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
    let activeKeyDisplay = get("key-selection-screen__active-key-display");
    activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;
    
    playArpeggio(makeChord(user.activeScale, user.activeKey), 200);

  }

  function chooseOctave(octave, elem) {

    user.keyOctave = octave;
    let activeKeyDisplay = get("key-selection-screen__active-key-display");
    activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;

    playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
  }

  return new Promise (async (resolve, reject) => {
    let keySelectionScreen = make.main(-"key-selection-screen", "screen");

      let activeKeyDisplay = make.header("key-selection-screen__active-key-display", "marquee");
        activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;
      keySelectionScreen.appendChild(activeKeyDisplay);
      //
      //Displays the buttons for selecting the different keys
      let selectKey = make.section("key-selection-screen__select-key");
        //
        //Header for the key selection section
        let keyHed = make.header("key-selection-screen__select-key__key-hed", "marquee-small");
          keyHed.innerHTML = "Select Key";
        selectKey.appendChild(keyHed);
        //
        //The 5 black keys
        let blackKeys = make.div("key-selection-screen__select-key__black-keys");

          let blackNotes = ["C♯/\nD♭", "D♯/\nE♭", "F♯/\nG♭", "G♯/\nA♭", "A♯/\nB♭"];
          let blackIntervals = [1, 3, 6, 8, 10];

          for (let i = 0; i < blackNotes.length; i++) {
            let noteButton = make.button(blackNotes[i], `key-${blackIntervals[i]}`, "key-buttons", () => {
              chooseKey(blackIntervals[i], noteButton);
            });
            blackKeys.appendChild(noteButton);
          }
        selectKey.appendChild(blackKeys);
        //
        //the 7 white keys
        let whiteKeys = make.div("key-selection-screen__select-key__white-keys");
          let whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
          let whiteIntervals = [0, 2, 4, 5, 7, 9, 11];
          for (let i = 0; i < whiteNotes.length; i++) {
            let noteButton = make.button(whiteNotes[i], `key-${whiteIntervals[i]}`, "key-buttons", () => {
              chooseKey(whiteIntervals[i], noteButton);
            });
            whiteKeys.appendChild(noteButton);
          }
        selectKey.appendChild(whiteKeys);

      keySelectionScreen.appendChild(selectKey);
      //
      //Displays the buttons for selecting the different octaves
      let selectOctave = make.section("key-selection-screen__select-octave");
        //
        //Header for the octave selection section
        let octaveHed = make.div("key-selection-screen__select-octave__octave-hed", "marquee-small");
          octaveHed.innerHTML = "Select Octave";
        selectOctave.appendChild(octaveHed);
        //
        //The four octave buttons
        let octaves = make.div("key-selction-screen__select-octave__octaves");
          for (let i = 3; i < 7; i++) {
            let octaveButton = make.button(i, `octave-${i}`, "key-buttons", () => {
              chooseOctave(i, octaveButton);
            });
            octaves.appendChild(octaveButton);
          }
        selectOctave.appendChild(octaves);

      keySelectionScreen.appendChild(selectOctave);
      //
      //The Back button
      let keyBackButton = make.button("Back", "key-selection-screen__back-button", "big-button", () => {
        playTone(randomNote());
        resolve();
      });
      keySelectionScreen.appendChild(keyBackButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(keySelectionScreen);
    await fadeIn(document.body);
  })
}

async function makeScaleScreen() {
  //----------------------------------------------------//
	//Makes the screen to let the user change the scale   //
	//----------------------------------------------------//

  function makeScaleButton(scale, name) {

    let button = make.button(name, `${name}-Button`, "medium-button", () => {
      user.activeScale = scale;
      playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
    });
    return button;
  }

  return new Promise (async (resolve, reject) => {

    let scaleSelectionScreen = makeElement("main", "scale-selection-screen", "screen");

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

      /*let bluesMajorButton = makeButton("Blues Major", null, "bluesMajorButton", "bigButton");
      bluesMajorButton.onclick = () => {
        user.activeScale = scales.bluesMajor;
        playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
      }
      scaleSelectionScreen.appendChild(bluesMajorButton);

      let suspendedButton = makeButton("Suspended", null, "suspendedButton", "bigButton");
      suspendedButton.onclick = () => {
        user.activeScale = scales.suspended;
        playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
      }
      scaleSelectionScreen.appendChild(suspendedButton);


      let bluesMinorButton = makeButton("Blues Minor", null, "bluesMinorButton", "bigButton");
      bluesMinorButton.onclick = () => {
        user.activeScale = scales.bluesMinor;
        playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
      }
      scaleSelectionScreen.appendChild(bluesMinorButton);*/

      let backButton = make.button("Back", "scale-selection-screen__back-button", "medium-button", () => {
        playTone(randomNote());
        resolve();
      });
      scaleSelectionScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(scaleSelectionScreen);
    await fadeIn(document.body);

  })
}