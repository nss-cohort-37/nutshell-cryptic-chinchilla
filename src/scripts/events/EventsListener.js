import { EventList } from "./EventList.js"

const eventHub = document.querySelector('.container')

export const EventsEventListener = () => {
    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "button--logIn") {
            EventList()
        }
    })
}
