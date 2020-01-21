import { FriendsListComponent } from "../friends/FriendsList.js";
import { MessageList } from "../messages/MessageList.js";
import { EventList } from "../events/EventList.js"
import { NewsList } from "../news/NewsList.js"
import { NavbarEventListener } from "../navbar/navbarList.js";
import { renderSearch } from "../friends/FriendSearchList.js";
import { TaskForm } from "../tasks/TaskForm.js";
import { TaskListForm, renderTaskForm } from "../tasks/TaskFormList.js";
import { TaskList, reRenderTask } from "../tasks/TaskList.js";
import { TaskDialog } from "../tasks/taskDialog.js";


const eventHub = document.querySelector(".container");

export const refreshDashboard = () => {
  FriendsListComponent()
  MessageList()
 renderSearch()
  TaskForm()
  TaskListForm()
  TaskList()
  TaskDialog()
  reRenderTask()
  renderTaskForm()
  NavbarEventListener()
  EventList()
  NewsList()
  document.querySelector(".navbar").classList.remove("hidden")

}

export const initiateDashboardEventListener = () => {
eventHub.addEventListener("click", clickEvent => {
  if (
    clickEvent.target.id === "button--saveUser" ||
    clickEvent.target.id === "button--logIn"
  ) {
    if (sessionStorage.getItem("activeUser") !== null) {
    FriendsListComponent()
    MessageList()
    EventList()
    NewsList()
    renderSearch()
    NavbarEventListener()
    renderTaskForm()
    reRenderTask()
    TaskListForm()
    TaskList()
    TaskDialog()
}}})}