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
    [c, `${a} +&nbsp${stroke(b)}&nbsp=&nbsp${box(`${a} +&nbsp${stroke("?")}`)}&nbsp+&nbsp${stroke(b - c)}`],
    [c, `${box(`${a} +&nbsp${stroke("?")}`)}&nbsp+&nbsp${stroke(b - c)}&nbsp= ${a} +&nbsp${stroke(b)}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}
//
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
      solutions.push([a, `${b} + ${a - b} = ?`]);
  }

  return solutions[rnd(0, solutions.length - 1)];

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

  switch(mode) {
    case 1:
      return [b, `${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)}&nbsp= (${stroke(a)}&nbsp+&nbsp${stroke("?")}) + ${c}`];
      break;
    case 2:
      return [(a + b + c), `${stroke(a)}&nbsp+ ${c} +&nbsp${stroke(b)} = ?`];
      break;
  }
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

  return solutions[rnd(0, solutions.length - 1)];

}
//
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
  

  return solutions[rnd(0, solutions.length - 1)];
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

  return solutions[rnd(0, solutions.length - 1)];
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
    [(cap - a), `${a} + ? = ${cap}`],
    [(cap - a), `? + ${a} = ${cap}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}