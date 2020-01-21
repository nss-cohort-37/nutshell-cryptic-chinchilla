export const messageEditRender = (messages) => {
  messages.map(message => {
    const contentTarget =  document.querySelector(`.editMessageButtonContainer--${message.id}`)
    if (message.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
      contentTarget.innerHTML = ""
      contentTarget.innerHTML = `
      <button id="editMessage--${message.id}" class="btn btn-secondary">Edit Message</button>
      `
    }
  })
}