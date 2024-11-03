import React, { useState } from 'react';
import { Timer, Activity, Coffee, Sun } from 'lucide-react';

interface WellbeingCenterProps {
  onBreakComplete: () => void;
}

export function WellbeingCenter({ onBreakComplete }: WellbeingCenterProps) {
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [isBreakActive, setIsBreakActive] = useState(false);

  const startBreak = () => {
    setIsBreakActive(true);
    setTimeout(() => {
      setIsBreakActive(false);
      onBreakComplete();
    }, 5 * 60 * 1000); // 5 minutes break
  };

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Wellbeing Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Take care of yourself while staying productive
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <Timer className="h-6 w-6 text-indigo-600" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">Break Timer</h2>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Take regular breaks to maintain productivity
          </p>
          <button
            onClick={startBreak}
            disabled={isBreakActive}
            className={`mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isBreakActive
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <Coffee className="h-4 w-4 mr-2" />
            {isBreakActive ? 'Break in progress...' : 'Start 5-min break'}
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-indigo-600" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">Mood Tracker</h2>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            How are you feeling today?
          </p>
          <div className="mt-4 flex justify-between">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setCurrentMood(level)}
                className={`p-2 rounded-full ${
                  currentMood === level
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-400 hover:text-indigo-600'
                }`}
              >
                <Sun className="h-6 w-6" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Wellness Tips</h2>
        <div className="mt-4 space-y-4">
          <WellnessTip
            title="Take a walk"
            description="A short walk can boost your energy and creativity"
          />
          <WellnessTip
            title="Stretch regularly"
            description="Simple desk stretches can prevent stiffness"
          />
          <WellnessTip
            title="Stay hydrated"
            description="Keep a water bottle at your desk"
          />
        </div>
      </div>
    </div>
  );
}

interface WellnessTipProps {
  title: string;
  description: string;
}

function WellnessTip({ title, description }: WellnessTipProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Sun className="h-5 w-5 text-indigo-600" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}