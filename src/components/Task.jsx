import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import {
  LuGripVertical,
  LuPencil,
  LuTrash2,
  LuCalendar,
  LuTag,
  LuArrowRight,
  LuArrowLeft,
  LuCircleCheck,
} from 'react-icons/lu';
import { PRIORITIES } from '../utils/storage';

export default function Task({
  task,
  index,
  columnKey,
  onEdit,
  onDelete,
  onMove,
}) {
  const priorityInfo = PRIORITIES[task.priority] || PRIORITIES.Medium;

  // Format due date & calculate overdue status
  const getDueStatus = (dateStr) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dateStr);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `Overdue (${Math.abs(diffDays)}d)`,
        className: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900/60',
      };
    }
    if (diffDays === 0) {
      return {
        text: 'Due Today',
        className: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900/60 font-semibold',
      };
    }
    if (diffDays === 1) {
      return {
        text: 'Due Tomorrow',
        className: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-900/60',
      };
    }
    return {
      text: due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      className: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    };
  };

  const dueInfo = getDueStatus(task.dueDate);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group relative rounded-xl border p-4 transition-all duration-150 ${
            snapshot.isDragging
              ? 'shadow-2xl ring-2 ring-indigo-500 scale-[1.02] rotate-1 z-50 bg-white dark:bg-slate-800 border-indigo-300 dark:border-indigo-600'
              : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          {/* Top Row: Category, Priority, Drag Handle & Actions */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Priority badge */}
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${priorityInfo.color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.badge}`} />
                {priorityInfo.label}
              </span>

              {/* Category pill */}
              {task.category && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <LuTag className="h-2.5 w-2.5 text-slate-400" />
                  {task.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-0.5">
              {/* Edit Button */}
              <button
                type="button"
                onClick={() => onEdit(task, columnKey)}
                title="Edit task"
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                <LuPencil className="h-3.5 w-3.5" />
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => onDelete(columnKey, task.id)}
                title="Delete task"
                className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors"
              >
                <LuTrash2 className="h-3.5 w-3.5" />
              </button>

              {/* Drag Handle */}
              <div
                {...provided.dragHandleProps}
                title="Drag to reorder or move"
                className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                <LuGripVertical className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5 mb-3">
            <h3
              className={`text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug ${
                columnKey === 'done' ? 'line-through text-slate-500 dark:text-slate-400' : ''
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          {/* Bottom Row: Due date & Quick Move Controls */}
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
            {dueInfo ? (
              <span
                className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md border ${dueInfo.className}`}
              >
                <LuCalendar className="h-3 w-3" />
                {dueInfo.text}
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                No due date
              </span>
            )}

            {/* Quick Move Arrows for Touch / Accessibility */}
            <div className="flex items-center gap-1">
              {columnKey !== 'todo' && (
                <button
                  type="button"
                  onClick={() =>
                    onMove(
                      columnKey,
                      columnKey === 'done' ? 'inProgress' : 'todo',
                      task.id
                    )
                  }
                  title={`Move left to ${columnKey === 'done' ? 'In Progress' : 'To Do'}`}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                >
                  <LuArrowLeft className="h-2.5 w-2.5" />
                  Prev
                </button>
              )}

              {columnKey !== 'done' && (
                <button
                  type="button"
                  onClick={() =>
                    onMove(
                      columnKey,
                      columnKey === 'todo' ? 'inProgress' : 'done',
                      task.id
                    )
                  }
                  title={`Move right to ${columnKey === 'todo' ? 'In Progress' : 'Done'}`}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded transition-colors"
                >
                  {columnKey === 'inProgress' ? (
                    <>
                      <LuCircleCheck className="h-2.5 w-2.5" />
                      Done
                    </>
                  ) : (
                    <>
                      Next
                      <LuArrowRight className="h-2.5 w-2.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
