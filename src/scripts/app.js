/*
  Project: feTest
  Author: Dawid Nawrocki
 */
import '@babel/polyfill';
import Navigo from 'navigo';
import getNewArticles from '../scripts/modules/articles';
import blog from './modules/blog';
import article from './modules/article';

const root = '';
const useHash = false;
const hash = '#';
const router = new Navigo(root, useHash, hash);

// router
//   .on(() => {
//     blog.then(x => {
//       document.querySelector('main').innerHTML = x;

//       let articleLinks = [...document.querySelectorAll('h2[data-link]')];

//       articleLinks.map(el => {
//         el.addEventListener('click', e => {
//           e.preventDefault();
//           let path = el.getAttribute('data-link');
//           router.navigate(path);
//           console.log("weszlo1")
//         });
//       });
//     });
//   })
//   .resolve();

// router
//   .on('article/:id', params => {
//     // blog.then(x => {
//       document.querySelector('main').innerHTML = params;
//     console.log("weszlo2")
//     // });
//   })
//   .resolve();

  router
  .on({
    '': () => {
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
    'article/:id': params => {

      article.then(x => {
        document.querySelector('main').innerHTML = x;
      })


      
    },
    '*': () => {
      console.log("asdf")
    }
  })
  .resolve();
