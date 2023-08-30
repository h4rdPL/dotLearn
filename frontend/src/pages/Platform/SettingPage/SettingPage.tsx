import React, { useEffect, useState, useContext } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { UserContext } from "../../Context/UserContex";

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 10px;
  color: ${({ theme }) => theme.white};
`;

const SettingsTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputLabel = styled.label`
  font-size: 16px;
`;

const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5px;
  font-size: 16px;
  width: 30%;
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  &:hover {
    background-color: ${({ theme }) => theme.darkPurple};
  }
`;

export const SettingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userData } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://localhost:7024/api/Authentication/user",
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const content = await response.json();
      console.log(content);
      console.log(document.cookie);
    })();
  });

  return (
    <PlatformLayout>
      <SettingsWrapper>
        <SettingsTitle>Cześć {userData.email}, zmień swoje dane </SettingsTitle>
        <Form>
          <InputLabel>Email:</InputLabel>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLabel>Nowe hasło:</InputLabel>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputLabel>Potwierdź nowe hasło:</InputLabel>
          <InputField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SaveButton type="submit">Zapisz zmiany</SaveButton>
        </Form>
      </SettingsWrapper>
    </PlatformLayout>
  );
};
