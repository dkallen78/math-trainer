let testFunc = () => reorderBreak(1, 1, 1, 1, 9, 1, 9);

function testOnce() {
  let problem = testFunc();
  let problemOutput = document.getElementById("problemOutput");
  problemOutput.innerHTML = `Answer: ${problem[0]}, Equation: ${problem[1]}`;
}

function deepTest() {

  let iterations = 1000;

  let totals = [];
  
  for (let i = 0; i <= iterations; i++) {

    let results = {};

    let items = 60;

    for (let j = 0; j <= items; j++) {
      let problem = testFunc();

      results[problem[0]] ? results[problem[0]]++ : results[problem[0]] = 1;
    }

    let keys = Object.keys(results);

    let percent = keys.map((element) => {
      return results[element] / items;
    })

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
