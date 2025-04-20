import React from 'react';
import { FlipFlopProvider } from './context/FlipFlopContext';
import FlipFlopSelector from './components/FlipFlopSelector';
import ControlPanel from './components/ControlPanel';
import CircuitView from './components/CircuitView';
import LedDisplay from './components/LedDisplay';
import TimingDiagram from './components/TimingDiagram';
import ConversionPanel from './components/ConversionPanel';
import DarkModeToggle from './components/DarkModeToggle';
import { BookOpen, Github } from 'lucide-react';

function App() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dg text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
          <div className="flex items-baseline space-x-2">
          <h1 className="text-3xl font-bold text-dlav dark:text-dlav">FlipFlop Playground</h1>
          <h2 className="text-lg font-asswoop text-dlav dark:text-dlav">by Zengeist</h2>
          </div>
<p className="text-gray-600 dark:text-lav">
  Interactive learning tool for digital logic flip-flops
</p>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://en.wikipedia.org/wiki/Flip-flop_(electronics)" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-dlav dark:text-dlav hover:underline"
            >
              <BookOpen size={20} className="mr-1" />
              <span>Learn More</span>
            </a>
            <a 
              href="https://github.com/Zenngeist/FlipFlop-Playground" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:underline"
            >
              <Github size={20} className="mr-1" />
              <span>Source</span>
            </a>
            <DarkModeToggle />
          </div>
        </header>
        
        <FlipFlopProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <FlipFlopSelector />
            <ControlPanel />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <CircuitView />
            </div>
            <LedDisplay />
          </div>
          
          <div className="mb-6">
            <TimingDiagram />
          </div>

          <div className="mb-6">
            <ConversionPanel />
          </div>
        </FlipFlopProvider>
        
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-lav dark:text-lav">
          <p>FlipFlop Playground © 2025 | Digital ELectronics Project</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
