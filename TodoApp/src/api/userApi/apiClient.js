import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://4ddffbe556e5.ngrok-free.app/user",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
