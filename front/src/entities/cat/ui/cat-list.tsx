import FavoriteButton from "@/features/like-button";
import Container from "@/shared/ui/container";
import styled from "styled-components";
import { Cat } from "../model/cat-model";
import CatCard from "./cat-card";
import CatsSkeleton from "./cat-skeleton";
import { CatsContainer } from "./container";

interface Props {
  initialLoading?: boolean;
  isFetchingNextPage?: boolean;
  data: Cat[];
}

export default function CatsList({
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
