import { ACCESS_TOKEN_KEY } from "../constants";
import { decodeJwt } from "jose";

export default function getUser() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;
  return decodeJwt(token) as { id: string; login: string };
}
