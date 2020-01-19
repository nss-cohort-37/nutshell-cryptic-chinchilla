import { MessageList } from "./MessageList.js";
import { initiateFriendSearchComponent } from "../friends/FriendSearch.js";
import { FriendsListComponent } from "../friends/FriendsList.js";
import { addSearchEventListeners } from "../friends/FriendSearchList.js";
import { NavbarEventListener } from "../navbar/navbarList.js";
import { getFriends } from "../friends/FriendsProvider.js";
import { getUsers } from "../users/UsersProvider.js";
import { initiateDashboardEventListener } from "../dashboardEvents/DashboardLoad.js";

const eventHub = document.querySelector(".container");

export const MessageEventListener = () => {
  eventHub.addEventListener("click", clickEvent => {
    if (
      clickEvent.target.id === "button--logIn" ||
      clickEvent.target.id === "button--saveUser"
    ) {
      MessageList();
      
    }
  });
};
