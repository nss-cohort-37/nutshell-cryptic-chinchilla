export const NewsComponent = news => {
  return `
    <section class="newsCard">
      <div class="newsCardInfo" id="newsTitleForm">Title: ${news.title}</div>
      <div class="newsCardInfo" id="newsSynopsisForm">Synopsis: ${news.synopsis}</div>
      <div class="newsCardInfo" id="newsURLForm">
        <a href="${news.url}">${news.url}</a>
      </div>
      <div class="newsCardInfo" id="newsDateForm">Date: ${news.date}</div>
      <div class="editNewsButtonContainer--${news.id}"></div>
      <div class="deleteNewsButtonContainer--${news.id}"></div>
      <dialog  id="newsDetails--${news.id}" class="editNewsDialog">
        <button id="xOutNewsEditDialog--${news.id}">&times</button>
        <label for="newsTitle--${news.id}">Article name:</label>
        <input type="text" id="newsTitle--${news.id}" value="${news.title}"></input>
        <label for="newsSynopsis--${news.id}">Article synopsis:</label>
        <input type="text" id="newsSynopsis--${news.id}" value="${news.synopsis}"></input>
        <label for="newsURL--${news.id}">
        <input type="text" id="newsURL--${news.id}" value="${news.url}"></input>
        <button id="saveNewsEdit--${news.id}" class="button--close btn btn-primary">Save Edit</button>
      </dialog>
    </section>
  `;
};