import React from "react";
import { Input } from "../../atoms/Input/Input";
import { Placeholder } from "../../atoms/Input/Placeholder";
import { Cta } from "../../atoms/Button/Cta";
import { styled } from "styled-components";

export const Forms = () => {
  const Wrapper = styled.form`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-self: center;
    width: 100%;
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
      width: 50%;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
      width: 35%;
    }
  `;
  return (
    <Wrapper>
      <Input placeholder="Adres email" />
      <Input placeholder="Tytuł" />
      <Placeholder placeholder="Treść wiadomości" />
      <Cta style={{ alignSelf: "flex-end" }} label="Wyślij" isJobOffer />
    </Wrapper>
  );
};
