import { useMessages, saveMessage, editMessage } from "./MessagesProvider.js";
import { MessageComponent } from "./Messages.js";
import {
  MessageForm,
  editMessageListener,
  editMessageDialog
} from "./MessageForm.js";
import { messageEditRender } from "./MessageEditRender.js";
const contentTarget = document.querySelector(".messagesContainer");
const formTarget = document.querySelector(".messagesForm");
const eventHub = document.querySelector(".container");

export const MessageList = () => {
  const messages = useMessages();
  eventHub.addEventListener("messageSent", messageEvent => {
    const sentStatus = messageEvent.detail.wasMessageSent;
    if (sentStatus === "yes") {
      const updatedMessages = useMessages();
      contentTarget.innerHTML = updatedMessages
        .map(message => {
          // Get HTML representation of product
          const html = Message(message);

          return html;
        })
        .join("");
    }
  });

  //edit MESSAGE BUTTON
  eventHub.addEventListener("editMessageButtonClicked", event => {
    const messageToEdit = event.detail.messageId;
    const allMessages = useMessages();
    const foundMessage = allMessages.find(currentMessage => {
      return currentMessage.id === parseInt(messageToEdit, 10);
    });
    document.querySelector("#entry-id").value = foundMessage.id;
    document.querySelector(`#messageText--${messageToEdit}`).value =
      foundMessage.message;
  });

  if (sessionStorage.getItem("activeUser") !== null) {
      render(messages);
      renderForm();
    
      editMessageListener();
      messageEditRender(messages);
      editMessageDialog();

  }
};

const render = messages => {
  contentTarget.innerHTML = messages
    .map(message => {
      // Get HTML representation of product
      const html = MessageComponent(message);

      return html;
    })
    .join("");
};

const renderForm = () => {
  formTarget.innerHTML = MessageForm();
};

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("saveEdit")) {
    const [prefix, id] = clickEvent.target.id.split("--");
    const editedMessage = {
      id: parseInt(document.querySelector("#entry-id").value, 10),
      message: document.querySelector(`#messageText--${id}`).value,
      userId: parseInt(sessionStorage.getItem("activeUser"), 10)
    };
    editMessage(editedMessage).then(() => {
      const updatedMessages = useMessages();
      render(updatedMessages);
      messageEditRender(updatedMessages);
      renderForm();
    });
  }
});

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "saveMessage") {
    console.log("heard save button");
    let messageUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
    let messageText = document.getElementById("messageForm").value;

    let newMessage = {
      userId: messageUserId,
      message: messageText
    };
    saveMessage(newMessage).then(() => {
      const updatedMessages = useMessages();
      render(updatedMessages);
      messageEditRender(updatedMessages);
      renderForm();
    });
  }
});

eventHub.addEventListener("click", event => {
  if (event.target.classList.contains("messageUsername")) {
    const [friendValue, foo] = event.target.innerHTML.split(":");
    const confirmFriend = confirm(`Add ${friendValue} as a new friend??`);
    if (confirmFriend === true) {
      const message = new CustomEvent("friendNameClicked", {
        detail: {
          friendUserName: friendValue
        }
      });
      eventHub.dispatchEvent(message);
    }
  }
});
