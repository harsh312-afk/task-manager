import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { LuPlus, LuListTodo, LuClock, LuCircleCheck, LuInbox } from 'react-icons/lu';
import Task from './Task';

const COLUMN_CONFIGS = {
  todo: {
    title: 'To Do',
    icon: LuListTodo,
    color: 'text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300',
    topBorder: 'border-t-indigo-500',
    emptyMsg: 'Ready for new assignments',
  },
  inProgress: {
    title: 'In Progress',
    icon: LuClock,
    color: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
    topBorder: 'border-t-amber-500',
    emptyMsg: 'No active work in flight',
  },
  done: {
    title: 'Done',
    icon: LuCircleCheck,
    color: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
    topBorder: 'border-t-emerald-500',
    emptyMsg: 'Completed items will appear here',
  },
};

export default function Column({
  columnKey,
  tasks = [],
  onOpenAddModal,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}) {
  const config = COLUMN_CONFIGS[columnKey] || {
    title: columnKey,
    icon: LuInbox,
    color: 'text-slate-600',
    badge: 'bg-slate-100 text-slate-700',
    topBorder: 'border-t-slate-400',
    emptyMsg: 'No tasks',
  };

  const Icon = config.icon;

  return (
    <div
      className={`flex-1 flex flex-col min-w-[300px] max-w-full bg-slate-100/70 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm border-t-4 ${config.topBorder} p-3.5`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">
            {config.title}
          </h2>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}
          >
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onOpenAddModal(columnKey)}
          className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          title={`Add task to ${config.title}`}
        >
          <LuPlus className="h-3.5 w-3.5" />
          <span>Add</span>
        </button>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={columnKey}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 flex flex-col space-y-3 min-h-[360px] rounded-xl p-1 transition-colors duration-150 ${
              snapshot.isDraggingOver
                ? 'bg-indigo-50/70 dark:bg-indigo-950/20 ring-2 ring-indigo-400/50 dark:ring-indigo-500/30'
                : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                columnKey={columnKey}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onMove={onMoveTask}
              />
            ))}

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl my-2">
                <div className="p-3 bg-slate-200/50 dark:bg-slate-800/60 rounded-full text-slate-400 dark:text-slate-500 mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {config.emptyMsg}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenAddModal(columnKey)}
                  className="mt-3 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  + Add a task
                </button>
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
