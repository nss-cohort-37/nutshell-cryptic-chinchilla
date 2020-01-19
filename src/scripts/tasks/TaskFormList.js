import { TaskForm } from "./TaskForm.js";
import { useTasks, editTask, saveTask } from "./TaskProvider.js";

export const TaskListForm = () => {
  const eventHub = document.querySelector(".container");
  const targetElement = document.querySelector(".taskForm");

  let taskId = "";

  eventHub.addEventListener("edit-btn-has-been-click", clickEvent => {
    taskId = clickEvent.detail.taskId;

    // Find task and placed values in inputs
    const useTask = useTasks();
    const foundTask = useTask.find(task => task.id === parseInt(taskId), 10);

    document.querySelector(`#task-name--${taskId}`).value = foundTask.name;
    document.querySelector(`#task-date--${taskId}`).value =
      foundTask.completionDate;
    document.querySelector("#hidden-value").value = foundTask.id;
  });

  // Save new task or edited task
  eventHub.addEventListener("task-saved", clickEvent => {
    const savedTaskName = clickEvent.detail.taskName;
    const savedTaskDate = clickEvent.detail.taskCompletionDate;
    const taskHiddenValue = clickEvent.detail.taskHiddenValue;

    const hiddenValue = document.querySelector("#hidden-value").value;
    if (hiddenValue !== "") {
      const editedTask = {
        userId: parseInt(sessionStorage.getItem("activeUser"), 10),
        name: document.querySelector(`#task-name--${taskHiddenValue}`).value,
        completionDate: document.querySelector(`#task-date--${taskHiddenValue}`)
          .value,
        id: document.querySelector("#hidden-value").value
      };

      // Edit task PUT method
      editTask(editedTask).then(() => {
        customEventToUpdateTask();
      });
    } else {
      const newTask = {
        userId: parseInt(sessionStorage.getItem("activeUser"), 10),
        name: savedTaskName,
        completionDate: savedTaskDate
      };

      // Save task POST method
      saveTask(newTask).then(() => {
        customEventToUpdateTask();
      });
    }
  });

  // Custom event that update Task array and clear values
  const customEventToUpdateTask = () => {
    const customEvent = new CustomEvent("update");
    eventHub.dispatchEvent(customEvent);
  };

  // Render task form
  const renderTaskForm = () => {
    targetElement.innerHTML = TaskForm();
  };

  // Display task once logged in
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "button--logIn") {
      renderTaskForm();
    }
  });
};
