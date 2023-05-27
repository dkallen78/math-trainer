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

      let playScaleButton = makeButton("Play Scale", null, "playScaleButton", "bigButton");
      playScaleButton.onclick = () => {
        playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
      }
      soundOptionsScreen.appendChild(playScaleButton);

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
  return new Promise (async (resolve, reject) => {
    let keySelectionScreen = makeElement("div", "scaleSelectionScreen", "screen");

      let activeKeyDisplay = makeElement("div", "activeKeyDisplay", "marquee");
        activeKeyDisplay.innerHTML = `C4 ${notes[user.activeKey]}`;
      keySelectionScreen.appendChild(activeKeyDisplay);

      let keyHead = makeElement("div", "keyHead", "marqueeSmall");
        keyHead.innerHTML = "Select Key";
      keySelectionScreen.appendChild(keyHead);

      let blackKeyDiv = makeElement("div", "blackKeyDiv");
        let blackNotes = ["C♯/\nD♭", "D♯/\nE♭", "F♯/\nG♭", "G♯/\nA♭", "A♯/\nB♭"];
        let blackIntervals = [2, 4, 7, 9, 11];
        for (let i = 0; i < blackNotes.length; i++) {
          let noteButton = makeButton(blackNotes[i], null, `key${blackIntervals[i]}`, "keyButtons");
          blackKeyDiv.appendChild(noteButton);
        }
      keySelectionScreen.appendChild(blackKeyDiv);

      let whiteKeyDiv = makeElement("div", "whiteKeyDiv");
        let whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
        let whiteIntervals = [1, 3, 5, 6, 8, 10, 12];
        for (let i = 0; i < whiteNotes.length; i++) {
          let noteButton = makeButton(whiteNotes[i], null, `key${whiteIntervals[i]}`, "keyButtons");
          whiteKeyDiv.appendChild(noteButton);
        }
      keySelectionScreen.appendChild(whiteKeyDiv);

      let octaveHead = makeElement("div", "octaveHead", "marqueeSmall");
        octaveHead.innerHTML = "Select Octave";
      keySelectionScreen.appendChild(octaveHead);

      let octaveDiv = makeElement("div", "octaveDiv");
        for (let i = 2; i < 8; i++) {
          let octaveButton = makeButton(i, null, `octave${i}`, "keyButtons");
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
  return new Promise (async (resolve, reject) => {
    let scaleSelectionScreen = makeElement("div", "scaleSelectionScreen", "screen");

      let majorButton = makeButton("Major", null, "majorButton", "bigButton");
      majorButton.onclick = () => {
        user.activeScale = scales.major;
        playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
      }
      scaleSelectionScreen.appendChild(majorButton);

      let bluesMajorButton = makeButton("Blues Major", null, "bluesMajorButton", "bigButton");
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

      let minorButton = makeButton("Minor", null, "minorButton", "bigButton");
      minorButton.onclick = () => {
        user.activeScale = scales.minor;
        playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
      }
      scaleSelectionScreen.appendChild(minorButton);

      let bluesMinorButton = makeButton("Blues Minor", null, "bluesMinorButton", "bigButton");
      bluesMinorButton.onclick = () => {
        user.activeScale = scales.bluesMinor;
        playArpeggio(makeChord(user.activeScale, user.activeKey), 200);
      }
      scaleSelectionScreen.appendChild(bluesMinorButton);

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