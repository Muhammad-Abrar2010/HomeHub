import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://home-hub-server.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
