
// Helper to format boolean equations
type EqStr = string;
const formatEquation = (eq: string): string => {
  return eq
    .replace(/XOR/g, '⊕')        
    .replace(/AND/g, '∧')
    .replace(/\bOR\b/g, '∨')    
    .replace(/NOT/g, '¬');
};

export const conversionEquations: Record<FlipFlopType, Record<FlipFlopType, ConversionEquation>> = {
  'D': {
    'T': {
      from: 'D', to: 'T',
      equations: [formatEquation('T = D XOR Q')],
      description: 'Toggle when D differs from Q.',
      truthTable: {
        inputs: ['D', 'Q'], outputs: ['T'],
        rows: [
          { inputs: [false, false], outputs: [false] },
          { inputs: [false, true ], outputs: [true ] },
          { inputs: [true , false], outputs: [true ] },
          { inputs: [true , true ], outputs: [false] },
        ],
      },
    },
    'SR': {
      from: 'D', to: 'SR',
      equations: [
        formatEquation('S = D AND NOT Q'),
        formatEquation('R = NOT D AND Q'),
      ],
      description: 'Set when D=1,Q=0; reset when D=0,Q=1.',
      truthTable: {
        inputs: ['D', 'Q'], outputs: ['S','R'],
        rows: [
          { inputs: [false, false], outputs: [false,false] },
          { inputs: [false, true ], outputs: [false,true ] },
          { inputs: [true , false], outputs: [true ,false] },
          { inputs: [true , true ], outputs: [false,false] },
        ],
      },
    },
    'JK': {
      from: 'D', to: 'JK',
      equations: [
        formatEquation('J = D'),
        formatEquation('K = NOT D'),
      ],
      description: 'Use D for J and its complement for K.',
      truthTable: {
        inputs: ['D'], outputs: ['J','K'],
        rows: [
          { inputs: [false], outputs: [false,true ] },
          { inputs: [true ], outputs: [true ,false] },
        ],
      },
    },
  },
  'T': {
    'D': {
      from: 'T', to: 'D',
      equations: [formatEquation('D = T XOR Q')],
      description: 'XOR T with Q.',
      truthTable: {
        inputs: ['T','Q'], outputs: ['D'],
        rows: [
          { inputs: [false,false], outputs: [false] },
          { inputs: [false,true ], outputs: [true ] },
          { inputs: [true ,false], outputs: [true ] },
          { inputs: [true ,true ], outputs: [false] },
        ],
      },
    },
    'SR': {
      from: 'T', to: 'SR',
      equations: [
        formatEquation('S = T AND NOT Q'),
        formatEquation('R = T AND Q'),
      ],
      description: 'Set on 0→1 toggle; reset on 1→0 toggle.',
      truthTable: {
        inputs: ['T','Q'], outputs: ['S','R'],
        rows: [
          { inputs: [false,false], outputs: [false,false] },
          { inputs: [false,true ], outputs: [false,false] },
          { inputs: [true ,false], outputs: [true ,false] },
          { inputs: [true ,true ], outputs: [false,true ] },
        ],
      },
    },
    'JK': {
      from: 'T', to: 'JK',
      equations: [
        formatEquation('J = T'),
        formatEquation('K = T'),
      ],
      description: 'Tie T to both J and K.',
      truthTable: {
        inputs: ['T'], outputs: ['J','K'],
        rows: [
          { inputs: [false], outputs: [false,false] },
          { inputs: [true ], outputs: [true ,true ] },
        ],
      },
    },
  },
  'SR': {
    'D': {
      from: 'SR', to: 'D',
      equations: [formatEquation('D = S OR (NOT R AND Q)')],
      description: 'Set retains 1; reset clears to 0 or holds Q.',
      truthTable: {
        inputs: ['S','R','Q'], outputs: ['D'],
        rows: [
          { inputs: [false,false,false], outputs: [false] },
          { inputs: [false,false,true ], outputs: [true ] },
          { inputs: [false,true ,false], outputs: [false] },
          { inputs: [false,true ,true ], outputs: [false] },
          { inputs: [true ,false,false], outputs: [true ] },
          { inputs: [true ,false,true ], outputs: [true ] },
        ],
      },
    },
    'T': {
      from: 'SR', to: 'T',
      equations: [formatEquation('T = (S AND NOT Q) OR (R AND Q)')],
      description: 'Toggle when transitioning via S or R.',
      truthTable: {
        inputs: ['S','R','Q'], outputs: ['T'],
        rows: [
          { inputs: [false,false,false], outputs: [false] },
          { inputs: [false,false,true ], outputs: [false] },
          { inputs: [false,true ,false], outputs: [false] },
          { inputs: [false,true ,true ], outputs: [true ] },
          { inputs: [true ,false,false], outputs: [true ] },
          { inputs: [true ,false,true ], outputs: [false] },
        ],
      },
    },
    'JK': {
      from: 'SR', to: 'JK',
      equations: [formatEquation('J = S'), formatEquation('K = R')],
      description: 'Direct map S→J, R→K (SR invalid omitted).',
      truthTable: {
        inputs: ['S','R'], outputs: ['J','K'],
        rows: [
          { inputs: [false,false], outputs: [false,false] },
          { inputs: [false,true ], outputs: [false,true ] },
          { inputs: [true ,false], outputs: [true ,false] },
        ],
      },
    },
  },
  'JK': {
    'D': {
      from: 'JK', to: 'D',
      equations: [formatEquation('D = J OR (NOT K AND Q)')],
      description: 'Set when J=1; reset on K=1; hold on K=0.',
      truthTable: {
        inputs: ['J','K','Q'], outputs: ['D'],
        rows: [
          { inputs: [false,false,false], outputs: [false] },
          { inputs: [false,false,true ], outputs: [true ] },
          { inputs: [false,true ,false], outputs: [false] },
          { inputs: [false,true ,true ], outputs: [false] },
          { inputs: [true ,false,false], outputs: [true ] },
          { inputs: [true ,false,true ], outputs: [true ] },
          { inputs: [true ,true ,false], outputs: [true ] },
          { inputs: [true ,true ,true ], outputs: [false] },
        ],
      },
    },
    'T': {
      from: 'JK', to: 'T',
      equations: [formatEquation('T = (J AND NOT Q) OR (K AND Q)')],
      description: 'Toggle on set or reset transitions.',
      truthTable: {
        inputs: ['J','K','Q'], outputs: ['T'],
        rows: [
          { inputs: [false,false,false], outputs: [false] },
          { inputs: [false,false,true ], outputs: [false] },
          { inputs: [false,true ,false], outputs: [false] },
          { inputs: [false,true ,true ], outputs: [true ] },
          { inputs: [true ,false,false], outputs: [true ] },
          { inputs: [true ,false,true ], outputs: [false] },
          { inputs: [true ,true ,false], outputs: [true ] },
          { inputs: [true ,true ,true ], outputs: [true ] },
        ],
      },
    },
    'SR': {
      from: 'JK', to: 'SR',
      equations: [
        formatEquation('S = J AND NOT K'),
        formatEquation('R = K AND NOT J'),
      ],
      description: 'Map to SR, mapping J=K=1 to no change.',
      truthTable: {
        inputs: ['J','K'], outputs: ['S','R'],
        rows: [
          { inputs: [false,false], outputs: [false,false] },
          { inputs: [false,true ], outputs: [false,true ] },
          { inputs: [true ,false], outputs: [true ,false] },
          { inputs: [true ,true ], outputs: [false,false] },
        ],
      },
    },
  },
};

export function convertFlipFlop(
  from: FlipFlopType,
  to: FlipFlopType,
  inputs: Record<string, boolean>,
  currentState: boolean
): Record<string, boolean> {
  const conversion = conversionEquations[from][to];
  const result: Record<string, boolean> = {};

  switch (from) {
    case 'D':
      switch (to) {
        case 'T':
          result.T = inputs.D !== currentState;
          break;
        case 'SR':
          result.S = inputs.D && !currentState;
          result.R = !inputs.D && currentState;
          break;
        case 'JK':
          result.J = inputs.D;
          result.K = !inputs.D;
          break;
      }
      break;
    // ... other cases unchanged ...
  }

  return result;
}
