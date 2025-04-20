// Logic implementations for different flip-flop types

import { FlipFlopType, FlipFlopVariant, FlipFlopOutput } from './types';

// D Flip-Flop implementation
export function dFlipFlop(clk: boolean, d: boolean, prevOutput: FlipFlopOutput, posEdge = true): FlipFlopOutput {
  // Only change on positive edge of clock (or negative edge if posEdge is false)
  if ((posEdge && clk) || (!posEdge && !clk)) {
    return { Q: d, Qbar: !d };
  }
  return prevOutput;
}

// T Flip-Flop implementation
export function tFlipFlop(clk: boolean, t: boolean, prevOutput: FlipFlopOutput, posEdge = true): FlipFlopOutput {
  // Only change on positive edge of clock (or negative edge if posEdge is false)
  if (((posEdge && clk) || (!posEdge && !clk)) && t) {
    return { Q: !prevOutput.Q, Qbar: !prevOutput.Qbar };
  }
  return prevOutput;
}

// SR Flip-Flop implementation
export function srFlipFlop(clk: boolean, s: boolean, r: boolean, prevOutput: FlipFlopOutput, posEdge = true): FlipFlopOutput {
  // Only change on positive edge of clock (or negative edge if posEdge is false)
  if ((posEdge && clk) || (!posEdge && !clk)) {
    if (s && r) {
      // SR = 11 is usually invalid/unpredictable, but we'll set both outputs to 0 for simplicity
      return { Q: false, Qbar: false };
    } else if (s) {
      return { Q: true, Qbar: false };
    } else if (r) {
      return { Q: false, Qbar: true };
    }
  }
  return prevOutput;
}

// JK Flip-Flop implementation
export function jkFlipFlop(clk: boolean, j: boolean, k: boolean, prevOutput: FlipFlopOutput, posEdge = true): FlipFlopOutput {
  // Only change on positive edge of clock (or negative edge if posEdge is false)
  if ((posEdge && clk) || (!posEdge && !clk)) {
    if (j && k) {
      return { Q: !prevOutput.Q, Qbar: !prevOutput.Qbar }; // Toggle
    } else if (j) {
      return { Q: true, Qbar: false }; // Set
    } else if (k) {
      return { Q: false, Qbar: true }; // Reset
    }
  }
  return prevOutput;
}

// Process flip-flop based on type, inputs, and previous state
export function processFlipFlop(
  type: FlipFlopType,
  variant: FlipFlopVariant,
  inputs: { CLK: boolean; D?: boolean; T?: boolean; S?: boolean; R?: boolean; J?: boolean; K?: boolean },
  prevOutput: FlipFlopOutput
): FlipFlopOutput {
  // For master-slave, we need to handle the two-stage process
  // Master captures on clock HIGH, slave on clock LOW
  if (variant === 'MasterSlave') {
    // Master latch (positive edge triggered)
    const masterOutput = computeOutput(type, true, inputs, prevOutput);
    // Slave latch (negative edge triggered)
    return computeOutput(type, false, { ...inputs, D: masterOutput.Q, T: masterOutput.Q, S: masterOutput.Q, R: !masterOutput.Q, J: masterOutput.Q, K: !masterOutput.Q }, masterOutput);
  } else {
    // Standard flip-flop
    return computeOutput(type, true, inputs, prevOutput);
  }
}

// Helper function to compute output based on flip-flop type
function computeOutput(
  type: FlipFlopType,
  posEdge: boolean,
  inputs: { CLK: boolean; D?: boolean; T?: boolean; S?: boolean; R?: boolean; J?: boolean; K?: boolean },
  prevOutput: FlipFlopOutput
): FlipFlopOutput {
  switch (type) {
    case 'D':
      return dFlipFlop(inputs.CLK, inputs.D || false, prevOutput, posEdge);
    case 'T':
      return tFlipFlop(inputs.CLK, inputs.T || false, prevOutput, posEdge);
    case 'SR':
      return srFlipFlop(inputs.CLK, inputs.S || false, inputs.R || false, prevOutput, posEdge);
    case 'JK':
      return jkFlipFlop(inputs.CLK, inputs.J || false, inputs.K || false, prevOutput, posEdge);
    default:
      return prevOutput;
  }
}

// Return input requirements for each flip-flop type
export function getFlipFlopInputs(type: FlipFlopType): string[] {
  switch (type) {
    case 'D':
      return ['CLK', 'D'];
    case 'T':
      return ['CLK', 'T'];
    case 'SR':
      return ['CLK', 'S', 'R'];
    case 'JK':
      return ['CLK', 'J', 'K'];
    default:
      return ['CLK'];
  }
}

// Get description for each flip-flop type
export function getFlipFlopDescription(type: FlipFlopType, variant: FlipFlopVariant): string {
  const variantText = variant === 'MasterSlave' ? 'Master-Slave ' : '';
  
  switch (type) {
    case 'D':
      return `${variantText}D Flip-Flop: Data is stored on the rising edge of the clock. The output Q follows the input D when the clock triggers.`;
    case 'T':
      return `${variantText}T Flip-Flop: Toggle flip-flop. Output toggles when T=1 and clock triggers, remains unchanged when T=0.`;
    case 'SR':
      return `${variantText}SR Flip-Flop: Set-Reset flip-flop. S=1 sets output to 1, R=1 resets output to 0. S=R=1 is usually an invalid state.`;
    case 'JK':
      return `${variantText}JK Flip-Flop: Like SR but with J=K=1 causing a toggle operation, eliminating the invalid state issue of SR.`;
    default:
      return '';
  }
}