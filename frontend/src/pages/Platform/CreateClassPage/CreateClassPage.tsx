import React, { useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
import { ClassInput } from "../../../components/atoms/Input/ClassInput";
import { useNavigate } from "react-router-dom";
import { ClassDataInterface } from "../../../interfaces/types";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CreateClassPage = () => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState<ClassDataInterface>({
    ClassName: "",
    CardId: [],
  });

  const handleClassNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const className = e.target.value;
    setClassData({
      ...classData,
      ClassName: className,
    });
  };

  const handleCardIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardIdString = e.target.value;
    const cardIdArray = cardIdString
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "")
      .map(Number);

    setClassData({
      ...classData,
      CardId: cardIdArray,
    });
  };

  const handleCreateClass = async () => {
    try {
      const authToken = getAuthTokenFromCookies();

      const response = await fetch(
        "https://localhost:7024/api/Class/createClass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            ClassName: classData.ClassName,
            CardId: classData.CardId,
          }),
        }
      );

      if (response.ok) {
        console.log(response);
        return navigate("/platform/class");
      } else {
        const errorMessage = await response.text();
        console.error("Błąd serwera:", errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PlatformLayout>
        <Wrapper>
          <h1>Nowa klasa</h1>
          <ClassInput
            type="text"
            placeholder="Nazwa klasy np. Angielski - Warszawa"
            onChange={handleClassNameChange}
          />
          <p>Dodaj studentów (po przecinku)</p>
          <ClassInput
            type="text"
            onChange={handleCardIdChange}
            placeholder="Identyfikator studenta np. 7124, 1592"
          />
          <Cta
            style={{ alignSelf: "flex-start" }}
            label="Stwórz"
            onClick={handleCreateClass}
            isJobOffer
          />
        </Wrapper>
      </PlatformLayout>
    </>
  );
};
