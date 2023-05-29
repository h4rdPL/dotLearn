import React from "react";
import { styled } from "styled-components";
import { InformationProps } from "../../../interfaces/types";
const Wrapper = styled.div`
  align-self: flex-start;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    max-width: 40%;
    align-self: center;
  }
`;
const InnerWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SubHeading = styled.h2`
  color: ${({ theme }) => theme.white};
  font-weight: lighter;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 2rem;
  }
`;
const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: lighter;
  color: ${({ theme }) => theme.white};
`;
const SpanWrapper = styled.span`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.yellowBright};
    border-radius: 50px;
  }
`;
export const Information = ({
  firstLabel,
  secondLabel,
  thirdLabel,
  description,
}: InformationProps) => {
  return (
    <>
      <Wrapper>
        <InnerWrapper>
          <SubHeading>
            {firstLabel}
            <br /> {secondLabel} <SpanWrapper>{thirdLabel}</SpanWrapper>
          </SubHeading>
          <Paragraph>{description}</Paragraph>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};
