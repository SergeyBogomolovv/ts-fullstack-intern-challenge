import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./root-layout";
import HomePage from "../pages/home";
import FavoritesPage from "../pages/favorites";
import SignInPage from "@/pages/sign-in";
import { authLoader } from "@/features/auth";
import { protectedLoader } from "./protected-loader";
import NotFoundPage from "@/pages/404";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />

      <Route
        path="favorites"
        element={<FavoritesPage />}
        loader={protectedLoader}
      />

      <Route path="sign-in" element={<SignInPage />} loader={authLoader} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default router;
