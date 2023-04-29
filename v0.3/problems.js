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

function add(aMin, aMax, aMod, bMin, bMax, bMod) {
  /*
  //Creates an addition based on the parameters         //
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
  //  second addend
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(bMin, bMax) * (10 ** bMod);

  return [(a + b), `${a} + ${b} = ?`];
}

function addWithin(aMin, aMax, simple = true) {
  /*
  //Creates an addition problem with a lower and upper  //
  //  bound                                             //
  //----------------------------------------------------//
  //aMin(integer): the smallest sum possible            //
  //aMax(integer): the largest sum possible             //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aMin, aMax);
  let b = 0;
  let solutions = [];

  switch (simple) {
    case false:
      b = rnd(0, aMax - a);
      solutions = [
        [a, `${b} + ? = ${a + b}`],
        [a, `? + ${b} = ${a + b}`],
      ]
    case true:
      b = rnd(0, a);
      solutions.push([a, `${b} + ${a - b} = ?`]);
  }

  return solutions[rnd(0, solutions.length - 1)];

}

function broken10s(breakMin, breakMax, breakMod, crackMin, crackMax, cMin, cMax, mode) {
  /*
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
  */

  let toBreak = rnd(breakMin, breakMax) * (10 ** breakMod);
  let b = rnd(crackMin, crackMax);

  let a = toBreak - b;
  let c = rnd(cMin, cMax);

  switch(mode) {
    case 1:
      return [b, `${a} + ${c} + ${b} = ${a} + ? + ${c}`];
      break;
    case 2:
      return [(a + b + c), `${a} + ${c} + ${b} = ?`];
      break;
  }
}

function doubles(aLow, aHigh, aMod, rLow, rHigh) {
  /*
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
  */

  let a = rnd(aLow, aHigh) * aMod;
  let drift = rnd(rLow, rHigh);
  let answer = a + (a + drift);
  let equation = `${a} + ${a + drift} = ?`;

  return [answer, equation];
}

function addPartCrossing10s(aMin, aMax, aMod, mode) {
  /*
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
  */


  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(1, 8);
  let c;

  switch(mode) {
    case 1:
      c = rnd(1, (9 - b));
      return [b, `${a - b} + ${b + c} = ${a - b} + ? + ${c}`];
    case 2:
      c = rnd((b + 1), 9);
      return [(a + b), `${(a + b) - c} + ${c} = ?`];
  }

}

function partitionNearDoubles(aMin, aMax, aMod, maxSplit, mode) {
  /*
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
  */

  let a = rnd(aMin, aMax) * (10 ** aMod);
  let split = rnd(1, maxSplit);
  let solutions = [];

  switch(mode) {
    case 1:
      solutions = [
        [a, `${a} + ${a + split} = ${a} + ? + ${split}`],
        [a, `${a + split} + ${a} = ${split} + ? + ${a}`]
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

function reorder(aMin, aMax) {
  /*
  //Creates a reorder problem                           //
  //----------------------------------------------------//
  //aMin(integer): the minimum addend/                  //
  //aMax(integer): the maximum addend                   //
  //----------------------------------------------------//
  //return(array[float, string]): the correct term and  //
  //  a string representation of it                     //
  */

  let a = rnd(aMin, aMax);
  let b = rnd(aMin, aMax);

  let solutions = [
    [a, `${a} + ${b} = ${b} + ?`],
    [a, `? + ${b} = ${b} + ${a}`],
    [a, `${b} + ${a} = ? + ${b}`],
    [a, `${b} + ? = ${a} + ${b}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

function singleDigitAddition(minSum, maxSum) {
  /*
  //Creates a single-digit addition problem with a      //
  //  minimum and maximum sum                           //
  //----------------------------------------------------//
  //minSum(integer): smallest possible sum              //
  //maxSum(integer): largest possible sum               //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

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

function subWithin(difMin, difMax) {
  /*
  //Creates a subtraction problem within a range of     //
  //  possible differences                              //
  //----------------------------------------------------//
  //difMin(integer): minimum possible difference        //
  //difMax(integer): maximum possible difference        //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(difMin, difMax);
  let b = rnd(a, difMax);
  let c = rnd(0, b);

  let solutions = [
    [a, `${b} - ${b - a} = ?`],
    [a, `? = ${b} - ${b - a}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

function upTo(aMin, cap) {
  /*
  //Creates an addition problem with a fixed sum        //
  //----------------------------------------------------//
  //aMin(integer): the minimum addend                   //
  //cap(integer): the sum to add up to                  //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aMin, cap);

  let solutions = [
    [(cap - a), `${a} + ? = ${cap}`],
    [(cap - a), `? + ${a} = ${cap}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

//----------------------------------------------------------------

function takeFrom(aMin, aMax, aMod) {

  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(1, 9);

  let solutions = [
    [(a - b), `${a} - ${b} = ?`],
    [(a - b), `? = ${a} - ${b}`]
  ];

  return solutions[rnd(0, solutions.length - 1)];
}

function subPartCrossing10s(aMin, aMax, aMod, mode) {
  /*
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
  */

  let a = rnd(aMin, aMax) * (10 ** aMod);
  let b = rnd(1, 8);
  let c;

  switch(mode) {
    case 1:
      c = rnd(1, (9 - b));
      return [b, `${a + b} - ${b + c} = ${a + b} - ? - ${c}`];
    case 2:
      c = rnd((b + 1), 9);
      return [(a - b), `${(a - b) + c} - ${c} = ?`];
  }

  return [(a - b), `${(a - b) + c} - ${c} = ${(a - b) + c} - ? - ${b}`];
  //return [(c - b), `${(a - b) + c} - ${c} = ${(a - b) + c} - ? - ${b}`];
}
