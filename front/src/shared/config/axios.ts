import axios from "axios";
import { API_URL } from "../constants";

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "X-Auth-Token": localStorage.getItem("x-auth-token") || "",
  },
});

export default $api;
