import LoadMoreButton from "@/features/load-more-button";
import { Cat } from "@/shared/types";
import getCats from "@/shared/utils/get-cats";
import CatFeed from "@/widgets/cat-feed";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    getCats().then((res) => setCats(res));
  }, []);

  return (
    <>
      <CatFeed cats={cats} />
      <LoadMoreButton />
    </>
  );
}
