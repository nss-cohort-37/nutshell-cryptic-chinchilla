import { useTasks, deleteTask } from "./TaskProvider.js";
import { TaskComponent } from "./Task.js";

const eventHub = document.querySelector(".container");
const targetElement = document.querySelector(".tasksContainer");

// Edit Task clicked and Custom Event dispatched
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("editTask--")) {
    const [prefix, taskId] = clickEvent.target.id.split("--");
    const editTaskCustomEvent = new CustomEvent("edit-btn-has-been-click", {
      detail: {
        taskId: taskId
      }
    });
    eventHub.dispatchEvent(editTaskCustomEvent);
  }
});

// Save Task clicked and Custom Event dispatched
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("saveTask--")) {
    const taskName = document.querySelector("#task-name").value;
    const taskCompletionDate = document.querySelector("#task-date").value;
    const hiddenValue = document.querySelector("#hidden-value").value;
    const taskCompleted = false;

    const saveNewTaskCustomEvent = new CustomEvent("task-saved", {
      detail: {
        taskName: taskName,
        taskCompletionDate: taskCompletionDate,
        taskHiddenValue: hiddenValue,
        isCompleted: taskCompleted
      }
    });
    eventHub.dispatchEvent(saveNewTaskCustomEvent);
  }
});

// Delete tasks clicked, tasks deleted, and tasked updated
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("deleteTask--")) {
    const [prefix, taskId] = clickEvent.target.id.split("--");
    deleteTask(taskId).then(() => {
      reRenderTask();
      clearAllValues();
    });
  }
});

// Hide tasks clicked and custom event created
eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("hideTask--")) {
    const [prefix, taskId] = clickEvent.target.id.split("--");
    const hideTask = new CustomEvent("hideTask", {
      detail: {
        taskId: taskId
      }
    });
    eventHub.dispatchEvent(hideTask);
  }
});

// Update tasks array, render all tasks that are not hidden, and clear values once new tasks are created, edited, or hidden
eventHub.addEventListener("update", clickEvent => {
  reRenderTask();
  clearAllValues();
});

const clearAllValues = () => {
  document.querySelector("#task-name").value = "";
  document.querySelector("#task-date").value = "";
  document.querySelector("#hidden-value").value = "";
};
// render all tasks that are not hidden
export const reRenderTask = () => {
  const allTasks = useTasks();
  const showTask = allTasks.filter(task => task.isCompleted === false);
  renderTask(showTask);
};

const renderTask = taskCollection => {
  const foundTask = taskCollection.filter(
    // Filter tasks array by active user
    taskArrayOfObjects =>
      taskArrayOfObjects.userId ===
      parseInt(sessionStorage.getItem("activeUser"), 10)
  );
  targetElement.innerHTML = foundTask
    .map(taskObject => {
      const HTMLRepresentation = TaskComponent(taskObject);
      return HTMLRepresentation;
    })
    .join("");
};
