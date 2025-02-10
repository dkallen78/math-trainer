let user = {
  soundOn: true,
  activeScale: scales.major,
  keyNote: 0,
  keyOctave: 4,
  get activeKey() {
    return ((this.keyOctave - 2) * 12) + this.keyNote;
  },
  numPad: 0,
  addition: {
    fundamentals: [true, true, true, true, true, true, true, true, true, true],
    placeValue: [true, true, true, true, true, true, true, true, true, true],
    reorder: [true, true, true, true, true, true, true, true, true, true],
    partition: [true, true, true, true, true, true, true, true, true, true],
    compensation: [true, true, true, true, true, true, true, true, true, true],
    sequence: [true, true, true, true, true, true, true, true, true, true],
    fractions: [true, true, true, true, true, true, true, true, true, true]
  },
  subtraction: {
    fundamentals: [true, true, true, true, true, true, true, true, true, true],
    partition: [true, true, true, true, true, true, true, true, true, true],
    decomposition: [true, true, true, true, true, true, true, true, true, true],
    sequence: [true, true, true, true, true, true, true, true, true, true]
  },
  multiplication: {
    fundamentals: [true, true, true, true, true, true, true, true, true, true],
    distribution: [true, true, true, true, true, true, true, true, true, true],
    association: [true, true, true, true, true, true, true, true, true, true]
  },
  division: {
    fundamentals: [true, true, true, true, true, true, true, true, true, true],
    multiply: [true, true, true, true, true, true, true, true, true, true]
  },
  qDepth: 2,
  maxAvg: 5000
}