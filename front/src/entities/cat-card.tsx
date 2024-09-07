import { Cat } from "@/shared/schemas";
import styled from "styled-components";

interface Props {
  cat: Cat;
  button: (cat: Cat) => JSX.Element;
}

export default function CatCard({ button, cat }: Props) {
  return (
    <Card>
      <StyledImage src={cat.image_url} alt={`cat ${cat.cat_id}`} />
      <StyledButton>{button(cat)}</StyledButton>
    </Card>
  );
}

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
`;

const Card = styled.div`
  position: relative;
  transition: all 0.1s ease-in-out;
  &:hover {
    scale: 1.07;
    box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.18);
    box-shadow: 0px 6px 5px 0px rgba(0, 0, 0, 0.24);
  }
`;

const StyledButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 16px;
  display: none;
  ${Card}:hover & {
    display: inherit;
  }
`;
