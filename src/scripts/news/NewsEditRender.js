export const NewsEditRender = (news) => {
    debugger
    news.map(article => {
      const contentTarget =  document.querySelector(`.editButtonContainer--${article.id}`)
      if (article.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = `
        <button id="editEvent--${news.id}">Edit Article</button>
        `
      }
    })
  }
  