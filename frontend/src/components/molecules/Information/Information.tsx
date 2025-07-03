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
  color: ${({ theme }) => theme.purple};
  font-weight: 500;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    font-size: 3rem;
  }
`;
const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.purple};
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    width: 90%;
  }
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
export const Information: React.FC<InformationProps> = ({
  firstLabel,
  secondLabel,
  thirdLabel,
  description,
}) => {
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
