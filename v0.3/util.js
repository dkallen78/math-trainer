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
  button.type = "button";
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

async function fadeOut(element) {
  /*
  //Sets the opacity of an element to 0%                //
  //----------------------------------------------------//
  //elements(DOM element): elements to be faded         //
  //----------------------------------------------------//
  //return: Promise                                     //
  */

  return new Promise((resolve, reject) => {
    const event = new AbortController();

    element.style.filter = "opacity(0%)";

    element.addEventListener("transitionend", (e) => {
      e.stopImmediatePropagation();
      event.abort();
      resolve();
    }, {signal: event.signal})
  })
}

async function fadeIn(element) {
  /*
  //Sets the opacity of an element to 100%              //
  //----------------------------------------------------//
  //elements(DOM element): elements to be shown         //
  //----------------------------------------------------//
  //return: Promise                                     //
  */

  return new Promise((resolve, reject) => {
    const event = new AbortController();

    element.style.filter = "opacity(100%)";

    element.addEventListener("transitionend", (e) => {
      e.stopImmediatePropagation();
      event.abort();
      resolve();
    }, {signal: event.signal})
  })
}