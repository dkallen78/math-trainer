async function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  let titleScreen = make.main("title-screen", ["screen", "grid"]);

    let header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

    let launchButton = make.button("Let's Go!", "title-screen__launch-button", "big-button", () => {

    });
    titleScreen.appendChild(launchButton);

  await fadeTransition(titleScreen);

  /*await fadeOut(document.body);
  clear(document.body);  
  document.body.appendChild(titleScreen);
  await fadeIn(document.body);*/
}

async function makeModeSelectScreen() {
  //----------------------------------------------------//
	//Makes the mode select screen. This is also the base //
  //  to which the program returns when all other loops //
  //  have ended                                        //
	//----------------------------------------------------//

  async function waitForButton() {

  }

  let quit = false;
  while (!quit) {
    let modeSelectScreen = make.main("mode-select-screen", "screen");
    
    await fadeOut(document.body);
    clearElement(document.body);  
    document.body.appendChild(modeSelectScreen);
    await fadeIn(document.body);
  }
}