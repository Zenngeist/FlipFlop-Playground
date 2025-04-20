// Type definitions for the FlipFlop Playground

export type FlipFlopType = 'D' | 'T' | 'SR' | 'JK';
export type FlipFlopVariant = 'Standard' | 'MasterSlave';
export type FlipFlopOutput = {
  Q: boolean;
  Qbar: boolean;
};

export interface ConversionState {
  sourceType: FlipFlopType;
  targetType: FlipFlopType;
  intermediateSignals: Record<string, boolean>;
}

export interface FlipFlopState {
  type: FlipFlopType;
  variant: FlipFlopVariant;
  inputs: {
    CLK: boolean;
    D?: boolean;
    T?: boolean;
    S?: boolean;
    R?: boolean;
    J?: boolean;
    K?: boolean;
  };
  outputs: FlipFlopOutput;
  history: {
    time: number;
    CLK: boolean;
    inputs: Record<string, boolean>;
    outputs: FlipFlopOutput;
  }[];
  clockAutoRunning: boolean;
  clockSpeed: number; // in milliseconds
  conversion: ConversionState | null;
}

export interface FlipFlopAction {
  type: string;
  payload?: any;
}

export interface ConversionEquation {
  from: FlipFlopType;
  to: FlipFlopType;
  equations: string[];
  description: string;
  truthTable: {
    inputs: string[];
    outputs: string[];
    rows: Array<{
      inputs: boolean[];
      outputs: boolean[];
    }>;
  };
}