import { ACCESS_TOKEN_KEY } from "@/shared/constants";

export default function checkAuth() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return false;
  return true;
}
