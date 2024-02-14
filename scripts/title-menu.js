function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  clear(document.body);

  let titleScreen = make.main("title-screen", "screen-flex");

    let header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

    let launchButton = make.button("Let's Go!", "title-screen__launch-button", "big-button", () => {

    });
    titleScreen.appendChild(launchButton);

  document.body.appendChild(titleScreen);
}