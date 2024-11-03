import React, { useState, useEffect } from 'react';
import { Timer, Coffee, RefreshCw } from 'lucide-react';

interface BreakTimerProps {
  onBreakComplete: () => void;
}

export function BreakTimer({ onBreakComplete }: BreakTimerProps) {
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let timer: number;
    if (isBreakActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreakActive(false);
      onBreakComplete();
    }
    return () => clearInterval(timer);
  }, [isBreakActive, timeLeft, onBreakComplete]);

  const startBreak = () => {
    setIsBreakActive(true);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center">
        <Timer className="h-6 w-6 text-indigo-600" />
        <h2 className="ml-3 text-lg font-medium text-gray-900">Break Timer</h2>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Take regular breaks to maintain productivity
      </p>
      <div className="mt-4 flex flex-col items-center">
        {isBreakActive && (
          <div className="text-3xl font-bold text-indigo-600 mb-4">
            {formatTime(timeLeft)}
          </div>
        )}
        <button
          onClick={startBreak}
          disabled={isBreakActive}
          className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isBreakActive
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isBreakActive ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Coffee className="h-4 w-4 mr-2" />
          )}
          {isBreakActive ? 'Break in progress...' : 'Start 5-min break'}
        </button>
      </div>
    </div>
  );
}