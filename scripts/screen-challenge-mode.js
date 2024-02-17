async function makeChallengesStartScreen() {

  async function waitForButton() {

    return new Promise((resolve, reject) => {

      const survivalButton = get("challenge-select-screen__survival-button");
      survivalButton.onclick = async () => {
        survivalButton.onclick = null;
        playTone(randomNote());
        await makeSelectChallengeOperationsScreen(doMathSurvival)
        resolve(false);
      };

      const countDownButton = get("challenge-select-screen__countdown-button");
      countDownButton.onclick = async () => {
        countDownButton.onclick = null;
        playTone(randomNote());
        await makeSelectChallengeOperationsScreen(doMathCountdown)
        resolve(false);
      }

      const backButton = get("challenge-select-screen__back-button");
      backButton.onclick = async () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      };
    })
  }

  let quit = false;
  while(!quit) {

    const challengeBaseScreen = make.main("challenge-base-screen", ["screen", "flex-column"]);

      const survivalButton = make.button("Survival", "challenge-select-screen__survival-button", "button-big");
      challengeBaseScreen.appendChild(survivalButton);

      const countdownButton = make.button("Countdown", "challenge-select-screen__countdown-button", "button-big");
      challengeBaseScreen.appendChild(countdownButton);

      const backButton = make.button("Back", "challenge-select-screen__back-button", "button-big");
      challengeBaseScreen.appendChild(backButton);

    await fadeTransition(challengeBaseScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}

async function makeSelectChallengeOperationsScreen(mathFunction) {

  function checkStartState() {
    //----------------------------------------------------//
    //Checks to see if any of the operation buttons have  //
    //  been selected. If so, it removes the inactcive-   //
    //  button class from the startButton. If not, it     //
    //  adds the inactive-button class to the startButton //
    //----------------------------------------------------//

    const startButton = get("select-operations-screen__start-button");
    const operationButtons = get("select-operations-screen__operation-grid").childNodes;

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

      const operationButtons = get("select-operations-screen__operation-grid").childNodes;
      //
      //Iterates over the operationButtons, turning them
      //  on if the user is elibigle
      for (let i = 0; i < operationButtons.length; i++) {

        const op = operationButtons[i].innerHTML;
        if (operationButtons[i].dataset.unlock === "true") {

          operationButtons[i].classList.remove("button-inactive");

          operationButtons[i].onclick = async () => {

            playTone(randomNote());
            //
            //Toggles the operationButton off or on
            operationButtons[i].classList.toggle("button-selected");
            operatorStates.toggle(op);
            //
            //If an operationButton is toggled, checks to
            //  see if the startButton should be enabled 
            //  or not
            const startButton = get("select-operations-screen__start-button");
            if (checkStartState()) {
              startButton.onclick = async () => {
                playTone(randomNote());
                await mathFunction(operatorStates);
                resolve(false);
              }
            } else {
              startButton.onclick = "";
            }
          }
        }
      }

      const backButton = get("select-operations-screen__back-button");
      backButton.onclick = async () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;
  while(!quit) {

    const selectOperationsScreen = make.main("select-operations-screen", ["screen", "flex-column"]);

      const operationGrid = make.section("select-operations-screen__operation-grid", ["grid", "operator-grid"]);

        const additionButton = make.button("+", "select-operations-screen__operation-grid__addition-button", ["button-inactive", "button-big"]);
          additionButton.dataset.unlock = "true";
        operationGrid.appendChild(additionButton);

        const subtractionButton = make.button("-", "select-operations-screen__operation-grid__subtraction-button", ["button-inactive", "button-big"]);
          subtractionButton.dataset.unlock = user.subtraction.fundamentals[1];
        operationGrid.appendChild(subtractionButton);

        const multiplicationButton = make.button("×", "select-operations-screen__operation-grid__multiplication-button", ["button-inactive", "button-big"]);
          multiplicationButton.dataset.unlock = user.multiplication.fundamentals[1];
        operationGrid.appendChild(multiplicationButton);

        const divisionButton = make.button("÷", "select-operations-screen__operation-grid__division-button", ["button-inactive", "button-big"]);
          divisionButton.dataset.unlock = user.division.fundamentals[1];
        operationGrid.appendChild(divisionButton);

      selectOperationsScreen.appendChild(operationGrid);

      const startButton = make.button("Start", "select-operations-screen__start-button", ["button-inactive", "button-big"]);
      selectOperationsScreen.appendChild(startButton);

      const backButton = make.button("Back", "select-operations-screen__back-button", "button-big");
      selectOperationsScreen.appendChild(backButton);

    await fadeTransition(selectOperationsScreen);

    await waitForButton()
    .then((exit) => {quit = exit});
  }
}