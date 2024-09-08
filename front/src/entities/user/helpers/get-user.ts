import { ACCESS_TOKEN_KEY } from "@/shared/constants";
import { decodeJwt } from "jose";
import { User, UserSchema } from "../model/user-model";

export default function getUser() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;
  const user = decodeJwt<User>(token);

  const { success, error } = UserSchema.safeParse(user);
  if (!error && success) return user;
  return null;
}
