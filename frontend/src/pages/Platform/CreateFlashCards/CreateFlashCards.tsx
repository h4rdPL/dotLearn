import React, { useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import { IoIosAdd } from "react-icons/io";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";

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
const FlashCardInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateFlashCards = () => {
  const [flashcardCount, setFlashcardCount] = useState<number>(1);
  const [flashcardData, setFlashcardData] = useState({
    Name: "",
    Category: "",
    flashCards: Array(flashcardCount).fill({ Content: "", Definition: "" }),
  });

  const handleAddFlashcard = () => {
    setFlashcardCount(flashcardCount + 1);
    setFlashcardData({
      ...flashcardData,
      flashCards: [
        ...flashcardData.flashCards,
        { Content: "", Definition: "" },
      ],
    });
  };

  const handleCreateFlashcards = async () => {
    const authToken = getAuthTokenFromCookies();

    // Sprawdzenie, czy jakieś pola są puste
    if (
      flashcardData.Name.trim() === "" ||
      flashcardData.Category.trim() === ""
    ) {
      console.error("Nazwa i kategoria nie mogą być puste.");
      return;
    }

    for (const flashcard of flashcardData.flashCards) {
      if (
        flashcard.Content.trim() === "" ||
        flashcard.Definition.trim() === ""
      ) {
        console.error("Pojęcie i znaczenie nie mogą być puste.");
        return;
      }
    }

    try {
      const response = await fetch(
        "https://localhost:7024/api/FlashCard/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: JSON.stringify(flashcardData),
        }
      );

      if (response.ok) {
        console.log("Flashcards created successfully");
      } else {
        const errorMessage = await response.text();
        console.error("Błąd serwera:", errorMessage);
      }
    } catch (error) {
      console.error("Error creating flashcards:", error);
    }
  };

  const handleFlashcardChange = (
    index: number,
    field: "Content" | "Definition",
    value: string
  ) => {
    const updatedFlashcards = [...flashcardData.flashCards];
    updatedFlashcards[index] = {
      ...updatedFlashcards[index],
      [field]: value,
    };
    setFlashcardData({ ...flashcardData, flashCards: updatedFlashcards });
  };

  return (
    <PlatformLayout>
      <FlashCardHeading>Stwórz nową fiszkę</FlashCardHeading>
      <FlashCardInputWrapper>
        <FlashCardInput
          type="text"
          placeholder="Nazwa"
          value={flashcardData.Name}
          onChange={(e) =>
            setFlashcardData({ ...flashcardData, Name: e.target.value })
          }
        />
        <FlashCardInput
          type="text"
          placeholder="Kategoria"
          value={flashcardData.Category}
          onChange={(e) =>
            setFlashcardData({ ...flashcardData, Category: e.target.value })
          }
        />
      </FlashCardInputWrapper>
      <FlashCardWrapper>
        {Array.from({ length: flashcardCount }).map((_, index) => (
          <React.Fragment key={index}>
            <p>{index + 1}.</p>
            <FlashCardInnerWrapper>
              <FlashCard>
                <FlashCardInput
                  type="text"
                  value={flashcardData.flashCards[index]?.Content || ""}
                  onChange={(e) =>
                    handleFlashcardChange(index, "Content", e.target.value)
                  }
                  placeholder="Pojęcie"
                />
                <p>Pojęcie</p>
              </FlashCard>
              <FlashCard>
                <FlashCardInput
                  type="text"
                  value={flashcardData.flashCards[index]?.Definition || ""}
                  onChange={(e) =>
                    handleFlashcardChange(index, "Definition", e.target.value)
                  }
                  placeholder="Znaczenie"
                />
                <p>Znaczenie</p>
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
        <Cta
          onClick={handleCreateFlashcards}
          style={{ alignSelf: "flex-start" }}
          label="Stwórz"
          isJobOffer
        />
      </FlashCardWrapper>
    </PlatformLayout>
  );
};
