import React, { useContext, useEffect, useState } from "react";
import { SecondaryHeading } from "../../components/atoms/Heading/SecondaryHeading";
import styled from "styled-components";
import { Input } from "../../components/atoms/Input/Input";
import { Cta } from "../../components/atoms/Button/Cta";
import { LandingPageLayout } from "../../templates/LandingPageLayout";
import { Link } from "react-router-dom";
import { LoginDataInterface } from "../../interfaces/types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContex";
import Cookies from "js-cookie";

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
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    width: 50%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    width: 30%;
  }
`;

export const LoginPage = () => {
  const [name, setName] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginDataInterface>({
    Email: "",
    Password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();
  const { userData, updateUserEmail } = useContext(UserContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:7024/api/Authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...loginData }),
        }
      );
      const content = await response.json();
      updateUserEmail(content.Email);
      Cookies.set("jwt", content.Token);

      setName(content.Email);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(JSON.stringify({ ...loginData }));

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));

    if (loggedIn) {
      return navigate("/platform/dashboard");
    }
  }, [loggedIn]);

  return (
    <>
      <Wrapper>
        <LandingPageLayout>
          <SecondaryHeading
            style={{ alignSelf: "flex-start" }}
            label="Zaloguj_się"
            secondary
            isSectionTitle
          />
          <InnerWrapper>
            <Input
              name="Email"
              onChange={handleInputChange}
              placeholder={"Adres Email"}
            />
            <Input
              name="Password"
              onChange={handleInputChange}
              type="password"
              placeholder={"Hasło"}
            />
            <Cta
              style={{ alignSelf: "flex-end" }}
              onClick={handleSubmit}
              label="Zaloguj się"
              isJobOffer
            />
            <Link style={{ alignSelf: "flex-end" }} to={"/register"}>
              Nie masz konta?
              <span style={{ textDecoration: "underline" }}>
                Zarejestruj się
              </span>
            </Link>
          </InnerWrapper>
        </LandingPageLayout>
      </Wrapper>
    </>
  );
};
