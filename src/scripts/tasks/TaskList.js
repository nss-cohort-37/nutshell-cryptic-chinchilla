import { useTasks, getTasks } from "./TaskProvider.js";
import { useUsers } from "../users/UsersProvider.js";
import { TaskComponent } from "./Task.js";

export const TaskList = () => {
  const eventHub = document.querySelector(".container");
  const targetElement = document.querySelector(".tasksContainer");

  const gotTask = useTasks();
  const gotUsers = useUsers();

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
