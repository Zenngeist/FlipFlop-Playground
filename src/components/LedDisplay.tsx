import React from 'react';
import { useFlipFlop } from '../context/FlipFlopContext';

const LedDisplay: React.FC = () => {
  const { state } = useFlipFlop();
  const { outputs } = state;

  return (
    <div className="bg-white dark:bg-lldg rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Output</h2>

      <div className="flex items-center justify-around mb-4">
        {/* LED Q */}
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            {/* LED bulb */}
            <div 
              className={`w-16 h-32 rounded-full ${
                outputs.Q 
                  ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' 
                  : 'bg-gray-400'
              } flex items-center justify-center transition-all duration-300`}
            >
              <span className="text-white font-bold text-lg">LED Q</span>
            </div>
            {/* Legs */}
            <div className="flex gap-2 mt-1">
              <div className="w-1 h-6 bg-gray-700 dark:bg-gray-300 rounded-sm"></div>
              <div className="w-1 h-6 bg-gray-700 dark:bg-gray-300 rounded-sm"></div>
            </div>
          </div>
          <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">
            {outputs.Q ? 'HIGH (1)' : 'LOW (0)'}
          </p>
        </div>

        {/* LED Q̅ */}
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            {/* LED bulb */}
            <div 
              className={`w-16 h-32 rounded-full ${
                outputs.Qbar 
                  ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' 
                  : 'bg-gray-400'
              } flex items-center justify-center transition-all duration-300`}
            >
              <span className="text-white font-bold text-lg">LED Q̅</span>
            </div>
            {/* Legs */}
            <div className="flex gap-2 mt-1">
              <div className="w-1 h-6 bg-gray-700 dark:bg-gray-300 rounded-sm"></div>
              <div className="w-1 h-6 bg-gray-700 dark:bg-gray-300 rounded-sm"></div>
            </div>
          </div>
          <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">
            {outputs.Qbar ? 'HIGH (1)' : 'LOW (0)'}
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
        <p>Q and Q̅ are complementary outputs</p>
      </div>
    </div>
  );
};

export default LedDisplay;
