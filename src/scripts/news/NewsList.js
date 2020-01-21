import { useNews, saveNews, editNews, deleteNews } from "./NewsProvider.js"
import { useFriends } from "../friends/FriendsProvider.js"
import { NewsComponent } from "./News.js"
import { NewsForm } from "./NewsForm.js"
import { NewsEditRender } from "./NewsEditRender.js"
import { NewsDeleteRender } from "./NewsDeleteRender.js"

const contentTarget = document.querySelector(".newsRenderArea")
const formTarget = document.querySelector(".newsFormArea")
const eventHub = document.querySelector(".container")

const render = (newsArray) => {
    contentTarget.innerHTML = newsArray.map(article => {
        // Get HTML representation of product
        const html = NewsComponent(article)

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
    <button id="addNewsButton">Add article</button>
    `
}

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

    //Listens for click fo Save News button
    eventHub.addEventListener("newsSaved", event => {
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
            updatedCombinedArray.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            })
            render(updatedCombinedArray)
            renderForm()
            renderButton()
            NewsEditRender(updatedCombinedArray)
            NewsDeleteRender(updatedCombinedArray)
            const dialogTarget = document.querySelector(".newsDialog")
            dialogTarget.close()
        }
    })
    combinedArray.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    })
    render(combinedArray)
    renderForm()
    NewsEditRender(combinedArray)
    NewsDeleteRender(combinedArray)
    renderButton()
}

// Listens for click of Add Article button
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "addNewsButton") {
    const dialogTarget = document.querySelector(".newsDialog")
    dialogTarget.showModal()
    }
})

// Listens for click of Save Article button
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "closeNewsDialog") {
        const newArticle = {
            userId: parseInt(sessionStorage.getItem("activeUser"), 10),
            url: document.getElementById("newsURLText").value,
            title: document.getElementById("newsTitleText").value,
            synopsis: document.getElementById("newsSynopsisText").value,
            date: document.getElementById("newsDateText").value
        }

        const message = new CustomEvent("newsSaved", {
            detail: {
                wasNewsaved: "yes"
            }
        })

        saveNews(newArticle)
            .then(() => {
                eventHub.dispatchEvent(message)
            })
    }
})

//Listens for click of Edit Article button
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("editNews--")) {
    const [prefix, id] = event.target.id.split("--")
    const editEvent = new CustomEvent("editNewsButtonClicked", {
        detail: {
        newsId: id
        }
    })
    eventHub.dispatchEvent(editEvent)
    }
})

//Listens for click of Edit Article button
eventHub.addEventListener("editNewsButtonClicked", event => {
    const newsToEdit = event.detail.newsId
    const allNews = useNews()
    const foundNews = allNews.find(
        (currentArticle) => {
            return currentArticle.id === parseInt(newsToEdit, 10)
        }
    )
    document.querySelector(`#newsTitle--${newsToEdit}`).value = foundNews.title
    document.querySelector(`#newsSynopsis--${newsToEdit}`).value = foundNews.synopsis
    document.querySelector(`#newsURL--${newsToEdit}`).value = foundNews.url
    const theDialog = document.querySelector(`#newsDetails--${foundNews.id}`)
    theDialog.showModal()     
})


// Listens for click of Save Edit button
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("saveNewsEdit")) {
      const [prefix, newsId] = clickEvent.target.id.split("--")
      const editedNews = {
          id: parseInt(newsId, 10),
          userId: parseInt(sessionStorage.getItem("activeUser"), 10),
          title: document.querySelector(`#newsTitle--${newsId}`).value,
          synopsis: document.querySelector(`#newsSynopsis--${newsId}`).value,
          url: document.querySelector(`#newsURL--${newsId}`).value,
          date: document.querySelector(`#newsDate--${newsId}`).textContent.split("Date: ")[1]
        }
        editNews(editedNews)
            .then(() => {
                const updatedNews = useNews()
                updatedNews.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                })
                render(updatedNews)
                NewsEditRender(updatedNews)
                NewsDeleteRender(updatedNews)
                renderForm()
            })
    }
})

//Listens for click of Delete Article button
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteNews--")) {
    let [prefix, newsId] = event.target.id.split("--")
    newsId = parseInt(newsId, 10)
    deleteNews(newsId)
        .then(() => {
            const updatedNews = useNews()
            updatedNews.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            })
            render(updatedNews)
            NewsEditRender(updatedNews)
            NewsDeleteRender(updatedNews)
            renderForm()
        })
    }
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("xOutNewsDialog")) {
        const dialogTarget = document.querySelector(".newsDialog")
        dialogTarget.close()
    }
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("xOutNewsEditDialog")) {
        let [prefix, newsId] = event.target.id.split("--")
        const dialogTarget = document.querySelector(`#newsDetails--${newsId}`)
        dialogTarget.close()
    }
})