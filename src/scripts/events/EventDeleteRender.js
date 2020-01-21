export const EventDeleteRender = (events) => {
    events.map(event => {
      const contentTarget =  document.querySelector(`.deleteButtonContainer--${event.id}`)
      if (event.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = ""
        contentTarget.innerHTML = `
        <button class="btn btn-danger" id="deleteEvent--${event.id}">Delete Event</button>
        `
      }
    })
  }