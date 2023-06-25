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
export const Heading: React.FC<HeadingProps> = ({
  firstLabel,
  secondLabel,
}) => {
  return (
    <MainHeading>
      {firstLabel} <br /> {secondLabel}
    </MainHeading>
  );
};
