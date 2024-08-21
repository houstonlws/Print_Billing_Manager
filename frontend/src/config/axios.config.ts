import _axios from 'axios';

const axios = _axios.create();

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) config.headers['Authorization'] = accessToken;
    return config;
  },
  (err: any) => Promise.reject(err.message)
);

export const getAxios = () => {
  return axios;
};
