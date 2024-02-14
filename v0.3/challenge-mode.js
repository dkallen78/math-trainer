async function makeChallengeBaseScreen() {
  //----------------------------------------------------//
  //Makes the screen that will display the different    //
  //  challenge modes                                   //
  //----------------------------------------------------//


  async function waitForButton() {

    return new Promise((resolve, reject) => {

      let survivalButton = get("challenge-select-screen__menu__survival-button");
      set.click(survivalButton, async () => {
        playTone(randomNote());
        await makeSurvivalBaseScreen();
        resolve(false);
      });

      let backButton = get("challenge-select-screen__menu__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      });
    })
  }

  let quit = false;

  while (!quit) {

    let challengeBaseScreen = make.main("challenge-base-screen", "screen");

      let challengeBaseScreenInfo = make.header("challenge-select-screen__info", "marquee");
        challengeBaseScreenInfo.innerHTML = "Select a Challenge";
      challengeBaseScreen.appendChild(challengeBaseScreenInfo);

      let challengeMenu = make.nav("challenge-select-screen__menu");

        let survivalButton = make.button("Survival", "challenge-select-screen__menu__survival-button", "big-button");
        challengeMenu.appendChild(survivalButton);

        let backButton = make.button("Back", "challenge-select-screen__menu__back-button", "big-button");
        challengeMenu.appendChild(backButton);

      challengeBaseScreen.appendChild(challengeMenu);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(challengeBaseScreen);
    await fadeIn(document.body);

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

    let startButton = get("survival-base-screen__menu__start-button");
    let operationButtons = get("survival-base-screen__menu").childNodes;

    for (let i = 0; i < operationButtons.length; i++) {
      if (operationButtons[i].classList.contains("selected-button")) {
        startButton.classList.remove("inactive-button");
        return true;
      }
    }
    startButton.classList.add("inactive-button");
    return false;
  }
  
  async function waitForButton() {

    let challengeOperations = {
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

      let operationButtons = get("survival-base-screen__menu").childNodes;
      //
      //Iterates over the operationButtons, turning them
      //  on if the user is elibigle
      for (let i = 0; i < operationButtons.length; i++) {

        let op = operationButtons[i].innerHTML;
        if (operationUnlock(op)) {

          operationButtons[i].classList.remove("inactive-button");

          set.click(operationButtons[i], async () => {

            playTone(randomNote());
            //
            //Toggles the operationButton off or on
            operationButtons[i].classList.toggle("selected-button");
            challengeOperations.toggle(op);
            //
            //If an operationButton is toggled, checks to
            //  see if the startButton should be enabled 
            //  or not
            let startButton = get("survival-base-screen__menu__start-button");
            if (checkStartState()) {
              startButton.onclick = async () => {
                playTone(randomNote());
                await makeChallengeInputScreen(challengeOperations);
                resolve(false);
              }
            } else {
              startButton.onclick = "";
            }
          })
        }
      }

      let backButton = get("survival-base-screen__menu__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      })
    })
  }

  let quit = false;

  while (!quit) {

    let survivalBaseScreen = make.main("survival-base-screen", "screen");

    let survivalBaseScreenHeader = make.header("survival-base-screen__header", "marquee");
      survivalBaseScreenHeader.innerHTML = "Select Operations<br>for Challenge";
    survivalBaseScreen.appendChild(survivalBaseScreenHeader);

    let survivalMenu = make.nav("survival-base-screen__menu");

      let additionButton = make.button("+", "survival-base-screen__menu__addition-button", "inactive-button");
      survivalMenu.appendChild(additionButton);

      let subtractionButton = make.button("-", "survival-base-screen__menu__subtraction-button", "inactive-button");
      survivalMenu.appendChild(subtractionButton);

      let multiplicationButton = make.button("×", "survival-base-screen__menu__multiplication-button", "inactive-button");
      survivalMenu.appendChild(multiplicationButton);

      let divisionButton = make.button("÷", "survival-base-screen__menu__division-button", "inactive-button");
      survivalMenu.appendChild(divisionButton);

      let startButton = make.button("Start", "survival-base-screen__menu__start-button", "inactive-button");
      survivalMenu.appendChild(startButton);

      let backButton = make.button("Back", "survival-base-screen__menu__back-button");
      survivalMenu.appendChild(backButton);

    survivalBaseScreen.appendChild(survivalMenu);

    await fadeOut(document.body);
    clearElement(document.body);
    document.body.appendChild(survivalBaseScreen);
    await fadeIn(document.body);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}