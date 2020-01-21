import { logInList } from "../logIn/LogInList.js";

const eventHub = document.querySelector(".container");
const messagesEventHub = document.querySelector(".appContainer");
const contentElement = document.querySelector(".navbar");



export const NavbarEventListener = () => {
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logOut") {
      sessionStorage.clear();
      document.querySelector(".friendsCards").innerHTML = "";
      document.querySelector(".friendSearchContainer").innerHTML = "";
      document.querySelector(".eventsRenderArea").innerHTML = "";
      document.querySelector(".eventsFormArea").innerHTML = "";
      document.querySelector(".addEventsButton").innerHTML = "";
      document.querySelector(".newsRenderArea").innerHTML = "";
      document.querySelector(".newsFormArea").innerHTML = "";
      document.querySelector(".addNewsButton").innerHTML = "";
      document.querySelector(".tasksContainer").innerHTML = "";
      document.querySelector(".messagesContainer").innerHTML = "";
      document.querySelector(".messagesForm").innerHTML = "";
      document.querySelector(".taskForm").innerHTML = "";
      document.querySelector(".navbar").classList.add("hidden")
      logInList();
    }
  });
};
