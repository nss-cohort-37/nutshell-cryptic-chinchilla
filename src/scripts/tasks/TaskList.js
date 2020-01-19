import { useTasks, deleteTask, getTasks } from "./TaskProvider.js";
import { useUsers } from "../users/UsersProvider.js";
import { TaskComponent } from "./Task.js";

export const TaskList = () => {
  const eventHub = document.querySelector(".container");
  const targetElement = document.querySelector(".tasksContainer");

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

  // Save Task
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("saveTask--")) {
      const taskName = document.querySelector("#task-name").value;
      const taskCompletionDate = document.querySelector("#task-date").value;
      const hiddenValue = document.querySelector("#hidden-value").value;

      const saveNewTaskCustomEvent = new CustomEvent("task-saved", {
        detail: {
          taskName: taskName,
          taskCompletionDate: taskCompletionDate,
          taskHiddenValue: hiddenValue
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

  // Update task array and clear values once new task is created or task is edited
  eventHub.addEventListener("update", clickEvent => {
    const updateTask = useTasks();
    renderTask(updateTask);
    clearAllValues();
  });

  // Render task once logged in
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "button--logIn") {
      reRenderTask();
    }
  });

  const reRenderTask = () => {
    const updateTask = useTasks();
    renderTask(updateTask);
  };

  const clearAllValues = () => {
    document.querySelector("#task-name").value = "";
    document.querySelector("#task-date").value = "";
    document.querySelector("#hidden-value").value = "";
  };

  // render tasks
  const renderTask = taskCollection => {
    const users = useUsers();

    const foundTask = taskCollection.filter(
      // Filter task array by active user
      taskArray =>
        taskArray.userId === parseInt(sessionStorage.getItem("activeUser"), 10)
    );
    targetElement.innerHTML = foundTask
      .map(taskObject => {
        // Display user that's associated with task
        const foundUser = users.filter(user => taskObject.userId === user.id);
        const HTMLRepresentation = TaskComponent(taskObject, foundUser);
        return HTMLRepresentation;
      })
      .join("");
  };
};
