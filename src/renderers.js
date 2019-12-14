/* eslint-disable no-param-reassign */
export const validationStateRender = (state, rssInput, subscribeButton) => () => {
  switch (state.validationState) {
    case 'initial':
      rssInput.classList.remove('is-invalid', 'is-valid');
      subscribeButton.classList.add('disabled');
      break;
    case 'valid':
      rssInput.classList.remove('is-invalid');
      rssInput.classList.add('is-valid');
      subscribeButton.classList.remove('disabled');
      break;
    case 'invalid':
      rssInput.classList.remove('is-valid');
      rssInput.classList.add('is-invalid');
      subscribeButton.classList.add('disabled');
      break;
    default:
      break;
  }
};

export const controlStateRender = (state, rssInput, rssInputForm) => () => {
  switch (state.controlState) {
    case 'filling':
      rssInputForm.disabled = false;
      rssInput.value = '';
      break;
    case 'processing':
      rssInputForm.disabled = true;
      break;
    case 'ending':
      rssInputForm.disabled = false;
      rssInput.value = '';
      break;
    default:
      break;
  }
};

export const displayFeeds = (state, rssFeeds) => () => {
  if (state.feeds.length !== 0) {
    const feedsTemplate = state
      .feeds
      .map((value) => `<li class="list-group-item"><h5 class="mb-2">${value.title}</h5><h6>${value.description}</h6></li>`)
      .join('');
    rssFeeds.innerHTML = `<ul class="list-group">${feedsTemplate}</ul>`;
  }
};

export const displayArticles = (state, rssArticles) => () => {
  if (state.articles.length !== 0) {
    const articlesTemplate = state
      .articles
      .map((value) => `<li class="list-group-item d-flex align-items-center">
        <a href="${value.link}" class="card-link">${value.title}</a>
        <button type="button" class="btn btn-primary ml-4" data-toggle="modal" data-target="#exampleModal" data-whatever="${value.description}">View</button>
        </li>`)
      .join('');
    rssArticles.innerHTML = `<ul class="list-group">${articlesTemplate}</ul>`;
  }
};
