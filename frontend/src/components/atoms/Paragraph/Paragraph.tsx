import React from "react";
import styled, { css } from "styled-components";
import { ParagraphProps } from "../../../interfaces/types";
import quotesIcon from "../../../assets/icons/quotes.svg";
const ParagraphStyled = styled.p<ParagraphProps>`
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-weight: ${({ isLight }) => (isLight ? "400" : "bold")};
  ${({ isLight, isQuotes }) => {
    return isLight
      ? css`
          text-align: left;
          @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
            padding-right: 4rem;
          }
          @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
            padding-right: 10rem;
          }
        `
      : isQuotes &&
          css`
            position: relative;
            text-align: justify;
            font-weight: 400;
            color: #a792c7;
            font-size: 25px;
            @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
              justify-self: center;
              line-height: 39px;
              letter-spacing: 10px;
            }
            &::before {
              content: "";
              position: absolute;
              background-image: url(${quotesIcon});
              background-repeat: no-repeat;
              width: 30px;
              height: 30px;
              top: 0;
              left: -10px;
              background-size: 100%;
              z-index: -999;
              @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
                width: 90px;
                height: 90px;
                top: -25px;
                left: -45px;
              }
            }
          `;
  }};
  ${({ isJobOffer }) =>
    isJobOffer &&
    css`
      @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
        width: 60%;
      }
    `};
`;

export const Paragraph: React.FC<ParagraphProps> = ({
  label,
  isLight,
  isQuotes,
  style,
  isJobOffer,
}) => {
  return (
    <ParagraphStyled
      style={style}
      label={label}
      isQuotes={isQuotes}
      isLight={isLight}
      isJobOffer={isJobOffer}
    >
      {label}
    </ParagraphStyled>
  );
};
