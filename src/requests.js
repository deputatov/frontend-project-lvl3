import axios from 'axios';
import parse from './parser';
import { proxy, delay } from './constants';

export const makeRequest = (state) => axios
  .get(`${proxy}${state.currentURL}`)
  .then(({ data }) => {
    const { feed, articles } = parse(state.currentURL, data);
    state.feeds.push(feed);
    state.articles.push(...articles);
  });

export const makeFeedsRequests = (state) => {
  const promise = state.feeds.map((value) => axios.get(`${proxy}${value.link}`));

  Promise.all(promise)
    .then(({ data }) => {
      const { articles } = parse(state, data);
      state.articles.unshift(...articles);
    })
    .finally(() => setTimeout(() => makeFeedsRequests(state), delay));
};

export default makeRequest;
