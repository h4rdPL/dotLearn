import React from "react";
import styled from "styled-components";
import { theme } from "../../theme/myTheme";

interface ButtonProps {
  label: string;
}

const ButtonTest = styled.button`
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  width: 178px;
  height: 72px;
  border-radius: 20px;
  font-weight: bold;
`;

export const Button = ({ label }: ButtonProps) => {
  return <ButtonTest>{label}</ButtonTest>;
};
