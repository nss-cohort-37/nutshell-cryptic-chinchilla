export const NewsDeleteRender = (news) => {
    news.map(article => {
      const contentTarget =  document.querySelector(`.deleteNewsButtonContainer--${article.id}`)
      if (article.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = ""
        contentTarget.innerHTML = `
        <button id="deleteNews--${article.id}">Delete Article</button>
        `
      }
    })
  }