export const messageEditRender = (messages) => {
  messages.map(message => {
    const contentTarget =  document.querySelector(`.editButtonContainer--${message.id}`)
    if (message.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
      contentTarget.innerHTML = `
      <button id="editMessage--${message.id}">Edit Message</button>
      `
    }
  })
}
