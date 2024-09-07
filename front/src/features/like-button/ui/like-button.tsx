import { Cat } from "@/shared/types";
import Heart from "@/shared/ui/heart";
import styled from "styled-components";
import { useLike } from "../model/use-like";
import checkAuth from "@/shared/utils/check-auth";
import { useMemo } from "react";
import { useDisLike } from "../model/use-dislike";

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
    <StyledButton disabled={!isAuthenticated} onClick={clickHandler}>
      <Heart filled={cat.favorite} />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff3a00;
`;
