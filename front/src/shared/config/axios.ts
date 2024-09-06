import axios from "axios";
import { ACCESS_TOKEN_KEY, API_URL } from "../constants";

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-auth-token": localStorage.getItem(ACCESS_TOKEN_KEY),
  },
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

export default $api;
