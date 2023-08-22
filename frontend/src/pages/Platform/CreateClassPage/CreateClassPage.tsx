import React from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ClassInput = styled.input`
  padding: 1rem;
  border: none;
  border-bottom: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  outline: none;
  margin-bottom: 1rem;
  width: 50%;

  &::placeholder {
    color: #ffffff99;
  }
`;

export const CreateClassPage = () => {
  return (
    <>
      <PlatformLayout>
        <Wrapper>
          <h1>Nowa klasa</h1>
          <ClassInput
            type="text"
            placeholder="Nazwa klasy np. Angielski - Warszawa"
          />
          <p>Dodaj studentów (po przecinku)</p>
          <ClassInput
            type="text"
            placeholder="Identyfikator studenta np. 7124, 1592"
          />
          <Cta style={{ alignSelf: "flex-start" }} label="Stwórz" isJobOffer />
        </Wrapper>
      </PlatformLayout>
    </>
  );
};
