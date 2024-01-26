let testFunc = () => add(1, 9, 1, 1, 9, 0);

function testOnce() {
  /*
  //Runs the function to be tested one time and outputs //
  //  the answer and the equation                       //
  */
  console.clear();
  let problem = testFunc();
  console.log(problem);
  let problemOutput = document.getElementById("problemOutput");
  problemOutput.innerHTML = `Answer: ${problem[0]}, Equation: ${problem[1]}`;
}

function deepTest() {
  /*
  //Runs the function thousands of times to check that  //
  //  it has a flat distribution curve                  //
  //----------------------------------------------------//
  //To start, it runs the function a number of times    //
  //  equal to the items variable, keeping track of the //
  //  number of times an answer comes up                //
  //----------------------------------------------------//
  //It does this the number of times in the iterations  //
  //  variable. Each time it iterates, it calculates the//
  //  percentage of times an answer is produced and     //
  //  maintains a running average of percentages for    //
  //  that answer                                       //
  //----------------------------------------------------//
  //Finally, it produces an SVG graph to quickly        //
  //  visualize the distribution curve of the answers   //
  */

  //let iterationNum = document.getElementById("averagePass").value;

  let iterations = document.getElementById("averagePass").value;

  let totals = [];
  
  for (let i = 0; i <= iterations; i++) {

    let results = {};

    let items = document.getElementById("percentPass").value;

    for (let j = 0; j <= items; j++) {
      let problem = testFunc();

      //stores the number of times an answer is produced in 
      //  an object. The key is the answer and the value is
      //  the number of times that answer is produced
      results[problem[0]] ? results[problem[0]]++ : results[problem[0]] = 1;
    }

    //produces an array of the keys of the results object.
    //  The keys are the answers produced in the previous
    //  for loop
    let keys = Object.keys(results);

    //produces an array of the percentage of times each
    //  answer was produced
    let percent = keys.map((element) => {
      return results[element] / items;
    })

    //stores the percentages in a new array that has index
    //  parity with the percent array. If a percentage is
    //  already present in the index, an average of the 
    //  new percentage and all previous percentages is 
    //  calculated
    percent.forEach((elem, i) => {
      if (totals[i]) {
        let oldTotal = totals[i][0] * totals[i][1];
        let newTotal = oldTotal + elem;
        totals[i][1]++;
        totals[i][0] = newTotal / totals[i][1];
      } else {
        totals[i] = [elem, 1];
      }
    })
  }

  let finalOutput = "";


  let svgBox = document.getElementById("svgBox");
  clearElement(svgBox);
  
  //Makes an SVG element to put a graph in
  let svg = makeSVG("svg", "svgGraph");
  svg.setAttribute("viewBox", `0 0 ${totals.length} ${totals.length / 2}`);

  let sum = 0;

  totals.forEach((elem, i) => {
    let percent = Math.floor(elem[0] * 100);
    sum += percent;
    finalOutput += `${i + 1}: ${percent}%; `;
    let rect = makeSVG("rect");
      rect.setAttribute("x", i);
      rect.setAttribute("y", `${(100 - percent)}%`);
      rect.setAttribute("width", 0.75);
      rect.setAttribute("height", `${percent}%`);
    svg.appendChild(rect);
  })

  let avg = sum / totals.length;

  let rect = makeSVG("rect");
    rect.setAttribute("x", 0);
    rect.setAttribute("y", `${100 - avg}%`);
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "1%");
    rect.setAttribute("style", "fill:rgb(0,255,0)");
  svg.appendChild(rect);

  let deepOutput = document.getElementById("deepOutput");
  deepOutput.innerHTML = finalOutput;

  svgBox.appendChild(svg);
}

function makeSVG(type) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (arguments.length > 1) {svg.id = arguments[1]};
  return svg;
}

function randomCheck() {

  console.clear();
  
  let results = {};

  let items = 1000;

  for (let i = 0; i <= items; i++) {
    let problem = doubles(1, 5, 1, 1, 1);

    results[problem[0]] ? results[problem[0]]++ : results[problem[0]] = 1;

  }

  console.log(results);

  let keys = Object.keys(results);

  //console.log(keys);

  let percent = keys.map((element) => {
    return results[element] / items;
  })

  console.log(percent);

  let count = 0;

  /*average = results.reduce((total, current) => {
    count++;
    return total += current;
  }) / count;

  let deviation = [];

  results.forEach((e, i) => {
    deviation[i] = (e - average)**2;
  })

  let devSum = deviation.reduce((total, current) => {
    return total += current;
  })

  let variance = devSum / (count - 1);

  let sd = Math.sqrt(variance);

  console.clear()
  console.log(results);
  console.log(sd);
  console.log(average);*/
}

/*
//Unbalanced function museum
*/

function withinX(aMin, aMax) {
    /*
    //Creates a mixed operations problem with a maximum   //
    //  sum/minuend                                       //
    //----------------------------------------------------//
    //aMax(integer): the max sum/minuend                  //
    //----------------------------------------------------//
    //return(array[float, string]): the answer to the     //
    //  equation and a string representation of it        //
    */

    let a = rnd(aMin, aMax);
    let b = rnd(0, a - 1);

    let solutions = [
    [a, `${b} + ${a - b} = ?`],
    [b, `? + ${a - b} = ${a}`],
    [(a - b), `${b} + ? = ${a}`],
    [a, `? - ${b} = ${a - b}`],
    [b, `${a} - ? = ${a - b}`],
    [(a - b), `${a} - ${b} = ?`]
    ];

    return solutions[rnd(0, solutions.length - 1)];
}
