//let testFunc = () => add(1, 6, 0, 1, 6, 0);
//let testFunc = () => add(11, 99, 0, 1, 1, 1);
let testFunc = () => add.missingTerm(1, 9, 0, 10, 10, 0);
//let testFunc = () => circleTest(6);

function testOnce() {
  //----------------------------------------------------//
  //Runs the function to be tested one time and outputs //
  //  the answer and the equation                       //
  //----------------------------------------------------//
  
  let problem = testFunc();
  //console.log(problem);
  //let solution = document.getElementById("problem-output");
  let answer = document.getElementById("answer");
  let equation = document.getElementById("math-strategy-interface__problem-display");
  answer.innerHTML = `Answer: ${problem[0]}`;
  equation.innerHTML = `${problem[1]}`;
  console.log(equation.innerText, equation.innerText.length);
}

function analyzeFunction() {

  console.clear();
  //
  //Gets the number of times to get an answer from the function
  let iterations = document.getElementById("iterations").value;
  //
  //The object that will hold our statistics
  let stats = {};
  //
  //The loop that runs the function
  for (let i = 0; i < iterations; i++) {

    let problem = testFunc();
    let answer = problem[0];
    //
    //If we have produced the answer before, increment the count, 
    //  if not, create an object to track stats for that answer
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
  //
  //An array of all the answers produced
  let statKeys = Object.keys(stats);
  stats.keys = statKeys;
  //
  //The ideal probability of producing an answer given a
  //  uniform distribution of answers
  stats.pi_i = stats.keys.length ** -1;
  stats.expected = iterations / stats.keys.length;
  stats.avg = 0;
  stats.max = 0;
  stats.var = 0;
  stats.chiSquared = 0;

  statKeys.forEach((a, i) => {
    //
    //The percentage of times an answer was produced
    stats[a].percent = stats[a].count / iterations;
    stats.max = stats.max > stats[a].percent ? stats.max : stats[a].percent;
    //
    //The average of all the percentages
    stats.avg = ((stats.avg * i) + stats[a].percent) / (i + 1);
    stats.chiSquared += ((stats[a].count - stats.expected) ** 2) / stats.expected;
  });

  statKeys.forEach((a, i) => {
    //
    //The squared difference from the mean for each answer
    stats[a].sdm = (stats.avg - stats[a].percent) ** 2;
    //
    //The variance of the total set
    stats.var = ((stats.var * i) + stats[a].sdm) / (i + 1);
  });
  //
  //The standard deviation for the set
  stats.sd = Math.sqrt(stats.var);
  //
  //The coefficient of variance for the set
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

  //console.log(stats.chiSquared);

  const svgBox = get("svgBox");
  clear(svgBox);
  //
  //Makes an SVG element to put a graph in
  const svg = make.svg("svgGraph");
    //
    //Sets the length of the SVG element to the number 
    //  of answers to be graphed and the height to half that
    //--------------------------------------------------------
    //If this 2:1 ratio is changed, it also has to be changed in the CSS
    //--------------------------------------------------------
    svg.setAttribute("viewBox", `0 0 ${stats.keys.length} ${stats.keys.length / 2}`);
    //
    //Draws the range of the standard deviation on the graph
    const sdTop = 100 - (((stats.avg + stats.sd) / stats.max) * 100);
    const sdHeight = ((stats.sd * 2) / stats.max) * 100;
    const sdRect = make.rect("0%", `${sdTop}%`, "100%", `${sdHeight}%`);
      let color = stats.cv > 0.25 ? "red" : "green";
      sdRect.setAttribute("fill", color);
      sdRect.setAttribute("fill-opacity", "12.5%");
    svg.appendChild(sdRect);

    const analysisDeets = get("analysis-deets");
    //
    //Iterates through statsAvg building a bar graph 
    //  based on the answer averages
    stats.keys.forEach((a, i) => {
      const percent = (stats[a].percent / stats.max) * 100;
      const rect = make.rect(`${i + 0.1}`, `${100 - percent}%`, 0.8, `${percent}%`);
        rect.id = `rect-${i}`;
        rect.setAttribute("fill", "black");
      svg.appendChild(rect);
      rect.addEventListener("mouseenter", (e) => {
        const deetAns = `Answer: ${a}, `;
        const deetOcc = `Occurrences: ${stats[a].count}, `;
        const deetPercent = `Percentage: ${(stats[a].percent * 100).toPrecision(4)}%, `;
        analysisDeets.innerHTML = deetAns + deetOcc + deetPercent;
        rect.setAttribute("fill", "chartreuse");
      });
      rect.addEventListener("mouseleave", (e) => {
        analysisDeets.innerHTML = "";
        rect.setAttribute("fill", "black");
      });
    });

    console.log(stats.pi_i, stats.avg);

    const idealAvgBaseline = 100 - ((stats.pi_i / stats.max) * 100);
    const idealAvgLine = make.line("0%", `${idealAvgBaseline}%`, "100%", `${idealAvgBaseline}%`);
      idealAvgLine.setAttribute("stroke", "LawnGreen");
      idealAvgLine.setAttribute("stroke-width", ".25%");
    svg.appendChild(idealAvgLine);
    idealAvgLine.addEventListener("mouseenter", (e) => {
      const deetAvgPercent = `Ideal Average: ${(stats.pi_i * 100).toPrecision(4)}%, `;
      analysisDeets.innerHTML = deetAvgPercent;
      idealAvgLine.setAttribute("stroke", "chartreuse");
    });
    idealAvgLine.addEventListener("mouseleave", (e) => {
      analysisDeets.innerHTML = "";
      idealAvgLine.setAttribute("stroke", "LawnGreen");
    });

    //
    //Draws a green bar to indicate where the average is
    const avgBaseline = 100 - ((stats.avg / stats.max) * 100);
    const avgLine = make.line("0%", `${avgBaseline}%`, "100%", `${avgBaseline}%`);
      avgLine.setAttribute("stroke", "green");
      avgLine.setAttribute("stroke-width", ".25%");
      avgLine.setAttribute("stroke-dasharray", "2% 2%");
    svg.appendChild(avgLine);
    avgLine.addEventListener("mouseenter", (e) => {
      const deetAvgPercent = `Average: ${(stats.avg * 100).toPrecision(4)}%, `;
      analysisDeets.innerHTML = deetAvgPercent;
      avgLine.setAttribute("stroke", "chartreuse");
    });
    avgLine.addEventListener("mouseleave", (e) => {
      analysisDeets.innerHTML = "";
      avgLine.setAttribute("stroke", "green");
    });

  svgBox.appendChild(svg);
}
