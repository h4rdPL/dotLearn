import React from "react";
import { Forms } from "../../components/organisms/Forms/Forms";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import styled from "styled-components";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { Footer } from "../../components/organisms/Footer/Footer";

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
    <>
      <Navbar />
      <Wrapper>
        <SecondaryHeading
          style={{ alignSelf: "center" }}
          label="Kontakt"
          secondary
          isSectionTitle
        />
        <Forms />
      </Wrapper>
      <Footer />
    </>
  );
};
