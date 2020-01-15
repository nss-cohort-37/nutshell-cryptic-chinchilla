let tasks = [];

export const useTasks = () => tasks.slice();

export const getTasks = () => {
  return fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(parsedTasks => {
      tasks = parsedTasks
        .slice()
        .sort(
          (currentTask, nextTask) =>
            Date.parse(currentTask.completionDate) -
            Date.parse(nextTask.completionDate)
        );
    });
};

export const saveTask = task => {
  return fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  }).then(getTasks);
};

export const deleteTask = taskId => {
  return fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "DELETE"
  }).then(getTasks);
};

export const editTask = task => {
  return fetch(`http://localhost:3000/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  }).then(getTasks);
};
