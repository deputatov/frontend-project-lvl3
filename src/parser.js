export const parse = (data) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'application/xml');
  return document;
};

export const getFeed = (document) => {
  const feed = {
    title: document.querySelector('title').textContent,
    description: document.querySelector('description').textContent,
  };
  return feed;
};

export const getArticles = (document) => {
  const documentElements = [...document.querySelectorAll('item')];
  const articles = documentElements.map((value) => ({
    link: value.querySelector('link').textContent,
    title: value.querySelector('title').textContent,
    description: value.querySelector('description').textContent,
  }));
  return articles;
};
