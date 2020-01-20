import { useTasks, deleteTask, getTasks } from "./TaskProvider.js";
import { TaskComponent } from "./Task.js";

const eventHub = document.querySelector(".container");
const targetElement = document.querySelector(".tasksContainer");

export const TaskList = () => {
  // Edit Task
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

  let taskCompleted = "";

  // Save Task
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("saveTask--")) {
      const taskName = document.querySelector("#task-name").value;
      const taskCompletionDate = document.querySelector("#task-date").value;
      const hiddenValue = document.querySelector("#hidden-value").value;
      taskCompleted = false;

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

  // Delete task
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteTask--")) {
      const [prefix, taskId] = clickEvent.target.id.split("--");
      deleteTask(taskId).then(() => {
        const taskHasBeenDeletedCustomEvent = new CustomEvent("task-deleted");
        eventHub.dispatchEvent(taskHasBeenDeletedCustomEvent);

        // Update task array once task is deleted
        reRenderTask();
        clearAllValues();
      });
    }
  });

  eventHub.addEventListener("updateWithoutHide", clickEvent => {
    const allTasks = useTasks();
    const showTask = allTasks.filter(task => task.isCompleted === false);
    renderTask(showTask);
  });

  // Hide task clicked and custom event created
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

  // Update task array and clear values once new task is created or task is edited
  eventHub.addEventListener("update", clickEvent => {
    reRenderTask();
    clearAllValues();
  });

  // Render task once logged in
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "button--logIn") {
      reRenderTask();
    }
  });

  const clearAllValues = () => {
    document.querySelector("#task-name").value = "";
    document.querySelector("#task-date").value = "";
    document.querySelector("#hidden-value").value = "";
  };
};

// render tasks
export const reRenderTask = () => {
  const allTasks = useTasks();
  const showTask = allTasks.filter(task => task.isCompleted === false);
  renderTask(showTask);
};

const renderTask = taskCollection => {
  const foundTask = taskCollection.filter(
    // Filter task array by active user
    taskArray =>
      taskArray.userId === parseInt(sessionStorage.getItem("activeUser"), 10)
  );
  targetElement.innerHTML = foundTask
    .map(taskObject => {
      // Display user that's associated with task
      const HTMLRepresentation = TaskComponent(taskObject);
      return HTMLRepresentation;
    })
    .join("");
};
