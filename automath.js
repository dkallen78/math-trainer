function rnd(floor, ceiling) {
  /*
  //Generates a random number within a range of numbers //
  //----------------------------------------------------//
  //floor(integer): lower bound of the random number    //
  //ceiling(integer): upper bound of the random number  //
  //----------------------------------------------------//
  //return(integer): random number w/in the range       //
  */

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

function addition(aLow, aHigh, aMod, bLow, bHigh, bMod) {
  /*
  //Creates an addition problem                         //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //aMod(integer): multiplicative modifier for the      //
  //  first term                                        //
  //bLow(integer): lowest number for the second term    //
  //bHigh(integer): highest number for the second term  //
  //bMod(integer): multiplicative modifier for the      //
  //  second term                                       //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh) * aMod;
  let b = rnd(bLow, bHigh) * bMod;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    answer = b;
    equation = `${a} + ? = ${a + b}`;
  }

  return [answer, equation];
}

function subtract(aLow, aHigh, aMod, bLow, bHigh, bMod) {

  let a = rnd(aLow, aHigh) * aMod;
  let b = rnd(bLow, bHigh) * bMod;

  if (b > a) {
    [a, b] = [b, a];
  }

  let answer = a - b;
  let equation = `${a} - ${b} = ?`;

  return [answer, equation];
}

function maxSum(max, maxMod = 1) {
  /*
  //Creates an addition problem with a maximum sum      //
  //----------------------------------------------------//
  //max(integer): maximum sum                           //
  //maxMod(integer): multiplicative modifier            //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(1, max - 1) * maxMod;
  let b = rnd(1, max - (a / maxMod)) * maxMod;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    answer = b;
    equation = `${a} + ? = ${a + b}`;
  }

  return [answer, equation];
}

function mixedOps(aLow, aHigh, aMod, bLow, bHigh, bMod) {
  /*
  //Creates an addition or subtraction problem          //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //aMod(integer): multiplicative modifier for the      //
  //  first term                                        //
  //bLow(integer): lowest number for the second term    //
  //bHigh(integer): highest number for the second term  //
  //bMod(integer): multiplicative modifier for the      //
  //  second term                                       //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh) * aMod;
  let b = rnd(bLow, bHigh) * bMod;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    while (a < b) {
      b = rnd(bLow, bHigh) * bMod;
    }
    answer = a - b;
    equation = `${a} - ${b} = ?`;
  }

  return [answer, equation];
}

function mixedThrees(aLow, aHigh, bLow, bHigh, cLow, cHigh) {

  let a = rnd(aLow, aHigh);
  let b = 0;
  let c = 0;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    b = rnd(bLow, bHigh);
    c = rnd(cLow, cHigh);
    while (c < (a + b)) {
      c = rnd(cLow, cHigh);
    }
    answer = (a + b) - c;
    equation = `${a} + ${b} - ${c} = ?`;
  } else {
    b = rnd(bLow, a);
    c = rnd(cLow, cHigh);
    answer = (a - b) + c;
    equation = `${a} - ${b} + ${c} = ?`;
  }

  return [answer, equation];
}

function doubles(aLow, aHigh, aMod, rangeLow, rangeHigh) {
  /*
  //Creates an near doubles addition problem            //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the term           //
  //aHigh(integer): highest number for the term         //
  //aMod(integer): multiplicative modifier for the      //
  //  doubles                                           //
  //rangeLow(integer): the low end of the potential     //
  //  difference between the double pair                //
  //rangeHigh(integer): the high end of the potential   //
  //  difference between the double pair                //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh) * aMod;
  let drift = rnd(rangeLow, rangeHigh);
  let answer = a + (a + drift);
  let equation = `${a} + ${a + drift} = ?`;

  return [answer, equation];
}

function upTo(aLow, aHigh, cap) {
  /*
  //Creates an addition problem that sums to a cap      //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //cap(integer): the number to add up to               //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = cap;
    equation = `${a} + ${cap - a} = ?`;
  } else {
    answer = cap - a;
    equation = `${a} + ? = ${cap}`;
  }

  return [answer, equation];
}

function nextMultiple(aLow, aHigh, aMod, multiple) {

  let a = rnd(aLow, aHigh) * aMod;
  while (a % 10 === 0) {
    a = rnd(aLow, aHigh);
  }
  let c = (Math.floor(a / multiple) + 1) * multiple;

  let answer = c - a;
  let equation = `${a} + ? = ${c}`;

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

function makeNumberPad() {
  /*
  //Makes and returns a div element with a number pad   //
  //  inside of it                                      //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  */

  let numberPad = makeElement("div", "numberPad");

    numberPad.appendChild(makeButton("1", function() {}, "button1"));
    numberPad.appendChild(makeButton("2", function() {}, "button2"));
    numberPad.appendChild(makeButton("3", function() {}, "button3"));
    numberPad.appendChild(makeButton("←", function() {}, "buttonBack"));
    numberPad.appendChild(makeButton("4", function() {}, "button4"));
    numberPad.appendChild(makeButton("5", function() {}, "button5"));
    numberPad.appendChild(makeButton("6", function() {}, "button6"));
    numberPad.appendChild(makeButton("7", function() {}, "button7"));
    numberPad.appendChild(makeButton("8", function() {}, "button8"));
    numberPad.appendChild(makeButton("9", function() {}, "button9"));
    numberPad.appendChild(makeButton("Submit", function() {}, "buttonSubmit"));
    numberPad.appendChild(makeButton("0", function() {}, "button0"));
    numberPad.appendChild(makeButton(".", function() {}, "buttonDecimal"));

  return numberPad;
}

function numPadOn() {
  /*
  //Enables the onclick functions of the number pad
  */

  document.getElementById("button1").onclick = function() {inputNumber("1")};
  document.getElementById("button2").onclick = function() {inputNumber("2")};
  document.getElementById("button3").onclick = function() {inputNumber("3")};
  document.getElementById("button4").onclick = function() {inputNumber("4")};
  document.getElementById("button5").onclick = function() {inputNumber("5")};
  document.getElementById("button6").onclick = function() {inputNumber("6")};
  document.getElementById("button7").onclick = function() {inputNumber("7")};
  document.getElementById("button8").onclick = function() {inputNumber("8")};
  document.getElementById("button9").onclick = function() {inputNumber("9")};
  document.getElementById("button0").onclick = function() {inputNumber("0")};
  document.getElementById("buttonBack").onclick = function() {inputNumber("-1")};
  document.getElementById("buttonDecimal").onclick = function() {inputNumber(".")};
}

function numPadOff() {
  /*
  //Disables the onclick functions of the number pad
  */

  document.getElementById("button1").onclick = "";
  document.getElementById("button2").onclick = "";
  document.getElementById("button3").onclick = "";
  document.getElementById("button4").onclick = "";
  document.getElementById("button5").onclick = "";
  document.getElementById("button6").onclick = "";
  document.getElementById("button7").onclick = "";
  document.getElementById("button8").onclick = "";
  document.getElementById("button9").onclick = "";
  document.getElementById("button0").onclick = "";
  document.getElementById("buttonBack").onclick = "";
  document.getElementById("buttonDecimal").onclick = "";
  document.getElementById("buttonSubmit").onclick = "";
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
      Removes the last input number. If the last input
        number was preceded by a decimal point, the
        decimal point is removed as well.
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

function getProblem() {
  /*
  //Gets a problem to display based on the user's level
  */

  let problem;
  if (user.activeLevel === 0) {
    problem = tests[user.testLevel][rnd(0, (tests[user.testLevel].length - 1))]();
  } else {
    problem = levels[user.activeLevel][rnd(0, (levels[user.activeLevel].length - 1))]();
  }

  displayProblem(problem);
}

function checkAnswer(answer, submission) {
  /*
  //Checks to see if the user's answer is correct       //
  //----------------------------------------------------//
  //answer(float): the correct answer to the problem    //
  //submission(float): the user's answer to the problem //
  */

  let problemDisplay = document.getElementById("problemDisplay");
  let solutionDisplay = document.getElementById("solutionDisplay");

  clearElement(solutionDisplay);

  if (answer === submission) {
    getProblem();
  } else {
    let interval = 50;
    problemDisplay.style.padding = "0 .5rem .5rem 0";
    setTimeout(function() {
      problemDisplay.style.padding = ".5rem 0 0 .5rem";
    }, interval);
    setTimeout(function() {
      problemDisplay.style.padding = "";
    }, (interval * 2));
  }
}

function displayProblem(problem) {
  /*
  //Displays a problem on the screen                    //
  //----------------------------------------------------//
  //problem(array[float, string]): the solution to the  //
  //  equation and a string representation of it        //
  */

  let problemDisplay = document.getElementById("problemDisplay");
  let solution = document.getElementById("solutionDisplay");

  problemDisplay.innerHTML = problem[1];

  numPadOn();
  document.getElementById("buttonSubmit").onclick = function() {
    checkAnswer(problem[0], parseFloat(solution.innerHTML, 10));
  }

}

function makeSignInScreen() {
  /*
  //Makes the screen that will display the sign in
  //  and register options
  */

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
  /*
  //Makes the screen that will display the different
  //  available modes
  */

  clearElement(document.body);

  let modeSelectScreen = makeElement("div", "modeSelectScreen", "screen");

    let letsGoButton = makeButton("Let's Go!", makeProblemScreen, "letsGoButton");
    modeSelectScreen.appendChild(letsGoButton);

  document.body.appendChild(modeSelectScreen);
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
          user.activeLevel = i;
          makeProblemScreen();
        };
      } else if (user.testLevel === i) {
        buttText = `Unlock Level ${i}`;
        buttFunc = function() {
          user.activeLevel = 0;
          makeProblemScreen();
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

function makeProblemScreen() {
  /*
  //Makes the screen that will display the math problems
  */

  function countdown(target, num, callback) {
    /*
    //Makes a countdown from a specified number, shrinking//
    //  and fading out the numbers as it counts down      //
    //----------------------------------------------------//
    //target(DOM element): the element in which the       //
    //  will be counted down                              //
    //num(integer): the number to count down from         //
    //callback(function): the function called when the    //
    //  numbers have finished counting down               //
    */

    let number = makeElement("div", num, "countDown");
      /*
    //puts the current number on the screen
    */
      number.innerHTML = num;
    target.appendChild(number);

    setTimeout(function() {
      /*
        Reduces the size and opacity of the countdown numbers
      */
      number.style.filter = "opacity(0%)";
      number.style.fontSize = "0rem";
    }, 10);

    setTimeout(function() {
      /*
        Removes the element with the number from the
          screen and either reccursively calls the next
          lower number, or the callback if there is no
          lower number
      */
      removeElement(number);
      if (num > 1) {
        countdown(target, num - 1, callback);
      } else {
        callback();
      }
    }, 1200);
  }

  clearElement(document.body);

  let problemScreen = makeElement("div", "problemScreen", "screen");

    let problemDisplay = makeElement("div", "problemDisplay");
      let readyButton = makeButton("Ready?", function() {
        fadeOutElement(function() {
          countdown(problemDisplay, 3, getProblem);
        }, readyButton);
      }, "readyButton");
      problemDisplay.appendChild(readyButton);
    problemScreen.appendChild(problemDisplay);

    let solutionDisplay = makeElement("div", "solutionDisplay");
    problemScreen.appendChild(solutionDisplay);

    let numberPad = makeNumberPad()
    problemScreen.appendChild(numberPad);

  document.body.appendChild(problemScreen);
}

const root = document.documentElement;


let user = {
  /*
    Data about the user
  */
  level: 1,
  testLevel: 2,
  activeLevel: 0
};

let levels = {
  "1": [
    () => mixedOps(1, 10, 1, 0, 10, 1),
    () => mixedOps(13, 19, 1, 0, 9, 1),
    () => mixedOps(10, 10, 1, 0, 9, 1),
    () => addition(1, 9, 1, 1, 9, 10),
    () => doubles(1, 9, 1, 1, 1)
  ],
  "2": [
    () => mixedOps(1, 10, 1, 1, 10, 1),
    () => addition(1, 9, 1, 1, 9, 10),
    () => subtract(1, 9, 10, 1, 9, 1),
    () => mixedOps(11, 99, 1, 1, 9, 1),
    () => mixedOps(11, 99, 1, 1, 9, 10),
    () => doubles(11, 30, 1, 1, 1),
    () => doubles(1, 6, 10, 1, 1)
  ],
  "3": [
    () => mixedThrees(1, 5, 1, 5, 1, 5),
    () => mixedOps(1, 10, 10, 11, 99, 1),
    () => mixedOps(11, 99, 1, 11, 99, 1),
    () => doubles(11, 30, 1, 1, 2),
    () => doubles(1, 9, 10, 10, 10)
  ]
};

let tests = {
  "1": [
    () => upTo(1, 9, 10),
    () => addition(2, 5, 1, 3, 5, 1),
    () => doubles(1, 9, 1, 0, 0)
  ],
  "2": [
    () => mixedOps(1, 10, 1, 0, 10, 1),
    () => maxSum(20, 1),
    () => maxSum(10, 10),
    () => nextMultiple(11, 89, 1, 10),
    () => doubles(1, 20, 1, 0, 0),
    () => doubles(1, 5, 10, 0, 0)
  ],
  "3": [
    () => addition(4, 9, 1, 4, 9, 1),
    () => subtract(10, 20, 1, 1, 19),
    () => mixedOps(1, 15, 10, 1, 10, 10),
    () => upTo(11, 89, 100),
    () => doubles(1, 10, 10, 0, 0)
  ]
};
