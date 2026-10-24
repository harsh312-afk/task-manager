import React, { useState, useRef, useEffect } from 'react';
import {
  LuSearch,
  LuX,
  LuPlus,
  LuSun,
  LuMoon,
  LuRotateCcw,
  LuDownload,
  LuUpload,
  LuTrash2,
  LuEllipsisVertical,
  LuGithub,
} from 'react-icons/lu';
import TaskFlowLogo from './TaskFlowLogo';
import { CATEGORIES } from '../utils/storage';

export default function Header({
  searchQuery,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
  selectedCategory,
  onCategoryChange,
  onOpenNewTask,
  onResetDemo,
  onClearBoard,
  onExportJSON,
  onImportJSON,
  theme,
  onToggleTheme,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        onImportJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Logo & Branding */}
          <div className="flex items-center justify-between">
            <TaskFlowLogo className="h-9 w-9" withText={true} />

            {/* Mobile Actions: Dark Mode & Plus */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === 'dark' ? <LuSun className="h-5 w-5 text-amber-400" /> : <LuMoon className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={onOpenNewTask}
                className="p-2 bg-indigo-600 text-white rounded-xl shadow-sm"
                title="Create task"
              >
                <LuPlus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2 flex-1 max-w-2xl">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px]">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tasks by title or notes..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <LuX className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-transparent focus:border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="Urgent">🔴 Urgent</option>
              <option value="High">🟠 High</option>
              <option value="Medium">🔵 Medium</option>
              <option value="Low">⚪ Low</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="py-2 px-3 text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-transparent focus:border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <LuSun className="h-4 w-4 text-amber-400" />
              ) : (
                <LuMoon className="h-4 w-4 text-slate-600" />
              )}
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/harsh312-afk/task-manager"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="GitHub repository"
            >
              <LuGithub className="h-4 w-4" />
            </a>

            {/* Action Menu (Import/Export/Reset) */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Board tools"
              >
                <LuEllipsisVertical className="h-4 w-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
                  <button
                    type="button"
                    onClick={() => {
                      onResetDemo();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left font-medium"
                  >
                    <LuRotateCcw className="h-3.5 w-3.5 text-indigo-500" />
                    Load Demo Tasks
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onExportJSON();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left font-medium"
                  >
                    <LuDownload className="h-3.5 w-3.5 text-emerald-500" />
                    Export Board (JSON)
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left font-medium"
                  >
                    <LuUpload className="h-3.5 w-3.5 text-sky-500" />
                    Import Board (JSON)
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <button
                    type="button"
                    onClick={() => {
                      onClearBoard();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left font-medium"
                  >
                    <LuTrash2 className="h-3.5 w-3.5" />
                    Clear All Tasks
                  </button>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* "+ New Task" Primary Button */}
            <button
              type="button"
              onClick={onOpenNewTask}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] rounded-xl shadow-md shadow-indigo-500/20 transition-all"
            >
              <LuPlus className="h-4 w-4" />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
