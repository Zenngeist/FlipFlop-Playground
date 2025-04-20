import React from 'react';
import { useFlipFlop } from '../context/FlipFlopContext';

const CircuitView: React.FC = () => {
  const { state } = useFlipFlop();
  const { type, variant, inputs, outputs } = state;

  // Determine which circuit to render based on type and variant
  const renderCircuit = () => {
    if (variant === 'MasterSlave') {
      return renderMasterSlaveCircuit();
    }
    
    switch (type) {
      case 'D':
        return renderDFlipFlop();
      case 'T':
        return renderTFlipFlop();
      case 'SR':
        return renderSRFlipFlop();
      case 'JK':
        return renderJKFlipFlop();
      default:
        return <div>No circuit available</div>;
    }
  };

  // Simplified circuit representations
  const renderDFlipFlop = () => (
    <div className="relative w-full h-48 bg-gray-100 dark:bg-lldg rounded-2xl overflow-hidden">
      {/* Circuit box */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 border-2 border-gray-600 dark:border-gray-400 bg-white dark:bg-ldg rounded-lg flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          D FF
        </div>
      </div>
      
      {/* Clock input */}
      <div className={`absolute left-1/4 top-1/2 transform -translate-y-1/2 ${inputs.CLK ? 'text-green-500' : 'text-gray-500'}`}>
  <div className="w-24 border-t-2 border-current"></div>
  <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-7 font-mono">CLK</div>
  <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
</div>

      
      {/* D input */}
      <div className={`absolute left-1/4 top-1/3 transform -translate-y-1/2 ${inputs.D ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-3 font-mono">D</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* Q output */}
      <div className={`absolute right-1/4 top-1/3 transform -translate-y-1/2 ${outputs.Q ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
      
      {/* Q̅ output */}
      <div className={`absolute right-1/4 top-2/3 transform -translate-y-1/2 ${outputs.Qbar ? 'text-red-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q̅</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
    </div>
  );

  const renderTFlipFlop = () => (
    <div className="relative w-full h-48 bg-gray-100 dark:bg-lldg rounded-2xl overflow-hidden">
      {/* Circuit box */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 border-2 border-gray-600 dark:border-gray-400 bg-white dark:bg-ldg rounded-lg flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          T FF
        </div>
      </div>
      
      {/* Clock input */}
      <div className={`absolute left-1/4 top-1/2 transform -translate-y-1/2 ${inputs.CLK ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-7 font-mono">CLK</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* T input */}
      <div className={`absolute left-1/4 top-1/3 transform -translate-y-1/2 ${inputs.T ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-3 font-mono">T</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* Q output */}
      <div className={`absolute right-1/4 top-1/3 transform -translate-y-1/2 ${outputs.Q ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
      
      {/* Q̅ output */}
      <div className={`absolute right-1/4 top-2/3 transform -translate-y-1/2 ${outputs.Qbar ? 'text-red-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q̅</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
    </div>
  );

  const renderSRFlipFlop = () => (
    <div className="relative w-full h-48 bg-gray-100 dark:bg-lldg rounded-2xl overflow-hidden">
      {/* Circuit box */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 border-2 border-gray-600 dark:border-gray-400 bg-white dark:bg-ldg rounded-lg flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          SR FF
        </div>
      </div>
      
      {/* Clock input */}
      <div className={`absolute left-1/4 top-1/2 transform -translate-y-1/2 ${inputs.CLK ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-7 font-mono">CLK</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* S input */}
      <div className={`absolute left-1/4 top-1/4 transform -translate-y-1/2 ${inputs.S ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-3 font-mono">S</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* R input */}
      <div className={`absolute left-1/4 top-3/4 transform -translate-y-1/2 ${inputs.R ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-3 font-mono">R</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* Q output */}
      <div className={`absolute right-1/4 top-1/3 transform -translate-y-1/2 ${outputs.Q ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
      
      {/* Q̅ output */}
      <div className={`absolute right-1/4 top-2/3 transform -translate-y-1/2 ${outputs.Qbar ? 'text-red-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q̅</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
    </div>
  );

  const renderJKFlipFlop = () => (
    <div className="relative w-full h-48 bg-gray-100 dark:bg-lldg rounded-2xl overflow-hidden">
      {/* Circuit box */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 border-2 border-gray-600 dark:border-gray-400 bg-white dark:bg-ldg rounded-lg flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          JK FF
        </div>
      </div>
      
      {/* Clock input */}
      <div className={`absolute left-1/4 top-1/2 transform -translate-y-1/2 ${inputs.CLK ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-7 font-mono">CLK</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* J input */}
      <div className={`absolute left-1/4 top-1/4 transform -translate-y-1/2 ${inputs.J ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-3 font-mono">J</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* K input */}
      <div className={`absolute left-1/4 top-3/4 transform -translate-y-1/2 ${inputs.K ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-3 font-mono">K</div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-20 font-mono">|</div>
      </div>
      
      {/* Q output */}
      <div className={`absolute right-1/4 top-1/3 transform -translate-y-1/2 ${outputs.Q ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
      
      {/* Q̅ output */}
      <div className={`absolute right-1/4 top-2/3 transform -translate-y-1/2 ${outputs.Qbar ? 'text-red-500' : 'text-gray-500'}`}>
        <div className="w-24 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q̅</div>
        <div className="absolute left-0 top-0  transform -translate-y-1/2 -translate-x-1 font-mono">|</div>
      </div>
    </div>
  );

  const renderMasterSlaveCircuit = () => (
    <div className="relative w-full h-64 bg-gray-100 dark:bg-lldg rounded-2xl overflow-hidden">
      {/* Master circuit box */}
      <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-28 border-2 border-gray-600 dark:border-gray-400 bg-white dark:bg-ldg rounded-lg flex items-center justify-center">
        <div className="text-lg font-bold text-gray-800 dark:text-white ">
          Master
        </div>
      </div>
      
      {/* Slave circuit box */}
      <div className="absolute right-1/3 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-32 h-28 border-2 border-gray-600 dark:border-gray-400 bg-white dark:bg-ldg rounded-lg flex items-center justify-center ">
        <div className={'text-lg font-bold text-gray-800 dark:text-white '}>
          Slave
        </div>
      </div>
      
      {/* Connect master to slave */}
      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-20 border-t-2 border-gray-500 ">
      <div className="absolute left-0 top-0 transform -translate-y-1/2 translate-x-5 font-mono ">Master O/P</div>
      </div>
      
      {/* Clock input */}
      <div className={`absolute left-[15%] top-3/4 transform -translate-y-10 ${inputs.CLK ? 'text-green-500' : 'text-gray-500'}`}>
        <div className="w-16 border-t-2 border-current"></div>
        <div className="absolute left-3 top-0  transform -translate-y-1/2 translate-x-12 font-mono">|</div>
        <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-7 font-mono">CLK</div>
      </div>
      
      {/* Clock inverter to slave */}
      <div className={`absolute left-1/2 top-3/4 transform translate-x-3 -translate-y-7 ${!inputs.CLK ? 'text-green-500' : 'text-gray-500'}`}>
      <div className="absolute left-7 top-4 transform translate-x-3 -translate-y-7 font-mono">|</div>
      <div className="w-11 border-t-2 border-current"></div>
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-current font -translate-x-9 -translate-y-4">¬CLK</span>
        </div>
        
      </div>
      
      {/* Primary input */}
      <div className={'absolute left-16 top-3  transform translate-y-20 translate-x-20 font-mono   '}>-|</div>
      <div
  className={`absolute left-[15%] top-1/4 transform translate-y-10 ${
    getActiveInput() ? 'text-green-500' : 'text-gray-500'
  }`}
>
  <div className="w-16 border-t-2 border-current"></div>
  <div
    className={`absolute left-0 top-0 transform -translate-y-1/2 font-mono ${
      ['S/R', 'J/K'].includes(getInputLabel()) ? '-translate-x-7' : '-translate-x-3'
    }`}
  >
    {getInputLabel()}
  </div>
</div>

      
      {/* Q output */}
      <div className={`absolute right-[15%] top-1/3 transform translate-y-3 ${outputs.Q ? 'text-green-500' : 'text-gray-500'}`}>
      <div className="absolute -right-3 top-0 transform -translate-y-1/2 -translate-x-16 font-mono">|-</div>
        <div className="w-16 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q</div>
      </div>
      
      {/* Q̅ output */}
      <div className={`absolute right-[15%] top-2/3 transform -translate-y-4 ${outputs.Qbar ? 'text-red-500' : 'text-gray-500'}`}>
      <div className="absolute -right-3 top-0 transform -translate-y-1/2 -translate-x-16 font-mono">|-</div>
        <div className="w-16 border-t-2 border-current"></div>
        <div className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-3 font-mono">Q̅</div>
      </div>
    </div>
  );

  // Helper to get the active input label
  const getInputLabel = () => {
    switch (type) {
      case 'D': return 'D';
      case 'T': return 'T';
      case 'SR': return 'S/R';
      case 'JK': return 'J/K';
      default: return '';
    }
  };

  // Helper to check if any input is active
  const getActiveInput = () => {
    switch (type) {
      case 'D': return inputs.D;
      case 'T': return inputs.T;
      case 'SR': return inputs.S || inputs.R;
      case 'JK': return inputs.J || inputs.K;
      default: return false;
    }
  };

  return (
    <div className="bg-white dark:bg-bl rounded-2xl shadow-md p-4 border-2 dark:border-gray-500">

      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Circuit Diagram</h2>
      {renderCircuit()}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
        Simplified circuit representation
      </div>
    </div>
  );
};

export default CircuitView;