async function makeSkillsStartScreen() {
  //----------------------------------------------------//
  //Makes the initial Skills Selection screen where the //
  //  user can select which operation they want         //
  //  to practice                                       //
  //----------------------------------------------------//

  async function waitForButton() {
    
    return new Promise((resolve, reject) => {

      let operationButtons = document.getElementById("operation-select-screen__operation-grid").childNodes;

      for (let i = 0; i < operationButtons.length; i++) {
        let op = operationButtons[i].innerHTML;
        if (operationUnlock(op)) {
          operationButtons[i].classList.remove("inactive-button");

          operationButtons[i].onclick = async () => {
            playTone(randomNote());
            await makeSkillsDrillsScreen(op);
            resolve(false);
          }
        }
      }

      let backButton = document.getElementById("operation-select-screen__operation-grid__back-button");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }


  let quit = false;

  while (!quit) {
    let operationSelectScreen = makeElement("main", "operation-select-screen", "screen");

      let operationSelectScreenInfo = makeElement("header", "operation-select-screen__info", "marquee");
        operationSelectScreenInfo.innerHTML = "Select an Operation";
      operationSelectScreen.appendChild(operationSelectScreenInfo);

      let operationGrid = makeElement("section", "operation-select-screen__operation-grid");

        let additionButton = makeButton("+", null, "operation-select-screen__operation-grid__addition-button", "inactive-button");
        operationGrid.appendChild(additionButton);

        let subtractionButton = makeButton("-", null, "operation-select-screen__operation-grid__subtraction-button", "inactive-button");
        operationGrid.appendChild(subtractionButton);

        let multiplicationButton = makeButton("×", null, "operation-select-screen__operation-grid__multiplication-button", "inactive-button");
        operationGrid.appendChild(multiplicationButton);

        let divisionButton = makeButton("÷", null, "operation-select-screen__operation-grid__division-button", "inactive-button");
        operationGrid.appendChild(divisionButton);

        let backButton = makeButton("Back", null, "operation-select-screen__operation-grid__back-button", "big-button");
        operationGrid.appendChild(backButton);

      operationSelectScreen.appendChild(operationGrid);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(operationSelectScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});

  }
}

async function makeSkillsDrillsScreen(operation) {
  //----------------------------------------------------//
  //Makes the screen with the categories of skills to   //
  //  choose from                                       //
  //----------------------------------------------------//
  //operation(string): +, -, ×, or ÷                    //
  //----------------------------------------------------//

  async function waitForButton() {
    return new Promise((resolve, reject) => {

      for (let i = 0; i < skills[operation].length; i++) {

        if (skills[operation][i][1].test()) {
          let opButton = document.getElementById(`op-skills-${i}`);
          opButton.classList.remove("inactive-button");

          opButton.onclick = async () => {
            playTone(randomNote());
            await makeSkillsScreen(skills[operation][i]);
            resolve(false);
          }
        }
      }

      let backButton = document.getElementById("skill-group-screen__back-button");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while (!quit) {

    let skillGroupScreen = makeElement("main", "skill-group-screen", "screen");

      let skillGroupScreenInfo = makeElement("header", "skill-group-screen__info", "marquee");
        skillGroupScreenInfo.innerHTML = "Skills Drills";
      skillGroupScreen.appendChild(skillGroupScreenInfo);

      for (let i = 0; i < skills[operation].length; i++) {
        let skillButton = makeButton(skills[operation][i][0], null, `op-skills-${i}`, "big-button", "inactive-button");
        skillGroupScreen.appendChild(skillButton);
      }

      let backButton = makeButton("Back", null, "skill-group-screen__back-button", "big-button");
      skillGroupScreen.appendChild(backButton);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(skillGroupScreen);
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

    return new Promise((resolve, reject) => {

      let skillDetail = document.getElementById("skills-screen__skill-detail");

      for (let i = 1; i < skill.length; i++) {
        //
        //Checks to see if the skill is available, if so, it 
        //  adds an onclick function
        if (skill[i].test()) {
          let skillButton = document.getElementById(`skills-screen__skill-grid__skill-button-${i}`);
          let userKey = user[skill[i].id[0]][skill[i].id[1]][skill[i].id[2]];

          skillButton.classList.remove("inactive-button");
          //
          //If the skill is available, but hasn't been completed yet, 
          //  it's given a special style to indicate it's new
          if (typeof userKey === "undefined") {
            skillButton.classList.add("ready-button");
          }
          
          skillButton.onclick = async () => {
            playTone(randomNote());
            skillDetail.innerHTML = skill[i].name;
            //
            //When a skill has been selected, it makes the Start button clickable
            let startButton = document.getElementById("skills-screen__start-button");
            startButton.classList.remove("inactive-button");
            startButton.onclick = async () => {
              playTone(randomNote());
              await makeSkillInputScreen([skill[i]]);
              resolve(false);
            }
          }
        }
      }

      let backButton = document.getElementById("skills-screen__back-button");
      backButton.onclick = async () => {
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;

  while (!quit) {

    let skillsScreen = makeElement("main", "skills-screen", "screen");

      let skillsScreenInfo = makeElement("heading", "skills-screen__info", "marquee");
        skillsScreenInfo.innerHTML = skill[0];
      skillsScreen.appendChild(skillsScreenInfo);
      //
      //Gives a brief description of the selected skill
      let skillDetail = makeElement("section", "skills-screen__skill-detail");
      skillsScreen.appendChild(skillDetail);
      //
      //Makes the grid of numbers that represent the skills
      let skillGrid = makeElement("section", "skills-screen__skill-grid");
        for (let i = 1; i < skill.length; i++) {
          let button = makeButton(i, null, `skills-screen__skill-grid__skill-button-${i}`, "skill-button", "inactive-button");
          skillGrid.appendChild(button);
        }
      skillsScreen.appendChild(skillGrid);

      let startButton = makeButton("Start", null, "skills-screen__start-button", "big-button", "inactive-button");
      skillsScreen.appendChild(startButton);

      let backButton = makeButton("Back", null, "skills-screen__back-button", "big-button");
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
      run: () => compIntro(4),
      test: () => user.addition.compensation[3]
    },
    /*5 - Compensation I*/{
      name: "Compensation I",
      id: ["addition", "compensation", 5],
      run: () => addComp(1, 1, 1, 1, 4, 0),
      test: () => user.addition.compensation[4]
    },
    /*6 - Compensation II*/{
      name: "Compensation II",
      id: ["addition", "compensation", 6],
      run: () => addComp(2, 9, 1, 1, 4, 0),
      test: () => user.addition.compensation[5]
    }
  ]
}

let subtraction = {
  fundamentals: [
    /*0*/"Fundamentals",
    /*1 - Single-Digit Subtraction  I*/{
      name: "Single-Digit Subtraction I",
      id: ["subtraction", "fundamentals", 1],
      run: () => subWithin(1, 5),
      test: () => user.addition.partition[1]
    },
    /*2 - Single-Digit Subraction II*/{
      name: "Single-Digit Subtraction II",
      id: ["subtraction", "fundamentals", 2],
      run: () => subWithin(1, 10, true),
      test: () => user.subtraction.fundamentals[1]
    },
    /*3 - Take from 10*/{
      name: "Take from 10",
      id: ["subtraction", "fundamentals", 3],
      run: () => takeFrom(1, 1, 1),
      test: () => user.subtraction.fundamentals[2]
    },
    /*4 - Missing Term I*/{
      name: "Missing Term I",
      id: ["subtraction", "fundamentals", 4],
      run: () => subWithin(1, 10, false),
      test: () => user.subtraction.fundamentals[3]
    },
    /*5 - Down to 10 I*/{
      name: "Down to 10 I",
      id: ["subtraction", "fundamentals", 5],
      run: () => downTo(1, 9, 1, 1, 10),
      test: () => user.subtraction.fundamentals[4]
    },
    /*6 - Down to 10 II*/{
      name: "Down to 10 II",
      id: ["subtraction", "fundamentals", 6],
      run: () => downTo(1, 9, 1, 9, 10),
      test: () => user.subtraction.fundamentals[5]
    }
  ],
  partition: [
    /*0*/"Partition",
    /*1 - Crossing 10 I*/{
      name: "Crossing 10 I",
      id: ["subtraction", "partition", 1],
      run: () => subPartCrossing10s(1, 1, 1, 1),
      test: () => user.subtraction.fundamentals[3]
    },
    /*2 - Crossing 10 II*/{
      name: "Crossing 10 II",
      id: ["subtraction", "partition", 2],
      run: () => subPartCrossing10s(1, 1, 1, 2),
      test: () => user.subtraction.partition[1]
    },
    /*3 - Crossing 10s I*/{
      name: "Crossing 10s I",
      id: ["subtraction", "partition", 3],
      run: () => subPartCrossing10s(1, 9, 1, 1),
      test: () => user.subtraction.partition[2]
    },
    /*4 - Crossing 10s II*/{
      name: "crossing 10s II",
      id: ["subtraction", "partition", 4],
      run: () => subPartCrossing10s(1, 9, 1, 2),
      test: () => user.subtraction.partition[3]
    }
  ],
  decomposition: [
    /*0*/"Decomposition",
    /*1 - Decomposition I*/{
      name: "Decomposition I",
      id: ["subtraction", "decomposition", 1],
      run: () => subDecomp(1, 9, 1, 1, 1),
      test: () => user.subtraction.partition[3]
    },
    /*2 - Decomposition II*/{
      name: "Decomposition II",
      id: ["subtraction", "decomposition", 2],
      run: () => subNoBorrow(1, 8, 0, 0),
      test: () => user.subtraction.decomposition[1]
    },
    /*3 - Decomposition III*/{
      name: "Decomposition III",
      id: ["subtraction", "decomposition", 3],
      run: () => subDecomp(1, 9, 2, 9, 2),
      test: () => user.subtraction.decomposition[2]
    },
    /*4 - Decomposition IV*/{
      name: "Decomposition IV",
      id: ["subtraction", "decomposition", 4],
      run: () => subNoBorrow(1, 8, 2, 8),
      test: () => user.subtraction.decomposition[3]
    }
  ]
}

let skills = {
  "+": [addition.fundamentals, addition.reorder, addition.placeValue, addition.partition, addition.compensation],
  "-": [subtraction.fundamentals, subtraction.partition, subtraction.decomposition],
  "×": [],
  "÷": []
}