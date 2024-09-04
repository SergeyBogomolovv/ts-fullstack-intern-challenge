import styled from "styled-components";

interface Props {
  url: string;
  alt: string;
  id: string;
  button: (id: string) => JSX.Element;
}

export default function CatCard({ url, id, button, alt }: Props) {
  return (
    <Card>
      <StyledImage src={url} alt={alt} />
      <StyledButton>{button(id)}</StyledButton>
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
    -webkit-box-shadow: -1px 4px 7px 2px rgba(34, 60, 80, 0.4);
    -moz-box-shadow: -1px 4px 7px 2px rgba(34, 60, 80, 0.4);
    box-shadow: -1px 4px 7px 2px rgba(34, 60, 80, 0.4);
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
