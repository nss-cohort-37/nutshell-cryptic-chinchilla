import { useEvents } from "./EventProvider.js"
import { useUsers } from "../users/UsersProvider.js"
import { EventComponent } from "./Event.js"

const contentTarget = document.querySelector(".eventsContainer")

export const EventList = () => {
    const events = useEvents()
    const users = useUsers()

    const usersEvents = events.filter(
        event =>
            event.userId === parseInt(sessionStorage.getItem("activeUser"), 10)
    )

    let friendsEvents = []
    users.map(user => {
        user.friends.map(friend => {
            events.filter(
                event => {
                    if (event.userId === friend.friendInitiateId) {
                        friendsEvents.push(event)
                    }
                }
            )
        })
    })

    const combinedArray = usersEvents.concat(friendsEvents)
    console.log(combinedArray)
    debugger

    const render = () => {
        contentTarget.innerHTML = usersEvents.map(event => {
            // Get HTML representation of product
            const html = EventComponent(event)

            return html
        }).join("")
    }

    render()
}