import React, { useEffect, useState } from "react";
import { Input } from "../../components/atoms/Input/Input";
import styled from "styled-components";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import { Cta } from "../../components/atoms/Button/Cta";
import { Checkbox } from "../../components/atoms/Checkbox/Checkbox";
import { LandingPageLayout } from "../../templates/LandingPageLayout";
import { Link } from "react-router-dom";
import { DataInterface } from "../../interfaces/types";

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
const InnerWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    width: 40%;
  }
`;

export const RegisterPage = () => {
  const [checkboxes, setCheckboxes] = useState([
    {
      id: 1,
      label: "Zgadzam się na przetwarzanie danych osobowych",
      checked: false,
    },
    {
      id: 2,
      label: "Chcę zarejestrować się jako nauczyciel",
      checked: false,
    },
  ]);
  const [formData, setFormData] = useState<DataInterface>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Role: checkboxes[1].checked ? "Professor" : "Student",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Role: checkboxes.find((checkbox) => checkbox.id === 2)?.checked
        ? "Professor"
        : "Student",
    }));
  }, [checkboxes]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "https://localhost:7024/api/Authentication/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        }
      );

      console.log("Response Status:", response.status);
      const responseBody = await response.text();
      console.log("Response Body:", responseBody);

      if (!response.ok) {
        console.error("Response Error:", responseBody);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

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
            <Input
              placeholder="Imię"
              name="FirstName"
              onChange={handleInputChange}
            />

            <Input
              placeholder="Nazwisko"
              name="LastName"
              onChange={handleInputChange}
            />
            <Input
              placeholder="Adres Email"
              name="Email"
              onChange={handleInputChange}
            />
            <Input
              placeholder="Hasło"
              type="password"
              name="Password"
              onChange={handleInputChange}
            />
            {checkboxes.map((checkbox) => (
              <Checkbox
                key={checkbox.id}
                label={checkbox.label}
                id={checkbox.id}
                isChecked={checkbox.checked}
                onChange={() =>
                  handleCheckboxChange(checkbox.id, !checkbox.checked)
                }
              />
            ))}
            <Cta
              href="#"
              style={{ alignSelf: "flex-end" }}
              label="Zarejestruj się"
              isJobOffer
              onClick={handleSubmit}
            />
            <Link to="/login" style={{ alignSelf: "flex-end" }}>
              Masz już konto?
              <span style={{ textDecoration: "underline" }}>zaloguj się</span>
            </Link>
          </InnerWrapper>
        </LandingPageLayout>
      </Wrapper>
    </>
  );
};
