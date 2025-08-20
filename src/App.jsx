import { useState } from 'react'

import './App.css'
import { useBoardStore } from "./boardStore";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from './components/Column'

function App() {
  const {
    addColumn,
    columnOrder,
  } = useBoardStore();

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-5">Collaborative Task Board (Local Only)</h1>
        <button
          onClick={() => {
            const title = prompt("New column title");
            if (title) addColumn(title);
          }}
          className="mb-6 px-4 py-2 rounded bg-blue-600 text-white"
        >
          Add Column
        </button>

        <DragDropContext >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="COLUMN"
          >
            {(provided) => (
              <div
                className="flex space-x-4 overflow-x-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnOrder.map((colId, idx) => (
                  <Column key={colId} colId={colId} index={idx} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  )
}

export default App
