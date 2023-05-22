import React from "react";
import styled from "styled-components";
import { theme } from "../../../theme/myTheme";

interface ButtonProps {
  label: string;
}

const ButtonTest = styled.button`
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  padding: 1.25rem 2rem;
  border-radius: 20px;
  font-weight: bold;
  border: none;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.purpleLight};
  }
`;

export const Button = ({ label }: ButtonProps) => {
  return <ButtonTest>{label}</ButtonTest>;
};
