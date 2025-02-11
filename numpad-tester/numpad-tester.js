function makePad() {
  let numPadDiv = get("math-strategy-interface");
  let numberPad = numPad(1);
  numPadDiv.appendChild(numberPad);

}

const customPads = [
  //  0
  /*
    | 1 | 2 | 3 | x |
    | 4 | 5 | 6 | x |
    | 7 | 8 | 9 | s |
    |   0   | . | s |
    |      quit     |
  */
  {
    "number-pad__button-1": {
      "borderTopLeftRadius": ".8rem"
    },
    "number-pad__button-back": {
      "grid-column": "4 / 5",
      "grid-row": "1 / 3",
      "borderTopRightRadius": ".8rem"
    },
    "number-pad__button-submit": {
      "grid-column": "4 / 5",
      "grid-row": "3 / 5"
    },
    "number-pad__button-0": {
      "grid-column": "1 / 3",
      "grid-row": "4 / 5"
    },
    "number-pad__button-quit": {
      "border-radius": "0 0 .8rem .8rem",
      "grid-column": "1 / 5"
    }
  },
  //  1
  /*
    | x | 1 | 2 | 3 |
    | x | 4 | 5 | 6 |
    | q | 7 | 8 | 9 |
    | q |   0   | . |
    |     submit    |
  */

  {
    "number-pad__button-3": {
      "borderTopRightRadius": ".8rem"
    },
    "number-pad__button-back": {
      "grid-area": "1 / 1 / 3 / 2",
      "borderTopLeftRadius": ".8rem"
    },
    "number-pad__button-submit": {
      "grid-area": "5 / 1 / 6 / 5",
      "border-radius": "0 0 .8rem .8rem"
    },
    "number-pad__button-0": {
      "grid-column": "2 / 4"
    },
    "number-pad__button-quit": {
      "grid-area": "3 / 1 / 5 / 2"
    }
  }
]

function numPad(layout = 0) {
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

    for (const propID in customPads[layout]) {
      console.log(`Setting ${propID} element`);

      const button = numberPad.querySelector(`#${propID}`);

      for (const style in customPads[layout][propID]) {
        console.log(`${button.id}.style[${style}] = "${customPads[layout][propID][style]}"`);

        button.style[style] = customPads[layout][propID][style];
      }
    }
  
  return numberPad;
}