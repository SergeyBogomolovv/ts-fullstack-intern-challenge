import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./root-layout";
import HomePage from "../pages/home";
import FavoritesPage from "../pages/favorites";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="favorites" element={<FavoritesPage />} />
    </Route>,
  ),
);

export default router;
