import dayjs from 'dayjs';
import getNewArticles from './articles';

function mediaComponent({ author, title, article, imageUrl, id, date }) {
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

async function displayArticle() {
  const articles = await getNewArticles();
  let article = mediaComponent(articles[0]);
  // for (let i = 0; i < articles.length; i++) {
  //   article += mediaComponent(articles[i]);
  // }
  return article;
}

export default displayArticle();

// todo
// dodac try catch / domyslne wartosci / najpierw deklaracja potem wywolanie / paginacja
