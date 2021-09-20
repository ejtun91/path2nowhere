import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://api.path2nowhere.com/api/",
});
