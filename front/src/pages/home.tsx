import CatCard from "@/entities/cat-card";
import FavoriteButton from "@/features/favorite-button/ui/favorite-button";
import LoadMoreButton from "@/features/load-more-button";
import { Cat } from "@/shared/types";
import CatsContainer from "@/shared/ui/cats-container";
import getCats from "@/shared/utils/get-cats";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    getCats().then((res) => setCats(res));
  }, []);

  return (
    <>
      <CatsContainer>
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            url={cat.url}
            alt={`cat ${cat.id}`}
            id={cat.id}
            button={(id) => <FavoriteButton id={id} />}
          />
        ))}
      </CatsContainer>
      <LoadMoreButton />
    </>
  );
}
