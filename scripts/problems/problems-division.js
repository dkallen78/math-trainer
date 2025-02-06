
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

function divisionMultiply(qMin, qMax, dMin, dMax, mode) {

  let q = rnd(qMin, qMax);
  let t2 = rnd(dMin, dMax);
  let t1 = q * t2;
  let solutions = [];

  switch(mode) {
    case 1:
      solutions = [
        [q, `${t1} ÷ ${t2} = ?<br>${t1} = ${t2} × ?`],
        [q, `? = ${t1} ÷ ${t2}<br>? × ${t2} = ${t1}`]
      ];
      break;
    case 2:
      solutions = [
        [q, `${t1} ÷ ? = ${t2}<br>${t1} = ? × ${t2}`],
        [q, `${t2} = ${t1} ÷ ?<br>${t2} × ? = ${t1}`]
      ];
      break;
  }

  

  return rnd.index(solutions);
}