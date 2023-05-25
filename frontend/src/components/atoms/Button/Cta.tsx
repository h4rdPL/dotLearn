import React from "react";
import { styled } from "styled-components";
import arrow from "../../../assets/icons/arrowRight.svg";
const CtaButton = styled.a`
  color: ${({ theme }) => theme.highlight};
  font-weight: 600;
`;

const Wrapper = styled.span`
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
`;
const Img = styled.img`
  width: 15px;
`;

export const Cta = () => {
  return (
    <CtaButton>
      <Wrapper>
        Zobacz więcej <Img src={arrow} alt="arrow" />
      </Wrapper>
    </CtaButton>
  );
};
