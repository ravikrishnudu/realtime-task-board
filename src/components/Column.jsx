import React from "react";
import { useBoardStore } from "../boardStore";
import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function Column({ colId, index }) {
    const { columns, addTask, } = useBoardStore();
    const column = columns[colId];



    return (
        <Draggable draggableId={colId} index={index}>
            {(provided) => (
                <div
                    className="bg-gray-100 rounded p-4 w-80 flex-shrink-0"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={colId} type="TASK">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="min-h-[50px]"
                            >
                                <p>
                                    {column.title}
                                </p>

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
};

