import { Cat } from "@/shared/types";
import Heart from "@/shared/ui/heart";
import styled from "styled-components";

interface Props {
  cat: Cat;
}

export default function FavoriteButton({ cat }: Props) {
  return (
    <StyledButton>
      <Heart />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff3a00;
`;
