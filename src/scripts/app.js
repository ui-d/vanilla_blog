import '@babel/polyfill';
import Navigo from 'navigo';
import article from './modules/article';
import blog, { getMoreArticles } from './modules/blog';

const root = '';
const useHash = false;
const hash = '#';
const router = new Navigo(root, useHash, hash);
const rootElement = document.querySelector('main');

function activateRouting(e) {
  window.scrollTo(0, 0);
  if (e.target && e.target.matches('h2[data-link]')) {
    const path = e.target.dataset.link;
    router.navigate(path);
  }
}

router
  .on({
    '': () => {
      rootElement.removeEventListener('click', activateRouting);
      blog.then(page => {
        rootElement.innerHTML = page;
        rootElement.addEventListener('click', activateRouting);
        window.addEventListener('scroll', getMoreArticles);
      });
    },
    'article/:id': params => {
      window.removeEventListener('scroll', getMoreArticles);
      article(params.id).then(page => {
        rootElement.innerHTML = page;
      });
    },
    '*': () => {
      window.scrollTo(0, 0);
      rootElement.innerHTML = 'You did something wrong...';
    },
  })
  .resolve();

export default router;
