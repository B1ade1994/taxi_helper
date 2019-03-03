import axios from 'axios';
import { store } from 'src/store';
import { logoutConstants } from 'src/constants';

const Qs = require('qs');

const API_ROOT = '/api/v1';
const jwt = localStorage.getItem('jwt');

const api = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: jwt,
  },
});
api.interceptors.response.use(
  res => res,
  (err) => {
    console.log(3333);
    console.log(err);
    console.log(4444);

    // ошибка аутентификации
    if (err.response.status === 401) {
      setAuthToken(false);
      store.dispatch({ type: logoutConstants.LOGOUT_SUCCESS });
    }
    // ошибка авторизации
    if (err.response.status === 500) {
      alert('Ошибка доступа');
    }

    return Promise.reject(err);
  },
);
api.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => {
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    });
  };

  return config;
});

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('jwt', token);
    api.defaults.headers.Authorization = token;
  } else {
    localStorage.removeItem('jwt');
    delete api.defaults.headers.Authorization;
  }
};

export { api, setAuthToken };
