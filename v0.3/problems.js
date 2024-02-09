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