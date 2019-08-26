import { debounce } from 'underscore';
import getNewArticles from './articles';

const rootElement = document.querySelector('main');
export const articles = [];

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

async function displayBlog(articlesNumber) {
  let articlesList = '';

  try {
    const newArticles = await getNewArticles(articlesNumber);
    articles.push(...newArticles);
    for (let i = 0; i < articles.length; i += 1) {
      articlesList += mediaComponent(articles[i]);
    }
  } catch (error) {
    rootElement.innerHTML = `Something went wrong - ${error}`;
  }

  return articlesList;
}

export const getMoreArticles = debounce(() => {
  if (window.scrollY > document.body.offsetHeight - window.outerHeight) {
    const pageNumber = 1;
    let newPage = pageNumber + 1;
    displayBlog(newPage).then(page => {
      rootElement.insertAdjacentHTML('beforeend', page);
    });
  }
}, 200);

export default displayBlog();

// todo
// dodac try catch / domyslne wartosci / najpierw deklaracja potem wywolanie / paginacja
