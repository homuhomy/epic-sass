import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import initialData from "src/core/dnd/initial-data";
import onDragEnd from "src/core/dnd/onDragEnd";

export default function Dnd() {
  const [data, setData] = useState(initialData);

  //so the answer options have different color :D
  const getBackgroundColor = (answersId) => {
    const colors = ["bg-blue", "bg-teal", "bg-orange", "bg-purple"];
    // Calculate colorIndex based on the characters in taskId
    let charSum = 0;
    for (let char of answersId) {
      charSum += char.charCodeAt(0);
    }
    const colorIndex = charSum % colors.length;
    return colors[colorIndex];
  };

  //divide english and malay sentence
  const renderTaskContent = (content) => {
    const [english, malay] = content.split("/");
    return (
      <div>
        <span>{english.trim()}</span>
        <div className="italic">/ {malay.trim()}</div>
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, data, setData)}>
      <div className="flex flex-col">
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          const answers = column.taskIds.map((taskId) => data.answers[taskId]);

          const columnBgClass =
            index === 0 ? "bg-transparent" : "bg-box styling";
          const isEmptyColumn = index !== 0 && answers.length === 0;

          return (
            <div key={column.id} className="m-4">
              <h2 className="text-lg font-bold mb-2">{column.title}</h2>
              <Droppable droppableId={column.id} direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`${columnBgClass} p-4 flex overflow-auto ${
                      snapshot.isDraggingOver ? "bg-blue-200" : ""
                    }`}
                    style={{ minHeight: "100px" }}
                  >
                    {answers.length === 0 && isEmptyColumn && (
                      <div className="flex flex-col items-center justify-center h-full w-full">
                        <div>Drag your answers here!</div>
                        <div className="italic">
                          Seret jawapan anda di sini!
                        </div>
                      </div>
                    )}
                    {answers.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`pill mr-2 ${getBackgroundColor(
                              task.id
                            )}`}
                          >
                            {renderTaskContent(task.content)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
