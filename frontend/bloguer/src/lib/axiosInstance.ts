import axios from 'axios';

const ssrAxiosInstance = axios.create({
  baseURL: 'http://backend:8000/api/',
  timeout: 1000,
})

const csrAxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
})

export { ssrAxiosInstance, csrAxiosInstance };