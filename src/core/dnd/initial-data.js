const initialData = {
  answers: {
    "task-1": { id: "task-1", content: "Be Agile Email / Be Agile E-mel" },
    "task-2": { id: "task-2", content: "Agile microsite / Laman mikro Agile" },
    "task-3": { id: "task-3", content: "Agile Hub on Sharepoint / Agile Hab di Sharepoint" },
    "task-4": { id: "task-4", content: "Be Agile Channel on myPETRONAS / Saluran Be Agile di myPETRONAS" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "👋 From the following, choose which communication platform(s) are you aware of?",
      taskIds: ["task-1", "task-2", "task-3","task-4"],
    },
    "column-2": {
      id: "column-2",
      // title: "Drop your answers here!",
      taskIds: []
    },
  },
  columnOrder: ['column-1', 'column-2'],
};

export default initialData;
