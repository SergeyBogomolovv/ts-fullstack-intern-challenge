import { SingInForm } from "@/features/auth";
import styled from "styled-components";

export default function SignInPage() {
  return (
    <Container>
      <SingInForm />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
