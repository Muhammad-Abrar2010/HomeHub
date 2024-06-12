import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "https://home-hub-server.vercel.app",
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access-token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });
  return axiosSecure;
};

export default useAxiosSecure;
