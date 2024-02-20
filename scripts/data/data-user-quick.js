let user = {
  soundOn: true,
  activeScale: scales.major,
  keyNote: 0,
  keyOctave: 4,
  get activeKey() {
    return ((this.keyOctave - 2) * 12) + this.keyNote;
  },
  addition: {
    fundamentals: [true, true, true, ],
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
  qDepth: 1,
  maxAvg: 5000
}