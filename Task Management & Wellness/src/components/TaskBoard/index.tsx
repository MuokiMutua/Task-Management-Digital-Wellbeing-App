import React from 'react';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

export function TaskBoard() {
  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and organize your tasks
        </p>
      </header>

      <TaskForm />
      <TaskList />
    </div>
  );
}