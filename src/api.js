import axios from 'axios';

const API_BASE_URL = 'https://todo-app-backend-a3nu.onrender.com'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
)

export default api;
