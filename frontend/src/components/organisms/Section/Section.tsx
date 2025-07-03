import React from "react";
import { SecondaryHeading } from "../../atoms/Heading/SecondaryHeading";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  padding: 0 2rem;
  gap: 6rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: ${({ theme }) => theme.padding.desktopPadding};
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.white};
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    flex-direction: row;
    padding: ${({ theme }) => theme.padding.innerPadding};
  }
`;

const Span = styled.span`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`;
const SubHeading = styled.h3`
  color: ${({ theme }) => theme.purple};
  font-size: 3rem;
`;
const Paragraph = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.purple};
`;
export const Section = () => {
  return (
    <>
      <Wrapper>
        <SecondaryHeading secondary={false} label="zaufali_nam" />
        <InnerWrapper>
          <Span>
            <SubHeading>30k+</SubHeading>
            <Paragraph>Szkół</Paragraph>
          </Span>
          <Span>
            <SubHeading>300k+</SubHeading>
            <Paragraph>Uczniów</Paragraph>
          </Span>
          <Span>
            <SubHeading>150k+</SubHeading>
            <Paragraph>Nauczycieli</Paragraph>
          </Span>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};
