import React from "react";
import { Forms } from "../../components/organisms/Forms/Forms";
import styled from "styled-components";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { LandingPageLayout } from "../../templates/LandingPageLayout";

export const ContactPage = () => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
    justify-content: center;
    min-height: 100vh;
    padding: ${({ theme }) => theme.padding.mobilePadding};
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      padding: ${({ theme }) => theme.padding.desktopPadding};
    }
  `;
  return (
    <LandingPageLayout>
      <Wrapper>
        <SecondaryHeading
          style={{ alignSelf: "center" }}
          label="Kontakt"
          secondary
          isSectionTitle
        />
        <Forms />
      </Wrapper>
    </LandingPageLayout>
  );
};
