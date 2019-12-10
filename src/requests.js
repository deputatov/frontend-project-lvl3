import axios from 'axios';
import parse from './parser';
import { proxy, delay } from './constants';

export const makeRequest = (state) => axios.get(`${proxy}${state.currentURL}`).then(({ data }) => parse(state, data));

// export const makeFeedsRequests = (state) => {
// };

// makeRequest(state.currentURL)
// .then(() => {
//   state.constrolState = controlStates.ending;
//   state.currentURL = null;
// })
// .catch((error) => {
//   state.controlState = controlStates.filling;
//   state.validationState = validationStates.invalid;
//   state.currentURL = null;
//   throw error;
// });

export default makeRequest;
