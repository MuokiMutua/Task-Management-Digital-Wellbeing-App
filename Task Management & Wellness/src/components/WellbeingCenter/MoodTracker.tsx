import React from 'react';
import { Activity, Frown, Meh, Smile, Heart } from 'lucide-react';

interface MoodTrackerProps {
  currentMood: number;
  onMoodChange: (mood: number) => void;
}

export function MoodTracker({ currentMood, onMoodChange }: MoodTrackerProps) {
  const moods = [
    { icon: Frown, label: 'Stressed' },
    { icon: Meh, label: 'Tired' },
    { icon: Smile, label: 'Good' },
    { icon: Heart, label: 'Great' },
    { icon: Activity, label: 'Energized' },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center">
        <Activity className="h-6 w-6 text-indigo-600" />
        <h2 className="ml-3 text-lg font-medium text-gray-900">Mood Tracker</h2>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        How are you feeling today?
      </p>
      <div className="mt-4">
        <div className="flex justify-between">
          {moods.map((mood, index) => {
            const Icon = mood.icon;
            return (
              <button
                key={index}
                onClick={() => onMoodChange(index + 1)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  currentMood === index + 1
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-400 hover:text-indigo-600'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-xs font-medium">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}