import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useBoardStore } from "../boardStore";

const TaskCard = ({ taskId, index, }) => {
    const { tasks, } = useBoardStore();
    const task = tasks[taskId];
    const [title, setTitle] = React.useState(task.title);
    const [desc, setDesc] = React.useState(task.description || "");


    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided) => (
                <div
                    className="bg-white rounded shadow mb-2 p-3"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <h3 className="font-semibold">{task.title}</h3>
                    {task.description && (
                        <p className="text-sm text-gray-600">{task.description}</p>
                    )}
                    <div className="mt-2 flex space-x-2">
                        <button
                            className="text-sm text-blue-600"
                        >
                            Edit
                        </button>
                        <button

                            className="text-sm text-red-600"
                        >
                            Delete
                        </button>
                    </div>

                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
