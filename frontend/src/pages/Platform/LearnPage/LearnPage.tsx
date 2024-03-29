import React, { useEffect, useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
import { GetStudentDeck } from "../../../interfaces/types";

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

export const LearnPage: React.FC = () => {
  const [deck, setDeck] = useState<GetStudentDeck[]>([]);

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
        setDeck(data.$values);
      } else {
        console.error("Failed to fetch flashcards");
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);
  return (
    <PlatformLayout>
      <Wrapper>
        <h2>Twoje fiszki:</h2>
        <FlashCardsList>
          {deck.length > 0 ? (
            deck.map((flashcardSet) => (
              <FlashCardsListItem key={flashcardSet.Name}>
                <div>
                  {flashcardSet.Name} - {flashcardSet.Category}
                  <br />
                  {flashcardSet.flashCards.$values.map((flashcard) => (
                    <div key={flashcard.Id}>
                      <br />
                      <Cta
                        as={Link}
                        to={`/platform/learn/${flashcard.Id}`}
                        style={{ alignSelf: "flex-start" }}
                        label="Wejdź"
                        isJobOffer
                      />
                    </div>
                  ))}
                </div>
              </FlashCardsListItem>
            ))
          ) : (
            <center>
              <p>W tym momencie nie posiadasz fiszek. Stwórz nową!</p>
            </center>
          )}
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
