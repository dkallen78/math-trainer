async function makeSkillsStartScreen() {
  /*
  //
  */

  async function waitForButton() {
    
    return new Promise((resolve, reject) => {

      let operationButtons = document.getElementById("skillsSelect").childNodes;

      for (let i = 0; i < operationButtons.length; i++) {
        let op = operationButtons[i].innerHTML;
        if (user.skillUnlock[op]) {
          operationButtons[i].classList.remove("inactiveButton");

          operationButtons[i].onclick = async () => {
            playTone(randomNote());
            await launchSkill[op]();
            resolve(false);
          }
        }
      }

      let backButton = document.getElementById("skillsScreenBackButton");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while (!quit) {
    let skillsSelectScreen = makeElement("div", "skillsSelectScreen", "screen");

      let skillsSelectScreenInfo = makeElement("div", "skillsSelectScreenInfo", "marquee");
        skillsSelectScreenInfo.innerHTML = "Select an Operation";
      skillsSelectScreen.appendChild(skillsSelectScreenInfo);

      let skillsSelect = makeElement("div", "skillsSelect");

        let additionButton = makeButton("+", null, "additionButton", "inactiveButton");
        skillsSelect.appendChild(additionButton);

        let subtractionButton = makeButton("-", null, "subtractionButton", "inactiveButton");
        skillsSelect.appendChild(subtractionButton);

        let multiplicationButton = makeButton("×", null, "multiplicationButton", "inactiveButton");
        skillsSelect.appendChild(multiplicationButton);

        let divisionButton = makeButton("÷", null, "divisionButton", "inactiveButton");
        skillsSelect.appendChild(divisionButton);

        let backButton = makeButton("Back", null, "skillsScreenBackButton", "bigButton");
        skillsSelect.appendChild(backButton);

      skillsSelectScreen.appendChild(skillsSelect);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(skillsSelectScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});

  }
}

async function makeAdditionSkillsScreen() {

  console.log("derp");

  async function waitForButton() {

    return new Promise((resolve, reject) => {

    })
  }

  let quit = false;

  while (!quit) {
    let additionSkillsScreen = makeElement("div", "additionSkillsScreen", "screen");

      let additionSkillsScreenInfo = makeElement("div", "additionSkillsScreenInfo", "marquee");
        additionSkillsScreenInfo.innerHTML = "Skills Drills";
      additionSkillsScreen.appendChild(additionSkillsScreenInfo);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(additionSkillsScreen);
    await fadeIn(document.body);

    await waitForButton();
  }
}

let launchSkill = {
  "+": async () => makeAdditionSkillsScreen(),
  "-": () => makeSubtractionSkillsScreen(),
  "×": () => makeMultiplicationSkillsScreen(),
  "÷": () => makeDivisionSkillsScreen()
}

let skills = {
  addition: {

  },
  mixedOps: {

  },
  upTo: {

  },
  doubles: {

  }
}

let skillsData = {
  addition: {

  },
  mixedOps: {

  },
  upTo: {

  },
  doubles: {
      
  }
}