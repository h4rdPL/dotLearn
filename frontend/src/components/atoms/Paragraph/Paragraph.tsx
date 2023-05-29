import React from "react";
import styled from "styled-components";
import { ParagraphProps } from "../../../interfaces/types";

const ParagraphStyled = styled.p`
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-weight: bold;
`;

export const Paragraph = ({ label }: ParagraphProps) => {
  return <ParagraphStyled>{label}</ParagraphStyled>;
};
