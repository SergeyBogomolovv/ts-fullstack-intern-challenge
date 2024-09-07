import styled from "styled-components";

const CatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 48px;
  width: 100%;
  margin: 0 auto;

  @media (width < 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (width < 1000px) {
    gap: 24px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (width < 600px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default CatsContainer;
