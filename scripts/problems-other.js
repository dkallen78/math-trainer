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
