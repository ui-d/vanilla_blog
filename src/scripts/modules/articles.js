import API from './api';

function getNewArticles(pageNumber = 1) {
  return API.get(`/articles?_page=${pageNumber}`).then(
    response => response.data,
  );
}

export default getNewArticles;
