import Heart from "@/shared/ui/heart";
import styled from "styled-components";
interface Props {
  id: string;
}

export default function FavoriteButton({ id }: Props) {
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
