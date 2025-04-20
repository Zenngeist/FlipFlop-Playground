import React, { useRef, useEffect } from 'react';
import { useFlipFlop } from '../context/FlipFlopContext';
import { getFlipFlopInputs } from '../lib/flipFlops';

const TimingDiagram: React.FC = () => {
  const { state } = useFlipFlop();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requiredInputs = getFlipFlopInputs(state.type).filter(input => input !== 'CLK');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up the canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    
    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.2;
    
    // Vertical grid lines (time)
    for (let x = 50; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    const signalCount = 2 + requiredInputs.length; // CLK + inputs + Q
    const signalHeight = height / signalCount;
    
    for (let y = signalHeight; y < height; y += signalHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    ctx.fillStyle = '#dfe4eb';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    ctx.fillText('CLK', 10, signalHeight / 2);
    
    requiredInputs.forEach((input, index) => {
      ctx.fillText(input, 18, signalHeight * (index + 1) + signalHeight / 2);
    });
    
    ctx.fillText('Q', 18, signalHeight * (signalCount - 1) + signalHeight / 2);

    ctx.lineWidth = 2;
    const history = state.history;
    const maxPoints = 10; // Number of state changes to show
    const pointWidth = (width - 50) / maxPoints;
    
    if (history.length === 0) {
      // Draw initial flat lines if no history
      ctx.strokeStyle = '#9ca3af';
      
      // CLK
      drawSignal(ctx, 50, signalHeight / 2, width, signalHeight / 2, false);
      
      // Inputs
      requiredInputs.forEach((input, index) => {
        const y = signalHeight * (index + 1) + signalHeight / 2;
        drawSignal(ctx, 50, y, width, y, false);
      });
      
      // Q
      const qY = signalHeight * (signalCount - 1) + signalHeight / 2;
      drawSignal(ctx, 50, qY, width, qY, false);
      
      return;
    }
    
    const slicedHistory = history.slice(-maxPoints);
    
    //CLK wala part
    ctx.strokeStyle = '#7f84db'; 
    drawWaveform(ctx, slicedHistory.map(h => h.CLK), 0, signalHeight, pointWidth, 50);
  
    requiredInputs.forEach((input, index) => {
      ctx.strokeStyle = '#3b82f6'; 
      drawWaveform(
        ctx, 
        slicedHistory.map(h => h.inputs[input] || false), 
        index + 1, 
        signalHeight, 
        pointWidth, 
        50
      );
    });
    
   // OP WALA
    ctx.strokeStyle = '#22c55e'; // hara bhara
    drawWaveform(
      ctx, 
      slicedHistory.map(h => h.outputs.Q), 
      signalCount - 1, 
      signalHeight, 
      pointWidth, 
      50
    );
    
  }, [state.history, state.type, requiredInputs]);
  
  const drawWaveform = (
    ctx: CanvasRenderingContext2D, 
    values: boolean[], 
    row: number, 
    height: number, 
    pointWidth: number, 
    startX: number
  ) => {
    if (values.length <= 1) return;
    
    const y = height * row + height / 2;
    const highY = y - height / 3;
    const lowY = y + height / 3;
    
    let prevX = startX;
    let prevY = values[0] ? highY : lowY;
    
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    
    values.forEach((value, index) => {
      const x = startX + index * pointWidth;
      const nextY = value ? highY : lowY;
      if ((index > 0 && value !== values[index - 1])) {
        ctx.lineTo(x, prevY);
        ctx.lineTo(x, nextY);
      }
      
      ctx.lineTo(x + pointWidth, nextY);
      
      prevX = x + pointWidth;
      prevY = nextY;
    });
    
    ctx.stroke();
  };
  
  const drawSignal = (
    ctx: CanvasRenderingContext2D, 
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number, 
    high: boolean
  ) => {
    const offset = 15; 
    
    ctx.beginPath();
    ctx.moveTo(x1, high ? y1 - offset : y1 + offset);
    ctx.lineTo(x2, high ? y2 - offset : y2 + offset);
    ctx.stroke();
  };
  
  return (
    <div className="bg-white dark:bg-lldg rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Timing Diagram</h2>
      <div className="bg-gray-50 dark:bg-ldg border-4 border-gray-300 dark:border-dg rounded-2xl p-2 overflow-hidden">

        <canvas 
          ref={canvasRef} 
          width={600} 
          height={240}
          className="w-full h-auto"
        ></canvas>
      </div>
      <div className="flex mt-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center mr-4">
          <span className="inline-block w-3 h-3 bg-purple-500 mr-1"></span>
          <span>Clock</span>
        </div>
        <div className="flex items-center mr-4">
          <span className="inline-block w-3 h-3 bg-blue-500 mr-1"></span>
          <span>Inputs</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-green-500 mr-1"></span>
          <span>Output (Q)</span>
        </div>
      </div>
      {state.history.length === 0 && (
        <div className="text-center mt-2 text-gray-500 dark:text-gray-400">
          Toggle the clock to see timing diagram updates
        </div>
      )}
    </div>
  );
};

export default TimingDiagram;