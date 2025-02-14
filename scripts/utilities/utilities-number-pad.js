function numPad(layout = 0, corner = "topLeft") {
  //----------------------------------------------------//
  //Makes and returns a div element with a number pad   //
  //  inside of it. Additionally, it defines the        //
  //  behavior for touch and mouse events               //
  //----------------------------------------------------//
  //return(element): HTML element                       //
  //----------------------------------------------------//
  
  const numberPad = make.section("number-pad");
  
    numberPad.appendChild(make.button("1", "number-pad__button-1"));
    numberPad.appendChild(make.button("2", "number-pad__button-2"));
    numberPad.appendChild(make.button("3", "number-pad__button-3"));
    numberPad.appendChild(make.button("←", "number-pad__button-back"));
    numberPad.appendChild(make.button("4", "number-pad__button-4"));
    numberPad.appendChild(make.button("5", "number-pad__button-5"));
    numberPad.appendChild(make.button("6", "number-pad__button-6"));
    numberPad.appendChild(make.button("7", "number-pad__button-7"));
    numberPad.appendChild(make.button("8", "number-pad__button-8"));
    numberPad.appendChild(make.button("9", "number-pad__button-9"));
    numberPad.appendChild(make.button("Submit", "number-pad__button-submit"));
    numberPad.appendChild(make.button("0", "number-pad__button-0"));
    numberPad.appendChild(make.button(".", "number-pad__button-decimal"));
    numberPad.appendChild(make.button("Quit", "number-pad__button-quit"));
  
    for (let i = 0; i < numberPad.children.length; i++) {
      numberPad.children[i].addEventListener("touchstart", () => {
        numberPad.children[i].style.backgroundColor = "hsla(0, 100%, 0%, .125)";
      });
      numberPad.children[i].addEventListener("touchend", () => {
        numberPad.children[i].style.backgroundColor = "var(--transparent)";
      });
      numberPad.children[i].addEventListener("mousedown", () => {
        numberPad.children[i].style.backgroundColor = "hsla(0, 100%, 0%, .125)";
      });
      numberPad.children[i].addEventListener("mouseup", () => {
        numberPad.children[i].style.backgroundColor = "var(--transparent)";
      });
    }

    //
    //Iterates over the object with the data for the number pad layout
    //  and applies it to the correct button
    for (const propID in customNumberPads[user.numPadCorner][layout]) {
      //console.log(`Setting ${propID} element`);
      if (propID === "number-pad") {
        numberPad.style["grid-template-areas"] = customNumberPads[user.numPadCorner][layout][propID]();
        continue;
      }
      const button = numberPad.querySelector(`#${propID}`);

      for (const style in customNumberPads[user.numPadCorner][layout][propID]) {
        //console.log(`${button.id}.style[${style}] = "${customPads[layout][propID][style]}"`);

        button.style[`${style}`] = customNumberPads[user.numPadCorner][layout][propID][style]();
      }
    }
  
  return numberPad;
}

numPad.on = function(display) {
  //----------------------------------------------------//
  //Enables the onclick functions of the number pad     //
  //----------------------------------------------------//
  
  get("number-pad__button-1").onclick = () => {inputNumber("1", display)}
  get("number-pad__button-2").onclick = () => {inputNumber("2", display)}
  get("number-pad__button-3").onclick = () => {inputNumber("3", display)}
  get("number-pad__button-4").onclick = () => {inputNumber("4", display)}
  get("number-pad__button-5").onclick = () => {inputNumber("5", display)}
  get("number-pad__button-6").onclick = () => {inputNumber("6", display)}
  get("number-pad__button-7").onclick = () => {inputNumber("7", display)}
  get("number-pad__button-8").onclick = () => {inputNumber("8", display)}
  get("number-pad__button-9").onclick = () => {inputNumber("9", display)}
  get("number-pad__button-0").onclick = () => {inputNumber("0", display)}
  get("number-pad__button-back").onclick = () => {inputNumber("-1", display)}
  get("number-pad__button-decimal").onclick = () => {inputNumber(".", display)}
  
  return null;
}

numPad.off = function() {
  //----------------------------------------------------//
  //Disables the onclick functions of the number pad    //
  //----------------------------------------------------//
  
  get("number-pad__button-1").onclick = "";
  get("number-pad__button-2").onclick = "";
  get("number-pad__button-3").onclick = "";
  get("number-pad__button-4").onclick = "";
  get("number-pad__button-5").onclick = "";
  get("number-pad__button-6").onclick = "";
  get("number-pad__button-7").onclick = "";
  get("number-pad__button-8").onclick = "";
  get("number-pad__button-9").onclick = "";
  get("number-pad__button-0").onclick = "";
  get("number-pad__button-back").onclick = "";
  get("number-pad__button-decimal").onclick = "";
  get("number-pad__button-submit").onclick = "";
}

function inputNumber(num, display) {
  //----------------------------------------------------//
  //Adds a number to the display element                //
  //----------------------------------------------------//
  //num(string): either a number/symbol to display or a //
  //  numeric code:                                     //
  //    -1: backspace                                   //
  //----------------------------------------------------//
  
  //let display = document.getElementById("skill-input-screen__solution-display");
  
  playTone(randomNote());
  if (num === "-1") {
    //----------------------------------------------------//
    //Removes the last input number. If the last input    //
    //  number was preceded by a decimal point, the       //
    //  decimal point is removed as well                  //
    //----------------------------------------------------//
  
    let current = display.innerHTML;
  
    if (current[current.length - 2] === ".") {
      display.innerHTML = current.slice(0, -2);
    } else {
      display.innerHTML = current.slice(0, -1);
    }
  } else {
    display.innerHTML += num;
  }
  
}