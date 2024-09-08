import { CatsList } from "@/entities/cat";
import { useFavorites } from "../model/use-favorites";

export default function FavoriteCats() {
  const { data, isLoading } = useFavorites();

  return <CatsList data={data || []} initialLoading={isLoading} />;
}
