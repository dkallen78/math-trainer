function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  clear(document.body);

  let titleScreen = make.main("title-screen", ["screen", "grid"]);

    let header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

    let launchButton = make.button("Let's Go!", "title-screen__launch-button", "big-button", () => {

    });
    titleScreen.appendChild(launchButton);

  document.body.appendChild(titleScreen);
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
    
  }
}