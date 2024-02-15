function toOrFrom(aMin, base) {
  /*
  //Creates a mixed operations problem with a fixed     //
  //  addend or minuend                                 //
  //----------------------------------------------------//
  //aMin(integer): the minimum addend/subtrahend        //
  //base(integer): the number to be added to or         //
  //  subtracted from                                   //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aMin, (base - 1));

  let solutions = [
    [(base + a), `${base} + ${a} = ?`],
    [a, `${base} + ? = ${base + a}`],
    [(base - a), `${base} - ${a} = ?`],
    [a, `${base} - ? = ${base - a}`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function within(aMin, aMax) {
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

  let b = 0;
  let solutions = [];

  let chance = rnd(1, 5);

  
  if (chance === 1) {
    b = rnd(0, aMax - a);
    solutions = [
      [a, `${b} + ? = ${a + b}`],
      [a, `? + ${b} = ${a + b}`],
    ]
  } else if (chance === 2) {
    b = rnd(0, a);
    solutions = [[a, `${b} + ${a - b} = ?`]];
  } else if (chance === 3 || a >= aMax) {
    b = rnd(0, a - 1);
    solutions = [[a, `? - ${b} = ${a - b}`]];
  } else if (chance === 4) {
    b = rnd(a + 1, aMax);
    solutions = [[a, `${b} - ? = ${b - a}`]];
  } else {
    b = rnd(a, aMax);
    solutions = [[a, `${b} - ${b - a} = ?`]];
  }

  return solutions[rnd(0, solutions.length - 1)];
}

/*function threeDigitBreakDoubles(aMin, aMax, crackMin, crackMax) {
  let a = rnd(aMin, aMax);
  let b = rnd(crackMin, crackMax);

  return
}*/

//-----------------------------------------------------------
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

function add(aMin, aMax, aMod, bMin, bMax, bMod) {
  //----------------------------------------------------//
  //Creates an addition problem based on the parameters //
  //----------------------------------------------------//
  //aMin(integer): smallest possible value for the      //
  //  first addend                                      //
  //aMax(integer): largest possible value for the       //
  //  first addend                                      //
  //aMod(integer): multiplicative modifier for the      //
  //  first addend                                      //
  //bMin(integer): smallest possible value for the      //
  //  second addend                                     //
  //bMax(integer): largest possible value for the       //
  //  second addend                                     //
  //bMod(integer): multiplicative modifier for the      //
  //  second addend                                     //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//
  //POTENTIALLY UNBALANCED - TEST IMPLEMENTATION        //
  //----------------------------------------------------//
  
  
  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(bMin, bMax) * (10 ** bMod);

  let solutions = [
    [(a + b), `${a} + ${b} = ?`],
    [(a + b), `${b} + ${a} = ?`],
    [(a + b), `? = ${a} + ${b}`],
    [(a + b), `? = ${b} + ${a}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

function add2(minSum, maxSum, sumMod, aMod) {
  //----------------------------------------------------//
  //Creates an addition problem with two terms          //
  //----------------------------------------------------//
  //minSum(integer): smallest possible sum              //
  //maxSum(integer): largest possible sum               //
  //sumMod(integer): exponential modifier for the sum   //
  //aMod(integer): exponential modifier for the first   //
  //  term                                              //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//


  let sumSeed = rnd(minSum, maxSum);
  let sum = sumSeed * (10 ** sumMod);
  let aSeed = rnd(0, sumSeed);
  let a = aSeed * (10 ** aMod);


  let solutions = [
    [sum, `${a} + ${sum - a} = ?`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function add3(minSum, maxSum) {
  //----------------------------------------------------//
  //Creates an addition problem with three terms        //
  //----------------------------------------------------//
  //minSum(integer): smallest possible sum              //
  //maxSum(integer): largest possible sum               //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let sum = rnd(minSum, maxSum);
  let a = rnd(1, (sum - 2));
  let b = rnd(1, (sum - a - 1));
  let c = sum - (a + b);

  let solutions = [
    [sum, `${a} + ${b} + ${c} = ?`],
    [sum, `? = ${a} + ${b} + ${c}`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function addComp(aMin, aMax, aMod, cMin, cMax, cMod) {
  //----------------------------------------------------//
  //Creates a decomposition problem                     //
  //----------------------------------------------------//
  //aMin(integer): minimum value of the number to be    //
  //  compensated                                       //
  //aMax(integer): maximum value of the number to be    //
  //  compensated                                       //
  //aMod(integer): exponential modifier of the number   //
  //  to be compensated                                 //
  //cMin(integer): minimum value of the number by which //
  //  a is to be compensated                            //
  //cMax(integer): maximum value of the number by which //
  //  a is to be compensated                            //
  //cMod(integer): exponential modifier of the number   //
  //  by which a is to be compensated                   //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  aMod = 10 ** aMod;
  cMod = 10 ** cMod;

  let c = rnd(cMin, cMax) * cMod;
  let a = (rnd(aMin, aMax) * aMod) - c;
  let b = rnd(c + (1 * cMod), 9 * cMod);

  let solutions = [
    [c, `${a} +&nbsp${stroke(b)}&nbsp=&nbsp${box(`${a} +&nbsp${stroke("?")}`)}&nbsp+&nbsp${stroke(b - c)}`],
    [c, `${box(`${a} +&nbsp${stroke("?")}`)}&nbsp+&nbsp${stroke(b - c)}&nbsp= ${a} +&nbsp${stroke(b)}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

function addWithin(aMin, aMax, simple = true) {
  //----------------------------------------------------//
  //Creates an addition problem with a lower and upper  //
  //  bound                                             //
  //----------------------------------------------------//
  //aMin(integer): the smallest sum possible            //
  //aMax(integer): the largest sum possible             //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(aMin, aMax);
  let b = 0;
  let solutions = [];

  switch (simple) {
    case false:
      b = rnd(0, aMax - a);
      solutions = [
        [a, `${b} + ? = ${a + b}`],
        [a, `? + ${b} = ${a + b}`],
      ];
      break;
    case true:
      b = rnd(0, a);
      solutions.push([a, `${b} + ${a - b} = ?`]);
  }

  return solutions[rnd(0, solutions.length - 1)];

}

function broken10s(breakMin, breakMax, breakMod, crackMin, crackMax, cMin, cMax, mode) {
  //----------------------------------------------------//
  //Creates a three-term problem that has a broken      //
  //  factor of 10                                      //
  //----------------------------------------------------//
  //breakMin(integer): the smallest possible number to  //
  //  be broken                                         //
  //breakMax(integer): the largest possible number to   //
  //  be broken                                         //
  //breakMod(integer): multiplicative modifier for the  //
  //  number to be broken                               //
  //crackMin(integer): the smallest possible number by  //
  //  which to break the factor of 10                   //
  //crackMax(integer): the largest possible number by   //
  //  which to break the factor of 10                   //
  //cMin(integer): the smallest possible number of the  //
  //  extra term                                        //
  //cMax(integer): the largest possible number of the   //
  //  extra term                                        //
  //mode(integer): determines what format the solution  //
  //  will take                                         //
  //    1: reorder problem                              //
  //    2: standard 3-term problem                      //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let toBreak = rnd(breakMin, breakMax) * (10 ** breakMod);
  let b = rnd(crackMin, crackMax);

  let a = toBreak - b;
  let c = rnd(cMin, cMax);

  switch(mode) {
    case 1:
      return [b, `${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)}&nbsp= (${stroke(a)}&nbsp+&nbsp${stroke("?")}) + ${c}`];
      break;
    case 2:
      return [(a + b + c), `${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)} = ?`];
      break;
  }
}

function brokenDoubles(aLow, aHigh, bLow, bHigh, mode) {
  //----------------------------------------------------//
  //Creates a three-term problem that has a broken      //
  //  double                                            //
  //----------------------------------------------------//
  //aLow(integer): lowest potential value for double    //
  //aHigh(integer): highest potential value for double  //
  //bLow(integer): lowest potential value for third     //
  //  term of equation                                  //
  //bHigh(integer): highest potential vlaue for third   //
  //  term of equation                                  //
  //mode(integer): determines what format the solution  //
  //  will take                                         //
  //    1: reorder problem                              //
  //    2: standard 3-term problem                      //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a, b;

  switch(mode) {
    case 1:
      a = rnd(aLow, aHigh);
      b = rnd(bLow, bHigh);

      return [a, `${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}&nbsp= (${stroke(a)}&nbsp+&nbsp${stroke("?")}) + ${b}`];
      break;
    case 2:
      let sum = rnd(((2 * aLow) + bLow), ((2 * aHigh) + bHigh));
      let dubMax = Math.floor((sum - 1) / 2);
      a = rnd(2, (dubMax < aHigh ? dubMax : aHigh));
      b = sum - (2 * a);

      return [sum, `${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}&nbsp= ?`];
      break;
  }
}

function compIntro(mode) {
  //----------------------------------------------------//
  //Creates simple compensation addition problem        //
  //----------------------------------------------------//
  //mode(integer): determines how to organize the terms //
  //  in the equation                                   //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(1, 9);
  let b = rnd(1, 9);
  let solutions = [];

  switch(mode) {
    case 1:
      solutions = [
        [a, `${a} + (${b} - ${b}) = ?`],
        [a, `? + (${b} - ${b}) = ${a}`],
        [a, `(${b} - ${b}) + ${a} = ?`],
        [a, `(${b} - ${b}) + ? = ${a}`],
        [a, `${a} = ? + (${b} - ${b})`],
        [a, `${a} = (${b} - ${b}) + ?`],
        [a, `? = (${b} - ${b}) + ${a}`],
        [a, `? = ${a} + (${b} - ${b})`]
      ];
      break;
    case 2:
      solutions = [
        [b, `${a} + (${b} - ?) = ${a}`],
        [b, `${a} + (? - ${b}) = ${a}`],
        [b, `${a} = ${a} + (${b} - ?)`],
        [b, `${a} = ${a} + (? - ${b})`],
        [b, `(${b} - ?) + ${a} = ${a}`],
        [b, `(? - ${b}) + ${a} = ${a}`],
        [b, `${a} = (${b} - ?) + ${a}`],
        [b, `${a} = (? - ${b}) + ${a}`]
      ];
      break;
    case 3:
      solutions = [
        [a, `${stroke(b)}&nbsp+ ${a} -&nbsp${stroke(b)}&nbsp= ?`],
        [a, `${stroke(b)}&nbsp+ ? -&nbsp${stroke(b)}&nbsp= ${a}`],
        [a, `${a} =&nbsp${stroke(b)}&nbsp+ ? -&nbsp${stroke(b)}`],
        [a, `? =&nbsp${stroke(b)}&nbsp+ ${a} -&nbsp${stroke(b)}`]
      ];
      break;
    case 4:
      solutions = [
        [b, `${stroke(b)}&nbsp+ ${a} -&nbsp${stroke("?")}&nbsp= ${a}`],
        [b, `${stroke("?")}&nbsp+ ${a} -&nbsp${stroke(b)}&nbsp= ${a}`],
        [b, `${a} =&nbsp${stroke("?")}&nbsp+ ${a} -&nbsp${stroke(b)}`],
        [b, `${a} =&nbsp${stroke(b)}&nbsp+ ${a} -&nbsp${stroke("?")}`]
      ];
      break;
    
  }

  return solutions[rnd(0, solutions.length - 1)];

}

function decompose(numDigits) {
  //----------------------------------------------------//
  //Creates a decomposition problem                     //
  //----------------------------------------------------//
  //numDigits(integer): number of terms in the problem  //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//


  let digits = [];
  
  for (let i = 0; i < numDigits; i++) {
    digits.push(rnd(1, 9));
  }

  let unknownDigit = rnd(0, digits.length - 1);
  let output = "";
  let number = 0;
  
  digits.forEach((digit, index) => {
    let iNumber = digit * (10 ** index);
    number += iNumber;
    if (index === unknownDigit) {
      output = ` ? ${output}`;
    } else {
      output = ` ${(iNumber).toString(10)} ${output}`;
    }
    if (index !== digits.length - 1) {
      output = `+ ${output}`;
    }
  });

  let answer = digits[unknownDigit] * (10 ** unknownDigit);
  let solutions = [
    [answer, `${output} = ${number}`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function doubles(aLow, aHigh, aMod, rLow, rHigh) {
  //----------------------------------------------------//
  //Creates an near doubles addition problem            //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the term           //
  //aHigh(integer): highest number for the term         //
  //aMod(integer): multiplicative modifier for the      //
  //  doubles                                           //
  //rLow(integer): the low end of the potential         //
  //  difference between the double pair                //
  //rHigh(integer): the high end of the potential       //
  //  difference between the double pair                //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(aLow, aHigh) * aMod;
  let drift = rnd(rLow, rHigh);
  let answer = a + (a + drift);
  let equation = `${a} + ${a + drift} = ?`;

  return [answer, equation];
}

function addPartCrossing10s(aMin, aMax, aMod, mode) {
  //----------------------------------------------------//
  //Creates a crossing 10s problem that can be solved   //
  //  with partitioning                                 //
  //----------------------------------------------------//
  //aMin(integer): the minimum value of the number to   //
  //  be crossed/bridged                                //
  //aMax(integer): the maximum value of the number to   //
  //  be crossed/bridged                                //
  //aMod(integer): the multiplicative modifier of the   //
  //  number to be crossed/bridged                      //
  //mode(integer):  determines what format the solution //
  //  will take                                         //
  //    1: partition missing-term problem               //
  //    2: standard 2-term problem                      //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//


  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(1, 8);
  let c = 0;
  let solutions = [];

  switch(mode) {
    case 1:
      c = rnd(1, (9 - b));
      solutions = [
        [b, `${a - b} +&nbsp${stroke(b + c)}&nbsp=&nbsp<span class="span-box">${a - b} +&nbsp${stroke("?")}</span>&nbsp+&nbsp${stroke(c)}`],
        [b, `<span class="span-box">${a - b} +&nbsp${stroke("?")}</span>&nbsp+&nbsp${stroke(c)}&nbsp= ${a - b} +&nbsp${stroke(b + c)}`]
      ];
      break;
    case 2:
      c = rnd((b + 1), 9);
      solutions = [
        [(a + b), `${(a + b) - c} + ${c} = ?`],
        [(a + b), `? = ${(a + b) - c} + ${c}`]
      ]
  }

  return solutions[rnd(0, solutions.length - 1)];
}

function partitionNearDoubles(aMin, aMax, aMod, maxSplit, mode) {
  //----------------------------------------------------//
  //Creates a near doubles problem that can be solved   //
  //  with partitioning                                 //
  //----------------------------------------------------//
  //aMin(integer): the minimum value of the number to   //
  //  be doubled                                        //
  //aMax(integer): the maximum value of the number to   //
  //  be doubled                                        //
  //aMod(integer): the multiplicative modifier to apply //
  //  to the number to be doubled                       //
  //maxSplit(integer): the maximum deviation from the   //
  //  number to be doubled                              //
  //mode(integer):  determines what format the solution //
  //  will take                                         //
  //    1: missing-term problem                         //
  //    2: standard 2-term problem                      //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(aMin, aMax) * (10 ** aMod);
  let split = rnd(1, maxSplit);
  let solutions = [];

  switch(mode) {
    case 1:
      solutions = [
        [a, `${a} +&nbsp${stroke(a + split)}&nbsp= ${a} +&nbsp${stroke("?")}&nbsp+&nbsp${stroke(split)}`],
        [a, `${stroke(a + split)}&nbsp+ ${a} =&nbsp${stroke(split)}&nbsp+&nbsp${stroke("?")}&nbsp+ ${a}`]
      ]
      break;
    case 2:
      solutions = [
        [(a + a + split), `${a} + ${a + split} = ?`],
        [(a + a + split), `${a + split} + ${a} = ?`]
      ]
      break;
  }
  

  return solutions[rnd(0, solutions.length - 1)];
}

function reorder(aMin, aMax, t, op) {
  //----------------------------------------------------//
  //Creates a reorder problem                           //
  //----------------------------------------------------//
  //aMin(integer): the minimum term                     //
  //aMax(integer): the maximum term                     //
  //t(integer): number of terms in the problem          //
  //op(string): string of the operator to use           //
  //----------------------------------------------------//
  //return(array[float, string]): the correct term and  //
  //  a string representation of it                     //
  //----------------------------------------------------//

  let a = rnd(aMin, aMax);
  let b = rnd(aMin, aMax);
  let solutions = [];

  switch(t) {
    case 2:
      solutions = [
        [a, `${stroke(a)}&nbsp${op} ${b} = ${b} ${op}&nbsp${stroke("?")}`],
        [a, `${stroke("?")}&nbsp${op} ${b} = ${b} ${op}&nbsp${stroke(a)}`],
        [a, `${b} ${op}&nbsp${stroke(a)}&nbsp=&nbsp${stroke("?")}&nbsp${op} ${b}`],
        [a, `${b} ${op}&nbsp${stroke("?")}&nbsp=&nbsp${stroke(a)}&nbsp${op} ${b}`]
      ];
      break;
    case 3:
      let c = rnd(aMin, aMax);
      solutions = [
        [a, `${stroke(a)}&nbsp${op} ${b} ${op} ${c} = ${b} ${op} ${c} ${op}&nbsp${stroke("?")}`],
        [c, `${a} ${op} ${b} ${op}&nbsp${stroke(c)}&nbsp= ${b} ${op}&nbsp${stroke("?")}&nbsp${op} ${a}`],
        [b, `${a} ${op}&nbsp${stroke(b)}&nbsp${op} ${c} =&nbsp${stroke("?")}&nbsp${op} ${a} ${op} ${c}`],
        [c, `${a} ${op} ${b} ${op}&nbsp${stroke("?")}&nbsp= ${a} ${op}&nbsp${stroke(c)}&nbsp${op} ${b}`],
        [b, `${a} ${op}&nbsp${stroke("?")}&nbsp${op} ${c} =&nbsp${stroke(b)}&nbsp${op} ${c} ${op} ${a}`],
        [a, `${stroke("?")}&nbsp${op} ${b} ${op} ${c} = ${b} ${op} ${c} ${op}&nbsp${stroke(a)}`],
      ];
      break;
  }

  return solutions[rnd(0, solutions.length - 1)];
}

function singleDigitAddition(minSum, maxSum, mode) {
  //----------------------------------------------------//
  //Creates a single-digit addition problem with a      //
  //  minimum and maximum sum                           //
  //----------------------------------------------------//
  //minSum(integer): smallest possible sum              //
  //maxSum(integer): largest possible sum               //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let sum = rnd(minSum, maxSum);
  let a = rnd(1, 9);

  while ((sum - a) > 9 || (sum - a) < 0) {
    a = rnd(1, 9);
  }

  let solutions = [
    [sum, `${a} + ${sum - a} = ?`],
    [sum, `? = ${a} + ${sum - a}`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function upTo(aMin, cap) {
  //----------------------------------------------------//
  //Creates an addition problem with a fixed sum        //
  //----------------------------------------------------//
  //aMin(integer): the minimum addend                   //
  //cap(integer): the sum to add up to                  //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(aMin, cap);

  let solutions = [
    [(cap - a), `${a} + ? = ${cap}`],
    [(cap - a), `? + ${a} = ${cap}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

function idFractions(nMin, nMax, dMin, dMax, mode) {
  //----------------------------------------------------//
  //Creates a fraction identification problem           //
  //----------------------------------------------------//
  //nMin(integer): minimum potential value for the      //
  //  numerator                                         //
  //nMax(integer): maximum potential value for the      //
  //  numerator                                         //
  //dMin(integer): minimum potential value for the      //
  //  denominator                                       //
  //dMax(integer): maximum potential value for the      //
  //  denominator                                       //
  //mode(integer): determines the type of problem       //
  //    0: missing denominator problem                  //
  //    1: missing numerator problem                    //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let num = 0;
  let denom = 0;
  let answer = 0;
  let solutions = [];
  let fraction = "";

  switch(mode) {
    //
    //Unknown denominator problem
    case 0:
      denom = rnd(dMin, dMax);
      nMax = nMax > denom ? denom : nMax;
      num = rnd(nMin, nMax);
      fraction = `<math>${mathML.mfrac(num, "?")}</math>`;
      answer = denom;
      break;
    //
    //Unknown numerator problem
    case 1:
      num = rnd(nMin, nMax);
      dMin = dMin < num ? num : dMin;
      denom = rnd(dMin, dMax)
      fraction = `<math>${mathML.mfrac("?", denom)}</math>`;
      answer = num;
      break;
  }

  let svgP = makeFracCircle(denom);
  negWedges(svgP, num);

  let svgL = makeFractionLine(denom);
  fillWedges(svgL, num);
  solutions = [
    [answer, `${svgP.outerHTML} ${fraction}`],
    [answer, `<div id="column">${fraction} ${svgL.outerHTML}</div>`]
  ];

  return rnd.index(solutions);
}

//----------------------------------------------------------------

function downTo(aMin, aMax, floorMin, floorMax, floorMod) {

  let a = rnd(aMin, aMax);
  let floor = rnd(floorMin, floorMax) * floorMod;

  return [a, `${floor + a} - ? = ${floor}`];
}

function subWithin(difMin, difMax, simple = true) {
  //----------------------------------------------------//
  //Creates a subtraction problem within a range of     //
  //  possible differences                              //
  //----------------------------------------------------//
  //difMin(integer): minimum possible difference        //
  //difMax(integer): maximum possible difference        //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(difMin, difMax);
  let b = 0;
  let solutions = [];

  switch (simple) {
    case false:
      b = rnd(difMin, difMax);
      if (a >= b) {
        solutions.push(
          [b, `${a} - ? = ${a - b}`],
          [a, `? - ${b} = ${a - b}`]
        )
      } else {
        solutions.push(
          [a, `${b} - ? = ${b - a}`],
          [b, `? - ${a} = ${b - a}`]
        )
      }
      break;
    case true:
      b = rnd(a, difMax);
      solutions.push( 
        [a, `${b} - ${b - a} = ?`],
        [a, `? = ${b} - ${b - a}`]
      );
      break;
  }

  return solutions[rnd(0, solutions.length - 1)];
}

function takeFrom(aMin, aMax, aMod) {
  //----------------------------------------------------//
  //Creates a subtraction problem with a set minuend    //
  //----------------------------------------------------//
  //aMin(integer): the minimum value of the minuend     //
  //aMax(integer): the maximum value of the minuend     //
  //aMod(integer): the multiplicative modifier to be    //
  //  applied to the minuend                            //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(1, 9);

  let solutions = [
    [(a - b), `${a} - ${b} = ?`],
    [(a - b), `? = ${a} - ${b}`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function subPartCrossing10s(aMin, aMax, aMod, mode) {
  //----------------------------------------------------//
  //Creates a crossing 10s problem that can be solved   //
  //  with partitioning                                 //
  //----------------------------------------------------//
  //aMin(integer): the minimum value of the number to   //
  //  be crossed/bridged                                //
  //aMax(integer): the maximum value of the number to   //
  //  be crossed/bridged                                //
  //aMod(integer): the multiplicative modifier of the   //
  //  number to be crossed/bridged                      //
  //mode(integer):  determines what format the solution //
  //  will take                                         //
  //    1: partition missing-term problem               //
  //    2: standard 2-term problem                      //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(1, 8);
  let c;

  switch(mode) {
    case 1:
      c = rnd(1, (9 - b));
      return [b, `${a + b} -&nbsp${stroke(b + c)}&nbsp=&nbsp<span class="span-box">${a + b} -&nbsp${stroke("?")}</span>&nbsp-&nbsp${stroke(c)}`];
    case 2:
      c = rnd((b + 1), 9);
      return [(a - b), `${(a - b) + c} - ${c} = ?`];
  }

  return [(a - b), `${(a - b) + c} - ${c} = ${(a - b) + c} - ? - ${b}`];
  //return [(c - b), `${(a - b) + c} - ${c} = ${(a - b) + c} - ? - ${b}`];
}

function subDecomp(aMin, aMax, tenMin, tenMax, mode) {
  //----------------------------------------------------//
  //Creates a subtraction decomposition problem where   //
  //  the user has to find one of the subtrahends       //
  //----------------------------------------------------//
  //aMin(integer): the minimum value of ones place of   //
  //  the subtrahend to be generated                    //
  //aMax(integer): the maximum value of ones place of   //
  //  the subtrahend to be generated                    //
  //tenMin(integer): the minimum value of the tens place//
  //  of the subtrahend to be generated                 //
  //tenMax(integer): the maximum value of the tens place//
  //  of the subtrahend to be generated                 //
  //mode(integer):  determines what format the solution //
  //  will take                                         //
  //    1: find the missing ones part                   //
  //    2: find the missing tens part                   //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(aMin, aMax);
  let aTen = rnd(tenMin, tenMax);
  let b = rnd(a + 1, aMax + 1);
  let bTen = rnd(aTen, tenMax);
  aTen *= 10;
  b += bTen * 10
  let solutions = [];

  switch(mode) {
    case 1:
      solutions = [
        [a, `${b} - ${a + aTen} = ${b} - ${aTen} - ?`],
        [a, `${b} - ${aTen} - ? = ${b} - ${a + aTen}`]
      ];
      break;
    case 2:
      solutions = [
        [aTen, `${b} - ${a + aTen} = ${b} - ? - ${a}`],
        [aTen, `${b} - ? - ${a} = ${b} - ${a + aTen}`]
      ];
      break;
  }

  return solutions[rnd(0, solutions.length - 1)];
}

function subNoBorrow(dMin, dMax, dTenMin, dTenMax) {
  //----------------------------------------------------//
  //Creates a two-digit subtraction problem that does   //
  //  not need borrowing to be solved                   //
  //----------------------------------------------------//
  //dMin(integer): the minimum value of the ones place  //
  //  of the difference                                 //
  //dMax(integer): the maximum value of the ones place  //
  //  of the difference                                 //
  //dTenMin(integer): the minimum value of the tens     //
  //  place of the difference                           //
  //dTenMax(integer): the maximum value of the tens     //
  //  place of the difference                           //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let d = rnd(dMin, dMax);
  let dTen = rnd(dTenMin, dTenMax);
  let s = rnd(dMin, dMax + 1 - d);
  let sTen = rnd (1, dTenMax + 1 - dTen);
  d += dTen * 10;
  s += sTen * 10;
  let m = d + s;

  let solutions = [
    [d, `${m} - ${s} = ?`],
    [d, `? = ${m} - ${s}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

//----------------------------------------------------------------

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

function repeatedAddition() {
  //----------------------------------------------------//
  //Creates a repeated addition problem on one side of  //
  //  the equation and a multiplication problem on the  //
  //  other side                                        //
  //----------------------------------------------------//
  //                                                    //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let a = rnd(2, 9);
  let m = rnd(1, 3);
  let addPart = "";
  let solutions = [];

  for (let i = 1; i <= m; i++) {

    addPart += (i !== m) ? `${a} + ` : `${stroke(a)}`;

    /*if (i !== m) {
      addPart += `${a} + `;
    } else {
      addPart += `${stroke(a)}`;
    }*/
  }

  solutions = [
    [a, `${addPart} = ${stroke("?")} × ${m}`],
    [a, `${addPart} = ${m} × ${stroke("?")}`],
    [a, `${stroke("?")} × ${m} = ${addPart}`],
    [a, `${m} × ${stroke("?")} = ${addPart}`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function multiply(mdMin, mdMax, mrMin, mrMax, mode) {
  //----------------------------------------------------//
  //Creates a multiplication problem with a min and max //
  //  product and a min and max multiplier              //
  //----------------------------------------------------//
  //mdMin(integer): minimum possible multiplicand       //
  //mdMax(integer): maximum possible multiplicand       //
  //mrMin(integer): minimum possible multiplier         //
  //mrMax(integer): maximum possible multiplier         //
  //mode(integer):  determines what format the solution //
  //  will take                                         //
  //    1: standard equation                            //
  //    2: missing-term equation                        //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//
  
  let solutions = [];
  let p = 0;
  let mr = 0;
  let md = 0;

  switch(mode) {
    case 1:
      
      let answers = makeProducts(mdMin, mdMax, mrMin, mrMax);

      p = answers.randomProduct();
      mr = answers.randomFactor(p);
      md = p / mr;

      solutions = [
        [p, `${md} × ${mr} = ?`],
        [p, `${mr} × ${md} = ?`],
        [p, `? = ${md} × ${mr}`],
        [p, `? = ${mr} × ${md}`]
      ];
      break;
    case 2:
      mr = rnd(mrMin, mrMax);
      md = rnd(mdMin, mdMax);
      p = md * mr;

      solutions = [
        [md, `? × ${mr} = ${p}`],
        [md, `${mr} × ? = ${p}`],
        [md, `${p} = ? × ${mr}`],
        [md, `${p} = ${mr} × ?`],
        //[mr, `${md} × ? = ${p}`],
        //[mr, `? × ${md} = ${p}`],
        //[mr, `${p} = ${md} × ?`],
        //[mr, `${p} = ? × ${md}`]
      ];
      break;
  }
  
  return solutions[rnd(0, solutions.length - 1)];

}

function dPropIntro(mdMin, mdMax, mrMin, mrMax, splitMin, splitMax) {
  //----------------------------------------------------//
  //Creates a missing term associative property         //
  //  multiplication problem                            //
  //----------------------------------------------------//
  //mdMin(integer): minimum possible multiplicand       //
  //mdMax(integer): maximum possible multiplicand       //
  //mMin(integer): minimum possible multiplier          //
  //mMax(integer): maximum possible multiplier          //
  //splitMin(integer): minimum value by which to split  //
  //  the multiplier                                    //
  //splitMax(integer): maximum value by which to split  //
  //  the multiplier                                    //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let md = rnd(mdMin, mdMax);
  let mr = rnd(mrMin, mrMax);
  let split = rnd(splitMin, splitMax);
  mr -= split;

  let solutions = [
    [mr + split, `(${md} ×&nbsp${stroke(split)}) + (${md} ×&nbsp${stroke(mr)}) = ${md} ×&nbsp${stroke("?")}`],
    [mr + split, `(${stroke(split)}&nbsp× ${md}) + (${stroke(mr)}&nbsp× ${md}) =&nbsp${stroke("?")}&nbsp× ${md}`],
    [mr + split, `${md} ×&nbsp${stroke("?")}&nbsp= (${md} ×&nbsp${stroke(split)}) + (${md} ×&nbsp${stroke(mr)})`],
    [mr + split, `${stroke("?")}&nbsp× ${md} = (${stroke(split)}&nbsp× ${md}) + (${stroke(mr)}&nbsp× ${md})`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function aPropIntro(f1Min, f1Max, f2Min, f2Max, f3Min, f3Max) {
  //----------------------------------------------------//
  //Creates a missing term associative property         //
  //  multiplication problem                            //
  //----------------------------------------------------//
  //f1Min(integer): minimum value for the first term    //
  //f1Max(integer): maximum value for the first term    //
  //f2Min(integer): minimum value for the second term   //
  //f2Max(integer): maximum value for the second term   //
  //f3Min(integer): minimum value for the third term    //
  //f3Max(integer): maximum value for the third term    //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let f1 = rnd(f1Min, f1Max);
  let products = makeProducts(f2Min, f2Max, f3Min, f3Max);
  let p = products.randomProduct();
  let f2 = products.randomFactor(p);
  let f3 = p / f2;
  
  let solutions = [
    [p, `${f1} × (${stroke(f2)}&nbsp×&nbsp${stroke(f3)}) = ${f1} ×&nbsp${stroke("?")}`],
    [p, `${f1} ×&nbsp${stroke("?")}&nbsp= ${f1} × (${stroke(f2)}&nbsp×&nbsp${stroke(f3)})`]
  ];

  return rnd.index(solutions);
}

function aProp(f1Min, f1Max, f2) {
  //----------------------------------------------------//
  //Creates a problem to solve using the associative    //
  //  property of multiplication                        //
  //----------------------------------------------------//
  //f1Min(integer): minimum value for the first term    //
  //f1Max(integer): maximum value for the first term    //
  //f2(integer): value of the second term               //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let products = makeProducts(f1Min, f1Max, f2, f2);

  let p = products.randomProduct();
  let f1 = p / f2;
  let f3 = rnd.index(findFactors(f2));
  let f4 = f2 / f3;

  let solutions = [
    [p, `${f1} × ${stroke(f2)} = (${f1} × ${stroke(f3)}) × ${stroke(f4)} = ?`],
    [p, `(${f1} × ${stroke(f3)}) × ${stroke(f4)} = ${f1} × ${stroke(f2)} = ?`],
    [p, `? = ${f1} × ${stroke(f2)} = (${f1} × ${stroke(f3)}) × ${stroke(f4)}`],
    [p, `? = (${f1} × ${stroke(f3)}) × ${stroke(f4)} = ${f1} × ${stroke(f2)}`]
  ];

  return rnd.index(solutions);
}

function dPropSingle(f1Min, f1Max, f2, f3Min, f3Max) {
  //----------------------------------------------------//
  //Creates a missing term associative property         //
  //  multiplication problem                            //
  //----------------------------------------------------//
  //mdMin(integer): minimum possible multiplicand       //
  //mdMax(integer): maximum possible multiplicand       //
  //mMin(integer): minimum possible multiplier          //
  //mMax(integer): maximum possible multiplier          //
  //splitMin(integer): minimum value by which to split  //
  //  the multiplier                                    //
  //splitMax(integer): maximum value by which to split  //
  //  the multiplier                                    //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let products = makeProducts(f1Min, f1Max, f2, f2);
  let p = products.randomProduct();
  let f1 = p / f2;
  let f3 = rnd(f3Min, f3Max);
  let f4 = f2 - f3;
  

  let solutions = [
    [p, `${f1} × ${stroke(f2)} = ?<br>(${f1} × ${stroke(f3)}) + (${f1} × ${stroke(f4)}) = ?`],
  ];

  return rnd.index(solutions);
}

//-------------------------------------------------------

function sequence(gap, startMin, startMax, gapMod = 1, startMod = 1) {
  //----------------------------------------------------//
  //Creates a missing term sequence problem             //
  //----------------------------------------------------//
  //gap(integer): the difference between each number in //
  //  the sequence                                      //
  //startMin(integer): the minimum starting value of    //
  //  the sequence                                      //
  //startMax(integer): the maximum starting value of    //
  //  the sequence                                      //
  //gapMod(integer): 1 or -1 to determine wither the    //
  //  sequence is additive or subtractive               //
  //startMod(integer): multiplicitive modifier to set   //
  //  the factor of the starting value                  //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let start = rnd(startMin, startMax) * startMod;
  gap *= gapMod
  let g1 = start;
  let g2 = start + gap;
  let g3 = g2 + gap;
  let g4 = g3 + gap;
  let g5 = g4 + gap;
  let g6 = g5 + gap;
  let g7 = g6 + gap;

  let solutions = [
    [g7, `${g1}, ${g2}, ${g3}, ${g4}, ${g5}, ${g6}, ${stroke("?")}`],
    [g6, `${g1}, ${g2}, ${g3}, ${g4}, ${g5}, ${stroke("?")}, ${g7}`],
    [g5, `${g1}, ${g2}, ${g3}, ${g4}, ${stroke("?")}, ${g6}, ${g7}`],
    [g4, `${g1}, ${g2}, ${g3}, ${stroke("?")}, ${g5}, ${g6}, ${g7}`],
    [g3, `${g1}, ${g2}, ${stroke("?")}, ${g4}, ${g5}, ${g6}, ${g7}`],
    [g2, `${g1}, ${stroke("?")}, ${g3}, ${g4}, ${g5}, ${g6}, ${g7}`],
    [g1, `${stroke("?")}, ${g2}, ${g3}, ${g4}, ${g5}, ${g6}, ${g7}`]
  ];

  return rnd.index(solutions);

}

//-------------------------------------------------------
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

mathML.mo = {
  
}

function divIntro() {
  //----------------------------------------------------//
  //Creates simple, introductory division problems      //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let t1 = rnd(0, 9);
  let t2 = 0;
  let solutions = [];

  if (t1 === 0) {
    t2 = rnd(1, 9);
    solutions = [
      [0, `<math>${mathML.mfrac(stroke(0), t2)}</math>&nbsp=&nbsp${stroke("?")}&nbsp÷ ${t2} = 0`],
      [0, `<math>${mathML.mfrac(stroke("?"), t2)}</math>&nbsp=&nbsp${stroke(0)}&nbsp÷ ${t2} = 0`],
      [0, `${stroke("?")}&nbsp÷ ${t2} =&nbsp<math>${mathML.mfrac(stroke(0), t2)}</math>&nbsp= 0`],
      [0, `${stroke(0)}&nbsp÷ ${t2} =&nbsp<math>${mathML.mfrac(stroke("?"), t2)}</math>&nbsp= 0`],
    ];
  } else {
    solutions = [
      [t1, `<math>${mathML.mfrac(t1, stroke(t1))}</math>&nbsp= ${t1} ÷&nbsp${stroke("?")}&nbsp= 1`],
      [t1, `<math>${mathML.mfrac(stroke(t1), t1)}</math>&nbsp=&nbsp${stroke("?")}&nbsp÷ ${t1} = 1`],
      [t1, `<math>${mathML.mfrac(stroke(t1), 1)}</math>&nbsp=&nbsp${stroke("?")}&nbsp÷ 1 = ${t1}`],
      [t1, `<math>${mathML.mfrac(t1, stroke("?"))}</math>&nbsp= ${t1} ÷&nbsp${stroke(t1)}&nbsp= 1`],
      [t1, `<math>${mathML.mfrac(stroke("?"), t1)}</math>&nbsp=&nbsp${stroke(t1)}&nbsp÷ ${t1} = 1`],
      [t1, `<math>${mathML.mfrac(stroke("?"), 1)}</math>&nbsp=&nbsp${stroke(t1)}&nbsp÷ 1 = ${t1}`],
      [t1, `${t1} ÷&nbsp${stroke("?")}&nbsp=&nbsp<math>${mathML.mfrac(t1, stroke(t1))}</math>&nbsp= 1`],
      [t1, `${stroke("?")}&nbsp÷ ${t1} =&nbsp<math>${mathML.mfrac(stroke(t1), t1)}</math>&nbsp= 1`],
      [t1, `${stroke("?")}&nbsp÷ 1 =&nbsp<math>${mathML.mfrac(stroke(t1), 1)}</math>&nbsp= ${t1}`],
      [t1, `${t1} ÷&nbsp${stroke(t1)}&nbsp=&nbsp<math>${mathML.mfrac(t1, stroke("?"))}</math>&nbsp= 1`],
      [t1, `${stroke(t1)}&nbsp÷ ${t1} =&nbsp<math>${mathML.mfrac(stroke("?"), t1)}</math>&nbsp= 1`],
      [t1, `${stroke(t1)}&nbsp÷ 1 =&nbsp<math>${mathML.mfrac(stroke("?"), 1)}</math>&nbsp= ${t1}`],
    ];
  }

  return rnd.index(solutions);
}

function divIdent(t1Min, t1Max) {

  let t1 = rnd(t1Min, t1Max);

  let exp1 = `${t1} ÷ 1`;
  let exp2 = `<math>${mathML.mfrac(t1, 1)}</math>`

  let solutions = [
    [t1, `${t1} × 1 = ${exp1} = ?`],
    [t1, `${t1} × 1 = ${exp2} = ?`]
  ];

  return rnd.index(solutions);
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
      let ani = makeSVG("animate");
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

function circleDiv(qMin, qMax, t1Max, t2 = 0) {
  //----------------------------------------------------//
  //Creates a division problem that uses a pie array    //
  //  as a hint                                         //
  //----------------------------------------------------//
  //qMin(integer): minimum value of the quotient        //
  //  ** should be at least 2 unless t2 is set          //
  //qMax(integer): maximum value of the quotient        //
  //t1Max(integer): maximum value of the dividend       //
  //  ** only used if t2 isn't set                      //
  //  ** should be at least qMax * 2                    //
  //t2(integer): optional value for the second term     //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let q = rnd(qMin, qMax);
  //
  //If no divisor is specified, creates an array of 
  //  potential divisors given a maximum dividend (t1Max)
  if (t2 === 0) {

    let t2s = [];
    
    for (let i = (t1Max / 2); i >= 2; i--) {

      if (i * q <= t1Max) {
        t2s.push(i);
      }
    }
    //
    //Picks a divisor at random from the array
    t2 = rnd.index(t2s);
  } 
  
  let t1 = q * t2;
  
  let svg = makeFracCircle(t1);
  groupPaths(svg, q);

  let solutions = [
    [q, `${svg.outerHTML} <math>${mathML.mfrac(t1, t2)}</math>&nbsp= ${t1} ÷ ${t2} = ?`]
  ];

  return rnd.index(solutions);
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

function lineTest() {

  let num = rnd(1, 9);
  denom = rnd(num + 1, 10);
  let svg = makeFractionLine(denom);
  fillWedges(svg, num);
  let svgExp = `${svg.outerHTML}`;

  let fraction = mathML.mfrac("?", denom);
  let fracExp = `<math>${fraction}</math>`;

  return [num, `<div id="column">${fracExp} ${svgExp}</div>`];
}