import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://127.0.0.1:8000',
  timeout: 1000,
});

export default axiosInstance;