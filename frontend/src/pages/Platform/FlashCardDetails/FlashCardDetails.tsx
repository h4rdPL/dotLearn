import React, { useState } from "react";
import { FlashCards } from "../../../assets/data/flashCards";
import { useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import styled from "styled-components";
import { FlashCardState } from "../../../interfaces/types";

const Wrapper = styled.div`
  color: #fff;
  padding: 1rem;
`;

const FlashcardContainer = styled.div`
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 300px;
  height: 200px;
  perspective: 1000px;
`;

const Flashcard = styled.div<FlashCardState>`
  width: 100%;
  height: 100%;
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
  height: 100%;
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

export const FlashCardDetails: React.FC = () => {
  const { flashCardId } = useParams<{ flashCardId: string }>();
  const flashCardSet = FlashCards.find((set) => set.id === Number(flashCardId));

  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

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
            <button
              onClick={() => handleCardSwitch(currentCard - 1)}
              disabled={currentCard === 0}
            >
              Previous Card
            </button>
            <button
              onClick={() => handleCardSwitch(currentCard + 1)}
              disabled={currentCard === flashCardSet.flashcards.length - 1}
            >
              Next Card
            </button>
          </FlashcardContainer>
        ) : (
          <p>Flashcard set not found</p>
        )}
      </Wrapper>
    </PlatformLayout>
  );
};
