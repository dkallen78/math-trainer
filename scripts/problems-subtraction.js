function downTo(aMin, aMax, floorMin, floorMax, floorMod) {

  let a = rnd(aMin, aMax);
  let floor = rnd(floorMin, floorMax) * floorMod;

  return [a, `${floor + a} - ? = ${floor}`];
}
//
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
//
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
//
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
//
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
//
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