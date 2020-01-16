import { TaskList } from "./tasks/TaskList.js";
import { getUsers } from "./users/UsersProvider.js";
import { getTasks } from "./tasks/TaskProvider.js";
import { TaskForm } from "./tasks/TaskForm.js";
import { TaskListForm } from "./tasks/TaskFormList.js";

getUsers()
  .then(TaskForm)
  .then(TaskListForm)
  .then(getTasks)
  .then(TaskList);
