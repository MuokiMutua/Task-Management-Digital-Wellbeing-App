import { useState, useEffect } from 'react';

export function useBreakTimer(workDuration: number) {
  const [timeUntilBreak, setTimeUntilBreak] = useState(workDuration);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilBreak(prev => {
        if (prev <= 0) {
          setIsBreakTime(true);
          return workDuration;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [workDuration]);

  const resetBreakTimer = () => {
    setTimeUntilBreak(workDuration);
    setIsBreakTime(false);
  };

  return { timeUntilBreak, isBreakTime, resetBreakTimer };
}