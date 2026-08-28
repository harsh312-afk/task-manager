# Task Manager

A drag-and-drop Kanban board task manager built with React, Vite, Tailwind CSS, and localStorage persistence.

## Features

- **Kanban Board**: Three columns (To Do, In Progress, Done)
- **Drag and Drop**: Move tasks between columns using [@hello-pangea/dnd](https://atlaskit.atlassian.com/packages/hello-pangea/dnd)
- **Task Management**: Create, edit, and delete tasks
- **Persistence**: All board state saved to `localStorage` (survives page refreshes)
- **Responsive Design**: Beautifully styled with Tailwind CSS
- **Visual Feedback**: Drag hover effects, column counters, and edit modes

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Drag and Drop**: @hello-pangea/dnd
- **State Management**: React hooks (useState, useEffect)
- **Persistence**: localStorage
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:harsh312-afk/task-manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx             # Main app layout
├── components/
│   ├── Board.jsx       # DragDropContext + 3 Column components
│   ├── Column.jsx      # Individual column with AddTaskForm
│   ├── Task.jsx        # Task display with edit/delete controls
│   └── AddTaskForm.jsx # Form to create new tasks
├── utils/
│   └── storage.js      # localStorage helpers (loadBoard/saveBoard)
├── index.css           # Tailwind CSS directives
└── main.jsx            # Entry point
```

## How It Works

### State Management

The board state is a nested object with three columns:
```javascript
{
  todo:    [{id: '1', title: 'Task 1', description: '...'}],
  inProgress: [{id: '2', title: 'Task 2', description: '...'}],
  done:    [{id: '3', title: 'Task 3', description: '...'}]
}
```

### Drag and Drop

Using `@hello-pangea/dnd`:
- `DragDropContext` wraps the board
- Each column is a `Droppable`
- Each task is a `Draggable`
- On drag end, we update the board state and persist to localStorage

### Persistence

Board state is saved to `localStorage` under the key `taskBoard` whenever it changes.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [hello-pangea/dnd](https://atlaskit.atlassian.com/packages/hello-pangea/dnd) for the drag and drop functionality
- Tailwind CSS for the utility-first CSS framework
- Vite for the fast development server and build tool
