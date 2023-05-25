import React, { useEffect, useState } from "react";
import { Heading } from "../../atoms/Heading/Heading";
import { HeadingProps } from "../../../interfaces/types";
import { Cta } from "../../atoms/Button/Cta";
import styled from "styled-components";
import onlineLearning from "../../../assets/images/onlineLearning.svg";
import backgroundCirclesDesktop from "../../../assets/images/backgroundCirclesDesktop.svg";
import backgroundCirclesMobile from "../../../assets/images/backgroundCirclesMobile.svg";

const HeadingWrapper = styled.div`
  min-height: 140vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 2rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    flex-direction: column;
    gap: 2rem;
  }
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    flex-direction: row;
  }
`;
const Image = styled.img`
  max-width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    max-width: 30%;
  }
`;

const ImageContainer = styled.div`
  padding-top: 2rem;
  align-self: center;
`;

export const Hero = () => {
  const [backgroundURL, setBackgroundURL] = useState<string>("");

  const handleResize = () => {
    const isMobile = window.innerWidth < 1200;
    setBackgroundURL(
      isMobile ? backgroundCirclesMobile : backgroundCirclesDesktop
    );
  };
  useEffect(() => {
    const isMobile = window.innerWidth < 1200;
    setBackgroundURL(
      isMobile ? backgroundCirclesMobile : backgroundCirclesDesktop
    );
    window.addEventListener("resize", handleResize, false);
  }, []);
  return (
    <>
      <HeadingWrapper>
        <Wrapper>
          <InnerWrapper>
            <Heading firstLabel="Zacznij się uczyć" secondLabel="z nami" />
            <Cta />
          </InnerWrapper>
          <Image src={onlineLearning} alt="learning" />
        </Wrapper>
        <ImageContainer>
          <img src={backgroundURL} alt="icon" />
        </ImageContainer>
      </HeadingWrapper>
    </>
  );
};
