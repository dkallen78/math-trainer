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

function makeTitleScreen() {
  /*
  //Makes the screen that will display the sign in
  //  and register options
  */

  clearElement(document.body);

  let titleScreen = makeElement("div", "titleScreen", "screen");

    let titleDiv = makeElement("div", "titleDiv");
      titleDiv.innerHTML = "QuickMath";
    titleScreen.appendChild(titleDiv);

    let letsGoButton = makeButton("Let's Go!", makeLevelSelectScreen, "letsGoButton");
    titleScreen.appendChild(letsGoButton);

  document.body.appendChild(titleScreen);
}

function makeLevelSelectScreen() {
  /*
  //Makes the screen that will display the available levels
  */

  clearElement(document.body);

  let levelSelectScreen = makeElement("div", "levelSelectScreen", "screen");

    for (let i = 1; i <= 6; i++) {
      /*
        Makes the buttons for the levels of mastery
      */
      let buttText = "";
      let buttFunc;
      if (user.level >= i) {
        buttText = `Level ${i}`;
        buttFunc = function() {
          //user.activeLevel = i;
          //makeReadyScreen();
        };
      } else if (user.testLevel === i) {
        buttText = `Unlock Level ${i}`;
        buttFunc = function() {
          //user.activeLevel = 0;
          //makeReadyScreen();
        };
      } else {
        buttText = "Locked";
        buttFunc = "";
      }

      let button = makeButton(buttText, buttFunc, `level${i}Button`, "levelButtons");
      levelSelectScreen.appendChild(button);
    }

  document.body.appendChild(levelSelectScreen);
}

let user = {
  /*
    Data about the user
  */
  level: 3,
  testLevel: 3,
  activeLevel: 0
};
