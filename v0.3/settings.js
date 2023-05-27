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

    return new Promise (async (resolve, reject) => {
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

            let selectKeyButton = makeButton("Select Key", null, "selectKeyButton", "bigButton", "inactiveButton");
            soundOptionsScreen.appendChild(selectKeyButton);

            let selectScaleButton = makeButton("Select Scale", null, "selectScaleButton", "bigButton", "inactiveButton");
            soundOptionsScreen.appendChild(selectScaleButton);

            let playScaleButton = makeButton("Play Scale", null, "playScaleButton", "bigButton");
            playScaleButton.onclick = () => {
                playArpeggio(makeChord(user.activeScale, 0), 200);
            }
            soundOptionsScreen.appendChild(playScaleButton);

            let playRandomNoteButton = makeButton("Random Note", null, "playRandomNoteButton", "bigButton");
            playRandomNoteButton.onclick = () => {
                playTone(randomNote());
            }
            soundOptionsScreen.appendChild(playRandomNoteButton);

            let soundOptionsBackButton = makeButton("Back", null, "soundOptionsBackButton", "bigButton");
            soundOptionsBackButton.onclick = () => {
                playTone(randomNote());
                resolve();
            }
            soundOptionsScreen.appendChild(soundOptionsBackButton);

        await fadeOut(document.body);
        clearElement(document.body);
        document.body.appendChild(soundOptionsScreen);
        await fadeIn(document.body);

    })
}