import styled from "styled-components";
import { CatsContainer } from "./container";

export default function CatsSkeleton() {
  return (
    <CatsContainer>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </CatsContainer>
  );
}

const Skeleton = styled.div`
  width: 225px;
  height: 225px;
  background-color: #f5f5f5;

  @media (width < 600px) {
    width: 150px;
    height: 150px;
  }
`;
