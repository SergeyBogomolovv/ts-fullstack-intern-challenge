import CatCard from "@/entities/cat-card";
import FavoriteButton from "@/features/like-button";
import { Cat } from "@/shared/types";
import CatsContainer from "@/shared/ui/cats-container";

interface Props {
  cats: Cat[];
}

export default function CatFeedContainer({ cats }: Props) {
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
