import React from "react";
import styled from "styled-components";
import { LinkProps } from "../../../interfaces/types";

const NavbarLink = styled.a`
  color: ${({ theme }) => theme.white};
  position: relative;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: ${({ theme }) => theme.highlight};
    transition: width 0.3s ease-in-out;
  }

  &:hover::before {
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.highlight};
    opacity: 0;
    transition: all 0.3s ease-in-out;
    transform: translateX(-100%);
  }

  &:hover::after {
    left: 100%;
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const Link: React.FC<LinkProps> = ({ label, href }) => {
  return <NavbarLink href={href}>{label}</NavbarLink>;
};
