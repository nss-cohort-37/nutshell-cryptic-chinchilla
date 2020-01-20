export const EventEditRender = (events) => {
    events.map(event => {
      const contentTarget =  document.querySelector(`.editButtonContainer--${event.id}`)
      if (event.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = `
        <button id="editEvent--${event.id}">Edit Event</button>
        `
      }
    })
  }

  export const editEventListener = () => {
    const eventHub = document.querySelector(".container")
    eventHub.addEventListener("click", event => {
      if (event.target.id.startsWith("editEvent--")) {
        const [prefix, id] = event.target.id.split("--")
        const editEvent = new CustomEvent("editEventButtonClicked", {
          detail: {
            eventId: id
          }
        })
        eventHub.dispatchEvent(editEvent)
      }
    })
  }
  
  export const editEventDialog = () => {
    const eventHub = document.querySelector(".container")
    eventHub.addEventListener("click", event => {
      if (event.target.id.startsWith("editEvent")) {
        const [prefix, id] = event.target.id.split("--")
        const theDialog = document.querySelector(`#details--${id}`)
        theDialog.showModal()
      }
    })
  }