import { useFeed } from "../model/use-feed";
import FeedContainer from "./feed-container";

export default function CatFeed() {
  const { cats, isFetchingNextPage, isLoading } = useFeed();

  return (
    <FeedContainer
      data={cats || []}
      isFetchingNextPage={isFetchingNextPage}
      initialLoading={isLoading}
    />
  );
}