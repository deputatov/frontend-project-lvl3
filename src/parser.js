const parse = (state, data) => {
  const { currentURL } = state;
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'application/xml');
  const documentElements = [...document.querySelectorAll('item')];

  state.feeds.push({
    link: currentURL,
    title: document.querySelector('title').textContent,
    description: document.querySelector('description').textContent,
  });

  state.articles.push(...documentElements.map((value) => ({
    link: value.querySelector('link').textContent,
    title: value.querySelector('title').textContent,
    description: value.querySelector('description').textContent,
  })));
};

export default parse;
