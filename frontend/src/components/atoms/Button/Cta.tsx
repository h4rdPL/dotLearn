import React from "react";
import { styled, css } from "styled-components";
import arrow from "../../../assets/icons/arrowRight.svg";
import arrowWhite from "../../../assets/icons/arrowRightWhite.svg";
import { CTAInterface } from "../../../interfaces/types";
import { Link } from "react-router-dom";
const CtaButton = styled.a<{ disabled?: boolean }>`
  color: ${({ theme }) => theme.darkBlue};
  font-weight: 600;
  text-decoration: none;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const RouterLink = styled(Link)<{ disabled?: boolean }>`
  color: ${({ theme }) => theme.darkBlue};
  font-weight: 600;
  text-decoration: none;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const Wrapper = styled.span<CTAInterface>`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: fit-content;
  font-size: 1.1rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    gap: 0.8rem;
  }

  ${({ isJobOffer }) =>
    isJobOffer &&
    css`
      color: #000;
      @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
        color: ${({ theme }) => theme.darkBlue};
        font-weight: lighter;
      }
    `};
`;

const Img = styled.img`
  width: 15px;
  transition: transform 0.3s ease;
  ${Wrapper}:hover & {
    transform: translateX(2px);
  }
`;

export const Cta: React.FC<CTAInterface> = ({
  isJobOffer,
  label,
  href,
  style,
  to,
  as,
  onClick,
  disabled,
}) => {
  return (
    <CtaButton style={style} href={href} onClick={onClick} disabled={disabled}>
      <Wrapper isJobOffer={isJobOffer}>
        {label} <Img src={isJobOffer ? arrowWhite : arrow} alt="arrow" />
      </Wrapper>
    </CtaButton>
  );
};
