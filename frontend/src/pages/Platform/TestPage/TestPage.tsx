import styled from "styled-components";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Span } from "../../../components/atoms/Span/Span";
import { TestInterface } from "../../../interfaces/types";
import { testData } from "../../../assets/data/testData";
import { Link } from "react-router-dom";
import { Button } from "../../../components/atoms/Button/Button";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const TestPage: React.FC<TestInterface> = () => {
  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Twoje testy:</ClassHeading>
        </span>
        {testData.map((data) => (
          <>
            <div>
              <Span
                titleLabel={`${data.testName}`}
                label={`${data.professor?.firstName} ${data.professor?.lastName}`}
                isGrade={false}
              />
              <span style={{ fontSize: "14px" }}>
                <p>Data rozpoczęcia: 12.04.2023 15:00</p>
              </span>
            </div>
            <Cta
              href={`test/${data.id}`}
              style={{ alignSelf: "flex-start" }}
              label="Wejdź"
              isJobOffer
            />
          </>
        ))}
        <Link to={"/platform/test/create"}>
          <Button label="Stwórz test" />
        </Link>
      </Wrapper>
    </PlatformLayout>
  );
};
