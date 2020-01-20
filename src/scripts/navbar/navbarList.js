import { logInList } from "../logIn/LogInList.js";
import { saveMessage } from "../messages/MessagesProvider.js";

const eventHub = document.querySelector(".container");
const messagesEventHub = document.querySelector(".appContainer");
const contentElement = document.querySelector(".navbar");

export const NavbarEventListener = () => {
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logOut") {
      sessionStorage.clear();
      document.querySelector(".friendsCards").innerHTML = "";
      document.querySelector(".friendSearchContainer").innerHTML = "";
      document.querySelector(".newsContainer").innerHTML = "";
      document.querySelector(".eventsContainer").innerHTML = "";
      document.querySelector(".tasksContainer").innerHTML = "";
      document.querySelector(".messagesContainer").innerHTML = "";
      document.querySelector(".messagesForm").innerHTML = "";
      document.querySelector(".taskForm").innerHTML = "";
      logInList();
    }
  });
};
