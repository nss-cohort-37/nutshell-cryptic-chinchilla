import { TaskForm } from "./TaskForm.js";
import { useTasks, editTask, saveTask } from "./TaskProvider.js";

export const TaskListForm = () => {
  const eventHub = document.querySelector(".container");
  const targetElement = document.querySelector(".taskForm");
  const userId = sessionStorage.getItem("activeUser");

  // let taskId = "";
  // Found task and placed values in inputs
  eventHub.addEventListener("edit-btn-has-been-click", clickEvent => {
    const taskId = clickEvent.detail.taskId;

    const useTask = useTasks();
    const foundTask = useTask.find(task => task.id === parseInt(taskId), 10);
    console.log(foundTask);

    document.querySelector("#hidden-value").value = foundTask.id;
    document.querySelector(`#task-name--${taskId}`).value = foundTask.name;
    document.querySelector(`#task-date--${taskId}`).value =
      foundTask.completionDate;
  });

  // Save new task or edited task
  eventHub.addEventListener("click", clickEvent => {
    // const useTask = useTasks();
    // const foundTask = useTask.find(task => task.id === parseInt(taskId));
    // const savedTaskName = clickEvent.detail.taskName;
    // const savedTaskDate = clickEvent.detail.taskCompletionDate;
    if (clickEvent.target.id.startsWith("editTask--")) {
      // const [prefix, taskId] = clickEvent.target.split("--");

      const hiddenValue = document.querySelector("#hidden-value").value;
      if (hiddenValue !== "") {
        const editedTask = {
          userId: parseInt(sessionStorage.getItem("activeUser"), 10),
          id: document.querySelector("#hidden-value").value,
          name: document.querySelector("").value,
          completionDate: document.querySelector(`#task-date--${taskId}`).value
        };
        editTask(editedTask);
      } else {
        const newTask = {
          name: document.querySelector(`task-name--${taskId}`).value,
          completionDate: document.querySelector(`task-date--${taskId}`).value
        };

        saveTask(newTask);
      }
    }
  });

  // Render task form
  const renderTaskForm = () => {
    targetElement.innerHTML = TaskForm();
  };
  renderTaskForm();
};
