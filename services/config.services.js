import axios from "axios";

const service = axios.create({
  baseURL: process.env.BASE_URL,
});

service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken")

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
 
  return config;
});

export default service;
