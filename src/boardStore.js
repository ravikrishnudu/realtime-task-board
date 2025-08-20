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

  


}));
