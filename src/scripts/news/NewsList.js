import { useNews, saveNews } from "./NewsProvider.js"
import { useFriends } from "../events/FriendsProvider.js"
import { NewsComponent } from "./News.js"
import { NewsForm } from "./NewsForm.js"
import { NewsEditRender } from "./NewsEditRender.js"

const contentTarget = document.querySelector(".newsRenderArea")
const formTarget = document.querySelector(".newsFormArea")
const eventHub = document.querySelector(".container")

export const NewsList = () => {

    const news = useNews()
    const friends = useFriends()

    let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10)

    const usersNews = news.filter(
        article =>
            article.userId === currentUserId
    )

    let friendsNews = []
    friends.map(friend => {
        if (friend.friendInitiateId === currentUserId) {
            news.filter(
                article => {
                    if (article.userId === friend.user.id) {
                        friendsNews.push(article)
                    }
                }
            )
        }
    })

    const combinedArray = usersNews.concat(friendsNews)

    const render = (newsArray) => {
        contentTarget.innerHTML = newsArray.map(article => {
            // Get HTML representation of product
            const html = NewsComponent(article)

            return html
        }).join("")
    }

    const renderForm = () => {
        formTarget.innerHTML = NewsForm()
    }

    eventHub.addEventListener("click", clickEvent => {
        if(clickEvent.target.id === "addNewsButton") {
        const dialogTarget = document.querySelector(".newsDialog")
        dialogTarget.showModal()
        }
    })

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "closeNewsDialog") {
            const newArticle = {
                userId: currentUserId,
                url: document.getElementById("newsURLText").value,
                title: document.getElementById("newsTitleText").value,
                synopsis: document.getElementById("newsSynopsisText").value,
                date: document.getElementById("newsDateText").value
            }

            const message = new CustomEvent("articleSaved", {
                detail: {
                    wasArticleSaved: "yes"
                }
            })

            saveNews(newArticle)
                .then(() => {
                    eventHub.dispatchEvent(message)
                })
        }
    })

    render(combinedArray)
    renderForm()

    const renderButton = () => {
        const buttonTarget = document.querySelector(".addNewsButton")
        buttonTarget.innerHTML = `
        <button id="addNewsButton">Add article</button>
        `
    }
    
    renderButton()
    NewsEditRender(combinedArray)

    eventHub.addEventListener("articleSaved", event => {
        if (event.detail.wasArticleSaved === "yes") {
            const updatedNews = useNews()
            const updatedUsersNews = updatedNews.filter(
                event =>
                    event.userId === currentUserId
            )
        
            let updatedFriendsEvents = []
            friends.map(friend => {
                if (friend.friendInitiateId === currentUserId) {
                    updatedUsersNews.filter(
                        article => {
                            if (article.userId === friend.user.id) {
                                updatedFriendsEvents.push(event)
                            }
                        }
                    )
                }
            })
        
            const updatedCombinedArray = updatedUsersNews.concat(updatedFriendsEvents)
            render(updatedCombinedArray)
            renderButton()
            const dialogTarget = document.querySelector(".newsDialog")
            dialogTarget.close()
        }
    })
}