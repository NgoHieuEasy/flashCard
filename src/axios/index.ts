import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ACCESS_TOKEN, LOGOUT_REQUIRED } from "@/utils/constants";

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_DOMAIN,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return Promise.reject({
        message: "JWT expired",
        code: 401,
        action: LOGOUT_REQUIRED,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
