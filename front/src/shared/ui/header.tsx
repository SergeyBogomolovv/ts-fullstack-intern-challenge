import styled from "styled-components";
import Link from "./link";

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">Все котики</Link>
      <Link to="/favorites">Любимые котики</Link>
      <button onClick={() => localStorage.clear()}>reset login</button>
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
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.24);
`;
