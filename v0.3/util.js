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

rnd.index = function(array) {
  //----------------------------------------------------//
  //returns a random element from an array              //
  //----------------------------------------------------//
  //array(array): array from which to return a random   //
  //  element                                           //
  //----------------------------------------------------//
  //return(*): randomly selected array element          //
  //----------------------------------------------------//


  return array[rnd(0, array.length - 1)];
}

function digitCount(num) {
  /*
  //Finds the number of digits in a number              //
  //----------------------------------------------------//
  //num(integer/float) the number whose digits are to   //
  //  be found                                          //
  //----------------------------------------------------//
  //return(integer): the number of digits               //
  */

  return num.toString(10).replace(".", "").length;
}


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

function makeSVG(type, id, ...classes) {
  //----------------------------------------------------//
  //Returns an SVG element of the type indicated        //
  //----------------------------------------------------//
  //type(string): type of SVG element to create         //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element       //
  //----------------------------------------------------//
  //return(element): SVG element                        //
  //----------------------------------------------------//

  let svg = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (typeof id === "string") {svg.id = id}
  classes.forEach(x => svg.classList.add(x));
  return svg;
}

makeSVG.rect = function(x, y, w, h, id, ...classes) {

  let rect = makeSVG("rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", w);
  rect.setAttribute("height", h);
  if (typeof id === "string") {rect.id = id}
  classes.forEach(x => rect.classList.add(x));
  return rect;
}

class Point {
	//----------------------------------------------------//
	//A data structure to make managing and representing	//
	//	Cartesian points easier														//
	//----------------------------------------------------//
	//x(float): x coordinate of the point									//
	//y(float): y coordinate of the point									//
	//----------------------------------------------------//

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

	static center(p1, p2) {
		//----------------------------------------------------//
		//Finds the center point between p1 and p2						//
		//----------------------------------------------------//
		//p1, p2(Point): points of which the center is to     //
    //  be found                                          //
		//----------------------------------------------------//
		//return(Point): the point at the midpoint between the//
		//	original two points																//
		//----------------------------------------------------//

		const midX = (p1.x + p2.x) / 2;
		const midY = (p1.y + p2.y) / 2;
		const newCenter = new Point(midX, midY);
		return newCenter;
	}

  static distance(p1, p2) {
    /*----------------------------------------------------//
    //Finds the  distance between two points on a         //
    //  cartesian plane using the Pythagorean theorem     //
    //----------------------------------------------------//
    //p1, p2(Point): points between which the distance    //
    //  is to be found                                    //
    //----------------------------------------------------//
    //return(float): distance between two points          //
    //----------------------------------------------------*/
  
    return (Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2))).toFixed(4);
  }

	static vector(p1, p2) {
		//----------------------------------------------------//
		//Finds the vector from p1 to p2											//
		//----------------------------------------------------//
		//p1, p2(Point): points on the vector to be found			//
		//----------------------------------------------------//
		//return(Point): the vector from p1 to p2							//
		//----------------------------------------------------//

		const vecX = (p1.x - p2.x);
		const vecY = (p1.y - p2.y);
		const newVector = new Point(vecX, vecY);
		return newVector;
	}
}

function toRad(deg) {
	//----------------------------------------------------//
	//Converts an angle in degrees to an angle in radians	//
	//----------------------------------------------------//
	//deg(float): angle to be converted to radians				//
	//----------------------------------------------------//
	//return(float): converted degrees in radians					//
	//----------------------------------------------------//

	return deg * (Math.PI / 180);
}

function toDeg(rad) {
	//----------------------------------------------------//
	//Converts an angle in radians to an angle in degrees	//
	//----------------------------------------------------//
	//deg(float): angle to be converted to degrees				//
	//----------------------------------------------------//
	//return(float): converted radians in degrees					//
	//----------------------------------------------------//

	return rad * (180 / Math.PI);
}

//--------------------------------------------------

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
  let animate = document.createElementNS("http://www.w3.org/2000/svg", "animnate");
  return animate;
}

make.g = function() {
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  return g;
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


function set(elem, ...pairs) {
  pairs.forEach(pair => elem.setAttribute(pair[0], pair[1]))
}

set.class = function(elem, ...classes) {
  classes.forEach(c => elem.classList.add(c));
}

set.click = function(elem, fnc) {
  elem.addEventListener("click", fnc);
}

function get(id) {
  return document.getElementById(id);
}

get.all = function(elem, selector) {
  return elem.querySelectorAll(selector);
}

function remove(...elements) {
  //----------------------------------------------------//
  //Removes elements from the DOM                       //
  //----------------------------------------------------//
  //elements(DOM element): elements to be removed       //
  //----------------------------------------------------//

  elements.forEach(x => x.parentNode.removeChild(x));
}

remove.click = function(elem, fnc) {
  elem.removeEventListener("click", fnc)
}