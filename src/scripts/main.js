import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { getMessages } from "./messages/MessagesProvider.js";
import { MessageEventListener } from "./messages/MessageListener.js";
import { NavbarEventListener } from "./navbar/navbarList.js";
import { FriendsListComponent } from "./friends/FriendsList.js";
import { getFriends } from "./friends/FriendsProvider.js";
import { addSearchEventListeners } from "./friends/FriendSearchList.js";
import { initiateDashboardEventListener } from "./dashboardEvents/DashboardLoad.js";
import { MessageList } from "./messages/MessageList.js";
import { getTasks } from "./tasks/TaskProvider.js";
import { TaskForm } from "./tasks/TaskForm.js";
import { TaskListForm, renderTaskForm } from "./tasks/TaskFormList.js";
import { TaskList, reRenderTask } from "./tasks/TaskList.js";
import { TaskDialog } from "./tasks/taskDialog.js";

if (!sessionStorage.hasOwnProperty("activeUser")) {
  getUsers()
    .then(() => {
      logInList();
    })
    .then(() => logInEvent())
    .then(() => getMessages())
    .then(() => MessageEventListener())
    .then(getTasks)
    .then(TaskForm)
    .then(TaskListForm)
    .then(TaskList)
    .then(TaskDialog)
    .then(getFriends)
    .then(getUsers)
    .then(() => {
      initiateDashboardEventListener();
    });
} else {
  getUsers()
    .then(getMessages)
    .then(getFriends)
    .then(getTasks)
    .then(() => MessageEventListener())
    // .then(getUsers)
    .then(() => {
      logInEvent();
      TaskForm();
      TaskListForm();
      TaskList();
      TaskDialog();
      reRenderTask();
      renderTaskForm();
      FriendsListComponent();
      MessageList();
      addSearchEventListeners();
      NavbarEventListener();
      initiateDashboardEventListener();
    });
}
