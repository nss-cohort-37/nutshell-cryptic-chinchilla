export const MessageForm = () => {
  return `
    <section class="messageFormCard">
      <fieldset>
        <form class="messageForm">
          <div class="messageFormInfo">
            Message: <br><textarea id="messageForm" type="text" placeholder="Please enter message....."></textarea>
          </div>
        </form>
        <button id="saveMessage" class="saveMessageBtn">Save Message</button>
      </fieldset>
    </section>
  `;
};

export const editMessageListener = () => {
  const eventHub = document.querySelector(".container")
  eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("editMessage--")) {
      const [prefix, id] = event.target.id.split("--")
      const editMessage = new CustomEvent("editMessageButtonClicked", {
        detail: {
          messageId: id
        }
      })
      eventHub.dispatchEvent(editMessage)
    }
  })
}

export const editMessageDialog = () => {
  const eventHub = document.querySelector(".container")
  eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("editMessage")) {
      const [prefix, id] = event.target.id.split("--")
      const theDialog =document.querySelector(`#details--${id}`)
      theDialog.showModal()
    }
  })
}
