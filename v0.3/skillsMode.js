async function makeSkillsStartScreen() {
  /*
  //Makes the initial Skills Selection screen where the user can 
  //  select which operation they want to practice
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
            await makeOperationBaseScreen(op);
            //await launchSkill[op]();
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

async function makeOperationBaseScreen(operation) {

  async function waitForButton() {
    return new Promise((resolve, reject) => {

      for (let i = 0; i < skills[operation].length; i++) {

        if (skills[operation][i][1].test()) {
          let opButton = document.getElementById(`opSkills${i}`);
          opButton.classList.remove("inactiveButton");

          opButton.onclick = async () => {
            playTone(randomNote());
            await makeSkillsScreen(skills[operation][i]);
            resolve(false);
          }
        }
      }

      let backButton = document.getElementById("skillCategoryScreenBackButton");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while (!quit) {

    let operationBaseScreen = makeElement("div", "operationBaseScreen", "screen");

      let operationBaseScreenInfo = makeElement("div", "operationBaseScreenInfo", "marquee");
        operationBaseScreenInfo.innerHTML = "Skills Drills";
      operationBaseScreen.appendChild(operationBaseScreenInfo);

      for (let i = 0; i < skills[operation].length; i++) {
        let skillButton = makeButton(skills[operation][i][0], null, `opSkills${i}`, "bigButton", "inactiveButton");
        operationBaseScreen.appendChild(skillButton);
      }

      let backButton = makeButton("Back", null, "skillCategoryScreenBackButton", "bigButton");
      operationBaseScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(operationBaseScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});

  }
}

async function makeSkillsScreen(skill) {

  async function waitForButton() {

    let activeSkill = 0;

    return new Promise((resolve, reject) => {

      for (let i = 1; i < skill.length; i++) {

        if (skill[i].test()) {
          let skillButton = document.getElementById(`skillButton${i}`);
          skillButton.classList.remove("inactiveButton");

          let skillDetail = document.getElementById("skillDetail");

          skillButton.onclick = async () => {
            playTone(randomNote());
            activeSkill = i;
            skillDetail.innerHTML = skill[i].name;
            
            let startButton = document.getElementById("selectSkillButton");
            startButton.onclick = async () => {
              await makeInputScreen([skill[i]]);
              resolve(false);
            }
          }
        }
      }

      
      

      let backButton = document.getElementById("skillsListScreenBackButton");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while (!quit) {

    let skillsScreen = makeElement("div", "skillsScreen", "screen");

      let skillsScreenInfo = makeElement("div", "skillsScreenInfo", "marquee");
        skillsScreenInfo.innerHTML = skill[0];
      skillsScreen.appendChild(skillsScreenInfo);

      let skillDetail = makeElement("div", "skillDetail");
      skillsScreen.appendChild(skillDetail);

      let skillGrid = makeElement("div", "skillGrid");

        for (let i = 1; i < skill.length; i++) {
          let button = makeButton(i, null, `skillButton${i}`, "skillButton", "inactiveButton");
          skillGrid.appendChild(button);
        }
      skillsScreen.appendChild(skillGrid);

      let selectSkillButton = makeButton("Start", null, "selectSkillButton", "bigButton");
      skillsScreen.appendChild(selectSkillButton);

      let backButton = makeButton("Back", null, "skillsListScreenBackButton", "bigButton");
      skillsScreen.appendChild(backButton);


    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(skillsScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});
  }

}

let launchSkill = {
  "+": async () => makeAdditionBaseScreen(),
  "-": () => makeSubtractionSkillsScreen(),
  "×": () => makeMultiplicationSkillsScreen(),
  "÷": () => makeDivisionSkillsScreen()
}



let additionFundamentals = [
  /*0*/"Fundamentals",
  /*1*/{
    name: "Single-Digit Addition 1",
    id: ["addition", "fundamentals", 1],
    run: () => singleDigitAddition(1, 9),
    test: () => {
      return true;
    }
  },
  /*2*/{
    name: "Reorder",
    id: ["addition", "fundamentals", 2],
    run: () => reorder(1, 9),
    test: () => {
      return true;
    }
  },
  /*3*/{
    name: "Missing Term",
    id: ["addition", "fundamentals", 3],
    run: () => addWithin(1, 9, false),
    test: () => {
      if (user.addition.fundamentals[1] && user.addition.fundamentals[2]) {
        return true;
      }
      return false;
    }
  },
  /*4*/{
    name: "Up To 10",
    id: ["addition", "fundamentals", 4],
    run: () => upTo(1, 10),
    test: () => {
      if (user.addition.fundamentals[3]) {
        return true;
      }
      return false;
    }
  },
  /*5*/{
    name: "Doubles 1",
    id: ["addition", "fundamentals", 5],
    run: () => doubles(1, 10, 1, 0, 0),
    test: () => {
      if (user.addition.fundamentals[4]) {
        return true;
      }
      return false;
    }
  },
  /*6*/{
    name: "10 + 1s",
    id: ["addition", "fundamentals", 6],
    run: () => addition(1, 1, 1, 1, 9, 0),
    test: () => {
      if (user.addition.fundamentals[5]) {
        return true;
      } else {
        return false;
      }
    }
  },
  /*7*/{
    name: "Single-Digit Addition 2",
    id: ["addition", "fundamentals", 7],
    run: () => singleDigitAddition(11, 18),
    test: () => {
      if (user.addition.fundamentals[6]) {
        return true;
      } else {
        return false;
      }
    }
  }
]

let additionPartition = [
  /*0*/"Partition",
    /*1*/{
      name: "",
      run: null,
      test: () => {
        if (user.addition.fundamentals[7]) {
          return true;
        }
        return false;
      }
    }
  
]

let additionReorder = [
  /*0*/"Reorder",
  /*1*/{
    name: "Broken 10",
    run: () => reorderBreak10s(1, 1, 1, 1, 9, 1, 9),
    test: () => {
      if (user.addition.fundamentals[7]) {
        return true;
      }
      return false;
    }
  }
]

let additionCompensation = [
  /*0*/"Compensation",
    /*1*/{
      name: "",
      run: null,
      test: () => {
        if (user.addition.fundamentals[7]) {
          return true;
        }
        return false;
      }
    }
  
]

let mathSkills = {
  "additionFundamentals": additionFundamentals
}

let skills = {
  "+": [additionFundamentals, additionPartition, additionReorder, additionCompensation],
  "-": [],
  "×": [],
  "÷": []
}

/*let skills = {
  addition: {

  },
  mixedOps: {

  },
  upTo: {

  },
  doubles: {

  }
}*/

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