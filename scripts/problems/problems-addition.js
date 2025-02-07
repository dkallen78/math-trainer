function toOrFrom(aMin, base) {
  //----------------------------------------------------//
  //Creates a mixed operations problem with a fixed     //
  //  addend or minuend                                 //
  //----------------------------------------------------//
  //aMin(integer): the minimum addend/subtrahend        //
  //base(integer): the number to be added to or         //
  //  subtracted from                                   //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

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
  //----------------------------------------------------//
  //Creates a mixed operations problem with a maximum   //
  //  sum/minuend                                       //
  //----------------------------------------------------//
  //aMax(integer): the max sum/minuend                  //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

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

  return rnd.index(solutions);
}

function add2(minSum, maxSum, sumMod, aMin, aMod) {
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
  let aSeed = rnd(aMin, sumSeed - aMin);
  let a = aSeed * (10 ** aMod);


  let solutions = [
    [sum, `${a} + ${sum - a} = ?`]
  ];

  return rnd.index(solutions);
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

  return rnd.index(solutions);
}
//
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
    [c, `${a} + ${b} = (${a} +&nbsp${stroke("?")}) + (${b} -&nbsp${stroke(c)})`],
    [c, `(${a} +&nbsp${stroke("?")}) + (${b} -&nbsp${stroke(c)}) = ${a} + ${b}`]
  ]

  return rnd.index(solutions);
}
//
function addPartCrossing10s(crossMin, crossMax, crossMod, mode) {
  //----------------------------------------------------//
  //Creates a crossing 10s problem that can be solved   //
  //  with partitioning                                 //
  //----------------------------------------------------//
  //crossMin(integer): the minimum value of the number  //
  //  to be crossed/bridged                             //
  //crossMax(integer): the maximum value of the number  //
  //  to be crossed/bridged                             //
  //crossMod(integer): the multiplicative modifier of   //
  //  the number to be crossed/bridged                  //
  //mode(integer):  determines what format the solution //
  //  will take                                         //
  //    1: partition missing-term problem               //
  //    2: standard 2-term problem                      //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//


  let cross = rnd(crossMin, crossMax) * (10 ** crossMod);
  let more = rnd(1, 8);
  let sum = cross + more;
  let b = rnd(more + 1, 9);
  let a = sum - b;
  if (a < b) {
    [a, b] = [b, a];
  }
  let b1 = cross - a;
  let b2 = b - b1;
  
  let solutions = [];

  switch(mode) {
    case 1:
      solutions = [
        //  a + b = [a + b1] + b2 = ?
        [sum, `${a} +&nbsp${stroke(b)}&nbsp=&nbsp${box(`${a} + ${stroke(b1)}`)}&nbsp+&nbsp${stroke(b2)}&nbsp= ?`],
        //  [a + b1] + b2 = a + b = ?
        [sum, `${box(`${a} + ${stroke(b1)}`)}&nbsp+&nbsp${stroke(b2)}&nbsp= ${a} +&nbsp${stroke(b)}&nbsp= ?`],
        //  ? = a + b = [a + b1] + b2
        [sum, `? = ${a} +&nbsp${stroke(b)}&nbsp=&nbsp${box(`${a} + ${stroke(b1)}`)}&nbsp+&nbsp${stroke(b2)}`],
        //  ? = [a + b1] + b2 = a + b
        [sum, `? =&nbsp${box(`${a} + ${stroke(b1)}`)}&nbsp+&nbsp${stroke(b2)}&nbsp= ${a} +&nbsp${stroke(b)}`]
      ];
      break;
    case 2:
      //c = rnd((b + 1), 9);
      solutions = [
        [sum, `${a} + ${b} = ?`],
        [sum, `${b} + ${a} = ?`],
        [sum, `? = ${a} + ${b}`],
        [sum, `? = ${b} + ${a}`]
      ]
  }

  return rnd.index(solutions);
}
//
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
      solutions = [
        [a, `${b} + ${a - b} = ?`],
        [a, `? = ${b} + ${a - b}`] 
      ];
      break;
  }

  return rnd.index(solutions);
}
//
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

  let solutions = [];

  switch(mode) {
    case 1:
      solutions = [
        [b, `${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)}&nbsp= (${stroke(a)}&nbsp+&nbsp${stroke("?")}) + ${c}`],     // a + b + c = (a + ?) + b
        [b, `(${stroke(a)}&nbsp+&nbsp${stroke("?")}) + ${c} =&nbsp${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)}`],     // (a + ?) + b = a + b + c
        [b, `${c} + (${stroke(a)}&nbsp+&nbsp${stroke("?")}) =&nbsp${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)}`],     // b + (a + ?) = a + b + c
        [b, `${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)}&nbsp= ${c} + (${stroke(a)}&nbsp+&nbsp${stroke("?")})`],     // a + b + c = b + (a + ?)
      ];
      break;
    case 2:
      solutions = [
        [(a + b + c), `${shake(a)}&nbsp+ ${c} +&nbsp${shake(b)}&nbsp= ?`],    // a + b + c = ?
        [(a + b + c), `${shake(a)}&nbsp+&nbsp${shake(b)}&nbsp+ ${c} = ?`],
        [(a + b + c), `${c} +&nbsp${shake(a)}&nbsp+&nbsp${shake(b)}&nbsp= ?`],
        [(a + b + c), `? =&nbsp${shake(a)}&nbsp+ ${c} +&nbsp${shake(b)}`],    // ? = a + b + c
        [(a + b + c), `? =&nbsp${shake(a)}&nbsp+&nbsp${shake(b)}&nbsp+ ${c}`],
        [(a + b + c), `? = ${c} +&nbsp${shake(a)}&nbsp+&nbsp${shake(b)}`]
      ];
      break;
  }

  return rnd.index(solutions);
}
//
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
  let solutions = [];

  switch(mode) {
    case 1:
      a = rnd(aLow, aHigh);
      b = rnd(bLow, bHigh);

      solutions = [
        [a, `${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}&nbsp= (${stroke(a)}&nbsp+&nbsp${stroke("?")}) + ${b}`],
        [a, `(${stroke(a)}&nbsp+&nbsp${stroke("?")}) + ${b} =&nbsp${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}`],
        [a, `${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}&nbsp= ${b} + (${stroke(a)}&nbsp+&nbsp${stroke("?")})`],
        [a, `${b} + (${stroke(a)}&nbsp+&nbsp${stroke("?")}) =&nbsp${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}`]
      ]
      break;
    case 2:
      let sum = rnd(((2 * aLow) + bLow), ((2 * aHigh) + bHigh));
      let dubMax = Math.floor((sum - 1) / 2);
      a = rnd(2, (dubMax < aHigh ? dubMax : aHigh));
      b = sum - (2 * a);

      solutions = [
        [sum, `${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}&nbsp= ?`],
        [sum, `? =&nbsp${stroke(a)}&nbsp+ ${b} +&nbsp${stroke(a)}`]
      ]
      break;
  }

  return rnd.index(solutions);
}
//
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

  return rnd.index(solutions);
}
//
function decompose(numDigits, unknown = -1) {
  //----------------------------------------------------//
  //Creates a decomposition problem                     //
  //----------------------------------------------------//
  //numDigits(integer): number of terms in the problem  //
  //unknown(integer): which digit will be the unknown   //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  //----------------------------------------------------//

  let digits = [];
  //
  //Creates the n-digit number that will be decomposed
  for (let i = 0; i < numDigits; i++) {
    digits.push(rnd(1, 9) * (10 ** i));
  }

  let number = digits.reduce((sum, current) => {
    return sum + current
  });
  //
  //Determines which digit will be the answer
  let unknownDigit = (unknown < 0) ? rnd(0, digits.length - 1) : unknown;
  let answer = digits[unknownDigit];
  digits[unknownDigit] = stroke("?");

  let output = digits.reduce((string, num, index, array) => {
    return string += (index !== array.length - 1) ? `${num}&nbsp+&nbsp` : `${num}`;
  }, "");  

  let output2 = digits.toReversed().reduce((string, num, index, array) => {
    return string += (index !== array.length - 1) ? `${num}&nbsp+&nbsp` : `${num}`;
  }, "");
  
  let solutions = [
    [answer, `${output}&nbsp= ${number}`],
    [answer, `${number} =&nbsp${output}`],
    [answer, `${output2}&nbsp= ${number}`],
    [answer, `${number} =&nbsp${output2}`],
  ];

  return rnd.index(solutions);
}
//
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
//
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
  

  return rnd.index(solutions);
}


//
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

  return rnd.index(solutions);
}
//
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
    [(cap - a), `${a} + ? = ${cap}`],   // a + ? = b
    [(cap - a), `? + ${a} = ${cap}`],   // ? + a = b
    [(cap - a), `${cap} = ${a} + ?`],   // b = a + ?
    [(cap - a), `${cap} = ? + ${a}`]    // b = ? + a
  ]

  return rnd.index(solutions);
}