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

    deleteColumn: (id) => set((state) => {
        const { [id]: deleted, ...restColumns } = state.columns;
        const newTaskIds = state.columnOrder.includes(id) ? state.columns[id].taskIds : [];
        const newTasks = { ...state.tasks };
        newTaskIds.forEach((tid) => delete newTasks[tid]);
        return {
            columns: restColumns,
            tasks: newTasks,
            columnOrder: state.columnOrder.filter((cid) => cid !== id),
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

    deleteTask: (columnId, taskId) => set((state) => {
        const { [taskId]: deleted, ...restTasks } = state.tasks;
        return {
            tasks: restTasks,
            columns: {
                ...state.columns,
                [columnId]: {
                    ...state.columns[columnId],
                    taskIds: state.columns[columnId].taskIds.filter((tid) => tid !== taskId),
                },
            },
        };
    }),

    moveTask: (fromCol, toCol, taskId, destIndex) => set((state) => {
        const fromTaskIds = state.columns[fromCol].taskIds.filter((tid) => tid !== taskId);
        const toTaskIds = Array.from(state.columns[toCol].taskIds);
        toTaskIds.splice(destIndex, 0, taskId);
        return {
            columns: {
                ...state.columns,
                [fromCol]: { ...state.columns[fromCol], taskIds: fromTaskIds },
                [toCol]: { ...state.columns[toCol], taskIds: toTaskIds },
            },
        };
    }),

    moveColumn: (fromIndex, toIndex) => set((state) => {
        const newOrder = Array.from(state.columnOrder);
        const [removed] = newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, removed);
        return { columnOrder: newOrder };
    }),

}));
