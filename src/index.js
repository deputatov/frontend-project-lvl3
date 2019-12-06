import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.scss';
import axios from 'axios';
import isURL from 'validator/es/lib/isURL';
import { watch } from 'melanke-watchjs';

const proxy = 'https://cors-anywhere.herokuapp.com/';

const app = () => {
  const state = {
    // addingStream: {
    //   state: 'filling', // filling, processing, ending
    //   validationState: 'invalid',
    //   url: null,
    //   feeds: [],
    //   articles: [],
    //   errors: [],
    // },
    rss: 'empty',
    validationState: 'invalid',
    url: '',
    feeds: [],
    articles: [],
  };

  const rssInput = document.querySelector('#rss-input');
  const subscribeButton = document.querySelector('#rss-subscribe');
  const rssFeeds = document.querySelector('#rss-feeds');
  const rssArticles = document.querySelector('#rss-articles');

  watch(state, 'rss', () => {
    switch (state.rss) {
      case 'empty':
        rssInput.classList.remove('is-valid', 'is-invalid');
        subscribeButton.classList.add('disabled');
        rssInput.value = '';
        break;
      case 'valid':
        rssInput.classList.add('is-valid');
        rssInput.classList.remove('is-invalid');
        subscribeButton.classList.remove('disabled');
        break;
      case 'invalid':
        rssInput.classList.add('is-invalid');
        rssInput.classList.remove('is-valid');
        subscribeButton.classList.add('disabled');
        break;
      case 'added':
        rssInput.classList.remove('is-valid');
        subscribeButton.classList.add('disabled');
        rssInput.value = '';
        break;
      default:
        break;
    }
  });

  watch(state, 'feeds', () => {
    console.dir(state.feeds);
    const feedsTemplate = state
      .feeds
      .map((value) => `<li class="list-group-item"><h5 class="mb-2">${value.title}</h5><h6>${value.description}</h6></li>`)
      .join('');
    rssFeeds.innerHTML = `<ul class="list-group">${feedsTemplate}</ul>`;
  });

  watch(state, 'articles', () => {
    const articlesTemplate = state
      .articles
      .map((value) => `<li class="list-group-item"><a href="${value.link}" class="card-link">${value.title}</a></li>`)
      .join('');
    rssArticles.innerHTML = `<ul class="list-group">${articlesTemplate}</ul>`;
  });

  const parseData = (data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');
    const items = doc.querySelectorAll('item');

    const articles = [...items].map((value) => ({
      link: value.querySelector('link').textContent,
      title: value.querySelector('title').textContent,
    }));

    const feed = {
      link: state.url,
      title: doc.querySelector('title').textContent,
      description: doc.querySelector('description').textContent,
    };

    state.feeds.push(feed);
    state.articles.push(...articles);
  };

  rssInput.addEventListener('input', (event) => {
    if (event.target.value === '') {
      state.rss = 'filling';
    } else if (isURL(event.target.value)
      && !state.feeds.some((elem) => elem.link === event.target.value)) {
      state.url = event.target.value;
      state.rss = 'valid';
    } else {
      state.rss = 'invalid';
    }
  });

  subscribeButton.addEventListener('click', () => {
    axios.get(`${proxy}${state.url}`)
      .then((response) => {
        parseData(response.data);
        state.rss = 'added';
        state.url = '';
      })
      .catch((error) => {
        alert(error);
      });
  });
};

app();
