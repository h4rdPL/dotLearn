import React, { useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import { IoIosAdd } from "react-icons/io";
const FlashCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlashCardHeading = styled.h2`
  margin-bottom: 2rem;
`;

const FlashCardInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.purple};
`;

const FlashCardInput = styled.input`
  padding: 1rem;
  border: none;
  border-bottom: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  outline: none;
  margin-bottom: 1rem;
  &::placeholder {
    color: #ffffff99;
  }
`;

const FlashCard = styled.div`
  padding: 1rem;
`;

const FlashCardButton = styled.button`
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  padding: 0.75rem;
  border: none;
  outline: none;
  border-radius: 5px;
  width: fit-content;
`;
export const CreateFlashCards = () => {
  const [flashcardCount, setFlashcardCount] = useState<number>(1);
  const handleAddFlashcard = () => {
    setFlashcardCount(flashcardCount + 1);
  };

  return (
    <PlatformLayout>
      <FlashCardHeading>Stwórz nową fiszkę</FlashCardHeading>
      <FlashCardInput type="text" placeholder="Wpisz tytuł" />
      <FlashCardWrapper>
        {Array.from({ length: flashcardCount }).map((_, index) => (
          <React.Fragment key={index}>
            <h2>{index + 1}.</h2>
            <FlashCardInnerWrapper>
              <FlashCard>
                <FlashCardInput type="text" placeholder="Pojęcie" />
                <p>Pojęcie</p>
              </FlashCard>
              <FlashCard>
                <FlashCardInput type="text" placeholder="Definicja" />
                <p>Definicja</p>
              </FlashCard>
            </FlashCardInnerWrapper>
          </React.Fragment>
        ))}
        <FlashCardButton
          style={{ marginBottom: "1rem" }}
          onClick={handleAddFlashcard}
        >
          <IoIosAdd
            style={{
              fontSize: "2rem",
            }}
          />
        </FlashCardButton>
        <Cta style={{ alignSelf: "flex-start" }} label="Stwórz" isJobOffer />
      </FlashCardWrapper>
    </PlatformLayout>
  );
};
