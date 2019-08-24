import dayjs from 'dayjs';
import { articles } from './blog';

function mediaComponent({ author, title, article, imageUrl, date }) {
  const titleNoDot = title.slice(0, -1);
  const dateOfPublication = date.split('T')[0];
  const dateInProperFormat = dayjs(dateOfPublication).format('MMMM D, YYYY');

  return `<article class="o-wrapper c-article">
            <div class="c-article__header">
              <div class="c-article__img"><img src="${imageUrl}"></div>
              <div class="c-article__headings">
                <h5>${dateInProperFormat}</h5>
                <h4>${author}</h4>
                <h2>${titleNoDot}</h2>
              </div>
            </div>
            <div class="c-article__content">${article}</div>
          </article>`;
}

async function displayArticle(params) {
  let article = '';
  try {
    article = articles.filter(art => art.id === params);
  } catch (error) {
    document.querySelector(
      'main',
    ).innerHTML = `Something went wrong - ${error}`;
  }
  return mediaComponent(article[0]);
}

export default displayArticle;

// todo
// dodac try catch / domyslne wartosci / najpierw deklaracja potem wywolanie / paginacja
