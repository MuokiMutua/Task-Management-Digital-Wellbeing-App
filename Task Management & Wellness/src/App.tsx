import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TaskBoard } from './components/TaskBoard';
import { WellbeingCenter } from './components/WellbeingCenter';
import { useBreakTimer } from './hooks/useBreakTimer';
import { TaskProvider } from './context/TaskContext';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const { timeUntilBreak, isBreakTime, resetBreakTimer } = useBreakTimer(25); // 25-minute work intervals

  return (
    <TaskProvider>
      <Layout activeView={activeView} onViewChange={setActiveView}>
        {activeView === 'dashboard' && (
          <Dashboard timeUntilBreak={timeUntilBreak} isBreakTime={isBreakTime} />
        )}
        {activeView === 'tasks' && <TaskBoard />}
        {activeView === 'wellbeing' && (
          <WellbeingCenter onBreakComplete={resetBreakTimer} />
        )}
      </Layout>
    </TaskProvider>
  );
}

export default App;