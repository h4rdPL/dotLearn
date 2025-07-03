import React from "react";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { MissionWrapper } from "../../components/organisms/MissionWrapper/MissionWrapper";
import { styled } from "styled-components";
import { Paragraph } from "../../components/atoms/Paragraph/Paragraph";
import { Team } from "../../components/organisms/Team/Team";
import { LandingPageLayout } from "../../templates/LandingPageLayout";

const SectionWrapper = styled.section`
  padding: ${({ theme }) => theme.padding.mobilePadding};
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: ${({ theme }) => theme.padding.innerPadding};
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.padding.mobilePadding};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: ${({ theme }) => theme.padding.desktopPadding};
  }
`;
export const AboutPage = () => {
  return (
    <LandingPageLayout>
      <Wrapper>
        <SecondaryHeading label="Nasza_misja" secondary isSectionTitle />
        <SectionWrapper>
          <MissionWrapper />
        </SectionWrapper>
      </Wrapper>
    </LandingPageLayout>
  );
};
