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

export const editMessage = () => {
  const eventHub = document.querySelector(".appContainer")
  eventHub.addEventListener("click", event => {
      if (event.target.id.startsWith("editMessage--")) {
          const [prefix, id] = event.target.id.split("--")
          const editMessage = new CustomEvent("editMessageButtonClicked", {
              detail: {
                messageId: id
              }
            })
            eventHub.dispatchEvent(editMessage)
            const dialogSiblingSelector = `#${event.target.id}+dialog`
            const theDialog = document.querySelector(dialogSiblingSelector)
            theDialog.showModal()
            
      }
      if (event.target.id.startsWith("saveEdit--")) {
      const dialogElement = event.target.parentNode
      console.log(dialogElement)
      dialogElement.close()

      }
  })

}
