import styled from "styled-components";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Button } from "../../../stories/Button";
import { Span } from "../../../components/atoms/Span/Span";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const TestPage = () => {
  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Twoje testy:</ClassHeading>
        </span>
        <div>
          <Span
            titleLabel="Język angielski /"
            label="Jan Kowalski"
            isGrade={false}
          />
          <span style={{ fontSize: "14px" }}>
            <p>Data rozpoczęcia: 12.04.2023 15:00</p>
          </span>
        </div>
        <Cta style={{ alignSelf: "flex-start" }} label="Wejdź" isJobOffer />
        <Cta
          href="test/create"
          style={{ alignSelf: "flex-start" }}
          label="Stwórz test"
          isJobOffer
        />
      </Wrapper>
    </PlatformLayout>
  );
};
