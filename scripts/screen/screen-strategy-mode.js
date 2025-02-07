async function makeStrategiesStartScreen() {
  //----------------------------------------------------//
  //Makes the initial Strategy Selection screen where   //
  //  the user can select which operation they want     //
  //  to practice                                       //
  //----------------------------------------------------//

  async function waitForButton() {
    
    return new Promise((resolve, reject) => {
      
      const additionButton = get("select-operation-screen__operation-grid__addition-button");
      remove.class(additionButton, "button-inactive");
      additionButton.onclick = async () => {
        additionButton.onclick = null;
        playTone(randomNote());
        await makeStrategyGroupsScreen(addition);
        resolve(false);
      };

      const subtractionButton = get("select-operation-screen__operation-grid__subtraction-button");
      if (user.addition.partition[1]) {
        remove.class(subtractionButton, "button-inactive");
        subtractionButton.onclick = async () => {
          subtractionButton.onclick = null;
          playTone(randomNote());
          await makeStrategyGroupsScreen(subtraction);
          resolve(false);
        };
      }

      const multiplicationButton = get("select-operation-screen__operation-grid__multiplication-button");
      if (user.addition.fundamentals[7]) {
        remove.class(multiplicationButton, "button-inactive");
        multiplicationButton.onclick = async () => {
          multiplicationButton.onclick = null;
          playTone(randomNote());
          await makeStrategyGroupsScreen(multiplication);
          resolve(false);
        };
      }

      const divisionButton = get("select-operation-screen__operation-grid__division-button");
      if (user.division.fundamentals[1]) {
        remove.class(divisionButton, "button-inactive");
        divisionButton.onclick = async () => {
          divisionButton.onclick = null;
          playTone(randomNote());
          await makeStrategyGroupsScreen(division);
          resolve(false);
        };
      }

      const backButton = get("select-operation-screen__back-button");
      backButton.onclick = async () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      };
    })

  }

  let quit = false;
  while(!quit) {
    
    const selectOperationScreen = make.main("select-operation-screen", ["screen", "flex-column"]);

      const operationGrid = make.section("select-operation-screen__operation-grid", ["grid", "operator-grid"]);

        const additionButton = make.button("+", "select-operation-screen__operation-grid__addition-button", ["button-inactive", "button-big"]);
        operationGrid.appendChild(additionButton);

        const subtractionButton = make.button("-", "select-operation-screen__operation-grid__subtraction-button", ["button-inactive", "button-big"]);
        operationGrid.appendChild(subtractionButton);

        const multiplicationButton = make.button("×", "select-operation-screen__operation-grid__multiplication-button", ["button-inactive", "button-big"]);
        operationGrid.appendChild(multiplicationButton);

        const divisionButton = make.button("÷", "select-operation-screen__operation-grid__division-button", ["button-inactive", "button-big"]);
        operationGrid.appendChild(divisionButton);

      selectOperationScreen.appendChild(operationGrid);

      const backButton = make.button("Back", "select-operation-screen__back-button", "button-big");
      selectOperationScreen.appendChild(backButton);
    
    await fadeTransition(selectOperationScreen);
    
    await waitForButton()
      .then((exit) => {
        quit = exit;
      });
  }
}

async function makeStrategyGroupsScreen(operation) {
  //----------------------------------------------------//
  //Makes the screen with the groups of strageties      //
  //----------------------------------------------------//
  //operation(string): +, -, ×, or ÷                    //
  //----------------------------------------------------//

  async function waitForButton() {
    
    return new Promise((resolve, reject) => {

      for (const group in operation) {
        //
        //if the first item in the operation object is not a string
        //  and if that group of strats has been unlocked
        if (typeof operation[group] !== "string" && operation[group][1].test()) {
          const groupButton = get(`strategy-groups-screen__${operation[group][0]}-button`);
          //
          //activate the button
          remove.class(groupButton, "button-inactive");
          groupButton.onclick = async () => {
            groupButton.onclick = null;
            playTone(randomNote());
            await makeStrategyDetailScreen(operation[group]);
            resolve(false);
          };
        }
        
      }
      //
      //Make the Back button
      const backButton = get("strategy-groups-screen__back-button");
      backButton.onclick = async () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      };
    })
  }

  let quit = false;
  while(!quit) {

    const strategyGroupsScreen = make.main("strategy-groups-screen", ["screen", "flex-column"]);

      const strategyGroupsScreenInfo = make.header("strategy-groups-screen__info", "marquee");
        strategyGroupsScreenInfo.innerHTML = operation.name;
      strategyGroupsScreen.appendChild(strategyGroupsScreenInfo);

      for (const group in operation) {
        if (typeof operation[group] !== "string") {
          const groupButton = make.button(operation[group][0], `strategy-groups-screen__${operation[group][0]}-button`, ["button-medium", "button-inactive"]);
          strategyGroupsScreen.appendChild(groupButton);
        }
      }

      const backButton = make.button("Back", "strategy-groups-screen__back-button", "button-medium");
      strategyGroupsScreen.appendChild(backButton);
      
    await fadeTransition(strategyGroupsScreen);
      
    await waitForButton()
      .then((exit) => {quit = exit});
  }
}

async function makeStrategyDetailScreen(group) {
  //----------------------------------------------------//
  //Makes the screen where the user selects a strategy  //
  //  to practice. This is the screen right before the  //
  //  primary math loop                                 //
  //----------------------------------------------------//
  //group(array[objects]): the array of skills to be    //
  //  displayed                                         //
  //----------------------------------------------------//

  async function waitForButton() {

    function unselectButtons() {

      for (let i = 1; i < group.length; i++) {
        const strategyButton = get(`strategy-detail-screen__strategy-grid__button-${i}`);
        remove.class(strategyButton, "button-selected");
      }
    }

    return new Promise((resolve, reject) => {
      const strategyDetail = get("strategy-detail-screen__strategy-detail");

      for (let i = 1; i < group.length; i++) {

        if (group[i].test()) {
          const strategyButton = get(`strategy-detail-screen__strategy-grid__button-${i}`);
          const id = group[i].id;
          const skillPassed = user[id[0]][id[1]][id[2]];

          remove.class(strategyButton, "button-inactive");

          if (typeof skillPassed === "undefined") {
            set.class(strategyButton, "button-ready");
          }

          strategyButton.onclick = async () => {
            playTone(randomNote());
            strategyDetail.innerHTML = group[i].name;

            const startButton = get("strategy-detail-screen__start-button");
            remove.class(startButton, "button-inactive");
            unselectButtons();
            set.class(strategyButton, "button-selected");
            startButton.onclick = async () => {
              startButton.onclick = null;
              playTone(randomNote());
              await doMathStrategy(group[i]);
              resolve(false);
            }
          }
        }
      }

      const backButton = get("strategy-detail-screen__back-button");
      backButton.onclick = () => {
        backButton.onclick = null;
        playTone(randomNote());
        resolve(true);
      }
    })
  }

  let quit = false;
  while(!quit) {

    const strategyDetailScreen = make.main("strategy-detail-screen", ["screen", "grid"]);

      const strategyDetailScreenInfo = make.header("strategy-detail-screen__info", "marquee");
        strategyDetailScreenInfo.innerHTML = group[0];
      strategyDetailScreen.appendChild(strategyDetailScreenInfo);

      const strategyDetail = make.section("strategy-detail-screen__strategy-detail");
      strategyDetailScreen.appendChild(strategyDetail);

      const strategyGrid = make.section("strategy-detail-screen__strategy-grid", "grid");
        for (let i = 1; i < group.length; i++) {
          const button = make.button(i, `strategy-detail-screen__strategy-grid__button-${i}`, "button-inactive");
          strategyGrid.appendChild(button);
        }
      strategyDetailScreen.appendChild(strategyGrid);

      const startButton = make.button("Start", "strategy-detail-screen__start-button", ["button-big", "button-inactive"]);
      strategyDetailScreen.appendChild(startButton);

      const backButton = make.button("Back", "strategy-detail-screen__back-button", "button-big");
      strategyDetailScreen.appendChild(backButton);

    await fadeTransition(strategyDetailScreen);

    await waitForButton()
      .then((exit) => {quit = exit});
  }
}