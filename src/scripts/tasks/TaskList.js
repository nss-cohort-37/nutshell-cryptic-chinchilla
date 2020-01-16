import { useTasks, getTasks, saveTask } from "./TaskProvider.js";
import { useUsers } from "../users/UsersProvider.js";
import { TaskComponent } from "./Task.js";

export const TaskList = () => {
  const eventHub = document.querySelector(".container");
  const targetElement = document.querySelector(".tasksContainer");
  const gotTask = useTasks();
  const gotUsers = useUsers();

  // eventHub.addEventListener("click", clickEvent);

  eventHub.addEventListener("task-saved", clickEvent => {
    const savedTaskName = clickEvent.detail.taskName;
    const savedTaskDate = clickEvent.detail.taskCompletionDate;

    const newTask = {
      name: savedTaskName,
      completionDate: savedTaskDate
    };

    saveTask(newTask).then(() => {
      const taskWereSavedEvent = new CustomEvent("task-need-to-be-updated");
      eventHub.dispatchEvent(taskWereSavedEvent);
    });
  });

  targetElement.innerHTML = `
     ${gotUsers
       .map(user => {
         const findTask = gotTask.filter(task => user.id === task.userId);

         const HTMLRepresentation = TaskComponent(user, findTask);
         return HTMLRepresentation;
       })
       .join("")}
  
`;
};
