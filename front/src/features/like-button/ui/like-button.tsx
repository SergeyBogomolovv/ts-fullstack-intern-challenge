import Heart from "@/shared/ui/heart";
import styled from "styled-components";
import { useLike } from "../model/use-like";
import { useMemo } from "react";
import { useDisLike } from "../model/use-dislike";
import { Cat } from "@/entities/cat";
import { checkAuth } from "@/entities/user";

interface Props {
  cat: Cat;
}

export default function LikeButton({ cat }: Props) {
  const { mutate: like } = useLike();
  const { mutate: disLike } = useDisLike();
  const isAuthenticated = useMemo(checkAuth, []);

  const clickHandler = () => {
    if (!isAuthenticated) {
      return;
    }
    if (cat.favorite) {
      disLike(cat.cat_id);
    } else {
      like(cat.cat_id);
    }
  };

  return (
    <StyledButton $disabled={!isAuthenticated} onClick={clickHandler}>
      <Heart filled={cat.favorite} />
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $disabled?: boolean }>`
  background: none;
  border: none;
  color: #ff3a00;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
`;
