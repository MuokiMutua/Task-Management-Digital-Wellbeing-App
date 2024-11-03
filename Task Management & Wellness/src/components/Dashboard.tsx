import React from 'react';
import { Clock, Battery, TrendingUp, BarChart2, Target, Calendar } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

interface DashboardProps {
  timeUntilBreak: number;
  isBreakTime: boolean;
}

export function Dashboard({ timeUntilBreak, isBreakTime }: DashboardProps) {
  const { tasks, metrics } = useTasks();
  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your productivity score: {metrics.productivityScore.toFixed(1)}%
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={<Clock className="h-6 w-6 text-blue-500" />}
          title="Focus Timer"
          value={isBreakTime ? "Time for a break!" : `${timeUntilBreak}m until break`}
          subtitle="25/5 Pomodoro cycle"
        />
        <DashboardCard
          icon={<Battery className="h-6 w-6 text-green-500" />}
          title="Task Completion"
          value={`${metrics.completionRate.toFixed(1)}%`}
          subtitle={`${tasks.filter(t => t.completed).length}/${tasks.length} tasks completed`}
        />
        <DashboardCard
          icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
          title="Avg. Completion Time"
          value={`${Math.round(metrics.averageCompletionTime)} min`}
          subtitle="Per completed task"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Priority Distribution</h2>
            <BarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {(['high', 'medium', 'low'] as const).map(priority => (
              <div key={priority} className="flex items-center">
                <span className="w-20 text-sm text-gray-500 capitalize">{priority}</span>
                <div className="flex-1 mx-2">
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${
                        priority === 'high' 
                          ? 'bg-red-500' 
                          : priority === 'medium' 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`}
                      style={{
                        width: `${(metrics.tasksByPriority[priority] || 0) / tasks.length * 100}%`
                      }}
                    />
                  </div>
                </div>
                <span className="w-8 text-sm text-gray-500">
                  {metrics.tasksByPriority[priority] || 0}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingTasks.slice(0, 3).map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' 
                        ? 'bg-red-500' 
                        : task.priority === 'medium' 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-900">{task.title}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {task.dueDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

function DashboardCard({ icon, title, value, subtitle }: DashboardCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <h3 className="ml-3 text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}