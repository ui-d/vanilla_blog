import getNewArticles from './articles';

function mediaComponent({ author, title, article, imageUrl }) {
  const lead = article.slice(0, 110);
  return `<article class="o-media"><div class="o-media__img"><img src="${imageUrl}"></div><div class="o-media__body"><h4>${author}</h4><h2>${title}</h2><p>${lead}</p></div></article>`;
}

async function displayBlog() {
  const articles = await getNewArticles();
  let articlesList = '';

  for (let i = 0; i < articles.length; i++) {
    articlesList += mediaComponent(articles[i]);
  }

  const appElement = document.querySelector('.c-app');
  appElement.insertAdjacentHTML('beforebegin', articlesList);
}

export default displayBlog;

// todo
// dodac try catch / domyslne wartosci / najpierw deklaracja potem wywolanie / paginacja
