import React from "react";
import { styled, css } from "styled-components";
import { SecondaryHeadingProps } from "../../../interfaces/types";
import circles from "../../../assets/icons/circles.svg";

const Heading = styled.h2<SecondaryHeadingProps>`
  position: relative;
  font-size: 1.4rem;
  width: fit-content;
  color: ${({ theme }) => theme.darkBackground};
  text-transform: uppercase;

  ${({ secondary }) =>
    secondary &&
    css`
      font-size: 1.5rem;
      text-transform: none;
    `}
  ${({ isSectionTitle }) =>
    isSectionTitle &&
    css`
      padding: 6rem 0 4rem 0;
    `}
  &::before {
    content: "";
    position: absolute;
    top: -100%;
    right: -25%;
    height: 40px;
    min-width: 50px;
    background-image: url(${circles});
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;

    ${({ secondary }) =>
      secondary &&
      css`
        background: none;
        font-size: 1.875rem;
        text-transform: lowercase;
      `}

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      top: -66%;
      right: -20%;
      background-size: 80%;
      height: 40px;
      min-width: 50px;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 2.438rem;
    ${({ secondary }) =>
      secondary &&
      css`
        font-size: 1.875rem;
      `}
    ${({ isSmall }) =>
      isSmall &&
      css`
        font-size: 20px;
      `}
  }
`;
export const SecondaryHeading: React.FC<SecondaryHeadingProps> = ({
  label,
  secondary,
  isSectionTitle,
  style,
  isSmall,
}) => {
  return (
    <Heading
      style={style}
      label={label}
      isSectionTitle={isSectionTitle}
      isSmall={isSmall}
      secondary={secondary}
    >
      {label}
    </Heading>
  );
};
