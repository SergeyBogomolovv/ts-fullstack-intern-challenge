import styled from "styled-components";
import Link from "./link";

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">Все котики</Link>
      <Link to="/favorites">Любимые котики</Link>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  height: 64px;
  background-color: #2196f3;
  padding: 0 62px;
  position: "sticky";
  width: 100%;
`;
