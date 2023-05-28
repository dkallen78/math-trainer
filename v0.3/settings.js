async function makeSettingsBaseScreen() {

  async function waitForButton() {
      return new Promise ((resolve, reject) => {
          let themeButton = document.getElementById("themeButton");
          themeButton.onclick = async () => {
              playTone(randomNote());
              await makeThemeScreen();
              resolve(false);
          }

          let soundButton = document.getElementById("soundButton");
          soundButton.onclick = async () => {
              playTone(randomNote());
              await makeSoundScreen();
              resolve(false);
          }
  
          let backButton = document.getElementById("settingsBackButton");
          backButton.onclick = async () => {
              playTone(randomNote());
              resolve(true);
          }    
      })
  }

  let quit = false;

  while (!quit) {
    let settingsBaseScreen = makeElement("div", "settingsBaseScreen", "screen");

      let themeButton = makeButton("Theme", null, "themeButton", "bigButton");
      settingsBaseScreen.appendChild(themeButton);

      let soundButton = makeButton("Sound", null, "soundButton", "bigButton");
      settingsBaseScreen.appendChild(soundButton);

      let backButton = makeButton("Back", null, "settingsBackButton", "bigButton");
      settingsBaseScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(settingsBaseScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}

async function makeThemeScreen() {

  let root = document.documentElement;

  return new Promise (async (resolve, reject) => {
    let themeSelectionScreen = makeElement("div", "themeSelectionScreen", "screen");

      let defaultThemeButton = makeButton("Default", null, "defaultThemeButton", "themeButton");
      themeSelectionScreen.appendChild(defaultThemeButton);
      defaultThemeButton.onclick = () => {
        playTone(randomNote());
        root.style.setProperty("--text-color", "hsla(0, 0%, 0%, 1)");
        root.style.setProperty("--bg-color", "hsla(0, 0%, 100%, 1)");
        root.style.setProperty("--border-color", "hsla(0, 0%, 0%, 1)");
        root.style.setProperty("--button-bg-color", "hsla(0, 0%, 0%, 0)");
      }

      let vaporWaveThemeButton = makeButton("Vapor Wave", null, "vaporWaveThemeButton", "themeButton");
      vaporWaveThemeButton.onclick = () => {
        playTone(randomNote());
        root.style.setProperty("--text-color", "hsla(190, 100%, 50%, 1)");
        root.style.setProperty("--bg-color", "hsla(0, 0%, 0%, 1)");
        root.style.setProperty("--border-color", "hsla(300, 100%, 50%, 1)");
        root.style.setProperty("--button-bg-color", "hsla(0, 0%, 0%, 0)");
      }
      themeSelectionScreen.appendChild(vaporWaveThemeButton);

      let chalkThemeButton = makeButton("Chalk Board", null, "chalkThemeButton", "themeButton");
      chalkThemeButton.onclick = () => {
        playTone(randomNote());
        root.style.setProperty("--text-color", "hsla(0, 0%, 100%, 1)");
        root.style.setProperty("--bg-color", "hsla(100, 100%, 60%, 1)");
        root.style.setProperty("--border-color", "hsla(0, 0%, 100%, 1)");
        root.style.setProperty("--button-bg-color", "hsla(100, 100%, 60%, 1)");
      }
      themeSelectionScreen.appendChild(chalkThemeButton);

      let themeBackButton = makeButton("Back", null, "themeBackButton", "bigButton");
      themeBackButton.onclick = () => {
        playTone(randomNote());
        resolve();
      }
      themeSelectionScreen.appendChild(themeBackButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(themeSelectionScreen);
    await fadeIn(document.body);
  })
}

async function makeSoundScreen() {

  async function waitForButton() {
    return new Promise ((resolve, reject) => {

      let selectKey = document.getElementById("selectKeyButton");
      selectKey.onclick = async () => {
        playTone(randomNote());
        await makeKeyScreen();
        resolve(false);
      }

      let selectScale = document.getElementById("selectScaleButton");
      selectScale.onclick = async () => {
        playTone(randomNote());
        await makeScaleScreen();
        resolve(false);
      }

      let backButton = document.getElementById("soundOptionsBackButton");
      backButton.onclick = () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while(!quit) {
    let soundOptionsScreen = makeElement("div", "soundOptionsScreen", "screen");

      let soundSelectionButton = makeButton("Sound On", null, "soundSelectionButton", "bigButton");
        if (user.soundOn === false) {
          soundSelectionButton.innerHTML = "Sound Off";
        }
        soundSelectionButton.onclick = () => {
          if (user.soundOn) {
            user.soundOn = false;
            soundSelectionButton.innerHTML = "Sound Off";
          } else {
            user.soundOn = true;
            soundSelectionButton.innerHTML = "Sound On";
            playTone(randomNote());
          }
        }
      soundOptionsScreen.appendChild(soundSelectionButton);

      let selectKeyButton = makeButton("Select Key", null, "selectKeyButton", "bigButton");
      soundOptionsScreen.appendChild(selectKeyButton);

      let selectScaleButton = makeButton("Select Scale", null, "selectScaleButton", "bigButton");
      soundOptionsScreen.appendChild(selectScaleButton);

      let playRandomNoteButton = makeButton("Random Note", null, "playRandomNoteButton", "bigButton");
        playRandomNoteButton.onclick = () => {
          playTone(randomNote());
        }
      soundOptionsScreen.appendChild(playRandomNoteButton);

      let soundOptionsBackButton = makeButton("Back", null, "soundOptionsBackButton", "bigButton");
      soundOptionsScreen.appendChild(soundOptionsBackButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(soundOptionsScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});

  }
}

async function makeKeyScreen() {

  let allNotes = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"]

  function selectKey(key, elem) {

    user.keyNote = key;

    activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;
    
    playArpeggio(makeChord(user.activeScale, user.activeKey), 200);

  }

  function selectOctave(octave, elem) {

    user.keyOctave = octave;

    activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;

    playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
  }

  return new Promise (async (resolve, reject) => {
    let keySelectionScreen = makeElement("div", "scaleSelectionScreen", "screen");

      let activeKeyDisplay = makeElement("div", "activeKeyDisplay", "marquee");
        activeKeyDisplay.innerHTML = `${allNotes[user.keyNote]}${user.keyOctave} ${notes[user.activeKey]}`;
      keySelectionScreen.appendChild(activeKeyDisplay);

      let selectKeyHead = makeElement("div", "selectKeyHead", "marqueeSmall");
        selectKeyHead.innerHTML = "Select Key";
      keySelectionScreen.appendChild(selectKeyHead);

      let blackKeyDiv = makeElement("div", "blackKeyDiv");
        let blackNotes = ["C♯/\nD♭", "D♯/\nE♭", "F♯/\nG♭", "G♯/\nA♭", "A♯/\nB♭"];
        let blackIntervals = [1, 3, 6, 8, 10];
        for (let i = 0; i < blackNotes.length; i++) {
          let noteButton = makeButton(blackNotes[i], null, `key${blackIntervals[i]}`, "keyButtons");
            noteButton.onclick = () => {
              selectKey(blackIntervals[i], noteButton);
            }
          blackKeyDiv.appendChild(noteButton);
        }
      keySelectionScreen.appendChild(blackKeyDiv);

      let whiteKeyDiv = makeElement("div", "whiteKeyDiv");
        let whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
        let whiteIntervals = [0, 2, 4, 5, 7, 9, 11];
        for (let i = 0; i < whiteNotes.length; i++) {
          let noteButton = makeButton(whiteNotes[i], null, `key${whiteIntervals[i]}`, "keyButtons");
          noteButton.onclick = () => {
            selectKey(whiteIntervals[i], noteButton);
          }
          whiteKeyDiv.appendChild(noteButton);
        }
      keySelectionScreen.appendChild(whiteKeyDiv);

      let octaveHead = makeElement("div", "octaveHead", "marqueeSmall");
        octaveHead.innerHTML = "Select Octave";
      keySelectionScreen.appendChild(octaveHead);

      let octaveDiv = makeElement("div", "octaveDiv");
        for (let i = 3; i < 7; i++) {
          let octaveButton = makeButton(i, null, `octave${i}`, "keyButtons");
            octaveButton.onclick = () => {
              selectOctave(i, octaveButton);
            }
          octaveDiv.appendChild(octaveButton);
        }
      keySelectionScreen.appendChild(octaveDiv);

      let keyBackButton = makeButton("Back", null, "keyBackButton", "bigButton");
      keyBackButton.onclick = () => {
        playTone(randomNote());
        resolve();
      }
      keySelectionScreen.appendChild(keyBackButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(keySelectionScreen);
    await fadeIn(document.body);
  })
}

async function makeScaleScreen() {

  function makeScaleButton(scale, name) {
    console.log(scale);

    let button = makeButton(name, null, `${name}Button`, "mediumButton");
    button.onclick = () => {
      user.activeScale = scale;

      playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
    }
    return button;
  }

  return new Promise (async (resolve, reject) => {
    let scaleSelectionScreen = makeElement("div", "scaleSelectionScreen", "screen");

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

      let scaleBackButton = makeButton("Back", null, "scaleBackButton", "bigButton");
      scaleBackButton.onclick = () => {
        playTone(randomNote());
        resolve();
      }
      scaleSelectionScreen.appendChild(scaleBackButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(scaleSelectionScreen);
    await fadeIn(document.body);

  })

}