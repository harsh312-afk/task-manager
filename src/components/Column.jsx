import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

export default function Column({ 
  columnKey, 
  columnTitle, 
  board, 
  onDragEnd, 
  onUpdate, 
  onDelete,
  onAddTask
}) {
  return (
    <Droppable droppableId={columnKey}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex-1 bg-gray-50 p-4 rounded-lg shadow-md min-w-[200px] ${
            snapshot.isDraggingOver ? 'border-2 border-blue-500' : 'border-none'
          }`}
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              {columnTitle}
              <span className="ml-2 text-sm text-gray-500">
                ({board[columnKey].length})
              </span>
            </h2>
          </div>
          {/* AddTaskForm */}
          <AddTaskForm 
            columnKey={columnKey} 
            onAdd={onAddTask} 
          />
          {/* Tasks list */}
          <div className="space-y-3" ref={provided.innerRef}>
            {board[columnKey].map((task, index) => (
              <div key={task.id}>
                {/* Each task will be wrapped in Draggable by parent Board */}
                <Task 
                  task={task} 
                  columnKey={columnKey} 
                  onUpdate={onUpdate} 
                  onDelete={onDelete} 
                />
              </div>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
