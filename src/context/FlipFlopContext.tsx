import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { FlipFlopState, FlipFlopAction, FlipFlopType, FlipFlopVariant, FlipFlopOutput } from '../lib/types';
import { processFlipFlop } from '../lib/flipFlops';
import { convertFlipFlop } from '../lib/conversions';

// Initial state for the flip-flop
const initialState: FlipFlopState = {
  type: 'D',
  variant: 'Standard',
  inputs: {
    CLK: false,
    D: false,
    T: false,
    S: false,
    R: false,
    J: false,
    K: false,
  },
  outputs: {
    Q: false,
    Qbar: true,
  },
  history: [],
  clockAutoRunning: false,
  clockSpeed: 1000, // 1 second default
  conversion: null,
};

// Reducer to handle state updates
function flipFlopReducer(state: FlipFlopState, action: FlipFlopAction): FlipFlopState {
  switch (action.type) {
    case 'SET_FLIPFLOP_TYPE':
      return {
        ...state,
        type: action.payload as FlipFlopType,
        // Reset inputs not applicable to this flip-flop type
        inputs: {
          ...state.inputs,
          D: state.type === 'D' ? state.inputs.D : false,
          T: state.type === 'T' ? state.inputs.T : false,
          S: state.type === 'SR' ? state.inputs.S : false,
          R: state.type === 'SR' ? state.inputs.R : false,
          J: state.type === 'JK' ? state.inputs.J : false,
          K: state.type === 'JK' ? state.inputs.K : false,
        },
        history: [], // Reset history when changing flip-flop type
        conversion: null, // Reset conversion when changing type
      };
    
    case 'SET_FLIPFLOP_VARIANT':
      return {
        ...state,
        variant: action.payload as FlipFlopVariant,
        history: [], // Reset history when changing variant
      };
    
    case 'SET_INPUT':
      const { name, value } = action.payload;
      const newInputs = { ...state.inputs, [name]: value };
      
      // For clock input, we need to calculate the new output
      if (name === 'CLK') {
        const newOutputs = processFlipFlop(state.type, state.variant, newInputs, state.outputs);
        const newHistoryEntry = {
          time: Date.now(),
          CLK: newInputs.CLK,
          inputs: { ...newInputs },
          outputs: { ...newOutputs },
        };
        
        return {
          ...state,
          inputs: newInputs,
          outputs: newOutputs,
          history: [...state.history, newHistoryEntry].slice(-50), // Keep last 50 entries
        };
      }
      
      return {
        ...state,
        inputs: newInputs,
      };
    
    case 'SET_CONVERSION':
      return {
        ...state,
        conversion: {
          sourceType: state.type,
          targetType: action.payload as FlipFlopType,
          intermediateSignals: convertFlipFlop(
            state.type,
            action.payload as FlipFlopType,
            state.inputs,
            state.outputs.Q
          ),
        },
      };
    
    case 'RESET':
      return {
        ...initialState,
        type: state.type,
        variant: state.variant,
        clockSpeed: state.clockSpeed,
      };
    
    case 'TOGGLE_CLOCK_AUTO':
      return {
        ...state,
        clockAutoRunning: !state.clockAutoRunning,
      };
    
    case 'SET_CLOCK_SPEED':
      return {
        ...state,
        clockSpeed: action.payload as number,
      };
    
    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
      };
    
    default:
      return state;
  }
}

// Create context
const FlipFlopContext = createContext<{
  state: FlipFlopState;
  setFlipFlopType: (type: FlipFlopType) => void;
  setFlipFlopVariant: (variant: FlipFlopVariant) => void;
  setInput: (name: string, value: boolean) => void;
  setConversion: (targetType: FlipFlopType) => void;
  toggleClock: () => void;
  reset: () => void;
  toggleClockAuto: () => void;
  setClockSpeed: (speed: number) => void;
  clearHistory: () => void;
}>({
  state: initialState,
  setFlipFlopType: () => {},
  setFlipFlopVariant: () => {},
  setInput: () => {},
  setConversion: () => {},
  toggleClock: () => {},
  reset: () => {},
  toggleClockAuto: () => {},
  setClockSpeed: () => {},
  clearHistory: () => {},
});

// Provider component
export const FlipFlopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(flipFlopReducer, initialState);

  const setFlipFlopType = useCallback((type: FlipFlopType) => {
    dispatch({ type: 'SET_FLIPFLOP_TYPE', payload: type });
  }, []);

  const setFlipFlopVariant = useCallback((variant: FlipFlopVariant) => {
    dispatch({ type: 'SET_FLIPFLOP_VARIANT', payload: variant });
  }, []);

  const setInput = useCallback((name: string, value: boolean) => {
    dispatch({ type: 'SET_INPUT', payload: { name, value } });
  }, []);

  const setConversion = useCallback((targetType: FlipFlopType) => {
    dispatch({ type: 'SET_CONVERSION', payload: targetType });
  }, []);

  const toggleClock = useCallback(() => {
    setInput('CLK', !state.inputs.CLK);
  }, [state.inputs.CLK, setInput]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const toggleClockAuto = useCallback(() => {
    dispatch({ type: 'TOGGLE_CLOCK_AUTO' });
  }, []);

  const setClockSpeed = useCallback((speed: number) => {
    dispatch({ type: 'SET_CLOCK_SPEED', payload: speed });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  // Handle automatic clock
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (state.clockAutoRunning) {
      intervalId = setInterval(() => {
        toggleClock();
      }, state.clockSpeed);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.clockAutoRunning, state.clockSpeed, toggleClock]);

  return (
    <FlipFlopContext.Provider
      value={{
        state,
        setFlipFlopType,
        setFlipFlopVariant,
        setInput,
        setConversion,
        toggleClock,
        reset,
        toggleClockAuto,
        setClockSpeed,
        clearHistory,
      }}
    >
      {children}
    </FlipFlopContext.Provider>
  );
};

// Custom hook for using the context
export const useFlipFlop = () => useContext(FlipFlopContext);