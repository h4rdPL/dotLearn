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
        <SecondaryHeading label="Historia_projektu" secondary isSectionTitle />
        <SectionWrapper>
          <Paragraph
            style={{ alignSelf: "center" }}
            isQuotes
            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's. Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's.Lorem Ipsum is simply "
          />
          <SecondaryHeading
            style={{ alignSelf: "flex-end", fontSize: "1rem" }}
            label="CEO & CO-FOUNDER"
            secondary
            isSectionTitle
          />
        </SectionWrapper>
        <SecondaryHeading label="Nasz_zespół" secondary isSectionTitle />
        <SectionWrapper>
          <Team />
        </SectionWrapper>
      </Wrapper>
    </LandingPageLayout>
  );
};
