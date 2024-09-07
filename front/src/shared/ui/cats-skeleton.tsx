import styled, { keyframes } from "styled-components";
import CatsContainer from "./cats-container";

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

const skeletonAnimation = keyframes`
  0% {
    background-color: #cbcbcb;
  }
  50% {
    background-color: #bababa;
  }
  100% {
    background-color: #ababab;
  }
`;

const Skeleton = styled.div`
  width: 225px;
  height: 225px;
  background-color: #f5f5f5;
  animation: ${skeletonAnimation} 1.5s linear infinite;

  @media (width < 600px) {
    width: 150px;
    height: 150px;
  }
`;
