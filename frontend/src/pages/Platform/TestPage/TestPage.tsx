import styled from "styled-components";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Span } from "../../../components/atoms/Span/Span";
import { TestInterface } from "../../../interfaces/types";
import { Link } from "react-router-dom";
import { Button } from "../../../components/atoms/Button/Button";
import { useEffect, useState } from "react";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
import { dateConverter } from "../../../utils/DateConverter";
import { getUserRole } from "../../../utils/GetUserRole";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const TestPage: React.FC<TestInterface> = () => {
  const [test, setTest] = useState<any>();
  const [role, setRole] = useState<string | undefined>();
  const fetchUserClasses = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      if (typeof authToken === "undefined") return;

      setRole(getUserRole(authToken));

      const response = await fetch(`https://localhost:7024/api/Test/getTest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setTest(data.$values);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchUserClasses();
  }, []);
  console.log(test);
  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Aktywne testy:</ClassHeading>
        </span>
        {test &&
          test.map((data: any) => {
            const originalDate = dateConverter(data.ActiveDate);
            const isTestActive =
              data.UserTestData?.IsActive === true &&
              data.UserTestData?.IsFinished === false;

            if (isTestActive) {
              const currentDate = new Date();
              const activeDate = new Date(data.ActiveDate);
              if (currentDate > activeDate) {
                return (
                  <div key={data.Id}>
                    <Span
                      titleLabel={data.TestName}
                      label={`${data.ProfessorFirstName} ${data.ProfessorLastName}`}
                      isGrade={false}
                    />
                    <span style={{ fontSize: "14px" }}>
                      <p>Data rozpoczęcia: {originalDate}</p>
                      <p>Czas: {data.Time} minut</p>
                    </span>
                    <Cta
                      as={Link}
                      to={`${data.Id}`}
                      style={{ alignSelf: "flex-start" }}
                      label="Wejdź"
                      isJobOffer
                    />
                  </div>
                );
              }
            }

            return null;
          })}

        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Nadchodzące testy:</ClassHeading>
        </span>
        {test &&
          test.map((data: any) => {
            const originalDate = dateConverter(data.ActiveDate);
            const isTestActive =
              data.UserTestData?.IsActive === false &&
              data.UserTestData?.IsFinished === false;

            if (isTestActive) {
              return (
                <div key={data.Id}>
                  <Span
                    titleLabel={data.TestName}
                    label={`${data.ProfessorFirstName} ${data.ProfessorLastName}`}
                    isGrade={false}
                  />
                  <span style={{ fontSize: "14px" }}>
                    <p>Data rozpoczęcia: {originalDate}</p>
                    <p>Czas: {data.Time} minut</p>
                  </span>
                  <Cta
                    as={Link}
                    to={`${data.Id}`}
                    style={{ alignSelf: "flex-start" }}
                    label="Wejdź"
                    isJobOffer
                  />
                </div>
              );
            }

            return null;
          })}
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Zakończone testy:</ClassHeading>
        </span>
        {test &&
          test.map((data: any) => {
            const originalDate = dateConverter(data.ActiveDate);
            const isTestActive =
              data.UserTestData?.IsActive === true &&
              data.UserTestData?.IsFinished === true;

            if (isTestActive) {
              const currentDate = new Date();
              const activeDate = new Date(data.ActiveDate);
              if (currentDate > activeDate) {
                return (
                  <div key={data.Id}>
                    <Span
                      titleLabel={data.TestName}
                      label={`${data.ProfessorFirstName} ${data.ProfessorLastName}`}
                      isGrade={false}
                    />
                    <span style={{ fontSize: "14px" }}>
                      <p>Data rozpoczęcia: {originalDate}</p>
                      <p>Czas: {data.Time} minut</p>
                    </span>
                    <Cta
                      as={Link}
                      to={`${data.UserTestData.IsFinished ? "#" : "data.Id"} `}
                      style={{ alignSelf: "flex-start" }}
                      label={`${
                        data.UserTestData.IsFinished
                          ? "Test niedostępny"
                          : "Wejdź"
                      } `}
                      isJobOffer
                    />
                  </div>
                );
              }
            }
            return null;
          })}
        {!test && (
          <center>
            <p>Aktualnie nie posiadasz żadnych testów</p>
          </center>
        )}

        <Link to={"/platform/test/create"}>
          {role === "Professor" && <Button label="Stwórz test" />}
        </Link>
      </Wrapper>
    </PlatformLayout>
  );
};
