import axios from 'axios';
import { store } from 'src/store';
import { loginConstants } from 'src/constants';

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
    if (err.response.status === 401) {
      setAuthToken(false);
      store.dispatch({ type: loginConstants.LOGOUT });
    }

    return Promise.reject(err);
  },
);

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
