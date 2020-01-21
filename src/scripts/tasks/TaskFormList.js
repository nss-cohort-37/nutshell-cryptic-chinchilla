import { TaskForm } from "./TaskForm.js";
import { useTasks, editTask, saveTask, getTasks } from "./TaskProvider.js";

const eventHub = document.querySelector(".container");
const targetElement = document.querySelector(".taskForm");

export const TaskListForm = () => {
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

  let taskWasCompleted = "";

  // Hide task
  eventHub.addEventListener("hideTask", clickEvent => {
    const hideTaskId = clickEvent.detail.taskId;
    const allTasks = useTasks();
    const foundTask = allTasks.find(
      task => task.id === parseInt(hideTaskId, 10)
    );
    const hiddenTask = document.querySelector(`#hideTask--${hideTaskId}`);
    if (hiddenTask.checked === true) {
      const hideTask = {
        userId: foundTask.userId,
        name: foundTask.name,
        completionDate: foundTask.completionDate,
        id: foundTask.id,
        isCompleted: true
      };
      editTask(hideTask).then(() => {
        const customMessage = new CustomEvent("updateWithoutHiddenTask");
        eventHub.dispatchEvent(customMessage);
      });
      document.querySelector(`#taskCard--${hideTaskId}`).style.display = "none";
    }
  });

  // Save new task or edited task
  eventHub.addEventListener("task-saved", clickEvent => {
    const savedTaskName = clickEvent.detail.taskName;
    const savedTaskDate = clickEvent.detail.taskCompletionDate;
    const taskHiddenValue = clickEvent.detail.taskHiddenValue;
    let taskWasCompleted = clickEvent.detail.isCompleted;

    const hiddenValue = document.querySelector("#hidden-value").value;
    if (hiddenValue !== "") {
      const editedTask = {
        userId: parseInt(sessionStorage.getItem("activeUser"), 10),
        name: document.querySelector(`#task-name--${taskHiddenValue}`).value,
        completionDate: document.querySelector(`#task-date--${taskHiddenValue}`)
          .value,
        id: document.querySelector("#hidden-value").value,
        isCompleted: taskWasCompleted
      };

      // Edit task PUT method
      editTask(editedTask).then(() => {
        customEventToUpdateTask();
      });
    } else {
      const newTask = {
        userId: parseInt(sessionStorage.getItem("activeUser"), 10),
        name: savedTaskName,
        completionDate: savedTaskDate,
        isCompleted: taskWasCompleted
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
};
export const renderTaskForm = () => {
  targetElement.innerHTML = TaskForm();
};

// Only display task once logged in
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "button--logIn") {
    if (sessionStorage.getItem("activeUser") !== null) {
      renderTaskForm();
    }
  }
});
