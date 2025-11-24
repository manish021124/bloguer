import axios from 'axios';

const ssrAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
})

const csrAxiosInstance = axios.create({
  baseURL: process.env.SSR_API_URL || process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
})

export { ssrAxiosInstance, csrAxiosInstance };