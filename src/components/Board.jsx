import React, { useState, useMemo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import TaskModal from './TaskModal';
import ConfirmModal from './ConfirmModal';
import StatsBar from './StatsBar';
import Header from './Header';
import {
  loadBoard,
  saveBoard,
  getDefaultBoard,
  getEmptyBoard,
  exportBoardJSON,
  importBoardJSON,
  loadTheme,
  saveTheme,
} from '../utils/storage';

export default function Board() {
  const [board, setBoard] = useState(() => loadBoard());
  const [theme, setTheme] = useState(() => loadTheme());

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeColumnKey, setActiveColumnKey] = useState('todo');

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    isDestructive: false,
    onConfirm: () => {},
  });

  // Dark mode toggler
  const handleToggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      const meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) meta.setAttribute('content', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      const meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) meta.setAttribute('content', 'light');
    }

    setTheme(newTheme);
    saveTheme(newTheme);
  };

  // Filter tasks
  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedPriority !== 'all' || selectedCategory !== 'all'
  );

  const filteredBoard = useMemo(() => {
    if (!hasActiveFilters) return board;

    const query = searchQuery.trim().toLowerCase();

    const matchesFilter = (task) => {
      if (query) {
        const titleMatch = (task.title || '').toLowerCase().includes(query);
        const descMatch = (task.description || '').toLowerCase().includes(query);
        if (!titleMatch && !descMatch) return false;
      }
      if (selectedPriority !== 'all' && task.priority !== selectedPriority) {
        return false;
      }
      if (selectedCategory !== 'all' && task.category !== selectedCategory) {
        return false;
      }
      return true;
    };

    return {
      todo: board.todo.filter(matchesFilter),
      inProgress: board.inProgress.filter(matchesFilter),
      done: board.done.filter(matchesFilter),
    };
  }, [board, searchQuery, selectedPriority, selectedCategory, hasActiveFilters]);

  const totalCount = board.todo.length + board.inProgress.length + board.done.length;
  const filteredCount =
    filteredBoard.todo.length +
    filteredBoard.inProgress.length +
    filteredBoard.done.length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPriority('all');
    setSelectedCategory('all');
  };

  // Drag & drop end handler
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColKey = source.droppableId;
    const destColKey = destination.droppableId;

    setBoard((prev) => {
      const sourceList = Array.from(prev[sourceColKey]);
      const destList = sourceColKey === destColKey ? sourceList : Array.from(prev[destColKey]);

      // Find the dragged item by ID
      const sourceIndex = sourceList.findIndex((t) => t.id === draggableId);
      if (sourceIndex === -1) return prev;

      const [movedTask] = sourceList.splice(sourceIndex, 1);

      if (sourceColKey === destColKey) {
        sourceList.splice(destination.index, 0, movedTask);
        const nextBoard = { ...prev, [sourceColKey]: sourceList };
        saveBoard(nextBoard);
        return nextBoard;
      } else {
        destList.splice(destination.index, 0, movedTask);
        const nextBoard = {
          ...prev,
          [sourceColKey]: sourceList,
          [destColKey]: destList,
        };
        saveBoard(nextBoard);
        return nextBoard;
      }
    });
  };

  // Add new task
  const handleOpenAddTask = (colKey = 'todo') => {
    setEditingTask(null);
    setActiveColumnKey(colKey);
    setIsTaskModalOpen(true);
  };

  // Edit existing task
  const handleOpenEditTask = (task, colKey) => {
    setEditingTask({ ...task, columnKey: colKey });
    setActiveColumnKey(colKey);
    setIsTaskModalOpen(true);
  };

  // Submit task modal
  const handleTaskSubmit = (targetColumnKey, taskData) => {
    setBoard((prev) => {
      let nextBoard = { ...prev };

      if (editingTask) {
        const originalColKey = editingTask.columnKey || targetColumnKey;
        if (originalColKey === targetColumnKey) {
          // Update in place
          nextBoard[originalColKey] = nextBoard[originalColKey].map((t) =>
            t.id === taskData.id ? { ...t, ...taskData } : t
          );
        } else {
          // Move to different column
          nextBoard[originalColKey] = nextBoard[originalColKey].filter(
            (t) => t.id !== taskData.id
          );
          nextBoard[targetColumnKey] = [taskData, ...nextBoard[targetColumnKey]];
        }
      } else {
        // Create new task
        const newTask = {
          ...taskData,
          id: `task-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        nextBoard[targetColumnKey] = [newTask, ...nextBoard[targetColumnKey]];
      }

      saveBoard(nextBoard);
      return nextBoard;
    });
  };

  // Delete task with confirmation
  const handleDeleteTask = (columnKey, taskId) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Task',
      message: 'Are you sure you want to permanently delete this task? This action cannot be undone.',
      confirmText: 'Delete',
      isDestructive: true,
      onConfirm: () => {
        setBoard((prev) => {
          const nextBoard = {
            ...prev,
            [columnKey]: prev[columnKey].filter((t) => t.id !== taskId),
          };
          saveBoard(nextBoard);
          return nextBoard;
        });
      },
    });
  };

  // Move task to adjacent column
  const handleMoveTask = (fromCol, toCol, taskId) => {
    setBoard((prev) => {
      const taskToMove = prev[fromCol].find((t) => t.id === taskId);
      if (!taskToMove) return prev;

      const nextBoard = {
        ...prev,
        [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
        [toCol]: [{ ...taskToMove, updatedAt: new Date().toISOString() }, ...prev[toCol]],
      };
      saveBoard(nextBoard);
      return nextBoard;
    });
  };

  // Reset to demo tasks
  const handleResetDemo = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Load Demo Tasks',
      message: 'This will reset your board with sample tasks for demonstration. Continue?',
      confirmText: 'Load Demo',
      isDestructive: false,
      onConfirm: () => {
        const demo = getDefaultBoard();
        setBoard(demo);
        saveBoard(demo);
        handleClearFilters();
      },
    });
  };

  // Clear all tasks
  const handleClearBoard = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Clear All Tasks',
      message: 'Are you sure you want to remove all tasks from the entire board? This cannot be undone.',
      confirmText: 'Clear All',
      isDestructive: true,
      onConfirm: () => {
        const empty = getEmptyBoard();
        setBoard(empty);
        saveBoard(empty);
        handleClearFilters();
      },
    });
  };

  // Export board JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportBoardJSON(board));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `taskflow-board-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import board JSON
  const handleImportJSON = (jsonString) => {
    const result = importBoardJSON(jsonString);
    if (result.success) {
      setBoard(result.board);
      handleClearFilters();
    } else {
      alert(`Failed to import JSON: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onOpenNewTask={() => handleOpenAddTask('todo')}
        onResetDemo={handleResetDemo}
        onClearBoard={handleClearBoard}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StatsBar
          board={board}
          filteredCount={filteredCount}
          totalCount={totalCount}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            <Column
              columnKey="todo"
              tasks={filteredBoard.todo}
              onOpenAddModal={handleOpenAddTask}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />
            <Column
              columnKey="inProgress"
              tasks={filteredBoard.inProgress}
              onOpenAddModal={handleOpenAddTask}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />
            <Column
              columnKey="done"
              tasks={filteredBoard.done}
              onOpenAddModal={handleOpenAddTask}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />
          </div>
        </DragDropContext>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>
          TaskFlow Kanban Manager &bull; Built with React 19, Tailwind CSS v4 &amp; @hello-pangea/dnd
        </p>
      </footer>

      {/* Task Creation & Editing Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleTaskSubmit}
        initialData={editingTask}
        defaultColumn={activeColumnKey}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        isDestructive={confirmDialog.isDestructive}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
