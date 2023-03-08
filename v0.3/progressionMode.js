async function makeProgressionScreen() {

    let progressionSelectScreen = makeElement("div", "progressionSelectScreen", "screen");

    let startGuide = makeElement("div", "startGuide");
        startGuide.innerHTML = "Get Ready";
    progressionSelectScreen.appendChild(startGuide);

    let activeSkills = makeElement("div", "activeSkills");

        let skill1 = makeButton("+/-", null, "skill1Button", "skillDisplay");
        activeSkills.appendChild(skill1);

        let skill2 = makeButton("Up To", null, "skill2Butoon", "skillDisplay");
        activeSkills.appendChild(skill2);

        let skill3 = makeButton("Near Doubles", null, "skill3Button", "skillDisplay");
        activeSkills.appendChild(skill3);

    progressionSelectScreen.appendChild(activeSkills);

    let button = makeButton("Start", null, "progressionStartButton");
    progressionSelectScreen.appendChild(button);

    let backButton = makeButton("Back", null, "backButton");
    progressionSelectScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);  
    document.body.appendChild(progressionSelectScreen);
    await fadeIn(document.body);


    let quit = false;

    /*while (!quit) {
    }*/
}

let prog = {
    mixedOps: {
        string: "+/-",
        set: [
            () => within(1, 5),
            () => within(1, 10),
            () => toOrFrom(1, 10)
        ]
    },
    upTo: {
        string: "Up To",
        set: [
            () => upTo(1, 10),
            () => upTo(11, 20),
            () => upTo(1, 20)
        ]
    },
    doubles: {
        string: "Doubles",
        set: [
            () => doubles(1, 10, 1, 0, 0),
            () => doubles(1, 20, 1, 0, 0),
            () => doubles(1, 5, 10, 0, 0)
        ]
    }
}