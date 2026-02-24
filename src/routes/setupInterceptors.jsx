import axiosInstance from "../helpers/axiosInstance";


export const setupInterceptors = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {  
        navigate('/auth/sign-in');
      }
      return Promise.reject(error);
    }
  );
};