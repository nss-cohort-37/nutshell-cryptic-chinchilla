import { FriendsListComponent } from "../friends/FriendsList.js";
import { MessageList } from "../messages/MessageList.js";
import { EventList } from "../events/EventList.js"
import { NewsList } from "../news/NewsList.js"
import { NavbarEventListener } from "../navbar/navbarList.js";
import { addSearchEventListeners } from "../friends/FriendSearchList.js";


const eventHub = document.querySelector(".container");


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
    addSearchEventListeners();
    NavbarEventListener()
}}})}