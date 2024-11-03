import React from 'react';
import { LayoutGrid, CheckSquare, Heart, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Layout({ children, activeView, onViewChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <LayoutGrid className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Taskflow</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavButton
                  icon={<LayoutGrid />}
                  text="Dashboard"
                  isActive={activeView === 'dashboard'}
                  onClick={() => onViewChange('dashboard')}
                />
                <NavButton
                  icon={<CheckSquare />}
                  text="Tasks"
                  isActive={activeView === 'tasks'}
                  onClick={() => onViewChange('tasks')}
                />
                <NavButton
                  icon={<Heart />}
                  text="Wellbeing"
                  isActive={activeView === 'wellbeing'}
                  onClick={() => onViewChange('wellbeing')}
                />
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon, text, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
        isActive
          ? 'border-b-2 border-indigo-500 text-gray-900'
          : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
}