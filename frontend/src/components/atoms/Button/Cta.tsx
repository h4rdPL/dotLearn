import React from "react";
import { styled, css } from "styled-components";
import arrow from "../../../assets/icons/arrowRight.svg";
import arrowWhite from "../../../assets/icons/arrowRightWhite.svg";
import { CTAInterface } from "../../../interfaces/types";

const CtaButton = styled.a`
  color: ${({ theme }) => theme.highlight};
  font-weight: 600;
`;

const Wrapper = styled.a<CTAInterface>`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: fit-content;
  font-size: 1.1rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    gap: 0.8rem;
  }
  ${({ isJobOffer }) =>
    isJobOffer &&
    css`
      @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
        color: #fff;
        font-weight: lighter;
      }
    `};
`;

const Img = styled.img`
  width: 15px;
`;

export const Cta: React.FC<CTAInterface> = ({
  isJobOffer,
  label,
  href,
  style,
  to,
  as,
  onClick, // Make onClick prop optional
}) => {
  return (
    <CtaButton style={style}>
      <Wrapper
        onClick={onClick}
        href={href}
        isJobOffer={isJobOffer}
        to={to}
        as={as}
      >
        {label} <Img src={isJobOffer ? arrowWhite : arrow} alt="arrow" />
      </Wrapper>
    </CtaButton>
  );
};
