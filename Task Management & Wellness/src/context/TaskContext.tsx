import React, { createContext, useContext, useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime?: number; // in minutes
  actualTime?: number;
  category?: string;
  lastModified: number;
}

interface TaskMetrics {
  completionRate: number;
  averageCompletionTime: number;
  productivityScore: number;
  tasksByPriority: Record<string, number>;
}

interface TaskContextType {
  tasks: Task[];
  metrics: TaskMetrics;
  addTask: (task: Omit<Task, 'id' | 'lastModified'>) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  suggestPriority: (title: string, dueDate: string) => 'low' | 'medium' | 'high';
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Draft and submit the Q2 project proposal',
      completed: false,
      dueDate: '2024-03-20',
      priority: 'high',
      estimatedTime: 120,
      category: 'work',
      lastModified: Date.now(),
    },
    {
      id: '2',
      title: 'Review team updates',
      description: 'Check weekly progress reports',
      completed: true,
      dueDate: '2024-03-19',
      priority: 'medium',
      estimatedTime: 30,
      category: 'work',
      lastModified: Date.now(),
    },
  ]);

  const [metrics, setMetrics] = useState<TaskMetrics>({
    completionRate: 0,
    averageCompletionTime: 0,
    productivityScore: 0,
    tasksByPriority: { low: 0, medium: 0, high: 0 },
  });

  // Calculate metrics whenever tasks change
  useEffect(() => {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageCompletionTime = tasks
      .filter(t => t.completed && t.actualTime)
      .reduce((acc, task) => acc + (task.actualTime || 0), 0) / completed || 0;

    // Productivity score based on completion rate and priority distribution
    const productivityScore = Math.min(
      100,
      completionRate * 0.6 + 
      (tasksByPriority.high || 0) * 10 + 
      (tasksByPriority.medium || 0) * 5
    );

    setMetrics({
      completionRate,
      averageCompletionTime,
      productivityScore,
      tasksByPriority,
    });
  }, [tasks]);

  const suggestPriority = (title: string, dueDate: string): 'low' | 'medium' | 'high' => {
    const daysUntilDue = Math.ceil(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    
    // Simple AI logic based on keywords and due date
    const urgentKeywords = ['urgent', 'asap', 'important', 'critical'];
    const hasUrgentKeyword = urgentKeywords.some(keyword => 
      title.toLowerCase().includes(keyword)
    );

    if (hasUrgentKeyword || daysUntilDue <= 2) return 'high';
    if (daysUntilDue <= 5) return 'medium';
    return 'low';
  };

  const addTask = (task: Omit<Task, 'id' | 'lastModified'>) => {
    setTasks(prev => [...prev, { 
      ...task, 
      id: crypto.randomUUID(),
      lastModified: Date.now(),
    }]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id 
          ? { 
              ...task, 
              completed: !task.completed,
              lastModified: Date.now(),
              actualTime: task.estimatedTime // Simple time tracking
            } 
          : task
      )
    );
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => 
        task.id === id 
          ? { ...task, ...updates, lastModified: Date.now() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ 
        tasks, 
        metrics, 
        addTask, 
        toggleTask, 
        updateTask, 
        deleteTask,
        suggestPriority
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}