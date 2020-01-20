import { useNews, saveNews, editNews, deleteNews } from "./NewsProvider.js"
import { useFriends } from "../friends/FriendsProvider.js"
import { NewsComponent } from "./News.js"
import { NewsForm } from "./EventForm.js"
import { EventEditRender } from "./EventEditRender.js"
import { EventDeleteRender } from "./EventDeleteRender.js"

const contentTarget = document.querySelector(".NewsRenderArea")
const formTarget = document.querySelector(".NewsFormArea")
const eventHub = document.querySelector(".container")

const render = (newsArray) => {
    contentTarget.innerHTML = NewsArray.map(event => {
        // Get HTML representation of product
        const html = EventComponent(event)

        return html
    }).join("")
}

const renderForm = () => {
    formTarget.innerHTML = ""
    formTarget.innerHTML = NewsForm()
}

const renderButton = () => {
    const buttonTarget = document.querySelector(".addNewsButton")
    buttonTarget.innerHTML = `
    <button id="addEventButton">Add event</button>
    `
}

export const EventList = () => {

    const News = useNews()
    const friends = useFriends()

    let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10)

    const usersNews = News.filter(
        event =>
            event.userId === currentUserId
    )

    let friendsNews = []
    friends.map(friend => {
        if (friend.friendInitiateId === currentUserId) {
            News.filter(
                event => {
                    if (event.userId === friend.user.id) {
                        friendsNews.push(event)
                    }
                }
            )
        }
    })

    const combinedArray = usersNews.concat(friendsNews)

    //Listens for click fo Save Event button
    eventHub.addEventListener("Newsaved", event => {
        if (event.detail.wasNewsaved === "yes") {
            const updatedNews = useNews()
            const updatedUsersNews = updatedNews.filter(
                event =>
                    event.userId === currentUserId
            )
        
            let updatedFriendsNews = []
            friends.map(friend => {
                if (friend.friendInitiateId === currentUserId) {
                    updatedNews.filter(
                        event => {
                            if (event.userId === friend.user.id) {
                                updatedFriendsNews.push(event)
                            }
                        }
                    )
                }
            })
        
            const updatedCombinedArray = updatedUsersNews.concat(updatedFriendsNews)
            render(updatedCombinedArray)
            renderForm()
            renderButton()
            EventEditRender(updatedCombinedArray)
            EventDeleteRender(updatedCombinedArray)
            const dialogTarget = document.querySelector(".eventDialog")
            dialogTarget.close()
        }
    })

    

        //saves edit message


    render(combinedArray)
    renderForm()
    EventEditRender(combinedArray)
    EventDeleteRender(combinedArray)
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
        const newEvent = {
            userId: parseInt(sessionStorage.getItem("activeUser"), 10),
            name: document.getElementById("eventTitleText").value,
            date: document.getElementById("eventDateTime").value,
            location: document.getElementById("eventLocationText").value
        }

        const message = new CustomEvent("Newsaved", {
            detail: {
                wasNewsaved: "yes"
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
    const allNews = useNews()
    const foundEvent = allNews.find(
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
      const editedEvent = {
          id: parseInt(eventId, 10),
          userId: parseInt(sessionStorage.getItem("activeUser"), 10),
          name: document.querySelector(`#eventName--${eventId}`).value,
          date: document.querySelector(`.eventDate--${eventId}`).textContent.split("Date: ")[1],
          location: document.querySelector(`#eventLocation--${eventId}`).value
        }
        editEvent(editedEvent)
            .then(() => {
                const updatedNews = useNews()
                render(updatedNews)
                EventEditRender(updatedNews)
                EventDeleteRender(updatedNews)
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
            const updatedNews = useNews()
            render(updatedNews)
            EventEditRender(updatedNews)
            EventDeleteRender(updatedNews)
            renderForm()
        })
    }
})