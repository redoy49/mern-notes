// hooks/useAxiosSecure.js
import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

// Shared axios instance
const axiosSecure = axios.create({ baseURL: "http://localhost:3000" });

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${await user.getIdToken()}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosSecure.interceptors.request.eject(interceptor);
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
