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
  //TODO: add dislike and liked heart state
  const isAuthenticated = useMemo(checkAuth, []);

  const clickHandler = () => {
    if (!isAuthenticated) {
      return;
    }
    like(cat.id);
  };

  return (
    <StyledButton disabled={!isAuthenticated} onClick={clickHandler}>
      <Heart filled={true} />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff3a00;
`;
