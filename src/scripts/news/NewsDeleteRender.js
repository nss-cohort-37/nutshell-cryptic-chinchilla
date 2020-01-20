export const NewsDeleteRender = (news) => {
    news.map(article => {
      const contentTarget =  document.querySelector(`.deleteNewsButtonContainer--${event.id}`)
      if (article.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = ""
        contentTarget.innerHTML = `
        <button id="deleteNews--${event.id}">Delete News</button>
        `
      }
    })
  }