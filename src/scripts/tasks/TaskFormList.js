import { TaskForm } from "./TaskForm.js";

export const TaskListForm = () => {
  const eventHub = document.querySelector(".container");
  const targetElement = document.querySelector(".taskForm");

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editTask--")) {
      const [prefix, taskId] = clickEvent.target.id.split("--");
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    const taskName = document.querySelector("#task-name").value;
    const taskCompletionDate = document.querySelector("#task-date").value;

    if (clickEvent.target.id.startsWith("saveTask--")) {
      const saveTaskCustomEvent = new CustomEvent("task-saved", {
        detail: {
          taskName: taskName,
          taskCompletionDate: taskCompletionDate
        }
      });
      eventHub.dispatchEvent(saveTaskCustomEvent);
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteTask--")) {
      const [prefix, taskId] = clickEvent.target.id.split("--");
    }
  });

  const renderTaskForm = () => {
    targetElement.innerHTML = TaskForm();
  };
  renderTaskForm();
};
