import { FriendsListComponent } from "../friends/FriendsList.js";
import { MessageList } from "../messages/MessageList.js";
import { EventList } from "../events/EventList.js";
import { NewsList } from "../news/NewsList.js";
import {
  NavbarEventListener,
  renderNavbarTitle
} from "../navbar/navbarList.js";
import { renderSearch } from "../friends/FriendSearchList.js";
import { TaskForm } from "../tasks/TaskForm.js";
import { renderTaskForm } from "../tasks/TaskFormList.js";
import { reRenderTask } from "../tasks/TaskList.js";
import { TaskDialog } from "../tasks/taskDialog.js";

const removeTitleHiddenClass = () => {
  document.querySelector(".sectionTitleFriends").classList.remove("hidden");
  document.querySelector(".sectionTitleNews").classList.remove("hidden");
  document.querySelector(".sectionTitleEvents").classList.remove("hidden");
  document.querySelector(".sectionTitleMessages").classList.remove("hidden");
  document.querySelector(".sectionTitleTasks").classList.remove("hidden");
};

export const refreshDashboard = () => {
  FriendsListComponent();
  MessageList();
  renderSearch();
  TaskForm();
  TaskDialog();
  reRenderTask();
  renderTaskForm();
  NavbarEventListener();
  EventList();
  NewsList();
  renderNavbarTitle();
  removeTitleHiddenClass();
  document.querySelector(".navbar").classList.remove("hidden");
};

export const initiateDashboardEventListener = () => {
  FriendsListComponent();
  MessageList();
  EventList();
  NewsList();
  renderSearch();
  NavbarEventListener();
  renderTaskForm();
  reRenderTask();
  TaskDialog();
  renderNavbarTitle();
  removeTitleHiddenClass();
  document.querySelector(".navbar").classList.remove("hidden");
};
