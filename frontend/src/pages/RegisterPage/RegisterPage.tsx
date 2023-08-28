import React, { useState } from "react";
import { Input } from "../../components/atoms/Input/Input";
import styled from "styled-components";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
// import { Cta } from "../../components/atoms/Button/Cta";
import { Checkbox } from "../../components/atoms/Checkbox/Checkbox";
import { LandingPageLayout } from "../../templates/LandingPageLayout";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Role: "",
  });

  // const [checkboxes, setCheckboxes] = useState([
  //   {
  //     id: "Zgadzam się na przetwarzanie danych osobowych",
  //     checked: false,
  //   },
  //   {
  //     id: "Chcę zarejestrować się jako nauczyciel",
  //     checked: false,
  //   },
  // ]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("Input Changed:", name, value); // Add this line
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("Form Data:", formData);

  // const handleCheckboxChange = (id: string, checked: boolean) => {
  //   const updatedCheckboxes = checkboxes.map((checkbox) =>
  //     checkbox.id === id ? { ...checkbox, checked } : checkbox
  //   );
  //   setCheckboxes(updatedCheckboxes);
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:7024/api/Authentication/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response Status:", response.status);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
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
          <InnerWrapper onSubmit={handleSubmit}>
            <Input
              placeholder="Imię"
              name="FirstName"
              value={formData.FirstName}
              onChange={(e) => handleInputChange(e)} // Pass the event here
            />
            <Input
              placeholder="Nazwisko"
              name="LastName"
              value={formData.LastName}
              onChange={(e) => handleInputChange(e)} // Pass the event here
            />
            <Input
              placeholder="Adres Email"
              name="Email"
              value={formData.Email}
              onChange={(e) => handleInputChange(e)} // Pass the event here
            />
            <Input
              placeholder="Hasło"
              type="password"
              name="Password"
              value={formData.Password}
              onChange={(e) => handleInputChange(e)} // Pass the event here
            />
            {/* {checkboxes.map((checkbox) => (
              <Checkbox
                key={checkbox.id}
                label={checkbox.id}
                id={checkbox.id}
                isChecked={checkbox.checked}
                onChange={() =>
                  handleCheckboxChange(checkbox.id, !checkbox.checked)
                }
              />
            ))} */}
            {/* <Cta
              href="#"
              style={{ alignSelf: "flex-end" }}
              label="Zarejestruj się"
              isJobOffer
              onClick={handleSubmit}
            /> */}
            <button>Zarejestruj się</button>
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
