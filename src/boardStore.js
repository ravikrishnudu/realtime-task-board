import { create } from 'zustand'
import { v4 as uuid } from "uuid";

export const useBoardStore = create((set) => ({
    columns: {},
    columnOrder: [],
    tasks: {},

    addColumn: (title) => set((state) => {
        const id = uuid();
        return {
            columns: { ...state.columns, [id]: { id, title, taskIds: [] } },
            columnOrder: [...state.columnOrder, id],
        };
    }),

    addTask: (columnId, title, description = "") => set((state) => {
        const id = uuid();
        const now = new Date().toISOString();
        return {
            tasks: {
                ...state.tasks,
                [id]: { id, title, description, createdAt: now, updatedAt: now },
            },
            columns: {
                ...state.columns,
                [columnId]: {
                    ...state.columns[columnId],
                    taskIds: [...state.columns[columnId].taskIds, id],
                },
            },
        };
    }),

    updateTask: (id, title, description) => set((state) => ({
        tasks: {
            ...state.tasks,
            [id]: {
                ...state.tasks[id],
                title,
                description,
                updatedAt: new Date().toISOString(),
            },
        },
    })),

}));
