import styled from "styled-components";
import { useFeed } from "../model/use-feed";
import CatFeedContainer from "./feed-container";

export default function CatFeed() {
  const { data, isFetchingNextPage, isLoading } = useFeed();

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <CatFeedContainer cats={data?.pages.flat() || []} />
          {isFetchingNextPage ? (
            <LoadingLabel>... загружаем еще котиков ..</LoadingLabel>
          ) : null}
        </>
      )}
    </>
  );
}

const LoadingLabel = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
