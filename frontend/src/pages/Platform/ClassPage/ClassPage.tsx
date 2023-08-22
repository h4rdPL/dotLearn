import React from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Span } from "../../../components/atoms/Span/Span";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Button } from "../../../components/atoms/Button/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const ClassPage = () => {
  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Twoje klasy</ClassHeading>
        </span>
        <div>
          <Span
            titleLabel="Język angielski /"
            label="Jan Kowalski"
            isGrade={false}
          />
          <span style={{ fontSize: "14px" }}>
            <p>Ilość osób: 20</p>
          </span>
        </div>
        <Cta style={{ alignSelf: "flex-start" }} label="Wejdź" isJobOffer />
        <Button label="Stwórz klasę" />
      </Wrapper>
    </PlatformLayout>
  );
};
