import { NewsList } from "./NewsList.js"

const eventHub = document.querySelector('.container')

export const NewsListener = () => {
    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "button--logIn") {
            NewsList()
        }
    })
}
