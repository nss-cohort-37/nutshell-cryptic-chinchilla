export const NewsEditRender = (news) => {
    news.map(article => {
      const contentTarget =  document.querySelector(`.editNewsButtonContainer--${article.id}`)
      if (article.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = ""
        contentTarget.innerHTML = `
        <button id="editNews--${article.id}">Edit Article</button>
        `
      }
    })
  }
  