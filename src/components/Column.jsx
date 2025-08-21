import React, { useState, useEffect } from "react";
import { useBoardStore } from "../boardStore";
import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function Column({ colId, index }) {
    const { columns, addTask, updateColumn, deleteColumn } = useBoardStore();
    const column = columns[colId];
    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(column.title);


    const saveTitle = () => {
        if (title.trim() && title !== column.title) {
            updateColumn(colId, title.trim());
        }
        setEditingTitle(false);
    };

    return (
        <Draggable draggableId={colId} index={index}>
            {(provided) => (
                <div
                    className="bg-gray-100 rounded p-4 w-80 flex-shrink-0"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div className="flex items-center mb-3">
                        <div {...provided.dragHandleProps} className="mr-2 cursor-move">☰</div>
                        {editingTitle ? (
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={saveTitle}
                                onKeyDown={(e) => e.key === "Enter" && saveTitle()}
                                className="flex-grow px-2 py-1"
                                autoFocus
                            />
                        ) : (
                                <h2 className="font-bold flex-grow cursor-pointer"
                                onClick={() => setEditingTitle(true)}
                            >
                                {column.title}
                            </h2>
                        )}
                        <button
                            onClick={() => {
                                if (window.confirm("Delete this column?")) {
                                    deleteColumn(colId);
                                }
                            }}
                            className="mr-2 text-red-600 font-bold"
                        >
                            &times;
                        </button>
                    </div>

                    <Droppable droppableId={colId} type="TASK">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="min-h-[50px]"
                            >
                                {column.taskIds.map((taskId, idx) => (
                                    <TaskCard key={taskId} taskId={taskId} index={idx} columnId={colId} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <button
                        onClick={() => {
                            const taskTitle = prompt("Task title:");
                            if (taskTitle) addTask(colId, taskTitle);
                        }}
                        className="mt-3 px-3 py-1 bg-green-500 text-white rounded"
                    >
                        + Add Task
                    </button>
                </div>
            )}
        </Draggable>
    );
}
