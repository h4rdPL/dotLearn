import React from "react";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import styled from "styled-components";
import { Input } from "../../components/atoms/Input/Input";
import { Cta } from "../../components/atoms/Button/Cta";
import { Footer } from "../../components/organisms/Footer/Footer";

export const LoginPage = () => {
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: ${({ theme }) => theme.padding.mobilePadding};
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      padding: ${({ theme }) => theme.padding.desktopPadding};
    }
  `;
  const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
      width: 50%;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      width: 30%;
    }
  `;
  return (
    <>
      <Wrapper>
        <Navbar />
        <SecondaryHeading
          style={{ alignSelf: "flex-start" }}
          label="Zaloguj_się"
          secondary
          isSectionTitle
        />
        <InnerWrapper>
          <Input placeholder={"Adres Email"} />
          <Input placeholder={"Hasło"} />
          <Cta
            style={{ alignSelf: "flex-end" }}
            label="Zaloguj się"
            isJobOffer
          />
          <a style={{ alignSelf: "flex-end" }} href="/register">
            Nie masz konta?
            <span style={{ textDecoration: "underline" }}>Zarejestruj się</span>
          </a>
        </InnerWrapper>
      </Wrapper>
      <Footer />
    </>
  );
};
