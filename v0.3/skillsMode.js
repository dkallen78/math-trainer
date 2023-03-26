async function makeSkillsStartScreen() {
  /*
  //
  */

  async function waitForButton() {
    
    return new Promise((resolve, reject) => {

      let operationButtons = document.getElementById(skillsSelect).childNodes;

      for (let i = 0; i < operationButtons.length; i++) {
        
      }
    })
  }

  let quit = false;

  while (!quit) {
    let skillsSelectScreen = makeElement("div", "skillsSelectScreen", "screen");

      let skillsSelectScreenInfo = makeElement("div", "skillsSelectScreenInfo");
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

      skillsSelectScreen.appendChild(skillsSelect);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(skillsSelectScreen);
    await fadeIn(document.body);

    await waitForButton();
  }
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