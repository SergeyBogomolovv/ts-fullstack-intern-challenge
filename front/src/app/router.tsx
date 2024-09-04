import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./root-layout";
import HomePage from "../pages/home";
import FavoritesPage from "../pages/favorites";
import AuthLayout from "./auth-layout";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Route>,
  ),
);

export default router;
