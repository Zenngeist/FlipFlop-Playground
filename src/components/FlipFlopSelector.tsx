import React from 'react';
import { useFlipFlop } from '../context/FlipFlopContext';
import { FlipFlopType, FlipFlopVariant } from '../lib/types';
import { getFlipFlopDescription } from '../lib/flipFlops';

const FlipFlopSelector: React.FC = () => {
  const { state, setFlipFlopType, setFlipFlopVariant } = useFlipFlop();

  const flipFlopTypes: FlipFlopType[] = ['D', 'T', 'SR', 'JK'];
  const flipFlopVariants: FlipFlopVariant[] = ['Standard', 'MasterSlave'];

  return (
    <div className="bg-white dark:bg-lldg rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Flip-Flop Type</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {flipFlopTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFlipFlopType(type)}
            className={`px-4 py-2 rounded-md transition-colors ${
              state.type === type
                ? 'bg-dlav text-white'
                : 'bg-gray-200 dark:bg-dg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {type} Flip-Flop
          </button>
        ))}
      </div>
      
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Variant</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {flipFlopVariants.map((variant) => (
          <button
            key={variant}
            onClick={() => setFlipFlopVariant(variant)}
            className={`px-4 py-2 rounded-md transition-colors ${
              state.variant === variant
                ? 'bg-dlav text-white'
                : 'bg-gray-200 dark:bg-dg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {variant}
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 dark:bg-dg rounded-md text-sm text-gray-700 dark:text-gray-300">
        <p>{getFlipFlopDescription(state.type, state.variant)}</p>
      </div>
    </div>
  );
};

export default FlipFlopSelector;