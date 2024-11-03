import React from 'react';
import { Calendar, Flag, Trash2, Clock } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

export function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {sortedTasks.map((task) => (
        <div key={task.id} className="p-6 hover:bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300"
              />
              <div>
                <h3 className={`text-sm font-medium ${
                  task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {task.dueDate}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Flag className={`h-4 w-4 mr-1 ${
                      task.priority === 'high' 
                        ? 'text-red-500' 
                        : task.priority === 'medium'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                    }`} />
                    {task.priority}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {task.estimatedTime}m
                  </span>
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {task.category}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}