let news = [];

export const useNews = () => news.slice();

export const getNews = () => {
  return fetch("http://localhost:3000/news")
    .then(res => res.json())
    .then(parsedNews => {
      news = parsedNews
        .slice()
        .sort(
          (currentNews, nextNews) =>
            Date.parse(currentNews.date) -
            Date.parse(nextNews.date)
        );
    });
};

export const saveNews = news => {
  return fetch("http://localhost:3000/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(news)
  }).then(getNews);
};

export const deleteNews = newsId => {
  return fetch(`http://localhost:3000/news/${newsId}`, {
    method: "DELETE"
  }).then(getNews);
};

export const editNews = news => {
  return fetch(`http://localhost:3000/news/${news.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(news)
  }).then(getNews);
};
