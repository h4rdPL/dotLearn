import React from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Span } from "../../../components/atoms/Span/Span";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Button } from "../../../components/atoms/Button/Button";

const Wrapper = styled.div``;

export const ClassPage = () => {
  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <h2>Twoje klasy</h2>
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
        <Cta style={{ alignSelf: "flex-end" }} label="Wejdź" isJobOffer />
        <Button label="Stwórz klasę" />
      </Wrapper>
    </PlatformLayout>
  );
};
