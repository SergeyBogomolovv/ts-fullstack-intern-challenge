import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Link = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.25px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  &.active {
    background-color: #1e88e5;
    opacity: 1;
  }
  &:hover {
    background-color: #1e88e5;
    opacity: 1;
    cursor: pointer;
  }
`;

export default Link;
