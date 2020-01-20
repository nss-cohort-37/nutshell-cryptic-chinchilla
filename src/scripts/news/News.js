export const NewsComponent = news => {
  return `
    <section class="newsCard">
      <div class="newsCardInfo" id="newsTitleForm>Title: ${news.title}</div>
      <div class="newsCardInfo" id="newsSynopsisForm">Synopsis: ${news.synopsis}</div>
      <div class="newsCardInfo" id="newsURLForm">Link: ${news.url}</div>
      <div class="newsCardInfo" id="newsDateForm">Date: ${news.date}</div>
      <div class="editNewsButtonContainer--${news.id}"></div>
      <div class="deleteNewsButtonContainer--${news.id}"></div>
      <dialog  id="newsDetails--${news.id}" class="editNewsDialog">
        <label for="newsTitle--${news.id}">Article name:</label>
        <input type="text" id="newsTitle--${news.id}" value="${news.title}"></input>
        <label for="newsSynopsis--${news.id}">Article synopsis:</label>
        <input type="text" id="newsTitle--${news.id}" value="${news.synopsis}"></input>
        <label for="newsURL--${news.id}">
        <input type="text" id="newsURL--${news.id}" value="${news.url}"></input>
        <p id="newsDate--${news.id}">Date: ${news.date}</p>
        <button id="saveNewsEdit--${news.id}" class="button--close">Save Edit</button>
      </dialog>
    </section>
  `;
};