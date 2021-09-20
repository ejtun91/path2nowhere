import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://45.93.100.222/api/",
});
