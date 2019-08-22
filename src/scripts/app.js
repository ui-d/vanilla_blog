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
    '': () => {
      blog.then(page => {
        document.querySelector('main').innerHTML = page;

        const articleLinks = [...document.querySelectorAll('h2[data-link]')];

        articleLinks.map(el => {
          el.addEventListener('click', e => {
            e.preventDefault();
            let path = el.getAttribute('data-link');
            router.navigate(path);
          });
        });
      });
    },
    'article/:id': params => {
      article(params.id).then(page => {
        document.querySelector('main').innerHTML = page;
      });
    },
    '*': () => {
      document.querySelector('main').innerHTML = 'You did something wrong...';
    },
  })
  .resolve();
