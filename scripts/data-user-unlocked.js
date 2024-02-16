let user = {
  soundOn: true,
  activeScale: scales.major,
  keyNote: 0,
  keyOctave: 4,
  get activeKey() {
    return ((this.keyOctave - 2) * 12) + this.keyNote;
  },
  addition: {
    fundamentals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    placeValue: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    reorder: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    partition: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    compensation: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    sequence: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    fractions: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  subtraction: {
    fundamentals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    partition: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    decomposition: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    sequence: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  multiplication: {
    fundamentals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    distribution: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    association: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  division: {
    fundamentals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  qDepth: 2,
  maxAvg: 5000
}