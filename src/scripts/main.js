import { TaskList } from "./tasks/TaskList.js";
import { getUsers } from "./users/UsersProvider.js";
import { getTasks } from "./tasks/TaskProvider.js";

getUsers()
  .then(getTasks)
  .then(TaskList);
