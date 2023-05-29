import React from "react";
import { styled } from "styled-components";
import { SecondaryHeadingProps } from "../../../interfaces/types";
import circles from "../../../assets/icons/circles.svg";

const Heading = styled.h2`
  position: relative;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.white};
  &::before {
    content: url(${circles});
    position: absolute;
    top: -66%;
    right: -4%;
    height: 20px;
    width: 20px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 2.438rem;
  }
`;
export const SecondaryHeading = ({ label }: SecondaryHeadingProps) => {
  return <Heading>{label.toUpperCase()}</Heading>;
};
