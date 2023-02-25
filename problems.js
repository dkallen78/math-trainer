function addition(aLow, aHigh, aMod, bLow, bHigh, bMod) {
  /*
  //Creates an addition problem                         //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //aMod(integer): multiplicative modifier for the      //
  //  first term                                        //
  //bLow(integer): lowest number for the second term    //
  //bHigh(integer): highest number for the second term  //
  //bMod(integer): multiplicative modifier for the      //
  //  second term                                       //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh) * aMod;
  let b = rnd(bLow, bHigh) * bMod;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    answer = b;
    equation = `${a} + ? = ${a + b}`;
  }

  return [answer, equation];
}

function subtract(aLow, aHigh, aMod, bLow, bHigh, bMod) {
  /*
  //Creates a subtraction problem                       //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //aMod(integer): multiplicative modifier for the      //
  //  first term                                        //
  //bLow(integer): lowest number for the second term    //
  //bHigh(integer): highest number for the second term  //
  //bMod(integer): multiplicative modifier for the      //
  //  second term                                       //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh) * aMod;
  let b = rnd(bLow, bHigh) * bMod;

  if (b > a) {
    [a, b] = [b, a];
  }

  let answer = a - b;
  let equation = `${a} - ${b} = ?`;

  return [answer, equation];
}

function maxSum(max, maxMod = 1) {
  /*
  //Creates an addition problem with a maximum sum      //
  //----------------------------------------------------//
  //max(integer): maximum sum                           //
  //maxMod(integer): multiplicative modifier            //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(1, max - 1) * maxMod;
  let b = rnd(1, max - (a / maxMod)) * maxMod;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    answer = b;
    equation = `${a} + ? = ${a + b}`;
  }

  return [answer, equation];
}

function mixedOps(aLow, aHigh, aMod, bLow, bHigh, bMod) {
  /*
  //Creates an addition or subtraction problem          //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //aMod(integer): multiplicative modifier for the      //
  //  first term                                        //
  //bLow(integer): lowest number for the second term    //
  //bHigh(integer): highest number for the second term  //
  //bMod(integer): multiplicative modifier for the      //
  //  second term                                       //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh) * aMod;
  let b = rnd(bLow, bHigh) * bMod;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    while (a <= b) {
      b = rnd(bLow, bHigh) * bMod;
    }
    answer = a - b;
    equation = `${a} - ${b} = ?`;
  }

  return [answer, equation];
}

function mixedMax(aLow, aHigh, bLow, max, mod) {
  /*
  //Creates an addition or subtraction problem with a   //
  //  maximum possible sum or minuend                   //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //bLow(integer): lowest number for the second term    //
  //max(integer): the maximum value of either the sum   //
  //  or minuend                                        //
  //mod(integer): multiplicative modifier for all other //
  //  parameters                                        //
  //----------------------------------------------------//
  //return(array[integer, string]): the solution to the //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  let b = rnd(bLow, (max - a));
  a *= mod;
  b *= mod;
  let solutions = [
    [(a + b), `${a} + ${b} = ?`],
    [b, `${a} + ? = ${a + b}`],
    [a, `? + ${b} = ${a + b}`],
    [b, `${a + b} - ${a} = ?`],
    [b, `${a + b} - ? = ${a}`],
    [a, `${a + b} - ${b} = ?`],
    [a, `${a + b} - ? = ${b}`],
    [(a + b), `? - ${a} = ${b}`],
    [(a + b), `? - ${b} = ${a}`]
  ]

  return solutions[rnd(0, solutions.length - 1)];
}

function mixedOpsDec(aLow, aHigh, bLow, bHigh, rLow, rHigh) {
  /*
  //Creates an addition or subtraction problem with     //
  //  decimal terms                                     //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //bLow(integer): lowest number for the second term    //
  //bHigh(integer): highest number for the second term  //
  //rLow(integer): lowest possible number of decimal    //
  //  units                                             //
  //rHigh(integer): highest possible number of decimal  //
  //  units                                             //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let aDec = rnd(rLow, rHigh);
  let a = rnd(aLow, aHigh) * 10**(aDec * -1);
  let bDec = rnd(rLow, rHigh);
  let b = rnd(bLow, bHigh) * 10**(bDec * -1);
  a = cleanDec(a, aDec);
  b = cleanDec(b, bDec);
  let answer;
  let equation;

  if (rnd(1, 50) % 2 === 0) {
    answer = cleanDec((a + b), (aDec > bDec ? aDec : bDec));
    equation = `${a} + ${b} = ?`;
  } else {
    while(b >= a) {
      if (bDec > aDec) {
        [bDec, aDec] = [aDec, bDec];
      }
      b = rnd(bLow, bHigh) * 10**(bDec * -1);
      b = cleanDec(b, bDec);
    }
    answer = cleanDec((a - b), (aDec > bDec ? aDec : bDec));
    equation = `${a} - ${b} = ?`;
  }
  return [answer, equation];
}

function mixedThrees(aLow, aHigh, bLow, bHigh, cLow, cHigh) {
  /*
  //Creates a mixed addition and subtraction problem    //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //bLow(integer): lowest number for the second term    //
  //bHigh(integer): highest number for the second term  //
  //cLow(integer): lowest number for the third term     //
  //cHigh(integer): highest number for the third term   //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  let b = 0;
  let c = 0;
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    b = rnd(bLow, bHigh);
    c = rnd(cLow, cHigh);
    while (c > (a + b)) {
      c = rnd(cLow, cHigh);
    }
    answer = (a + b) - c;
    equation = `${a} + ${b} - ${c} = ?`;
  } else {
    b = rnd(bLow, a);
    c = rnd(cLow, cHigh);
    answer = (a - b) + c;
    equation = `${a} - ${b} + ${c} = ?`;
  }

  return [answer, equation];
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

function doublesDec(aLow, aHigh, aMod, rLow, rHigh) {
  /*
  //Creates an near doubles addition problem involving  //
  //  decimal terms                                     //
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

  let a = rnd(aLow, aHigh) * 10**(aMod * -1);
  a = cleanDec(a, aMod);
  let drift = rnd(rLow, rHigh);
  let answer = a + (a + drift);
  answer = cleanDec(answer, aMod);
  equation = `${a} + ${a + drift} = ?`;

  return [answer, equation];
}

function halves(aLow, aHigh, aMod) {
  /*
  //Creates a "find the half" problem                   //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the term           //
  //aHigh(integer): highest number for the term         //
  //aMod(integer): multiplicative modifier for the      //
  //  doubles                                           //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  if (a % 2 === 1) {
    a--;
  }
  a *= aMod;
  let answer = a / 2;
  let equation = `What is half of ${a}?`;

  return [answer, equation];
}

function halvesDec(aLow, aHigh, aMod) {
  /*
  //Creates a "find the half" problem with decimals     //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the term           //
  //aHigh(integer): highest number for the term         //
  //aMod(integer): multiplicative modifier for the      //
  //  doubles                                           //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  if (a % 2 === 1) {
    a--;
  }
  a *= 10**(aMod * -1);
  a = cleanDec(a, aMod);
  let answer = a / 2;
  answer = cleanDec(answer, aMod);
  let equation = `What is half of ${a}?`;

  return [answer, equation];
}

function upTo(aLow, aHigh, cap) {
  /*
  //Creates an addition problem that sums to a cap      //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //cap(integer): the number to add up to               //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  let answer = 0;
  let equation = "";

  if (rnd(1, 50) % 2 === 0) {
    answer = cap;
    equation = `${a} + ${cap - a} = ?`;
  } else {
    answer = cap - a;
    equation = `${a} + ? = ${cap}`;
  }

  return [answer, equation];
}

function nextMultiple(aLow, aHigh, aMod, multiple) {
  /*
  //Creates an addition problem that sums to a set      //
  //  multiple of the multiple parameter                //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //aMod(integer): multiplicative modifier              //
  //multiple(integer): multiple to add up to            //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh) * aMod;
  while (a % 10 === 0) {
    a = rnd(aLow, aHigh);
  }
  let c = (Math.floor(a / multiple) + 1) * multiple;

  let answer = c - a;
  let equation = `${a} + ? = ${c}`;

  return [answer, equation];
}

function nextMultipleDec(aLow, aHigh, aMod, multiple) {
  /*
  //Creates an decimal addition problem that sums to a  //
  //  set multiple of the multiple parameter            //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //aMod(integer): multiplicative modifier              //
  //multiple(integer): multiple to add up to            //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  while (a % 10 === 0) {
    a = rnd(aLow, aHigh);
  }
  a *= 10**(aMod * -1);
  a = cleanDec(a, aMod);

  let c = (Math.floor(a / multiple) + 1) * multiple;

  let answer = c - a;
  answer = cleanDec(answer, aMod);
  let equation = `${a} + ? = ${c}`;

  console.log(answer, equation);
  return [answer, equation];
}

function nearMultiple(aLow, aHigh, bLow, bHigh, bMod, rLow, rHigh) {
  /*
  //Creates an addition or subtraction problem where one//
  //  of the terms is a near multiple of number         //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //bLow(integer): lowest base number for the second    //
  //  term                                              //
  //bHigh(integer): highest base number for the second  //
  //  term                                              //
  //bMod(integer): multiplicative modifier for the      //
  //  second term                                       //
  //rLow(integer): low end of the potential offset from //
  //  the multiple                                      //
  //rHigh(integer): high end of the potential offset    //
  //  from the multiple                                 //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let a = rnd(aLow, aHigh);
  let b = rnd(bLow, bHigh) * bMod;
  let drift = rnd(rLow, rHigh);
  let answer;
  let equation;
  if (rnd(1, 50) % 2 === 0) {
    drift *= -1;
  }
  b += drift;
  if (rnd(1, 50) % 2 === 0) {
    answer = a + b;
    equation = `${a} + ${b} = ?`;
  } else {
    while (b >= a) {
      b = (rnd(bLow, bHigh) * bMod) + drift;
    }
    answer = a - b;
    equation = `${a} - ${b} = ?`;
  }

  return [answer, equation];
}

function nearMultipleDif(aLow, aHigh, bLow, bHigh, rLow, rHigh, multiple) {
  /*
  //Creates a subtraction problem given two near        //
  //  multiples of a set number                         //
  //----------------------------------------------------//
  //aLow(integer): lowest number for the first term     //
  //aHigh(integer): highest number for the first term   //
  //bLow(integer): lowest base number for the second    //
  //  term                                              //
  //bHigh(integer): highest base number for the second  //
  //  term                                              //
  //rLow(integer): low end of the potential offset from //
  //  the multiple                                      //
  //rHigh(integer): high end of the potential offset    //
  //  from the multiple                                 //
  //multiple(integer): multiple to which the terms      //
  //  belong                                            //
  //----------------------------------------------------//
  //return(array[float, string]): the answer to the     //
  //  equation and a string representation of it        //
  */

  let range1 = rnd(rLow, rHigh);
  range1 = (rnd(1, 50) % 2 === 0) ? range1 : range1 * -1;
  let range2 = rnd(rLow, rHigh);
  range2 = (rnd(1, 50) % 2 === 0) ? range2 : range2 * -1;
  let a = (rnd(aLow, aHigh) * multiple) + range1;
  let b = (rnd(bLow, bHigh) * multiple) + range2;
  [a, b] = (a < b) ? [b, a] : [a, b];

  let answer = a - b;
  let equation = `${a} - ${b} =?`;

  return [answer, equation];
}

function cleanDec(number, dec) {
  /*
  //Cleans up the weird decimals                        //
  //----------------------------------------------------//
  //number(float): number to be cleaned up              //
  //dec(integer): number of decimal places to include   //
  //----------------------------------------------------//
  //return(float): cleaned up number                    //
  */

  let length = Math.floor(number).toString(10).length;
  return parseFloat(number.toPrecision(length + dec));
}
