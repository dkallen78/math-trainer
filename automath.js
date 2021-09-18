
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

function makeButton(name, touch, id, ...classes) {
  //----------------------------------------------------//
  //Returns an HTML button element                      //
  //----------------------------------------------------//
  //name(string): text on the button                    //
  //touch(function): onclick function of button         //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): HTML button element                //
  //----------------------------------------------------//

  let button = makeElement("button", id, ...classes);
  button.innerHTML = name;
  button.onclick = touch;
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

function makeNumberInput() {
  let numberInput = makeElement("div", "numberInput");

    let button = makeButton("1", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("2", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("3", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("4", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("5", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("6", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("7", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("8", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("9", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("0", null, "button1");
    numberInput.appendChild(button);
    button = makeButton(".", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("←", null, "button1");
    numberInput.appendChild(button);
    button = makeButton("Submit", null, "button1");
    numberInput.appendChild(button);

  return numberInput;
}

function makeSignInScreen() {
  clearElement(document.body);

  //root.style.setProperty("--bg-color", "hsla(0, 100%, 50%, 1)");

  let signInScreen = makeElement("div", "signInScreen");

    let titleDiv = makeElement("div", "titleDiv");
      titleDiv.innerHTML = "AutoMath";
    signInScreen.appendChild(titleDiv);

    let signInButton = makeButton("Sign In", makeProblemScreen, "signInButton");
    signInScreen.appendChild(signInButton);

    let registerButton = makeButton("Register", makeProblemScreen, "registerButton");
    signInScreen.appendChild(registerButton);


  document.body.appendChild(signInScreen);
}

function makeProblemScreen() {
  clearElement(document.body);

  let problemScreen = makeElement("div", "problemScreen");

    let numberInput = makeNumberInput()
    problemScreen.appendChild(numberInput);

  document.body.appendChild(problemScreen);
}

const root = document.documentElement;
