import checkAuth from "@/shared/utils/check-auth";
import { redirect } from "react-router-dom";

const protectedLoader = async () => {
  const isAuthenticated = checkAuth();
  if (!isAuthenticated) {
    throw redirect("/sign-in");
  }
  return null;
};

export default protectedLoader;
