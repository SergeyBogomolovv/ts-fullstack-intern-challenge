import styled from "styled-components";

export default function NotFoundPage() {
  return (
    <Container>
      <Title>Not found</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: 0.25px;
  text-align: center;
`;
