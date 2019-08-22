import getNewArticles from './articles';

function mediaComponent({ author, title, article, imageUrl, id }) {
  const paragraphRegex = /<(.|\n)*?>/g;
  const lead = article.replace(paragraphRegex, '').slice(0, 300);
  const titleNoDot = title.slice(0, -1);
  return `<article class="o-wrapper o-media">asfasdfasdf</article>`;
}

async function displayArticle() {
  const articles = await getNewArticles();
  let article = '';

  for (let i = 0; i < articles.length; i++) {
    articlesList += mediaComponent(articles[i]);
  }
  return article;
}

export default displayArticle();

// todo
// dodac try catch / domyslne wartosci / najpierw deklaracja potem wywolanie / paginacja
