import axios from 'axios';
import { parse, getFeed, getArticles } from './parser';
import { proxy, delay } from './constants';

export const addFeed = (state) => axios
  .get(`${proxy}${state.currentURL}`)
  .then(({ data }) => {
    const document = parse(data);
    const feed = getFeed(document);
    const articles = getArticles(document);
    feed.link = state.currentURL;
    state.feeds.push(feed);
    state.articles.push(...articles);
  });


export const updateArticles = (state) => {
  const promises = state.feeds.map((value) => axios.get(`${proxy}${value.link}`));
  Promise.all(promises)
    .then((contents) => {
      contents.forEach(({ data }) => {
        const document = parse(data);
        const articles = getArticles(document);
        const oldArticles = state.articles;
        const newArticles = articles
          .filter((newArticle) => !oldArticles
            .some((oldArticle) => oldArticle.link === newArticle.link));
        state.articles.unshift(...newArticles);
      });
    })
    .finally(() => setTimeout(() => updateArticles(state), delay));
};
