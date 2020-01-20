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
//Broadcasts the id of the event being edited



//Finds the event being edited and populates the edit dialog
// with the event's information
eventHub.addEventListener("editEventButtonClicked", event => {
    const eventToEdit = event.detail.eventId
    const allEvents = useEvents()
    const foundEvent = allEvents.find(
        (currentEvent) => {
            return currentEvent.id === parseInt(eventToEdit, 10)
        }
    )
    document.querySelector(`#eventName--${eventToEdit}`).value = foundEvent.name
    document.querySelector(`eventLocation--${eventToEdit}`).value = foundEvent.location 
    const theDialog = document.querySelector(`#eventDetails--${foundEvent.id}`)
    theDialog.showModal()     
})