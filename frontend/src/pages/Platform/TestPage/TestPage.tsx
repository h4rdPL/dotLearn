import styled from "styled-components";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Span } from "../../../components/atoms/Span/Span";
import { TestInterface } from "../../../interfaces/types";
import { Link } from "react-router-dom";
import { Button } from "../../../components/atoms/Button/Button";
import { useEffect, useState } from "react";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const TestPage: React.FC<TestInterface> = () => {
  const [test, setTest] = useState<any>();
  const fetchUserClasses = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
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
        console.log("dane");
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
          <ClassHeading>Twoje testy:</ClassHeading>
        </span>
        {test &&
          test.map((data: any) => {
            const originalDate = new Date(data.ActiveDate);
            const formattedDate = `${originalDate.getFullYear()}-${
              originalDate.getMonth() + 1
            }-${originalDate.getDate()} | ${originalDate.getHours()}:${originalDate.getMinutes()}`;
            const isTestActive =
              data.UserTestData?.IsActive === true &&
              data.UserTestData?.IsFinished === false;

            return (
              <div key={data.Id}>
                <Span
                  titleLabel={data.TestName}
                  label={`${data.ProfessorFirstName} ${data.ProfessorLastName}`}
                  isGrade={false}
                />
                <span style={{ fontSize: "14px" }}>
                  <p>Data rozpoczęcia: {formattedDate}</p>
                  <p>Czas: {data.Time} minut</p>
                </span>
                <Cta
                  as={Link}
                  to={isTestActive ? `${data.Id}` : `#`}
                  style={{ alignSelf: "flex-start" }}
                  label={isTestActive ? "Wejdź" : "Test niedostępny"}
                  isJobOffer
                  disabled={!isTestActive}
                />
              </div>
            );
          })}

        <Link to={"/platform/test/create"}>
          <Button label="Stwórz test" />
        </Link>
      </Wrapper>
    </PlatformLayout>
  );
};
