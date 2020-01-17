import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { getMessages } from "./messages/MessagesProvider.js";
import { MessageEventListener } from "./messages/MessageListener.js";
import { NavbarEventListener } from "./navbar/navbarList.js";
import { getTasks } from "./tasks/TaskProvider.js";
import { TaskForm } from "./tasks/TaskForm.js";
import { TaskListForm } from "./tasks/TaskFormList.js";
import { TaskList } from "./tasks/TaskList.js";
import { TaskDialog } from "./tasks/taskDialog.js";

getUsers()
  .then(() => logInList())
  .then(() => logInEvent())
  .then(() => getMessages())
  .then(() => MessageEventListener())
  .then(getTasks)
  .then(TaskForm)
  .then(TaskListForm)
  .then(TaskList)
  .then(TaskDialog);

NavbarEventListener();
