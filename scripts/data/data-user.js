let user = {
  soundOn: true,
  activeScale: scales.major,
  keyNote: 0,
  keyOctave: 4,
  get activeKey() {
    return ((this.keyOctave - 2) * 12) + this.keyNote;
  },
  numPad: 0,
  numPadCorner: "topLeft",
  addition: {
    fundamentals: [],
    placeValue: [],
    reorder: [],
    partition: [],
    compensation: [],
    sequence: [],
    fractions: []
  },
  subtraction: {
    fundamentals: [],
    partition: [],
    decomposition: [],
    sequence: []
  },
  multiplication: {
    fundamentals: [],
    distribution: [],
    association: []
  },
  division: {
    fundamentals: [],
    multiply: []
  },
  qDepth: 10,
  maxAvg: 5000
}