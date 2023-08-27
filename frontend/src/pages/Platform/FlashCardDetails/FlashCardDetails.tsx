import React, { useEffect, useState } from "react";
import { FlashCards } from "../../../assets/data/flashCards";
import { useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import styled, { css } from "styled-components";
import { FlashCardState } from "../../../interfaces/types";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: c;
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

export const FlashCardDetails: React.FC = () => {
  const { flashCardId } = useParams<{ flashCardId: string }>();
  const flashCardSet = FlashCards.find((set) => set.id === Number(flashCardId));

  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (flashCardSet) {
      if (event.key === "ArrowLeft" && currentCard > 0) {
        handleCardSwitch(currentCard - 1);
      } else if (
        event.key === "ArrowRight" &&
        currentCard < flashCardSet.flashcards.length - 1
      ) {
        handleCardSwitch(currentCard + 1);
      } else if (event.key === " ") {
        handleCardFlip();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCard, flipped, flashCardSet]);

  const handleCardSwitch = (nextCard: any) => {
    setCurrentCard(nextCard);
    setFlipped(false);
  };

  const handleCardFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <PlatformLayout>
      <Wrapper>
        {flashCardSet ? (
          <FlashcardContainer>
            <Flashcard flipped={flipped} onClick={handleCardFlip}>
              <FlashcardFront>
                <FlashcardText>
                  {flashCardSet.flashcards[currentCard].concept}
                </FlashcardText>
              </FlashcardFront>
              <FlashcardBack>
                <FlashcardText>
                  {flashCardSet.flashcards[currentCard].translation}
                </FlashcardText>
                <FlashcardText>
                  {flashCardSet.flashcards[currentCard].definition}
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
                disabled={currentCard === flashCardSet.flashcards.length - 1}
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
        {flashCardSet &&
          flashCardSet.flashcards.map((flashcard, index) => (
            <FlashcardListItem key={index}>
              {flashcard.concept} - {flashcard.translation}
            </FlashcardListItem>
          ))}
      </FlashcardList>
    </PlatformLayout>
  );
};
