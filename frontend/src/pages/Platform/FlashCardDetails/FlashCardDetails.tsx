import React from "react";
import { FlashCards } from "../../../assets/data/flashCards";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { PlatformLayout } from "../../../templates/PlatformLayout";

const Wrapper = styled.div`
  color: #fff;
`;

export const FlashCardDetails: React.FC = () => {
  const { flashCardId } = useParams<{ flashCardId: string }>();
  const flashCard = FlashCards.find((f) => f.id === Number(flashCardId)); // Convert flashCardId to a number
  return (
    <PlatformLayout>
      <Wrapper>
        {flashCard ? (
          <>
            <p>{flashCard.name}</p>
            <p>{flashCard.definition}</p>
          </>
        ) : (
          <p>Flashcard not found</p>
        )}
      </Wrapper>
    </PlatformLayout>
  );
};
