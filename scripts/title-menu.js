function makeTitleScreen() {
  //----------------------------------------------------//
	//Makes the title screen                              //
	//----------------------------------------------------//

  clear(document.body);

  let titleScreen = make.main("title-screen", "screen-flex");

    let header = make.header("title-screen__header", "marquee");
      header.innerHTML = "QuickMath";
    titleScreen.appendChild(header);

  document.body.appendChild(titleScreen);
}