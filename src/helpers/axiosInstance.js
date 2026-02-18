import axios from "axios";
import { getCookie } from "cookies-next";

const urlApi = import.meta.env.VITE_API_URL || "https://back.applyons.com/api/";

// Créer une instance d'Axios
const axiosInstance = axios.create({
  baseURL: urlApi,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const tokenCookie = getCookie("__APPLYONS_REACT_AUTH__TOKEN");
      if (tokenCookie) {
        const token = typeof tokenCookie === "string" ? JSON.parse(tokenCookie) : tokenCookie;
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (_) {
      // Cookie invalide ou absent
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;