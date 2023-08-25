import React from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Span } from "../../../components/atoms/Span/Span";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Button } from "../../../components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { classData } from "../../../assets/data/classes";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const ClassPage: React.FC = () => {
  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Twoje klasy:</ClassHeading>
        </span>
        {classData.map((myClass: any) => (
          <>
            <div>
              <Span
                titleLabel={`${myClass.subject}`}
                label={`${myClass.professor.firstName} ${myClass.professor.lastName}`}
                isGrade={false}
              />
              <span style={{ fontSize: "14px" }}>
                <p>Ilość osób: 20</p>
              </span>
            </div>

            <Cta
              href={`/platform/class/${myClass.id}`}
              style={{ alignSelf: "flex-start" }}
              label="Wejdź"
              isJobOffer
            />
          </>
        ))}
        <Link to={"/platform/class/create"}>
          <Button label="Stwórz klasę" />
        </Link>
        <Link to={"/platform/class/create"}>
          <Button label="Dołącz do klasy" />
        </Link>
      </Wrapper>
    </PlatformLayout>
  );
};
