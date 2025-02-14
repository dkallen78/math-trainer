let np1 = "l";
let np2 = "m";
let topKeys = "a b c";
let botKeys = "g h i";
let customNumberPads = {

  topLeft: [
    //  0
    {
      "number-pad": () => {
        const area = 
        ` "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "q      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem 0 0" : "0 0 .8rem .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem .8rem" : "0 .8rem 0 0",
      }
    },
    //  1
    {
      "number-pad": () => {
        const area = 
        ` "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "q      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np1}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem .8rem 0" : "0 0 0 .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 0 .8rem" : "0 .8rem .8rem 0",
      }
    },
    //  2
    {
      "number-pad": () => {
        const area =
        ` "${topKeys}             q"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np1}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-quit": {
        "border-top-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 .8rem 0" : "0 0 0 .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 0 .8rem" : "0 0 .8rem 0",
      }
    },
    //  3
    {
      "number-pad": () => {
        const area =
        ` "${topKeys}             q"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-quit": {
        "border-top-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0" : "0 0 .8rem .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem .8rem" : "0",
      }
    },
    //  4
    {
      "number-pad": () => {
        const area =
        ` "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       q"
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem 0 0" : "0 0 .8rem .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem .8rem" : "0 .8rem 0 0",
      }
    }, 
    //  5
    {
      "number-pad": () => {
        const area =
        ` "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  q" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-quit": {
        "border-bottom-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem 0 0" : "0 0 0 .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 0 .8rem" : "0 .8rem 0 0",
      }
    },
    //  6
    {
      "number-pad": () => {
        const area =
        ` "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"
          "q      ${np2}  ${np2}  ${np1}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-quit": {
        "border-bottom-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem .8rem 0" : "0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0" : "0 .8rem .8rem 0",
      }
    },
    //  7
    {
      "number-pad": () => {
        const area =
        ` "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"
          "q      ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => (topKeys === "a b c") ? ".8rem" : "0",
      },
      "number-pad__button-7": {
        "border-top-left-radius": () => (topKeys === "g h i") ? ".8rem" : "0",
      },
      "number-pad__button-quit": {
        "border-bottom-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem 0 0" : "0 0 .8rem 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem 0" : "0 .8rem 0 0",
      }
    }
  ],
  topRight: [
    //  0
    {
      "number-pad": () => {
        const area = 
        ` "${np1}         ${topKeys}"
          "${np1} d       e       f"
          "${np1}         ${botKeys}"
          "${np1} q       j       k"
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 0" : "0 0 .8rem .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem .8rem" : ".8rem 0 0 0",
      }
    },
    //  1
    {
      "number-pad": () => {
        const area = 
        ` "${np1}         ${topKeys}"
          "${np1} d       e       f"
          "${np1}         ${botKeys}"
          "${np1} q       j       k"
          "${np1} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 .8rem" : "0 0 .8rem 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem 0" : ".8rem 0 0 .8rem",
      }
    },
    //  2
    {
      "number-pad": () => {
        const area =
        ` "q              ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "
          "${np1} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-quit": {
        "border-top-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 0 .8rem" : "0 0 .8rem 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem 0" : "0 0 0 .8rem",
      }
    },
    //  3
    {
      "number-pad": () => {
        const area =
        ` "q              ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-quit": {
        "border-top-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0" : "0 0 .8rem .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem .8rem" : "0",
      }
    },
    //  4
    {
      "number-pad": () => {
        const area =
        ` "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "q      j       j       k "
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 0" : "0 0 .8rem .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem .8rem" : ".8rem 0 0 0",
      }
    }, 
    //  5
    {
      "number-pad": () => {
        const area =
        ` "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "
          "q      ${np2} ${np2}  ${np2} " `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-quit": {
        "border-bottom-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 0" : "0 0 .8rem 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 .8rem 0" : ".8rem 0 0 0",
      }
    },
    //  6
    {
      "number-pad": () => {
        const area =
        ` "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "
          "${np1} ${np2}  ${np2} q" `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-quit": {
        "border-bottom-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 .8rem" : "0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0" : ".8rem 0 0 .8rem",
      }
    },
    //  7
    {
      "number-pad": () => {
        const area =
        ` "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "
          "${np2} ${np2}  ${np2} q" `;
          return area;
      },
      "number-pad__button-3": {
        "border-top-right-radius": () => (topKeys === "a b c") ? ".8rem" : "0"
      },
      "number-pad__button-9": {
        "border-top-right-radius": () => (topKeys === "g h i") ? ".8rem" : "0"
      },
      "number-pad__button-quit": {
        "border-bottom-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 0" : "0 0 0 .8rem",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 0 0 .8rem" : ".8rem 0 0 0",
      }
    }

  ], 
  bottomLeft: [
    //  0
    {
      "number-pad": () => {
        const area = 
        ` "${np2} ${np2}  ${np2}  ${np2}"
          "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "q      j       k       ${np1}"`;
          return area;
      },
      "number-pad__button-quit": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 .8rem 0" : ".8rem .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem .8rem 0 0" : "0 0 .8rem 0",
      }
    },
    //  1
    {
      "number-pad": () => {
        const area = 
        ` "${np2} ${np2}  ${np2}  ${np1}"
          "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "q      j       k       ${np1}"`;
          return area;
      },
      "number-pad__button-quit": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem .8rem 0" : ".8rem 0 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem 0 0 0" : "0 .8rem .8rem 0",
      }
    },
    //  2
    {
      "number-pad": () => {
        const area =
        ` "${np2} ${np2}  ${np2}  q"
          "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"`;
          return area;
      },
      "number-pad__button-0": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-top-right-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 .8rem 0" : ".8rem 0 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem 0 0 0" : "0 0 .8rem 0",
      }
    },
    //  3
    {
      "number-pad": () => {
        const area =
        ` "${np2} ${np2}  ${np2}  ${np2}"
          "${topKeys}             q"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"`;
          return area;
      },
      "number-pad__button-0": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 .8rem 0" : ".8rem .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem .8rem 0 0" : "0 0 .8rem 0",
      }
    },
    //  4
    {
      "number-pad": () => {
        const area =
        ` "${np2} ${np2}  ${np2}  ${np2}"
          "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       q"`;
          return area;
      },
      "number-pad__button-0": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-bottom-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0" : ".8rem .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem .8rem 0 0" : "0",
      }
    }, 
    //  5
    {
      "number-pad": () => {
        const area =
        ` "${np2} ${np2}  ${np2}  ${np1}"
          "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       q"
           `;
          return area;
      },
      "number-pad__button-0": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-bottom-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem 0 0" : ".8rem 0 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem 0 0 0" : "0 .8rem 0 0",
      }
    },
    //  6
    {
      "number-pad": () => {
        const area =
        ` "q      ${np2}  ${np2}  ${np1}"
          "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"
           `;
          return area;
      },
      "number-pad__button-0": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-top-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 .8rem .8rem 0" : "0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0" : "0 .8rem .8rem 0",
      }
    },
    //  7
    {
      "number-pad": () => {
        const area =
        ` "q      ${np2}  ${np2}  ${np2}"
          "${topKeys}             ${np1}"
          "d      e       f       ${np1}"
          "${botKeys}             ${np1}"
          "j      j       k       ${np1}"
           `;
          return area;
      },
      "number-pad__button-0": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-top-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 .8rem 0" : "0 .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 .8rem 0 0" : "0 0 .8rem 0",
      }
    }
  ],
  bottomRight: [
    //  0
    {
      "number-pad": () => {
        const area = 
        ` "${np2} ${np2}  ${np2}  ${np2}" 
          "${np1}         ${topKeys}"
          "${np1} d       e       f"
          "${np1}         ${botKeys}"
          "${np1} q       j       k"`;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 0 .8rem" : ".8rem .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem .8rem 0 0" : "0 0 0 .8rem",
      }
    },
    //  1
    {
      "number-pad": () => {
        const area = 
        ` "${np1} ${np2}  ${np2}  ${np2}"
          "${np1}         ${topKeys}"
          "${np1} d       e       f"
          "${np1}         ${botKeys}"
          "${np1} q       j       k"`;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 .8rem" : "0 .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 .8rem 0 0" : ".8rem 0 0 .8rem",
      }
    },
    //  2
    {
      "number-pad": () => {
        const area =
        ` "q      ${np2}  ${np2}  ${np2}"
          "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "`;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-top-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 0 .8rem" : "0 .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 .8rem 0 0" : "0 0 0 .8rem",
      }
    },
    //  3
    {
      "number-pad": () => {
        const area =
        ` "${np2} ${np2}  ${np2}  ${np2}" 
          "q              ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "`;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 0 .8rem" : ".8rem .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem .8rem 0 0" : "0 0 0 .8rem",
      }
    },
    //  4
    {
      "number-pad": () => {
        const area =
        ` "${np2} ${np2}  ${np2}  ${np2}"
          "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "q      j       j       k " `;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-bottom-left-radius": () => ".8rem",
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0" : ".8rem .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem .8rem 0 0" : "0",
      }
    }, 
    //  5
    {
      "number-pad": () => {
        const area =
        ` "${np1} ${np2} ${np2}  ${np2} "
          "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "q      j       j       k "`;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-bottom-left-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 0" : "0 .8rem 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0 .8rem 0 0" : ".8rem 0 0 0",
      }
    },
    //  6
    {
      "number-pad": () => {
        const area =
        ` "${np1} ${np2}  ${np2} q"
          "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "`;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-top-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? ".8rem 0 0 .8rem" : "0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? "0" : ".8rem 0 0 .8rem",
      }
    },
    //  7
    {
      "number-pad": () => {
        const area =
        ` "${np2} ${np2}  ${np2} q"
          "${np1}         ${topKeys} "
          "${np1} d       e       f "
          "${np1}         ${botKeys} "
          "${np1} j       j       k "
           `;
          return area;
      },
      "number-pad__button-decimal": {
        "border-bottom-right-radius": () => ".8rem",
      },
      "number-pad__button-quit": {
        "border-top-right-radius": () => ".8rem"
      },
      "number-pad__button-submit": {
        "border-radius": () => (np1 === "m") ? "0 0 0 .8rem" : ".8rem 0 0 0",
      },
      "number-pad__button-back": {
        "border-radius": () => (np2 === "l") ? ".8rem 0 0 0" : "0 0 0 .8rem",
      }
    }

  ]
}