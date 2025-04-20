import React from 'react';
import { useFlipFlop } from '../context/FlipFlopContext';
import { getFlipFlopInputs } from '../lib/flipFlops';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const { state, setInput, toggleClock, reset, toggleClockAuto, setClockSpeed } = useFlipFlop();
  const requiredInputs = getFlipFlopInputs(state.type);

  return (
    <div className="bg-white dark:bg-lldg rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Controls</h2>
      
      <div className="mb-4">
        <div className="flex items-center mb-4">
          <button
            onClick={toggleClock}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-dlav hover:bg-orange-600 text-white mr-3 transition-colors"
            aria-label="Toggle clock"
          >
            <Clock size={24} />
          </button>
          <div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">Clock</p>
            <span 
              className={`inline-block w-4 h-4 rounded-full ${
                state.inputs.CLK ? 'bg-green-500' : 'bg-gray-400'
              }`}
            ></span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {state.inputs.CLK ? 'HIGH' : 'LOW'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={toggleClockAuto}
            className={`flex items-center justify-center px-3 py-2 rounded-md ${
              state.clockAutoRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-dlav hover:bg-lav'
            } text-white transition-colors`}
          >
            {state.clockAutoRunning ? (
              <>
                <Pause size={16} className="mr-2" /> Pause
              </>
            ) : (
              <>
                <Play size={16} className="mr-2" /> Auto Clock
              </>
            )}
          </button>
          
          <button
            onClick={reset}
            className="flex items-center justify-center px-3 py-2 rounded-md bg-dg hover:bg-gray-600 text-white transition-colors"
          >
            <RotateCcw size={16} className="mr-2" /> Reset
          </button>
        </div>
        
        <div className="mb-4">
  <label htmlFor="clockSpeed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Clock Speed: {state.clockSpeed}ms
  </label>

  <input
    id="clockSpeed"
    type="range"
    min="100"
    max="2000"
    step="100"
    value={state.clockSpeed}
    onChange={(e) => setClockSpeed(Number(e.target.value))}
    style={{
      background: `linear-gradient(to right, #7f84db 0%, #7f84db ${
        ((state.clockSpeed - 100) / (2000 - 100)) * 100
      }%, #0d0d0d ${
        ((state.clockSpeed - 100) / (2000 - 100)) * 100
      }%, #0d0d0d 100%)`,
    }}
    className="w-full h-4 rounded-lg appearance-none cursor-pointer transition-all duration-300
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:h-5
      [&::-webkit-slider-thumb]:w-5
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-dlav
      [&::-webkit-slider-thumb]:shadow-md
      [&::-webkit-slider-thumb]:transition-all
      [&::-moz-range-thumb]:appearance-none
      [&::-moz-range-thumb]:h-4
      [&::-moz-range-thumb]:w-4
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-blue-500
      [&::-moz-range-thumb]:shadow-md
      bg-gray-300 dark:bg-gray-600 translate-y-1"
  />

  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
    <span>Fast (100ms)</span>
    <span>Slow (2000ms)</span>
  </div>
</div>

      </div>
      
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Input Signals</h3>
      <div className="grid grid-cols-2 gap-3">
        {requiredInputs.filter(input => input !== 'CLK').map((input) => (
          <div key={input} className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">{input}</span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={state.inputs[input as keyof typeof state.inputs] || false}
                  onChange={() => 
                    setInput(input, !(state.inputs[input as keyof typeof state.inputs] || false))
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-lav rounded-full peer dark:bg-dg peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dlav"></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {state.inputs[input as keyof typeof state.inputs] ? 'HIGH' : 'LOW'}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;