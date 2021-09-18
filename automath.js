
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
  //----------------------------------------------------//
  //Makes and returns a div element with a number pad   //
  //  inside of it                                      //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  //----------------------------------------------------//

  let numberInput = makeElement("div", "numberInput");

    let button = makeButton("1", function() {inputNumber(1)}, "button1");
    numberInput.appendChild(button);
    button = makeButton("2", function() {inputNumber(2)}, "button2");
    numberInput.appendChild(button);
    button = makeButton("3", function() {inputNumber(3)}, "button3");
    numberInput.appendChild(button);
    button = makeButton("←", function() {inputNumber(-1)}, "buttonBack");
    numberInput.appendChild(button);
    button = makeButton("4", function() {inputNumber(4)}, "button4");
    numberInput.appendChild(button);
    button = makeButton("5", function() {inputNumber(5)}, "button5");
    numberInput.appendChild(button);
    button = makeButton("6", function() {inputNumber(6)}, "button6");
    numberInput.appendChild(button);
    button = makeButton("7", function() {inputNumber(7)}, "button7");
    numberInput.appendChild(button);
    button = makeButton("8", function() {inputNumber(8)}, "button8");
    numberInput.appendChild(button);
    button = makeButton("9", function() {inputNumber(9)}, "button9");
    numberInput.appendChild(button);
    button = makeButton("Submit", function() {inputNumber(10)}, "buttonSubmit");
    numberInput.appendChild(button);
    button = makeButton("0", function() {inputNumber(0)}, "button0");
    numberInput.appendChild(button);
    button = makeButton(".", function() {inputNumber(".")}, "buttonDecimal");
    numberInput.appendChild(button);

  return numberInput;
}

function inputNumber(num) {
  let disp = document.getElementById("solutionDisplay");
  disp.innerHTML += num;
}

function makeSignInScreen() {
  clearElement(document.body);

  //root.style.setProperty("--bg-color", "hsla(0, 100%, 50%, 1)");

  let signInScreen = makeElement("div", "signInScreen", "screen");

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

  let problemScreen = makeElement("div", "problemScreen", "screen");

    let problemDisplay = makeElement("div", "problemDisplay");
      problemDisplay.innerHTML = "100 + 100 = ?";
    problemScreen.appendChild(problemDisplay);

    let solutionDisplay = makeElement("div", "solutionDisplay");
      //solutionDisplay.innerHTML = "2";
    problemScreen.appendChild(solutionDisplay);

    let numberInput = makeNumberInput()
    problemScreen.appendChild(numberInput);

  document.body.appendChild(problemScreen);
}

const root = document.documentElement;
