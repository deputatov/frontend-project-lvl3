import find from 'lodash/find';
import isURL from 'validator/es/lib/isURL';
import { validationStates, controlStates } from './constants';
import { makeRequest, makeFeedsRequests } from './requests';

export const onInputHandler = (state) => (event) => {
  const { value } = event.target;
  if (!value) {
    state.validationState = validationStates.initial;
    state.controlState = controlStates.filling;
  } else {
    const hasDublicates = find(state.feeds, { link: value });
    const isValid = isURL(value) && !hasDublicates;
    state.currentURL = isValid ? value : null;
    state.validationState = isValid ? validationStates.valid : validationStates.invalid;
  }
};

export const onSubscribeHandler = (state) => () => {
  if (state.validationState === validationStates.valid) {
    state.controlState = controlStates.processing;
    makeRequest(state)
      .then(() => {
        state.controlState = controlStates.ending;
        state.validationState = validationStates.initial;
        state.currentURL = null;
      })
      .catch((error) => {
        state.currentURL = null;
        state.validationState = validationStates.invalid;
        throw error;
      });
    makeFeedsRequests(state);
  }
};
