// axios.js

import axios from "axios";

const baseURL = process.env.BASE_URL || 'http://localhost:5145/api/v1';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // You can adjust the timeout (in milliseconds) according to your needs
  headers: {
    "Content-Type": "application/json",
    // You can add custom headers here if needed
  },
});

// Interceptors
axiosInstance.interceptors.request.use((config) => {
  // Modify the request config before sending it
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
