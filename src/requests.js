import axios from 'axios';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import { parse } from './parser';
import { proxy, delay } from './constants';

export const addFeed = (state) => axios
  .get(`${proxy}${state.currentURL}`)
  .then(({ data }) => {
    const { feed, articles } = parse(data);
    feed.link = state.currentURL;
    state.feeds.push(feed);
    state.articles.push(...articles);
  });


export const updateArticles = (state) => {
  const promises = state.feeds.map((value) => axios.get(`${proxy}${value.link}`));
  Promise.all(promises)
    .then((contents) => {
      contents.forEach(({ data }) => {
        const { articles } = parse(data);
        const oldArticles = state.articles;
        const newArticles = differenceWith(articles, oldArticles, isEqual);
        state.articles.unshift(...newArticles);
      });
    })
    .finally(() => setTimeout(() => updateArticles(state), delay));
};
