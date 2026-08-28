// Default board structure with three columns
export const getDefaultBoard = () => ({
  todo: [],
  inProgress: [],
  done: []
});

// Load board from localStorage or return default
export const loadBoard = () => {
  try {
    const saved = localStorage.getItem('taskBoard');
    return saved ? JSON.parse(saved) : getDefaultBoard();
  } catch (error) {
    console.warn('Failed to load board from localStorage:', error);
    return getDefaultBoard();
  }
};

// Save board to localStorage
export const saveBoard = (board) => {
  try {
    localStorage.setItem('taskBoard', JSON.stringify(board));
  } catch (error) {
    console.error('Failed to save board to localStorage:', error);
  }
};
