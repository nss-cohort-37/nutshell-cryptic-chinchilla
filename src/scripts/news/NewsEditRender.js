export const NewsEditRender = (news) => {
    news.map(article => {
      const contentTarget =  document.querySelector(`.editButtonContainer--${article.id}`)
      if (article.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = `
        <button id="editNews--${news.id}">Edit Article</button>
        `
      }
    })
  }
  