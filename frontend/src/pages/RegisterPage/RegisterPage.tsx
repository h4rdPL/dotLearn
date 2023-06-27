import React, { useState } from "react";
import { Input } from "../../components/atoms/Input/Input";
import styled from "styled-components";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { Cta } from "../../components/atoms/Button/Cta";
import { Checkbox } from "../../components/atoms/Checkbox/Checkbox";
import { LandingPageLayout } from "../../templates/LandingPageLayout";

export const RegisterPage = () => {
  const [checkboxes, setCheckboxes] = useState([
    {
      id: "Zgadzam się na przetwarzanie danych osobowych",
      checked: false,
    },
    {
      id: "Chcę zarejestrować się jako nauczyciel",
      checked: false,
    },
  ]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

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
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      width: 40%;
    }
  `;
  return (
    <>
      <Wrapper>
        <LandingPageLayout>
          <SecondaryHeading
            style={{ alignSelf: "flex-start" }}
            label="Zarejestruj_się"
            secondary
            isSectionTitle
          />
          <InnerWrapper>
            <Input placeholder={"Imię"} />
            <Input placeholder={"Nazwisko"} />
            <Input placeholder={"Adres Email"} />
            <Input placeholder={"Hasło"} />
            <Input placeholder={"Powtórz hasło"} />
            {checkboxes.map((checkbox) => (
              <Checkbox
                key={checkbox.id}
                label={`${checkbox.id}`}
                id={checkbox.id}
                isChecked={checkbox.checked}
                onChange={handleCheckboxChange}
              />
            ))}

            <Cta
              href="#"
              style={{ alignSelf: "flex-end" }}
              label="Zarejestruj się"
              isJobOffer
            />
            <a style={{ alignSelf: "flex-end" }} href="/login">
              Masz już konto?
              <span style={{ textDecoration: "underline" }}>zaloguj się</span>
            </a>
          </InnerWrapper>
        </LandingPageLayout>
      </Wrapper>
    </>
  );
};
