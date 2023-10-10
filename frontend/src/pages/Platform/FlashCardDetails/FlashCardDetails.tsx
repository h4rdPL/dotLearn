import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import styled, { css } from "styled-components";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import {
  FlashCardSet,
  FlashCardState,
  FlashCardValue,
} from "../../../interfaces/types";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 1rem;
`;

const FlashcardContainer = styled.div`
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 500px;
  min-height: 300px;
  perspective: 1000px;
`;

const Flashcard = styled.div<FlashCardState>`
  width: 100%;
  height: fit-content;
  position: relative;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -moz-transition: 0.6s;
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const FlashcardFront = styled.div`
  width: 100%;
  height: 300px;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.purple};
  border-radius: 8px;
`;

const FlashcardBack = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.purple};
  border-radius: 8px;
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 0;
`;

const FlashcardText = styled.p`
  font-size: 18px;
  margin: 0;
  text-align: center;
  color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const InnerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  outline: none;
  color: ${({ theme }) => theme.white};
  border: none;
  background-color: ${({ theme }) => theme.purple};
  padding: 1rem;
  ${(props) =>
    props.disabled &&
    css`
      background-color: transparent;
      color: #999;
      cursor: not-allowed;
      opacity: 0.6;
    `}
`;

const FlashcardList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const FlashcardListItem = styled.li`
  background-color: ${({ theme }) => theme.purple};
  color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.lightPurple};
    transform: scale(1.02);
  }
`;

export const FlashCardDetails: React.FC = () => {
  const { flashCardId } = useParams<{ flashCardId: string }>();
  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [deck, setDeck] = useState<FlashCardSet[]>([]);
  const [currentDeck, setCurrentDeck] = useState<FlashCardValue[]>([]);

  const fetchFlashcards = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch(
        `https://localhost:7024/api/FlashCard/getStudentDecks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      const myData = data.$values;

      setDeck([]);

      const flashCardSets = myData.map((item: any) => ({
        Name: item.Name,
        Category: item.Category,
        FlashCards: item.flashCards.$values,
      }));

      setDeck(flashCardSets);
      console.log("Fetched deck:", deck);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  useEffect(() => {
    if (deck.length > 0 && flashCardId) {
      const selectedDeckIndex = parseInt(flashCardId, 10) - 1;
      if (selectedDeckIndex >= 0 && selectedDeckIndex < deck.length) {
        const selectedDeck = deck[selectedDeckIndex];
        if (selectedDeck && selectedDeck.FlashCards) {
          setCurrentDeck(selectedDeck.FlashCards);
          setCurrentCard(0);
          setFlipped(false);
        }
      }
    }
  }, [deck, flashCardId]);

  return (
    <PlatformLayout>
      <Wrapper>
        <FlashcardContainer>
          {currentDeck.length > 0 && (
            <Flashcard flipped={flipped} onClick={() => setFlipped(!flipped)}>
              <FlashcardFront>
                <FlashcardText>
                  {currentDeck[currentCard].Content}
                </FlashcardText>
              </FlashcardFront>
              <FlashcardBack>
                <FlashcardText>
                  {currentDeck[currentCard].Definition}
                </FlashcardText>
              </FlashcardBack>
            </Flashcard>
          )}

          <ButtonContainer>
            <InnerButton
              onClick={() => setCurrentCard(Math.max(currentCard - 1, 0))}
              disabled={currentCard === 0}
            >
              <ImArrowLeft2 />
              Previous Card
            </InnerButton>
            <InnerButton
              onClick={() =>
                setCurrentCard(
                  Math.min(currentCard + 1, currentDeck.length - 1)
                )
              }
              disabled={currentCard === currentDeck.length - 1}
            >
              Next Card
              <ImArrowRight2 />
            </InnerButton>
          </ButtonContainer>
        </FlashcardContainer>
      </Wrapper>

      <FlashcardList>
        {currentDeck.map((flashCard, cardIndex) => (
          <FlashcardListItem key={cardIndex}>
            {flashCard.Content} - {flashCard.Definition}
          </FlashcardListItem>
        ))}
      </FlashcardList>
    </PlatformLayout>
  );
};
