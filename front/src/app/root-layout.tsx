import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "@/shared/ui/header";

const Main = styled.main`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
`;

export default function RootLayout() {
  return (
    <Main>
      <Header />
      <Outlet />
    </Main>
  );
}
