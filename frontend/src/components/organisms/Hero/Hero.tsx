import React, { useEffect, useState } from "react";
import { Heading } from "../../atoms/Heading/Heading";
import { Cta } from "../../atoms/Button/Cta";
import styled from "styled-components";
import onlineLearning from "../../../assets/images/onlineLearning.svg";

const HeadingWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    align-self: center;
  }
`;
const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.padding.mobilePadding};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    gap: 0;
    flex-direction: row;
    padding: ${({ theme }) => theme.padding.desktopPadding};
  }
`;
const Image = styled.img`
  max-width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    max-width: 30%;
  }
`;

export const Hero = () => {
  return (
    <HeadingWrapper>
      <HeadingWrapper>
        <Wrapper>
          <InnerWrapper>
            <Heading firstLabel="Zacznij się uczyć" secondLabel="z nami" />
            <Cta label="Dołącz do nas!" />
          </InnerWrapper>
          <Image src={onlineLearning} alt="learning" />
        </Wrapper>
      </HeadingWrapper>
    </HeadingWrapper>
  );
};
