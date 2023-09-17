import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import styled, { css } from "styled-components";
import { FlashCardState } from "../../../interfaces/types";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import Cookies from "js-cookie";

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

interface FlashCard {
  Id: number;
  Content: string;
  Definition: string;
}

interface FlashCardSet {
  Id: number;
  Name: string;
  Category: string;
  StudentId: number;
  FlashCards: FlashCard[];
}

export const FlashCardDetails: React.FC = () => {
  const { flashCardId } = useParams<{ flashCardId: any }>();
  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [deck, setDeck] = useState<FlashCardSet[]>([]);

  const getAuthTokenFromCookies = () => {
    const token = Cookies.get("jwt");
    return token;
  };

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

      if (response.ok) {
        const data = await response.json();
        setDeck(data);
      } else {
        console.error("Failed to fetch flashcards");
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (deck.length > 0) {
      const currentFlashCardSet = deck.find((set) => set.Id === flashCardId);
      if (currentFlashCardSet) {
        if (event.key === "ArrowLeft" && currentCard > 0) {
          handleCardSwitch(currentCard - 1);
        } else if (
          event.key === "ArrowRight" &&
          currentCard < currentFlashCardSet.FlashCards.length - 1
        ) {
          handleCardSwitch(currentCard + 1);
        } else if (event.key === " ") {
          handleCardFlip();
        }
      }
    }
  };

  const handleCardSwitch = (nextCard: number) => {
    setCurrentCard(nextCard);
    setFlipped(false);
  };

  const handleCardFlip = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCard, flipped, deck]);

  return (
    <PlatformLayout>
      <Wrapper>
        {deck.length > 0 ? (
          <FlashcardContainer>
            <Flashcard
              key={currentCard}
              flipped={flipped}
              onClick={handleCardFlip}
            >
              <FlashcardFront>
                <FlashcardText>
                  {
                    deck.find((set) => set.Id === flashCardId)?.FlashCards[
                      currentCard
                    ].Content
                  }
                </FlashcardText>
              </FlashcardFront>
              <FlashcardBack>
                <FlashcardText>
                  {
                    deck.find((set) => set.Id === flashCardId)?.FlashCards[
                      currentCard
                    ].Definition
                  }
                </FlashcardText>
              </FlashcardBack>
            </Flashcard>
            <ButtonContainer>
              <InnerButton
                onClick={() => handleCardSwitch(currentCard - 1)}
                disabled={currentCard === 0}
              >
                <ImArrowLeft2 />
                Previous Card
              </InnerButton>
              <InnerButton
                onClick={() => handleCardSwitch(currentCard + 1)}
                disabled={
                  currentCard ===
                  (deck.find((set) => set.Id === flashCardId)?.FlashCards
                    .length ?? 0) -
                    1
                }
              >
                Next Card
                <ImArrowRight2 />
              </InnerButton>
            </ButtonContainer>
          </FlashcardContainer>
        ) : (
          <p>Flashcard set not found</p>
        )}
      </Wrapper>
      <FlashcardList>
        {deck
          .find((set) => set.Id === flashCardId)
          ?.FlashCards.map((flashcard, index) => (
            <FlashcardListItem key={index}>
              {flashcard.Content} - {flashcard.Definition}
            </FlashcardListItem>
          ))}
      </FlashcardList>
    </PlatformLayout>
  );
};
