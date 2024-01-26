let testFunc = () => add(1, 9, 0, 1, 9, 0);

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

function testOnce() {
  /*----------------------------------------------------//
  //Runs the function to be tested one time and outputs //
  //  the answer and the equation                       //
  //----------------------------------------------------*/
  console.clear();
  let problem = testFunc();
  console.log(problem);
  let problemOutput = document.getElementById("problemOutput");
  problemOutput.innerHTML = `Answer: ${problem[0]}, Equation: ${problem[1]}`;
}

function analyzeFunction() {
  /*----------------------------------------------------//
  //Performs the analysis on the problem function       //
  //----------------------------------------------------//
  //----------------------------------------------------*/


  let statsCount = {};
  let statsPercent = {};

  //
  //Gets the number of times to run the function
  let cycles = document.getElementById("percentPass").value;

  //
  //Runs the function the set number of times and tallies
  //  up the number of times each answer is produced
  for (let i = 0; i < cycles; i++) {
    let problem = testFunc();
    let answer = problem[0];

    statsCount[answer] ? statsCount[answer]++ : statsCount[answer] = 1;
  }

  console.clear();
  console.log(statsCount);

  //
  //Makes an array of the answers produced
  let countKeys = Object.keys(statsCount);

  let max = 0;

  //
  //Finds the answer that was produced the most and 
  //  stores the percentage of times each answer was produced
  //  in a new object
  countKeys.forEach((number) => {
    max = max > statsCount[number] ? max : statsCount[number];
    statsPercent[number] = statsCount[number] / cycles;
  });

  console.log(statsPercent);

  let svgBox = document.getElementById("svgBox");
  clearElement(svgBox);
  //Makes an SVG element to put a graph in
  let svg = makeSVG("svg", "svgGraph");
  svg.setAttribute("viewBox", `0 0 ${countKeys.length} 5`);

  //
  //Makes a bar for a graph representing the number of times
  //  each answer was produced
  countKeys.forEach((number, i) => {
    let percent = (statsCount[number] / max) * 100;
    let rect = makeSVG("rect");
      rect.setAttribute("x", i);
      rect.setAttribute("y", `${100 - percent}%`);
      rect.setAttribute("width", 0.75);
      rect.setAttribute("height", `${percent}%`);
    svg.appendChild(rect);
  });

  svgBox.appendChild(svg);

}