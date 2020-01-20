export const NewsComponent = news => {
  return `
    <section class="newsCard">
      <div class="newsCardInfo">Link: ${news.url}</div>
      <div class="newsCardInfo">Title: ${news.title}</div>
      <div class="newsCardInfo">Synopsis: ${news.synopsis}</div>
      <div class="newsCardInfo">Date: ${news.date}</div>
      <div class="editButtonContainer--${news.id}"></div>
    </section>
  `;
};