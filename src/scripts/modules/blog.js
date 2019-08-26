import { debounce } from 'underscore';
import getNewArticles from './articles';

const rootElement = document.querySelector('main');
export const articles = [];
let pageNumber = 1;

function mediaComponent({ author, title, article, imageUrl, id }) {
  const paragraphRegex = /<(.|\n)*?>/g;
  const lead = article.replace(paragraphRegex, '').slice(0, 300);
  const titleNoDot = title.slice(0, -1);
  return `<article class="o-media">
            <div class="o-media__img">
              <img src="${imageUrl}">
            </div>
            <div class="o-media__body">
              <h4>${author}</h4>
              <h2 data-link="article/${id}">${titleNoDot}</h2>
              <p>${lead}</p>
            </div>
          </article>`;
}

async function displayBlog(page) {
  let articlesList = '';

  try {
    const newArticles = await getNewArticles(page);
    articles.push(...newArticles);
    for (let i = 0; i < newArticles.length; i += 1) {
      articlesList += mediaComponent(newArticles[i]);
    }
  } catch (error) {
    rootElement.innerHTML = `Something went wrong - ${error}`;
  }

  return articlesList;
}

export const getMoreArticles = debounce(() => {
  pageNumber += 1;
  if (window.scrollY > document.body.offsetHeight - window.outerHeight) {
    displayBlog(pageNumber).then(page => {
      rootElement.insertAdjacentHTML('beforeend', page);
    });
  }
}, 200);

export default displayBlog();
