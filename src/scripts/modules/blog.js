import { debounce } from 'underscore';
import getNewArticles from './articles';
const rootElement = document.querySelector('main');

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
    const articles = await getNewArticles(articlesNumber);

    for (let i = 0; i < articles.length; i++) {
      articlesList += mediaComponent(articles[i]);
    }
  } catch (error) {
    rootElement.innerHTML = `Something went wrong - ${error}`;
  }

  return articlesList;
}

const getMoreArticles = debounce(() => {
  if (window.scrollY + 1000 > document.body.offsetHeight - window.outerHeight) {
    let pageNumber = 1;
    let newPage = pageNumber++;
    displayBlog(newPage).then(page => {
      rootElement.insertAdjacentHTML('beforeend', page);
    });
  }
}, 200);

window.onscroll = () => {
  getMoreArticles();
};

export default displayBlog();

// todo
// dodac try catch / domyslne wartosci / najpierw deklaracja potem wywolanie / paginacja
