function makeElement(type, id, ...classes) {
  /*
  //Returns an HTML element                             //
  //----------------------------------------------------//
  //type(string): type of HTML element to create        //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  */

  let element = document.createElement(type);
  if (typeof id === "string") {element.id = id}
  classes.forEach(x => element.classList.add(x));
  return element;
}

function makeButton(name, touch, id, ...classes) {
  /*
  //Returns an HTML button element                      //
  //----------------------------------------------------//
  //name(string): text on the button                    //
  //touch(function): onclick function of button         //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): HTML button element                //
  */

  let button = makeElement("button", id, ...classes);
  button.innerHTML = name;
  button.onclick = touch;
  return button;
}

function clearElement(...elements) {
  /*
  //Clears the innerHTML of any number of elements      //
  //----------------------------------------------------//
  //elements(DOM element): elements to be cleared       //
  */

  elements.forEach(x => x.innerHTML = "");
}

function makeMenuScreen(screen) {

  function makeSignInScreen() {
    /*
    //Makes the screen that will display the sign in
    //  and register options
    */

    clearElement(document.body);

    let signInScreen = makeElement("div", "signInScreen", "screen");

      let titleDiv = makeElement("div", "titleDiv");
        titleDiv.innerHTML = "QuickMath";
      signInScreen.appendChild(titleDiv);

      let signInButton = makeButton("Sign In", makeModeSelectScreen, "signInButton");
      signInScreen.appendChild(signInButton);

      let registerButton = makeButton("Register", null, "registerButton");
      signInScreen.appendChild(registerButton);

    return signInScreen;
  }

  function makeModeSelectScreen() {
    /*
    //Makes the screen that will display the different
    //  available modes
    */

    clearElement(document.body);

    let modeSelectScreen = makeElement("div", "modeSelectScreen", "screen");

      let letsGoButton = makeButton("Let's Go!", null, "letsGoButton");
      modeSelectScreen.appendChild(letsGoButton);

    console.trace();
    document.body.appendChild(modeSelectScreen);
  }

  document.body.appendChild(makeSignInScreen());
}
