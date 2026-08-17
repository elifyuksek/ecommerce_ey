import axios from 'axios';


export const API = axios.create({
  baseURL: "https://ecommerce-backend-l37z.onrender.com",
            
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token; 
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);