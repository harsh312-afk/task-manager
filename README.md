# TaskFlow — Modern Kanban Task Manager

[![Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://lucid-planck.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)

A modern, fast, and feature-rich drag-and-drop Kanban task management board built with **React 19**, **Vite**, **Tailwind CSS v4**, **@hello-pangea/dnd**, and **localStorage** persistence.

🚀 **Live Production Deployment**: [https://lucid-planck.vercel.app](https://lucid-planck.vercel.app)  
🔗 **Direct Project Link**: [https://task-manager-flow-harsh312-afk.vercel.app](https://task-manager-flow-harsh312-afk.vercel.app)

---

## ✨ Key Features & Improvements

- **⚡ Full Drag and Drop Kanban Board**:
  - Reorder tasks smoothly within columns and move tasks between **To Do**, **In Progress**, and **Done** columns.
  - Built with `@hello-pangea/dnd` with zero re-render glitches and immutable state updates.
- **🎨 Custom Vector Icon & Brand Identity**:
  - High-resolution custom SVG app icon and favicon (`public/favicon.svg` and `public/icon.svg`).
  - Branded header logo and metadata.
- **🎯 Task Prioritization**:
  - 4 color-coded priority levels: **Urgent** (Rose), **High** (Amber), **Medium** (Sky), and **Low** (Slate).
- **📅 Due Dates & Overdue Alerts**:
  - Set task deadlines with intelligent relative indicators: **Overdue**, **Due Today**, **Due Tomorrow**, or formatted calendar dates.
- **🏷️ Categories & Tags**:
  - Organize tasks across `Frontend`, `Backend`, `Design`, `DevOps`, `Testing`, `Research`, and `General`.
- **🔍 Real-Time Search & Multi-Filters**:
  - Instant text search across task titles and descriptions.
  - Filter simultaneously by Priority and Category with a one-click "Clear Filters" button.
- **📊 Real-Time Board Statistics**:
  - Live progress bar showing completion rate percentage.
  - Interactive metric counters for Total Tasks, To Do, In Progress, and Completed.
- **🌓 Dark & Light Mode**:
  - Fully integrated dark theme matching system preference with instant toggle.
  - Prevents initial flash of unstyled content (FOUC) and conforms to modern web `color-scheme` standards.
- **📱 Quick Move Navigation**:
  - One-click "Prev" / "Next" buttons on task cards for effortless organization on mobile touchscreens and keyboard navigation.
- **💾 LocalStorage & Data Portability**:
  - Automatic persistence to `localStorage`.
  - Export board state to `.json` and import from JSON anytime.
  - "Load Demo Tasks" button to immediately populate sample workflow data.
- **♿ Accessible Modal Dialogs**:
  - Native `<dialog>` implementation with `closedby="any"` light-dismiss and ESC keyboard dismissal.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 with custom dark mode variants
- **Drag and Drop**: `@hello-pangea/dnd`
- **Icons**: `react-icons` (Lucide)
- **State & Persistence**: React Hooks (`useState`, `useMemo`, `useEffect`) + `localStorage`
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

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

### Development Server

Start the local Vite dev server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting & Code Quality

Run oxlint across the project:
```bash
npm run lint
```

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```
task-manager/
├── public/
│   ├── favicon.svg          # Custom TaskFlow SVG favicon
│   ├── icon.svg             # Vector app icon
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Board.jsx        # Main Kanban board & state orchestrator
│   │   ├── Column.jsx       # Droppable column with task counters & quick add
│   │   ├── Task.jsx         # Draggable task card with priorities & badges
│   │   ├── TaskModal.jsx    # Accessible modal for creating & editing tasks
│   │   ├── ConfirmModal.jsx # Accessible confirmation dialog
│   │   ├── Header.jsx       # Branding, search, filters & tools menu
│   │   ├── StatsBar.jsx     # Completion progress & metric counters
│   │   └── TaskFlowLogo.jsx # Custom brand logo vector component
│   ├── utils/
│   │   └── storage.js       # LocalStorage helpers, demo data & migrations
│   ├── App.jsx              # Root component
│   ├── index.css            # Tailwind CSS v4 styling & dark mode rules
│   └── main.jsx             # React DOM entry point
├── index.html               # Semantic HTML5 entry with metadata & FOUC prevention
├── package.json
└── vite.config.js
```

---

## 🌐 Deployment to Vercel

This project is deployed to Vercel:

- **Live URL**: [https://lucid-planck.vercel.app](https://lucid-planck.vercel.app)
- **Direct Project URL**: [https://task-manager-flow-harsh312-afk.vercel.app](https://task-manager-flow-harsh312-afk.vercel.app)

To deploy your own instance using the Vercel CLI:
```bash
npx vercel --prod
```

---

## 📄 License

MIT &copy; [harsh312-afk](https://github.com/harsh312-afk)
