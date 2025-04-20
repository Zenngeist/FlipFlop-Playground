import React from 'react';
import { useFlipFlop } from '../context/FlipFlopContext';
import { FlipFlopType } from '../lib/types';
import { conversionEquations } from '../lib/conversions';

const ConversionPanel: React.FC = () => {
  const { state, setConversion } = useFlipFlop();
  const { type: currentType, conversion } = state;

  const flipFlopTypes: FlipFlopType[] = ['D', 'T', 'SR', 'JK'];
  const availableConversions = flipFlopTypes.filter(t => t !== currentType);

  const handleConversionSelect = (targetType: FlipFlopType) => {
    setConversion(targetType);
  };

  const renderTruthTable = () => {
    if (!conversion) return null;

    const conversionData = conversionEquations[currentType][conversion.targetType];
    const { truthTable } = conversionData;

    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Truth Table (The Don't Care Configurations are not included)</h4>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500 border-4 dark:border-ldg  ">
            <thead>
              <tr>
                {truthTable.inputs.map((input, i) => (
                  <th key={`input-${i}`} className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {input}
                  </th>
                ))}
                {truthTable.outputs.map((output, i) => (
                  <th key={`output-${i}`} className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {output}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-500 ">
              {truthTable.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-ldg' : 'bg-gray-50 dark:bg-ldg'}>
                  {row.inputs.map((input, j) => (
                    <td key={`input-${i}-${j}`} className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
                      {input ? '1' : '0'}
                    </td>
                  ))}
                  {row.outputs.map((output, j) => (
                    <td key={`output-${i}-${j}`} className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
                      {output ? '1' : '0'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderEquations = () => {
    if (!conversion) return null;

    const conversionData = conversionEquations[currentType][conversion.targetType];
    
    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Conversion Equations</h4>
        <div className="space-y-2">
          {conversionData.equations.map((eq, i) => (
            <div key={i} className="p-2 bg-gray-100 dark:bg-dg rounded font-mono text-sm">
              {eq}
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {conversionData.description}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-lldg rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Flip-Flop Conversion</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Convert {currentType} Flip-Flop to:
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableConversions.map((type) => (
            <button
              key={type}
              onClick={() => handleConversionSelect(type)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                conversion?.targetType === type
                  ? 'bg-dlav text-white'
                  : 'bg-gray-200 dark:bg-dg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {type} Flip-Flop
            </button>
          ))}
        </div>
      </div>

      {conversion && (
        <>
          {renderEquations()}
          {renderTruthTable()}
        </>
      )}
    </div>
  );
};

export default ConversionPanel;