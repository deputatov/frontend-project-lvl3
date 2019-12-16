import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import { onInputHandler, onSubmitHandler } from './handlers';
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
  rssInputForm.addEventListener('submit', onSubmitHandler(state));

  $('#exampleModal').on('show.bs.modal', function append(evt) {
    const button = $(evt.relatedTarget);
    const recipient = button.data('whatever');
    const modal = $(this);
    modal.find('#description').text(recipient);
  });
};

export default runApplication;
