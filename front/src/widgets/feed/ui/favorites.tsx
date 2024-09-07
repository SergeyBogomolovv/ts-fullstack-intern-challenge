import { useFavorites } from "../model/use-favorites";
import FeedContainer from "./feed-container";

export default function FavoriteCats() {
  const { cats, isFetchingNextPage, isLoading } = useFavorites();

  return (
    <FeedContainer
      data={cats || []}
      isFetchingNextPage={isFetchingNextPage}
      initialLoading={isLoading}
    />
  );
}
