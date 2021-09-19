function rnd(floor, ceiling) {
  //----------------------------------------------------//
  //Generates a random number within a range of numbers //
  //----------------------------------------------------//
  //floor(integer): lower bound of the random number    //
  //ceiling(integer): upper bound of the random number  //
  //----------------------------------------------------//
  //return(integer): random number w/in the range       //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

function mixedOps(aLow, aHigh, bLow, bHigh) {
  let a = rnd(aLow, aHigh);
  let b = rnd(bLow, bHigh);
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    if (a < b) {
      [a, b] = [b, a];
    }
    answer = a - b;
    equation = `${a} - ${b} = ?`;
  }

  return [answer, equation];
}

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

function removeElement(...elements) {
  /*
  //Removes elements from the DOM                       //
  //----------------------------------------------------//
  //elements(DOM element): elements to be removed      //
  */

  elements.forEach(x => x.parentNode.removeChild(x));
}

function fadeOutElement(callback, ...elements) {
  /*
  //Takes a number of elements, fades them to 0%        //
  //  opacity, then removes them from the DOM           //
  //----------------------------------------------------//
  //elements(DOM element): elements to be faded         //
  */

  elements.forEach(function(x) {
    x.style.filter = "opacity(0%)";

    x.addEventListener("transitionend", function(e) {
      x.parentNode.removeChild(x);
      e.stopImmediatePropagation();
      callback();
    });
  });
}

function makeNumberInput() {
  //----------------------------------------------------//
  //Makes and returns a div element with a number pad   //
  //  inside of it                                      //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  //----------------------------------------------------//

  let numberInput = makeElement("div", "numberInput");

    let button = makeButton("1", function() {inputNumber("1")}, "button1");
    numberInput.appendChild(button);
    button = makeButton("2", function() {inputNumber("2")}, "button2");
    numberInput.appendChild(button);
    button = makeButton("3", function() {inputNumber("3")}, "button3");
    numberInput.appendChild(button);
    button = makeButton("←", function() {inputNumber("-1")}, "buttonBack");
    numberInput.appendChild(button);
    button = makeButton("4", function() {inputNumber("4")}, "button4");
    numberInput.appendChild(button);
    button = makeButton("5", function() {inputNumber("5")}, "button5");
    numberInput.appendChild(button);
    button = makeButton("6", function() {inputNumber("6")}, "button6");
    numberInput.appendChild(button);
    button = makeButton("7", function() {inputNumber("7")}, "button7");
    numberInput.appendChild(button);
    button = makeButton("8", function() {inputNumber("8")}, "button8");
    numberInput.appendChild(button);
    button = makeButton("9", function() {inputNumber("9")}, "button9");
    numberInput.appendChild(button);
    button = makeButton("Submit", function() {inputNumber("10")}, "buttonSubmit");
    numberInput.appendChild(button);
    button = makeButton("0", function() {inputNumber("0")}, "button0");
    numberInput.appendChild(button);
    button = makeButton(".", function() {inputNumber(".")}, "buttonDecimal");
    numberInput.appendChild(button);

  return numberInput;
}

function inputNumber(num) {
  /*
  //Adds a number to the solutionDisplay element        //
  //----------------------------------------------------//
  //num(string): either a number/symbol to display or a //
  //  numeric code                                      //
  //  -1: backspace                                     //
  //  10: submit answer                                 //
  */

  let display = document.getElementById("solutionDisplay");

  if (num === "-1") {
    /*
    //Removes the last input number. If the last input    //
    //  number was preceded by a decimal point, the       //
    //  decimal point is removed as well.                 //
    */

    let current = display.innerHTML;
    if (current[current.length - 2] === ".") {
      display.innerHTML = current.slice(0, -2);
    } else {
      display.innerHTML = current.slice(0, -1);
    }
  } else if (num === "10") {

  } else {
    display.innerHTML += num;
  }

}

function makeSignInScreen() {
  clearElement(document.body);

  let signInScreen = makeElement("div", "signInScreen", "screen");

    let titleDiv = makeElement("div", "titleDiv");
      titleDiv.innerHTML = "AutoMath";
    signInScreen.appendChild(titleDiv);

    let signInButton = makeButton("Sign In", makeModeSelectScreen, "signInButton");
    signInScreen.appendChild(signInButton);

    let registerButton = makeButton("Register", makeProblemScreen, "registerButton");
    signInScreen.appendChild(registerButton);


  document.body.appendChild(signInScreen);
}

function makeModeSelectScreen() {
  clearElement(document.body);

  let modeSelectScreen = makeElement("div", "modeSelectScreen", "screen");

    let letsGoButton = makeButton("Let's Go!", makeProblemScreen, "letsGoButton");
    modeSelectScreen.appendChild(letsGoButton);

  document.body.appendChild(modeSelectScreen);
}

function makeProblemScreen() {

  function countDown(target, callback) {

    function fadeNumber (element) {
      //----------------------------------------------------//
      //Transitions of the number element                   //
      //----------------------------------------------------//

      element.style.filter = "opacity(0%)";
      element.style.fontSize = "0rem";
    }

    let three = makeElement("div", "three", "countDown");
      three.innerHTML = "3";
    target.appendChild(three);
    setTimeout(function() {
      fadeNumber(three);
    }, 20);

    setTimeout(function() {
      removeElement(three);
      let two = makeElement("div", "two", "countDown");
        two.innerHTML = "2";
      target.appendChild(two);
      setTimeout(function() {
        fadeNumber(two);
      }, 20);
    }, 1200);

    setTimeout(function() {
      removeElement(two);
      let one = makeElement("div", "one", "countDown");
        one.innerHTML = "1";
      target.appendChild(one);
      setTimeout(function() {
        fadeNumber(one);
      }, 20);
    }, 2400);

    /*setTimeout(function() {
      clearElement(target);
      //startButton.style.display = "table";
      callback();
    }, 3400);*/
  }

  clearElement(document.body);

  let problemScreen = makeElement("div", "problemScreen", "screen");

    let problemDisplay = makeElement("div", "problemDisplay");
      let readyButton = makeButton("Ready?", function() {
        fadeOutElement(function() {
          countDown(problemDisplay, null);
        },
        readyButton);
      }, "readyButton");
      problemDisplay.appendChild(readyButton);
    problemScreen.appendChild(problemDisplay);

    let solutionDisplay = makeElement("div", "solutionDisplay");
    problemScreen.appendChild(solutionDisplay);

    let numberInput = makeNumberInput()
    problemScreen.appendChild(numberInput);

  document.body.appendChild(problemScreen);
}

const root = document.documentElement;
