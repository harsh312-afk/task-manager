import React, { useState, useEffect, useRef } from 'react';
import { LuX, LuCalendar, LuTag, LuFlag } from 'react-icons/lu';
import { PRIORITIES, CATEGORIES } from '../utils/storage';

function TaskModalForm({ initialData, defaultColumn, onSubmit, onClose }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [columnKey, setColumnKey] = useState(initialData?.columnKey || defaultColumn);
  const [priority, setPriority] = useState(initialData?.priority || 'Medium');
  const [category, setCategory] = useState(initialData?.category || 'Frontend');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    const taskPayload = {
      ...(initialData || {}),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
      updatedAt: new Date().toISOString(),
    };

    onSubmit(columnKey, taskPayload);
    onClose();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 id="taskModalTitle" className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {initialData ? 'Edit Task' : 'Create New Task'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Fill in the details below to organize your workflow.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <LuX className="h-5 w-5" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {error && (
          <div className="px-3.5 py-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="taskTitle" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="taskTitle"
            type="text"
            required
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g., Build responsive navbar"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="taskDesc" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Description (Optional)
          </label>
          <textarea
            id="taskDesc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add key requirements, links, or context..."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none"
          />
        </div>

        {/* Column & Priority Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Column / Status */}
          <div>
            <label htmlFor="taskColumn" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Column Status
            </label>
            <select
              id="taskColumn"
              value={columnKey}
              onChange={(e) => setColumnKey(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              <option value="todo">📋 To Do</option>
              <option value="inProgress">⚡ In Progress</option>
              <option value="done">✅ Done</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1">
                <LuFlag className="h-3.5 w-3.5 text-slate-400" />
                Priority
              </span>
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {Object.keys(PRIORITIES).map((p) => {
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`text-xs py-1.5 font-medium rounded-lg transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category & Due Date Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Category */}
          <div>
            <label htmlFor="taskCategory" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1">
                <LuTag className="h-3.5 w-3.5 text-slate-400" />
                Category
              </span>
            </label>
            <select
              id="taskCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="taskDueDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1">
                <LuCalendar className="h-3.5 w-3.5 text-slate-400" />
                Due Date
              </span>
            </label>
            <input
              id="taskDueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] rounded-xl shadow-md shadow-indigo-500/20 transition-all"
          >
            {initialData ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  defaultColumn = 'todo',
}) {
  const dialogRef = useRef(null);

  // Modal open/close sync with native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Modern Web Guidance: Light-dismiss fallback for browsers without closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isContentClick =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isContentClick) {
        onClose();
      }
    };

    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener('click', handleBackdropClick);
    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="taskModalTitle"
      className="m-auto backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm p-0 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-[calc(100%-2rem)] outline-none animate-in fade-in zoom-in-95 duration-150"
    >
      <TaskModalForm
        key={initialData ? `${initialData.id}-${initialData.updatedAt || ''}` : `new-${defaultColumn}`}
        initialData={initialData}
        defaultColumn={defaultColumn}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </dialog>
  );
}
