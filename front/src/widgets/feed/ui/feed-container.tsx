import CatCard from "@/entities/cat-card";
import FavoriteButton from "@/features/like-button";
import { Cat } from "@/shared/schemas";
import CatsContainer from "@/shared/ui/cats-container";
import CatsSkeleton from "@/shared/ui/cats-skeleton";
import Container from "@/shared/ui/container";
import styled from "styled-components";

interface Props {
  initialLoading?: boolean;
  isFetchingNextPage?: boolean;
  data: Cat[];
}

export default function FeedContainer({
  data,
  initialLoading,
  isFetchingNextPage,
}: Props) {
  return (
    <Container>
      {initialLoading ? (
        <CatsSkeleton />
      ) : (
        <>
          {data.length === 0 && <LoadingLabel>Котиков нет :(</LoadingLabel>}
          <CatsContainer>
            {data.map((cat) => (
              <CatCard
                key={cat.cat_id}
                cat={cat}
                button={(cat) => <FavoriteButton cat={cat} />}
              />
            ))}
          </CatsContainer>
          {isFetchingNextPage && (
            <LoadingLabel>... загружаем еще котиков ..</LoadingLabel>
          )}
        </>
      )}
    </Container>
  );
}

const LoadingLabel = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
