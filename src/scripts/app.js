/*
  Project: feTest
  Author: Dawid Nawrocki
 */
import '@babel/polyfill';
import Navigo from 'navigo';
import blog from './modules/blog';
import article from './modules/article';

const root = '';
const useHash = false;
const hash = '#';
const router = new Navigo(root, useHash, hash);

router
  .on({
    'article/:id': () => {
      blog.then(x => {
        document.querySelector('main').innerHTML = x;

        let articleLinks = [...document.querySelectorAll('h2[data-link]')];

        articleLinks.map(el => {
          el.addEventListener('click', e => {
            e.preventDefault();
            let path = el.getAttribute('data-link');
            router.navigate(path);
          });
        });
      });
    },
    '': params => {
      article.then(x => {
        document.querySelector('main').innerHTML = x;
      });
    },
    '*': () => {
      console.log('asdf');
    },
  })
  .resolve();
