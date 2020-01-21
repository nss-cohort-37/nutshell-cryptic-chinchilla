import { logInList } from "../logIn/LogInList.js";
import { useUsers } from "../users/UsersProvider.js";

const eventHub = document.querySelector(".container");
const messagesEventHub = document.querySelector(".appContainer");

export const renderNavbarTitle = () => {
  const contentElement = document.querySelector("#navbarTitle");

  const allUsers = useUsers()
  const activeUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
  const activeUser = allUsers.find(user => user.id === activeUserId)
  contentElement.innerHTML = `${activeUser.userName}, You're so much smarter than literally everyone else`
}



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
