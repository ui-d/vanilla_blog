import API from './api';

function getNewArticles() {
  return API.get('/articles?_limit=11').then(response => response.data);
}

export default getNewArticles;
