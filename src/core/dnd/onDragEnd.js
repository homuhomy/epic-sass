const onDragEnd = (result, data, setData) => {
  const { source, destination } = result;

  // Dropped outside a droppable area
  if (!destination) return;

  // Dropped in the same place
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  const startColumn = data.columns[source.droppableId];
  const finishColumn = data.columns[destination.droppableId];

  // Moving within the same column
  if (startColumn === finishColumn) {
    const newTaskIds = Array.from(startColumn.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, result.draggableId);

    const newColumn = {
      ...startColumn,
      taskIds: newTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
    return;
  }

  // Moving from one column to another
  const startTaskIds = Array.from(startColumn.taskIds);
  startTaskIds.splice(source.index, 1);
  const newStart = {
    ...startColumn,
    taskIds: startTaskIds,
  };

  const finishTaskIds = Array.from(finishColumn.taskIds);
  finishTaskIds.splice(destination.index, 0, result.draggableId);
  const newFinish = {
    ...finishColumn,
    taskIds: finishTaskIds,
  };

  const newState = {
    ...data,
    columns: {
      ...data.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  setData(newState);
  };
  
  export default onDragEnd;
  