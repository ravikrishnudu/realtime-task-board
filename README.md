
***

# Realtime Task Board (Local Only)

A **Trello-like task board** built with React, Zustand, and [@hello-pangea/dnd](https://github.com/hello-pangea/dnd).  
Supports creation, editing, deletion, drag-and-drop of tasks and columns, and local state management.  
Designed for easy later integration with real-time backends (Socket.IO/Firebase/Supabase).

***

## 🚀 Live Demo

**[View the deployed app](https://realtime-task-board.vercel.app/)**

***

## Features

- Create/update/delete columns (“To Do”, “In Progress”, “Done”, etc.)
- Create/update/delete tasks (with title and optional description)
- Drag and drop tasks within and between columns
- Reorder columns (drag-and-drop)
- Fully local state management (no backend required)
- Easy to extend with real-time sync later

***

## Tech Stack

- [React](https://react.dev/)
- [Zustand](https://github.com/pmndrs/zustand) - state management
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) - drag & drop (React 18+ compatible)
- [Tailwind CSS](https://tailwindcss.com/) - styling

***

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ravikrishnudu/realtime-task-board.git
cd realtime-task-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (Vite default) 


## How to Use

- **Add Column:** Click the "Add Column" button and enter a name.
- **Edit Column:** Click on the column title to edit.
- **Delete Column:** Click the "×" button on a column.
- **Add Task:** Click "+ Add Task" in a column and enter a task title.
- **Edit Task:** Click "Edit" on a task card.
- **Delete Task:** Click "Delete" on a task card.
- **Drag/Drop:** Drag tasks and columns to reorder as desired.

***

## Limitations

- **No real-time collaboration:** This version is standalone, data lives only in your browser session.
- **No backend/storage:** Refreshing the page will reset the board (unless you add localStorage).
- **No user presence or authentication.**

***

## How to Enable Real-Time Features (Advanced)

You can upgrade this board for live, multi-user collaboration by:
- Adding a backend (e.g., Socket.IO server, Firebase, Supabase)
- Syncing Zustand state with backend updates
- Broadcasting CRUD/drag actions to other clients


---