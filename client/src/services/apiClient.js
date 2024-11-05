import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
console.log(baseURL);

// JSON API client
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// FormData API client
const authApiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: false,
});

// Interceptors for adding the token dynamically
const attachTokenInterceptor = (client) => {
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

// Attach interceptors to both clients
attachTokenInterceptor(apiClient);
attachTokenInterceptor(authApiClient);

export { apiClient, authApiClient };
