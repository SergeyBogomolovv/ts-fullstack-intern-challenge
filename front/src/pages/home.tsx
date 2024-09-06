import LoadMoreButton from "@/features/load-more-button";
import { CatFeed } from "@/widgets/feed";
import { useFeed } from "@/widgets/feed/model/use-feed";

export default function HomePage() {
  const { data, isLoading } = useFeed();
  return (
    <>
      {isLoading ? <div>loading...</div> : <CatFeed cats={data?.data || []} />}
      <LoadMoreButton />
    </>
  );
}
