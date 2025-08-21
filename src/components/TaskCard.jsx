import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useBoardStore } from "../boardStore";


export default function TaskCard({ taskId, index, columnId }) {
    const { tasks, updateTask, deleteTask } = useBoardStore();
    const task = tasks[taskId];
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [desc, setDesc] = useState(task.description || "");

    const save = () => {
        updateTask(taskId, title, desc);
        setEditing(false);
    };

    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided) => (
                <div
                    className="bg-white rounded shadow mb-2 p-3"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {editing ? (
                        <>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && save()}
                                className="w-full font-semibold mb-1 p-1 border rounded"
                                autoFocus
                            />
                            <textarea
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                onBlur={save}
                                className="w-full border rounded p-1"
                                rows={2}
                            />
                            <button
                                onClick={save}
                                className="mt-1 bg-blue-500 text-white px-2 rounded"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                                <h3 className="font-semibold">{task.title}</h3>
                                {task.description && (
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                )}
                                <div className="mt-2 flex space-x-2">
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="text-sm text-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Delete this task?")) {
                                                deleteTask(columnId, taskId);
                                            }
                                        }}
                                        className="text-sm text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};