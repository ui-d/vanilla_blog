import getNewArticles from './articles';

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

async function displayBlog() {
  const articles = await getNewArticles();
  let articlesList = '';

  for (let i = 0; i < articles.length; i++) {
    articlesList += mediaComponent(articles[i]);
  }

  return articlesList;
}

export default displayBlog();

// todo
// dodac try catch / domyslne wartosci / najpierw deklaracja potem wywolanie / paginacja
