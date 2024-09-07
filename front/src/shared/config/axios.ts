import axios from "axios";
import { ACCESS_TOKEN_KEY, API_URL, CATS_API_KEY } from "../constants";

export const $api = axios.create({
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

export const $cats = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": CATS_API_KEY,
  },
});
