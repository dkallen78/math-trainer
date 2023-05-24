async function makeSettingsBaseScreen() {

    async function waitForButton() {
        return new Promise ((resolve, reject) => {
            let themeButton = document.getElementById("themeButton");
            themeButton.onclick = async () => {
                playTone(randomNote());
                await makeThemeScreen();
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