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

function reorderBreak(breakMin, breakMax, breakMod, crackMin, crackMax, cMin, cMax) {
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
  //  extra term
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let toBreak = rnd(breakMin, breakMax) * (10 ** breakMod);
  let b = rnd(crackMin, crackMax);

  let a = toBreak - b;
  let c = rnd(cMin, cMax);

  return [b, `${a} + ${c} + ${b} = ${a} + ? + ${c}`];
}