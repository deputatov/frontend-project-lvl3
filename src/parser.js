export const parse = (data) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'application/xml');
  const documentElements = [...document.querySelectorAll('item')];

  const feed = {
    title: document.querySelector('title').textContent,
    description: document.querySelector('description').textContent,
  };

  const articles = documentElements.map((value) => ({
    link: value.querySelector('link').textContent,
    title: value.querySelector('title').textContent,
    description: value.querySelector('description').textContent,
  }));

  return { feed, articles };
};

export default parse;
