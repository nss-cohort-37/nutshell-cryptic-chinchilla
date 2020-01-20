import { useEvents, saveEvent } from "./EventProvider.js"
import { useFriends } from "./FriendsProvider.js"
import { EventComponent } from "./Event.js"
import { EventsForm } from "./EventForm.js"
import { EventEditRender, editEventListener, editEventDialog } from "./EventEditRender.js"

const contentTarget = document.querySelector(".eventsRenderArea")
const formTarget = document.querySelector(".eventsFormArea")
const eventHub = document.querySelector(".container")

export const EventList = () => {

    const events = useEvents()
    const friends = useFriends()

    let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10)

    const usersEvents = events.filter(
        event =>
            event.userId === currentUserId
    )

    let friendsEvents = []
    friends.map(friend => {
        if (friend.friendInitiateId === currentUserId) {
            events.filter(
                event => {
                    if (event.userId === friend.user.id) {
                        friendsEvents.push(event)
                    }
                }
            )
        }
    })

    const combinedArray = usersEvents.concat(friendsEvents)

    const render = (eventsArray) => {
        contentTarget.innerHTML = eventsArray.map(event => {
            // Get HTML representation of product
            const html = EventComponent(event)

            return html
        }).join("")
    }

    const renderForm = () => {
        formTarget.innerHTML = EventsForm()
    }

    eventHub.addEventListener("click", clickEvent => {
        if(clickEvent.target.id === "addEventButton") {
        const dialogTarget = document.querySelector(".eventDialog")
        dialogTarget.showModal()
        }
    })

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "closeEventDialog") {
            const newEvent = {
                userId: currentUserId,
                name: document.getElementById("eventTitleText").value,
                date: document.getElementById("eventDateTime").value,
                location: document.getElementById("eventLocationText").value
            }

            const message = new CustomEvent("eventSaved", {
                detail: {
                    wasEventSaved: "yes"
                }
            })

            saveEvent(newEvent)
                .then(() => {
                    eventHub.dispatchEvent(message)
                })
        }
    })

    eventHub.addEventListener("editEventButtonClicked", event => {
        const eventToEdit = event.detail.eventId
        const allEvents = useEvents()
        const foundEvent = allEvents.find(
            (currentEvent) => {
              return currentEvent.id === parseInt(eventToEdit, 10)
            }
          )
          document.querySelector("#entry-id").value = foundMessage.id
          document.querySelector(`#messageText--${messageToEdit}`).value = foundMessage.message      
    })

        //saves edit message
    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id.startsWith("saveEdit")) {
          const [prefix, id] = clickEvent.target.id.split("--")
          const editedMessage = {
              id: parseInt(document.querySelector("#entry-id").value, 10),
              message: document.querySelector(`#messageText--${id}`).value,
              userId: parseInt(sessionStorage.getItem('activeUser'), 10)
            }
          editMessage(editedMessage)
          .then(() => {
              const updatedMessages = useMessages()
            render(updatedMessages)
            messageEditRender(updatedMessages)
            renderForm()
        })
    }
})

    render(combinedArray)
    renderForm()
    EventEditRender(combinedArray)
    editEventListener()
    editEventDialog()

    const renderButton = () => {
        const buttonTarget = document.querySelector(".addEventsButton")
        buttonTarget.innerHTML = `
        <button id="addEventButton">Add event</button>
        `
    }
    
    renderButton()

    eventHub.addEventListener("eventSaved", event => {
        if (event.detail.wasEventSaved === "yes") {
            const updatedEvents = useEvents()
            const updatedUsersEvents = updatedEvents.filter(
                event =>
                    event.userId === currentUserId
            )
        
            let updatedFriendsEvents = []
            friends.map(friend => {
                if (friend.friendInitiateId === currentUserId) {
                    updatedEvents.filter(
                        event => {
                            if (event.userId === friend.user.id) {
                                updatedFriendsEvents.push(event)
                            }
                        }
                    )
                }
            })
        
            const updatedCombinedArray = updatedUsersEvents.concat(updatedFriendsEvents)
            render(updatedCombinedArray)
            renderButton()
            const dialogTarget = document.querySelector(".eventDialog")
            dialogTarget.close()
        }
    })

}