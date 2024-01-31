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
        if (operationUnlock(op)) {
          operationButtons[i].classList.remove("inactive-button");

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

        let additionButton = makeButton("+", null, "additionButton", "inactive-button");
        skillsSelect.appendChild(additionButton);

        let subtractionButton = makeButton("-", null, "subtractionButton", "inactive-button");
        skillsSelect.appendChild(subtractionButton);

        let multiplicationButton = makeButton("×", null, "multiplicationButton", "inactive-button");
        skillsSelect.appendChild(multiplicationButton);

        let divisionButton = makeButton("÷", null, "divisionButton", "inactive-button");
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
          opButton.classList.remove("inactive-button");

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
        let skillButton = makeButton(skills[operation][i][0], null, `opSkills${i}`, "bigButton", "inactive-button");
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
  //----------------------------------------------------//
  //Makes the screen where the user selects a skill to  //
  //  practice. This is the screen right before the     //
  //  primary math loop                                 //
  //----------------------------------------------------//
  //skill(array[objects]): the array of skills to be    //
  //  displayed                                         //
  //----------------------------------------------------//

  async function waitForButton() {

    //let activeSkill = 0;

    return new Promise((resolve, reject) => {

      let skillDetail = document.getElementById("skillDetail");

      for (let i = 1; i < skill.length; i++) {

        //
        //Checks to see if the skill is available, if so, it 
        //  adds an onclick function
        if (skill[i].test()) {
          let skillButton = document.getElementById(`skillButton${i}`);
          let userKey = user[skill[i].id[0]][skill[i].id[1]][skill[i].id[2]];

          skillButton.classList.remove("inactive-button");
          
          //
          //If the skill is available, but hasn't been completed yet, 
          //  it's given a special style to indicate it's new
          if (typeof userKey === "undefined") {
            skillButton.classList.add("readyButton");
          }
          
          skillButton.onclick = async () => {
            playTone(randomNote());
            //activeSkill = i;
            skillDetail.innerHTML = skill[i].name;
            
            //
            //When a skill has been selected, it makes the Start button clickable
            let startButton = document.getElementById("selectSkillButton");
            startButton.classList.remove("inactive-button");
            startButton.onclick = async () => {
              playTone(randomNote());
              await makeSkillInputScreen([skill[i]]);
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
          let button = makeButton(i, null, `skillButton${i}`, "skillButton", "inactive-button");
          skillGrid.appendChild(button);
        }
      skillsScreen.appendChild(skillGrid);

      let selectSkillButton = makeButton("Start", null, "selectSkillButton", "bigButton", "inactive-button");
      skillsScreen.appendChild(selectSkillButton);

      let backButton = makeButton("Back", null, "skillsListScreenBackButton", "bigButton");
      skillsScreen.appendChild(backButton);

      /*
      //If there are any pending notifications, they happen here
      */
      if (notify.length > 0) {
        let notification = makeElement("div", "notification");
        notification.innerHTML = notify[0];
        skillsScreen.appendChild(notification);

        notification.onanimationend = () => {
          notify = [];
          removeElement(notification);
        }
      }

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
    /*1 - Single-Digit Addition I*/{
      name: "Single-Digit Addition I",
      id: ["addition", "fundamentals", 1],
      run: () => singleDigitAddition(1, 9),
      test: () => true
    },
    /*2 - Reorder*/{
      name: "Reorder",
      id: ["addition", "fundamentals", 2],
      run: () => reorder(1, 9),
      test: () => true
    },
    /*3 - Missing Term*/{
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
    /*4 - Up To 10*/{
      name: "Up To 10",
      id: ["addition", "fundamentals", 4],
      run: () => upTo(1, 10),
      test: () => {
        if (user.addition.fundamentals[3]) {
          return true;
        }
        return false;
      },
      notification: "Addition-Reorder unlocked!"
    },
    /*5 - Doubles I*/{
      name: "Doubles I",
      id: ["addition", "fundamentals", 5],
      run: () => doubles(1, 5, 1, 0, 0),
      test: () => {
        if (user.addition.fundamentals[4]) {
          return true;
        }
        return false;
      },
      notification: "Addition-Place Value unlocked!"
    },
    /*6 - Single-Digit Addition II*/{
      name: "Single-Digit Addition II",
      id: ["addition", "fundamentals", 6],
      run: () => singleDigitAddition(11, 18),
      test: () => {
        if (user.addition.fundamentals[5]) {
          return true;
        } 
        return false;
      },
    },
    /*7 - Doubles II*/{
      name: "Doubles II",
      id: ["addition", "fundamentals", 7],
      run: () => doubles(1, 10, 1, 0, 0),
      test: () => user.addition.fundamentals[6]
    },
    /*8 - Three-Term Addition I*/{
      name: "Three-Term Addition I",
      id: ["addition", "fundamentals", 8],
      run: () => add3(3, 20),
      test: () => user.addition.fundamentals[7]
    } 
  ], 
  reorder: [
    /*0*/"Reorder",
    /*1 - Broken 10 I*/{
      name: "Broken 10 I",
      id: ["addition", "reorder", 1],
      run: () => broken10s(1, 1, 1, 1, 9, 1, 9, 1),
      test: () => {
        if (user.addition.fundamentals[4]) {
          return true;
        }
        return false;
      },
      notification: "Addition-Partition unlocked!"
    },
    /*2 - Broken 10 II*/{
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
    /*3 - Broken 20 I*/{
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
    /*4 - Broken 20 II*/{
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
    /*5 - Broken Doubles I*/{
      name: "Broken Doubles I",
      id: ["addition", "reorder", 5],
      run: () => brokenDoubles(2, 5, 1, 9, 1),
      test: () => user.addition.reorder[4]
    },
    /*6 - Broken Doubles II*/{
      name: "Broken Doubles II",
      id: ["addition", "reorder", 6],
      run: () => brokenDoubles(2, 5, 1, 9, 2),
      test: () => user.addition.reorder[5]
    },
    /*7 - Broken 10s I*/{
      name: "Broken 10s I",
      id: ["addition", "reorder", 7],
      run: () => broken10s(2, 8, 1, 1, 9, 1, 9, 1),
      test: () => user.addition.reorder[6]
    },
    /*8 - Broken 10s II*/{
      name: "Broken 10s II",
      id: ["addition", "reorder", 8],
      run: () => broken10s(2, 8, 1, 1, 9, 1, 9, 2),
      test: () => user.addition.reorder[7]
    }
  ],
  placeValue: [
    /*0*/"Place Value",
    /*1 - 10 + 1s*/{
      name: "10 + 1s",
      id: ["addition", "placeValue", 1],
      run: () => add(1, 1, 1, 1, 9, 0),
      test: () => user.addition.fundamentals[5]
    },
    /*2 - Add 10s*/{
      name: "Add 10s",
      id: ["addition", "placeValue", 2],
      run: () => add2(1, 9, 1, 1),
      test: () => user.addition.placeValue[1]
    }, 
    /*3 - 10 More I*/{
      name: "10 More I",
      id: ["addition", "placeValue", 3],
      run: () => add(11, 99, 0, 1, 1, 1),
      test: () => user.addition.placeValue[2]
    },
    /*4 - Decompose I*/{
      name: "Decompose I",
      id: ["addition", "placeValue", 4],
      run: () => decompose(2),
      test: () => user.addition.placeValue[3]
    },
    /*5 - 10s and 1s*/{
      name: "10s an 1s",
      id: ["addition", "placeValue", 5],
      run: () => add(1, 9, 1, 1, 9, 0),
      test: () => user.addition.placeValue[4]
    },
    /*6 - Decompose II*/{
      name: "Decompose II",
      id: ["addition", "placeValue", 6],
      run: () => decompose(3),
      test: () => user.addition.placeValue[5]
    }
  ],
  partition: [
    /*0*/"Partition",
      /*1 - Crossing 10 I*/{
        name: "Crossing 10 I",
        id: ["addition", "partition", 1],
        run: () => addPartCrossing10s(1, 1, 1, 1),
        test: () => user.addition.reorder[1],
        notification: "Subtraction unlocked!"
      },
      /*2 - Crossing 10 II*/{
        name: "Crossing 10 II",
        id: ["addition", "partition", 2],
        run: () => addPartCrossing10s(1, 1, 1, 2),
        test: () => user.addition.partition[1]
      },
      /*3 - Near Doubles I*/{
        name: "Near Doubles I",
        id: ["addition", "partition", 3],
        run: () => partitionNearDoubles(2, 9, 0, 1, 1),
        test: () => user.addition.partition[2]
      },
      /*4 - Near Doubles II*/{
        name: "Near Doubles II",
        id: ["addition", "partition", 4],
        run: () => partitionNearDoubles(2, 9, 0, 1, 2),
        test: () => user.addition.partition[3]
      },
      /*5 - Crossing 20 I*/{
        name: "Crossing 20 I",
        id: ["addition", "partition", 5],
        run: () => addPartCrossing10s(2, 2, 1, 1),
        test: () => user.addition.partition[4]
      },
      /*6 - Crossing 20 II*/{
        name: "Crossing 20 II",
        id: ["addition", "partition", 6],
        run: () => addPartCrossing10s(2, 2, 1, 2),
        test: () => user.addition.partition[5]
      },
      /*7 - Crossing 10s I*/{
        name: "Crossing 10s I",
        id: ["addition", "partition", 7],
        run: () => addPartCrossing10s(3, 9, 1, 1),
        test: () => user.addition.partition[6]
      },
      /*8 - Crossing 10s II*/{
        name: "Crossing 10s II",
        id: ["addition", "partition", 8],
        run: () => addPartCrossing10s(3, 9, 1, 2),
        test: () => user.addition.partition[7]
      }
      
  ],
  compensation: [
    /*0*/"Compensation",
    /*1 - Give and Take I*/{
      name: "Give and Take I",
      id: ["addition", "compensation", 1],
      run: () => compIntro(1),
      test: () => user.subtraction.fundamentals[1]
    },
    /*2 - Give and Take II*/{
      name: "Give and Take II",
      id: ["addition", "compensation", 2],
      run: () => compIntro(2),
      test: () => user.addition.compensation[1]
    },
    /*3 - Give and Take III*/{
      name: "Give and Take III",
      id: ["addition", "compensation", 3],
      run: () => compIntro(3),
      test: () => user.addition.compensation[2]
    },
    /*4 - Give and Take IV*/{
      name: "Give and Take IV",
      id: ["addition", "compensation", 4],
      run: () => addComp(),
      test: () => user.addition.compensation[3]
    }
  ]
}

let subtraction = {
  fundamentals: [
    /*0*/"Fundamentals",
    /*1*/{
      name: "Single-Digit Subtraction I",
      id: ["subtraction", "fundamentals", 1],
      run: () => subWithin(1, 5),
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
      run: () => subWithin(1, 10, true),
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
      run: () => takeFrom(1, 1, 1),
      test: () => {
        if (user.subtraction.fundamentals[2]) {
          return true;
        }
        return false;
      }
    },
    /*4*/{
      name: "Missing Term I",
      id: ["subtraction", "fundamentals", 4],
      run: () => subWithin(1, 10, false),
      test: () => {
        if (user.subtraction.fundamentals[3]) {
          return true;
        }
        return false;
      }
    },
    /*5*/{
      name: "Down to 10 I",
      id: ["subtraction", "fundamentals", 5],
      run: () => downTo(1, 9, 1, 1, 10),
      test: () => {
        if (user.subtraction.fundamentals[4]) {
          return true;
        }
        return false;
      }
    },
    /*6*/{
      name: "Down to 10 II",
      id: ["subtraction", "fundamentals", 6],
      run: () => downTo(1, 9, 1, 9, 10),
      test: () => {
        if (user.subtraction.fundamentals[5]) {
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
      run: () => subPartCrossing10s(1, 1, 1, 1),
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
      run: () => subPartCrossing10s(1, 1, 1, 2),
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
  "+": [addition.fundamentals, addition.reorder, addition.placeValue, addition.partition, addition.compensation],
  "-": [subtraction.fundamentals, subtraction.partition],
  "×": [],
  "÷": []
}