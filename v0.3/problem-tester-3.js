let testFunc = () => add(1, 999, 0, 1, 999, 0);
//let testFunc = () => add(11, 99, 0, 1, 1, 1);
//let testFunc = () => add(1, 1, 1, 1, 9, 0);
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

  console.clear();

  let iterations = document.getElementById("iterations").value;

  let stats = {};

  for (let i = 0; i < iterations; i++) {

    let problem = testFunc();
    let answer = problem[0];


    if (answer in stats) {
      stats[answer].count++;
    } else {
      stats[answer] = {
        count: 1,
        percent: 0,
        sdm: 0
      }
    }
  }

  let statKeys = Object.keys(stats);
  stats.keys = statKeys;
  stats.pi_i = stats.keys.length ** -1;
  stats.expected = iterations / stats.keys.length;
  stats.avg = 0;
  stats.max = 0;
  stats.var = 0;
  stats.chiSquared = 0;


  statKeys.forEach((a, i) => {
    stats[a].percent = stats[a].count / iterations;
    stats.max = stats.max > stats[a].percent ? stats.max : stats[a].percent;
    stats.avg = ((stats.avg * i) + stats[a].percent) / (i + 1);
    stats.chiSquared += ((stats[a].count - stats.expected) ** 2) / stats.expected;
  });

  statKeys.forEach((a, i) => {
    stats[a].sdm = (stats.avg - stats[a].percent) ** 2;
    stats.var = ((stats.var * i) + stats[a].sdm) / (i + 1);
  });

  stats.sd = Math.sqrt(stats.var);
  stats.cv = stats.sd / stats.avg;

  makeGraph(stats);
}

function makeGraph(stats) {
  //----------------------------------------------------//
  //Makes the graph for my data                         //
  //----------------------------------------------------//
  //stats(object): the data structure that holds all the//
  //  statistical information                           //
  //----------------------------------------------------//

  console.log(stats.chiSquared);

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
    let sdTop = 100 - (((stats.avg + stats.sd) / stats.max) * 100);
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
      let percent = (stats[a].percent / stats.max) * 100;
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
        let deetPercent = `Percentage: ${(stats[a].percent * 100).toPrecision(4)}%, `;
        analysisDeets.innerHTML = deetAns + deetOcc + deetPercent;
        rect.setAttribute("fill", "chartreuse");
      });
      rect.addEventListener("mouseleave", (e) => {
        analysisDeets.innerHTML = "";
        rect.setAttribute("fill", "black");
      });
    });

    let idealAvgBaseline = 100 - ((stats.pi_i / stats.max) * 100);
    let idealAvgLine = makeSVG("line");
      idealAvgLine.setAttribute("x1", "0%");
      idealAvgLine.setAttribute("y1", `${idealAvgBaseline}%`);
      idealAvgLine.setAttribute("x2", "100%");
      idealAvgLine.setAttribute("y2", `${idealAvgBaseline}%`);
      idealAvgLine.setAttribute("stroke", "LawnGreen");
      idealAvgLine.setAttribute("stroke-width", ".25%");
    svg.appendChild(idealAvgLine);
    idealAvgLine.addEventListener("mouseenter", (e) => {
      let deetAvgPercent = `Ideal Average: ${(stats.pi_i * 100).toPrecision(4)}%, `;
      analysisDeets.innerHTML = deetAvgPercent;
      idealAvgLine.setAttribute("stroke", "chartreuse");
    });
    idealAvgLine.addEventListener("mouseleave", (e) => {
      analysisDeets.innerHTML = "";
      idealAvgLine.setAttribute("stroke", "LawnGreen");
    });

    //
    //Draws a green bar to indicate where the average is
    let avgBaseline = 100 - ((stats.avg / stats.max) * 100);
    let avgLine = makeSVG("line");
      avgLine.setAttribute("x1", "0%");
      avgLine.setAttribute("y1", `${avgBaseline}%`);
      avgLine.setAttribute("x2", "100%");
      avgLine.setAttribute("y2", `${avgBaseline}%`);
      avgLine.setAttribute("stroke", "green");
      avgLine.setAttribute("stroke-width", ".25%");
      avgLine.setAttribute("stroke-dasharray", "2% 2%");
    svg.appendChild(avgLine);
    avgLine.addEventListener("mouseenter", (e) => {
      let deetAvgPercent = `Average: ${(stats.avg * 100).toPrecision(4)}%, `;
      analysisDeets.innerHTML = deetAvgPercent;
      avgLine.setAttribute("stroke", "chartreuse");
    });
    avgLine.addEventListener("mouseleave", (e) => {
      analysisDeets.innerHTML = "";
      avgLine.setAttribute("stroke", "green");
    });

  svgBox.appendChild(svg);
}