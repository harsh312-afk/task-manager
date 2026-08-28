import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        <p className="mt-2 text-gray-600">
          Drag and drop tasks between columns to update their status.
        </p>
      </header>
      <main className="max-w-7xl mx-auto">
        <Board />
      </main>
    </div>
  );
}

export default App;
