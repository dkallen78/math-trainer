let testFunc = () => add(1, 9, 0, 1, 9, 0);
//let testFunc = () => add(11, 99, 0, 1, 1, 1);
//let testFunc = () => add(1, 1, 1, 1, 9, 0);


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
  let problemOutput = document.getElementById("problem-output");
  problemOutput.innerHTML = `Answer: ${problem[0]}, Equation: ${problem[1]}`;
}

function analyzeFunction() {

  let iterations = document.getElementById("averagePass").value;

  let bigStats = {};

  for (let i = 0; i < iterations; i++) {

    let statsCount = {};

    //
    //Gets the number of times to run the function
    let cycles = document.getElementById("percentPass").value;

    //
    //Runs the function multiple times, counting the number of 
    //  times each answer is produced
    for (let j = 0; j < cycles; j++) {
      let problem = testFunc();
      let answer = problem[0];

      //
      //If the answer has already been produced, it is incremented
      //  in the statsCount object
      //If it hasn't already been produced, it is created
      if (answer in statsCount) {
        statsCount[answer]++;
      } else {
        statsCount[answer] = 1;
      } 
    }

    let countKeys = Object.keys(statsCount);

    countKeys.forEach((answer, index) => {

      if (answer in bigStats) {
        bigStats[answer] += statsCount[answer];
      } else {
        bigStats[answer] = statsCount[answer];
      }
    });

  }

  console.clear();
  console.log(bigStats);

  let statsAvg = {};

  let bigKeys = Object.keys(bigStats);

  bigKeys.forEach((answer) => {
    statsAvg[answer] = bigStats[answer] / iterations;
  });

  console.log(statsAvg);

  let avgKeys = Object.keys(statsAvg);

  //
  //Finds the maximum value in the statsAvg object
  let max = 0;
  avgKeys.forEach((number) => {
    max = max > statsAvg[number] ? max : statsAvg[number];
  });

  let svgBox = document.getElementById("svgBox");
  clearElement(svgBox);
  //
  //Makes an SVG element to put a graph in
  let svg = makeSVG("svg", "svgGraph");
    //
    //Sets the length of the SVG element to the number 
    //  of answers to be graphed and the height to half that
    svg.setAttribute("viewBox", `0 0 ${avgKeys.length} ${avgKeys.length / 2}`);
    //
    //Iterates through statsAvg building a bar graph 
    //  based on the answer averages
    avgKeys.forEach((number, i) => {
      let percent = (statsAvg[number] / max) * 100;
      let rect = makeSVG("rect");
        rect.setAttribute("x", i);
        rect.setAttribute("y", `${100 - percent}%`);
        rect.setAttribute("width", 0.75);
        rect.setAttribute("height", `${percent}%`);
      svg.appendChild(rect);
    });

    //
    //Gets the average of the average answers produced
    let avgMean = Object.values(statsAvg).reduce((partialSum, a) => partialSum + a, 0) / avgKeys.length;
    console.log(avgMean);

    let avgBaseline = 100 - ((avgMean / max) * 100);

    let avgRect = makeSVG("rect");
      avgRect.setAttribute("x", "0%");
      avgRect.setAttribute("y", `${avgBaseline}%`);
      avgRect.setAttribute("width", "100%");
      avgRect.setAttribute("height", "1%");
      avgRect.setAttribute("style", "fill:rgb(0,255,0)");
    svg.appendChild(avgRect);

    let meanSquares = Object.values(statsAvg).map((x) => Math.abs(avgMean - x) ** 2);
    let variance = meanSquares.reduce((partialSum, a) => partialSum + a, 0) / avgKeys.length;
    let sd = Math.sqrt(variance);
    console.log(sd);

    let sdTop = 100 - (((avgMean + sd) / max) * 100);
    let sdHeight = ((sd * 2) / max) * 100;


    let sdRect = makeSVG("rect");
      sdRect.setAttribute("x", "0%");
      sdRect.setAttribute("y", `${sdTop}%`);
      sdRect.setAttribute("width", "100%");
      sdRect.setAttribute("height", `${sdHeight}%`);
      sdRect.setAttribute("fill", "green");
      sdRect.setAttribute("fill-opacity", "25%");
    svg.appendChild(sdRect);

  svgBox.appendChild(svg);
}

