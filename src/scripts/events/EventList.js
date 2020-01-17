import { useEvents, saveEvent } from "./EventProvider.js"
import { useUsers } from "../users/UsersProvider.js"
import { EventComponent } from "./Event.js"
import { EventsForm } from "./EventForm.js"

const buttonTarget = document.querySelector(".addEventsButton")
const contentTarget = document.querySelector(".eventsRenderArea")
const eventHub = document.querySelector(".container")

export const EventList = () => {
    const events = useEvents()
    const users = useUsers()
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10)

    const usersEvents = events.filter(
        event =>
            event.userId === currentUserId
    )

    let friendsEvents = []
    users.map(user => {
        if (user.id === currentUserId) {
            user.friends.map(friend => {
                events.filter(
                    event => {
                        if (event.userId === friend.friendInitiateId) {
                            friendsEvents.push(event)
                        }
                    }
                )
            })
        }
    })

    const combinedArray = usersEvents.concat(friendsEvents)

    const renderButton = () => {
        buttonTarget.innerHTML = `
        <button id="addEventButton">Add event</button>
        `
    }

    const render = () => {
        contentTarget.innerHTML = combinedArray.map(event => {
            // Get HTML representation of product
            const html = EventComponent(event)

            return html
        }).join("")
    }

    const renderForm = () => {
        contentTarget.innerHTML = EventsForm()
    }

    eventHub.addEventListener("click", clickEvent => {
        if(clickEvent.target.id === "addEventButton") {
            contentTarget.innerHTML = ""
            renderForm()
            contentTarget.showModal()
        }
    })

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === closeEventDialog) {
            const newEvent = {
                userId: currentUserId,
                name: document.getElementById("eventTitleText").value,
                date: document.getElementById("eventDateTime").value,
                location: document.getElementById("eventLocation").vakue
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

    eventHub.addEventListener("eventSaved", event => {
        if (event.detail.wasEventSaved === "yes") {
            const updatedEvents = useEvents()
        }
    })

    renderButton()
    render()
}