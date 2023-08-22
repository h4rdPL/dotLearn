import React from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FlashCards } from "../../../assets/data/flashCards";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlashCardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlashCardsListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.purple};
`;
export const LearnPage = ({ id }: any) => {
  return (
    <PlatformLayout>
      <Wrapper>
        <h2>Twoje fiszki:</h2>
        <FlashCardsList>
          {FlashCards.map((flashcard) => (
            <FlashCardsListItem>
              Nazwa: {flashcard.name}
              <Cta
                style={{ alignSelf: "flex-start" }}
                href={`learn/${flashcard.id}`}
                label="Wejdź"
                isJobOffer
              />
            </FlashCardsListItem>
          ))}
        </FlashCardsList>
        <Link to="/platform/learn/create">
          <Cta
            style={{ alignSelf: "flex-start" }}
            label="Stwórz fiszkę"
            isJobOffer
          />
        </Link>
      </Wrapper>
    </PlatformLayout>
  );
};
