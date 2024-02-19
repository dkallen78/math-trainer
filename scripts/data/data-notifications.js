const notifications = {
  addition: {
    compensation: {
      test: () => addition.compensation[1].test(),
      acclaim: "Unlocked New Addition Strategy!",
      unlock: "Compensation",
    },
    //
    fractions: {
      test: () => addition.fractions[1].test(),
      acclaim: "Unlocked New Addition Strategy!",
      unlock: "Fractions",
    },
    partition: {
      test: () => addition.partition[1].test(),
      acclaim: "Unlocked New Addition Strategy!",
      unlock: "Partition"
    },
    placeValue: {
      test: () => addition.placeValue[1].test(),
      acclaim: "Unlocked New Addition Strategy!",
      unlock: "Place Value"
    }, 
    reorder: {
      test: () => addition.reorder[1].test(),
      acclaim: "Unlocked New Addition Strategy!",
      unlock: "Reorder"
    },
    sequence: {
      test: () => addition.sequence[1].test(),
      acclaim: "Unlocked New Addition Strategy!",
      unlock: "Sequence"
    }
  },

  subtraction: {
    test: () => subtraction.fundamentals[1].test(),
    acclaim: "Unlocked New Operation!",
    unlock: "Subtraction",

    decomposition: {
      test: () => subtraction.decomposition[1].test(),
      acclaim: "Unlocked New Subtraction Strategy!",
      unlock: "Decomposition"
    },
    partition: {
      test: () => subtraction.partition[1].test(),
      acclaim: "Unlocked New Subtraction Strategy!",
      unlock: "Partition"
    },
    sequence: {
      test: () => subtraction.sequence[1].test(),
      acclaim: "Unlocked New Subtraction Strategy!",
      unlock: "Sequence",
    }
  },

  multiplication: {
    test: () => multiplication.fundamentals[1].test(),
    acclaim: "Unlocked New Operation!",
    unlock: "Multiplication",
    
    association: {
      test: () => multiplication.association[1].test(),
      acclaim: "Unlocked New Multiplication Strategy!",
      unlock: "Association"
    },
    distribution: {
      test: () => multiplication.distribution[1].test(),
      acclaim: "Unlocked New Multiplication Strategy!",
      unlock: "Distribution"
    }
  },

  division: {
    test: () => division.fundamentals[1].test(),
    acclaim: "Unlocked New Operation!",
    unlock: "Division",

    
  }
}