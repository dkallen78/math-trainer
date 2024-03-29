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

make.header = function(id, classes) {
  let header = make("header", id, classes);
  return header;
}

make.main = function(id, classes) {
  let main = make("main", id, classes);
  return main;
}

function set() {

}

set.click = function(elem, fnc) {
  elem.addEventListener("click", fnc);
}

function get(id) {
  return document.getElementById(id);
}