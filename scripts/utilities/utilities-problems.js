function stroke(text) {
  //----------------------------------------------------//
  //Places the input text into a custom <span>          //
  //----------------------------------------------------//
  //text(string): text to be placed in the <span>       //
  //----------------------------------------------------//
  //return(string): a pair of <span> tags between which //
  //  the input text is placed                          //
  //----------------------------------------------------//

  if (typeof text === "number") text = text.toString(10);
  return `<span class="span-stroke">${text}</span>`;
}

function box(text) {
  //----------------------------------------------------//
  //Places the input text into a custom <span>          //
  //----------------------------------------------------//
  //text(string): text to be placed in the <span>       //
  //----------------------------------------------------//
  //return(string): a pair of <span> tags between which //
  //  the input text is placed                          //
  //----------------------------------------------------//

  return `<span class="span-box">${text}</span>`;
}

function mathML(type) {

}

mathML.mover = function(bottom, top) {
  return `<mover><mn>${bottom}</mn><mn>${stroke(top)}</mn></mover>`;
}

mathML.mfrac = function(num, denom) {
  if (typeof num === "number") {
    num = `<mn>${num}</mn>`;
  } else {
    num = `<mi>${num}</mi>`;
  }

  if (typeof denom === "number") {
    denom = `<mn>${denom}</mn>`;
  } else {
    denom = `<mi>${denom}</mi>`;
  }

  return `<mfrac>${num}${denom}</mfrac>`;
}

function makeFracCircle(n) {
  //----------------------------------------------------//
  //Creates a number of wedges to form a circle         //
  //----------------------------------------------------//
  //n(integer): number of wedges to make                //
  //----------------------------------------------------//
  //return(SVG element): SVG element with the wedges    //
  //----------------------------------------------------//

  let svg = make.svg("svg-pie", "svg-pie", "0 0 100 100");
  //
  //Change in angle between each wedge
  let angleDelta = 360 / n;
  //
  //Distance from center to inner-most point
  let radius1 = 5;
  //
  //Distance from center to outer edge
  let radius2 = 48;
  //
  //I don't know why this works but it keeps my gaps consistent
  let gap = (angleDelta / 360) / 4;
  let gap2 = toDeg(2 * (Math.asin((100 * (gap / 2)) / radius2)));
  //
  //Angle off center of the inner-most point
  let angle0 = -90 + (angleDelta / 2);
  //
  //Angle of the outer counter-clockwise point
  let angle1 = -90 + (gap2 / 2);
  //
  //Angle of the outer clockwise point
  let angle2 = angle1 + angleDelta - gap2;
  
  let p1 = new Point(0, 0);
  let p2 = new Point(0, 0);
  let p3 = new Point(0, 0);

  let path;
  let g;

  for (let i = 0; i < n; i++) {
    //
    //Defines where the three points are
    p1.x = 50 + (Math.cos(toRad(angle0)) * radius1);
    p1.y = 50 + (Math.sin(toRad(angle0)) * radius1);
    p2.x = 50 + (Math.cos(toRad(angle1)) * radius2);
    p2.y = 50 + (Math.sin(toRad(angle1)) * radius2);
    p3.x = 50 + (Math.cos(toRad(angle2)) * radius2);
    p3.y = 50 + (Math.sin(toRad(angle2)) * radius2);
    //
    //M -> move to inner-most point
    //L -> line to ccw corner
    //A -> arc to cw corner
    //L -> line to inner-most point
    path = make.path(`path${i}`, "frac-paths-clear");
    //path.classList.add("frac-paths-clear");
    set(path, ["fill", "var(--text-color)"]);
    //path.setAttribute("fill", "var(--text-color)");
    set(path, ["d", `
      M ${p1.x} ${p1.y}
      L ${p2.x} ${p2.y}
      A ${radius2} ${radius2} 0 0 1 ${p3.x} ${p3.y}
      L ${p1.x} ${p1.y}
    `]);
    /*path.setAttribute("d", `
      M ${p1.x} ${p1.y}
      L ${p2.x} ${p2.y}
      A ${radius2} ${radius2} 0 0 1 ${p3.x} ${p3.y}
      L ${p1.x} ${p1.y}
    `);*/

    svg.appendChild(path);

    angle0 += angleDelta;
    angle1 = angle2 + gap2;
    angle2 = angle1 + angleDelta - gap2;
  }

  return svg;
}

function groupPaths(svg, n) {
  //----------------------------------------------------//
  //Animates a fraction circle to highlight groups of   //
  //  size n                                            //
  //----------------------------------------------------//
  //svg(element): the element with the paths to be      //
  //  grouped and animated                              //
  //n(integer): number of items in each group           //
  //----------------------------------------------------//

  //let paths = svg.querySelectorAll(".frac-paths-clear");
  let paths = get.all(svg, ".frac-paths-clear");
  let g;

  paths.forEach((p, i) => {
    //
    //removes the class so that the wedges can be animated
    p.classList.remove("frac-paths-clear");
    //
    //creates a new <g> element if the <path> is the 
    //  first in a group
    if ((i % n) === 0) {
      g = make.g();
    } 
    //
    //adds the <path> to the <g> if it is not the 
    //  last in the group
    if ((i % n) !== (n - 1)) {
      g.appendChild(p);
    //
    //creates the <animate> attributes if it is the 
    //  last <path> in the <g>
    } else {
      //
      //number of groups
      let groups = paths.length / n;
      let groupMod = (groups * 2);
      //
      //sets up the basic attributes for the <animate> element
      let ani = make.animate();
      ani.setAttribute("attributeName", "fill-opacity");
      ani.setAttribute("dur", `${groups}s`);
      ani.setAttribute("repeatCount", "indefinite");
      let aniVal = "";
      let aniKey = "";
      //
      //Creates the animation timings for the groups of wedges
      for (let j = 1; j <= groups; j++) {
        
        if (j === ((i + 1) / n)) {
          aniVal += "100;0";
        } else {
          aniVal += "0;0";
        }

        aniKey += `${((2 * j) - 2) / (groupMod)};${((2 * j) - 1) / (groupMod)}`;

        if (j < groups) {
          aniVal += ";";
          aniKey += ";";
        }
      }
      aniKey += `;1`;
      if (i + 1 === n) {
        aniVal += ";100";
      } else {
        aniVal += ";0";
      }
      ani.setAttribute("values", aniVal);
      ani.setAttribute("keyTimes", aniKey);
      //
      //adds the <path> and <animate> elements to the <g>
      //  then adds the <g> element to the <svg>
      g.appendChild(ani);
      g.appendChild(p);
      svg.appendChild(g);
    }
  });
}

function fillWedges(svg, n) {
  //----------------------------------------------------//
  //Fills in n wedges of the fraction circle in svg     //
  //----------------------------------------------------//
  //svg(element): the element with the paths to be      //
  //  filled in                                         //
  //n(integer): number of wedges to be filled in        //
  //----------------------------------------------------//

  let paths = svg.querySelectorAll(".frac-paths-clear");

  for (let i = 0; i < n; i++) {
    paths[i].classList.remove("frac-paths-clear");
  }
}

function negWedges(svg, n) {

  let paths = svg.querySelectorAll(".frac-paths-clear");

  for (let i = paths.length - 1; i >= n; i--) {
    paths[i].setAttribute("stroke-dasharray", "3 3");
  }
}

function makeFractionLine(n) {

  let svg = make.svg("svg-line");
  set(svg, ["viewBox", "0 0 200 10"]);
  let rect;
  let x = 0;
  let y = 0;
  let w = ((1/ n) * 200) - 3;
  let h = 10;

  for (let i = 0; i < n; i++) {

    x = ((i / n) * 200) + 1.5;
    rect = make.rect(x, y, w, h, null, "frac-paths-clear", "frac-rec");
    set(rect, ["fill", "var(--text-color)"]);
    svg.appendChild(rect);
  }

  return svg;
}

function findFactors(n) {
  //----------------------------------------------------//
  //Finds all the factors of a number except for itself //
  //  and 1                                             //
  //----------------------------------------------------//
  //n(integer): the number to find the factors of       //
  //----------------------------------------------------//
  //return(array[integer]): an array of factors         //
  //----------------------------------------------------//

  let factors = [];

  for (let i = 2; i <= (n / 2); i++) {
    
    if ((n % i) === 0) factors.push(i);
  }

  return factors;
}

function makeProducts(f1Min, f1Max, f2Min, f2Max) {
  //----------------------------------------------------//
  //Creates an object the keys of which are all the     //
  //  potential products in the given range; the values //
  //  of which are all the factors used to make them    //
  //----------------------------------------------------//
  //f1Min(integer): minimum value of the first product  //
  //f1Max(integer): maximum value of the first product  //
  //f2Min(integer): minimum value of the second product //
  //f2Max(integer): maximum value of the second product //
  //----------------------------------------------------//
  //return(object): a list of potential products and    //
  //  the factors used to produce them                  //
  //----------------------------------------------------//

  let answers = {};
  let p = 0;

  for (let i = f1Min; i <= f1Max; i++) {

    for (let j = f2Min; j <= f2Max; j++) {

      p = i * j;      

      if (p in answers) {
        answers[p].factors.push(i, j);
      } else {
        answers[p] = {
          factors: [i, j]
        }
      }
    }
  }

  answers.keys = Object.keys(answers);
  answers.keys.forEach((p) => {
    answers[p].factors = Array.from(answers[p].factors);
  });

  answers.randomProduct = function() {
    return parseInt(this.keys[rnd(0, this.keys.length - 1)], 10);
  }

  answers.randomFactor = function(p) {
    return this[p].factors[rnd(0, this[p].factors.length - 1)];
  }

  return answers;
}