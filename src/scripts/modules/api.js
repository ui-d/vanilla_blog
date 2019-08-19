import axios from 'axios';
import config from './config';

const API = config.development.API_URL;

export default axios.create({
  baseURL: API,
  timeout: 10000,
});
