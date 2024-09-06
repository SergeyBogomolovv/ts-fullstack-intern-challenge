import { Cat } from "@/shared/types";
import Heart from "@/shared/ui/heart";
import styled from "styled-components";
import { useLike } from "../model/use-like";
import checkAuth from "@/shared/utils/check-auth";
import { useMemo } from "react";

interface Props {
  cat: Cat;
}

export default function LikeButton({ cat }: Props) {
  const { like } = useLike();
  const isAuthenticated = useMemo(checkAuth, []);

  return (
    <StyledButton disabled={!isAuthenticated} onClick={() => like(cat.id)}>
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
