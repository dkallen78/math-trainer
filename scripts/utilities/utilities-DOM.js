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

get.all = function(elem, selector) {
  return elem.querySelectorAll(selector);
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
  button.onclick = fnc;
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

make.nav = function(id, classes) {
  let nav = make("nav", id, classes);
  return nav;
}

make.section = function(id, classes) {
  let section = make("section", id, classes);
  return section;
}


make.svg = function(id, classes, viewBox) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  if (typeof id === "string") {svg.id = id}
  if (typeof classes === "string") {
    svg.classList.add(classes);
  } else if (typeof classes === "object") {
    classes.forEach(x => svg.classList.add(x));
  }
  if (typeof viewBox === "string") {
    svg.setAttribute("viewBox", viewBox);
  }
  return svg;
}

make.animate = function() {
  let animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  return animate;
}

make.animateTransform = function() {
  let animate = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
  return animate;
}

make.circle = function(x, y, r) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  return circle;
}

make.g = function(classes) {
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  if (typeof classes === "string") {
    g.classList.add(classes);
  }
  return g;
}

make.line = function(x1, y1, x2, y2, id, ...classes) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  if (typeof id === "string") {line.id = id}
  classes.forEach(x => line.classList.add(x));
  return line;
}

make.path = function(id, classes) {
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  if (typeof id === "string") {path.id = id}
  if (typeof classes === "string") {
    path.classList.add(classes);
  } else if (typeof classes === "object") {
    classes.forEach(x => path.classList.add(x));
  }
  return path;
}

make.rect = function(x, y, w, h, id, ...classes) {

  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", w);
  rect.setAttribute("height", h);
  if (typeof id === "string") {rect.id = id}
  classes.forEach(x => rect.classList.add(x));
  return rect;
}

make.text = function(x, y, txt, id, ...classes) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("font-family", "monospace");
  if (typeof id === "string") {text.id = id};
  classes.forEach(x => text.classList.add(x));
  text.innerHTML = txt;
  return text;
}

function remove(...elements) {
  //----------------------------------------------------//
  //Removes elements from the DOM                       //
  //----------------------------------------------------//
  //elements(DOM element): elements to be removed       //
  //----------------------------------------------------//

  elements.forEach(x => x.parentNode.removeChild(x));
}

remove.class = function(elem, ...classes) {
  classes.forEach(x => elem.classList.remove(x));
}

function set(elem, ...pairs) {
  pairs.forEach(pair => elem.setAttribute(pair[0], pair[1]))
}

set.class = function(elem, ...classes) {
  classes.forEach(c => elem.classList.add(c));
}

set.press = function(elem, fnc) {
  elem.addEventListener("keydown", fnc);
}