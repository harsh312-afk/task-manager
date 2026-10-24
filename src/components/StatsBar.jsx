import React from 'react';
import { LuCircleCheck, LuClock, LuListTodo, LuLayers, LuX } from 'react-icons/lu';

export default function StatsBar({
  board,
  filteredCount,
  totalCount,
  hasActiveFilters,
  onClearFilters,
}) {
  const todoCount = board.todo.length;
  const inProgressCount = board.inProgress.length;
  const doneCount = board.done.length;

  const percentComplete = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1">
          {/* Total */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <LuLayers className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Total Tasks</p>
              <p className="text-base font-bold text-slate-800 dark:text-slate-100">{totalCount}</p>
            </div>
          </div>

          {/* To Do */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
              <LuListTodo className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">To Do</p>
              <p className="text-base font-bold text-slate-800 dark:text-slate-100">{todoCount}</p>
            </div>
          </div>

          {/* In Progress */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-lg">
              <LuClock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">In Progress</p>
              <p className="text-base font-bold text-slate-800 dark:text-slate-100">{inProgressCount}</p>
            </div>
          </div>

          {/* Done */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <LuCircleCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Done</p>
              <p className="text-base font-bold text-slate-800 dark:text-slate-100">{doneCount}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar & Filter Status */}
        <div className="md:w-64 flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-600 dark:text-slate-300">Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400">{percentComplete}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          {hasActiveFilters && (
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>
                Showing {filteredCount} of {totalCount}
              </span>
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                <LuX className="h-3 w-3" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
