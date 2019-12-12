export const parse = (data, onlyArticles = false) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'application/xml');
  const documentElements = [...document.querySelectorAll('item')];

  const getFeed = () => ({
    title: document.querySelector('title').textContent,
    description: document.querySelector('description').textContent,
  });

  const getArticles = () => documentElements.map((value) => ({
    link: value.querySelector('link').textContent,
    title: value.querySelector('title').textContent,
    description: value.querySelector('description').textContent,
  }));

  return onlyArticles ? { articles: getArticles() } : { feed: getFeed(), articles: getArticles() };
};

export default parse;
