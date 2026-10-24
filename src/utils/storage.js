const STORAGE_KEY = 'taskBoard';
const THEME_KEY = 'taskFlowTheme';

export const PRIORITIES = {
  Urgent: { label: 'Urgent', color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/60', badge: 'bg-rose-500' },
  High: { label: 'High', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60', badge: 'bg-amber-500' },
  Medium: { label: 'Medium', color: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-900/60', badge: 'bg-sky-500' },
  Low: { label: 'Low', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700', badge: 'bg-slate-400' },
};

export const CATEGORIES = [
  'Frontend',
  'Backend',
  'Design',
  'DevOps',
  'Testing',
  'Research',
  'General',
];

const getFutureDate = (daysAhead) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

export const getEmptyBoard = () => ({
  todo: [],
  inProgress: [],
  done: [],
});

export const getDefaultBoard = () => ({
  todo: [
    {
      id: 'task-1',
      title: 'Design new landing page hero',
      description: 'Create high-converting hero layout with responsive metrics, glassmorphic accents, and primary CTA.',
      priority: 'High',
      category: 'Design',
      dueDate: getFutureDate(2),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Implement OAuth authentication',
      description: 'Setup GitHub and Google login flow with secure session storage and error boundary.',
      priority: 'Urgent',
      category: 'Backend',
      dueDate: getFutureDate(1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-3',
      title: 'Write automated E2E tests',
      description: 'Cover Kanban drag-and-drop interactions, column status changes, and offline persistence.',
      priority: 'Low',
      category: 'Testing',
      dueDate: getFutureDate(5),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  inProgress: [
    {
      id: 'task-4',
      title: 'Refactor drag-and-drop state',
      description: 'Ensure immutable column updates, reordering within column, and smooth drop placeholders.',
      priority: 'High',
      category: 'Frontend',
      dueDate: getFutureDate(0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-5',
      title: 'Implement dark mode theme',
      description: 'Support system preference, manual override, custom scrollbars, and prevent initial FOUC.',
      priority: 'Medium',
      category: 'Frontend',
      dueDate: getFutureDate(3),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  done: [
    {
      id: 'task-6',
      title: 'Setup Vite + React 19 codebase',
      description: 'Configured fast modern bundler with Tailwind CSS v4 and production optimization.',
      priority: 'Medium',
      category: 'DevOps',
      dueDate: getFutureDate(-2),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-7',
      title: 'Create custom application icon',
      description: 'Designed high-resolution vector Kanban icon for favicon, app header, and brand identity.',
      priority: 'Low',
      category: 'Design',
      dueDate: getFutureDate(-1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
});

// Normalize task object for backwards compatibility
const normalizeTask = (task) => ({
  id: task.id || Date.now().toString(),
  title: task.title || 'Untitled Task',
  description: task.description || '',
  priority: ['Low', 'Medium', 'High', 'Urgent'].includes(task.priority) ? task.priority : 'Medium',
  category: task.category || 'General',
  dueDate: task.dueDate || '',
  createdAt: task.createdAt || new Date().toISOString(),
  updatedAt: task.updatedAt || new Date().toISOString(),
});

// Load board from localStorage or return default board
export const loadBoard = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const initial = getDefaultBoard();
      saveBoard(initial);
      return initial;
    }
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object') {
      return getDefaultBoard();
    }
    return {
      todo: Array.isArray(parsed.todo) ? parsed.todo.map(normalizeTask) : [],
      inProgress: Array.isArray(parsed.inProgress) ? parsed.inProgress.map(normalizeTask) : [],
      done: Array.isArray(parsed.done) ? parsed.done.map(normalizeTask) : [],
    };
  } catch (error) {
    console.warn('Failed to load board from localStorage:', error);
    return getDefaultBoard();
  }
};

// Save board to localStorage
export const saveBoard = (board) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch (error) {
    console.error('Failed to save board to localStorage:', error);
  }
};

// Export board state as JSON string
export const exportBoardJSON = (board) => {
  return JSON.stringify(board, null, 2);
};

// Import board state from JSON string
export const importBoardJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON format');
    }
    const normalized = {
      todo: Array.isArray(parsed.todo) ? parsed.todo.map(normalizeTask) : [],
      inProgress: Array.isArray(parsed.inProgress) ? parsed.inProgress.map(normalizeTask) : [],
      done: Array.isArray(parsed.done) ? parsed.done.map(normalizeTask) : [],
    };
    saveBoard(normalized);
    return { success: true, board: normalized };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Theme storage
export const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'system';
  } catch {
    return 'system';
  }
};

export const saveTheme = (theme) => {
  try {
    if (theme === 'system') {
      localStorage.removeItem(THEME_KEY);
    } else {
      localStorage.setItem(THEME_KEY, theme);
    }
  } catch (err) {
    console.warn('Failed to save theme:', err);
  }
};
