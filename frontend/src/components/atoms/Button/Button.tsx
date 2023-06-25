import React from "react";
import styled, { css } from "styled-components";
import { ButtonProps } from "../../../interfaces/types";

const ButtonTest = styled.button<ButtonProps>`
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  padding: 1.25rem 2rem;
  border-radius: 20px;
  font-weight: bold;
  border: none;
  transition: all 0.3s ease-in-out;
  ${({ secondary }) =>
    secondary &&
    css`
      font-size: 1rem;
      background-color: ${({ theme }) => theme.darkBlue};
      border-radius: 50px;
    `}
  &:hover {
    background-color: ${({ theme }) => theme.purpleLight};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  style,
  href,
}) => {
  return (
    <a href={href}>
      <ButtonTest style={style} label={label} secondary={secondary}>
        {label}
      </ButtonTest>
    </a>
  );
};
