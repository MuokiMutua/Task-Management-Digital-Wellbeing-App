import React, { useState } from 'react';
import { BreakTimer } from './BreakTimer';
import { MoodTracker } from './MoodTracker';
import { Sun } from 'lucide-react';

interface WellbeingCenterProps {
  onBreakComplete: () => void;
}

export function WellbeingCenter({ onBreakComplete }: WellbeingCenterProps) {
  const [currentMood, setCurrentMood] = useState<number>(3);

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Wellbeing Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Take care of yourself while staying productive
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <BreakTimer onBreakComplete={onBreakComplete} />
        <MoodTracker currentMood={currentMood} onMoodChange={setCurrentMood} />
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