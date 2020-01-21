import { MessageList } from "./MessageList.js";

const eventHub = document.querySelector(".container");

export const MessageEventListener = () => {
  eventHub.addEventListener("click", clickEvent => {
    if (
      clickEvent.target.id === "button--logIn" ||
      clickEvent.target.id === "button--saveUser"
    ) {
      MessageList()
      
    }
  });
};
