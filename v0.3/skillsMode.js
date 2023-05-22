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
  /*
  //Makes the screen with the categories of skills to   //
  //  choose from                                       //
  //----------------------------------------------------//
  //operation(string): +, -, ×, or ÷                    //
  //----------------------------------------------------//
  //
  */

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
  /*
  //Makes the screen where the user selects a skill to  //
  //  practice. This is the screen right before the     //
  //  primary math loop                                 //
  //----------------------------------------------------//
  //skill(array[objects]): the array of skills to be    //
  //  displayed                                         //
  //----------------------------------------------------//
  //
  */

  async function waitForButton() {

    let activeSkill = 0;

    return new Promise((resolve, reject) => {

      let skillDetail = document.getElementById("skillDetail");

      for (let i = 1; i < skill.length; i++) {

        if (skill[i].test()) {
          let skillButton = document.getElementById(`skillButton${i}`);
          let userKey = user[skill[i].id[0]][skill[i].id[1]][skill[i].id[2]];

          skillButton.classList.remove("inactiveButton");
          
          if (typeof userKey === "undefined") {
            skillButton.classList.add("readyButton");
          }
          

          skillButton.onclick = async () => {
            playTone(randomNote());
            activeSkill = i;
            skillDetail.innerHTML = skill[i].name;
            
            let startButton = document.getElementById("selectSkillButton");
            startButton.classList.remove("inactiveButton");
            startButton.onclick = async () => {
              playTone(randomNote());
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

      //
      //Gives a brief description of the selected skill
      let skillDetail = makeElement("div", "skillDetail");
      skillsScreen.appendChild(skillDetail);

      //
      //Makes the grid of numbers that represent the skills
      let skillGrid = makeElement("div", "skillGrid");

        for (let i = 1; i < skill.length; i++) {
          let button = makeButton(i, null, `skillButton${i}`, "skillButton", "inactiveButton");
          skillGrid.appendChild(button);
        }
      skillsScreen.appendChild(skillGrid);

      let selectSkillButton = makeButton("Start", null, "selectSkillButton", "bigButton", "inactiveButton");
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

let addition = {
  fundamentals: [
    /*0*/"Fundamentals",
    /*1*/{
      name: "Single-Digit Addition I",
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
      name: "Doubles I",
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
      run: () => add(1, 1, 1, 1, 9, 0),
      test: () => {
        if (user.addition.fundamentals[5]) {
          return true;
        } 
        return false;
      }
    },
    /*7*/{
      name: "Single-Digit Addition II",
      id: ["addition", "fundamentals", 7],
      run: () => singleDigitAddition(11, 18),
      test: () => {
        if (user.addition.fundamentals[6]) {
          return true;
        } 
        return false;
      }
    }
  ],
  partition: [
    /*0*/"Partition",
      /*1*/{
        name: "Crossing 10 I",
        id: ["addition", "partition", 1],
        run: addPartCrossing10s(1, 1, 1, 1),
        test: () => {
          if (user.addition.fundamentals[7]) {
            return true;
          }
          return false;
        }
      },
      /*2*/{
        name: "Crossing 10 II",
        id: ["addition", "partition", 2],
        run: addPartCrossing10s(1, 1, 1, 2),
        test: () => {
          if (user.addition.partition[1]) {
            return true;
          }
          return false;
        }
      },
      /*3*/{
        name: "Near Doubles I",
        id: ["addition", "partition", 3],
        run: partitionNearDoubles(2, 9, 0, 1, 1),
        test: () => {
          if (user.addition.partition[2]) {
            return true;
          } 
          return false;
        }
      },
      /*4*/{
        name: "Near Doubles II",
        id: ["addition", "partition", 4],
        run: partitionNearDoubles(2, 9, 0, 1, 2),
        test: () => {
          if (user.addition.partition[3]) {
            return true;
          }
          return false;
        }
      },
      /*5*/{
        name: "Crossing 20 I",
        id: ["addition", "partition", 5],
        run: addPartCrossing10s(2, 2, 1, 1),
        test: () => {
          if (user.addition.partition[4]) {
            return true;
          }
          return false;
        }
      },
      /*6*/{
        name: "Crossing 20 II",
        id: ["addition", "partition", 6],
        run: addPartCrossing10s(2, 2, 1, 2),
        test: () => {
          if (user.addition.partition[5]) {
            return true;
          }
          return false;
        }
      }
      
  ],
  reorder: [
    /*0*/"Reorder",
    /*1*/{
      name: "Broken 10 I",
      id: ["addition", "reorder", 1],
      run: () => broken10s(1, 1, 1, 1, 9, 1, 9, 1),
      test: () => {
        if (user.addition.fundamentals[6]) {
          return true;
        }
        return false;
      }
    },
    /*2*/{
      name: "Broken 10 II",
      id: ["addition", "reorder", 2],
      run: () => broken10s(1, 1, 1, 1, 9, 1, 9, 2),
      test: () => {
        if (user.addition.reorder[1]) {
          return true;
        }
        return false;
      }
    },
    /*3*/{
      name: "Broken 20 I",
      id: ["addition", "reorder", 3],
      run: () => broken10s(2, 2, 1, 1, 9, 1, 9, 1),
      test: () => {
        if (user.addition.reorder[2]) {
          return true;
        } else {
          return false;
        }
      }
    },
    /*4*/{
      name: "Broken 20 II",
      id: ["addition", "reorder", 4],
      run: () => broken10s(2, 2, 1, 1, 9, 1, 9, 2),
      test: () => {
        if (user.addition.reorder[3]) {
          return true;
        } else {
          return false;
        }
      }
    },
    /*5*/{
      name: "Broken 10s I",
      id: ["addition", "reorder", 5],
      run: () => broken10s(2, 8, 1, 1, 9, 1, 9, 1),
      test: () => {
        if (user.addition.reorder[4]) {
          return true;
        } else {
          return false;
        }
      }
    },
    /*6*/{
      name: "Broken 10s II",
      id: ["addition", "reorder", 6],
      run: () => broken10s(2, 8, 1, 1, 9, 1, 9, 2),
      test: () => {
        if (user.addition.reorder[5]) {
          return true;
        } else {
          return false;
        }
      }
    }
  ],
  compensation: [
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
}

let subtraction = {
  fundamentals: [
    /*0*/"Fundamentals",
    /*1*/{
      name: "Single-Digit Subtraction I",
      id: ["subtraction", "fundamentals", 1],
      run: subWithin(1, 5),
      test: () => {
        if (user.addition.partition[1]) {
          return true;
        }
        return false;
      }
    },
    /*2*/{
      name: "Single-Digit Subtraction II",
      id: ["subtraction", "fundamentals", 2],
      run: subWithin(1, 10),
      test: () => {
        if (user.subtraction.fundamentals[1]) {
          return true;
        }
        return false;
      }
    },
    /*3*/{
      name: "Take from 10",
      id: ["subtraction", "fundamentals", 3],
      run: takeFrom(1, 1, 1),
      test: () => {
        if (user.subtraction.fundamentals[2]) {
          return true;
        }
        return false;
      }
    }
  ],
  partition: [
    /*0*/"Partition",
    /*1*/{
      name: "Crossing 10 I",
      id: ["subtraction", "partition", 1],
      run: subPartCrossing10s(1, 1, 1, 1),
      test: () => {
        if (user.subtraction.fundamentals[3]) {
          return true;
        }
        return false;
      }
    },
    /*2*/{
      name: "Crossing 10 II",
      id: ["subtraction", "partition", 2],
      run: subPartCrossing10s(1, 1, 1, 2),
      test: () => {
        if (user.subtraction.partition[1]) {
          return true;
        }
        return false;
      }
    }
  ]
}

let skills = {
  "+": [addition.fundamentals, addition.partition, addition.reorder, addition.compensation],
  "-": [],
  "×": [],
  "÷": []
}