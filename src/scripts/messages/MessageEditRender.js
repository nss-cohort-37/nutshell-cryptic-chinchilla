export const messageEditRender = (messages) => {
  debugger 
  console.log(message.userId)
  const content = document.querySelector(".editButtonContainer")
    messages.map(message => {
    if (message.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
      content.innerHTML = `
      <button id="editMessage--${message.id}">Edit Message</button>
      `
    }
  })
}

