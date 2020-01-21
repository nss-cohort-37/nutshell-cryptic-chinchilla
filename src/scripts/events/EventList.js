import { useEvents, saveEvent, editEvent, deleteEvent } from "./EventProvider.js"
import { useFriends } from "../friends/FriendsProvider.js"
import { EventComponent } from "./Event.js"
import { EventsForm } from "./EventForm.js"
import { EventEditRender } from "./EventEditRender.js"
import { EventDeleteRender } from "./EventDeleteRender.js"

const contentTarget = document.querySelector(".eventsRenderArea")
const formTarget = document.querySelector(".eventsFormArea")
const eventHub = document.querySelector(".container")

const render = (eventsArray) => {
    contentTarget.innerHTML = eventsArray.map(event => {
        // Get HTML representation of product
        const html = EventComponent(event)

        return html
    }).join("")
}

const renderForm = () => {
    formTarget.innerHTML = ""
    formTarget.innerHTML = EventsForm()
}

const renderButton = () => {
    const buttonTarget = document.querySelector(".addEventsButton")
    buttonTarget.innerHTML = `
    <button id="addEventButton">Add event</button>
    `
}

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

    //Listens for click fo Save Event button
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
            updatedCombinedArray.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            })
            let firstEvent = document.querySelector(".firstEvent")
            if (firstEvent != null) {
                firstEvent.classList.remove(".firstEvent")
            }
            render(updatedCombinedArray)
            let firstEventId = updatedCombinedArray[0].id
            let firstEventDialog = document.querySelector(`#eventDetails--${firstEventId}`)
            let firstEventSection = firstEventDialog.closest(".eventCard")
            firstEventSection.classList.add("firstEvent")
            renderForm()
            renderButton()
            EventEditRender(updatedCombinedArray)
            EventDeleteRender(updatedCombinedArray)
            const dialogTarget = document.querySelector(".eventDialog")
            dialogTarget.close()
        }
    })
    combinedArray.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    })
    let firstEvent = document.querySelector(".firstEvent")
    if (firstEvent != null) {
        firstEvent.classList.remove(".firstEvent")
    }
    render(combinedArray)
    if (combinedArray.length > 0) {
        let firstEventId = combinedArray[0].id
        let firstEventDialog = document.querySelector(`#eventDetails--${firstEventId}`)
        let firstEventSection = firstEventDialog.closest(".eventCard")
        firstEventSection.classList.add("firstEvent")
        EventEditRender(combinedArray)
        EventDeleteRender(combinedArray)
    }
    renderForm()
    renderButton()
}

// Listens for click of Add Event button
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "addEventButton") {
    const dialogTarget = document.querySelector(".eventDialog")
    dialogTarget.showModal()
    }
})

// Listens for click of Save Event button
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "closeEventDialog") {
        let formattedDate = new Date(document.getElementById("eventDateTime").value).toString()

        const newEvent = {
            userId: parseInt(sessionStorage.getItem("activeUser"), 10),
            name: document.getElementById("eventTitleText").value,
            date: formattedDate,
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

//Listens for click of Edit Event button
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

//Listens for click of Edit Event button
eventHub.addEventListener("editEventButtonClicked", event => {
    const eventToEdit = event.detail.eventId
    const allEvents = useEvents()
    const foundEvent = allEvents.find(
        (currentEvent) => {
            return currentEvent.id === parseInt(eventToEdit, 10)
        }
    )
    document.querySelector(`#eventName--${eventToEdit}`).value = foundEvent.name
    document.querySelector(`#eventLocation--${eventToEdit}`).value = foundEvent.location 
    const theDialog = document.querySelector(`#eventDetails--${foundEvent.id}`)
    theDialog.showModal()     
})


// Listens for click of Save Edit button
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("saveEventEdit")) {
        const [prefix, eventId] = clickEvent.target.id.split("--")
        debugger
        let formattedDate = new Date(document.querySelector(`#eventDate--${eventId}`).textContent.split("Date: ")[1]).toString()
        const editedEvent = {
            id: parseInt(eventId, 10),
            userId: parseInt(sessionStorage.getItem("activeUser"), 10),
            name: document.querySelector(`#eventName--${eventId}`).value,
            date: formattedDate,
            location: document.querySelector(`#eventLocation--${eventId}`).value
        }
        editEvent(editedEvent)
            .then(() => {
                const updatedEvents = useEvents()
                updatedEvents.sort(function(a,b){
                    return new Date(a.date) - new Date(b.date);
                })
                let firstEvent = document.querySelector(".firstEvent")
                if (firstEvent != null) {
                    firstEvent.classList.remove(".firstEvent")
                }
                render(updatedEvents)
                let firstEventId = updatedEvents[0].id
                let firstEventDialog = document.querySelector(`#eventDetails--${firstEventId}`)
                let firstEventSection = firstEventDialog.closest(".eventCard")
                firstEventSection.classList.add("firstEvent")
                EventEditRender(updatedEvents)
                EventDeleteRender(updatedEvents)
                renderForm()
            })
    }
})

//Listens for click of Delete Event button
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteEvent--")) {
    let [prefix, eventId] = event.target.id.split("--")
    eventId = parseInt(eventId, 10)
    deleteEvent(eventId)
        .then(() => {
            const updatedEvents = useEvents()
            updatedEvents.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            })
            let firstEvent = document.querySelector(".firstEvent")
            if (firstEvent != null) {
                firstEvent.classList.remove(".firstEvent")
            }
            render(updatedEvents)
            let firstEventId = updatedEvents[0].id
            let firstEventDialog = document.querySelector(`#eventDetails--${firstEventId}`)
            let firstEventSection = firstEventDialog.closest(".eventCard")
            firstEventSection.classList.add("firstEvent")
            EventEditRender(updatedEvents)
            EventDeleteRender(updatedEvents)
            renderForm()
        })
    }
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("xOutEventDialog")) {
        const dialogTarget = document.querySelector(".eventDialog")
        dialogTarget.close()
    }
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("xOutEventEditDialog")) {
        let [prefix, eventId] = event.target.id.split("--")
        const dialogTarget = document.querySelector(`#eventDetails--${eventId}`)
        dialogTarget.close()
    }
})