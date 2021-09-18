
function makeElement(type, id, ...classes) {
  //----------------------------------------------------//
  //Returns an HTML element                             //
  //----------------------------------------------------//
  //type(string): type of HTML element to create        //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  //----------------------------------------------------//

  let element = document.createElement(type);
  if (typeof id === "string") {element.id = id}
  classes.forEach(x => element.classList.add(x));
  return element;
}

function makeButton(name, id, ...classes) {
  //----------------------------------------------------//
  //Returns an HTML button element                      //
  //----------------------------------------------------//
  //name(string): text on the button                    //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): HTML button element                //
  //----------------------------------------------------//

  let button = makeElement("button", id, ...classes);
  button.innerHTML = name;
  return button;
}

function clearElement(...elements) {
  //----------------------------------------------------//
  //Clears the innerHTML of any number of elements      //
  //----------------------------------------------------//
  //elements(DOM element): elements to be cleared       //
  //----------------------------------------------------//

  elements.forEach(x => x.innerHTML = "");
}

function makeSignInScreen() {
  clearElement(document.body);

  //root.style.setProperty("--bg-color", "hsla(0, 100%, 50%, 1)");

  let signInScreen = makeElement("div", "signInScreen");

    let titleDiv = makeElement("div", "titleDiv");
      titleDiv.innerHTML = "AutoMath";
    signInScreen.appendChild(titleDiv);

    let signInButton = makeButton("Sign In", "signInButton");
      signInButton.onclick = makeProblemScreen;
    signInScreen.appendChild(signInButton);

    let registerButton = makeButton("Register", "registerButton");
    signInScreen.appendChild(registerButton);


  document.body.appendChild(signInScreen);
}

function makeProblemScreen() {
  clearElement(document.body);

  let problemScreen = makeElement("div", "problemScreen");

    let numberInput = makeElement("div", "numberInput");
    problemScreen.appendChild(numberInput);

  document.body.appendChild(problemScreen);
}

const root = document.documentElement;
