//let testFunc = () => add(1, 9, 0, 1, 9, 0);
//let testFunc = () => add(11, 99, 0, 1, 1, 1);
let testFunc = () => add(1, 1, 1, 1, 9, 0);
//let testFunc = () => addPartCrossing10s(3, 9, 1, 2);


function makeSVG(type, id, ...classes) {
  //----------------------------------------------------//
  //Returns an SVG element of the type indicated        //
  //----------------------------------------------------//
  //type(string): type of SVG element to create         //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
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
  
  let problem = testFunc();
  console.clear();
  console.log(problem);
  let solution = document.getElementById("solution");
  let equation = document.getElementById("equation");
  solution.innerHTML = `Answer: ${problem[0]}`
  equation.innerHTML = `Equation: ${problem[1]}`;
}

function analyzeFunction() {
  
  let iterations = document.getElementById("averagePass").value;

  let stats = {};

  for (let i = 0; i < iterations; i++) {

    let count = document.getElementById("percentPass").value;

    let statsCount = {};
    //
    //Runs the function multiple times, counting the number of 
    //  times each answer is produced
    for (let j = 0; j < count; j++) {

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
    //
    //Iterates over the statsCount object, incrementing the count 
    //  and keeping track of the max
    Object.keys(statsCount).forEach((a) => {
      if (a in stats) {
        stats[a].count += statsCount[a];
        stats[a].max = stats[a].max > statsCount[a] ? stats[a].max : statsCount[a];
      } else {
        stats[a] = {
          count: statsCount[a],
          avg: 0,
          min: 0,
          max: statsCount[a], 
          sdm: 0
        }
      }
    });
  }

  let statKeys = Object.keys(stats);
  stats.keys = statKeys;
  stats.max = 0;
  stats.avgMean = 0;
  //
  //Iterates over the stats object finding the average for 
  //  each answer, the maximum average overall, and the average
  //  of all the averages
  statKeys.forEach((a, i) => {
    stats[a].avg = stats[a].count / iterations;
    stats.max = stats.max > stats[a].avg ? stats.max : stats[a].avg;
    stats.avgMean = ((stats.avgMean * i) + stats[a].avg) / (i + 1);
  });

  stats.var = 0;
  //
  //Iterates over the stats object finding the squared deviations
  //  from the mean for each average and the overall variance
  statKeys.forEach((a, i) => {
    stats[a].sdm = (stats.avgMean - stats[a].avg) ** 2;
    stats.var = ((stats.var * i) + stats[a].sdm) / (i + 1);
  });
  //
  //The standard deviation and the coefficient of variation
  stats.sd = Math.sqrt(stats.var);
  stats.cv = stats.sd / stats.avgMean;

  makeGraph(stats);
}

function makeGraph(stats) {
  //----------------------------------------------------//
  //Makes the graph for my data                         //
  //----------------------------------------------------//
  //stats(object): the data structure that holds all the//
  //  statistical information                           //
  //----------------------------------------------------//

  let svgBox = document.getElementById("svgBox");
  clearElement(svgBox);
  //
  //Makes an SVG element to put a graph in
  let svg = makeSVG("svg", "svgGraph");
    //
    //Sets the length of the SVG element to the number 
    //  of answers to be graphed and the height to half that
    //--------------------------------------------------------
    //If this 2:1 ratio is changed, it also has to be changed in the CSS
    //--------------------------------------------------------
    svg.setAttribute("viewBox", `0 0 ${stats.keys.length} ${stats.keys.length / 2}`);
    //
    //Draws the range of the standard deviation on the graph
    let sdTop = 100 - (((stats.avgMean + stats.sd) / stats.max) * 100);
    let sdHeight = ((stats.sd * 2) / stats.max) * 100;
    let sdRect = makeSVG("rect");
      sdRect.setAttribute("x", "0%");
      sdRect.setAttribute("y", `${sdTop}%`);
      sdRect.setAttribute("width", "100%");
      sdRect.setAttribute("height", `${sdHeight}%`);
      let color = stats.cv > 0.25 ? "red" : "green";
      sdRect.setAttribute("fill", color);
      sdRect.setAttribute("fill-opacity", "12.5%");
    svg.appendChild(sdRect);

    let analysisDeets = document.getElementById("analysis-deets");
    //
    //Iterates through statsAvg building a bar graph 
    //  based on the answer averages
    stats.keys.forEach((a, i) => {
      let percent = (stats[a].avg / stats.max) * 100;
      let rect = makeSVG("rect");
        rect.id = `rect-${i}`;
        rect.setAttribute("x", `${i + 0.1}`);
        rect.setAttribute("y", `${100 - percent}%`);
        rect.setAttribute("width", 0.8);
        rect.setAttribute("height", `${percent}%`);
        rect.setAttribute("fill", "black");
      svg.appendChild(rect);
      rect.addEventListener("mouseenter", (e) => {
        let deetAns = `Answer: ${a}, `;
        let deetOcc = `Occurrences: ${stats[a].count}, `;
        let deetPercent = `Percentage: ${(stats[a].avg * 100).toPrecision(4)}%, `;
        let deetMax = `Max: ${stats[a].max}`;
        analysisDeets.innerHTML = deetAns + deetOcc + deetPercent + deetMax;
        rect.setAttribute("fill", "chartreuse");
      });
      rect.addEventListener("mouseleave", (e) => {
        analysisDeets.innerHTML = "";
        rect.setAttribute("fill", "black");
      });
    });
    //
    //Draws a bright green bar to indicate where the average is
    let avgBaseline = 100 - ((stats.avgMean / stats.max) * 100);
    let avgLine = makeSVG("line");
      avgLine.setAttribute("x1", "0%");
      avgLine.setAttribute("y1", `${avgBaseline}%`);
      avgLine.setAttribute("x2", "100%");
      avgLine.setAttribute("y2", `${avgBaseline}%`);
      avgLine.setAttribute("stroke", "chartreuse");
      avgLine.setAttribute("stroke-width", ".25%");
    svg.appendChild(avgLine);
  svgBox.appendChild(svg);
}