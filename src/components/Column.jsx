import React from "react";
import { useBoardStore } from "../boardStore";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function Column({ colId, index }) {
    const { columns, } = useBoardStore();
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
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

