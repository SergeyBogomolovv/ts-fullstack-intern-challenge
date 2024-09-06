import { Cat } from "@/shared/types";
import { CatFeed } from "@/widgets/feed";
import { AxiosResponse } from "axios";
import { useLoaderData } from "react-router-dom";

export default function FavoritesPage() {
  const { data: cats } = useLoaderData() as AxiosResponse<Cat[]>;

  return <CatFeed cats={cats} />;
}
