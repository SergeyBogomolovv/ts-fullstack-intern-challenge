import styled from "styled-components";

const Container = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 62px;
  gap: 32px;

  @media (width < 1000px) {
    gap: 24px;
    margin: 32px;
  }

  @media (width < 600px) {
    gap: 12px;
    margin: 24px;
  }
`;

export default Container;
