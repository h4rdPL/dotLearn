import React from "react";
import styled from "styled-components";
import { HeadingProps } from "../../../interfaces/types";
const MainHeading = styled.h1`
  color: ${({ theme }) => theme.white};
  font-size: 1.5rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 3.875rem;
  }

  
`;
export const Heading = ({ firstLabel, secondLabel }: HeadingProps) => {
  return (
    <MainHeading>
      {firstLabel} <br /> {secondLabel}
    </MainHeading>
  );
};
