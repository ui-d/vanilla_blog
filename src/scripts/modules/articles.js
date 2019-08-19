import API from './api';

function getNewArticles() {
 return API.get('/articles').then(response => response.data);
}

export default getNewArticles;
