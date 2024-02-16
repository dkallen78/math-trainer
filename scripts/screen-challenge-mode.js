async function makeChallengesStartScreen() {

  async function waitForButton() {

    return new Promise((resolve, reject) => {

      const survivalButton = get("challenge-select-screen__survival-button");
      set.click(survivalButton, async () => {
        playTone(randomNote());
        await makeSurvivalBaseScreen();
        resolve(false);
      });

      const backButton = get("challenge-select-screen__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      });
    })
  }

  let quit = false;
  while(!quit) {

    const challengeBaseScreen = make.main("challenge-base-screen", ["screen", "flex-column"]);

      const survivalButton = make.button("Survival", "challenge-select-screen__survival-button", "button-big");
      challengeBaseScreen.appendChild(survivalButton);

      const backButton = make.button("Back", "challenge-select-screen__back-button", "button-big");
      challengeBaseScreen.appendChild(backButton);

    await fadeTransition(challengeBaseScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}

async function makeSurvivalBaseScreen() {

  function checkStartState() {
    //----------------------------------------------------//
    //Checks to see if any of the operation buttons have  //
    //  been selected. If so, it removes the inactcive-   //
    //  button class from the startButton. If not, it     //
    //  adds the inactive-button class to the startButton //
    //----------------------------------------------------//

    let startButton = get("survival-base-screen__start-button");
    let operationButtons = get("survival-base-screen__operation-grid").childNodes;

    for (let i = 0; i < operationButtons.length; i++) {
      if (operationButtons[i].classList.contains("button-selected")) {
        startButton.classList.remove("button-inactive");
        return true;
      }
    }
    startButton.classList.add("button-inactive");
    return false;
  }

  async function waitForButton() {
    
    let operatorStates = {
      "+": 0,
      "-": 0,
      "×": 0,
      "÷": 0,
      keys: ["+", "-", "×", "÷"],
      toggle: function(op) {
        //----------------------------------------------------//
        //Toggles the value of the op key from 1 to 0         //
        //----------------------------------------------------//
        //op(string): the key whose value is to be toggled    //
        //----------------------------------------------------//
  
        this[op] = 1 - (this[op]|0);
      }
    }

    return new Promise((resolve, reject) => {

      let operationButtons = get("survival-base-screen__operation-grid").childNodes;
      //
      //Iterates over the operationButtons, turning them
      //  on if the user is elibigle
      for (let i = 0; i < operationButtons.length; i++) {

        let op = operationButtons[i].innerHTML;
        if (operationButtons[i].dataset.unlock === "true") {

          operationButtons[i].classList.remove("button-inactive");

          set.click(operationButtons[i], async () => {

            playTone(randomNote());
            //
            //Toggles the operationButton off or on
            operationButtons[i].classList.toggle("button-selected");
            operatorStates.toggle(op);
            //
            //If an operationButton is toggled, checks to
            //  see if the startButton should be enabled 
            //  or not
            let startButton = get("survival-base-screen__start-button");
            if (checkStartState()) {
              startButton.onclick = async () => {
                playTone(randomNote());
                await doMathSurvival(operatorStates);
                resolve(false);
              }
            } else {
              startButton.onclick = "";
            }
          })
        }
      }

      let backButton = get("survival-base-screen__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      })
    })
  }

  let quit = false;
  while(!quit) {

    const survivalBaseScreen = make.main("survival-base-screen", ["screen", "flex-column"]);

      const operationGrid = make.section("survival-base-screen__operation-grid", ["grid", "operator-grid"]);

        const additionButton = make.button("+", "survival-base-screen__operation-grid__addition-button", ["button-inactive", "button-big"]);
          additionButton.dataset.unlock = "true";
        operationGrid.appendChild(additionButton);

        const subtractionButton = make.button("-", "survival-base-screen__operation-grid__subtraction-button", ["button-inactive", "button-big"]);
          subtractionButton.dataset.unlock = user.subtraction.fundamentals[1];
        operationGrid.appendChild(subtractionButton);

        const multiplicationButton = make.button("×", "survival-base-screen__operation-grid__multiplication-button", ["button-inactive", "button-big"]);
          multiplicationButton.dataset.unlock = user.multiplication.fundamentals[1];
        operationGrid.appendChild(multiplicationButton);

        const divisionButton = make.button("÷", "survival-base-screen__operation-grid__division-button", ["button-inactive", "button-big"]);
          divisionButton.dataset.unlock = user.division.fundamentals[1];
        operationGrid.appendChild(divisionButton);

      survivalBaseScreen.appendChild(operationGrid);

      let startButton = make.button("Start", "survival-base-screen__start-button", ["button-inactive", "button-big"]);
      survivalBaseScreen.appendChild(startButton);

      let backButton = make.button("Back", "survival-base-screen__back-button", "button-big");
      survivalBaseScreen.appendChild(backButton);

    await fadeTransition(survivalBaseScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}