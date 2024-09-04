import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function AuthLayout() {
  return (
    <AuthContainer>
      <Outlet />
    </AuthContainer>
  );
}

const AuthContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
