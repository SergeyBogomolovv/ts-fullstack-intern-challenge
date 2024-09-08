import { CatsList } from "@/entities/cat";
import { useFeed } from "../model/use-feed";

export default function CatFeed() {
  const { cats, isFetchingNextPage, isLoading } = useFeed();

  return (
    <CatsList
      data={cats || []}
      isFetchingNextPage={isFetchingNextPage}
      initialLoading={isLoading}
    />
  );
}
