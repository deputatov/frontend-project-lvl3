import axios from 'axios';
import { parse, parseArticles } from './parser';
import { proxy, delay } from './constants';

export const makeRequest = (state) => axios
  .get(`${proxy}${state.currentURL}`)
  .then(({ data }) => {
    const { feed, articles } = parse(state.currentURL, data);
    state.feeds.push(feed);
    state.articles.push(...articles);
  });

export const makeFeedsRequests = (state) => {
  const promises = state.feeds.map((value) => axios.get(`${proxy}${value.link}`));
  Promise.all(promises)
    .then((contents) => {
      contents.forEach(({ data }) => {
        state.articles.unshift(...parseArticles(data));
      });
    })
    .finally(() => setTimeout(() => makeFeedsRequests(state), delay));
};

export default makeRequest;
