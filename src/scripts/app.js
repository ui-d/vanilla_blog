import '@babel/polyfill';
import Navigo from 'navigo';
import blog from './modules/blog';
import article from './modules/article';
import { getMoreArticles } from './modules/blog'

const root = '';
const useHash = false;
const hash = '#';
const router = new Navigo(root, useHash, hash);

router
  .on({
    '': () => {
      blog.then(page => {
        document.querySelector('main').innerHTML = page;
        document.querySelector('main').addEventListener('click', e => {
          if (e.target && e.target.matches('h2[data-link]')) {
            const path = e.target.getAttribute('data-link');
            router.navigate(path);
          }
        });
        window.addEventListener('scroll', getMoreArticles);
      });
    },
    'article/:id': params => {
      window.removeEventListener('scroll', getMoreArticles);
      article(params.id).then(page => {
        document.querySelector('main').innerHTML = page;
      });
    },
    '*': () => {
      document.querySelector('main').innerHTML = 'You did something wrong...';
    },
  })
  .resolve();

export default router;
