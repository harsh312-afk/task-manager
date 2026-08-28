import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import { loadBoard, saveBoard } from '../utils/storage';

export default function Board() {
  const [board, setBoard] = useState(() => loadBoard());

  // Save board to localStorage whenever it changes
  // We'll use useEffect with board as dependency
  // But note: we want to save on every change, so we'll do it in the update functions
  // Alternatively, we can use useEffect and it will run on every board change.
  // However, to avoid saving too frequently, we can save in each mutation function.
  // Let's do: save in each function that updates the board.

  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    // Dropped outside
    if (!destination) return;

    // Dropped in the same column and same index
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move the item
    const startColumn = board[source.droppableId];
    const finishColumn = board[destination.droppableId];

    // If moving between different columns, we also need to update the task's status?
    // In our case, the status is implicit by the column. We'll just move the task object.
    // The task object doesn't have a status field; we rely on the column it's in.
    // So when moving, we just move the task from one column array to another.

    // Remove the task from start column
    const [movedTask] = startColumn.splice(source.index, 1);
    // Insert the task into finish column
    finishColumn.splice(destination.index, 0, movedTask);

    // Update the board state
    const newBoard = {
      ...board,
      [source.droppableId]: startColumn,
      [destination.droppableId]: finishColumn,
    };

    setBoard(newBoard);
    saveBoard(newBoard);
  };

  const handleAddTask = (columnKey, task) => {
    setBoard(prev => {
      const newBoard = {
        ...prev,
        [columnKey]: [...prev[columnKey], task],
      };
      saveBoard(newBoard);
      return newBoard;
    });
  };

  const handleUpdateTask = (columnKey, taskId, updates) => {
    setBoard(prev => {
      const newBoard = { ...prev };
      const taskIndex = newBoard[columnKey].findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        newBoard[columnKey][taskIndex] = {
          ...newBoard[columnKey][taskIndex],
          ...updates,
        };
        saveBoard(newBoard);
      }
      return newBoard;
    });
  };

  const handleDeleteTask = (columnKey, taskId) => {
    setBoard(prev => {
      const newBoard = { ...prev };
      newBoard[columnKey] = newBoard[columnKey].filter(t => t.id !== taskId);
      saveBoard(newBoard);
      return newBoard;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4">
        <Column
          columnKey="todo"
          columnTitle="To Do"
          board={board}
          onDragEnd={handleDragEnd}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onAddTask={handleAddTask}
        />
        <Column
          columnKey="inProgress"
          columnTitle="In Progress"
          board={board}
          onDragEnd={handleDragEnd}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onAddTask={handleAddTask}
        />
        <Column
          columnKey="done"
          columnTitle="Done"
          board={board}
          onDragEnd={handleDragEnd}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onAddTask={handleAddTask}
        />
      </div>
    </DragDropContext>
  );
}
