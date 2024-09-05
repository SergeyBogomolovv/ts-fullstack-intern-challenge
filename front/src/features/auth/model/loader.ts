import checkAuth from "@/shared/utils/check-auth";
import { redirect } from "react-router-dom";

const authLoader = async () => {
  const isAuthenticated = checkAuth();
  if (isAuthenticated) {
    throw redirect("/");
  }
  return null;
};

export default authLoader;
