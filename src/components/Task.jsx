import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';

export default function Task({ task, columnKey, onUpdate, onDelete, onStartDrag }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert('Title is required');
      return;
    }
    onUpdate(columnKey, task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div
      className="cursor-grab bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      // We'll add drag and drop attributes via the parent Draggable component
    >
      {/* Drag handle area (optional visual cue) */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex space-x-2">
          <span className="text-xs text-gray-400">⋮⋮</span>
        </div>
        <div className="flex space-x-2 text-sm text-gray-400">
          <button
            onClick={() => setIsEditing(true)}
            title="Edit"
            className="p-1 hover:bg-gray-100 rounded"
          >
            <AiOutlineEdit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(columnKey, task.id)}
            title="Delete"
            className="p-1 hover:bg-red-100 rounded hover:text-red-600"
          >
            <AiOutlineDelete className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="text-gray-600">{task.description || 'No description'}</p>
        </div>
      )}
    </div>
  );
}
