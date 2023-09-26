import styled from "styled-components";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Span } from "../../../components/atoms/Span/Span";
import { TestInterface } from "../../../interfaces/types";
import { testData } from "../../../assets/data/testData";
import { Link } from "react-router-dom";
import { Button } from "../../../components/atoms/Button/Button";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const TestPage: React.FC<TestInterface> = () => {
  const [test, setTest] = useState<any>();

  const getAuthTokenFromCookies = () => {
    const token = Cookies.get("jwt");
    return token;
  };
  const fetchUserClasses = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      console.log("token" + authToken);
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
        console.log(data);
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

  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Twoje testy:</ClassHeading>
        </span>
        {test &&
          test.map((data: any) => (
            <>
              <div>
                <Span
                  titleLabel={`${data.TestName}`}
                  label={`${data.ProfessorFirstName} ${data.ProfessorLastName}`}
                  isGrade={false}
                />
                <span style={{ fontSize: "14px" }}>
                  <p>Data rozpoczęcia: {data.ActiveDate}</p>
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
