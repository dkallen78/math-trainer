function clear(...elements) {
  //----------------------------------------------------//
  //Clears the innerHTML of any number of elements      //
  //----------------------------------------------------//
  //elements(DOM element): elements to be cleared       //
  //----------------------------------------------------//

  elements.forEach(x => x.innerHTML = "");
}

async function fadeTransition(element) {
  await fadeOut(document.body);
  clear(document.body);  
  document.body.appendChild(element);
  await fadeIn(document.body);
}

async function fadeOut(element) {
  //----------------------------------------------------//
  //Sets the opacity of an element to 0%                //
  //----------------------------------------------------//
  //elements(DOM element): elements to be faded         //
  //----------------------------------------------------//
  //return: Promise                                     //
  //----------------------------------------------------//

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
  //----------------------------------------------------//
  //Sets the opacity of an element to 100%              //
  //----------------------------------------------------//
  //elements(DOM element): elements to be shown         //
  //----------------------------------------------------//
  //return: Promise                                     //
  //----------------------------------------------------//

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

function get(id) {
  return document.getElementById(id);
}

function make(type, id, classes) {
  //----------------------------------------------------//
  //Returns an DOM element                              //
  //----------------------------------------------------//
  //type(string): type of DOM element to create         //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): DOM element                        //
  //----------------------------------------------------//

  let element = document.createElement(type);
  if (typeof id === "string") {element.id = id}
  if (typeof classes === "string") {
    element.classList.add(classes);
  } else if (typeof classes === "object") {
    classes.forEach(x => element.classList.add(x));
  }
  return element;
}

make.button = function(name, id, classes, fnc) {
  let button = make("button", id, classes);
  button.innerHTML = name;
  button.addEventListener("click", fnc)
  return button;
}

make.div = function(id, classes) {
  let div = make("div", id, classes);
  return div;
}

make.header = function(id, classes) {
  let header = make("header", id, classes);
  return header;
}

make.main = function(id, classes) {
  let main = make("main", id, classes);
  return main;
}

make.section = function(id, classes) {
  let section = make("section", id, classes);
  return section;
}

function set(elem, ...pairs) {
  pairs.forEach(pair => elem.setAttribute(pair[0], pair[1]))
}

set.class = function(elem, ...classes) {
  classes.forEach(c => elem.classList.add(c));
}

set.click = function(elem, fnc) {
  elem.addEventListener("click", fnc);
}