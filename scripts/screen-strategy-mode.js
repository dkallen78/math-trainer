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
      set.click(additionButton, async () => {
        playTone(randomNote());
        await makeStrategyGroupsScreen(addition);
        resolve(false);
      });

      const subtractionButton = get("select-operation-screen__operation-grid__subtraction-button");
      if (user.subtraction.fundamentals[1]) {
        remove.class(subtractionButton, "button-inactive");
        set.click(subtractionButton, async () => {
          playTone(randomNote());
          await makeStrategyGroupsScreen(subtraction);
          resolve(false);
        });
      }

      const multiplicationButton = get("select-operation-screen__operation-grid__multiplication-button");
      if (user.multiplication.fundamentals[1]) {
        remove.class(multiplicationButton, "button-inactive");
        set.click(multiplicationButton, async () => {
          playTone(randomNote());
          await makeStrategyGroupsScreen(multiplication);
          resolve(false);
        });
      }

      const divisionButton = get("select-operation-screen__operation-grid__division-button");
      if (user.division.fundamentals[1]) {
        remove.class(divisionButton, "button-inactive");
        set.click(divisionButton, async () => {
          playTone(randomNote());
          await makeStrategyGroupsScreen(division);
          resolve(false);
        });
      }

      const backButton = get("select-operation-screen__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      });
    })

  }

  let quit = false;
  while(!quit) {
    
    const selectOperationScreen = make.main("select-operation-screen", ["screen", "flex-column"]);

      const operationGrid = make.section("select-operation-screen__operation-grid", "grid");

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
        console.log("returned", exit);
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

        if (operation[group][1].test()) {
          const groupButton = get(`strategy-groups-screen__${operation[group][0]}-button`);
          remove.class(groupButton, "button-inactive");
          set.click(groupButton, async () => {
            playTone(randomNote());
            //await makeSkillsScreen(skills[operation][i]);
            resolve(false);
          });
        }
      }

      const backButton = get("strategy-groups-screen__back-button");
      set.click(backButton, async () => {
        playTone(randomNote());
        resolve(true);
      });
    })
  }

  let quit = false;
  while(!quit) {

    const strategyGroupsScreen = make.main("strategy-groups-screen", ["screen", "flex-column"]);

      for (const group in operation) {
        const groupButton = make.button(operation[group][0], `strategy-groups-screen__${operation[group][0]}-button`, ["button-medium", "button-incactive"]);
        strategyGroupsScreen.appendChild(groupButton);
      }

      const backButton = make.button("Back", "strategy-groups-screen__back-button", "button-medium");
      strategyGroupsScreen.appendChild(backButton);
      
    await fadeTransition(strategyGroupsScreen);
      
    await waitForButton()
      .then((exit) => {quit = exit});
  }
}