import { watch } from 'melanke-watchjs';
import { onInputHandler, onSubscribeHandler } from './handlers';
import {
  validationStateRender,
  controlStateRender,
  displayFeeds,
  displayArticles,
} from './renderers';
import { validationStates, controlStates } from './constants';

const runApplication = () => {
  const state = {
    controlState: controlStates.filling,
    validationState: validationStates.initial,
    currentURL: null,
    feeds: [],
    articles: [],
    errors: [],
  };

  const rssInputForm = document.querySelector('#rss-input-form');
  const rssInput = document.querySelector('#rss-input');
  const subscribeButton = document.querySelector('#rss-subscribe');
  const rssFeeds = document.querySelector('#rss-feeds');
  const rssArticles = document.querySelector('#rss-articles');

  watch(state, 'validationState', validationStateRender(state, rssInput, subscribeButton));
  watch(state, 'controlState', controlStateRender(state, rssInput, rssInputForm));
  watch(state, 'feeds', displayFeeds(state, rssFeeds));
  watch(state, 'articles', displayArticles(state, rssArticles));

  rssInput.addEventListener('input', onInputHandler(state));
  subscribeButton.addEventListener('click', onSubscribeHandler(state));
};

export default runApplication;
