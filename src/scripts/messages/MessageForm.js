export const MessageForm = message => {
  return `
    <section class="messageFormCard">
      <fieldset>
        <form class="messageForm">
          <div class="messageFormInfo">
            Message: <textarea id="messageForm" type="text" placeholder="Please enter message....."></textarea>
          </div>
        </form>
        <button id="saveMessage--${message.id}" class="saveMessageBtn">Save Message</button>
      </fieldset>
    </section>
  `;
};

const message = new CustomEvent("messageSent", {
  detail: {
      messageId: document.querySelector.startsWith("saveMessage").split("--")[1]
  }
})
eventHub.dispatchEvent(message)