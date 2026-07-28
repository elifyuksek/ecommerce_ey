import axios from 'axios';


export const API = axios.create({
  baseURL: 'https://ecommerce-ey-backend.onrender.com',
});

// Her istek öncesi güncel token'ı localStorage'dan okuyup header'a ekler
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token; // Bearer prefix'i yok!
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);