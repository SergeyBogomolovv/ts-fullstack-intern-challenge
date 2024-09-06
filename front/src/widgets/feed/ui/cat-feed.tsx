import CatCard from "@/entities/cat-card";
import FavoriteButton from "@/features/favorite-button";
import { Cat } from "@/shared/types";
import CatsContainer from "@/shared/ui/cats-container";

interface Props {
  cats: Cat[];
}

export default function CatFeed({ cats }: Props) {
  return (
    <CatsContainer>
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          button={(cat) => <FavoriteButton cat={cat} />}
        />
      ))}
    </CatsContainer>
  );
}
