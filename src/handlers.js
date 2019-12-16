/* eslint-disable no-param-reassign */
import isURL from 'validator/es/lib/isURL';
import { validationStates, controlStates } from './constants';
import { addFeed, updateArticles } from './requests';

export const onInputHandler = (state) => (event) => {
  const { value } = event.target;
  if (!value) {
    state.validationState = validationStates.initial;
    state.controlState = controlStates.filling;
  } else {
    const hasDublicates = state.feeds.some((feed) => feed.link === value);
    const isValid = isURL(value) && !hasDublicates;
    state.validationState = isValid ? validationStates.valid : validationStates.invalid;
  }
};

export const onSubmitHandler = (state) => (event) => {
  event.preventDefault();
  if (state.validationState === validationStates.invalid) {
    return;
  }
  state.controlState = controlStates.processing;
  const formData = new FormData(event.target);
  const url = formData.get('url');
  state.currentURL = url;
  addFeed(state)
    .then(() => {
      state.controlState = controlStates.ending;
      state.validationState = validationStates.initial;
      state.currentURL = null;
    })
    .catch((error) => {
      state.controlState = controlStates.filling;
      state.validationState = validationStates.invalid;
      state.currentURL = null;
      throw error;
    });
  updateArticles(state);
};
