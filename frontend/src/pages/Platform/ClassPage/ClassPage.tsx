import React, { useEffect, useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Span } from "../../../components/atoms/Span/Span";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import { Button } from "../../../components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeading = styled.h2``;

export const ClassPage: React.FC = () => {
  const [classes, setClasses] = useState<any>();

  const fetchUserClasses = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      console.log("token" + authToken);
      const response = await fetch(
        `https://localhost:7024/api/Class/GetClass`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setClasses(data.$values);
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
  console.log(classes);
  return (
    <PlatformLayout>
      <Wrapper>
        <span style={{ fontSize: "14px" }}>
          <ClassHeading>Twoje klasy:</ClassHeading>
        </span>
        {classes &&
          classes.map((myClass: any) => (
            <div key={myClass.Id}>
              <Span
                titleLabel={myClass.ClassName}
                label={
                  myClass
                    ? `${myClass.FirstName} ${myClass.LastName}`
                    : "Brak profesora"
                }
                isGrade={false}
              />
              <span style={{ fontSize: "14px" }}>
                <p>Ilość osób: {myClass.numberOfPeople}</p>
              </span>
              <Cta
                as={Link}
                to={`/platform/class/${myClass.Id}`}
                style={{ alignSelf: "flex-start" }}
                label="Wejdź"
                isJobOffer
              />
            </div>
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
