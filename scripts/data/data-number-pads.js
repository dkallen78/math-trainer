let np1 = "l";
let np2 = "m";
let customNumberPads = {

  topLeft: [
    //  0
    {
      "number-pad": () => {
        const area = 
        ` "a      b       c       ${np1}"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "q      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
        ` "a      b       c       ${np1}"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "q      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np1}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
        ` "a      b       c       q"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "j      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np1}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
        ` "a      b       c       q"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "j      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
        ` "a      b       c       ${np1}"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "j      j       k       q"
          "${np2} ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
        ` "a      b       c       ${np1}"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "j      j       k       ${np1}"
          "${np2} ${np2}  ${np2}  q" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
        ` "a      b       c       ${np1}"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "j      j       k       ${np1}"
          "q      ${np2}  ${np2}  ${np1}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
        ` "a      b       c       ${np1}"
          "d      e       f       ${np1}"
          "g      h       i       ${np1}"
          "j      j       k       ${np1}"
          "q      ${np2}  ${np2}  ${np2}" `;
          return area;
      },
      "number-pad__button-1": {
        "border-top-left-radius": () => ".8rem"
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
  ]
}