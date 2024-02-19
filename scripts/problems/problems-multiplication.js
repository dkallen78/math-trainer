//
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
//
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
//
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
//
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


//
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
//
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
