import { CatsList } from "@/entities/cat";
import { useFavorites } from "../model/use-favorites";

export default function FavoriteCats() {
  const { cats, isFetchingNextPage, isLoading } = useFavorites();

  return (
    <CatsList
      data={cats || []}
      initialLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
